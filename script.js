
var requestUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

var responseText = document.getElementById("drinkName");

// console.log(drinkBtn(requestUrl))

function drinkBtn(requestUrl) {
    var data
    fetch(requestUrl)
    .then(function (response) {
        if (response.status === 200) {
            responseText.textContent;
            console.log(response.status);
        }
        return response.json()
    })
    .then(function (response){
        console.log(response);
        data = response;
        displayCocktail(data);
    })
}

function displayCocktail(data) {
    const drink = data;
    const drink_div = document.getElementById("drinkName");

    const drink_name = drink.drinks[0].strDrink; 
    console.log(drink_name);

    drink_div.innerHTML = "";
    drink_div.append(drink_name);

    // const heading = document.createElement("h1");
    
    // const drink_btn_result = document.getElementById("drinkBtnResult");
    // heading.innerHTML = drink_btn_result;
    // drink_btn_result.appendChild(heading);

    // const drink_img = document.createElement("img");
    // drink_img.src = drink.strDrinkThumb;
    // drink_div.appendChild(drink_img);
    // document.body.style.backgroundImage = "url('" + drink.strDrinkThumb + "')";

    // drink_info for cocktail ingredients into <h2>

}

// drinkBtn(requestUrl);

// buttonElement.addEventListener('click', function (event) {
//    funcOutput.textContent = 'Element clicked through function!';

// const drink_name = document.getElementById("drinkName");
// const drink_info = document.getElementById("drinkInfo");