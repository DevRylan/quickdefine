document.getElementById('searchButton').addEventListener('click', async () => {
    const word = document.getElementById('wordInput').value;
    console.log(word);

    if (!word) {
        document.getElementById('word').textContent = '';
        document.getElementById('phonetic').textContent = '';
        document.getElementById('definition').textContent = 'Please enter a word.';
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const wordData = data[0];
        const wordText = wordData.word;
        const phonetic = wordData.phonetic || wordData.phonetics[0].text;
        const definition = wordData.meanings[0].definitions[0].definition;

        document.getElementById('word').textContent = `Word: ${wordText}`;
        document.getElementById('phonetic').textContent = `Phonetic: ${phonetic}`;
        document.getElementById('definition').textContent = `Definition: ${definition}`;
    } catch (error) {
        document.getElementById('word').textContent = '';
        document.getElementById('phonetic').textContent = '';
        document.getElementById('definition').textContent = 'Cannot find definition. Maybe check the spelling?';
    }
});
