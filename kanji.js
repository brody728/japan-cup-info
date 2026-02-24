const center = document.querySelector(".center");
const kanjiHeader = document.createElement("h2");
const kanjiEntries = document.createElement("div");

kanjiHeader.setAttribute("class", "kanji-header");
kanjiEntries.setAttribute("class", "kanji-entries");

center.appendChild(kanjiHeader);
center.appendChild(kanjiEntries);

kanjiHeader.textContent = "Kanji";

async function populate() {
    const file = "./kanji.json";
    const request = new Request(file);
    const response = await fetch(request);
    const kanjiList = await response.json();

    for (kanji of kanjiList) addKanjiData(kanji);
}

function addKanjiData(kanji) {
    const kanjiEntry = document.createElement("div")
    const kanjiChar = document.createElement("h3");
    const meaning = document.createElement("p");
    const meaningSpan = document.createElement("span");
    const kun = document.createElement("p");
    const kunSpan = document.createElement("span");
    const on = document.createElement("p");
    const onSpan = document.createElement("span");
    const kunVocabHeader = document.createElement("h4");
    const kunVocab = document.createElement("p");
    const onVocabHeader = document.createElement("h4");
    const onVocab = document.createElement("p");

    kanjiEntry.setAttribute("class", "kanji");
    meaningSpan.setAttribute("class", "line-head");
    kunSpan.setAttribute("class", "line-head");
    onSpan.setAttribute("class", "line-head");

    kanjiEntries.appendChild(kanjiEntry);
    kanjiEntry.appendChild(kanjiChar);
    kanjiEntry.appendChild(meaning);
    meaning.appendChild(meaningSpan);
    kanjiEntry.appendChild(kun);
    kun.appendChild(kunSpan);
    kanjiEntry.appendChild(on);
    on.appendChild(onSpan);
    kanjiEntry.appendChild(kunVocabHeader);
    kanjiEntry.appendChild(kunVocab);
    kanjiEntry.appendChild(onVocabHeader)
    kanjiEntry.appendChild(onVocab);

    kanjiChar.textContent = kanji.kanji;
    meaningSpan.textContent = "Meaning: ";
    meaning.appendChild(document.createTextNode(kanji.meaning))
    kunSpan.textContent = "Kun-yomi: ";
    kun.appendChild(document.createTextNode(kanji.kun));
    kunVocabHeader.textContent = "Kun-yomi Vocabulary"
    onSpan.textContent = "On-yomi: ";
    on.appendChild(document.createTextNode(kanji.on));
    onVocabHeader.textContent = "On-yomi Vocabulary"

    for (let i = 0; i < kanji.kunVocab.length; i++) {
        const span = document.createElement("span");
        kunVocab.appendChild(span);
        span.setAttribute("class", "vocab");

        for (let j = 0; j < kanji.kunVocab[i].length; j++) {
            if (kanji.kunVocabRuby[i][j] !== "") addRuby(span, kanji.kunVocab[i][j], kanji.kunVocabRuby[i][j]);
            else addWithoutRuby(span, kanji.kunVocab[i][j]);
        }

        if (i < kunVocab.length - 1) kunVocab.append(document.createElement("br"));
        kunVocab.append(` ${kanji.kunVocabMeaning[i]}`);
    }

    for (let i = 0; i < kanji.onVocab.length; i++) {
        const span = document.createElement("span");
        onVocab.appendChild(span);
        span.setAttribute("class", "vocab");

        for (let j = 0; j < kanji.onVocab[i].length; j++) {
            if (kanji.onVocabRuby[i][j] !== "") addRuby(span, kanji.onVocab[i][j], kanji.onVocabRuby[i][j]);
            else addWithoutRuby(span, kanji.onVocab[i][j]);
        }

        if (i < kanji.onVocab.length - 1) onVocab.append(document.createElement("br"));
        onVocab.append(` ${kanji.onVocabMeaning[i]}`);
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