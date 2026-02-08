const GITHUB_USERNAME = 'aidenbblood-star';
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games'; 

async function loadGames() {
    try {
        // FIX 1: Added "$" before {GITHUB_USERNAME} and a "/" after .com
        const response = await fetch(`https://api.github.com{GITHUB_USERNAME}/${REPO_NAME}/contents/${GAMES_FOLDER}`);
        const files = await response.json();
        
        // Safety check: if files isn't an array, the folder might be empty or name is wrong
        if (!Array.isArray(files)) {
            console.error("Could not find games folder. Check your REPO_NAME and GAMES_FOLDER.");
            return;
        }

        const container = document.getElementById('sections-container');
        const sidebar = document.getElementById('sidebar');
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        alphabet.forEach(letter => {
            const gamesInLetter = files.filter(f => f.name.toUpperCase().startsWith(letter));
            
            // Only create the section and sidebar button if there are games for this letter
            if (gamesInLetter.length > 0) {
                const sideBtn = document.createElement('button');
                sideBtn.className = 'sidebar-btn';
                sideBtn.innerText = letter;
                sideBtn.onclick = () => {
                    const target = document.getElementById(`section-${letter}`);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                };
                sidebar.appendChild(sideBtn);

                const section = document.createElement('div');
                section.id = `section-${letter}`;
                section.className = 'letter-section'; // Matches your CSS
                section.innerHTML = `<div class="letter-header">${letter}</div>`;
                
                gamesInLetter.forEach(file => {
                    const btn = document.createElement('button');
                    btn.className = 'game-btn';
                    btn.innerText = file.name.replace('.html', '').replace(/-/g, ' ').toUpperCase();
                    
                    // FIX 2: Added "$" before {GITHUB_USERNAME} and a "/" after .net/gh
                    btn.onclick = () => {
                        const jsDelivrUrl = `https://cdn.jsdelivr.net{GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${file.name}`;
                        window.open(jsDelivrUrl, '_blank');
                    };
                    
                    section.appendChild(btn);
                });
                container.appendChild(section);
            }
        });
    } catch (error) {
        console.error("Error loading games:", error);
    }
}

loadGames();
