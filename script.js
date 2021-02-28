function showInput(query) {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const results = data.map(element => "Name: " + element.show.name + "----------" + "Genres: " + element.show.genres + "----------" + "Language: " + element.show.language
            + "----------" + "Runtime: " + element.show.runtime + " minutes");
            giveResults(results);
            document.getElementById("errMsg").innerHTML = "";
        })
        .catch((error) => {
            document.getElementById("errMsg").innerHTML = error;
            giveResults([]);
        });
}

function giveResults(results) {
    const resultsList = document.getElementById("showResults");
    resultsList.innerHTML = "";
    results.forEach(result => {
        const element = document.createElement("li");
        element.innerText = result;
        resultsList.appendChild(element);
    });
}


let timeout = 0;
window.onload = () => {
    const searchData = document.getElementById("searchInput");
    searchData.onkeyup = (event) => {
        clearTimeout(timeout);

        if(searchData.value.trim().length === 0){
            return;
        }
        timeout = setTimeout(() => {
            showInput(searchData.value);
        }, 250);
    };
}
