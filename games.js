const GITHUB_USERNAME = 'aidenbblood-star';
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games'; 

async function loadGames() {
    try {
        // THIS IS THE CORRECT URL TO AUTOMATICALLY GET YOUR LIST OF GAMES
        const response = await fetch(`https://api.github.com{GITHUB_USERNAME}/${REPO_NAME}/contents/${GAMES_FOLDER}`);
        
        // Check for rate limit or folder name issues
        if (response.status === 403) {
            alert("GitHub API Rate Limit Hit. Wait 1 hour and try again.");
            return;
        }
        if (response.status === 404) {
            alert("Cannot find folder or repo. Check GITHUB_USERNAME/REPO_NAME/GAMES_FOLDER names (case sensitive).");
            return;
        }

        const files = await response.json();
        // Filter only the HTML files
        const htmlFiles = files.filter(f => f.name.endsWith('.html'));
        
        const container = document.getElementById('sections-container');
        const sidebar = document.getElementById('sidebar');

        // ... (rest of the code is fine, it uses htmlFiles now)
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        alphabet.forEach(letter => {
            const gamesInLetter = htmlFiles.filter(f => f.name.toUpperCase().startsWith(letter));
            if (gamesInLetter.length > 0) {
                const sideBtn = document.createElement('button');
                sideBtn.className = 'sidebar-btn';
                sideBtn.innerText = letter;
                sideBtn.onclick = () => document.getElementById(`section-${letter}`).scrollView({ behavior: 'smooth' });
                sidebar.appendChild(sideBtn);

                const section = document.createElement('div');
                section.id = `section-${letter}`;
                section.className = 'letter-section';
                section.innerHTML = `<div class="letter-header">${letter}</div>`;
                
                gamesInLetter.forEach(file => {
                    const btn = document.createElement('button');
                    btn.className = 'game-btn';
                    btn.innerText = file.name.replace('.html', '').replace(/-/g, ' ').toUpperCase();
                    btn.onclick = () => {
                        window.open(`https://cdn.jsdelivr.net{GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${file.name}`, '_blank');
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

