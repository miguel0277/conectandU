import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";

const homeStyle: CSSProperties = {
  minHeight: "100vh",
  fontFamily: "Inter, system-ui, sans-serif",
  backgroundColor: "#fefae0",
  color: "#303030",
};

const mainContentStyle: CSSProperties = {
  paddingBottom: "80px",
};

const highlightStyle: CSSProperties = {
  backgroundColor: "#fefae0",
  borderRadius: "24px",
  padding: "48px",
  border: "1px solid rgba(221,162,93,0.5)",
  boxShadow: "0 24px 60px rgba(41,55,28,0.12)",
  color: "#303030",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const highlightTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.4rem",
  fontWeight: 700,
  color: "#29371c",
};

const highlightTextStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.05rem",
  lineHeight: 1.7,
  color: "#303030",
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginTop: "12px",
};

const primaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "999px",
  backgroundColor: "#bc6d24",
  color: "#fefae0",
  textDecoration: "none",
  fontWeight: 600,
  boxShadow: "0 16px 28px rgba(188,109,36,0.35)",
};

const secondaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "999px",
  border: "2px solid #616d37",
  color: "#616d37",
  textDecoration: "none",
  fontWeight: 600,
  backgroundColor: "transparent",
};

const footerStyle: CSSProperties = {
  marginTop: "60px",
  textAlign: "center",
  color: "#616d37",
  fontSize: "0.9rem",
};

const heroGalleryWrapper: CSSProperties = {
  position: "relative",
  marginTop: "0",
  minHeight: "520px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const heroBackground: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/imagenHome.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.75)",
};

const heroOverlay: CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(120deg, rgba(41,55,28,0.85), rgba(97,109,55,0.8))",
};

const heroContent: CSSProperties = {
  position: "relative",
  zIndex: 2,
  color: "#fefae0",
  maxWidth: "860px",
  padding: "48px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const heroHeading: CSSProperties = {
  margin: 0,
  fontSize: "2.6rem",
  lineHeight: 1.3,
  fontWeight: 700,
  color: "#fefae0",
};

const heroSubheading: CSSProperties = {
  margin: 0,
  fontSize: "1.15rem",
  color: "rgba(254,250,224,0.9)",
};

const heroButtonRow: CSSProperties = {
  marginTop: "12px",
};

const heroButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 28px",
  borderRadius: "999px",
  backgroundColor: "#dda25d",
  color: "#303030",
  textDecoration: "none",
  fontWeight: 600,
  boxShadow: "0 16px 30px rgba(221,162,93,0.4)",
};

export default function HomePage() {
  const headerAction = (
    <>
      <Link href="/auth?mode=login&redirect=%2Feventos">Entrar</Link>
      <Link
        href="/auth?mode=register&redirect=%2Feventos"
        style={{ backgroundColor: "#bc6d24" }}
      >
        Registrarse
      </Link>
    </>
  );

  return (
    <div style={homeStyle}>
      <SiteHeader actionSlot={headerAction} />

      <main style={mainContentStyle}>
        <section
          style={heroGalleryWrapper}
          className="home-hero-gallery"
        >
          <div style={heroBackground} />
          <div style={heroOverlay} />
          <div style={heroContent} className="home-hero-content">
            <h1 style={heroHeading} className="home-hero-heading">
              Plataforma dedicada a reservar talleres y espacios enfocados en el
              bienestar y la creatividad
            </h1>
            <p style={heroSubheading} className="home-hero-subheading">
              Desconéctate, reconéctate, crece
            </p>
            <div style={heroButtonRow} className="home-hero-actions">
              <Link
                href="/about-us"
                style={heroButtonStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explora
              </Link>
            </div>
          </div>
        </section>

        <section
          style={highlightStyle}
          id="acerca"
          className="home-highlight"
        >
          <h1 style={highlightTitleStyle} className="home-highlight-title">
            Bienvenido a Conectando
          </h1>
          <p style={highlightTextStyle} className="home-highlight-text">
            Una comunidad universitaria para descubrir experiencias
            presenciales y virtuales. Aquí encontrarás talleres,
            encuentros y actividades que fortalecen las habilidades de la
            comunidad académica.
          </p>
          <p style={highlightTextStyle} className="home-highlight-text">
            Explora nuestros talleres activos y guarda tu cupo.
            Inicia sesión para recibir recordatorios, materiales y
            novedades pensadas para ti.
          </p>

          <div style={ctaRowStyle} className="home-highlight-cta">
            <Link href="/eventos" style={primaryCtaStyle} className="home-primary-cta">
              Ver talleres disponibles
            </Link>
            <Link
              href="/auth?mode=register&redirect=%2Feventos"
              style={secondaryCtaStyle}
              className="home-secondary-cta"
            >
              Crear cuenta
            </Link>
          </div>
        </section>

        <section id="comunidad" style={{ marginTop: "72px" }}>
          <h2 style={{ color: "#29371c", fontSize: "1.8rem" }}>
            Comunidad conectada
          </h2>
          <p style={highlightTextStyle}>
            Comparte experiencias, amplía tu red y construye proyectos
            colaborativos. Nuestro objetivo es acercar el conocimiento a
            través de talleres prácticos con expertos de la universidad.
          </p>
        </section>

        <section id="contacto" style={{ marginTop: "56px" }}>
          <h2 style={{ color: "#29371c", fontSize: "1.8rem" }}>
            ¿Necesitas ayuda?
          </h2>
          <p style={highlightTextStyle}>
            Escríbenos a{" "}
            <a
              href="mailto:conectando@universidad.edu"
              style={{ color: "#bc6d24", fontWeight: 600 }}
            >
              conectando@universidad.edu
            </a>{" "}
            o acércate a Bienestar Universitario para obtener soporte
            personalizado.
          </p>
        </section>

        <p style={footerStyle}>
          © {new Date().getFullYear()} Conectando · Universidad
        </p>
      </main>
    </div>
  );
}
