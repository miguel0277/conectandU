export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  AUTH_COOKIE_NAME,
  getSessionUserFromToken,
} from "@/lib/auth";

function generarIdReserva() {
  const rand = Math.floor(Math.random() * 1000000);
  return `RSV-${new Date().getFullYear()}-${rand
    .toString()
    .padStart(6, "0")}`;
}

// POST /api/reservas  --> crear reserva
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
    const usuario = await getSessionUserFromToken(token);

    if (!usuario) {
      return NextResponse.json(
        { ok: false, error: "No autorizado." },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("[POST /api/reservas] body recibido:", body);

    const { idEvento, nombre, correo, documento } = body;

    if (!idEvento || !nombre || !correo || !documento) {
      console.error(
        "[POST /api/reservas] Faltan campos:",
        idEvento,
        nombre,
        correo,
        documento
      );
      return NextResponse.json(
        { ok: false, error: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    const nuevaReserva = await prisma.reserva.create({
      data: {
        idReserva: generarIdReserva(),
        eventoId: idEvento,
        nombre,
        correo,
        documento,
        usuarioId: usuario.id,
      },
    });

    console.log(
      "[POST /api/reservas] Reserva creada OK:",
      nuevaReserva.idReserva
    );

    return NextResponse.json(
      {
        ok: true,
        reservaId: nuevaReserva.idReserva,
        when: nuevaReserva.timestamp.toISOString(),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/reservas] Error interno:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// GET /api/reservas  --> ver reservas guardadas
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
    const usuario = await getSessionUserFromToken(token);

    if (!usuario) {
      return NextResponse.json(
        { ok: false, error: "No autenticado." },
        { status: 401 }
      );
    }

    if (usuario.rol !== "ADMIN") {
      return NextResponse.json(
        { ok: false, error: "Solo un administrador puede ver las reservas." },
        { status: 403 }
      );
    }

    console.log("[GET /api/reservas] consultando reservas...");
    const reservas = await prisma.reserva.findMany({
      orderBy: { timestamp: "desc" },
    });
    console.log(
      "[GET /api/reservas] resultado:",
      reservas.length,
      "filas"
    );

    return NextResponse.json(reservas);
  } catch (error) {
    console.error("[GET /api/reservas] Error interno:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
