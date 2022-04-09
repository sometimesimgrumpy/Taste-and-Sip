var submit = document.getElementById("searchButton");

// function to handle when user input ingredients to search. Takes input values, assigns them as parameters into the URL, empties the input block and redirects the page to the search-results.html with parameters
function handleSearchButtonEvent(event) {
    event.preventDefault();
    let userInputEl = document.querySelector("#searchInput");
    var userInput = userInputEl.value;
    let errorparaEl = document.createElement("h3");
    userInputEl.appendChild(errorparaEl);
    errorparaEl.visible = false;

    if (userInput === "") {
        errorparaEl.textContent = "Please Input food items to search";
        errorparaEl.visible = true;
        return;
    }
    var urlString = "./search-results.html?q=" + userInput;
    userInputEl.textContent = "";
    location.assign(urlString);
    


}

submit.addEventListener("click", handleSearchButtonEvent);

