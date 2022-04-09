
var requestUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

var responseText = document.getElementById("drinkName");

function drinkBtn(requestUrl) {
    var data
    fetch(requestUrl)
    .then(function (response) {
        if (response.status === 200) {
            responseText.textContent;
        }
        return response.json()
    })
    .then(function (response){
        data = response;
        displayCocktail(data);
        console.log(data)
    })
}

function displayCocktail(data) {
    // pulls and displays drink name
    const drink = data;
    const drink_div = document.getElementById("drinkName");
    const drink_name = drink.drinks[0].strDrink;

    drink_div.innerHTML = "";
    drink_div.append(drink_name);

    // pulls and displays image of cocktail
    const drink_img = document.createElement("img");
    drink_img.src = drink.drinks[0].strDrinkThumb;
    drink_div.appendChild(drink_img);

    // pulls and displays instructions to make cocktail
    const drink_instr = document.createElement("p");
    drink_instr.textContent = drink.drinks[0].strInstructions;
    drink_div.appendChild(drink_instr);
}