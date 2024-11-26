// js/backoffice.js

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const translationForm = document.getElementById('translationForm');
    let currentLang = languageSelect.value;

    // Load existing translations when language changes
    languageSelect.addEventListener('change', () => {
        currentLang = languageSelect.value;
        loadTranslations(currentLang);
    });

    // Function to load existing translations
    function loadTranslations(lang) {
        fetch(`translations/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                // Fill form fields with translations
                for (const key in data) {
                    const input = document.getElementById(key);
                    if (input) {
                        input.value = data[key];
                    }
                }
            })
            .catch(() => {
                // If no translation file exists, reset the form
                translationForm.reset();
            });
    }

    // Save translations to JSON file
    translationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect data from the form
        const formData = new FormData(translationForm);
        const translations = {};
        formData.forEach((value, key) => {
            translations[key] = value;
        });

        // Since there's no server, download the JSON file
        const dataStr = JSON.stringify(translations, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a link to download the file
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${currentLang}.json`;

        // Click the link to start the download
        downloadLink.click();

        // Release the URL
        URL.revokeObjectURL(url);

        alert('התרגומים נשמרו בהצלחה! אנא העבר את הקובץ לתיקיית translations באתר הראשי.');
    });

    // Initial load
    loadTranslations(currentLang);
});
