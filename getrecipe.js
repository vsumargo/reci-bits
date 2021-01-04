let appID = 'de24e9f5';
let appKEY = '808b4ecac7df60930d1456576a2afadc';
let ingredients = "";
const spoonacularAPI = "59b7c5b4387043649860e827d13b1445"

function getIngredientsList(){
    let ingredientsList = $('.ingredient-list');
    console.log(ingredientsList);
    let ingredientsArray = [];
    if(ingredientsList.length == 0){
        alert("please enter at least one ingredient")
    }else{
        for(let j = 0; j < ingredientsList.length; j++){
        let text = ingredientsList[j].childNodes[0].data;
        ingredientsArray.push(text);
        }
        ingredients = ingredientsArray.join();
    }   
}

function getURL(recipeObj){
    return recipeObj.url
}

//TODO: Function creating the Modal HTML components dynamically with jQuery
function populateModal(recipeObj){
    let modal = $("#recipe-modal-header")
    modal.text("");
    //TODO: Standard elements of Modal containing the following
    //Header div
    let headerDiv = $("<div>");
    
    //Recipe Name header
    let nameHeader = $("<h4>")
    nameHeader.text(recipeObj.label);
    
    //cautions listed in subscript
    let cautionsSub = $("<span>")
    cautionsSub.addClass("subscript")
    if (recipeObj.cautions.length === 0){
    }
    else {
        let cautions = ""
        for(let i = 0; i < recipeObj.cautions.length ; i ++){
            cautions = cautions + " " + recipeObj.cautions[i];
        }
        cautionsSub.text("Warning this may contain" + cautions);
    }
    headerDiv.append(nameHeader)
    headerDiv.append(cautionsSub);
    
    //About/Nutitional Info toggle
    let toggleDiv =  $("<div>");
    let aboutDiv = $("<div>");
    let nutInfoDiv = $("<div>"); 

    //Add text
    aboutDiv.text("About")
    nutInfoDiv.text("Nutritional Info")

    //Add classes
    toggleDiv.addClass("toggle-recipe row")
    aboutDiv.addClass("about-recipe col s3 offset-s3")
    nutInfoDiv.addClass("nutInfo-recipe col s3")

    //Append to toggle div
    toggleDiv.append(aboutDiv);
    toggleDiv.append(nutInfoDiv);

    //Append elements to the modal 
    modal.append(nameHeader);
    modal.append(toggleDiv);
    
}

function populateAbout(recipeObj){
    let modal = $("#recipe-modal-content")
    modal.text("");
    //TODO: About modal containing the following
    //Div to store info 2 cols 
    let row = $("<div>");
    row.addClass("row")
    //Photo
    let imageDiv = $("<img>");
    imageDiv.addClass("recipe-image col s6")
    imageDiv.attr("src", recipeObj.image)
    
    //div for the below
    let infoDiv = $("<div>");
    infoDiv.addClass("info-div-parent col s6")
    //Serves 
    let servesDiv = $("<div>");
    servesDiv.addClass("info-div");
    servesDiv.text("Serves: " + recipeObj.yield);

    //Cooking Time
    let cookingTimeDiv = $("<div>");
    cookingTimeDiv.addClass("info-div");
    cookingTimeDiv.text("Cooking Time: " + recipeObj.totalTime + " minutes");

    //Ingredient List 
    let ingredientsDiv = $("<ul>");
    ingredientsDiv.addClass("info-div");
    let item;
    for (let i = 0 ; i < recipeObj.ingredientLines.length ; i ++) {
        item = $("<li>");
        item.text(recipeObj.ingredientLines[i]);
        ingredientsDiv.append(item);
    }

    //Link to recipe method
    let recipeURL = $("<a>");
    recipeURL.addClass("info-div");

    recipeURL.attr("href",  recipeObj.url)
    recipeURL.text("Link to recipe:")

    //Append all of the above
    infoDiv.append(servesDiv);
    infoDiv.append(cookingTimeDiv);
    infoDiv.append(ingredientsDiv);
    infoDiv.append(recipeURL);
    row.append(imageDiv)
    row.append(infoDiv);
    modal.append(row);
}

