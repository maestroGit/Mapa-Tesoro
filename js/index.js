// Con screen.width obtenemos el ancho en pixels de la resolución de pantalla
let width = screen.width;
let height = 500;
const map = document.getElementById("map");
const message = document.getElementById("message");
const distmsg = document.getElementById("distance");
const intentmsg = document.getElementById("intentos");
let intentos = 1;
let date = window.localStorage.length;
let game = 0;

// Create random treasure
const treasurePoint = {
  Xcoord: numRandom(width),
  Ycoord: numRandom(height),
};
console.log(`Coordenadas del tesoro:${treasurePoint.Xcoord}:${treasurePoint.Ycoord}`);

// Usser events
// clicked on map
map.addEventListener("click", detectClickPosition);
// mousemove on map
map.addEventListener ('mousemove', showCoords);

// Closed modal
const closeBtn = document.getElementById('closedBtn');
closedBtn.addEventListener ('click',function(){
  const modal = document.getElementById('modal');
  modal.style.visibility="hidden";
})




