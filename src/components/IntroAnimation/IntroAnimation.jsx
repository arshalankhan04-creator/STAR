import { useEffect, useRef, useState } from 'react';
import introVideo from '../../assets/videos/openinganimation.mp4';

/**
 * Fullscreen intro animation that plays once per session.
 * When the video ends, it zooms out (scale + fade) before unmounting.
 */
export default function IntroAnimation() {
  const SESSION_KEY = 'star_intro_played';
  const videoRef = useRef(null);

  const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === 'true';
  const [visible, setVisible] = useState(!alreadyPlayed);
  const [zoomingOut, setZoomingOut] = useState(false);

  useEffect(() => {
    if (!visible) return;

    sessionStorage.setItem(SESSION_KEY, 'true');

    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => dismiss());
  }, [visible]);

  function dismiss() {
    setZoomingOut(true);
    // Unmount after the zoom-out transition finishes (800ms)
    setTimeout(() => setVisible(false), 800);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        onEnded={dismiss}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms ease',
          transform: zoomingOut ? 'scale(0.15)' : 'scale(1)',
          opacity: zoomingOut ? 0 : 1,
        }}
      />
    </div>
  );
}
