import Anthropic from '@anthropic-ai/sdk';

const CATEGORY_IDS = ['soups', 'mains', 'pastries', 'desserts', 'salads', 'chicken', 'meat', 'veg', 'kids'];

const RECIPE_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'שם המתכון' },
    categoryId: { type: 'string', enum: CATEGORY_IDS },
    servings: { type: 'integer' },
    prepTime: { type: 'integer', description: 'זמן הכנה בדקות' },
    cookTime: { type: 'integer', description: 'זמן בישול בדקות' },
    ingredients: { type: 'array', items: { type: 'string' } },
    steps: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string', description: 'טיפ אישי מתוך הטקסט המקורי, מחרוזת ריקה אם אין' },
  },
  required: ['name', 'categoryId', 'servings', 'prepTime', 'cookTime', 'ingredients', 'steps', 'notes'],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `את עוזרת שמחלצת מתכוני בישול ומסדרת אותם לפורמט מובנה עבור אפליקציית מתכונים בעברית.
קיבלת תמונה של מתכון (כתוב יד או מודפס) או טקסט חופשי של מתכון. חלצי ממנו:
- שם המתכון
- הקטגוריה המתאימה ביותר מתוך: מרקים(soups), עיקריות(mains), פשטידות(pastries), קינוחים(desserts), סלטים(salads), עוף(chicken), בשר(meat), צמחוני(veg), ילדים(kids)
- כמות מנות (מספר; אם לא מצוין, נחשי לפי הכמויות - בדרך כלל 4)
- זמן הכנה וזמן בישול בדקות (אם לא מצוינים, העריכי הערכה סבירה לפי סוג המתכון)
- רשימת רכיבים, כל רכיב כשורה נפרדת עם כמות
- רשימת שלבי הכנה, כל שלב תמצית ברורה של פעולה אחת
- טיפ אישי אם מופיע כזה בטקסט המקורי (אחרת מחרוזת ריקה)
כל הטקסט בפלט חייב להיות בעברית, גם אם המקור בשפה אחרת - תרגמי אותו. אל תמציאי מידע שלא מופיע במקור, מלבד הערכות סבירות לזמנים/מנות כשחסר.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'שרת לא מוגדר: חסר מפתח ANTHROPIC_API_KEY' });
    return;
  }

  const { image, mediaType, text } = req.body || {};
  if (!image && !text) {
    res.status(400).json({ error: 'לא נשלחה תמונה או טקסט' });
    return;
  }

  const content = [];
  if (image) {
    content.push({ type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image } });
    content.push({ type: 'text', text: 'חלצי את המתכון מהתמונה הזו.' });
  } else {
    content.push({ type: 'text', text: `חלצי וסדרי את המתכון הבא:\n\n${text}` });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
      output_config: { format: { type: 'json_schema', schema: RECIPE_SCHEMA } },
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock) {
      res.status(502).json({ error: 'לא התקבלה תשובה תקינה מהמודל' });
      return;
    }
    const parsed = JSON.parse(textBlock.text);
    res.status(200).json(parsed);
  } catch (err) {
    console.error('parse-recipe error:', err);
    res.status(502).json({ error: 'שגיאה בעיבוד המתכון, נסי שוב' });
  }
}
