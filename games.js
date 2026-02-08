const GITHUB_USERNAME = 'aidenbblood-star';
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games'; 

async function loadGames() {
    try {
        // Fetching the list of files in your 'games' folder via GitHub API
        const response = await fetch(`https://api.github.com{GITHUB_USERNAME}/${REPO_NAME}/contents/${GAMES_FOLDER}`);
        const files = await response.json();
        
        const container = document.getElementById('sections-container');
        const sidebar = document.getElementById('sidebar');

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        alphabet.forEach(letter => {
            // Create Sidebar Letter Button
            const sideBtn = document.createElement('button');
            sideBtn.className = 'sidebar-btn';
            sideBtn.innerText = letter;
            sideBtn.onclick = () => {
                const target = document.getElementById(`section-${letter}`);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            };
            sidebar.appendChild(sideBtn);

            // Create Alphabetical Section
            const section = document.createElement('div');
            section.id = `section-${letter}`;
            section.innerHTML = `<div class="letter-header">${letter}</div>`;
            
            // Find games that start with this letter
            const gamesInLetter = files.filter(f => f.name.toUpperCase().startsWith(letter));
            
            gamesInLetter.forEach(file => {
                const btn = document.createElement('button');
                btn.className = 'game-btn';
                
                // Clean up the name (removes .html and makes it look nice)
                btn.innerText = file.name.replace('.html', '').replace(/-/g, ' ').toUpperCase();
                
                // UPDATED: This now uses jsDelivr to load your games lightning fast
                btn.onclick = () => {
                    const jsDelivrUrl = `https://cdn.jsdelivr.net{GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${file.name}`;
                    window.open(jsDelivrUrl, '_blank');
                };
                
                section.appendChild(btn);
            });

            container.appendChild(section);
        });
    } catch (error) {
        console.error("Error loading games:", error);
    }
}

// Start the script
loadGames();

