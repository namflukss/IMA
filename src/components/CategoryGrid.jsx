import { ArrowUpRightIcon } from './icons';

export default function CategoryGrid({ categories }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '14px 20px 20px' }}>
      {categories.map((cat) => (
        <div key={cat.id} className="press" onClick={cat.open} style={{ position: 'relative', background: cat.tileBg, borderRadius: 20, padding: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 128, boxShadow: '0 10px 24px -12px oklch(0.3 0.05 60 / 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100 }}>{cat.count} מתכונים</div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <ArrowUpRightIcon />
            </div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: 'white' }}>{cat.name}</div>
        </div>
      ))}
    </div>
  );
}
