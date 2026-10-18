import { NextResponse } from "next/server";
import { initialAnalyses } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const riskBand = searchParams.get("riskBand");
  const status = searchParams.get("status");

  let filtered = [...initialAnalyses];
  if (category && category !== "all") {
    filtered = filtered.filter((a) => a.category === category);
  }
  if (riskBand && riskBand !== "all") {
    filtered = filtered.filter((a) => a.assessmentState === riskBand);
  }
  if (status && status !== "all") {
    filtered = filtered.filter((a) => a.review.status === status);
  }

  return NextResponse.json({
    total: filtered.length,
    analyses: filtered,
    meta: {
      tenant: "Apex Securities UK",
      timestamp: new Date().toISOString(),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, url, optionalContext, retentionPolicy } = body;

    const newId = `TL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomHash = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

    return NextResponse.json(
      {
        id: newId,
        state: "queued",
        uploadInstructions: {
          quarantineKey: `quarantine/${newId}/${title || "artifact"}`,
          digestAlgorithm: "SHA-256",
          expectedDigest: randomHash,
        },
        message: "Analysis job accepted into processing pipeline.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { code: "INVALID_PAYLOAD", message: "Invalid JSON submission manifest" },
      { status: 400 }
    );
  }
}
