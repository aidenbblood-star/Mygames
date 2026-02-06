import os

game_folder = 'games'
# This new line tells the robot to look inside EVERY sub-folder too
games = []
for root, dirs, files in os.walk(game_folder):
    for file in files:
        if file.endswith(".html"):
            # Gets the path from the 'games' folder to the file
            full_path = os.path.relpath(os.path.join(root, file), start=os.getcwd())
            games.append(full_path)

buttons_html = ""
for game_path in games:
    # Make the name look pretty
    file_name = os.path.basename(game_path)
    clean_name = file_name.replace('.html', '').replace('-', ' ').replace('_', ' ').title()
    
    # If it's a generic name like 'Index', use the folder name instead
    if clean_name == "Index":
        clean_name = os.path.basename(os.path.dirname(game_path)).title()

    buttons_html += f'<button onclick="loadGame(\'{game_path}\')">{clean_name}</button>\n        '

# The rest of the template is the same as before
template = f"""
<!DOCTYPE html>
<html>
<head>
    <title>My Game Stash</title>
    <style>
        body {{ font-family: sans-serif; display: flex; height: 100vh; margin: 0; background: #111; color: white; }}
        #sidebar {{ width: 260px; background: #222; padding: 20px; overflow-y: auto; border-right: 2px solid #444; }}
        #game-container {{ flex-grow: 1; border: none; background: #000; }}
        button {{ display: block; width: 100%; padding: 12px; margin-bottom: 8px; cursor: pointer; background: #333; color: white; border: 1px solid #555; border-radius: 6px; text-align: left; }}
        button:hover {{ background: #444; border-color: #00bcff; }}
        h2 {{ color: #00bcff; margin-top: 0; }}
    </style>
</head>
<body>
    <div id="sidebar">
        <h2>🎮 All Games</h2>
        {buttons_html}
    </div>
    <iframe id="game-container" src=""></iframe>
    <script>
        function loadGame(path) {{ document.getElementById('game-container').src = path; }}
    </script>
</body>
</html>
"""

with open("index.html", "w") as f:
    f.write(template)
print(f"Success! Found {{len(games)}} game files.")
