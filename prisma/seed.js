// prisma/seed.js
const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");

async function main() {
  console.log("🧹 Limpiando base...");
  await prisma.reserva.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("👤 Creando usuarios base...");
  const admin = await prisma.usuario.create({
    data: {
      correo: "admin@universidad.edu",
      usuario: "admin",
      hashedPassword: await bcrypt.hash("admin123", 10),
      rol: "ADMIN",
    },
  });

  const usuario = await prisma.usuario.create({
    data: {
      correo: "estudiante@universidad.edu",
      usuario: "estudiante",
      hashedPassword: await bcrypt.hash("usuario123", 10),
      rol: "USUARIO",
    },
  });

  console.log(
    `   Admin: ${admin.usuario} / admin123\n   Usuario: ${usuario.usuario} / usuario123`
  );

  console.log("📦 Insertando eventos iniciales...");
  await prisma.evento.createMany({
    data: [
      {
        id: "1",
        titulo: "Crea, conecta y disfruta",
        fecha: "28 Oct 2025 - 10:00 AM",
        lugar: "Auditorio Principal, Bloque A",
        descripcionLarga:
          "Un encuentro para dejar fluir la creatividad mientras disfrutas de una copa y buena compañía. Pinta, ríe y vive un momento para ti.",
        imagenPrincipal: "/Conectando/Taller2022_2-773x1030.jpg",
        responsable: "Dirección de Investigación y Transferencia",
        cupo: "150 asistentes",
        imagenesSecundarias:
          "/Conectando/Taller2022_2-773x1030.jpg",
        creadoPorId: admin.id,
      },
      {
        id: "2",
        titulo: "Puntada a puntada",
        fecha: "30 Oct 2025 - 2:00 PM",
        lugar: "Plazoleta Central",
        descripcionLarga:
          "Aprende crochet desde cero o mejora tus técnicas mientras te relajas tejiendo. Cada puntada es una pausa, una conexión contigo mismo.",
        imagenPrincipal: "/Conectando/IMG_4855-bis.jpg",
        responsable: "Bienestar Universitario",
        cupo: "Abierto a toda la comunidad",
        imagenesSecundarias: "/Conectando/IMG_4855-bis.jpg",
        creadoPorId: admin.id,
      },
      {
        id: "3",
        titulo: "Presente pleno",
        fecha: "2 Nov 2025 - 8:00 AM",
        lugar: "Sala de Sistemas 204",
        descripcionLarga:
          "Descubre el poder de la atención plena y aprende a habitar el momento presente con ejercicios de mindfulness guiado.",
        imagenPrincipal: "/Conectando/practicar-mindulfness-1024x1024.webp",
        responsable: "Oficina de Egresados",
        cupo: "30 cupos",
        imagenesSecundarias:
          "/Conectando/practicar-mindulfness-1024x1024.webp",
        creadoPorId: admin.id,
      },
    ],
  });

  console.log("✅ Listo: eventos insertados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
