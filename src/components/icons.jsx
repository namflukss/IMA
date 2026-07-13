export function BackIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 5l7 7-7 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon({ size = 18, color = 'oklch(0.4 0.015 50)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.8" />
      <line x1="15.3" y1="15.3" x2="20" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ size = 21, filled, fillColor = 'oklch(0.62 0.13 35)', strokeColor = 'oklch(0.5 0.02 50)', animate }) {
  const d = 'M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7-6.2-3.9-6.2 3.9 1.6-7L2 9.5l7.1-.6L12 2z';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={animate ? { animation: 'popIn 0.25s ease' } : undefined}>
      <path d={d} fill={filled ? fillColor : 'none'} stroke={filled ? undefined : strokeColor} strokeWidth={filled ? undefined : 1.6} />
    </svg>
  );
}

export function EditIcon({ size = 19, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14.5 3.5l2 2L7 15l-3 1 1-3 9.5-9.5z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-9 0l1 12a1 1 0 001 1h6a1 1 0 001-1l1-12" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size = 16, color = 'white', strokeWidth = 2.4 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 12l5 5 11-11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 13, color = '#1a1a1a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 18, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

export function PlayIcon({ size = 18, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 4l14 8-14 8V4z" fill={color} />
    </svg>
  );
}

export function HomeNavIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-9z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function PlansNavIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke={color} strokeWidth="1.8" />
      <line x1="7.5" y1="9" x2="16.5" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7.5" y1="12.5" x2="16.5" y2="12.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7.5" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 8a2 2 0 012-2h1.5l1-1.6A2 2 0 0110.2 3.4h3.6a2 2 0 011.7 1l1 1.6H18a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.4" stroke={color} strokeWidth="1.7" />
    </svg>
  );
}

export function PasteIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="12" height="17" rx="2" stroke={color} strokeWidth="1.7" />
      <path d="M9 4a1 1 0 011-1h4a1 1 0 011 1v1H9V4z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <line x1="9" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="13.5" x2="15" y2="13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="17" x2="12.5" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
