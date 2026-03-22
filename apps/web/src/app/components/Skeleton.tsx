import { CSSProperties } from 'react';

export function Skeleton({ style = {} }: { style?: CSSProperties }) {
  return (
    <>
      <div style={{
        background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: 6,
        ...style,
      }} />
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </>
  );
}

export function SkeletonCard() {
  return (
    <div style={{
      background: '#141414',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 10, padding: 20,
    }}>
      <Skeleton style={{ height: 13, width: '55%', marginBottom: 14 }} />
      <Skeleton style={{ height: 30, width: '40%', marginBottom: 10 }} />
      <Skeleton style={{ height: 11, width: '75%' }} />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <Skeleton style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <Skeleton style={{ height: 13, width: '50%', marginBottom: 6 }} />
        <Skeleton style={{ height: 10, width: '35%' }} />
      </div>
      <Skeleton style={{ height: 22, width: 60, borderRadius: 4 }} />
    </div>
  );
}
