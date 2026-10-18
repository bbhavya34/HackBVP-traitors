from django.urls import path
from .views import GenerateReportPdfView

urlpatterns = [
    path('<str:analysis_id>/pdf/', GenerateReportPdfView.as_view(), name='generate-report-pdf'),
]
