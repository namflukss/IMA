import { CloseIcon, CheckIcon } from '../components/icons';

export default function EditRecipeScreen({ app }) {
  const editing = app.editing;
  if (!editing) return null;
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(18px + env(safe-area-inset-top)) 12px 18px', borderBottom: '1px solid oklch(0.9 0.01 60)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={app.cancelEdit} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'oklch(0.24 0.015 50)', flex: 'none' }}>
          <CloseIcon />
        </button>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 700 }}>{app.isNewRecipe ? 'מתכון חדש' : 'עריכת מתכון'}</div>
        <button onClick={app.saveRecipe} style={{ height: 38, padding: '0 16px', borderRadius: 19, border: 'none', background: app.accentGrad, color: 'white', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600, flex: 'none' }}>
          <CheckIcon size={16} />
          שמירה
        </button>
      </div>

      <div style={{ padding: '18px 20px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>שם המתכון</div>
          <input value={editing.name} onChange={app.updateName} placeholder="לדוגמה: מרק עוף עם קניידלך" style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 14px', fontSize: 15, outline: 'none' }} />
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 8 }}>קטגוריה</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {app.categoryChipsView.map((c) => (
              <div key={c.id} onClick={c.select} style={c.selected
                ? { padding: '8px 14px', borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', background: c.solid, color: 'white' }
                : { padding: '8px 14px', borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', background: 'white', border: '1px solid oklch(0.88 0.008 60)', color: 'oklch(0.4 0.015 50)' }}>
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>מנות</div>
            <input type="number" value={editing.servings} onChange={app.updateServings} style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 12px', fontSize: 15, outline: 'none' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>הכנה (דק&apos;)</div>
            <input type="number" value={editing.prepTime} onChange={app.updatePrep} style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 12px', fontSize: 15, outline: 'none' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>בישול (דק&apos;)</div>
            <input type="number" value={editing.cookTime} onChange={app.updateCook} style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 12px', fontSize: 15, outline: 'none' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)' }}>רכיבים</div>
            <button onClick={app.addIngredient} style={{ border: 'none', background: 'transparent', color: app.accentSolid, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ הוספת רכיב</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {app.editIngredientsView.map((ing, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input value={ing.val} onChange={ing.onChange} placeholder="לדוגמה: 2 כוסות קמח" style={{ flex: 1, height: 44, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 14px', fontSize: 14.5, outline: 'none' }} />
                <button onClick={ing.remove} style={{ width: 36, height: 36, flex: 'none', border: 'none', background: 'oklch(0.94 0.008 60)', borderRadius: 10, color: 'oklch(0.5 0.012 50)', cursor: 'pointer', fontSize: 18 }}>&times;</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)' }}>אופן ההכנה</div>
            <button onClick={app.addStep} style={{ border: 'none', background: 'transparent', color: app.accentSolid, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ הוספת שלב</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {app.editStepsView.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'oklch(0.94 0.008 60)', color: 'oklch(0.4 0.015 50)', fontSize: 12.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{step.n}</div>
                <input value={step.val} onChange={step.onChange} placeholder="תארי את השלב..." style={{ flex: 1, height: 44, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 14px', fontSize: 14.5, outline: 'none' }} />
                <button onClick={step.remove} style={{ width: 36, height: 36, flex: 'none', border: 'none', background: 'oklch(0.94 0.008 60)', borderRadius: 10, color: 'oklch(0.5 0.012 50)', cursor: 'pointer', fontSize: 18 }}>&times;</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>הטיפ של אמא</div>
          <textarea value={editing.notes} onChange={app.updateNotes} placeholder="טיפ אישי, תחליף למצרך, או סוד קטן..." style={{ width: '100%', minHeight: 80, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '12px 14px', fontSize: 14.5, outline: 'none', resize: 'none' }} />
        </div>

      </div>
    </>
  );
}
