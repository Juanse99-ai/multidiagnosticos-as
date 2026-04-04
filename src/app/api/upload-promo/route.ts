import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import path from "path";

const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "avif"];

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File | null;
  const indexRaw = data.get("index") as string | null;

  if (!file || indexRaw === null) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const index = parseInt(indexRaw, 10);
  if (isNaN(index) || index < 0 || index > 9) {
    return NextResponse.json({ error: "Índice inválido" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json(
      { error: "Solo se permiten jpg, png, webp o avif" },
      { status: 400 }
    );
  }

  const dir = path.join(process.cwd(), "public", "promotions");
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  // Remove any previous version of this promo image
  for (const oldExt of ALLOWED_EXT) {
    const oldPath = path.join(dir, `promo-${index}.${oldExt}`);
    if (existsSync(oldPath)) {
      try { unlinkSync(oldPath); } catch { /* ignore */ }
    }
  }

  // Save new file
  const filename = `promo-${index}.${ext}`;
  const bytes = await file.arrayBuffer();
  await writeFile(path.join(dir, filename), Buffer.from(bytes));

  // Update manifest.json
  const manifestPath = path.join(dir, "manifest.json");
  let manifest: Record<string, string> = {};
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf-8"));
  } catch { /* start fresh */ }

  manifest[String(index)] = `/promotions/${filename}`;
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  return NextResponse.json({ path: `/promotions/${filename}` });
}
