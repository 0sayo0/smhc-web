"use client";

import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import Link from "next/link";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// ========================================
// TYPES
// ========================================

interface CarouselProps {
  children: ReactNode;

  title: string;
  headingId: string;

  categoryHref: string;

  eyebrow?: string;
}

interface NavigationState {
  activeIndex: number;

  hasOverflow: boolean;

  canPrevious: boolean;
  canNext: boolean;
}

// ========================================
// HELPERS
// ========================================

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

// ========================================
// COMPONENT
// ========================================

export function Carousel({
  children,
  title,
  headingId,
  categoryHref,
  eyebrow = "Selección de SMHC",
}: CarouselProps) {
  const items = Children.toArray(children);

  const viewportId = useId();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [navigation, setNavigation] = useState<NavigationState>({
    activeIndex: 0,
    hasOverflow: false,
    canPrevious: false,
    canNext: false,
  });

  const isCarousel = items.length > 2;

  // ========================================
  // OBSERVE SCROLL AND RESIZE
  // ========================================

  useEffect(() => {
    if (!isCarousel) return;

    const viewport = scrollRef.current;

    if (!viewport) return;

    let animationFrame: number | null = null;

    const measure = () => {
      const slides = Array.from(viewport.children) as HTMLElement[];

      if (slides.length === 0) return;

      const maxScroll = Math.max(
        0,
        viewport.scrollWidth - viewport.clientWidth,
      );

      const scrollLeft = viewport.scrollLeft;

      const step =
        slides.length > 1
          ? slides[1].offsetLeft - slides[0].offsetLeft
          : viewport.clientWidth;

      const threshold = Math.min(48, Math.max(2, step * 0.12));

      const hasOverflow = maxScroll > 8;

      // Find the slide closest to the
      // current leftmost visible position.

      const firstOffset = slides[0].offsetLeft;

      let activeIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const slidePosition = slide.offsetLeft - firstOffset;

        const distance = Math.abs(slidePosition - scrollLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });

      const nextState: NavigationState = {
        activeIndex,

        hasOverflow,

        canPrevious: hasOverflow && scrollLeft > threshold,

        canNext: hasOverflow && maxScroll - scrollLeft > threshold,
      };

      setNavigation((previous) => {
        if (
          previous.activeIndex === nextState.activeIndex &&
          previous.hasOverflow === nextState.hasOverflow &&
          previous.canPrevious === nextState.canPrevious &&
          previous.canNext === nextState.canNext
        ) {
          return previous;
        }

        return nextState;
      });
    };

    const scheduleMeasure = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;

        measure();
      });
    };

    // Monitor viewport and slide sizes.

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMeasure)
        : null;

    resizeObserver?.observe(viewport);

    Array.from(viewport.children).forEach((element) => {
      resizeObserver?.observe(element);
    });

    viewport.addEventListener("scroll", scheduleMeasure, { passive: true });

    window.addEventListener("resize", scheduleMeasure);

    scheduleMeasure();

    return () => {
      viewport.removeEventListener("scroll", scheduleMeasure);

      window.removeEventListener("resize", scheduleMeasure);

      resizeObserver?.disconnect();

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [isCarousel, items.length]);

  // ========================================
  // SCROLL NAVIGATION
  // ========================================

  const move = (direction: -1 | 1) => {
    const viewport = scrollRef.current;

    if (!viewport) return;

    const slides = Array.from(viewport.children) as HTMLElement[];

    if (slides.length < 2) return;

    const step = Math.max(1, slides[1].offsetLeft - slides[0].offsetLeft);

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    const target = Math.min(
      maxScroll,
      Math.max(0, viewport.scrollLeft + direction * step),
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    viewport.scrollTo({
      left: target,

      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Do not intercept keyboard events
    // coming from interactive child elements.

    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="mx-auto max-w-7xl">
      {/* =====================================
          EDITORIAL HEADER
         ===================================== */}

      <div className="px-6">
        <div
          className="
            mb-12

            flex
            flex-col
            gap-8

            border-t
            border-coal/15

            pt-10

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* LEFT — TITLE */}

          <div>
            <span
              className="
                font-system
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]

                text-terracotta
              "
            >
              {eyebrow}
            </span>

            <h2
              id={headingId}
              className="
                mt-5

                font-brand
                text-3xl
                leading-tight

                text-coal

                md:text-4xl
              "
            >
              {title}
            </h2>
          </div>

          {/* RIGHT — ACTION & CONTROLS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-5

              md:justify-end
            "
          >
            {/* CATEGORY LINK */}

            <Link
              href={categoryHref}
              className="
                group

                inline-flex
                items-center
                gap-3

                border-b
                border-coal/30

                pb-2

                font-system
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]

                text-coal

                transition-colors
                duration-300

                smhc-press

                hover:border-terracotta
                hover:text-terracotta
              "
            >
              Explorar categoría
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300

                  motion-safe:group-hover:-translate-y-0.5
                  motion-safe:group-hover:translate-x-0.5
                "
              />
            </Link>

            {/* CAROUSEL CONTROLS */}

            {isCarousel && navigation.hasOverflow && (
              <div
                className="
                    flex
                    items-center
                    gap-4
                  "
              >
                {/* POSITION INDICATOR */}

                <span
                  aria-live="off"
                  className="
                      mr-2

                      whitespace-nowrap

                      font-system
                      text-[10px]
                      font-medium
                      tracking-[0.14em]

                      text-coal/65

                      tabular-nums
                    "
                >
                  {formatIndex(navigation.activeIndex + 1)}

                  <span className="mx-2 text-coal/30">/</span>

                  {formatIndex(items.length)}
                </span>

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={() => move(-1)}
                  disabled={!navigation.canPrevious}
                  aria-label="Mostrar piezas anteriores"
                  aria-controls={viewportId}
                  className="
                      flex
                      h-11
                      w-11

                      items-center
                      justify-center

                      border
                      border-coal/20

                      bg-transparent

                      text-coal

                      transition-[background-color,color,border-color]
                      duration-300

                      smhc-press

                      hover:border-coal
                      hover:bg-coal
                      hover:text-cream

                      disabled:cursor-not-allowed
                      disabled:opacity-30

                      disabled:hover:border-coal/20
                      disabled:hover:bg-transparent
                      disabled:hover:text-coal
                    "
                >
                  <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.5} />
                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={() => move(1)}
                  disabled={!navigation.canNext}
                  aria-label="Mostrar piezas siguientes"
                  aria-controls={viewportId}
                  className="
                      flex
                      h-11
                      w-11

                      items-center
                      justify-center

                      border
                      border-coal/20

                      bg-transparent

                      text-coal

                      transition-[background-color,color,border-color]
                      duration-300

                      hover:border-coal
                      hover:bg-coal
                      hover:text-cream

                      disabled:cursor-not-allowed
                      disabled:opacity-30

                      disabled:hover:border-coal/20
                      disabled:hover:bg-transparent
                      disabled:hover:text-coal
                    "
                >
                  <ChevronRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================
          PRODUCT PRESENTATION
         ===================================== */}

      {!isCarousel ? (
        // One or two products:
        // a static editorial grid.

        <div
          className="
            grid
            max-w-4xl
            grid-cols-1
            gap-8

            px-6

            sm:grid-cols-2
          "
        >
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ) : (
        // Three or more products:
        // responsive horizontal gallery.

        <div
          id={viewportId}
          ref={scrollRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label={`Piezas de ${title}`}
          tabIndex={navigation.hasOverflow ? 0 : -1}
          onKeyDown={handleKeyDown}
          className="
            relative

            flex
            gap-4

            overflow-x-auto
            overscroll-x-contain

            px-6
            pb-8

            scroll-px-6

            snap-x
            snap-mandatory

            hide-scrollbar

            sm:gap-6
          "
        >
          {items.map((item, index) => (
            <div
              key={index}
              role="group"
              aria-label={`Pieza ${index + 1} de ${items.length}`}
              data-carousel-item
              className="
                w-[80%]
                shrink-0

                snap-start

                sm:w-[47%]
                lg:w-[31%]
              "
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
