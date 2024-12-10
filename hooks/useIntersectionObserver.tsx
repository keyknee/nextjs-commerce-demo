import { useEffect, useState } from 'react';

const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry?.isIntersecting || false);
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
};

export default useIntersectionObserver;
