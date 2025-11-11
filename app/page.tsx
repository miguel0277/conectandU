import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { prisma } from "@/lib/prisma";

const homeStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#fefae0",
  color: "#303030",
};

const mainContentStyle: CSSProperties = {
  paddingBottom: "80px",
};

const featuredSectionStyle: CSSProperties = {
  backgroundColor: "#fefae0",
  borderRadius: "32px",
  padding: "56px",
  border: "1px solid rgba(221,162,93,0.5)",
  boxShadow: "0 24px 60px rgba(41,55,28,0.12)",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
};

const featuredHeaderStyle: CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const featuredTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.4rem",
  fontWeight: 700,
  color: "#29371c",
};

const featuredSubtitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  color: "#616d37",
};

const featuredGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "32px",
  textAlign: "center",
};

const featuredCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
  color: "#303030",
};

const featuredImageWrapper: CSSProperties = {
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  overflow: "hidden",
  border: "4px solid rgba(221,162,93,0.6)",
  boxShadow: "0 18px 30px rgba(41,55,28,0.15)",
};

const featuredImageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const featuredNameStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.2rem",
  fontWeight: 700,
};

const featuredDescriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.95rem",
  color: "#616d37",
  lineHeight: 1.6,
};

const seeMoreButtonStyle: CSSProperties = {
  alignSelf: "center",
  padding: "14px 32px",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#bc6d24",
  color: "#fefae0",
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: "0 16px 28px rgba(188,109,36,0.35)",
};

const heroGalleryWrapper: CSSProperties = {
  position: "relative",
  marginTop: "0",
  minHeight: "820px",
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
    "linear-gradient(120deg, rgba(41,55,28,0.85), rgba(97, 109, 55, 0.51))",
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
  borderRadius: "14px",
  backgroundColor: "#ca7c23ff",
  color: "#ffffffff",
  textDecoration: "none",
  fontWeight: 600,
  boxShadow: "0 16px 30px rgba(221, 161, 93, 0.3)",
};

export default async function HomePage() {
  const featuredEventos = await prisma.evento.findMany({
    take: 3,
    orderBy: { id: "asc" },
  });

  const headerAction = (
    <Link
      href="/auth?mode=login&redirect=%2Feventos"
      className="header-icon-link"
      aria-label="Autenticación"
    >
      <Image src="/person.svg" alt="" width={22} height={22} />
    </Link>
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
          style={featuredSectionStyle}
          id="acerca"
          className="home-highlight"
        >
          <header style={featuredHeaderStyle}>
            <h2 style={featuredTitleStyle}>Nuestros talleres</h2>
            <p style={featuredSubtitleStyle}>
              Descubre actividades que inspiran bienestar, creatividad y comunidad.
            </p>
          </header>

          <div style={featuredGridStyle}>
            {featuredEventos.map((evento) => (
              <article key={evento.id} style={featuredCardStyle}>
                <Link
                  href={`/eventos/${evento.id}`}
                  style={featuredImageWrapper}
                >
                  <Image
                    src={evento.imagenPrincipal}
                    alt={evento.titulo}
                    width={180}
                    height={180}
                    style={featuredImageStyle}
                  />
                </Link>
                <h3 style={featuredNameStyle}>{evento.titulo}</h3>
                <p style={featuredDescriptionStyle}>
                  {evento.descripcionLarga.length > 120
                    ? `${evento.descripcionLarga.slice(0, 120)}…`
                    : evento.descripcionLarga}
                </p>
              </article>
            ))}
          </div>

          <Link href="/eventos" style={seeMoreButtonStyle}>
            Ver más talleres
          </Link>
        </section>

        <section id="comunidad" style={{ marginTop: "72px" }}>
          <h2 style={{ color: "#29371c", fontSize: "1.8rem" }}>
            Comunidad conectada
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#303030",
            }}
          >
            Comparte experiencias, amplía tu red y construye proyectos
            colaborativos. Nuestro objetivo es acercar el conocimiento a
            través de talleres prácticos con expertos de la universidad.
          </p>
        </section>

        <section id="contacto" style={{ marginTop: "56px" }}>
          <h2 style={{ color: "#29371c", fontSize: "1.8rem" }}>
            ¿Necesitas ayuda?
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "#303030",
            }}
          >
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

        <p
          style={{
            marginTop: "60px",
            textAlign: "center",
            color: "#616d37",
          }}
        >
          © {new Date().getFullYear()} Conectando · Universidad
        </p>
      </main>
    </div>
  );
}
