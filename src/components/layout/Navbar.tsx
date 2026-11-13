"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import type { NavigationCategory } from "@/lib/navigation";

interface NavbarProps {
  categories: NavigationCategory[];
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();

  const prefersReducedMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);

  const [isDesktopOpen, setIsDesktopOpen] = useState(false);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const desktopTriggerRef = useRef<HTMLButtonElement>(null);

  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  const firstDesktopLinkRef = useRef<HTMLAnchorElement>(null);

  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // ========================================
  // ANIMATION CONFIGURATION
  // ========================================

  const brandTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 170,
        damping: 26,
        mass: 1,
      };

  const panelDuration = prefersReducedMotion ? 0 : 0.6;

  // ========================================
  // SCROLL STATE
  // ========================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    const frame = requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ========================================
  // KEYBOARD & OUTSIDE INTERACTIONS
  // ========================================

  useEffect(() => {
    if (!isDesktopOpen && !isMobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isMobileOpen) {
          mobileTriggerRef.current?.focus();
        } else {
          desktopTriggerRef.current?.focus();
        }

        setIsDesktopOpen(false);
        setIsMobileOpen(false);

        return;
      }

      // Mantener el foco dentro de la navegación
      // móvil mientras está abierta.

      if (event.key === "Tab" && isMobileOpen) {
        const panelLinks = Array.from(
          mobilePanelRef.current?.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ) ?? [],
        );

        const focusableElements = [
          mobileTriggerRef.current,
          ...panelLinks,
        ].filter((element): element is HTMLElement => element !== null);

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];

        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) {
        return;
      }

      setIsDesktopOpen(false);
      setIsMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isDesktopOpen, isMobileOpen]);

  // ========================================
  // MOBILE SCROLL LOCK
  // ========================================

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  // ========================================
  // RESPONSIVE STATE CLEANUP
  // ========================================

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleBreakpointChange = () => {
      setIsDesktopOpen(false);
      setIsMobileOpen(false);
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  // ========================================
  // FOCUS MANAGEMENT
  // ========================================

  useEffect(() => {
    if (!isDesktopOpen) return;

    const timeout = window.setTimeout(() => {
      firstDesktopLinkRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [isDesktopOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const timeout = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [isMobileOpen]);

  // ========================================
  // HELPERS
  // ========================================

  const closeMenus = () => {
    setIsDesktopOpen(false);
    setIsMobileOpen(false);
  };

  const getCategoryHref = (slug: string) => `/catalogo/${slug}`;

  // ========================================
  // RENDER
  // ========================================

  return (
    <header
      ref={headerRef}
      className={`
        fixed inset-x-0 top-0 z-50
        isolate
        border-b border-coal/10
        bg-cream

        transition-shadow duration-500

        ${isScrolled ? "shadow-[0_8px_30px_-24px_rgba(56,56,56,0.28)]" : ""}
      `}
    >
      {/* =====================================
          MAIN NAVIGATION BAR
         ===================================== */}

      <div
        className={`
          relative z-30
          mx-auto flex max-w-375
          items-center

          px-5 sm:px-8 lg:px-12

          h-20

          transition-[height]
          duration-700
          ease-out
          motion-reduce:transition-none

          ${isScrolled ? "lg:h-20" : "lg:h-29"}
        `}
      >
        {/* =====================================
            DESKTOP — LEFT
           ===================================== */}

        <div className="hidden flex-1 items-center lg:flex">
          <button
            ref={desktopTriggerRef}
            type="button"
            aria-expanded={isDesktopOpen}
            aria-controls="smhc-desktop-categories"
            onClick={() => {
              setIsDesktopOpen((previous) => !previous);
            }}
            className="
              group
              inline-flex items-center gap-3
              py-4

              font-system text-[10px]
              font-semibold uppercase
              tracking-[0.18em]

              text-coal

              transition-colors duration-300
              hover:text-terracotta
            "
          >
            Piezas
            <ChevronDown
              aria-hidden="true"
              size={15}
              strokeWidth={1.5}
              className={`
                transition-transform duration-500

                ${isDesktopOpen ? "rotate-180" : ""}
              `}
            />
          </button>
        </div>

        {/* =====================================
            ANIMATED CENTER BRAND
           ===================================== */}

        <Link
          href="/"
          onClick={closeMenus}
          aria-label="Stephany Manzano Home Collection, inicio"
          className="
            group

            absolute
            left-1/2 top-1/2

            -translate-x-1/2
            -translate-y-1/2
          "
        >
          <motion.span
            layout
            transition={brandTransition}
            className={`
              flex items-center justify-center

              flex-col gap-1

              ${isScrolled ? "lg:flex-row lg:gap-3" : "lg:flex-col lg:gap-1.5"}
            `}
          >
            {/* ANIMATED LOGO */}

            <motion.span
              layout
              transition={brandTransition}
              className={`
                relative block shrink-0

                h-6 w-6
                sm:h-7 sm:w-7

                ${isScrolled ? "lg:h-8 lg:w-8" : "lg:h-12 lg:w-12"}
              `}
            >
              <Image
                src="/smhc_logo_nobg.png"
                alt=""
                fill
                sizes="48px"
                className="
                  object-contain
                  brightness-0

                  transition-opacity duration-300
                  group-hover:opacity-70
                "
              />
            </motion.span>

            {/* ANIMATED TYPOGRAPHY */}

            <motion.span
              layout="position"
              transition={brandTransition}
              className="
                flex shrink-0
                flex-col items-center
                text-center
              "
            >
              <span
                className="
                  whitespace-nowrap

                  font-brand
                  text-[12px]
                  sm:text-[14px]
                  lg:text-[17px]

                  leading-6
                  tracking-[0.12em]

                  text-coal
                "
              >
                STEPHANY MANZANO
              </span>

              <span
                className="
                  mt-0.5

                  font-editorial
                  text-[10px]
                  lg:text-[11px]

                  italic
                  tracking-[0.16em]

                  text-terracotta
                "
              >
                Home Collection
              </span>
            </motion.span>
          </motion.span>
        </Link>

        {/* =====================================
            DESKTOP — RIGHT
           ===================================== */}

        <nav
          aria-label="Páginas principales"
          className="
            hidden flex-1
            items-center justify-end
            gap-10

            lg:flex
          "
        >
          <Link
            href="/colecciones"
            onClick={closeMenus}
            aria-current={
              pathname === "/colecciones" ||
              pathname.startsWith("/colecciones/")
                ? "page"
                : undefined
            }
            className="
    font-system text-[10px]
    font-semibold uppercase
    tracking-[0.18em]
    text-coal
    transition-colors duration-300
    hover:text-terracotta
    aria-[current=page]:text-terracotta
  "
          >
            Colecciones
          </Link>

          <Link
            href="/nosotros"
            onClick={closeMenus}
            aria-current={pathname === "/nosotros" ? "page" : undefined}
            className="
              font-system text-[10px]
              font-semibold uppercase
              tracking-[0.18em]

              text-coal

              transition-colors duration-300
              hover:text-terracotta

              aria-[current=page]:text-terracotta
            "
          >
            Historia
          </Link>

          <Link
            href="/contacto"
            onClick={closeMenus}
            aria-current={pathname === "/contacto" ? "page" : undefined}
            className="
              font-system text-[10px]
              font-semibold uppercase
              tracking-[0.18em]

              text-coal

              transition-colors duration-300
              hover:text-terracotta

              aria-[current=page]:text-terracotta
            "
          >
            Contacto
          </Link>
        </nav>

        {/* =====================================
            MOBILE MENU BUTTON
           ===================================== */}

        <button
          ref={mobileTriggerRef}
          type="button"
          aria-expanded={isMobileOpen}
          aria-controls="smhc-mobile-navigation"
          aria-label={
            isMobileOpen
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          onClick={() => {
            setIsMobileOpen((previous) => !previous);
          }}
          className="
            ml-auto flex
            h-11 w-11

            items-center justify-center

            text-coal

            lg:hidden
          "
        >
          {isMobileOpen ? (
            <X aria-hidden="true" size={23} strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden="true" size={23} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* =====================================
          DESKTOP MENU BACKDROP
         ===================================== */}

      <AnimatePresence>
        {isDesktopOpen && (
          <motion.button
            key="desktop-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Cerrar menú de piezas"
            onClick={() => setIsDesktopOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
            }}
            className="
              fixed inset-0 z-0
              hidden bg-coal/20
              lg:block
            "
          />
        )}
      </AnimatePresence>

      {/* =====================================
          DESKTOP EDITORIAL MENU
         ===================================== */}

      <AnimatePresence>
        {isDesktopOpen && (
          <motion.nav
            key="desktop-menu"
            id="smhc-desktop-categories"
            aria-label="Categorías de productos"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: -16,
                    clipPath: "inset(0% 0% 100% 0%)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -10,
                    clipPath: "inset(0% 0% 100% 0%)",
                  }
            }
            transition={{
              duration: panelDuration,
              ease,
            }}
            className="
              absolute inset-x-0 top-full z-20

              hidden
              max-h-[calc(100dvh-8rem)]
              overflow-y-auto

              border-t border-coal/10
              bg-cream

              shadow-[0_24px_50px_-32px_rgba(56,56,56,0.25)]

              lg:block
            "
          >
            <div
              className="
                mx-auto grid max-w-375

                grid-cols-[0.7fr_1.3fr]
                gap-16

                px-12 py-16

                xl:gap-24
                xl:px-20
              "
            >
              {/* EDITORIAL INTRO */}

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  delay: prefersReducedMotion ? 0 : 0.14,
                  ease,
                }}
              >
                <span
                  className="
                    font-system text-[10px]
                    font-semibold uppercase
                    tracking-[0.25em]

                    text-terracotta
                  "
                >
                  El universo SMHC
                </span>

                <h2
                  className="
                    mt-7 max-w-sm

                    font-brand text-4xl
                    leading-tight

                    text-coal

                    xl:text-5xl
                  "
                >
                  Nuestras piezas
                </h2>

                <div
                  aria-hidden="true"
                  className="mt-7 h-px w-12 bg-terracotta"
                />

                <p
                  className="
                    mt-7 max-w-xs

                    font-editorial text-base
                    leading-8

                    text-coal/65
                  "
                >
                  Objetos creados con intención, sensibilidad y atención a cada
                  detalle.
                </p>
              </motion.div>

              {/* DYNAMIC CATEGORY GRID */}

              <ul
                className="
                  grid grid-cols-1
                  gap-px bg-coal/10

                  xl:grid-cols-2
                "
              >
                {categories.map((category, index) => {
                  const href = getCategoryHref(category.slug);

                  return (
                    <motion.li
                      key={category._id}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 20 }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.7,

                        delay: prefersReducedMotion
                          ? 0
                          : 0.2 + Math.min(index, 5) * 0.08,

                        ease,
                      }}
                    >
                      <Link
                        ref={index === 0 ? firstDesktopLinkRef : undefined}
                        href={href}
                        onClick={closeMenus}
                        aria-current={pathname === href ? "page" : undefined}
                        className="
                          group relative flex
                          h-full min-h-48

                          flex-col

                          bg-cream p-8

                          transition-colors duration-500
                          hover:bg-warm
                        "
                      >
                        <span
                          className="
                            font-system text-[10px]
                            tracking-[0.2em]

                            text-terracotta
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className="
                            mt-6

                            font-brand text-2xl
                            leading-tight

                            text-coal

                            transition-colors duration-500
                            group-hover:text-terracotta

                            xl:text-3xl
                          "
                        >
                          {category.label}
                        </span>

                        {category.description && (
                          <span
                            className="
                              mt-4 max-w-xs

                              font-editorial text-sm
                              leading-6

                              text-coal/60
                            "
                          >
                            {category.description}
                          </span>
                        )}

                        <ArrowUpRight
                          aria-hidden="true"
                          size={19}
                          strokeWidth={1.4}
                          className="
                            absolute right-7 top-7

                            text-coal/50

                            transition-transform duration-500

                            motion-safe:group-hover:-translate-y-1
                            motion-safe:group-hover:translate-x-1
                          "
                        />
                      </Link>
                      {/* SUBCATEGORY NAVIGATION */}

                      {category.children.length > 0 && (
                        <div
                          className="
      border-t
      border-coal/10

      bg-cream

      px-8
      py-7
    "
                        >
                          <span
                            className="
        font-system
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.2em]

        text-terracotta
      "
                          >
                            Explorar por tipo
                          </span>

                          <div
                            className="
        mt-5

        flex
        flex-col
        gap-4
      "
                          >
                            {category.children.map((child) => {
                              const childHref = `/catalogo/${category.slug}/${child.slug}`;

                              return (
                                <Link
                                  key={child._id}
                                  href={childHref}
                                  onClick={closeMenus}
                                  aria-current={
                                    pathname === childHref ? "page" : undefined
                                  }
                                  className="
              group/sub

              flex
              items-center
              justify-between
              gap-4

              py-1

              font-editorial
              text-sm

              text-coal/75

              transition-colors
              duration-300

              hover:text-terracotta

              aria-[current=page]:text-terracotta
            "
                                >
                                  <span>{child.label}</span>

                                  <ArrowUpRight
                                    aria-hidden="true"
                                    size={15}
                                    strokeWidth={1.5}
                                    className="
                shrink-0

                transition-transform
                duration-300

                motion-safe:group-hover/sub:-translate-y-0.5
                motion-safe:group-hover/sub:translate-x-0.5
              "
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </motion.li>
                  );
                })}

                {categories.length === 0 && (
                  <li
                    className="
                      bg-cream p-8

                      font-editorial text-base
                      italic text-coal/60
                    "
                  >
                    Estamos preparando nuestras piezas.
                  </li>
                )}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* =====================================
          MOBILE EDITORIAL NAVIGATION
         ===================================== */}

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            ref={mobilePanelRef}
            id="smhc-mobile-navigation"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: -14,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : -10,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease,
            }}
            className="
              fixed inset-x-0 bottom-0 top-20 z-20

              overflow-y-auto
              overscroll-contain

              border-t border-coal/10

              bg-cream

              lg:hidden
            "
          >
            <nav
              aria-label="Navegación móvil"
              className="
                mx-auto flex max-w-xl

                flex-col

                px-8
                pb-16 pt-12
              "
            >
              <span
                className="
                  font-system text-[10px]
                  font-semibold uppercase
                  tracking-[0.25em]

                  text-terracotta
                "
              >
                Explorar
              </span>

              <h2
                className="
                  mb-9 mt-5

                  font-brand text-3xl
                  text-coal
                "
              >
                Nuestras piezas
              </h2>

              {/* MOBILE CATEGORIES */}

              <div
                className="
                  flex flex-col

                  border-t border-coal/15
                "
              >
                {categories.map((category, index) => {
                  const href = getCategoryHref(category.slug);

                  return (
                    <motion.div
                      key={category._id}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 12 }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.6,

                        delay: prefersReducedMotion
                          ? 0
                          : 0.12 + Math.min(index, 5) * 0.07,

                        ease,
                      }}
                    >
                      <Link
                        ref={index === 0 ? firstMobileLinkRef : undefined}
                        href={href}
                        onClick={closeMenus}
                        aria-current={pathname === href ? "page" : undefined}
                        className="
                          group flex min-h-20

                          items-center justify-between
                          gap-4

                          border-b border-coal/15

                          py-5
                        "
                      >
                        <span
                          className="
                            font-brand
                            text-[clamp(1.35rem,5vw,1.9rem)]

                            text-coal

                            transition-colors duration-300
                            group-hover:text-terracotta
                          "
                        >
                          {category.label}
                        </span>

                        <ArrowUpRight
                          aria-hidden="true"
                          size={20}
                          strokeWidth={1.4}
                          className="
                            shrink-0 text-terracotta
                          "
                        />
                      </Link>
                      {/* MOBILE SUBCATEGORIES */}

                      {category.children.length > 0 && (
                        <div
                          className="
      flex
      flex-col

      gap-5

      border-b
      border-coal/15

      px-5
      py-6
    "
                        >
                          {category.children.map((child) => {
                            const childHref = `/catalogo/${category.slug}/${child.slug}`;

                            return (
                              <Link
                                key={child._id}
                                href={childHref}
                                onClick={closeMenus}
                                aria-current={
                                  pathname === childHref ? "page" : undefined
                                }
                                className="
            flex
            min-h-11
            items-center
            justify-between

            gap-4

            font-editorial
            text-base

            text-coal/70

            transition-colors
            duration-300

            hover:text-terracotta

            aria-[current=page]:text-terracotta
          "
                              >
                                {child.label}

                                <ArrowUpRight
                                  aria-hidden="true"
                                  size={15}
                                  strokeWidth={1.5}
                                  className="shrink-0"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* SECONDARY NAVIGATION */}

              <div
                className="
                  mt-12 flex flex-col gap-7
                "
              >
                <Link
                  href="/colecciones"
                  onClick={closeMenus}
                  ref={categories.length === 0 ? firstMobileLinkRef : undefined}
                  aria-current={
                    pathname === "/colecciones" ||
                    pathname.startsWith("/colecciones/")
                      ? "page"
                      : undefined
                  }
                  className="
    font-system text-[11px]
    font-semibold uppercase
    tracking-[0.18em]
    text-coal
    transition-colors duration-300
    hover:text-terracotta
    aria-[current=page]:text-terracotta
  "
                >
                  Colecciones
                </Link>

                <Link
                  href="/nosotros"
                  onClick={closeMenus}
                  className="
                    font-system text-[11px]
                    font-semibold uppercase
                    tracking-[0.18em]

                    text-coal

                    transition-colors duration-300
                    hover:text-terracotta
                  "
                >
                  Nuestra historia
                </Link>

                <Link
                  href="/contacto"
                  onClick={closeMenus}
                  className="
                    font-system text-[11px]
                    font-semibold uppercase
                    tracking-[0.18em]

                    text-coal

                    transition-colors duration-300
                    hover:text-terracotta
                  "
                >
                  Contacto
                </Link>
              </div>

              {/* EDITORIAL SIGNATURE */}

              <div
                className="
                  mt-16

                  border-t border-coal/15
                  pt-7
                "
              >
                <p
                  className="
                    font-editorial text-sm
                    italic text-coal/60
                  "
                >
                  Objetos hechos con intención.
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
