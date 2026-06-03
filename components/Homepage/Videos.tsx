import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import { JSONData } from '@/components/shared/JSONData';
import Link from 'next/link';
import 'glightbox/dist/css/glightbox.css';
import { motion } from "motion/react";
import { FadeinUp } from '@/components/Anim/FadeinUp';

interface VideoSliderItem {
  video_url: string;
  video_img?: string;
  video_time?: string;
  video_title: string;
}

interface VideosData {
  video_slider: VideoSliderItem[];
}

interface VideosProps {
  data: VideosData;
}

interface GLightboxInstance {
  destroy: () => void;
}

const Videos: React.FC<VideosProps> = ({ data }) => {
  const lightboxRef = useRef<GLightboxInstance | null>(null);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return;

    // Wait for slider to render before initializing gLightbox
    const initLightbox = () => {
      // Dynamically import gLightbox only on client
      import('glightbox').then((GLightboxModule) => {
        const GLightbox = GLightboxModule.default;

        // Destroy existing instance if any
        if (lightboxRef.current) {
          lightboxRef.current.destroy();
        }

        // Initialize gLightbox with proper video configuration
        lightboxRef.current = GLightbox({
          selector: '.glightbox-video',
          autoplayVideos: true,
          openEffect: 'fade',
          closeEffect: 'fade',
          loop: false,
          touchNavigation: true,
          keyboardNavigation: true,
        }) as GLightboxInstance;
      });
    };

    // Small delay to ensure DOM is ready (especially for slider items)
    const timer = setTimeout(() => {
      initLightbox();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup on unmount
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
        lightboxRef.current = null;
      }
    };
  }, [data]);

  const sliderSettings = {
    slidesToShow: 1,
    speed: 300,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    centerPadding: '0' as const,
    focusOnSelect: true,
    arrows: true,
    dots: false,
  };

  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
      // Standard watch URLs
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      // Short URLs
      /youtu\.be\/([^&\n?#]+)/,
      // Embed URLs
      /youtube\.com\/embed\/([^&\n?#]+)/,
      // Live URLs
      /youtube\.com\/live\/([^&\n?#]+)/,
      // Shorts URLs
      /youtube\.com\/shorts\/([^&\n?#]+)/,
      // Mobile URLs
      /m\.youtube\.com\/watch\?v=([^&\n?#]+)/,
      // With additional parameters
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const getThumbnailUrl = (item: VideoSliderItem): string => {
    if (item.video_url) {
      const videoId = getYouTubeVideoId(item.video_url);
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    return item.video_img || '';
  };

  if (!data?.video_slider || data.video_slider.length === 0) {
    return null;
  }

  return (
    <div className="container" id="load_2">
      <motion.div
        variants={FadeinUp}
        initial="init"
        whileInView="anim"
        viewport={{ once: true }}
        className="seclinespace">
        <div className="top_txt df fww just-between">
          <div className="secnav df fww">
            <h2>
              <Link href="/video/"> Videos </Link>
            </h2>
          </div>
          <div className="view_btn">
            <Link href="/video/" className="btn">
              View More
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="homvidinfo bg-gray-100 py-4 px-5 rounded-md">
        <motion.div
          variants={FadeinUp}
          initial="init"
          whileInView="anim"
          viewport={{ once: true }}
          className="homvid_feature">
          <Slider {...sliderSettings} className="detailinfo_slider detailinfo_slider_video slickroundnav slick-dotted">
            {data.video_slider.map((item, id) => {
              const thumbnailUrl = getThumbnailUrl(item);
              return (
                <div className="detailinfo_item" key={id}>
                  <a
                    href={item.video_url}
                    className="glightbox-video popvid"
                  >
                    <div className="bnr_boxslide pvr vidoin">
                      <span className="playico">
                        <img src={JSONData.playicon} alt="play" />
                      </span>
                      <figure className="pvr">
                        <img
                          src={thumbnailUrl}
                          alt={item.video_title || 'Video thumbnail'}
                          className="objctimg_box"
                          loading="lazy"
                        />
                        {item.video_time && (
                          <div className="hmvid_duration">{item.video_time}</div>
                        )}
                      </figure>
                    </div>
                    <div className="bnrboxslide_info">
                      <h4>{item.video_title}</h4>
                    </div>
                  </a>
                </div>
              );
            })}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default Videos;
