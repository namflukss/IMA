import { HomeNavIcon, SearchIcon, PlansNavIcon, StarIcon, PlusIcon } from './icons';

export default function BottomNav({ app }) {
  return (
    <div style={{ position: 'sticky', bottom: 0, zIndex: 5, padding: '0 12px calc(16px + env(safe-area-inset-bottom))' }}>
      <div style={{ background: 'white', borderRadius: 100, boxShadow: '0 12px 28px -10px oklch(0.3 0.05 60 / 0.35)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '8px 4px 10px' }}>

        <button className="press-sm" onClick={app.goHome} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', width: 52, color: app.homeColor, transition: 'color 0.2s ease,transform 0.15s ease' }}>
          <HomeNavIcon />
          <span style={{ fontSize: 10, fontWeight: 600 }}>בית</span>
        </button>

        <button className="press-sm" onClick={app.goSearch} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', width: 52, color: app.searchColor, transition: 'color 0.2s ease,transform 0.15s ease' }}>
          <SearchIcon size={20} color="currentColor" />
          <span style={{ fontSize: 10, fontWeight: 600 }}>חיפוש</span>
        </button>

        <button className="press" onClick={app.startAddRecipe} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', width: 52, marginTop: -26 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: app.accentGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px -4px color-mix(in oklch, ${app.accentSolid} 55%, transparent)`, border: '4px solid white' }}>
            <PlusIcon size={21} />
          </div>
        </button>

        <button className="press-sm" onClick={app.goPlans} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', width: 52, color: app.plansColor, transition: 'color 0.2s ease,transform 0.15s ease' }}>
          <PlansNavIcon />
          <span style={{ fontSize: 10, fontWeight: 600 }}>תכנון</span>
        </button>

        <button className="press-sm" onClick={app.goFavorites} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', width: 52, color: app.favColor, transition: 'color 0.2s ease,transform 0.15s ease' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={app.favIconFill}>
            <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7L2 9.5l7.1-.6L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 600 }}>מועדפים</span>
        </button>

      </div>
    </div>
  );
}
