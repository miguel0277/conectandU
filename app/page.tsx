import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { prisma } from "@/lib/prisma";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { TalleresCarousel } from "@/components/talleres-carousel";

const normalizeImageSrc = (src: string) =>
  src
    .replace(/ /g, "%20")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
const homeStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#fff4e4ff",
  color: "#303030",
};

const mainContentStyle: CSSProperties = {
  paddingBottom: "0px",
};

const seeMoreButtonStyle: CSSProperties = {
  alignSelf: "center",
  padding: "14px 32px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "#bc6d24",
  color: "#fefae0",
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: "0 16px 28px rgba(188,109,36,0.35)",
};

const talleresTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.4rem",
  fontWeight: 700,
  color: "#bc6d24",
};

const talleresSubtitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.1rem",
  color: "#51692a",
  lineHeight: 1.6,
  maxWidth: "640px",
};

const talleresFooterStyle: CSSProperties = {
  marginTop: "78px",
  display: "flex",
  justifyContent: "center",
};

const talleresPopularesGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "50px",
  justifyItems: "center",
  justifyContent: "center",
};

const talleresPopularesCardStyle: CSSProperties = {
  width: "100%",
  maxWidth: "330px",
  flex: "0 0 auto",
  borderRadius: "12px",
  backgroundColor: "#fffce9",
  boxShadow: "0 30px 60px rgba(41, 55, 28, 0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const talleresPopularesImageStyle: CSSProperties = {
  width: "100%",
  height: "280px",
  position: "relative",
  overflow: "hidden",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const talleresPopularesLabelStyle: CSSProperties = {
  padding: "18px",
  backgroundColor: "#4f5c27",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.1rem",
  textAlign: "center",
};

const instructorsSectionStyle: CSSProperties = {
  padding: "0px 0",
  background: "linear-gradient(90deg, #fff7df, #c67c37)",
};

const instructorsInnerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 740px) minmax(0, 1fr)",
  gap: "40px",
  alignItems: "center",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 0px",
};

const instructorsTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.4rem",
  fontWeight: 700,
  color: "#bc6d24",
};

const instructorsSubtitleStyle: CSSProperties = {
  margin: "0 0 12px",
  fontSize: "1.15rem",
  color: "#5f4d1e",
  lineHeight: 1.6,
};

const instructorsCopyStyle: CSSProperties = {
  color: "#43361a",
  fontSize: "1rem",
  lineHeight: 1.65,
  marginTop: "16px",
};

const instructorsGalleryStyle: CSSProperties = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "16px",
  position: "relative",
  overflow: "hidden",
  height: "500px",
};

const instructorsCardStyle: CSSProperties = {
  width: "100%",
  borderRadius: "12px",
  height: "160px",
  overflow: "hidden",
  boxShadow: "0 16px 30px rgba(41, 55, 28, 0.25)",
};

const instructorImages = [
  "/Conectando/pexels-mikhail-nilov-8350316.jpg",
  "/Conectando/pexels-ene-marius-241207761-32727804.jpg",
  "/Conectando/pexels-danxavier-1239291 (1).jpg",
];

const instructorColumnA = [...instructorImages, ...instructorImages];
const instructorColumnB = [...instructorImages.slice().reverse(), ...instructorImages.slice().reverse()];
const testimonialsData = [
  {
    quote: "Llegué por curiosidad y me fui con un corazón lleno, una mente en calma y nuevas amistades.",
    author: "Julia Montaña",
  },
  {
    quote: "Conectando me ayudó a descubrir habilidades que no sabía que tenía y a compartirlas con la comunidad.",
    author: "Mateo Valencia",
  },
  {
    quote: "Cada taller es una experiencia que me impulsa a crear y a reconectar con mi propósito.",
    author: "Laura Campos",
  },
];

const bookingBannerStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(24, 49, 25, 0.8), rgba(24, 49, 25, 0.8)), url('/Conectando/celebra-dia-amigo-20-frases-emotivas-divertidas_98.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "150px 0px",
  color: "#fff",
  textAlign: "center",
  margin: "0px 0px",
  maxWidth: "100%",
};

const bookingButtonStyle: CSSProperties = {
  marginTop: "28px",
  padding: "14px 32px",
  borderRadius: "18px",
  backgroundColor: "#f8f1d4",
  color: "#304218",
  fontWeight: 600,
  border: "none",
  textDecoration: "none",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 16px 28px rgba(0,0,0,0.25)",
};

