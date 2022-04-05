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
    const name = data[i].name;
    const descr = data[i].description;
    const img = data[i].thumbnail_url;
    const yields = data[i].recipes
    const ingredients = data[i].components;
}
function ()


getRecipes("Chicken, ham, sausage");