function populateMethod(recipeObj) {
    let modal = $("#recipe-modal-content")

    let methodDiv = $("<div>");
    let methodPara = $("<p>");
    methodPara.text(recipeObj.instructions)
    
    methodDiv.append(methodPara)
    modal.append(methodDiv);


}

function populateNutInfo(recipeObj){
    let modal = $("#recipe-modal-content")
    modal.text("");
    //TODO: Nutritional info modal containing the following (Total, per serve and % daily)
    //Creating the table header items
    let tableDiv = $("<table>");
    let tableHeader = $("<thead>");
    let tableHrow = $("<tr>");
    //Header for the column names
    let typeHeader = $("<th>");
    typeHeader.text("Type");

    let totalNutrients = $("<th>");
    totalNutrients.text("Total Nutrients")

    let perServe = $("<th>");
    perServe.text("Nutrients Per Serve")

    let percentIntake = $("<th>");
    percentIntake.text("Daily Percentage")

    tableHrow.append(typeHeader);
    tableHrow.append(totalNutrients);
    tableHrow.append(perServe);
    tableHrow.append(percentIntake);

    tableHeader.append(tableHrow);
    tableDiv.append(tableHeader);

    //Creating the table body items
    let tableBody = $("<tbody>");
    
    //Energy
    let energyRow = $("<tr>");

    let energy = $("<td>");
    energy.text("Energy:")

    let energyTN = $("<td>");
    energyTN.text(Math.round(recipeObj.totalNutrients.ENERC_KCAL.quantity) + " " + recipeObj.totalNutrients.ENERC_KCAL.unit)

    let energyPS = $("<td>");
    let energyPSval = Math.round(recipeObj.totalNutrients.ENERC_KCAL.quantity/recipeObj.yield);
    energyPS.text(energyPSval + " " + recipeObj.totalNutrients.ENERC_KCAL.unit);

    let energyDP = $("<td>");
    let energyDPval = Math.round(recipeObj.totalDaily.ENERC_KCAL.quantity)
    energyDP.text(energyDPval + " " + recipeObj.totalDaily.ENERC_KCAL.unit);

    energyRow.append(energy);
    energyRow.append(energyTN);
    energyRow.append(energyPS);
    energyRow.append(energyDP);
    
    //Protein
    let proteinRow = $("<tr>");

    let protein = $("<td>");
    protein.text("Protein:")

    let proteinTN = $("<td>");
    proteinTN.text(Math.round(recipeObj.totalNutrients.PROCNT.quantity) + " " + recipeObj.totalNutrients.PROCNT.unit)

    let proteinPS = $("<td>");
    let proteinPSval = Math.round(recipeObj.totalNutrients.PROCNT.quantity/recipeObj.yield);
    proteinPS.text(proteinPSval + " " + recipeObj.totalNutrients.PROCNT.unit);

    let proteinDP = $("<td>");
    let proteinDPval = Math.round(recipeObj.totalDaily.PROCNT.quantity)
    proteinDP.text(proteinDPval + " " + recipeObj.totalDaily.PROCNT.unit);

    proteinRow.append(protein);
    proteinRow.append(proteinTN);
    proteinRow.append(proteinPS);
    proteinRow.append(proteinDP);

    //Fat (total and saturated)
    let fatRow = $("<tr>");

    let fat = $("<td>");
    fat.text("fat:")

    let fatTN = $("<td>");
    fatTN.text(Math.round(recipeObj.totalNutrients.FAT.quantity) + " " + recipeObj.totalNutrients.FAT.unit)

    let fatPS = $("<td>");
    let fatPSval = Math.round(recipeObj.totalNutrients.FAT.quantity/recipeObj.yield) ;
    fatPS.text(fatPSval + " " + recipeObj.totalNutrients.FAT.unit);

    let fatDP = $("<td>");
    let fatDPval = Math.round(recipeObj.totalDaily.FAT.quantity)
    fatDP.text(fatDPval + " " + recipeObj.totalDaily.FAT.unit);

    fatRow.append(fat);
    fatRow.append(fatTN);
    fatRow.append(fatPS);
    fatRow.append(fatDP);
    
    //Carbs 
    let carbsRow = $("<tr>");

    let carbs = $("<td>");
    carbs.text("carbs:")

    let carbsTN = $("<td>");
    carbsTN.text(Math.round(recipeObj.totalNutrients.CHOCDF.quantity) + " " + recipeObj.totalNutrients.CHOCDF.unit)

    let carbsPS = $("<td>");
    let carbsPSval = Math.round(recipeObj.totalNutrients.CHOCDF.quantity/recipeObj.yield);
    carbsPS.text(carbsPSval + " " + recipeObj.totalNutrients.CHOCDF.unit);

    let carbsDP = $("<td>");
    let carbsDPval = Math.round(recipeObj.totalDaily.CHOCDF.quantity)
    carbsDP.text(carbsDPval + " " + recipeObj.totalDaily.CHOCDF.unit);

    carbsRow.append(carbs);
    carbsRow.append(carbsTN);
    carbsRow.append(carbsPS);
    carbsRow.append(carbsDP);
    
    // Sugars
    let sugarRow = $("<tr>");

    let sugar = $("<td>");
    sugar.text("sugar:")

    let sugarTN = $("<td>");
    sugarTN.text(Math.round(recipeObj.totalNutrients.SUGAR.quantity) + " " + recipeObj.totalNutrients.SUGAR.unit)

    let sugarPS = $("<td>");
    let sugarPSval = Math.round(recipeObj.totalNutrients.SUGAR.quantity/recipeObj.yield);
    sugarPS.text(sugarPSval + " " + recipeObj.totalNutrients.SUGAR.unit);

    let sugarDP = $("<td>");
    let sugarDPval = 0
    sugarDP.text(sugarDPval);

    sugarRow.append(sugar);
    sugarRow.append(sugarTN);
    sugarRow.append(sugarPS);
    sugarRow.append(sugarDP);
    
    //Fibre 
    let fibreRow = $("<tr>");

    let fibre = $("<td>");
    fibre.text("fibre:")

    let fibreTN = $("<td>");
    fibreTN.text(Math.round(recipeObj.totalNutrients.FIBTG.quantity) + " " + recipeObj.totalNutrients.FIBTG.unit)

    let fibrePS = $("<td>");
    let fibrePSval = Math.round(recipeObj.totalNutrients.FIBTG.quantity/recipeObj.yield);
    fibrePS.text(fibrePSval + " " + recipeObj.totalNutrients.FIBTG.unit);

    let fibreDP = $("<td>");
    let fibreDPval = Math.round(recipeObj.totalDaily.FIBTG.quantity)
    fibreDP.text(fibreDPval + " " + recipeObj.totalDaily.FIBTG.unit);

    fibreRow.append(fibre);
    fibreRow.append(fibreTN);
    fibreRow.append(fibrePS);
    fibreRow.append(fibreDP);
    
    //Salt/Sodium
    let saltRow = $("<tr>");

    let salt = $("<td>");
    salt.text("salt:")

    let saltTN = $("<td>");
    saltTN.text(Math.round(recipeObj.totalNutrients.NA.quantity) + " " + recipeObj.totalNutrients.NA.unit)

    let saltPS = $("<td>");
    let saltPSval = Math.round(recipeObj.totalNutrients.NA.quantity/recipeObj.yield);
    saltPS.text(saltPSval + " " + recipeObj.totalNutrients.NA.unit);

    let saltDP = $("<td>");
    let saltDPval = Math.round(recipeObj.totalDaily.NA.quantity)
    saltDP.text(saltDPval + " " + recipeObj.totalDaily.NA.unit);

    saltRow.append(salt);
    saltRow.append(saltTN);
    saltRow.append(saltPS);
    saltRow.append(saltDP);

    //append rows to table body 
    tableBody.append(energyRow);
    tableBody.append(proteinRow);
    tableBody.append(fatRow);
    tableBody.append(carbsRow);
    tableBody.append(sugarRow);
    tableBody.append(fibreRow);
    tableBody.append(saltRow);

    tableDiv.append(tableBody);
    modal.append(tableDiv);
}



