const GITHUB_USERNAME = 'aidenbblood-star';
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games';

let files = [ "1v1lol", "2048", "adarkroom", "asciispace", "assessmentexamination", "asteroids", "astray", "backcountry", "baldisbasics", "basketballlegends", "basketballstars", "basketbrosio", "basketrandom", "bitlife", "blackholesquare", "bounceback", "boxingrandom", "breaklock", "breakout", "btd4", "captaincallisto", "chess", "chromaincident", "chromedino", "clickerheroes", "clusterrush", "connect3", "cookieclicker", "crossyroad", "csgoclicker", "cubefield", "cubitomayhem", "cuttherope", "cuttheropeholiday", "cuttheropetimetravel", "deathrun3d", "deepestsword", "doodlejump", "doom", "drawthehill", "drift", "drifthunters", "drivemad", "ducklife", "ducklife2", "ducklife3", "ducklife4", "ducklife5", "earntodie", "edgenotfound", "eggycar", "evilglitch", "factoryballsforever", "fireboyandwatergirlforesttemple", "flappy2048", "flappybird", "flappyplane", "flightsimulator", "fridaynightfunkin", "friendlyfire", "fruitninja", "geometrydash", "getawayshootoutnew", "gladihoppers", "googlesnake", "gopherkart", "grindcraft", "hexgl", "hextris", "highwaytraffic", "konnekt", "learntofly", "letssurf", "littlealchemy", "mergeroundracers", "monkeymart", "motoroadrash3d", "motox3m", "ninjavsevilcorp", "omnombounce", "ovo", "ovo2", "packabunchas", "pacman", "paperio", "particleclicker", "pushback", "q1k3", "r3", "racer", "radiusraid", "redball4", "retrobowl", "retrohaunt", "riddleschool2", "ritz", "roadblocks", "rooftopsnipers", "run3", "scrapmetal3", "shuttledeck", "sketchbook04", "sleepingbeauty", "slitherio", "slope", "slope2", "snake", "snowbattle", "soccerrandom", "solitaire", "spacecompany", "spacegarden", "spacehuggers", "spaceinvaders", "stack", "stackball", "stickman-hook", "stickmanboost", "stickmanclimb", "stickmangolf", "stickmanhook", "stickmansurvival", "subwaysurfers", "subwaysurfersny", "subwaysurferssingapore", "tanukisunset", "tetris", "themazeofspacegoblins", "timeshooter", "timeshooter2", "timeshooter3", "tinyfishing", "tombofthemask", "topspeedracing3d", "towermaster", "trimps", "tunnelrush", "vex3", "vex4", "vex5", "vex6", "worldshardestgame2", "zombsroyale" ];

// ... followed by the generateAllSections() function I provided
function generateAllSections() {
    try {
        if (document.getElementById("lolbutton")) document.getElementById("lolbutton").remove();
    } catch(e){}

    const allChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    const filesByChar = {};
    allChars.forEach(char => filesByChar[char] = []);

    // Categorize your games based on the first letter
    files.forEach(file => {
        const firstChar = file[0].toUpperCase();
        if (filesByChar[firstChar]) {
            filesByChar[firstChar].push(file);
        }
    });

    const container = document.getElementById('sections-container');
    container.innerHTML = ''; // Clear previous content

    allChars.forEach(char => {
        const section = document.createElement('div');
        section.className = 'letter-section';
        section.id = `section-${char}`;

        const header = document.createElement('div');
        header.className = 'letter-header';
        header.textContent = char;
        section.appendChild(header);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';

        if (filesByChar[char].length > 0) {
            filesByChar[char].forEach(folderName => {
                const btn = document.createElement('input');
                btn.type = 'button';
                btn.className = 'game-btn'; // Matches your CSS
                btn.value = folderName.replace(/-/g, ' ').toUpperCase();
                
              btn.onclick = () => {
    const baseUrl = `https://cdn.jsdelivr.net{GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${folderName}/`;
    const fullUrl = `${baseUrl}index.html`;

    fetch(fullUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            // 1. Inject the <base> tag so the game can find its scripts/images on jsDelivr
            const playableCode = `<base href="${baseUrl}">${html}`;

            // 2. Create a BLOB (Binary Large Object) and EXPLICITLY set it to HTML
            // This is the step that stops the "show as code" problem
            const blob = new Blob([playableCode], { type: 'text/html' });
            
            // 3. Create a unique temporary URL for this blob
            const blobUrl = URL.createObjectURL(blob);

            // 4. Open that temporary URL in a new tab
            window.open(blobUrl, '_blank');
        })
        .catch(err => {
            console.error('Error:', err);
            alert("Failed to load game. Make sure the file exists at: " + fullUrl);
        });
};

                    
                };
                buttonsContainer.appendChild(btn);
            });
        } else {
            section.classList.add('empty');
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-message';
            emptyMsg.textContent = 'No games';
            buttonsContainer.appendChild(emptyMsg);
        }

        section.appendChild(buttonsContainer);
        container.appendChild(section);
    });

    generateSidebar(allChars, filesByChar);
}

function generateSidebar(allChars, filesByChar) {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = ''; // Clear previous

    allChars.forEach(char => {
        const btn = document.createElement('button');
        btn.className = 'sidebar-btn';
        btn.textContent = char;

        if (filesByChar[char].length === 0) {
            btn.classList.add('empty');
        } else {
            btn.onclick = () => {
                const section = document.getElementById(`section-${char}`);
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
        }
        sidebar.appendChild(btn);
    });
}

// Call the function to start
generateAllSections();

