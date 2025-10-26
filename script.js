
// Dark mode setup
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// App state
const fullColorPalette = ['#A4D65E', '#FF7F50', '#FF6F61', '#FFD700', '#003366', '#66B2FF'];

// DOM elements
const dame1Btn = document.getElementById('dame1Btn');
const dame6Btn = document.getElementById('dame6Btn');
const dame8Btn = document.getElementById('dame8Btn');
const resultDiv = document.getElementById('resultDiv');
const resultNumber = document.getElementById('resultNumber');
const resultMeaning = document.getElementById('resultMeaning');
const randomNumbersDiv = document.getElementById('randomNumbersDiv');
const numbersGrid = document.getElementById('numbersGrid');
const infoSection = document.querySelector('.info-section');

// Render numbers grid
function renderNumbersGrid() {
    const numbers = Object.keys(quiniela).sort();
    let colorIndex = 0;
    const html = numbers.map(num => {
        const size = Math.random() > 0.8 ? '2' : '1';
        const bgColor = fullColorPalette[colorIndex % fullColorPalette.length];
        colorIndex++;
        return `
        <div style="background-color: ${bgColor}; padding: 0.5rem; text-align: center; border: 1px solid rgba(255,255,255,0.2); grid-column: span ${size}; grid-row: span ${size};">
            <div style="font-weight: 700; color: var(--light-text-color);">${num}</div>
            <div class="grid-item-meaning" style="font-size: 0.75rem; color: var(--light-text-color);">${quiniela[num]}</div>
        </div>
    `}).join('');
    numbersGrid.innerHTML = html;
}

// Placeholder for Gemini API call
function getGeminiDefinition(term) {
    console.log(`Buscando definición para: ${term}`);
    // En una implementación real, aquí se haría una llamada a la API de Gemini.
    return `Definición para "${term}": tradicionalmente asociado con la suerte, los presagios y las interpretaciones oníricas en la cultura popular. Representa una conexión entre el mundo material y el espiritual.`;
}

function clearResults() {
    resultDiv.classList.add('hidden');
    randomNumbersDiv.classList.add('hidden');
    infoSection.innerHTML = '';
}

function getRandomNumbers(count) {
    const numbers = Object.keys(quiniela);
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function showSingleNumber() {
    clearResults();
    const [number] = getRandomNumbers(1);
    const meaning = quiniela[number];

    // Show main result
    resultNumber.textContent = number;
    resultMeaning.textContent = meaning;
    resultDiv.classList.remove('hidden');

    // Show Gemini definition
    const definition = getGeminiDefinition(meaning);
    infoSection.innerHTML = `
        <h2 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Definición Ampliada</h2>
        <p style="font-size: 1rem; text-align: center; margin: 0;">${definition}</p>
    `;
}

function showMultipleNumbers(count) {
    clearResults();
    const randomNumbers = getRandomNumbers(count);
    const numbersHtml = randomNumbers.map(num => `
        <div class="random-number-item">
            <p class="result-number">${num}</p>
            <p class="result-meaning">${quiniela[num]}</p>
        </div>
    `).join('');

    const shareButtonHtml = `<button id="shareBtn" style="margin-top: 1rem; padding: 1rem 1.5rem; background-color: var(--primary-color); color: var(--light-text-color); font-weight: 700; font-size: 1.25rem; transition: background-color 0.3s; border: none;">COMPARTIR</button>`;

    randomNumbersDiv.innerHTML = `<div class="random-numbers-grid">${numbersHtml}</div>${shareButtonHtml}`;
    randomNumbersDiv.classList.remove('hidden');

    document.getElementById('shareBtn').addEventListener('click', () => {
        const shareText = randomNumbers.map(num => `${num}: ${quiniela[num]}`).join('\n');
        if (navigator.share) {
            navigator.share({
                title: 'Mis números de la suerte',
                text: `Mis números de la suerte:\n${shareText}`,
            })
            .catch(console.error);
        } else {
            alert(`Copia estos números:\n\n${shareText}`);
        }
    });
}

// Event listeners
dame1Btn.addEventListener('click', showSingleNumber);
dame6Btn.addEventListener('click', () => showMultipleNumbers(6));
dame8Btn.addEventListener('click', () => showMultipleNumbers(8));

// Initialize
renderNumbersGrid();
