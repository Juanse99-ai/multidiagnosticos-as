import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };
  const expected = process.env.ADMIN_PASS;

  if (!expected) {
    return NextResponse.json(
      { error: "Servidor no configurado (ADMIN_PASS)" },
      { status: 500 }
    );
  }

  if (typeof password !== "string" || password !== expected) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
