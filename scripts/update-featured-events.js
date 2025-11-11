// scripts/update-featured-events.js
const { prisma } = require("../lib/prisma.js");

const updates = [
  {
    id: "1",
    titulo: "Crea, conecta y disfruta",
    descripcionLarga:
      "Un encuentro para dejar fluir la creatividad mientras disfrutas de una copa y buena compañía. Pinta, ríe y vive un momento para ti.",
    imagenPrincipal: "/Conectando/Taller2022_2-773x1030.jpg",
  },
  {
    id: "2",
    titulo: "Puntada a puntada",
    descripcionLarga:
      "Aprende crochet desde cero o mejora tus técnicas mientras te relajas tejiendo. Cada puntada es una pausa, una conexión contigo mismo.",
    imagenPrincipal: "/Conectando/IMG_4855-bis.jpg",
  },
  {
    id: "3",
    titulo: "Presente pleno",
    descripcionLarga:
      "Descubre el poder de la atención plena y aprende a habitar el momento presente con ejercicios de mindfulness guiado.",
    imagenPrincipal: "/Conectando/practicar-mindulfness-1024x1024.webp",
  },
];

async function main() {
  for (const data of updates) {
    await prisma.evento.update({
      where: { id: data.id },
      data,
    });
    console.log(`Evento ${data.id} actualizado → ${data.titulo}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
