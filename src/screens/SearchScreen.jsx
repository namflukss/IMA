import { SearchIcon } from '../components/icons';

export default function SearchScreen({ app }) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(20px + env(safe-area-inset-top)) 16px 12px', borderBottom: '1px solid oklch(0.9 0.01 60)' }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>חיפוש מתכון</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid oklch(0.9 0.01 60)', borderRadius: 14, padding: '0 14px', height: 46 }}>
          <SearchIcon color="oklch(0.55 0.01 50)" />
          <input
            value={app.query}
            onChange={app.setQuery}
            placeholder="חפשי לפי שם מתכון..."
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, background: 'transparent', color: 'oklch(0.24 0.015 50)' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
        {app.searchResultsView.map((r) => (
          <div key={r.id} onClick={r.open} style={{ background: 'white', border: '1px solid oklch(0.92 0.008 60)', borderRadius: 16, padding: 12, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, flex: 'none', background: r.grad }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: 'oklch(0.52 0.012 50)', marginTop: 3 }}>{r.prepTime}+{r.cookTime} דק&apos; &middot; {r.servings} מנות</div>
            </div>
          </div>
        ))}
        {app.noSearchResults && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'oklch(0.55 0.012 50)', fontSize: 14.5 }}>לא נמצאו מתכונים תואמים</div>
        )}
      </div>
    </>
  );
}
