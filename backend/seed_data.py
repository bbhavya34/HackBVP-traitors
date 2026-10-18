import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'truthlens_backend.settings')
django.setup()

from analyses.models import AnalysisJob, EvidenceAsset, EvidenceFinding

def seed():
    if AnalysisJob.objects.exists():
        print("Data already seeded.")
        return

    job1 = AnalysisJob.objects.create(
        id="TL-2026-8841",
        title="Executive Video Announcement — Emergency Capital Reallocation",
        category="video",
        state="completed",
        assessment_state="high_risk",
        overall_risk_score=86,
        manipulation_score=91,
        communication_risk_score=78,
        model_confidence=89,
        evidence_completeness=92,
        submitter_name="Marcus Vance",
        submitter_email="m.vance@apex-securities.internal",
        submitter_role="Senior Security Analyst",
        organisation="Apex Securities UK",
        optional_context="Received via direct message claiming to be CEO instructing urgent $4.2M treasury movement before market opening. Demands bypass of normal dual-authorization."
    )

    EvidenceAsset.objects.create(
        job=job1,
        name="ceo_address_q3_confidential.mp4",
        size_bytes=48920150,
        mime_type="video/mp4",
        sha256="8e74f1b209c733a1e94d84c1724bf200388d0119e7a6375bc803e1e944f21651",
        is_demo=True,
        consent_recorded=True,
        retention_policy="30_days_ephemeral"
    )

    EvidenceFinding.objects.create(
        job=job1,
        title="Facial Boundary Temporal Inconsistency",
        provenance="model_inference",
        severity="high",
        check_name="DeepFace-SpatioTemporal-v2.4",
        check_version="v2.4.1",
        excerpt_or_detail="High boundary frequency flicker detected between jawline and background collar at timestamps 00:04 - 00:18. Blending mask jitter index 0.88 exceeds threshold (0.45).",
        offset_or_timestamp="00:04 - 00:18",
        limitations="Compression artifacts in low-bitrate streams can slightly elevate boundary jitter.",
        recommendation="Do not execute transaction. Verify speaker identity through out-of-band corporate telephone directory."
    )

    EvidenceFinding.objects.create(
        job=job1,
        title="Audio-Visual Phoneme Desynchronization",
        provenance="model_inference",
        severity="high",
        check_name="SyncNet-AudioVisual-Aligner",
        check_version="v1.9.0",
        excerpt_or_detail="Audio phonemes for plosive consonants /p/, /b/ lead mouth aperture changes by 160ms between 00:12 and 00:29. Natural speech tolerance is ±40ms.",
        offset_or_timestamp="00:12 - 00:29",
        limitations="Bluetooth capture or encoding latency can introduce global offsets; relative per-segment variance confirms local synthetic splicing.",
        recommendation="Escalate to Fraud Investigation Group for full voiceprint comparison against enrolled CEO bio-profile."
    )

    print("Successfully seeded initial investigation records.")

if __name__ == '__main__':
    seed()
