from smolagents import CodeAgent, LiteLLMModel
from agents.web.tools import search_item_ctrl_f, save_screenshot

# Initialize the model
llm = LiteLLMModel("gemini/gemini-2.5-flash")

# Create the agent
web_agent = CodeAgent(
    name="web_agent", # needed if not will error: https://github.com/huggingface/smolagents/issues/640#issuecomment-2677327064
    tools=[search_item_ctrl_f],
    model=llm,
    additional_authorized_imports=["helium"],
    step_callbacks=[save_screenshot],
    max_steps=20,
    verbosity_level=2,
    description="Web agent for testing web pages",
)

# Import helium for the agent
web_agent.python_executor("from helium import *")