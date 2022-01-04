// Con screen.width obtenemos el ancho en pixels de la resolución de pantalla
let width = screen.width;
let height = 500;
const map = document.getElementById("map");
const message = document.getElementById("message");
const distmsg = document.getElementById("distance");
const intentmsg = document.getElementById("intentos");
let intentos = 0;

// Create random treasure
const treasurePoint = {
  Xcoord: numRandom(width),
  Ycoord: numRandom(height),
};
console.log(`Coordenadas del tesoro:${treasurePoint.Xcoord}:${treasurePoint.Ycoord}`);

// Usser clicked on map
map.addEventListener("click", detectClickPosition);

const position = document.getElementById('map');
position.addEventListener ('mousemove', showCoords);

// Closed modal

const closeBtn = document.getElementById('closedBtn');
closedBtn.addEventListener ('click',function(){
  console.log('event do it');
  const modal = document.getElementById('modal');
  modal.style.visibility="hidden";
})




