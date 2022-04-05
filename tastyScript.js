const fetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': 'fef51a61f7mshf38ff76f58269cdp15072cjsnea9cce855f99'
    }
};
 var index = 0;

async function getRecipes(searchInput) {

    const Url = 'https://tasty.p.rapidapi.com/recipes/list?from=' + index + "&size=5&q=" + searchInput;
    const response = await fetch(Url, fetchOptions);
    const rawData = await response.json();
    console.log(rawData);
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

    img.setAttribute("src", "")

    imgDiv.appendChild(img);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(textDiv);
    mainDiv.appendChild(buttonDiv);

}
// function ()


getRecipes("Chicken, ham, sausage");