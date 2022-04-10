function createandFillElements() {

    let currentRecipe = JSON.parse(window.localStorage.getItem("currentRecipe"));

    document.title = currentRecipe[0];
    let recipeTitleH1 = document.querySelector("#title");
    let recipeTitleEl = document.querySelector("#recipeTitle");
    let recipeDiv = document.querySelector(".Food");

    let ingredients = currentRecipe[4];
    let instructions = currentRecipe[7];
    let buttonDiv = document.createElement("div");
    let saveButton = document.createElement("button");
    let likeIcon = document.createElement("i");
    let mainFoodImg = document.createElement("img");
    let mainFoodImgDiv = document.createElement("div");
    let recipeDescrip = document.createElement("p");
    let recipeTime = document.createElement("h3");
    let recipeServings = document.createElement("h4");
    let ingredientTitle = document.createElement("h3");
    let ingredientList = document.createElement("ul");
    let instructionTitle = document.createElement("h3");
    let instructionList = document.createElement("ol");  
    

    mainFoodImgDiv.setAttribute("id", "mainFoodImg");
    mainFoodImg.setAttribute("src", currentRecipe[2]);
    likeIcon.setAttribute("class", "fa fa-heart");
    likeIcon.setAttribute("aria-hidden", "true");
    buttonDiv.setAttribute("id", "likeButton");

    recipeTitleH1.textContent = currentRecipe[0];
    recipeDescrip.textContent = currentRecipe[1];
    recipeServings.textContent = currentRecipe[3];
    ingredientTitle.textContent = "Ingredients: ";
    instructionTitle.textContent = "Cooking Instructions: ";

    if (currentRecipe[6] === null && currentRecipe[5] === null) {
        recipeTime.textContent = "This recipe does not have a estimated cooking time.... so, plan for all day(:";
    } else if (currentRecipe[5] === null ) {
        recipeTime.textContent = "This recipe can be made in " + currentRecipe[6].toLowerCase;
    } else {
    recipeTime.textContent = "Cooking this recipe will take " + currentRecipe[5] + " minutes";
    }

    for(let i=0; i < ingredients.length; i++) {
        let listItem = document.createElement("li");
        listItem.textContent = ingredients[i].ingredient.name;
        ingredientList.appendChild(listItem)
    }

    for(let i=0; i < instructions.length; i++) {
       let listItem = document.createElement("li");
        listItem.textContent = instructions[i].display_text;
        instructionList.appendChild(listItem)
    }

    saveButton.appendChild(likeIcon);
    buttonDiv.appendChild(saveButton);
    recipeTitleEl.appendChild(buttonDiv);
    mainFoodImgDiv.appendChild(mainFoodImg);
    recipeDiv.appendChild(mainFoodImgDiv),
    recipeDiv.appendChild(recipeDescrip);
    recipeDiv.appendChild(recipeTime);
    recipeDiv.appendChild(recipeServings);
    recipeDiv.appendChild(ingredientTitle);
    recipeDiv.appendChild(ingredientList);
    recipeDiv.appendChild(instructionTitle);
    recipeDiv.appendChild(instructionList);
}

function saveRecipe() {
    let currentRecipe = JSON.parse(window.localStorage.getItem("currentRecipe"));
    let savedRecipes = JSON.parse(window.localStorage.getItem("savedRecipes"));
    if (savedRecipes === null) {
        savedRecipes = [];
    }

    let likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", function(event) {
        event.preventDefault();
        let currentSavedRecipe = [currentRecipe[0], currentRecipe];
        if (savedRecipes.length > 0){
            for (let i=0; i <savedRecipes.length; i++) {
                if (savedRecipes[i] == currentSavedRecipe) {
                    return;
                } else {
                    savedRecipes.push(currentSavedRecipe);
                    console.log(savedRecipes);
                }
            }
    } else {
    savedRecipes.push(currentSavedRecipe);
    console.log(savedRecipes);
    }
        window.localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    });
}


createandFillElements();
saveRecipe();