const center = document.querySelector(".center");
const selector = document.querySelector("#selector");
const kanjiOptions = document.querySelector("#kanji-options");
const placesOptions = document.querySelector("#places-options");

const cards = [];

selector.addEventListener("change", () => {
    if (selector.value === "kanji") {
        kanjiOptions.className = "";
        placesOptions.className = "hidden";
    }
    if (selector.value === "places") {
        placesOptions.className = "";
        kanjiOptions.className = "hidden";
    }
});

async function initialLoad() {
    let setSelected = false;
    let typeSelected = false;
    const formDiv = document.querySelector(".form-div");
    const level1Kanji = document.querySelector("#level-1-kanji");
    const level2Kanji = document.querySelector("#level-2-kanji");
    const onReadings = document.querySelector("#on-readings");
    const kunVocab = document.querySelector("#kun-vocab");
    const onVocab = document.querySelector("on-vocab");
    const btn = document.querySelector("button");

    while (!setSelected) {
        await getUserInput(btn);

        if (level1Kanji.checked) {
            setSelected = true;
            if (onReadings.checked) {
                typeSelected = true;
            }
            if (kunVocab.checked) {
                typeSelected = true;
            }
            if (onVocab) {
                typeSelected = true;
            }
            await addKanjiCards("./level-1/kanji.json");
        }
        if (level2Kanji.checked) {
            setSelected = true;
            if (onReadings.checked) {
                typeSelected = true;
            }
            if (kunVocab.checked) {
                typeSelected = true;
            }
            if (onVocab) {
                typeSelected = true;
            }
            await addKanjiCards("./level-2/kanji.json");
        }

        if (!setSelected) {
            const selectionRequired = document.createElement("div");
            document.querySelector(".set-selection").appendChild(selectionRequired);
            selectionRequired.textContent = "Make a selection"
        }
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