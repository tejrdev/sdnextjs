import React, { useEffect, useRef } from 'react';
import 'glightbox/dist/css/glightbox.css';

interface GLightboxInstance {
  destroy: () => void;
  open: () => void;
}

interface GlightVideoProps {
  videoLink: string;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const GlightVideo: React.FC<GlightVideoProps> = ({
  videoLink,
  className = 'glightbox-video',
  children,
  ariaLabel = 'Play video',
}) => {
  const lightboxRef = useRef<GLightboxInstance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !videoLink) return;

    let isMounted = true;

    import('glightbox').then((GLightboxModule) => {
      if (!isMounted) return;

      const GLightbox = GLightboxModule.default;

      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }

      const lightboxOptions: any = {
        elements: [
          {
            href: videoLink,
            type: 'video',
          },
        ],
        autoplayVideos: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        loop: false,
        touchNavigation: true,
        keyboardNavigation: true,
      };

      lightboxRef.current = GLightbox(lightboxOptions) as GLightboxInstance;
    });

    return () => {
      isMounted = false;
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
        lightboxRef.current = null;
      }
    };
  }, [videoLink]);

  if (!videoLink) {
    return null;
  }

  const handleOpenVideo = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    lightboxRef.current?.open();
  };

  return (
    <a
      href={videoLink}
      className={className}
      aria-label={ariaLabel}
      onClick={handleOpenVideo}
      data-glightbox="type: video"
    >
      {children ?? <span>Play Video</span>}
    </a>
  );
};

export default GlightVideo;
