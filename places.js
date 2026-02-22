async function populate() {
    const file = "./places.json";
    const request = new Request(file);
    const response = await fetch(request);
    const places = await response.json();

    const cityHeader = document.createElement("h2");
    const cityEntries = document.createElement("div");

    cityHeader.setAttribute("class", "place-header");
    cityEntries.setAttribute("class", "place-entries");

    center.appendChild(cityHeader);
    center.appendChild(cityEntries);
    cityHeader.textContent = "Major Japanese Cities"

    for (city of places.cities) addPlaceData(city, cityEntries);

    if (places.islands.length > 0) {
        const islandHeader = document.createElement("h2");
        const islandEntries = document.createElement("div");

        islandHeader.setAttribute("class", "place-header");
        islandEntries.setAttribute("class", "place-entries");

        center.appendChild(islandHeader);
        center.appendChild(islandEntries);
        islandHeader.textContent = "Major Japanese Islands"

        for (island of places.islands) addPlaceData(island, islandEntries);
    }

    if (places.seas.length > 0) {
        const seaHeader = document.createElement("h2");
        const seaEntries = document.createElement("div");

        seaHeader.setAttribute("class", "place-header");
        seaEntries.setAttribute("class", "place-entries");

        center.appendChild(seaHeader);
        center.appendChild(seaEntries);
        seaHeader.textContent = "Major Japanese Islands"

        for (sea of places.seas) addPlaceData(sea, seaEntries);
    }
}

function addPlaceData(place, placeEntries) {
    const placeEntry = document.createElement("div");
    const name = document.createElement("h3");
    const romaji = document.createElement("p");

    placeEntry.setAttribute("class", "place");

    placeEntries.appendChild(placeEntry);
    placeEntry.appendChild(name);
    placeEntry.appendChild(romaji);

    for (i = 0; i < place.name.length; i++) {
        addRuby(name, place.name[i], place.nameRuby[i]);
    }

    romaji.textContent = place.romaji;
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

populate();