"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState, useEffect } from "react";

type TallerItem = {
  id: string;
  titulo: string;
  descripcionLarga: string;
  imagenPrincipal: string;
};

type TalleresCarouselProps = {
  eventos: TallerItem[];
};

const getPerPageForWidth = (width: number) => {
  if (width < 600) {
    return 1;
  }
  if (width < 900) {
    return 2;
  }
  return 3;
};

const carouselWrapperStyle: CSSProperties = {
  position: "relative",
  marginTop: "16px",
};

const cardsWrapperStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "clamp(20px, 5vw, 68px)",
  minHeight: "380px",
};

const cardStyle: CSSProperties = {
  flex: "0 0 auto",
  width: "clamp(280px, 30vw, 320px)",
  borderRadius: "18px",
  background: "#ffffff",
  boxShadow: "0 30px 80px rgba(41, 55, 28, 0.2)",
  display: "flex",
  flexDirection: "column",
  transition: "opacity 320ms ease, transform 320ms ease",
};

const imageWrapperStyle: CSSProperties = {
  height: "200px",
  width: "100%",
  position: "relative",
  borderTopLeftRadius: "18px",
  borderTopRightRadius: "18px",
  overflow: "hidden",
};

const cardContentStyle: CSSProperties = {
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: 1,
};

const cardTitleStyle: CSSProperties = {
  fontSize: "1.3rem",
  color: "#bc6d24",
  margin: 0,
};

const cardDescriptionStyle: CSSProperties = {
  color: "#303030",
  fontSize: "1rem",
  lineHeight: 1.6,
  margin: 0,
  flexGrow: 1,
};

const cardActionStyle: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#bc6d24",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  marginTop: "8px",
};

const arrowButtonBase: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#bc6d24",
  cursor: "pointer",
  boxShadow: "0 18px 28px rgba(0, 0, 0, 0.35)",
  display: "grid",
  placeItems: "center",
  padding: 0,
};

const arrowLeftStyle: CSSProperties = {
  left: "clamp(-140px, -8vw, -56px)",
};

const arrowRightStyle: CSSProperties = {
  right: "clamp(-140px, -8vw, -56px)",
};

const fadeWrapperStyle: CSSProperties = {
  transition: "opacity 280ms ease, transform 280ms ease",
};

export function TalleresCarousel({ eventos }: TalleresCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [perPage, setPerPage] = useState(() =>
    getPerPageForWidth(
      typeof window !== "undefined" ? window.innerWidth : 1200,
    ),
  );

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setPerPage(getPerPageForWidth(width));
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const isMobileSwipe = viewportWidth > 0 && viewportWidth <= 768;

  const totalPages = Math.max(1, Math.ceil(eventos.length / perPage));

  const visibleItems = useMemo(() => {
    const start = currentPage * perPage;
    return eventos.slice(start, start + perPage);
  }, [currentPage, eventos, perPage]);

  useEffect(() => {
    if (isMobileSwipe && currentPage !== 0) {
      setCurrentPage(0);
    }
  }, [isMobileSwipe, currentPage]);

  const handleNavigate = (direction: "next" | "prev") => {
    if (isFading) return;
    setIsFading(true);
    const nextPage =
      direction === "next"
        ? Math.min(totalPages - 1, currentPage + 1)
        : Math.max(0, currentPage - 1);
    if (nextPage === currentPage) {
      setTimeout(() => setIsFading(false), 200);
      return;
    }
    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsFading(false);
    }, 200);
  };

  if (eventos.length === 0) {
    return null;
  }

  const wrapperStyle = {
    ...cardsWrapperStyle,
    opacity: isFading ? 0.2 : 1,
    transform: isFading ? "translateY(12px)" : "translateY(0)",
    justifyContent: isMobileSwipe ? "flex-start" : cardsWrapperStyle.justifyContent,
    overflowX: isMobileSwipe ? "auto" : undefined,
    scrollSnapType: isMobileSwipe ? "x mandatory" : undefined,
    padding: isMobileSwipe ? "8px 16px 18px" : undefined,
    gap: isMobileSwipe ? "16px" : cardsWrapperStyle.gap,
    WebkitOverflowScrolling: isMobileSwipe ? "touch" : undefined,
    scrollbarWidth: isMobileSwipe ? "none" : undefined,
    msOverflowStyle: isMobileSwipe ? "none" : undefined,
  } as CSSProperties;

  const cardResponsiveStyle: CSSProperties = isMobileSwipe
    ? {
        ...cardStyle,
        width: "min(92vw, 420px)",
        maxWidth: "420px",
        scrollSnapAlign: "center",
        borderRadius: "22px",
        boxShadow: "0 20px 45px rgba(41, 55, 28, 0.18)",
      }
    : cardStyle;

  const cardContentResponsiveStyle: CSSProperties = isMobileSwipe
    ? {
        ...cardContentStyle,
        padding: "24px 20px 26px",
      }
    : cardContentStyle;

  const itemsToRender = isMobileSwipe ? eventos : visibleItems;
  const showDesktopArrows = !isMobileSwipe && totalPages > 1;

  return (
    <div style={carouselWrapperStyle}>
      <div
        style={wrapperStyle}
        className="talleres-cards-wrapper"
      >
        {itemsToRender.map((evento) => (
          <article key={evento.id} style={cardResponsiveStyle} className="talleres-card">
            <div style={imageWrapperStyle}>
              <Image
                src={evento.imagenPrincipal}
                alt={evento.titulo}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 320px"
              />
            </div>
            <div style={cardContentResponsiveStyle}>
              <h3 style={cardTitleStyle}>{evento.titulo}</h3>
              <p style={cardDescriptionStyle}>
                {evento.descripcionLarga.length > 140
                  ? `${evento.descripcionLarga.slice(0, 140)}…`
                  : evento.descripcionLarga}
              </p>
              <Link href={`/eventos/${evento.id}`} style={cardActionStyle}>
                Conocer más →
              </Link>
            </div>
          </article>
        ))}
      </div>
      {showDesktopArrows && (
        <>
          <button
            type="button"
            aria-label="Ver talleres anteriores"
            style={{ ...arrowButtonBase, ...arrowLeftStyle }}
            onClick={() => handleNavigate("prev")}
            disabled={currentPage === 0}
          >
            <Image
              src="/Conectando/chevron-compact-left.svg"
              alt="Anterior"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            aria-label="Ver talleres siguientes"
            style={{ ...arrowButtonBase, ...arrowRightStyle }}
            onClick={() => handleNavigate("next")}
            disabled={currentPage === totalPages - 1}
          >
            <Image
              src="/Conectando/chevron-compact-right.svg"
              alt="Siguiente"
              width={24}
              height={24}
            />
          </button>
        </>
      )}
    </div>
  );
}
