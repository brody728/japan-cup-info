const center = document.querySelector(".center");

async function populate() {
    const file = "./kanji.json";
    const request = new Request(file);

    const response = await fetch(request);
    const kanjiList = await response.json();

    for (kanji of kanjiList) addKanjiData(kanji);
}

function addKanjiData(kanji) {
    const kanjiEntry = document.createElement("div")
    const kanjiChar = document.createElement("h2");
    const meaning = document.createElement("p");
    const kun = document.createElement("p");
    const on = document.createElement("p");
    const kunVocab = document.createElement("p");
    const onVocab = document.createElement("p");

    kanjiEntry.setAttribute("class", "kanji")

    center.appendChild(kanjiEntry);
    kanjiEntry.appendChild(kanjiChar);
    kanjiEntry.appendChild(meaning);
    kanjiEntry.appendChild(kun);
    kanjiEntry.appendChild(on);
    kanjiEntry.appendChild(kunVocab);
    kanjiEntry.appendChild(onVocab);

    kanjiChar.textContent = kanji.kanji;
    meaning.textContent = `Meaning: ${kanji.meaning}`;
    kun.textContent = `Kun-yomi: ${kanji.kun}`;
    kunVocab.textContent = "Kun-yomi Vocabulary: "
    on.textContent = `On-yomi: ${kanji.on}`;
    onVocab.textContent = "On-yomi Vocabulary: "

    for (let i = 0; i < kanji.kunVocab.length; i++) {
        for (let j = 0; j < kanji.kunVocab[i].length; j++) {
            if (kanji.kunVocabRuby[i][j] !== "") addRuby(kunVocab, kanji.kunVocab[i][j], kanji.kunVocabRuby[i][j]);
            else addWithoutRuby(kunVocab, kanji.kunVocab[i][j]);
        }
        if (i !== kanji.kunVocab.length - 1) kunVocab.append("、");
    }

    for (let i = 0; i < kanji.onVocab.length; i++) {
        for (let j = 0; j < kanji.onVocab[i].length; j++) {
            if (kanji.onVocabRuby[i][j] !== "") addRuby(onVocab, kanji.onVocab[i][j], kanji.onVocabRuby[i][j]);
            else addWithoutRuby(onVocab, kanji.onVocab[i][j]);
        }
        if (i !== kanji.onVocab.length - 1) onVocab.append("、");
    }
}

function addRuby(parent, mainText, rubyText) {
    const ruby = document.createElement("ruby");
    const rp1 = document.createElement("rp");
    const rt = document.createElement("rt");
    const rp2 = document.createElement("rp");

    parent.appendChild(ruby);
    ruby.textContent = mainText;

    ruby.appendChild(rp1);
    ruby.appendChild(rt);
    ruby.appendChild(rp2);

    rp1.textContent = "("
    rt.textContent = rubyText;
    rp2.textContent = ")";
}

function addWithoutRuby(parent, mainText) {
    parent.append(mainText);
}

populate();