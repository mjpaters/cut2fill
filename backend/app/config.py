from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str
    supabase_jwt_secret: str
    database_url: str
    here_api_key: str | None = None
    app_env: str = "development"
    port: int = 8000
    cors_origins: list[str] = [
        "http://localhost:8000",
        "https://cut2fill.com.au",
        "https://www.cut2fill.com.au",
        "https://mjpaters.github.io",
    ]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
