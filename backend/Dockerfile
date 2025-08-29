FROM ghcr.io/astral-sh/uv:debian-slim

RUN apt-get update && \
    apt-get install -y wget curl gnupg build-essential && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libgbm1 libxshmfence1 && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs uvicorn && \
    rm -rf /var/lib/apt/lists/*

# Python dependencies with uv
COPY . .
RUN uv sync

EXPOSE 8000

CMD ["sh", "-c", "npx @playwright/mcp@latest --port 8931 & uv run --env-file .env fastapi run"]