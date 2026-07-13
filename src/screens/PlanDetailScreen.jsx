import { BackIcon, EditIcon, TrashIcon, PlusIcon } from '../components/icons';

export default function PlanDetailScreen({ app }) {
  const p = app.currentPlan;
  if (!p) return null;
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(18px + env(safe-area-inset-top)) 12px 18px', borderBottom: '1px solid oklch(0.9 0.01 60)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={app.goBack} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'oklch(0.24 0.015 50)', flex: 'none' }}>
          <BackIcon />
        </button>
        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
        <button onClick={app.editCurrentPlan} style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none', color: 'oklch(0.24 0.015 50)' }}>
          <EditIcon size={18} />
        </button>
        <button onClick={app.deleteCurrentPlan} style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none', color: 'oklch(0.55 0.14 25)' }}>
          <TrashIcon size={18} />
        </button>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'oklch(0.95 0.006 60)', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 19, fontWeight: 700 }}>{p.guests}</div>
            <div style={{ fontSize: 12, color: 'oklch(0.52 0.012 50)', marginTop: 2 }}>סועדים</div>
          </div>
          <div style={{ flex: 1, background: 'oklch(0.95 0.006 60)', borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 19, fontWeight: 700 }}>{p.recipeCount}</div>
            <div style={{ fontSize: 12, color: 'oklch(0.52 0.012 50)', marginTop: 2 }}>מתכונים</div>
          </div>
          {p.hasDate && (
            <div style={{ flex: 1, background: 'oklch(0.95 0.006 60)', borderRadius: 14, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{p.date}</div>
              <div style={{ fontSize: 12, color: 'oklch(0.52 0.012 50)', marginTop: 2 }}>תאריך</div>
            </div>
          )}
        </div>

        <button onClick={app.openPlanPicker} style={{ border: `1px dashed ${app.accentTintBorder}`, background: app.accentTint, color: app.accentSolid, borderRadius: 14, height: 48, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <PlusIcon size={17} color="currentColor" />
          הוספת מתכונים לאירוח
        </button>

        {p.hasRecipes && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.recipesView.map((r) => (
              <div key={r.id} style={{ background: 'white', border: '1px solid oklch(0.92 0.008 60)', borderRadius: 14, padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div onClick={r.open} style={{ width: 48, height: 48, borderRadius: 10, flex: 'none', background: r.grad, cursor: 'pointer' }} />
                <div onClick={r.open} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: 'oklch(0.52 0.012 50)', marginTop: 2 }}>{r.categoryName}</div>
                </div>
                <button onClick={r.remove} style={{ width: 32, height: 32, flex: 'none', border: 'none', background: 'oklch(0.95 0.006 60)', borderRadius: 10, color: 'oklch(0.5 0.012 50)', cursor: 'pointer', fontSize: 16 }}>&times;</button>
              </div>
            ))}
          </div>
        )}
        {p.noRecipes && (
          <div style={{ textAlign: 'center', padding: 24, color: 'oklch(0.55 0.012 50)', fontSize: 14 }}>עדיין לא נוספו מתכונים לאירוח הזה</div>
        )}
      </div>
    </>
  );
}
