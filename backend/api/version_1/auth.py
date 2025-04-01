from fastapi import APIRouter, HTTPException, status
router = APIRouter()

@router.post(
    "/login",
    # response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="login",
    description="This API allows users to log in and get access tokens."
)
def login():
    pass