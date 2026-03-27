import uuid

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from jose.utils import base64url_decode
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.profile import Profile

bearer_scheme = HTTPBearer(auto_error=False)

# Cache for JWKS public keys — fetched once, reused
_jwks_cache: dict | None = None


async def _get_jwks() -> dict:
    """Fetch and cache Supabase JWKS public keys."""
    global _jwks_cache
    if _jwks_cache is not None:
        return _jwks_cache
    jwks_url = f"{settings.supabase_url}/auth/v1/.well-known/jwks.json"
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(jwks_url)
        resp.raise_for_status()
        _jwks_cache = resp.json()
        return _jwks_cache


def _get_signing_key(jwks: dict, token: str) -> dict:
    """Match the token's kid to the correct JWKS key."""
    unverified_header = jwt.get_unverified_header(token)
    kid = unverified_header.get("kid")
    for key in jwks.get("keys", []):
        if key["kid"] == kid:
            return key
    raise JWTError("No matching key found in JWKS")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict | None:
    """Decode Supabase JWT. Returns None if no token provided."""
    if credentials is None:
        return None
    token = credentials.credentials
    try:
        jwks = await _get_jwks()
        signing_key = _get_signing_key(jwks, token)
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["ES256"],
            audience="authenticated",
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


async def require_auth(user: dict | None = Depends(get_current_user)) -> dict:
    """Require a valid authenticated user."""
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return user


async def require_admin(
    user: dict = Depends(require_auth),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Require admin role."""
    user_id = uuid.UUID(user["sub"])
    result = await db.execute(select(Profile).where(Profile.id == user_id))
    profile = result.scalar_one_or_none()
    if not profile or profile.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user