const talleresPopularesHeaderStyle: CSSProperties = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  maxWidth: "760px",
  margin: "0 auto 32px",
};

const heroSectionStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 727px)",
  gap: "68px",
  padding: "10px min(6vw, 171px)",
  alignItems: "center",
  width: "100%",
  margin: 0,
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.92)), url('/Conectando/Clip path group.svg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right center",
  backgroundSize: "100%",
  height:"650px",
};

const heroCopyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "66px",
  width: "100%",
  maxWidth: "780px",
};

const heroHeading: CSSProperties = {
  margin: 0,
  fontSize: "clamp(2.2rem, 6vw, 5.2rem)",
  lineHeight: 1,
  fontWeight: 700,
  fontFamily: '"Outfit Bold", "Outfit", sans-serif',
  color: "#bc6d24",
};

const heroSubheading: CSSProperties = {
  margin: 0,
  fontSize: "1.4rem",
  maxWidth: "640px",
  width: "100%",
  color: "#616d37",
  lineHeight: 1.6,
};

const heroButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 20px",
  width: "250px",
  borderRadius: "12px",
  backgroundColor: "#bc6d24",
  color: "#fefae0",
  textDecoration: "none",
  fontSize: 20,
  boxShadow: "0 16px 30px rgba(188,109,36,0.35)",
};

const heroCardsWrapperStyle: CSSProperties = {
  display: "grid",
  gap: "18px",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  maxWidth: "600px",
  width: "100%",
  justifySelf: "end",
  marginLeft: "auto",
};

const heroPrimaryCardStyle: CSSProperties = {
  gridRow: "span 2",
  minHeight: "320px",
  borderRadius: "12px",
 
};

const heroSecondaryCardStyle: CSSProperties = {
  minHeight: "160px",
  borderRadius: "12px",
};

const communitySectionStyle: CSSProperties = {
  marginTop: "0px",
  borderRadius: "16px",
  padding: "0px 0 32px",
};

const communityInnerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 727px)",
  gap: "68px",
  padding: "10px min(6vw, 171px)",
  alignItems: "center",
  borderRadius: "12px",
  width: "100%",
  margin: 0,
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.92)), url('/Conectando/Clip path group.svg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right center",
  backgroundSize: "100%",
  height:"880px",
};



const communityCopyStyle: CSSProperties = {
  fontSize: "1.6rem",
  color: "#4f5c27",
  lineHeight: 1.7,
  marginTop: "150px",
  maxWidth: "612px",
};

const communityButtonStyle: CSSProperties = {
  marginTop: "100px",
  padding: "12px 32px",
  borderRadius: "12px",
  backgroundColor: "#2d3f0c",
  color: "#fdf4dc",
  textDecoration: "none",
  fontWeight: 600,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 16px 30px rgba(41, 55, 28, 0.25)",
};

const communityGraphicsStyle: CSSProperties = {
  position: "relative",
  minHeight: "320px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const communityGraphicStyle: CSSProperties = {
  width: "900px",
  maxWidth: "100%",
  height: "auto",
  boxShadow: "0 30px 60px rgba(41, 55, 28, 0)",
  background: "transparent",
  borderRadius: "28px",
  overflow: "hidden",
};

const nuestrosTalleresSectionStyle: CSSProperties = {
  padding: "80px min(6vw, 171px)",
  background: "linear-gradient(180deg, #fffbf3 0%, #f5e7d6 55%, #fff4e4 100%)",
};

const nuestrosTalleresInnerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  alignItems: "center",
};

const talleresCarouselContainerStyle: CSSProperties = {
  width: "100%",
  marginTop: "16px",
};

const nuestrosTalleresFooterStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
};

const talleresPopularesSectionStyle: CSSProperties = {
  padding: "40px 0 32px",
};



const nuevosBarStyle: CSSProperties = {
  width: "100%",
  backgroundImage:
    "linear-gradient(rgba(23, 39, 19, 0), rgba(23, 39, 19, 0)), url('/Rectangle%2015.svg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "repeat-x",
  padding: "25px 0",
  marginTop: "0px",
  borderRadius: "0px",
  overflow: "hidden",
  position: "relative",
};

const nuevosBarContentStyle: CSSProperties = {
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0 20px",
};

const nuevosBarItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textTransform: "uppercase",
};

