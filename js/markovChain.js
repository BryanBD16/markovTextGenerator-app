class MarkovChain {
    constructor() {
        this._graph = {};
    }

    _weightedRandomChoice(nextWords) {
        const total = Object.values(nextWords).reduce((a, b) => a + b, 0);
        let stop = Math.floor(Math.random() * total) + 1;
        let sum = 0;
        for (const [word, count] of Object.entries(nextWords)) {
            sum += count;
            if (sum >= stop) return word;
        }
    }

    train(text) {
        const separators = /[\s\n\r\t.,;:!?"“”_\-\*()—«»]+/;
        const words = text.toLowerCase().split(separators).filter(w => w.length > 0);

        for (let i = 0; i < words.length - 1; i++) {
            const current = words[i];
            const next = words[i + 1];

            if (!this._graph[current]) this._graph[current] = {};
            this._graph[current][next] = (this._graph[current][next] || 0) + 1;
        }
    }

    generate(count) {
        const keys = Object.keys(this._graph);
        if (keys.length === 0) return '';

        let current = keys[Math.floor(Math.random() * keys.length)];
        const result = [current];

        for (let i = 1; i < count; i++) {
            if (!this._graph[current] || Object.keys(this._graph[current]).length === 0) break;
            current = this._weightedRandomChoice(this._graph[current]);
            result.push(current);
        }

        return result.join(' ');
    }
}

// Event listener pour le bouton
document.getElementById("generateBtn").addEventListener("click", async () => {
    const wordCount = parseInt(document.getElementById("wordCount").value) || 30;
    const maxWords = 1000;
    const minWords = 1;

    if (wordCount > maxWords) {
        alert(`Le nombre maximum est ${maxWords}`);
        return; // stoppe l'exécution
    }

    if (wordCount < minWords) {
        alert(`Le nombre minimum est ${minWords}`);
        return; // stoppe l'exécution
    }

    const resultElement = document.getElementById("result");

     // Récupérer la valeur sélectionnée dans le select
    const selectedFile = document.getElementById("textChoice").value;

    // Charger le texte
    const response = await fetch(`assets/data/${selectedFile}`);
    const inputText = await response.text();

    // Générer le texte Markov
    const markov = new MarkovChain();
    markov.train(inputText);
    const generatedText = markov.generate(wordCount);

    resultElement.textContent = generatedText;
});


