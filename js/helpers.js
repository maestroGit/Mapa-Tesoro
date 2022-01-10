// Ramdom position
// Returns a random number between min (inclusive) and max (exclusive)
// Math.random() returns a Number between 0 (inclusive) and 1 (exclusive). So we have an interval like this:
// 1 -> Tamaño img
const numRandom = (size) => {
  return Math.floor(Math.random() * size);
};

// Detect click position
const detectClickPosition = (e) => {
  const UserPoint = { Xcoord: e.clientX, Ycoord: e.clientY };
  getDistance(UserPoint);
  intentos++;
  showIntentos(intentos);
};

// Mesure distance between two points
const getDistance = (UserPoint) => {
  let difX = treasurePoint.Xcoord - UserPoint.Xcoord;
  let difY = treasurePoint.Ycoord - UserPoint.Ycoord;
  // Aplicar teorema de pitagoras para hayar distance=hipotenusa catetos=difX y difY
  let result = Math.sqrt(difX * difX + difY * difY);
  getMessage(result);
};
let game = 0;
// Get distance advaice tempeture
const getMessage = (distance) => {
  if (distance < 30) {
    //message.innerHTML = `CONGRATS, you found it in: ${intentos + 1} attemps`;
    foundTresore();
    deleteMessage();
    saveStorage(intentos);
    setInterval(restart,5000);
  } else if (distance < 50) {
    distmsg.innerHTML = Math.floor(distance);
    message.innerHTML = "REALLY HOT";
  } else if (distance < 70) {
    distmsg.innerHTML = Math.floor(distance);
    message.innerHTML = "HOT";
  } else if (distance < 100) {
    distmsg.innerHTML = Math.floor(distance);
    message.innerHTML = "WARM";
  } else if (distance < 200) {
    distmsg.innerHTML = Math.floor(distance);
    message.innerHTML = "COLD";
  } else if (distance > 201) {
    distmsg.innerHTML = Math.floor(distance);
    message.innerHTML = "VERY COLD";
  }
};

const showIntentos = (intentos) => {
  intentmsg.innerHTML = intentos;
};

const deleteMessage = () => {
  intentmsg.parentNode.removeChild(intentmsg);
  let demo = document.getElementById("demo");
  demo.parentNode.removeChild(demo);
  let distance = document.getElementById("distance");
  distance.parentNode.removeChild(distance);
  let intentos = document.getElementById("message");
  intentos.style.width = "50%";
  intentos.style.background = "yellow";
};

const showCoords = (event) => {
  var x = event.clientX;
  var y = event.clientY;
  var coor = x + "/" + y;
  document.getElementById("demo").innerHTML = coor;
};

const foundTresore = ()=>{
  message.innerHTML = `CONGRATS, you found it in: ${intentos + 1} attemps`;
  document.getElementById("map-img").src='./img/chest-treasure.jpg';
}

// Web storage objects localStorage and sessionStorage allow to save key/value pairs in the browser.
// localstore solo almacena strings - para serializar como un json usamos: JSON.stringify
const saveStorage = (intentos) => {
  const date = Date.now();
  //console.log(typeof(date));
  let player = {
    'sesion':date,
    'intentos': intentos
  };
  localStorage.setItem("intentos", intentos);
  localStorage.setItem(date, JSON.stringify(player));
};

const restart = () => {
  location.reload();
};
//Read localStorage Pasar de string a objeto json usamos JSON.parse(localStore.getItem(""));
// const readLocalStorage = (){};
// if exists ... localstorage.getItem("key")
