const fetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': 'fef51a61f7mshf38ff76f58269cdp15072cjsnea9cce855f99'
    }
};

 var index = 0;
 var userInput;


async function init() {
    let submit = document.querySelector("#submitButton");
    submit.addEventListener("click", async function(event) {
        event.preventDefault();
        let userInputEl = document.querySelector("#ingInput");
        var userInput = userInputEl.value;
        let data = await getRecipes(userInput);
        let organizedData = organizeData(data.results);
        createElements(organizedData.length);
        // window.location.href = "Url for search page";
        fillElements(organizedData);
        userInputEl.value="";
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
    let altTime;
    if (data[i].total_time_tier?.display_tier !== null) {
        altTime = data[i].total_time_tier?.display_tier;
    } else {
        altTime = "";
    }
    const array = [name, descr, img, yields, ingredients, time, altTime];
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
    let saveButton = document.createElement("div");
    let likeIcon = document.createElement("i");
    let searchResultsEl = document.querySelector("#dataDump");

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
    buttonDiv.appendChild(saveButton);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(textDiv);
    mainDiv.appendChild(buttonDiv);

    searchResultsEl.appendChild(mainDiv);
    }
}


init();


