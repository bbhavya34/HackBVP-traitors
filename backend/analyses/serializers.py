from rest_framework import serializers
from .models import AnalysisJob, EvidenceAsset, EvidenceFinding

class EvidenceAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvidenceAsset
        fields = '__all__'

class EvidenceFindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvidenceFinding
        fields = '__all__'

class AnalysisJobSerializer(serializers.ModelSerializer):
    asset = EvidenceAssetSerializer(read_only=True)
    findings = EvidenceFindingSerializer(many=True, read_only=True)

    class Meta:
        model = AnalysisJob
        fields = '__all__'
