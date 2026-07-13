import { PlusIcon } from '../components/icons';

export default function PlansScreen({ app }) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(24px + env(safe-area-inset-top)) 20px 8px', borderBottom: '1px solid oklch(0.9 0.01 60)' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>תכנון ארוחות</div>
        <div style={{ fontSize: 13.5, color: 'oklch(0.52 0.012 50)', marginTop: 4 }}>תכנני אירוח ובחרי מה יהיה על השולחן</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
        <button className="press" onClick={app.startAddPlan} style={{ border: 'none', background: app.accentGrad, color: 'white', borderRadius: 16, height: 52, fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <PlusIcon />
          אירוח חדש
        </button>

        {app.hasPlans && app.plansView.map((p) => (
          <div key={p.id} onClick={p.open} style={{ background: 'white', border: '1px solid oklch(0.92 0.008 60)', borderRadius: 16, padding: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</div>
              {p.hasDate && <div style={{ fontSize: 12.5, color: 'oklch(0.52 0.012 50)' }}>{p.date}</div>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ background: 'oklch(0.95 0.006 60)', borderRadius: 100, padding: '5px 12px', fontSize: 12.5, color: 'oklch(0.4 0.015 50)', fontWeight: 600 }}>{p.guests} סועדים</div>
              <div style={{ background: 'oklch(0.95 0.006 60)', borderRadius: 100, padding: '5px 12px', fontSize: 12.5, color: 'oklch(0.4 0.015 50)', fontWeight: 600 }}>{p.recipeCount} מתכונים</div>
            </div>
          </div>
        ))}
        {app.noPlans && (
          <div style={{ textAlign: 'center', padding: '40px 24px', color: 'oklch(0.55 0.012 50)', fontSize: 14.5, lineHeight: 1.6 }}>
            עוד לא תכננת ארוחה. לחצי על &quot;אירוח חדש&quot; כדי להתחיל.
          </div>
        )}
      </div>
    </>
  );
}
