import { NextResponse } from "next/server";
import { evaluationModels } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    models: evaluationModels,
    evaluationPolicy: {
      splitProtocol: "hash_deduplicated_unseen_test",
      disclosedLimitationsRequired: true,
      trainingOnTenantEvidencePermitted: false,
    },
  });
}
