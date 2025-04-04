// Small db set
const duaasDatabase = [
    {
        id: 1,
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ",
        translation: "O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice, from being overcome by debt and overpowered by men.",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wa a'udhu bika minal-'ajzi wal-kasal, wa a'udhu bika minal-jubni wal-bukhl, wa a'udhu bika min ghalabatid-dayni wa qahrir-rijal",
        reference: "Sunan Abu Dawood 1555",
        keywords: ["anxiety", "stress", "worry", "sadness", "depression", "overwhelmed"]
    },
    {
        id: 2,
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        translation: "Allah is sufficient for me. There is no deity except Him. I have placed my trust in Him, and He is the Lord of the Great Throne.",
        transliteration: "Hasbiyallahu la ilaha illa huwa, 'alayhi tawakkaltu, wa huwa rabbul-'arshil-'azim",
        reference: "Quran 9:129",
        keywords: ["trust", "reliance", "difficulty", "support", "help", "protection"]
    },
    {
        id: 3,
        arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ",
        translation: "O Allah, I hope for Your mercy. Do not leave me to myself even for the blink of an eye. Correct all of my affairs for me. There is none worthy of worship except You.",
        transliteration: "Allahumma rahmataka arju, fala takilni ila nafsi tarfata 'aynin, wa aslih li sha'ni kullahu, la ilaha illa anta",
        reference: "Sunan Abu Dawood 5090",
        keywords: ["mercy", "guidance", "help", "support", "direction", "lost"]
    },
    {
        id: 4,
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
        transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
        reference: "Quran 21:87",
        keywords: ["repentance", "forgiveness", "distress", "difficulty", "help", "support"]
    },
    {
        id: 5,
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
        reference: "Sunan Ibn Majah 925",
        keywords: ["knowledge", "provision", "work", "success", "guidance", "future"]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (currentPage === 'index.html') {
        document.getElementById('home-link').classList.add('active');
    } else if (currentPage === 'about.html') {
        document.getElementById('about-link').classList.add('active');
    } else if (currentPage === 'duaas.html') {
        document.getElementById('duaas-link').classList.add('active');
    } else if (currentPage === 'contact.html') {
        document.getElementById('contact-link').classList.add('active');
    }
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const emotionInput = document.getElementById('emotionInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    searchBtn.addEventListener('click', searchDuaas);
    emotionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchDuaas();
        }
    });
    
    function searchDuaas() {
        const searchText = emotionInput.value.trim().toLowerCase();
        
        if (!searchText) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>Please describe how you're feeling to find relevant duaas.</p>
                </div>
            `;
            return;
        }
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        resultsContainer.innerHTML = '';
        
        // Simulate API call delay
        setTimeout(() => {
            const matchedDuaas = findMatchingDuaas(searchText);
            displayResults(matchedDuaas);
            loadingIndicator.style.display = 'none';
        }, 800);
    }
    
    function findMatchingDuaas(searchText) {
        // Simple keyword matching
        return duaasDatabase.filter(duaa => {
            // Check if any keyword is included in the search text
            return duaa.keywords.some(keyword => 
                searchText.includes(keyword.toLowerCase())
            );
        });
    }
    
    function displayResults(duaas) {
        if (duaas.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No duaas found matching your description. Try different words or be more specific.</p>
                    <p>Example: Instead of "sad", try "I feel lonely after moving to a new city"</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        
        duaas.forEach(duaa => {
            html += `
                <div class="duaa-card" data-id="${duaa.id}">
                    <div class="duaa-arabic">${duaa.arabic}</div>
                    <div class="duaa-content">
                        <div class="toggle-container">
                            <button class="toggle-btn active" data-type="translation">Translation</button>
                            <button class="toggle-btn" data-type="transliteration">Transliteration</button>
                        </div>
                        <div class="duaa-translation active">${duaa.translation}</div>
                        <div class="duaa-transliteration">${duaa.transliteration}</div>
                        <div class="duaa-reference">Reference: ${duaa.reference}</div>
                    </div>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = html;
        
        // Add event listeners to toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const duaaCard = this.closest('.duaa-card');
                const type = this.dataset.type;
                
                // Toggle active class on buttons
                duaaCard.querySelectorAll('.toggle-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Toggle content visibility
                duaaCard.querySelector('.duaa-translation').classList.remove('active');
                duaaCard.querySelector('.duaa-transliteration').classList.remove('active');
                duaaCard.querySelector(`.duaa-${type}`).classList.add('active');
            });
        });
    }
});