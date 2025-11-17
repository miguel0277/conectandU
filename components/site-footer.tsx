import Link from "next/link";
import type { CSSProperties } from "react";

const footerStyle: CSSProperties = {
  backgroundColor: "#616d37",
  color: "#fefae0",
  padding: "64px 40px 32px",
  marginTop: "0px",
  fontFamily: '"Outfit", Arial, sans-serif',
};

const footerInnerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  gap: "40px",
};

const contactColumnStyle: CSSProperties = {
  flex: "1 1 280px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const formColumnStyle: CSSProperties = {
  flex: "1 1 360px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid rgba(254,250,224,0.7)",
  background: "transparent",
  color: "#fefae0",
  padding: "8px 0",
  fontFamily: '"Outfit", Arial, sans-serif',
};

const submitStyle: CSSProperties = {
  alignSelf: "flex-end",
  border: "none",
  background: "transparent",
  color: "#fefae0",
  fontWeight: 600,
  cursor: "pointer",
};

const footerBottomStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "32px auto 0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.9rem",
};

const floatingButtonStyle: CSSProperties = {
  position: "fixed",
  right: "24px",
  bottom: "24px",
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  backgroundColor: "#bc6d24",
  color: "#fefae0",
  border: "none",
  boxShadow: "0 12px 32px rgba(188,109,36,0.45)",
  display: "grid",
  placeItems: "center",
  fontSize: "1.2rem",
  zIndex: 40,
};

export function SiteFooter() {
  return (
    <>
      <footer style={footerStyle} id="contacto" className="site-footer">
        <div style={footerInnerStyle} className="footer-inner">
          <div style={contactColumnStyle}>
            <h2 style={{ margin: 0, fontSize: "1.8rem" }}>Contáctame</h2>
            <p style={{ margin: 0 }}>Tunja, Boyacá</p>
            <p style={{ margin: 0 }}>Avenida U. 42 #5 -23</p>
            <p style={{ margin: 0 }}>Mail: conectando@gmail.com</p>
            <p style={{ margin: 0 }}>Tel: 3218974090</p>
          </div>

          <form style={formColumnStyle}>
            <div style={{ display: "flex", gap: "24px" }}>
              <input style={inputStyle} placeholder="Nombre" />
              <input style={inputStyle} placeholder="Email" type="email" />
            </div>
            <input style={inputStyle} placeholder="Teléfono" />
            <input style={inputStyle} placeholder="Mensaje" />
            <button style={submitStyle} type="button">
              Enviar
            </button>
          </form>
        </div>

        <div style={footerBottomStyle}>
          <span>© {new Date().getFullYear()} Conectando</span>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/terminos">Términos y Condiciones</Link>
            <Link href="/privacidad">Política de privacidad</Link>
          </div>
        </div>
      </footer>

      <Link href="#contacto" style={floatingButtonStyle} aria-label="Ir a contacto">
        💬
      </Link>
    </>
  );
}
