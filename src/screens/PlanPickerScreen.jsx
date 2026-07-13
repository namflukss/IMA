import { BackIcon, CheckIcon } from '../components/icons';

export default function PlanPickerScreen({ app }) {
  const p = app.currentPlan;
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(18px + env(safe-area-inset-top)) 12px 18px', borderBottom: '1px solid oklch(0.9 0.01 60)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={app.goBack} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'oklch(0.24 0.015 50)', flex: 'none' }}>
          <BackIcon />
        </button>
        <div style={{ flex: 1, fontSize: 16, fontWeight: 700 }}>הוספת מתכונים ל{p ? p.name : ''}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16 }}>
        {app.planPickerRecipesView.map((r) => (
          <div key={r.id} onClick={r.toggle} style={{ background: 'white', border: '1px solid oklch(0.92 0.008 60)', borderRadius: 14, padding: 10, display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, flex: 'none', background: r.grad }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'oklch(0.52 0.012 50)', marginTop: 2 }}>{r.categoryName}</div>
            </div>
            {r.included ? (
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: r.solid, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckIcon size={14} strokeWidth={3} />
              </div>
            ) : (
              <div style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid oklch(0.85 0.01 50)', flex: 'none' }} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
