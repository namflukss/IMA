import { BackIcon, StarIcon, ArrowUpRightIcon } from '../components/icons';
import CategoryGrid from '../components/CategoryGrid';

export default function CategoryScreen({ app }) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(18px + env(safe-area-inset-top)) 12px 18px', borderBottom: '1px solid oklch(0.9 0.01 60)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={app.goBack} style={{ width: 40, height: 40, borderRadius: 20, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'oklch(0.24 0.015 50)' }}>
          <BackIcon />
        </button>
        <div style={{ fontSize: 19, fontWeight: 700 }}>{app.currentCategoryName}</div>
      </div>

      {app.categoryHasChildren && <CategoryGrid categories={app.categoryChildrenView} />}

      {!app.categoryHasChildren && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          {app.categoryRecipesView.map((r) => (
            <div key={r.id} className="press" onClick={r.open} style={{ position: 'relative', background: r.grad, borderRadius: 18, padding: 16, cursor: 'pointer', minHeight: 96, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 24px -14px oklch(0.3 0.05 60 / 0.45)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <button className="press-icon" onClick={r.toggleFav} style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                  <StarIcon size={14} filled={r.isFav} fillColor="#1a1a1a" strokeColor="#1a1a1a" animate={r.isFav} />
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
          {app.noCategoryRecipes && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'oklch(0.55 0.012 50)', fontSize: 14.5 }}>עוד אין מתכונים בקטגוריה הזו</div>
          )}
        </div>
      )}
    </>
  );
}
