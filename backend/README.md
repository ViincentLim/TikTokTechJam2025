# TikTok Backend - Docker Setup

A FastAPI backend with AI-powered captcha generation using Lynx, Selenium, and Google Gemini.

## Prerequisites

- Docker and Docker Compose installed
- Google Gemini API key

## Quick Start

### 1. Set up Environment Variables

Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### 3. Access the API

- **Health Check**: http://localhost:8000/
- **Captcha Generation**: http://localhost:8000/captcha
- **Video Endpoint**: http://localhost:8000/video/{video_id}

## Manual Docker Build

```bash
# Build the image
docker build -t tiktok-backend .

# Run the container
docker run -p 8000:8000 --env-file .env tiktok-backend
```

## Development

### Local Development (without Docker)

```bash
# Install dependencies
uv sync

# Run development server
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Development with Docker

```bash
# Run with volume mount for live code changes
docker-compose up --build

# View logs
docker-compose logs -f backend
```

## Architecture

### Components

- **FastAPI**: Web framework for API endpoints
- **Selenium/Chrome**: Web automation for captcha testing
- **smolagents**: AI agent framework for captcha generation
- **Google Gemini**: AI model for game generation
- **uv**: Python dependency management

### Key Features

- **Captcha Generation**: AI-powered puzzle games
- **Web Automation**: Selenium-based testing
- **Containerized**: Full Docker support with Chrome
- **Health Checks**: Built-in monitoring
- **CORS Enabled**: Cross-origin requests supported

## Troubleshooting

### Chrome Issues in Container

If you encounter Chrome-related errors:

1. **Check Chrome installation**:
   ```bash
   docker exec -it <container_name> google-chrome --version
   ```

2. **Verify Chrome options**:
   ```bash
   docker exec -it <container_name> env | grep CHROME
   ```

3. **Check logs**:
   ```bash
   docker-compose logs backend
   ```

### Memory Issues

The container is configured with 2GB memory limit. If you encounter memory issues:

1. **Increase memory limit** in `docker-compose.yml`
2. **Monitor memory usage**:
   ```bash
   docker stats
   ```

### API Key Issues

Ensure your `.env` file contains the correct API key:
```bash
# Test API key
curl -H "Authorization: Bearer $GEMINI_API_KEY" \
     https://generativelanguage.googleapis.com/v1beta/models
```

## Production Deployment

### Environment Variables

Required environment variables:
- `GEMINI_API_KEY`: Google Gemini API key

Optional:
- `CHROME_OPTIONS`: Additional Chrome flags
- `PYTHONUNBUFFERED`: Set to 1 for better logging

### Scaling

```bash
# Scale to multiple instances
docker-compose up --scale backend=3
```

### Monitoring

The container includes health checks:
- **Endpoint**: `/`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

## Notes

- **Captcha Timeout**: Some captchas are time-sensitive (15 seconds)
- **Replay Functionality**: Consider adding a replay button for failed captchas
- **Selenium Issues**: Clicking in Selenium may not work for web agents, leading to infinite loops
- **Mobile Viewport**: Games are designed for 9:16 aspect ratio mobile viewport

## File Structure

```
backend/
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Multi-service setup
├── .dockerignore          # Build optimization
├── main.py                # FastAPI application
├── pyproject.toml         # Python dependencies
├── agents/                # AI agent modules
│   ├── manager/           # Captcha generation agent
│   └── web/              # Web automation tools
└── README.md             # This file
```