function searchRecipes (){
    getIngredientsList();
    let getRecipesURL = `https://api.edamam.com/search?q=${ingredients}&app_id=${appID}&app_key=${appKEY}&to=12`
    $.ajax({
        url : getRecipesURL,
        method : "GET"
    }).then(function(response){
        console.log(response);
        for(let i = 0; i < response.hits.length; i++){
            // console.log(response.hits[i].recipe);
            // console.log(response.hits[i].recipe.label);
            // console.log(response.hits[i].recipe.image);
            // console.log(response.hits[i].recipe.shareAs);
            // console.log(response.hits[i].recipe.totalTime);
            let recipesList = $('#recipes-list');
            let divOne      = $('<div>').attr({'class':'col s12 m6 l4 xl3 recipesCol', });
                recipesList.append(divOne)
            let divTwo      = ($('<div>').attr({'class':'card small modal-trigger recipesCard','href':'#modal1','data-url': `${response.hits[i].recipe.url}`, 'index': i}));
                divOne.append(divTwo);
            let divThree    = ($('<div>').attr({'class':'card-image'}));
                divTwo.append(divThree);
            let divFour     = ($('<div>').attr({'class':'card-content'}));
                divTwo.append(divFour);
            let imgElement  = ($('<img>').attr({'src': `${response.hits[i].recipe.image}`}));
                divThree.append(imgElement)
            let spanElement = divFour.append($('<span>').attr({'class':'card-title', 'id':'card-title'}).text(`${response.hits[i].recipe.label}`));
            // let pElement    = divFour.append($('<p>').attr({'class':'card-text'}).text(`Total Time: ${response.hits[i].recipe.totalTime}`));          
        }
    
        $(`.card.small`).on('click',function(event){
            // event.preventDefault();
            // console.log("Event: " + event);
            // console.log("Event Current: " + event.currentTarget);
            // console.log($(event.currentTarget).attr('index'));
            // console.log($(event.currentTarget).attr('data-url'));
            let index = $(event.currentTarget).attr('index');
        
            console.log(index)
        
            populateModal(response.hits[index].recipe)
            populateAbout(response.hits[index].recipe)
            
            let recipeURL = "https://api.spoonacular.com/recipes/extract?apiKey=" + spoonacularAPI + "&url=" + getURL(response.hits[index].recipe);
            
            $(".about-recipe").on("click", function(){
                populateAbout(response.hits[index].recipe);
        
            });
        
            $(".nutInfo-recipe").on("click", function(){
                populateNutInfo(response.hits[index].recipe);
            
            
        
            });
            //AJAX call to the spoonacular API...
            $.ajax({
                url: recipeURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                populateMethod(response);

                $(".about-recipe").on("click", function(){
                    populateMethod(response);
            
                });

            // $('.modal').modal() //this function will open the modal when click

            }).catch(function(error) { 
                console.log(error)
            });


            $('#modal1').modal() //this function will open the modal when click
        })
    }).catch(function(error){
        console.log(error);
    });
}

