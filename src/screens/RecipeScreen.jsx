import { BackIcon, StarIcon, EditIcon, PlayIcon, CheckIcon } from '../components/icons';

export default function RecipeScreen({ app }) {
  const r = app.currentRecipe;
  if (!r) return null;
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(18px + env(safe-area-inset-top)) 12px 18px', borderBottom: '1px solid oklch(0.9 0.01 60)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={app.goBack} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'oklch(0.24 0.015 50)', flex: 'none' }}>
          <BackIcon />
        </button>
        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
        <button onClick={r.toggleFav} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
          <StarIcon filled={r.isFav} animate={r.isFav} />
        </button>
        <button onClick={r.edit} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none', color: 'oklch(0.24 0.015 50)' }}>
          <EditIcon />
        </button>
      </div>

      <div style={{ padding: '0 0 24px' }}>
        <div style={{ margin: '0 16px 18px', borderRadius: 20, background: r.grad, padding: 20, boxShadow: '0 14px 28px -16px oklch(0.3 0.05 60 / 0.45)' }}>
          <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 600, color: 'white', background: 'rgba(255,255,255,0.25)', padding: '4px 12px', borderRadius: 100 }}>{r.categoryName}</div>
          <div style={{ fontSize: 23, fontWeight: 700, marginTop: 12, color: 'white' }}>{r.name}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '9px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{r.servings}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>מנות</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '9px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{r.prepTime}&apos;</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>הכנה</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '9px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{r.cookTime}&apos;</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>בישול</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
          <button className="press" onClick={app.startCookMode} style={{ width: '100%', height: 52, border: 'none', borderRadius: 16, background: 'oklch(0.16 0.01 50)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 22 }}>
            <PlayIcon />
            מצב הכנה - שלב אחרי שלב
          </button>

          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>רכיבים</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {r.ingredientsView.map((ing, i) => (
              <div key={i} onClick={ing.toggle} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 2px', cursor: 'pointer' }}>
                {ing.checked ? (
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: r.solid, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn 0.25s ease' }}>
                    <CheckIcon size={12} strokeWidth={3} />
                  </div>
                ) : (
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid oklch(0.85 0.01 50)', flex: 'none' }} />
                )}
                <div style={{ fontSize: 15 }}>{ing.text}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>אופן ההכנה</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {r.stepsView.map((step) => (
              <div key={step.n} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: r.tint, color: r.solid, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{step.n}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, paddingTop: 2 }}>{step.text}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: r.tint, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: r.solid, marginBottom: 6 }}>הטיפ של אמא</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.55, color: 'oklch(0.3 0.015 50)' }}>{r.notes}</div>
          </div>
        </div>
      </div>
    </>
  );
}
