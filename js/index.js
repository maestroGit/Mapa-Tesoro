// Diferentes formas de obtener el ancho en pixels
let width = window.innerWidth;
console.log("screen view: ",screen.width);
let widthClientInner = window.innerWidth;
console.log("innerWidth: ",widthClientInner);
let widthClientOuter = window.outerWidth;
console.log("outerWidth: ",widthClientOuter);
let height = 500;
// Elementos del DOM
const map = document.getElementById("map");
const message = document.getElementById("message");
const distmsg = document.getElementById("distance");
const intentmsg = document.getElementById("intentos");
const closeBtn = document.getElementById("closedBtn");

// Variables
let intentos = 1;
let numgame = window.localStorage.length;
let game = 0;
let mousecoords = true;

// Create objecte (tabla de hash) treasurePoint width random values
const treasurePoint = {
  Xcoord: numRandom(width),
  Ycoord: numRandom(height),
};
console.log(
  `Coordenadas del tesoro:${treasurePoint.Xcoord}:${treasurePoint.Ycoord}`
);

// Usser events
// clicked on map
map.addEventListener("click", detectClickPosition);
// mousemove on map
map.addEventListener("mousemove", showCoords);

// Closed modal
closeBtn.addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
});

// Geolocation
// navigator.geolocation.getCurrentPosition(success, error);
