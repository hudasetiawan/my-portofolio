"use client";

import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  cursorColor?: string;
  cursorColorOnTarget?: string;
}

const getContainingBlock = (element: HTMLElement | null): HTMLElement | null => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = (block: HTMLElement | null): { x: number; y: number } => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = '#ffffff',
  cursorColorOnTarget
}) => {
  // State untuk mencegah Hydration Mismatch (memastikan komponen hanya jalan di Client)
  const [isMounted, setIsMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containingBlockRef = useRef<HTMLElement | null>(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  const activeStrengthRef = useRef({ current: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    return (hasTouchScreen && isSmallScreen) || mobileRegex.test(userAgent.toLowerCase());
  }, []);

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
    gsap.to(cursorRef.current, {
      x: x - offsetX,
      y: y - offsetY,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>('.target-cursor-corner');

    containingBlockRef.current = getContainingBlock(cursor);
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current);

    let activeTarget: Element | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: NodeJS.Timeout | null = null;

    const cleanupTarget = (target: Element) => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler as EventListener);
      }
      currentLeaveHandler = null;
    };

    const initialOffset = getOffset();
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y,
      opacity: 0 // Sembunyikan secara default saat tidak hover
    });

    // Sembunyikan sudut-sudut kotak di awal
    if (cornersRef.current) {
      gsap.set(Array.from(cornersRef.current), { opacity: 0 });
    }

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) return;

      const strength = activeStrengthRef.current.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
      const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x') as number;
        const currentY = gsap.getProperty(corner, 'y') as number;

        const targetX = targetCornerPositionsRef.current![i].x - cursorX;
        const targetY = targetCornerPositionsRef.current![i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const { x: offsetX, y: offsetY } = getOffset();
      const mouseX = (gsap.getProperty(cursorRef.current, 'x') as number) + offsetX;
      const mouseY = (gsap.getProperty(cursorRef.current, 'y') as number) + offsetY;
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget && currentLeaveHandler) {
        currentLeaveHandler();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current || !cursorRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current || !cursorRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element;
      let current: Element | null = directTarget;
      let target: Element | null = null;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          target = current;
          break;
        }
        current = current.parentElement;
      }
      
      // Jika kursor keluar dari target
      if (!target || !cursorRef.current || !cornersRef.current) {
        if (activeTarget) {
          cleanupTarget(activeTarget);
          activeTarget = null;
        }
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.15 });
        return;
      }

      if (activeTarget === target) return;
      if (activeTarget) cleanupTarget(activeTarget);
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      
      // Munculkan kursor saat hover target
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.15 });

      const corners = Array.from(cornersRef.current);
      corners.forEach(corner => gsap.killTweensOf(corner));

      gsap.set(cursorRef.current, { rotation: 0 });
      gsap.to(corners, { opacity: 1, duration: 0.15, ease: 'power2.out', overwrite: true });

      if (cursorColorOnTarget) {
        gsap.to(corners, { borderColor: cursorColorOnTarget, duration: 0.15, ease: 'power2.out' });
        if (dotRef.current) {
          gsap.to(dotRef.current, { backgroundColor: cursorColorOnTarget, duration: 0.15, ease: 'power2.out' });
        }
      }

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const { x: offsetX, y: offsetY } = getOffset();
      const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
      const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
        { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
      ];

      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current!);

      gsap.to(activeStrengthRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out' });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current![i].x - cursorX,
          y: targetCornerPositionsRef.current![i].y - cursorY,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      const leaveHandler = () => {
        if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);

        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });
        activeTarget = null;

        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.15 });
        }

        if (cursorColorOnTarget && cornersRef.current) {
          gsap.to(Array.from(cornersRef.current), { borderColor: cursorColor, duration: 0.15, ease: 'power2.out' });
          if (dotRef.current) {
            gsap.to(dotRef.current, { backgroundColor: cursorColor, duration: 0.15, ease: 'power2.out' });
          }
        }

        if (cornersRef.current) {
          const cornersArr = Array.from(cornersRef.current);
          gsap.killTweensOf(cornersArr, 'x,y');
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ];
          const tl = gsap.timeline();
          cornersArr.forEach((corner, index) => {
            tl.to(corner, { x: positions[index].x, y: positions[index].y, duration: 0.3, ease: 'power3.out' }, 0);
          });
          tl.to(cornersArr, { opacity: 0, duration: 0.2, ease: 'power2.out' }, 0.15);
        }

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler as EventListener);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });
    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor);
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [isMounted, targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget]);

  if (!isMounted || isMobile || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[2147483647]"
      style={{ mixBlendMode: 'difference', transform: 'translate(-50%, -50%)' }}
    >
      <div 
        ref={dotRef} 
        className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full will-change-transform"
        style={{ backgroundColor: cursorColor, transform: 'translate(-50%, -50%)' }} 
      />
      
      {/* Sudut Kiri Atas (Top-Left) */}
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 will-change-transform"
        style={{ 
          borderColor: cursorColor, 
          borderWidth: '3px',
          borderStyle: 'solid',
          borderRight: 'none',
          borderBottom: 'none',
          transform: 'translate(-150%, -150%)' 
        }} 
      />
      
      {/* Sudut Kanan Atas (Top-Right) */}
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 will-change-transform"
        style={{ 
          borderColor: cursorColor, 
          borderWidth: '3px',
          borderStyle: 'solid',
          borderLeft: 'none',
          borderBottom: 'none',
          transform: 'translate(50%, -150%)' 
        }} 
      />
      
      {/* Sudut Kanan Bawah (Bottom-Right) */}
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 will-change-transform"
        style={{ 
          borderColor: cursorColor, 
          borderWidth: '3px',
          borderStyle: 'solid',
          borderLeft: 'none',
          borderTop: 'none',
          transform: 'translate(50%, 50%)' 
        }} 
      />
      
      {/* Sudut Kiri Bawah (Bottom-Left) */}
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3 h-3 will-change-transform"
        style={{ 
          borderColor: cursorColor, 
          borderWidth: '3px',
          borderStyle: 'solid',
          borderRight: 'none',
          borderTop: 'none',
          transform: 'translate(-150%, 50%)' 
        }} 
      />
    </div>,
    document.body
  );
};

export default TargetCursor;