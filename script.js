
var requestUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

var responseText = document.getElementById("drinkName");

console.log(drinkBtn(requestUrl))

Object.onclick = function(){drinkBtn};

function drinkBtn(requestUrl) {
    fetch(requestUrl)
    .then(function (response) {
        if (response.status === 200) {
            responseText.textContent = response.status;
        }
        return response.json()
    })
    .then(function (response){
        console.log(response);
    })
}

function displayCocktail(data) {
    const drink = data.drinks[0];
    const drink_div = document.getElementById("drinkName");

    const drink_name = drink.strDrink;
    const heading = document.createElement("h1");
    heading.innerHTML = drink_name;
    drink_div.appendChild(heading);

    const drink_img = document.createElement("img");
    drink_img.src = drink.strDrinkThumb;
    drink_div.appendChild(drink_img);
    document.body.style.backgroundImage = "url('" + drink.strDrinkThumb + "')";

    // drink_info for cocktail ingredients

}

// drinkBtn(requestUrl);

// buttonElement.addEventListener('click', function (event) {
//    funcOutput.textContent = 'Element clicked through function!';

// const drink_name = document.getElementById("drinkName");
// const drink_info = document.getElementById("drinkInfo");