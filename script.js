
var requestUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

var responseText = document.getElementById("response-text");

console.log(drinkBtn(requestUrl))

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

// drinkBtn(requestUrl);

// buttonElement.addEventListener('click', function (event) {
//    funcOutput.textContent = 'Element clicked through function!';