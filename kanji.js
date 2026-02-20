const body = document.querySelector("body");

async function populate() {
    const file = "./kanji.json";
    const request = new Request(file);

    const response = await fetch(request);
    const kanjiList = await response.json();

    for (kanji of kanjiList) addKanjiData(kanji);
}

function addKanjiData(kanji) {
    const kanjiChar = document.createElement("p");
    const kun = document.createElement("p");
    const on = document.createElement("p");
    const kunVocab = document.createElement("p");
    const onVocab = document.createElement("p");


    body.appendChild(kanjiChar);
    body.appendChild(kun);
    body.appendChild(on);
    body.appendChild(kunVocab);
    body.appendChild(onVocab);

    kanjiChar.textContent = kanji.kanji;
    kun.textContent = `Kun-yomi: ${kanji.kun}`;
    kunVocab.textContent = "Kun-yomi Vocabulary: "
    on.textContent = `On-yomi: ${kanji.on}`;
    onVocab.textContent = "On-yomi Vocabulary: "

    for (let i = 0; i < kanji.kunVocab.length; i++) {
        if (kanji.kunVocabRuby !== "") addRuby(kunVocab, kanji.kunVocab[i], kanji.kunVocabRuby[i]);
        else addWithoutRuby(kunVocab, kanji.kunVocab[i]);
    }

    for (let i = 0; i < kanji.onVocab.length; i++) {
        if (kanji.onVocabRuby !== "") addRuby(onVocab, kanji.onVocab[i], kanji.onVocabRuby[i]);
        else addWithoutRuby(onVocab, kanji.onVocab[i]);
    }

    // addRuby(kunVocab, kanji.kunVocab, kanji.kunVocabRuby);
    // addRuby(onVocab, kanji.onVocab, kanji.onVocabRuby);
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
    parent.textContent += mainText;
}

populate();