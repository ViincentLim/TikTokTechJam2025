Generate a self-contained HTML file using the Phaser CDN that implements a short puzzle game lasting under 1 minute.

Use only simple shapes and geometries – no external artwork.

The game should be winnable or loseable in 15 seconds or less.

When the game ends, call console.log({win: true}) if the player wins, or console.log({win: false}) if the player loses.

Use test-driven development with playwright tools to validate that the game works and there are no syntax or console errors.

Please create the html file in /private/tmp/index.html with the tool before uploading the file to the browser with playwright.

DO NOT EVER use browser_snapshot.
Instead use browser_take_screenshot to take a screenshot and save the image in a file, and then call evaluate_screenshot with the file name to evaluate the screenshot.

In function arguments for the MCP server, don't use 'null', use null without single or double quotes.

Please call final answer outputting only the HTML code, with no explanations or comments.