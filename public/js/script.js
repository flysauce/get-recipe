function getRecipe() {

    let ingredient = document.getElementById('ingredient').value
    if (ingredient === '') {
        return alert('Please enter an ingredient')
    }

    let recipeDiv = document.getElementById('recipes')
    recipeDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            recipeDiv.innerHTML = recipeDiv.innerHTML + `
            <h1>Recipes for ${response.query, ingredient} </h1>`

            //console.log(response.recipes.length)
            for (i in response.recipes) {
                recipeDiv.innerHTML +=
                `<div id="food">
                    <a href=${response.recipes[i].f2f_url} target="_blank">
                        <h3>${response.recipes[i].title}</h3>
                        <img src=${response.recipes[i].image_url} width="400" height = "300">
                    </a>
                </div>`
            }

        }
    }
    xhr.open('GET', `/recipes?ingredient=${ingredient}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER = 13
document.getElementById("ingredient")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === ENTER) {
            document.getElementById("submit").click();
        }
    });