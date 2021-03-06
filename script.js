
var requestUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

var responseText = document.getElementById("drinkName");

function drinkBtn(requestUrl) {
    var data
    fetch(requestUrl)
    .then(function (response) {
        if (response.status === 200) {
            // responseText.textContent;
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
    const drink = data.drinks[0];
    const drink_div = document.querySelector(".drink");
    const drink_name = drink.strDrink;

    drink_div.innerHTML = "";
    drink_div.append(drink_name);

    // pulls and displays image of cocktail
    const drink_img = document.createElement("img");
    drink_img.src = drink.strDrinkThumb;
    drink_div.appendChild(drink_img);

    // pulls and displays instructions to make cocktail
    const drink_instr = document.createElement("p");
    drink_instr.textContent = drink.strInstructions;
    drink_div.appendChild(drink_instr);

    //adding ingredients to the page
    const drink_ingr_list = document.createElement("ul");
    drink_div.appendChild(drink_ingr_list);

    const getIngredients = Object.keys(drink)
    .filter(function (ingredient) {
        return ingredient.indexOf("strIngredient") == 0;
    })
    .reduce(function (ingredients, ingredient) {
        if (drink[ingredient] != null) {
            ingredients[ingredient] = drink[ingredient];
        }
        return ingredients;
    },{});

    for (let key in getIngredients) {
        let value = getIngredients[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        drink_ingr_list.appendChild(listItem);
    }
}