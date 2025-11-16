"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleIndicatorHover = (index: number) => {
    setActive(index);
  };

  const activeTestimonial = testimonials[active];

  return (
    <section
      style={{
        padding: "72px 16px 64px",
        background: "linear-gradient(180deg, #fefaf0, #f1e5ce)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          color: "#7a4c1f",
        }}
      >
        <Image
          src="/ConectandoElementos/mariposa testimonio.svg"
          alt="Decoración"
          width={100}
          height={100}
          style={{ margin: "0 auto 16px" }}
        />
        <h2
          style={{
            margin: 0,
            fontSize: "2.1rem",
            color: "#b26122",
            fontFamily: '"Outfit Bold", "Outfit", sans-serif',
          }}
        >
          Testimonios de nuestra comunidad
        </h2>
        <p style={{ margin: "12px 0 32px", fontSize: "1.05rem" }}>
          Voces que nos inspiran a seguir conectando creatividad y bienestar.
        </p>

        <article
          style={{
            background: "#fff9e8",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(41,55,28,0.14)",
            padding: "40px 32px",
            minHeight: "200px",
          }}
        >
          <p style={{ fontSize: "1.15rem", lineHeight: 1.6, margin: 0, color: "#3a2b14" }}>
            “{activeTestimonial.quote}”
          </p>
          <p style={{ marginTop: "24px", fontWeight: 700, color: "#4a5a26", fontSize: "1rem" }}>
            {activeTestimonial.author}
          </p>
        </article>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {testimonials.map((_, idx) => (
            <button
              key={`testimonial-indicator-${idx}`}
              onMouseEnter={() => handleIndicatorHover(idx)}
              aria-label={`Ver testimonio ${idx + 1}`}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: idx === active ? "#c27436" : "rgba(194,116,54,0.35)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
