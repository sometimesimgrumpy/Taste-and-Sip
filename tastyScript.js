const fetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': 'fef51a61f7mshf38ff76f58269cdp15072cjsnea9cce855f99'
    }
};

 var index = 0;
 var userInput;


function init() {
    let submit = document.querySelector("#submitButton");
    submit.addEventListener("click", function(event) {
        event.preventDefault();
        let userInputEl = document.querySelector("#ingInput");
        var userInput = userInputEl.value;
        console.log(userInput);
        let data = await getRecipes(userInput);
        console.log(data);
        let organizedData = organizeData(data);
        console.log(organizedData);
        for (let i=0; i < organizedData.length; i++) {
        createElements();
        fillElements(data);
        userInputEl.value="";
        // window.location.href = "Url for search page";
        }
    });

}

async function getRecipes(searchInput) {

    const Url = 'https://tasty.p.rapidapi.com/recipes/list?from=' + index + "&size=5&q=" + searchInput;
    const response = await fetch(Url, fetchOptions);
    const rawData = await response.json();
    return rawData;
}

function organizeData (data) {
    let searchData = [];
    for (let i = 0; i < data.length; i++) {
        
    const name = data[i].name;
    const descr = data[i].description;
    const img = data[i].thumbnail_url;
    const yields = data[i].yields;
    const ingredients = data[i].sections[0].components;
    const time = data[i].total_time_minutes;
    const altTime = data[i].total_time_tier.tier;
    const array = [name, descr, img, yields, ingredients, time, altTime];
    searchData.push(array);
    }
    return searchData;
}

function fillElements(data) {
    // 9 total elements in search result div, so 0-8
    for (let i = 0; i < data.length; i++) {
        let searchResultsEl = document.querySelector("#dataDump").children[0].eq(i);
        let dataArray = data[i];
        for(let j = 0; j < dataArray.length; j++) {
        searchResultsEl.children[4].textContent = dataArray[i];
        searchResultsEl.children[5].textContent = dataArray[i];
        let imgIcon = document.getElementById("");
        imgIcon.setAttribute("href",dataArray[i]);
        searchResultsEl.children[6].textContent = dataArray[i];
        // searchResultsEl.children[].textContent = dataArray[i];
        // searchResultsEl.children[i].textContent = dataArray[i];
        // searchResultsEl.children[i].textContent = dataArray[i];
        }
    }
}

function createElements() {
    let mainDiv = document.createElement("div");
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    let textDiv = document.createElement("div");
    let recipeName = document.createElement("h3");
    let descrip = document.createElement("p");
    let servings = document.createElement("p");
    let buttonDiv = document.createElement("div");
    let saveButton = document.createElement("div");
    let likeIcon = document.createElement("i");
    let searchResultsEl = document.querySelector("#dataDump");

    img.setAttribute("class", "thumbImg");
    likeIcon.setAttribute("class", "fa fa-heart");
    likeIcon.setAttribute("aria-hidden", "true");

    imgDiv.appendChild(img);
    textDiv.appendChild(recipeName);
    textDiv.appendChild(descrip);
    textDiv.appendChild(servings);
    buttonDiv.appendChild(saveButton);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(textDiv);
    mainDiv.appendChild(buttonDiv);
 

    searchResultsEl.appendChild(mainDiv);
}


init();


