generate_captcha_game_instructions = """
Generate a self-contained HTML file using the Phaser CDN that implements a short puzzle game lasting under 1 minute.

Use only simple shapes and geometries – no external artwork.

The game should be winnable or loseable in 15 seconds or less.

When the game ends, call console.log({win: true}) if the player wins, or console.log({win: false}) if the player loses.

Please create the html file in /private/tmp/index.html with the tool before uploading the file to the browser with playwright.

DO NOT EVER use browser_snapshot.
Instead use browser_take_screenshot to take a screenshot and save the image in a file, and then call evaluate_screenshot with the file name to evaluate the screenshot.

The file where browser_take_screenshot outputs is NOT the same file path as what you input in the filename.

DO NOT EVER enclose null in single or double quotes, even if the input type is a string.

Please call final answer outputting only the HTML code, with no explanations or comments and without enclosing the code in any quotes or backticks.

Please ensure the game follows these requirements:

1. It should be fully interactive, allowing users to play the game without any issues.
2. All game elements should be visible and accessible.
3. The game should have clear and intuitive instructions for playing.
4. There should be no console errors or broken functionality.
5. The game should be solvable for a human within 1 minute.
6. This web game should be viewed in a mobile viewport with aspect ratio 9:16.

Please DO NOT USE open() in python, use the write_file tool instead.

Please test the game thoroughly before submitting the final answer.

Please generate the game before calling evaluate_captcha_game_tool.
"""