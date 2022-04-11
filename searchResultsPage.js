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

async function init() {
        if(isInitialSearch) {

        let data = await getRecipes(searchInput[1]);
        let organizedData = organizeData(data.results);
        createElements(organizedData.length);

        fillElements(organizedData);
        saveSearchDataPullSavedRecipes(organizedData)
        isInitialSearch = false;
        } else {
        removeDivs();
        let userInputEl = document.querySelector("#ingInput");
        var userInput = userInputEl.value;
        let data = await getRecipes(userInput);
        let organizedData = organizeData(data.results);

        createElements(organizedData.length);

        fillElements(organizedData);
        userInputEl.value="";
        saveSearchDataPullSavedRecipes(organizedData)
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

    let searchResultsEl = document.querySelector("#search-results");

    mainDiv.setAttribute("id", "result"+i);
    mainDiv.setAttribute("class", "search-resultEl");
    img.setAttribute("class", "thumbImg");


    img.setAttribute("id", "thumbImg"+i);
    recipeName.setAttribute("id", "recipe"+i);
    descrip.setAttribute("id", "descrip"+i);
    servings.setAttribute("id", "servings"+i);

    imgDiv.appendChild(img);
    textDiv.appendChild(recipeName);
    textDiv.appendChild(descrip);
    textDiv.appendChild(servings);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(textDiv);


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

    if(clickTarget.classList.contains("search-resultEl")) {
        let resultId = clickTarget.id.split("t");

        let resultIndex = resultId[1];

        window.localStorage.setItem("currentRecipe", JSON.stringify(data[resultIndex]));

        location.assign("./Recipe-Page-Html.html");
    }
});
}

function saveSearchDataPullSavedRecipes(data) {
window.localStorage.setItem("currentSearchData", JSON.stringify(data));
let savedRecipes = JSON.parse(window.localStorage.getItem("savedRecipes"));
if (savedRecipes == null) {
    savedRecipes = "Your Recipe Box is empty! Heart your favorite recipes to add them!"
}
let recipeDropdown = document.querySelector("#recipeBox");
for (let i=0; i <savedRecipes.length; i++) {
    let savedItem = document.createElement("a");
    let currentRecipe = savedRecipes[i];
    savedItem.textContent = currentRecipe[0].substring(0, 50) + "...";
    console.log(currentRecipe[0].substring(0,50) + "...");
    savedItem.setAttribute("href", "#");
    savedItem.setAttribute("class", "dropdown-item");
    savedItem.setAttribute("id", "savedItem" + i);
    recipeDropdown.appendChild(savedItem);
}

}

function navigateToSavedRecipe () {
    document.querySelector("#recipeBox").addEventListener("click", function (event) {
        let clickTarget = event.target;
        if(clickTarget.classList.contains("dropdown-item")) {
            let savedRecipes = JSON.parse(window.localStorage.getItem("savedRecipes"));
            let resultId = clickTarget.id.split("m");
    
            let resultIndex = resultId[1];
            let goToRecipe = savedRecipes[resultIndex];
            window.localStorage.setItem("currentRecipe", JSON.stringify(goToRecipe[1]));
            console.log(goToRecipe[1]);
            location.assign("./Recipe-Page-Html.html");
        }
    });
}



init();
navigateToSavedRecipe();


