import { CloseIcon, CheckIcon } from '../components/icons';

export default function PlanEditScreen({ app }) {
  const ep = app.editingPlan;
  if (!ep) return null;
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(18px + env(safe-area-inset-top)) 12px 18px', borderBottom: '1px solid oklch(0.9 0.01 60)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={app.cancelPlanEdit} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'oklch(0.24 0.015 50)', flex: 'none' }}>
          <CloseIcon />
        </button>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 700 }}>{app.isNewPlan ? 'אירוח חדש' : 'עריכת אירוח'}</div>
        <button onClick={app.savePlan} style={{ height: 38, padding: '0 16px', borderRadius: 19, border: 'none', background: app.accentGrad, color: 'white', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, fontWeight: 600, flex: 'none' }}>
          <CheckIcon size={16} />
          שמירה
        </button>
      </div>

      <div style={{ padding: '18px 20px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>שם האירוח</div>
          <input value={ep.name} onChange={app.updatePlanName} placeholder="לדוגמה: שישי משפחתי" style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 14px', fontSize: 15, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>כמה סועדים</div>
            <input type="number" value={ep.guests} onChange={app.updatePlanGuests} style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 12px', fontSize: 15, outline: 'none' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.5 0.012 50)', marginBottom: 6 }}>תאריך (לא חובה)</div>
            <input value={ep.date} onChange={app.updatePlanDate} placeholder="לדוגמה: יום שישי" style={{ width: '100%', height: 46, border: '1px solid oklch(0.88 0.008 60)', borderRadius: 12, padding: '0 12px', fontSize: 15, outline: 'none' }} />
          </div>
        </div>
      </div>
    </>
  );
}
