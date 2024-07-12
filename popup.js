document.getElementById('searchButton').addEventListener('click', async () => {
    const word = document.getElementById('wordInput').value;
    console.log(word);

    if (!word) {
        document.getElementById('word').textContent = '';
        document.getElementById('phonetic').textContent = '';
        document.getElementById('definition').textContent = 'Please enter a word.';
        return; //in case their is no word input
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const wordData = data[0];
        const audioData = wordData.phonetics[0].audio;
        const wordText = wordData.word;
        const phonetic = wordData.phonetic || wordData.phonetics[0].text;
        const definition = wordData.meanings[0].definitions[0].definition;
        //Formats the text

        document.getElementById('word').textContent = `Word: ${wordText}`;
        document.getElementById('phonetic').textContent = `Phonetic: ${phonetic}`;
        document.getElementById('definition').textContent = `Definition: ${definition}`;

        const newAudioPlayer = document.getElementById('audioPlayer');
        const newAudioPlayerClone = newAudioPlayer.cloneNode(true);
        newAudioPlayer.parentNode.replaceChild(newAudioPlayerClone, newAudioPlayer);
        //Removes the previous event listener

        document.getElementById('audioPlayer').addEventListener('click', ()=>{
            const audio = new Audio(audioData)
            audio.play();
        });
    } catch (error) { //If there is no definition
        document.getElementById('word').textContent = '';
        document.getElementById('phonetic').textContent = '';
        document.getElementById('definition').textContent = 'Cannot find definition. Maybe check the spelling?';
    }
});
