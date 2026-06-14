import { useEffect, useRef, useState } from 'react';
import introVideo from '../../assets/videos/openinganimation.mp4';

/**
 * Fullscreen intro animation that plays once per session.
 * Uses sessionStorage so it won't replay on page refresh,
 * but will play again if the user opens a fresh tab/window.
 */
export default function IntroAnimation() {
  const SESSION_KEY = 'star_intro_played';
  const videoRef = useRef(null);

  // If already played this session, don't mount at all
  const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === 'true';
  const [visible, setVisible] = useState(!alreadyPlayed);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // Mark as played immediately so a fast refresh won't replay it
    sessionStorage.setItem(SESSION_KEY, 'true');

    const video = videoRef.current;
    if (!video) return;

    // Attempt autoplay (muted is required by browsers)
    video.play().catch(() => {
      // Autoplay blocked — dismiss immediately
      dismiss();
    });
  }, [visible]);

  function dismiss() {
    setFadingOut(true);
    // Wait for fade-out transition then unmount
    setTimeout(() => setVisible(false), 700);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-700 ${
        fadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        onEnded={dismiss}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
