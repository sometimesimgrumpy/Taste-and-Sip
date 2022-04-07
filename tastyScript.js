const fetchOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    "X-RapidAPI-Key": "fef51a61f7mshf38ff76f58269cdp15072cjsnea9cce855f99",
  },
};

var submit = document.querySelector("#submitButton");
var index = 0;
var isInitialSearch = true;

function recipeSearch() {
  //   if(isInitialSearch) {
  let userInputEl = document.querySelector("#ingInput");
  var userInput = userInputEl.value;

  getRecipes(userInput);

  // let organizedData = organizeData(data.results);

  // // window.location.href = "Url for search page";
  // fillElements(organizedData);
  // userInputEl.value="";
  // isInitialSearch = false;
  // } else {
  // removeDivs();
  // let userInputEl = document.querySelector("#ingInput");
  // var userInput = userInputEl.value;
  // let data = await getRecipes(userInput);
  // let organizedData = organizeData(data.results);
  // console.log(organizedData);
  // createElements(organizedData.length);
  // // window.location.href = "Url for search page";
  // fillElements(organizedData);
  // userInputEl.value="";
  // }
}

// async function init() {

submit.addEventListener("click", recipeSearch);

// }

function getRecipes(searchInput) {
  const Url =
    "https://tasty.p.rapidapi.com/recipes/list?from=" +
    index +
    "&size=5&q=" +
    searchInput;
  fetch(Url, fetchOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (rawData) {
      organizeData(rawData.results);
    });
}

function organizeData(data) {
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
  // return searchData;
  createElements(searchData.length, data);
}

// function fillElements(data) {
//   console.log(data);
//   // 9 total elements in search result div, so 0-8
//   for (let i = 0; i < data.length; i++) {
//     let dataArray = data[i];
//     // document.querySelector("#recipe"+i).textContent = dataArray[i];
//     // document.querySelector("#descrip"+i).textContent = dataArray.description;
//     // let imgIcon = document.querySelector("#thumbImg"+i)
//     // imgIcon.setAttribute("src", dataArray.thumbnail_url);
//     // document.querySelector("#servings"+i).textContent = dataArray[3];
//   }
// }

function createElements(length, data) {
  for (let i = 0; i < length; i++) {
      console.log(data)
    var dataArray = data[i];
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
    let searchResultsEl = document.querySelector("#dataDump");

    img.setAttribute("class", "thumbImg");
    img.setAttribute("src", dataArray.thumbnail_url)
    likeIcon.setAttribute("class", "fa fa-heart");
    likeIcon.setAttribute("aria-hidden", "true");

    img.setAttribute("id", "thumbImg" + i);
    recipeName.setAttribute("id", "recipe" + i);
    recipeName.textContent = dataArray.name
    descrip.setAttribute("id", "descrip" + i);
    servings.setAttribute("id", "servings" + i);
    descrip.textContent = dataArray.description;

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
  let searchResultsEl = document.querySelector("#dataDump");
  while (searchResultsEl.lastChild) {
    searchResultsEl.removeChild(searchResultsEl.lastChild);
  }
}

// init();
