import { CloseIcon } from '../components/icons';

export default function CookModeScreen({ app }) {
  const r = app.currentRecipe;
  if (!r || !app.cookStep) return null;
  return (
    <div style={{ background: 'oklch(0.16 0.01 50)', minHeight: '100vh', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.16 0.01 50)', padding: 'calc(18px + env(safe-area-inset-top)) 16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={app.exitCookMode} style={{ width: 38, height: 38, borderRadius: 19, border: 'none', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', flex: 'none' }}>
          <CloseIcon size={18} />
        </button>
        <div style={{ flex: 1, color: 'white', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 600, flex: 'none' }}>{app.cookProgressText}</div>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ height: '100%', width: `${app.cookProgressPct}%`, background: app.accentGrad, transition: 'width 0.35s ease' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 28px 100px', textAlign: 'center', gap: 22 }}>
        <div key={app.cookStep.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, animation: 'stepIn 0.4s ease' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: app.accentGrad, color: 'white', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{app.cookStep.n}</div>
          <div style={{ color: 'white', fontSize: 22, lineHeight: 1.6, fontWeight: 500 }}>{app.cookStep.text}</div>
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, padding: 'calc(16px + env(safe-area-inset-bottom)) 16px 16px', display: 'flex', gap: 10, background: 'oklch(0.16 0.01 50)' }}>
        {app.isFirstCookStep ? (
          <div style={{ flex: 1, height: 54 }} />
        ) : (
          <button className="press" onClick={app.prevCookStep} style={{ flex: 1, height: 54, borderRadius: 16, border: 'none', background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>שלב קודם</button>
        )}
        {app.isLastCookStep ? (
          <button className="press" onClick={app.exitCookMode} style={{ flex: 1, height: 54, borderRadius: 16, border: 'none', background: app.accentGrad, color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>סיימתי לבשל</button>
        ) : (
          <button className="press" onClick={app.nextCookStep} style={{ flex: 1, height: 54, borderRadius: 16, border: 'none', background: app.accentGrad, color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>שלב הבא</button>
        )}
      </div>
    </div>
  );
}
