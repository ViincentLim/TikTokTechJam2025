#!/bin/bash

# Navigate to the MCP server directory
cd "$(dirname "$0")"

# Start the Playwright MCP server
npx playwright test --project=mcp-server