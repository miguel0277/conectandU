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
  left: "clamp(16px, 10vw, 200px)",
};

const arrowRightStyle: CSSProperties = {
  right: "clamp(16px, 10vw, 200px)",
};

const fadeWrapperStyle: CSSProperties = {
  transition: "opacity 280ms ease, transform 280ms ease",
};

export function TalleresCarousel({ eventos }: TalleresCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [perPage, setPerPage] = useState(3);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      if (width < 600) {
        setPerPage(1);
      } else if (width < 900) {
        setPerPage(2);
      } else {
        setPerPage(3);
      }
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const isTouchMode = viewportWidth > 0 && viewportWidth < 1024;

  const totalPages = Math.max(1, Math.ceil(eventos.length / perPage));

  const visibleItems = useMemo(() => {
    const start = currentPage * perPage;
    return eventos.slice(start, start + perPage);
  }, [currentPage, eventos, perPage]);

  useEffect(() => {
    if (isTouchMode && currentPage !== 0) {
      setCurrentPage(0);
    }
  }, [isTouchMode, currentPage]);

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
    justifyContent: isTouchMode ? "flex-start" : cardsWrapperStyle.justifyContent,
    overflowX: isTouchMode ? "auto" : undefined,
    scrollSnapType: isTouchMode ? "x mandatory" : undefined,
    padding: isTouchMode ? "8px 6px 18px" : undefined,
    gap: isTouchMode ? "20px" : cardsWrapperStyle.gap,
    WebkitOverflowScrolling: isTouchMode ? "touch" : undefined,
  } as CSSProperties;

  const cardResponsiveStyle: CSSProperties = isTouchMode
    ? {
        ...cardStyle,
        width: "min(85vw, 320px)",
        scrollSnapAlign: "start",
      }
    : cardStyle;

  const itemsToRender = isTouchMode ? eventos : visibleItems;

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
            <div style={cardContentStyle}>
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
      {!isTouchMode && totalPages > 1 && (
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
