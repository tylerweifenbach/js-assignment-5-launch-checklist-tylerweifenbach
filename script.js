// Write your JavaScript code here!

window.addEventListener("load", function() {
    const form = document.querySelector("form");
    let list = document.getElementById('faultyItems');
    form.addEventListener("submit", function(event){
        event.preventDefault();
        //List DOM elements
        //let document = window.document;
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    })

   let listedPlanets;
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       let planet = pickPlanet(listedPlanets);
       let name = planet.name;
       let diameter = planet.diameter;
       let star = planet.star;
       let distance = planet.distance;
       let moons = planet.moons;
       let imageUrl = planet.image;
       
       addDestinationInfo(document,  name,  diameter,  star,  distance,  moons,  imageUrl);
   })
   
});