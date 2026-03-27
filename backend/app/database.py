import ssl

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.config import settings

_is_production = settings.app_env == "production"

# Build SSL context for production database connections
_connect_args = {}
if _is_production:
    ssl_ctx = ssl.create_default_context()
    _connect_args["ssl"] = ssl_ctx

engine = create_async_engine(
    settings.database_url,
    echo=not _is_production,
    pool_size=10,
    max_overflow=5,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args=_connect_args,
)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db():
    async with async_session() as session:
        yield session
