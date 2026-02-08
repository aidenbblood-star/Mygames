const GITHUB_USERNAME = 'aidenbblood-star';
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games'; 

async function loadGames() {
    const response = await fetch(`https://api.github.com{GITHUB_USERNAME}/${REPO_NAME}/contents/${GAMES_FOLDER}`);
    const files = await response.json();
    const container = document.getElementById('sections-container');
    const sidebar = document.getElementById('sidebar');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabet.forEach(letter => {
        // Create Sidebar Button
        const sideBtn = document.createElement('button');
        sideBtn.className = 'sidebar-btn';
        sideBtn.innerText = letter;
        sideBtn.onclick = () => document.getElementById(`section-${letter}`).scrollIntoView();
        sidebar.appendChild(sideBtn);

        // Create Section
        const section = document.createElement('div');
        section.id = `section-${letter}`;
        section.innerHTML = `<div class="letter-header">${letter}</div>`;
        
        const gamesInLetter = files.filter(f => f.name.toUpperCase().startsWith(letter));
        
        gamesInLetter.forEach(file => {
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            btn.innerText = file.name.replace('.html', '');
            btn.onclick = () => window.open(`https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/${GAMES_FOLDER}/${file.name}`);
            section.appendChild(btn);
        });

        container.appendChild(section);
    });
}
loadGames();
