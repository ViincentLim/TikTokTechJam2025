from smolagents import ToolCallingAgent, LiteLLMModel, ToolCollection
from mcp import StdioServerParameters
import shutil
import os

fs_mcp_params = StdioServerParameters(
    command=shutil.which("npx"),
    args=["-y", "@modelcontextprotocol/server-filesystem", "/tmp/"],
    env={**os.environ},
)

make_playwright_mcp = ToolCollection.from_mcp({"url": "http://localhost:8931/mcp"}, trust_remote_code=True)
make_fs_mcp = ToolCollection.from_mcp(fs_mcp_params, trust_remote_code=True)