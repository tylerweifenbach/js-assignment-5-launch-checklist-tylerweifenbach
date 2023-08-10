// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");

    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
    if (testInput === '') {
     return "Empty";
    } else if (isNaN(testInput)) {
     return "Not a Number";
    } else {
     return "Is a Number";
    }
 }

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    //DOM elements
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');

    //Check either all valid input enter or not
    if (validateInput(pilot) === "Empty"|| validateInput(copilot) === "Empty"|| validateInput(fuelLevel) === "Empty"||validateInput(cargoLevel) === "Empty") {
        window.alert("All fields are required");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number"){
        window.alert("Make sure to enter valid information for each field!");
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
    }

    //check fuel levels and faulty items
    if (fuelLevel < 10000){
        fuelStatus.innerHTML =  "Fuel level too low for launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";
    } else if (fuelLevel >= 10000 && cargoLevel > 10000){
        fuelStatus.innerHTML =  "Fuel level high enough for launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";
        cargoStatus.innerHTML =  "Cargo mass too heavy for launch";
    } else if (cargoLevel >= 10000){
        cargoStatus.innerHTML =  "Cargo mass too heavy for launch";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "#C7254E";
    } else if (cargoLevel < 10000 && fuelLevel >= 10000 ){
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        list.style.visibility = "visible";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "#419F6A";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
     return response.json() //You need to add the URL and return response.json().
        //return response;
        });

    return planetsReturned;
}

//pickPlanet() takes in one argument: a list of planets. Using Math.random(), 
//return one planet from the list with a randomly-selected index.
function pickPlanet(planets) {
    let selectedIndex = Math.floor(Math.random() * planets.length);
    return planets[selectedIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
