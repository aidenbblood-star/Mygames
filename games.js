// A manual list of your game folder names. This is required to bypass API errors.
const gameFolders = [
    "1v1lol", 
    // Add ALL your other folder names here, e.g., "flappybird", "pong"
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
        const gamesInLetter = gameFolders.filter(name => 
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
                    // Links to the index.html inside the specific folder name using CDN
                    const url = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${folderName}/index.html`;
                    window.open(url, '_blank');
                };
                section.appendChild(btn);
            });
            container.appendChild(section);
        }
    });
}
loadGames();

