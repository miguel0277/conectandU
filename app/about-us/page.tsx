import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: "#fefae0",
  display: "flex",
  flexDirection: "column",
};

const contentStyle: CSSProperties = {
  flex: 1,
  maxWidth: "960px",
  margin: "60px auto",
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

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "2.4rem",
  fontWeight: 700,
};

const paragraphStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.1rem",
  lineHeight: 1.7,
  color: "#303030",
};

const highlightCardStyle: CSSProperties = {
  backgroundColor: "rgba(188,109,36,0.12)",
  borderRadius: "16px",
  padding: "24px",
  display: "grid",
  gap: "12px",
  color: "#303030",
};

export default function AboutUsPage() {
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
    <div style={pageStyle}>
      <SiteHeader actionSlot={headerAction} />

      <main style={contentStyle} className="about-content">
        <h2 style={titleStyle}>Sobre Conectando</h2>
        <p style={paragraphStyle}>
          Conectando es una iniciativa universitaria que busca reunir a la
          comunidad alrededor de experiencias que nutren el bienestar integral.
          Creemos en el poder del encuentro, la creatividad y la construcción de
          redes para potenciar el crecimiento personal y colectivo.
        </p>
        <p style={paragraphStyle}>
          Nuestro equipo coordina talleres, charlas y actividades diseñadas por
          expertos y estudiantes líderes. Cada sesión se planifica con el
          propósito de ofrecer espacios amables, accesibles y significativos.
        </p>

        <section style={highlightCardStyle}>
          <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>
            ¿Qué encontrarás?
          </h3>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#616d37" }}>
            <li>Talleres prácticos orientados al bienestar emocional y físico.</li>
            <li>Laboratorios creativos que estimulan la colaboración.</li>
            <li>
              Comunidades temáticas para compartir aprendizajes y proyectos.
            </li>
            <li>Acompañamiento para líderes estudiantiles que quieran proponer actividades.</li>
          </ul>
        </section>

        <p style={paragraphStyle}>
          Este sitio es una muestra de cómo queremos simplificar la reserva de
          actividades y fortalecer el sentido de comunidad. Trabajamos de la
          mano con Bienestar Universitario y facultades aliadas para que cada
          encuentro sea memorable.
        </p>

        <p style={paragraphStyle}>
          ¿Tienes una propuesta o quieres sumar tu talento? Escríbenos y
          construyamos juntos nuevos espacios de bienestar.
        </p>
      </main>
    </div>
  );
}
