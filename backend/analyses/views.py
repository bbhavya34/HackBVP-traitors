from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import AnalysisJob, EvidenceAsset, EvidenceFinding
from .serializers import AnalysisJobSerializer, EvidenceFindingSerializer
import hashlib
import random

class AnalysisJobViewSet(viewsets.ModelViewSet):
    queryset = AnalysisJob.objects.all().order_by('-created_at')
    serializer_class = AnalysisJobSerializer

    def create(self, request, *args, **kwargs):
        title = request.data.get('title', 'Untitled Investigation')
        category = request.data.get('category', 'video')
        optional_context = request.data.get('optional_context', '')
        retention = request.data.get('retention_policy', '30_days_ephemeral')

        new_id = f"TL-2026-{random.randint(1000, 9999)}"
        sha256 = hashlib.sha256(f"{new_id}-{title}".encode('utf-8')).hexdigest()

        # Seed scores based on inputs
        is_high = 'urgent' in title.lower() or 'wire' in title.lower()
        overall_score = 84 if is_high else 18
        state = 'high_risk' if is_high else 'lower_risk'

        job = AnalysisJob.objects.create(
            id=new_id,
            title=title,
            category=category,
            overall_risk_score=overall_score,
            manipulation_score=88 if is_high and category in ['video', 'image', 'audio'] else 10,
            communication_risk_score=92 if is_high else 14,
            model_confidence=91,
            evidence_completeness=94,
            assessment_state=state,
            submitter_name='Elena Rostova',
            submitter_email='e.rostova@apex-securities.internal',
            submitter_role='Reviewer',
            organisation='Apex Securities UK',
            optional_context=optional_context,
        )

        EvidenceAsset.objects.create(
            job=job,
            name=f"{title.replace(' ', '_').lower()}.{category}",
            size_bytes=random.randint(100000, 50000000),
            mime_type='application/octet-stream',
            sha256=sha256,
            is_demo=True,
            consent_recorded=True,
            retention_policy=retention,
        )

        EvidenceFinding.objects.create(
            job=job,
            title='Baseline Integrity & Artifact Analysis' if not is_high else 'Anomalous Discrepancy Observed',
            provenance='observed' if not is_high else 'model_inference',
            severity='informational' if not is_high else 'high',
            check_name=f'TRUTHLENS-{category.upper()}-Detector v2.1',
            check_version='v2.1',
            excerpt_or_detail='Processing complete. Signal parameters evaluated under tenant baseline.',
            limitations='Calibration bounded to standard dataset resolution.',
            recommendation='Proceed with standard forensic review.' if not is_high else 'Halt disbursement until out-of-band verification.',
        )

        serializer = self.get_serializer(job)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def evidence(self, request, pk=None):
        job = self.get_object()
        findings = job.findings.all()
        return Response(EvidenceFindingSerializer(findings, many=True).data)
