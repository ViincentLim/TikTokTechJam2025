from smolagents import ToolCallingAgent, LiteLLMModel, ToolCollection
from mcps import make_playwright_mcp, make_fs_mcp
from tools import EvaluateScreenshotTool
import litellm

evaluate_screenshot_tool = EvaluateScreenshotTool()

with open("./prompts/generate_captcha.md", "r") as f:
    prompt = f.read()

llm = LiteLLMModel("gemini/gemini-2.5-flash")
# litellm._turn_on_debug()

with make_playwright_mcp as playwright_mcp:
    with make_fs_mcp as fs_mcp:
        print("Tools:", playwright_mcp)
        agent = ToolCallingAgent(tools=[
                *playwright_mcp.tools,
                *fs_mcp.tools,
                evaluate_screenshot_tool,
            ], model=llm)
        ans = agent.run(prompt)
        print("ans:", ans)