"""
Produce Quality Grading API Routes.
Exposes computer vision / YOLOv8 produce quality inspection endpoint.
"""
from fastapi import APIRouter, File, UploadFile, Form
from app.ml.quality_grading import analyze_produce_quality

router = APIRouter(prefix="/quality", tags=["quality"])


@router.post("/analyze")
async def analyze_crop_quality(
    filename: str = Form("sample_wheat.jpg"),
    file: UploadFile | None = File(None),
):
    """Analyze crop quality from uploaded image or sample filename."""
    contents = None
    if file:
        contents = await file.read()
        filename = file.filename or filename

    result = analyze_produce_quality(contents, filename=filename)
    return result
