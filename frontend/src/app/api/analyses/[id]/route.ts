import { NextResponse } from "next/server";
import { initialAnalyses } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const analysis = initialAnalyses.find((a) => a.id === id);

  if (!analysis) {
    return NextResponse.json(
      { code: "NOT_FOUND", message: `Analysis ${id} not found or outside tenant scope.` },
      { status: 404 }
    );
  }

  return NextResponse.json({ analysis });
}
