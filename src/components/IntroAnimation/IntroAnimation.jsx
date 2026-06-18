import { useEffect, useRef, useState } from 'react';
import introVideo from '../../assets/videos/openinganimation.mp4';

/**
 * Fullscreen intro that plays once per session.
 * On end: the entire overlay scales down (zooms out) to reveal
 * the hero section behind it — seamless zoom-out transition.
 */
export default function IntroAnimation() {
  const SESSION_KEY = 'star_intro_played';
  const videoRef = useRef(null);

  const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === 'true';
  const [visible, setVisible]       = useState(!alreadyPlayed);
  const [zoomingOut, setZoomingOut] = useState(false);

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SESSION_KEY, 'true');
    videoRef.current?.play().catch(() => dismiss());
  }, [visible]);

  function dismiss() {
    setZoomingOut(true);
    // Unmount after the CSS transition completes (1s)
    setTimeout(() => setVisible(false), 1000);
  }

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        // Scale the whole overlay down — the hero behind is revealed
        transform: zoomingOut ? 'scale(0)' : 'scale(1)',
        transformOrigin: 'center center',
        transition: zoomingOut
          ? 'transform 1s cubic-bezier(0.7, 0, 0.3, 1)'
          : 'none',
        // Clip the black edges as they shrink
        borderRadius: zoomingOut ? '50%' : '0%',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        onEnded={dismiss}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}
