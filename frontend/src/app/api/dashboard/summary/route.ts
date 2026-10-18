import { NextResponse } from "next/server";
import { initialAnalyses } from "@/lib/mockData";

export async function GET() {
  const total = initialAnalyses.length;
  const highRisk = initialAnalyses.filter((a) => a.assessmentState === "high_risk").length;
  const reviewBacklog = initialAnalyses.filter((a) => a.review.status === "unassigned" || a.review.status === "in_review").length;

  return NextResponse.json({
    metrics: {
      totalAnalyses: total,
      highRiskCount: highRisk,
      reviewBacklogCount: reviewBacklog,
      avgProcessingTimeSeconds: 18.4,
      modelHealth: "all_active",
    },
    meta: {
      tenantId: "TENANT-UK-01",
      freshness: new Date().toISOString(),
    },
  });
}
