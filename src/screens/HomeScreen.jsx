import { SearchIcon } from '../components/icons';
import CategoryGrid from '../components/CategoryGrid';
import { ACCENT_GRAD } from '../lib/colors';

export default function HomeScreen({ app }) {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'oklch(0.985 0.004 60)', padding: 'calc(22px + env(safe-area-inset-top)) 20px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: ACCENT_GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 17, flex: 'none' }}>א</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: 'oklch(0.52 0.012 50)' }}>שלום אמא,</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>מה מבשלים היום?</div>
        </div>
        <button onClick={app.goSearch} style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', background: 'oklch(0.95 0.006 60)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
          <SearchIcon />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 20px 4px' }}>
        {app.categoriesView.map((chip) => (
          <div key={chip.id} onClick={chip.open} style={{ flex: 'none', padding: '8px 16px', borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', background: chip.tint, color: chip.tintText, whiteSpace: 'nowrap' }}>{chip.name}</div>
        ))}
      </div>

      <CategoryGrid categories={app.categoriesView} />
    </>
  );
}
