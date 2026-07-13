import { StarIcon, ArrowUpRightIcon } from '../components/icons';

export default function FavoritesScreen({ app }) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(24px + env(safe-area-inset-top)) 20px 8px', borderBottom: '1px solid oklch(0.9 0.01 60)' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>המתכונים המועדפים שלי</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
        {app.hasFavorites && app.favoritesView.map((r) => (
          <div key={r.id} onClick={r.open} style={{ position: 'relative', background: r.grad, borderRadius: 18, padding: 16, cursor: 'pointer', minHeight: 96, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 24px -14px oklch(0.3 0.05 60 / 0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <button onClick={r.toggleFav} style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <StarIcon size={14} filled fillColor="#1a1a1a" />
              </button>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <ArrowUpRightIcon />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', marginTop: 3 }}>{r.prepTime}+{r.cookTime} דק&apos; &middot; {r.servings} מנות</div>
            </div>
          </div>
        ))}
        {app.noFavorites && (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: 'oklch(0.55 0.012 50)', fontSize: 14.5, lineHeight: 1.6 }}>
            עוד לא סימנת מתכונים מועדפים.<br />לחצי על הכוכב ליד מתכון כדי לשמור אותו כאן.
          </div>
        )}
      </div>
    </>
  );
}
