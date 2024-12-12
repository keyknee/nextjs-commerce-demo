'use client';
import { PauseIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import type { Video } from 'lib/wix/types';
import { useEffect, useRef, useState } from 'react';

interface VideoControlsProps {
  isPlaying: boolean;
  isAudible: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAudible: React.Dispatch<React.SetStateAction<boolean>>;
}

function VideoControls({ isPlaying, setIsPlaying, isAudible, setIsAudible }: VideoControlsProps) {
  return (
    <div className="text-shadow-sm relative z-10 flex justify-between px-2 text-theme-secondary">
      <button className="hover:text-theme-primary" onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
      </button>
      <button className="hover:text-theme-primary" onClick={() => setIsAudible((prev) => !prev)}>
        {isAudible ? (
          <SpeakerXMarkIcon className="h-6 w-6" />
        ) : (
          <SpeakerWaveIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

export function VideoPlayer(props: Video & { hideControls?: boolean }) {
  const { url, thumbnail, hideControls } = props;
  const ref = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudible, setIsAudible] = useState(false);

  useEffect(() => {
    setIsPlaying(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying, ref]);

  useEffect(() => {
    if (ref.current) {
      ref.current.muted = !isAudible;
    }
  }, [isAudible]);

  return (
    <div className="relative w-full">
      <video
        ref={ref}
        className={clsx(
          'scroll-animate',
          { 'opacity-100': isVisible },
          { 'opacity-0': !isVisible }
        )}
        loop
        poster={thumbnail}
        playsInline
      >
        <source src={url} type={'video/webm'} />
      </video>
      <div className="video-vignette absolute left-0 top-0 h-full w-full" />
      {!hideControls && (
        <VideoControls
          isPlaying={isPlaying}
          isAudible={isAudible}
          setIsAudible={setIsAudible}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}
