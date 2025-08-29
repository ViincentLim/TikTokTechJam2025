FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y wget curl gnupg build-essential && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libgbm1 libxshmfence1 && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Python dependencies with uv
COPY pyproject.toml uv.lock ./
RUN pip install --no-cache-dir uv && uv pip install --system --no-deps

EXPOSE 8000 8931

CMD ["sh", "-c", "npx @playwright/mcp@latest --port 8931 & uvicorn main:app --host 0.0.0.0 --port 8000"]