const GITHUB_USERNAME = 'aidenbblood-star'; alert("Script is running!");
const REPO_NAME = 'Mygames';
const GAMES_FOLDER = 'games'; 

async function loadGames() {
    try {
        // Corrected GitHub API URL with /repos/ and proper variable syntax
        const response = await fetch(`https://api.github.com{GITHUB_USERNAME}/${REPO_NAME}/contents/${GAMES_FOLDER}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API returned status: ${response.status}`);
        }

        const files = await response.json();
        
        const container = document.getElementById('sections-container');
        const sidebar = document.getElementById('sidebar');

        // Clear existing content in case of double-loading
        container.innerHTML = '';
        sidebar.innerHTML = '';

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        alphabet.forEach(letter => {
            // Find games that start with this letter (case-insensitive)
            const gamesInLetter = files.filter(f => 
                f.name.toUpperCase().startsWith(letter) && f.name.endsWith('.html')
            );

            // Only create buttons and sections if games actually exist for this letter
            if (gamesInLetter.length > 0) {
                
                // 1. Create Sidebar Letter Button
                const sideBtn = document.createElement('button');
                sideBtn.className = 'sidebar-btn';
                sideBtn.innerText = letter;
                sideBtn.onclick = () => {
                    const target = document.getElementById(`section-${letter}`);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                };
                sidebar.appendChild(sideBtn);

                // 2. Create Alphabetical Section
                const section = document.createElement('div');
                section.id = `section-${letter}`;
                section.className = 'letter-section';
                section.innerHTML = `<div class="letter-header">${letter}</div>`;
                
                const buttonsContainer = document.createElement('div');
                buttonsContainer.className = 'buttons-container';

                gamesInLetter.forEach(file => {
                    const btn = document.createElement('button');
                    btn.className = 'game-btn';
                    
                    // Clean up the name for display
                    btn.innerText = file.name.replace('.html', '').replace(/-/g, ' ').toUpperCase();
                    
                    // Corrected jsDelivr URL for GitHub hosting
                    btn.onclick = () => {
                        const jsDelivrUrl = `https://cdn.jsdelivr.net{GITHUB_USERNAME}/${REPO_NAME}@main/${GAMES_FOLDER}/${file.name}`;
                        window.open(jsDelivrUrl, '_blank');
                    };
                    
                    buttonsContainer.appendChild(btn);
                });

                section.appendChild(buttonsContainer);
                container.appendChild(section);
            }
        });

    } catch (error) {
        console.error("Error loading games from GitHub:", error);
        document.getElementById('sections-container').innerHTML = `<p style="color: white; text-align: center;">Error loading games. Check console (F12) for details.</p>`;
    }
}

// Start the script immediately
loadGames();
