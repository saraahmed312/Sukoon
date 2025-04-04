document.addEventListener('DOMContentLoaded', function () {
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

    const searchBtn = document.getElementById('searchBtn');
    const emotionInput = document.getElementById('emotionInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');

    searchBtn.addEventListener('click', searchDuaas);
    emotionInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchDuaas();
        }
    });

    function searchDuaas() {
        const searchText = emotionInput.value.trim().toLowerCase();

        // Character limit check (80 characters)
        if (searchText.length > 80) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>Please keep your message under 80 characters.</p>
                </div>
            `;
            return;
        }

        if (!searchText) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>Please describe how you're feeling to find relevant duaas.</p>
                </div>
            `;
            return;
        }

        loadingIndicator.style.display = 'block';
        resultsContainer.innerHTML = '';

        fetch(`http://localhost:3001/search?q=${encodeURIComponent(searchText)}`)
            .then(response => response.json())
            .then(duaas => {
                displayResults(duaas);
                loadingIndicator.style.display = 'none';
            })
            .catch(error => {
                console.error("Error fetching duaas:", error);
                resultsContainer.innerHTML = `
                    <div class="no-results">
                        <p>Something went wrong. Try again later.</p>
                    </div>
                `;
                loadingIndicator.style.display = 'none';
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
                    <div class="duaa-arabic">${duaa.text_arabic}</div>
                    <div class="duaa-content">
                        <div class="toggle-container">
                            <button class="toggle-btn active" data-type="translation">Translation</button>
                            <button class="toggle-btn" data-type="transliteration">Transliteration</button>
                        </div>
                        <div class="duaa-translation active">${duaa.translation}</div>
                        <div class="duaa-transliteration">${duaa.transliteration}</div>
                        <div class="duaa-reference">Reference: ${duaa.reference || '—'}</div>
                    </div>
                </div>
            `;
        });

        resultsContainer.innerHTML = html;

        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const duaaCard = this.closest('.duaa-card');
                const type = this.dataset.type;

                duaaCard.querySelectorAll('.toggle-btn').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');

                duaaCard.querySelector('.duaa-translation').classList.remove('active');
                duaaCard.querySelector('.duaa-transliteration').classList.remove('active');
                duaaCard.querySelector(`.duaa-${type}`).classList.add('active');
            });
        });
    }
});
