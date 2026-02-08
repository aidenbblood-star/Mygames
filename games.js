// A manual list of your game folder names using the "let files" variable name
let files = [
    "1v1lol", "2048", "adarkroom", "asciispace", "assessmentexamination",
    "asteroids", "astray", "backcountry", "baldisbasics", "basketballlegends",
    "basketballstars", "basketbrosio", "basketrandom", "bitlife", "blackholesquare",
    "bounceback", "boxingrandom", "breaklock", "breakout", "btd4", "captaincallisto",
    "chess", "chromaincident", "chromedino", "clickerheroes", "clusterrush",
    "connect3", "cookieclicker", "crossyroad", "csgoclicker", "cubefield",
    "cubitomayhem", "cuttherope", "cuttheropeholiday", "cuttheropetimetravel",
    "deathrun3d", "deepestsword", "doodlejump", "doom", "drawthehill", "drift",
    "drifthunters", "drivemad", "ducklife", "ducklife2", "ducklife3", "ducklife4",
    "ducklife5", "earntodie", "edgenotfound", "eggycar", "evilglitch",
    "factoryballsforever", "fireboyandwatergirlforesttemple", "flappy2048",
    "flappybird", "flappyplane", "flightsimulator", "fridaynightfunkin",
    "friendlyfire", "fruitninja", "geometrydash", "getawayshootoutnew", "gladihoppers",
    "googlesnake", "gopherkart", "grindcraft", "hexgl", "hextris", "highwaytraffic",
    "konnekt", "learntofly", "letssurf", "littlealchemy", "mergeroundracers",
    "monkeymart", "motoroadrash3d", "motox3m", "ninjavsevilcorp", "omnombounce", "ovo",
    "ovo2", "packabunchas", "pacman", "paperio", "particleclicker", "pushback", "q1k3",
    "r3", "racer", "radiusraid", "redball4", "retrobowl", "retrohaunt",
    "riddleschool2", "ritz", "roadblocks", "rooftopsnipers", "run3", "scrapmetal3",
    "shuttledeck", "sketchbook04", "sleepingbeauty", "slitherio", "slope", "slope2",
    "snake", "snowbattle", "soccerrandom", "solitaire", "spacecompany",
    "spacegarden", "spacehuggers", "spaceinvaders", "stack", "stackball",
    "stickman-hook", "stickmanboost", "stickmanclimb", "stickmangolf", "stickmanhook",
    "stickmansurvival", "subwaysurfers", "subwaysurfersny", "subwaysurferssingapore",
    "tanukisunset", "tetris", "themazeofspacegoblins", "timeshooter", "timeshooter2",
    "timeshooter3", "tinyfishing", "tombofthemask", "topspeedracing3d", "towermaster",
    "trimps", "tunnelrush", "vex3", "vex4", "vex5", "vex6", "worldshardestgame2",
    "zombsroyale"
]; 

// --- DO NOT EDIT BELOW THIS LINE --- (This part handles the display logic)

const GITHUB_USERNAME = 'aidenbblood-star';
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games'; // The main folder that holds all game folders

function loadGames() {
    const container = document.getElementById('sections-container');
    const sidebar = document.getElementById('sidebar');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    container.innerHTML = '';
    sidebar.innerHTML = '';

    alphabet.forEach(letter => {
        // Now using the 'files' variable you wanted
        const gamesInLetter = files.filter(name => 
            name.toUpperCase().startsWith(letter)
        );

        if (gamesInLetter.length > 0) {
            const section = document.createElement('div');
            section.id = `section-${letter}`;
            section.className = 'letter-section';
            section.innerHTML = `<div class="letter-header">${letter}</div>`;
            
            gamesInLetter.forEach(folderName => {
                const btn = document.createElement('button');
                btn.className = 'game-btn';
                btn.innerText = folderName.replace(/-/g, ' ').toUpperCase();
                
               btn.onclick = () => {
    const baseUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${folderName}/`;
    const url = baseUrl + 'index.html';

    fetch(url)
        .then(res => res.text())
        .then(code => {
            // 1. Open a completely blank new tab immediately
            const win = window.open('about:blank', '_blank');

            // 2. Add a <base> tag so the game finds its images/scripts on jsDelivr
            // Without this, the game's art and sounds will be broken
            const renderedCode = `<base href="${baseUrl}">${code}`;

            // 3. Manually write the code into the new tab's document
            // This forces the browser to render it as HTML
            win.document.open();
            win.document.write(renderedCode);
            win.document.close();
        })
        .catch(err => console.error("Error loading game:", err));

                section.appendChild(btn);
            });
            container.appendChild(section);
        }
    });
}
loadGames();