const nuevosBarTextStyle: CSSProperties = {
  color: "#fdf4dc",
  fontSize: "1.2rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
};

export default async function HomePage() {
  let talleres: {
    id: string;
    titulo: string;
    imagenPrincipal: string;
    descripcionLarga: string;
  }[] = [];
  try {
    talleres = await prisma.evento.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.warn("No se pudo cargar talleres desde Prisma, usando fallback.", error);
    talleres = [];
  }
  const heroFallback = [
    {
      id: "placeholder-1",
      titulo: "Arte",
      imagenPrincipal: "/imagenHome.png",
      descripcionLarga:
        "Explora nuestras experiencias de arte comunitario y bienestar.",
    },
    {
      id: "placeholder-2",
      titulo: "Crochet",
      imagenPrincipal: "/imagenHome.png",
      descripcionLarga:
        "Descubre actividades creativas para conectar con tus sentidos.",
    },
  ];
  const heroSource =
    talleres.length > 0 ? talleres.slice(0, 3) : heroFallback;
  const heroDisplayCards = [...heroSource];
  while (heroDisplayCards.length < 3) {
    heroDisplayCards.push(heroSource[heroSource.length - 1]);
  }
  const heroLabels = ["Arte", "Crochet", "Aire libre"];
  const carouselItems = talleres.length > 0 ? talleres : heroFallback;
const nuevosBarItems = Array.from({ length: 6 }, (_, idx) => idx);
const repeatedNuevosBarItems = [...nuevosBarItems, ...nuevosBarItems];

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
    <div style={homeStyle} className="home-shell">
      <SiteHeader actionSlot={headerAction} />

      <main style={mainContentStyle}>
        <Reveal>
          <section style={heroSectionStyle} className="home-hero-gallery hero-section">
            <div style={heroCopyStyle} className="home-hero-copy">
              <h1 style={heroHeading} className="home-hero-heading">
                Donde el bienestar y la creatividad se encuentran
              </h1>
              <p style={heroSubheading} className="home-hero-subheading">
                Descubre talleres y experiencias pensadas para reconectar contigo y con lo que te inspira.
              </p>
              <Link href="/auth?mode=login&redirect=%2Feventos" style={heroButtonStyle}>
                Explorar experiencias
              </Link>
            </div>

            <div style={heroCardsWrapperStyle} className="home-hero-cards">
              {heroDisplayCards.slice(0, 3).map((card, idx) => (
                <Link
                  key={card.id}
                  href={`/eventos/${card.id}`}
                  className="home-hero-card"
                  style={
                    idx === 0 ? heroPrimaryCardStyle : heroSecondaryCardStyle
                  }
                  data-label={heroLabels[idx] ?? "Descubre"}
                >
                  <Image
                    src={normalizeImageSrc(card.imagenPrincipal)}
                    alt={card.titulo}
                    width={600}
                    height={400}
                  />
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section style={nuevosBarStyle} aria-label="Nuevos talleres" className="nuevos-bar-section">
              <div
                style={nuevosBarContentStyle}
                className="nuevos-bar-track"
              >
                {repeatedNuevosBarItems.map((item, index) => (
                  <div key={`${item}-${index}`} style={nuevosBarItemStyle}>
                    <span style={nuevosBarTextStyle}>Nuevos talleres</span>
                    <Image
                    src="/mariRecurso%203.svg"
                    alt="Icono nuevos talleres"
                    width={22}
                    height={20}
                  />
                </div>
              ))}
            </div>
          </section>
        </Reveal>


<Reveal>
          <section
            style={nuestrosTalleresSectionStyle}
            className="section-talleres"
            aria-labelledby="nuestros-talleres-heading"
          >
            <div style={nuestrosTalleresInnerStyle}>
              <div style={talleresPopularesHeaderStyle}>
                <h2 style={talleresTitleStyle} id="nuestros-talleres-heading">
                  Nuestros talleres
                </h2>
                <p style={talleresSubtitleStyle}>
                  Descubre la variedad de talleres y actividades que ofrecemos para
                  promover tu bienestar y creatividad.
                </p>
              </div>
              <div style={talleresCarouselContainerStyle}>
                <TalleresCarousel eventos={carouselItems} />
              </div>
              <div style={nuestrosTalleresFooterStyle}>
                <Link href="/eventos" style={seeMoreButtonStyle}>
                  Ver más talleres
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section id="comunidad" style={communitySectionStyle} className="community-hub">
            <div style={communityInnerStyle} className="community-inner">
              <div>
                
                <div style={{ display: "flex", justifyContent: "left" }}>
                  <Image
                    src="/Conectando/CONECTANDO.svg"
                    alt="Conectando"
                    width={220}
                    height={72}
                    style={{ width: "70%", height: "auto" }}
                  />
                </div>
                <p style={communityCopyStyle} className="community-copy">
                  En Conectando creemos que las mejores ideas nacen cuando las
                  personas se reúnen.
                  <br />Creamos un espacio donde el arte, el bienestar y la
                  creatividad se encuentran para inspirarte y ayudarte a
                  reconectar contigo y con los demás.
                </p>
                <Link href="/auth?mode=login&redirect=%2Feventos" style={communityButtonStyle} className="community-button">
                  Conocer más
                </Link>
              </div>
              <div style={communityGraphicsStyle}>
                <div style={communityGraphicStyle}>
                  <Image
                    src="/VectoresUnidos1.svg"
                    alt="Comunidad reconectando"
                    width={420}
                    height={320}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        

<Reveal>
          <section style={talleresPopularesSectionStyle}>
            <div style={talleresPopularesHeaderStyle}>
              <h2 style={talleresTitleStyle}>Talleres más reservados</h2>
              <p style={talleresSubtitleStyle}>
                Descubre los espacios que más inspiran a nuestra comunidad.
                Talleres para desconectarte de la rutina, reconectar contigo y
                dejar fluir tu creatividad.
              </p>
            </div>
            <div style={talleresPopularesGridStyle} className="talleres-populares-grid">
              {carouselItems.slice(0, 4).map((evento) => (
                <article
                  key={`popular-${evento.id}`}
                  style={talleresPopularesCardStyle}
                  className="talleres-populares-card"
                >
                    <div style={talleresPopularesImageStyle}>
                      <Image
                        src={normalizeImageSrc(evento.imagenPrincipal)}
                      alt={evento.titulo}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 480px) 100vw, 280px"
                    />
                  </div>
                  <div style={talleresPopularesLabelStyle}>
                    {evento.titulo}
                  </div>
                </article>
              ))}
            </div>
            <div style={talleresFooterStyle}>
              <Link href="/eventos" style={seeMoreButtonStyle}>
                Reservar ahora
              </Link>
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section style={instructorsSectionStyle} className="instructors-showcase">
            <div style={instructorsInnerStyle} className="instructors-inner">
              <div>
                <h2 style={instructorsTitleStyle} className="instructors-title">Nuestros instructores</h2>
                <p style={instructorsSubtitleStyle} className="instructors-subtitle">
                  Personas que inspiran, acompañan y transforman
                </p>
                <p style={instructorsCopyStyle} className="instructors-copy">
                  Nuestros instructores son apasionados por enseñar y compartir
                  experiencias auténticas. Cada uno aporta talento, cercanía y
                  conocimiento para acompañarte en tu proceso creativo y
                  personal.
                </p>
              </div>
              <div style={instructorsGalleryStyle} className="instructors-gallery">
                {[instructorColumnA, instructorColumnB].map((column, columnIdx) => (
                  <div
                    key={`column-${columnIdx}`}
                    className={`instructors-column ${columnIdx === 0 ? "column-a" : "column-b"}`}
                  >
                    {column.map((src, idx) => (
                        <div key={`col-${columnIdx}-${idx}-${src}`} className="instructor-card" style={instructorsCardStyle}>
                          <Image
                            src={normalizeImageSrc(src)}
                          alt="Instructor"
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 160px, 220px"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        



        <Reveal>
          <TestimonialsCarousel testimonials={testimonialsData} />
        </Reveal>

        <Reveal>
          <section style={{ padding: "0 0px" }} className="booking-banner-shell">
            <div style={bookingBannerStyle} className="booking-banner">
              <h2 style={{ fontSize: "2.3rem", margin: 0 }} className="booking-title">
                Cupos limitados, agenda fácil y rápido
              </h2>
              <p style={{ marginTop: "12px", fontSize: "1.05rem" }} className="booking-text">
                Reserva tu taller favorito y comienza tu experiencia con Conectando hoy mismo.
              </p>
              <Link href="/auth?mode=login&redirect=%2Feventos" style={bookingButtonStyle}>
                Comenzar mi experiencia ahora
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  );
}