function addIngredient(){
    let ul = $('#list-of-ingredients');
    let theItems = $('#textarea1').val();
    let newDiv = $('<div>').attr('class','ingredient-list');
    let removeButton = $('<button>').attr('class','remove-ingredient-button').text('x');
    
    newDiv.text(theItems);
    newDiv.append(removeButton);
    ul.append(newDiv);
    $('.remove-ingredient-button').on('click',function(event){
        event.preventDefault();
        // console.log(event);
        $(event.target).parent().remove();
    })
}

$('#btnadd').on('click',function(event){
    event.preventDefault();
    console.log(event);
    if($('#textarea1').val()===""){
        alert('enter an ingredient');
    }else{
        addIngredient();
        $('#textarea1').val("");
    }
})

$('#get-recipe-button').on('click', function(event){
    event.preventDefault();
    console.log(event);
    console.log($('div[class=card-image]'));
    if($('div[class=card-image]').length !== 0){
        $('img').remove();
        $('.card-title').remove()
        $('.card-content').remove();
        $('.card-image').remove();
        $('.recipesCard').remove();
        $('.recipesCol').remove();
        searchRecipes();
    }else{
        searchRecipes();
    }
})


// function to open modal when "About Reci-Bits" button on nav bar is clicked
$('#about-modal').modal()






