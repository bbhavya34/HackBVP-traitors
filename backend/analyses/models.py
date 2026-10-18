import uuid
from django.db import models

class ModalityCategory(models.TextChoices):
    VIDEO = 'video', 'Video'
    IMAGE = 'image', 'Image'
    AUDIO = 'audio', 'Audio'
    EMAIL = 'email', 'Email'
    DOCUMENT = 'document', 'Document'
    URL = 'url', 'URL'
    CHAT = 'chat', 'Chat'

class JobState(models.TextChoices):
    CREATED = 'created', 'Created'
    UPLOADING = 'uploading', 'Uploading'
    VALIDATING = 'validating', 'Validating'
    QUEUED = 'queued', 'Queued'
    PROCESSING = 'processing', 'Processing'
    COMPLETED = 'completed', 'Completed'
    PARTIALLY_COMPLETED = 'partially_completed', 'Partially Completed'
    FAILED = 'failed', 'Failed'
    CANCELLED = 'cancelled', 'Cancelled'

class AssessmentState(models.TextChoices):
    LOWER_RISK = 'lower_risk', 'Lower Assessed Risk'
    REVIEW_RECOMMENDED = 'review_recommended', 'Review Recommended'
    HIGH_RISK = 'high_risk', 'High Assessed Risk'
    INCONCLUSIVE = 'inconclusive', 'Inconclusive'
    INSUFFICIENT_EVIDENCE = 'insufficient_evidence', 'Insufficient Evidence'
    UNAVAILABLE = 'unavailable', 'Analysis Unavailable'

class AnalysisJob(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    tenant_id = models.CharField(max_length=64, default='TENANT-UK-01')
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=ModalityCategory.choices)
    state = models.CharField(max_length=30, choices=JobState.choices, default=JobState.COMPLETED)
    assessment_state = models.CharField(max_length=30, choices=AssessmentState.choices, default=AssessmentState.LOWER_RISK)

    # Separate scores (PRD Section 8 Invariants)
    overall_risk_score = models.IntegerField(null=True, blank=True)
    manipulation_score = models.IntegerField(null=True, blank=True)
    communication_risk_score = models.IntegerField(null=True, blank=True)
    model_confidence = models.IntegerField(null=True, blank=True)
    evidence_completeness = models.IntegerField(default=90)

    submitter_name = models.CharField(max_length=128)
    submitter_email = models.EmailField()
    submitter_role = models.CharField(max_length=64)
    organisation = models.CharField(max_length=128)

    optional_context = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.id} — {self.title}"

class EvidenceAsset(models.Model):
    job = models.OneToOneField(AnalysisJob, on_delete=models.CASCADE, related_name='asset')
    name = models.CharField(max_length=255)
    size_bytes = models.BigIntegerField(default=0)
    mime_type = models.CharField(max_length=128)
    sha256 = models.CharField(max_length=64)
    is_demo = models.BooleanField(default=True)
    consent_recorded = models.BooleanField(default=True)
    retention_policy = models.CharField(max_length=64, default='30_days_ephemeral')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class EvidenceFinding(models.Model):
    job = models.ForeignKey(AnalysisJob, on_delete=models.CASCADE, related_name='findings')
    title = models.CharField(max_length=255)
    provenance = models.CharField(
        max_length=32,
        choices=[
            ('observed', 'Observed Evidence'),
            ('model_inference', 'Model Inference'),
            ('rule_warning', 'Rule Warning'),
            ('user_unverified', 'User Claim (Unverified)')
        ]
    )
    severity = models.CharField(max_length=20, default='medium')
    check_name = models.CharField(max_length=128)
    check_version = models.CharField(max_length=64)
    excerpt_or_detail = models.TextField()
    offset_or_timestamp = models.CharField(max_length=64, blank=True, null=True)
    limitations = models.TextField(blank=True)
    recommendation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
