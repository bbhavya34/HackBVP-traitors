import io
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

class GenerateReportPdfView(APIView):
    def get(self, request, analysis_id):
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        # Watermark
        p.saveState()
        p.setFont("Helvetica-Bold", 48)
        p.setFillColor(colors.HexColor("#FEE2E2"))
        p.translate(width / 2, height / 2)
        p.rotate(45)
        p.drawCentredString(0, 0, "DEMO REPORT — TRUTHLENS")
        p.restoreState()

        # Header
        p.setFillColor(colors.HexColor("#991B1B"))
        p.setFont("Helvetica-Bold", 18)
        p.drawString(54, height - 54, "TRUTHLENS FORENSIC INVESTIGATION REPORT")

        p.setFont("Helvetica", 10)
        p.setFillColor(colors.HexColor("#475569"))
        p.drawString(54, height - 72, "Tagline: Verify the Signal. Understand the Risk.")
        p.drawString(54, height - 88, f"Analysis Case Reference: {analysis_id}")
        p.drawString(54, height - 104, "Tenant Boundary: Apex Securities UK [TENANT-UK-01]")

        # Line separator
        p.setStrokeColor(colors.HexColor("#E2E8F0"))
        p.setLineWidth(1)
        p.line(54, height - 116, width - 54, height - 116)

        # Assessment Box
        p.setFillColor(colors.HexColor("#F8FAFC"))
        p.rect(54, height - 190, width - 108, 60, fill=1, stroke=1)
        p.setFillColor(colors.HexColor("#991B1B"))
        p.setFont("Helvetica-Bold", 14)
        p.drawString(68, height - 145, "Operational Assessment: High Assessed Risk (86/100)")
        p.setFont("Helvetica", 9)
        p.setFillColor(colors.HexColor("#334155"))
        p.drawString(68, height - 165, "Evidence Completeness: 92% • Model Confidence: 89% (Calibrated)")
        p.drawString(68, height - 180, "Disclosed Limitations: Calibration bounded to uncompressed audio/video test sets.")

        # Findings Summary
        p.setFont("Helvetica-Bold", 12)
        p.setFillColor(colors.HexColor("#0F172A"))
        p.drawString(54, height - 220, "Key Evidence Findings & Provenance:")

        p.setFont("Helvetica-Bold", 10)
        p.drawString(54, height - 245, "1. Facial Boundary Temporal Inconsistency [Model Inference]")
        p.setFont("Helvetica", 9)
        p.setFillColor(colors.HexColor("#475569"))
        p.drawString(68, height - 260, "High boundary frequency flicker at timestamps 00:04 - 00:18 (Jitter: 0.88).")

        p.setFont("Helvetica-Bold", 10)
        p.setFillColor(colors.HexColor("#0F172A"))
        p.drawString(54, height - 285, "2. Audio-Visual Phoneme Desynchronization [Model Inference]")
        p.setFont("Helvetica", 9)
        p.setFillColor(colors.HexColor("#475569"))
        p.drawString(68, height - 300, "Plosive consonants lead mouth movement by 160ms (Natural tolerance: ±40ms).")

        # Human Review Action
        p.setFont("Helvetica-Bold", 12)
        p.setFillColor(colors.HexColor("#0F172A"))
        p.drawString(54, height - 340, "Human Reviewer Decision & Rationale:")
        p.setFont("Helvetica", 9)
        p.setFillColor(colors.HexColor("#334155"))
        p.drawString(68, height - 360, "Reviewer: Elena Rostova (Lead Fraud Reviewer)")
        p.drawString(68, height - 375, "Decision: Suspicious Confirmed — Potential BEC Deepfake Impersonation")
        p.drawString(68, height - 390, "Verification Basis: Out-of-band call to David K via verified corporate PBX directory.")

        # Footer
        p.setFont("Helvetica", 8)
        p.setFillColor(colors.HexColor("#94A3B8"))
        p.drawString(54, 36, "TRUTHLENS Enterprise • Cryptographic SHA-256 Verified • No AI Training on Customer Evidence")

        p.showPage()
        p.save()
        buffer.seek(0)

        response = HttpResponse(buffer.getvalue(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="TRUTHLENS-{analysis_id}-Report.pdf"'
        return response
