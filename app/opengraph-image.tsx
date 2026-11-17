import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'مركز الأدوات | Tools Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0B1020 0%, #121A33 55%, #172140 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          padding: '60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 800,
            }}
          >
            TH
          </div>
          <span style={{ fontSize: '46px', fontWeight: 800, color: '#F5B942' }}>
            Tools Hub
          </span>
        </div>
        <div style={{ fontSize: '56px', fontWeight: 800, marginBottom: '20px' }}>
          21 Free Browser Utilities
        </div>
        <div style={{ fontSize: '28px', color: '#94A3B8', maxWidth: '860px' }}>
          100% Client-Side Privacy · Arabic & English · Zero Server Uploads
        </div>
      </div>
    ),
    { ...size }
  );
}
