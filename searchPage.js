var submit = document.getElementById("searchButton");
console.log(submit);

function handleSearchButtonEvent(event) {
    event.preventDefault();
    let userInputEl = document.querySelector("#searchInput");
    var userInput = userInputEl.value;
    var urlString = "./search-results.html?q=" + userInput;
    userInputEl.textContent = "";
    location.assign(urlString);

    // let errorparaEl = document.createElement("h3");
    // if (userInputEl = ""){
    //     errorparaEl.textContent = "Please Input food items to search"
    // }

    // let data = await getRecipes(userInput);
    // let organizedData = organizeData(data.results);
    // console.log(organizedData);
    // createElements(organizedData.length);
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
}

submit.addEventListener("click", handleSearchButtonEvent);

