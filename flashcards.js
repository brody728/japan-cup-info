const center = document.querySelector(".center");

const cards = [];

async function addKanjiCards(filePath) {
    const request = new Request(filePath);
    const response = await fetch(request);
    const kanjiList = await response.json();

    for (kanji of kanjiList) {
        for (i = 0; i < kanji.kunVocab.length; i++) {
            const card = {
                front: kanji.kunVocab[i],
                frontRuby: kanji.kunVocabRuby[i],
                back: kanji.kunVocabMeaning[i]
            };

            cards.push(card);
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

populate();