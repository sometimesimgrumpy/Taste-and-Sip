const fetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': 'fef51a61f7mshf38ff76f58269cdp15072cjsnea9cce855f99'
    }
};

var index = 0;
var isInitialSearch = true;
var searchUrl = window.location.href;
var searchInput = searchUrl.split("=")
console.log(searchInput);


async function init() {
        if(isInitialSearch) {

        let data = await getRecipes(searchInput[1]);
        let organizedData = organizeData(data.results);
        console.log(organizedData);
        createElements(organizedData.length);

        fillElements(organizedData);

        isInitialSearch = false;
        } else {
        removeDivs();
        let userInputEl = document.querySelector("#ingInput");
        var userInput = userInputEl.value;
        let data = await getRecipes(userInput);
        let organizedData = organizeData(data.results);
        console.log(organizedData);
        createElements(organizedData.length);

        fillElements(organizedData);
        userInputEl.value="";
        }    
}

async function getRecipes(searchInput) {

    const Url = 'https://tasty.p.rapidapi.com/recipes/list?from=' + index + "&size=5&q=" + searchInput;
    const response = await fetch(Url, fetchOptions);
    const rawData = await response.json();
        return rawData;  
}

function organizeData (data) {
    let searchData = [];
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        
    const name = data[i].name;
    const descr = data[i].description;
    const img = data[i].thumbnail_url;
    const yields = data[i].yields;
    const ingredients = data[i].sections[0].components;
    const time = data[i].total_time_minutes;
    const instr = data[i].instructions;
    let altTime;
    if (data[i].total_time_tier?.display_tier !== null) {
        altTime = data[i].total_time_tier?.display_tier;
    } else {
        altTime = "";
    }
    const array = [name, descr, img, yields, ingredients, time, altTime, instr];
    searchData.push(array);
    }
    return searchData;
}

function fillElements(data) {
    // 9 total elements in search result div, so 0-8
    for (let i = 0; i < data.length; i++) {
        let dataArray = data[i];
        document.querySelector("#recipe"+i).textContent = dataArray[0];
        document.querySelector("#descrip"+i).textContent = dataArray[1];
        let imgIcon = document.querySelector("#thumbImg"+i)
        imgIcon.setAttribute("src", dataArray[2]);
        document.querySelector("#servings"+i).textContent = dataArray[3];    
    }
    navigateToRecipePage(data);
}


function createElements(length) {
    for(let i=0; i<length; i++) {
    let mainDiv = document.createElement("div");
    let imgDiv = document.createElement("div");
    let img = document.createElement("img");
    let textDiv = document.createElement("div");
    let recipeName = document.createElement("h3");
    let descrip = document.createElement("p");
    let servings = document.createElement("p");
    let buttonDiv = document.createElement("div");
    let saveButton = document.createElement("button");
    let likeIcon = document.createElement("i");
    let searchResultsEl = document.querySelector("#search-results");

    mainDiv.setAttribute("id", "result"+i);
    mainDiv.setAttribute("class", "search-resultEl");
    img.setAttribute("class", "thumbImg");
    likeIcon.setAttribute("class", "fa fa-heart");
    likeIcon.setAttribute("aria-hidden", "true");

    img.setAttribute("id", "thumbImg"+i);
    recipeName.setAttribute("id", "recipe"+i);
    descrip.setAttribute("id", "descrip"+i);
    servings.setAttribute("id", "servings"+i);

    imgDiv.appendChild(img);
    textDiv.appendChild(recipeName);
    textDiv.appendChild(descrip);
    textDiv.appendChild(servings);
    saveButton.appendChild(likeIcon);
    buttonDiv.appendChild(saveButton);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(textDiv);
    mainDiv.appendChild(buttonDiv);

    searchResultsEl.appendChild(mainDiv);
    }
}

function removeDivs() {
    let searchResultsEl = document.querySelector("#search-results");
    while (searchResultsEl.lastChild) {
        searchResultsEl.removeChild(searchResultsEl.lastChild);
    }
}

function navigateToRecipePage(data) {
document.querySelector("#search-results").addEventListener("click", function (event) {
    let clickTarget = event.target.parentElement.parentElement;
    console.log(data);
    if(clickTarget.classList.contains("search-resultEl")) {
        let resultId = clickTarget.id.split("t");
        console.log(resultId);
        let resultIndex = resultId[1];
        console.log(resultIndex);
        window.localStorage.setItem("currentRecipe", data[resultIndex]);
        console.log(data[resultIndex])
        // location.assign("./Recipe-Page-Html.html");
    }
});
}

function saveSearchDataPullSavedRecipes(data) {
window.localStorage.setItem("currentSearchData", JSON.stringify(data));
let savedRecipes = window.localStorage.getItem("savedRecipes");
if (savedRecipes == null) {
    savedRecipes = "Your Recipe Box is empty! Heart your favorite recipes to add them!"
}

}
init();


