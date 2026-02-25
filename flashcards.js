const center = document.querySelector(".center");

const cards = [];

async function initialLoad() {
    const formDiv = document.createElement("div");
    const setSelectionDiv = document.createElement("div");
    const level1Kanji = document.createElement("input");
    const level2Kanji = document.createElement("input");
    const level2Places = document.createElement("input");
    const level1KanjiLabel = document.createElement("label");
    const level2KanjiLabel = document.createElement("label");
    const level2PlacesLabel = document.createElement("label");
    const btn = document.createElement("button");

    level1Kanji.setAttribute("type", "checkbox");
    level2Kanji.setAttribute("type", "checkbox");
    level2Places.setAttribute("type", "checkbox");
    level1Kanji.setAttribute("id", "level-1-kanji");
    level2Kanji.setAttribute("id", "level-2-kanji");
    level2Places.setAttribute("id", "level-2-places");
    level1KanjiLabel.setAttribute("for", "level-1-kanji");
    level2KanjiLabel.setAttribute("for", "level-2-kanji");
    level2PlacesLabel.setAttribute("for", "level-2-places");

    center.appendChild(formDiv);
    formDiv.appendChild(setSelectionDiv);
    formDiv.appendChild(btn);
    setSelectionDiv.appendChild(level1Kanji);
    setSelectionDiv.appendChild(level1KanjiLabel);
    setSelectionDiv.appendChild(document.createElement("br"));
    setSelectionDiv.appendChild(level2Kanji);
    setSelectionDiv.appendChild(level2KanjiLabel);
    setSelectionDiv.appendChild(document.createElement("br"));
    setSelectionDiv.appendChild(level2Places);
    setSelectionDiv.appendChild(level2PlacesLabel);

    btn.textContent = "Start";
    level1KanjiLabel.textContent = "Level 1 Kanji";
    level2KanjiLabel.textContent = "Level 2 Kanji";
    level2PlacesLabel.textContent = "Level 2 Places";

    await getUserInput(btn);

    if (level1Kanji.checked) {
        await addKanjiCards("./level-1/kanji.json");
    }
    if (level2Kanji.checked) {
        await addKanjiCards("./level-2/kanji.json");
    }
    // if (level2Places.checked) {
    //     await addKanjiCards("./level-2/places.json");
    // }

    center.removeChild(formDiv);
    reviewCards();
}

async function addKanjiCards(filePath) {
    const request = new Request(filePath);
    const response = await fetch(request);
    const kanjiList = await response.json();

    for (kanji of kanjiList) {
        for (i = 0; i < kanji.kunVocab.length; i++) {
            if (kanji.kunVocab[i][0] !== "None") {
                const card = {
                    front: kanji.kunVocab[i],
                    frontRuby: kanji.kunVocabRuby[i],
                    back: kanji.kunVocabMeaning[i]
                };
                cards.push(card);
            }
        }
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

    rt.classList.toggle("hidden")

    rp1.textContent = "("
    rt.textContent = rubyText;
    rp2.textContent = ")";
}

function addWithoutRuby(parent, mainText) {
    parent.append(mainText);
}

function getUserInput(cont) {
    return new Promise(resolve => {
        cont.addEventListener("click", function handler () {
            resolve(true);
        }, { once: true });
    });
}

async function reviewCards() {
    console.log(cards);
    for (card of cards) {
        const cardDiv = document.createElement("div");
        const front = document.createElement("p");
        const back = document.createElement("p");
        const cont = document.createElement("button");

        center.appendChild(cardDiv);
        cardDiv.appendChild(front);
        cardDiv.appendChild(back);
        cardDiv.appendChild(cont);

        back.classList.toggle("hidden");

        console.log(card.front.length);
        for (i = 0; i < card.front.length; i++) {
            addRuby(front, card.front[i], card.frontRuby[i]);
        }
        back.textContent = card.back;
        cont.textContent = "Next Card";

        await getUserInput(cont);

        back.classList.toggle("hidden");
        document.querySelectorAll("rt").forEach(rt => {rt.classList.toggle("hidden")});

        await getUserInput(cont);

        center.removeChild(cardDiv);
    }
}

async function populate() {
    await addKanjiCards("./level-1/kanji.json");
    await reviewCards();
}

initialLoad();
// populate();