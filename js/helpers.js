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

const showIntentos = (intentos) => {
  if (intentmsg) {
    intentmsg.innerHTML = intentos;
  }
};

// Copy to clipBoard
const secretClipBoard = () => {
  let texto =
    "Si has llegado hasta aquí estás cerca de la recompensa \n 42.63169393537795, 0.6565823348016667 \n ¿Qué lugar marcan las coordenadas? \n Etiqueta @walkexperience con la respuesta en Instagram o Twitter y recibirás tu premio";
  document.oncopy = (event) => {
    event.preventDefault();
    event.clipboardData.setData("text/plain", texto);
  };
};

// Mesure distance between two points
const getDistance = (UserPoint) => {
  let difX = treasurePoint.Xcoord - UserPoint.Xcoord;
  let difY = treasurePoint.Ycoord - UserPoint.Ycoord;
  // Aplicar teorema de pitagoras para hayar distance=hipotenusa catetos=difX y difY
  let result = Math.sqrt(difX * difX + difY * difY);
  getMessage(result);
};

// Get distance advaice tempeture
const getMessage = (distance) => {
  if (distance < 40) {
    foundTresore();
    deleteMessage();
    saveStorage(intentos);
    secretClipBoard();
    setInterval(restart, 8000);
  } else if (distance < 50) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(255, 0, 0, 1)";
    message.innerHTML = "REALLY HOT";
  } else if (distance < 70) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(255, 111, 1, 0.8)";
    message.innerHTML = "HOT";
  } else if (distance < 100) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(255, 67, 206, 0.8)";
    message.innerHTML = "WARM";
  } else if (distance < 200) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(0, 57, 255, 0.6)";
    message.innerHTML = "COLD";
  } else if (distance > 201) {
    distmsg.innerHTML = Math.floor(distance);
    message.style.backgroundColor = "rgba(0, 57, 255, 0.8)";
    message.innerHTML = "VERY COLD";
  }
};

const deleteMessage = () => {
  intentmsg.parentNode.removeChild(intentmsg);
  let coords = document.getElementById("coords");
  coords.parentNode.removeChild(coords);
  mousecoords = false;
  let distance = document.getElementById("distance");
  distance.parentNode.removeChild(distance);
  let intentos = document.getElementById("message");
  intentos.style.width = "90%";
  intentos.style.background = "yellow";
};

const showCoords = (event) => {
  if (mousecoords == true) {
    var x = event.clientX;
    var y = event.clientY;
    var coor = x + "/" + y;
    document.getElementById("coords").innerHTML = coor;
  }
};

const foundTresore = () => {
  message.innerHTML = `<div class=modal-text><p>Tienes 8 segundo para copia el código:</p><p><span class ="text">jA@j7-aKOug</span></p><p>en el Block Notas y veras como obtener tu recompensa.</p>Encontrado en ${intentos} intentos.</div>`;
  const imgTresor = document.getElementById("map-img");
  imgTresor.src = "./img/chest-treasure.jpg";
  imgTresor.style.height = "350px";
};

// Draw

// Web storage objects localStorage and sessionStorage allow to save key/value pairs in the browser.
// localstore solo almacena strings - para serializar como un json usamos: JSON.stringify
const saveStorage = (intentos) => {
  console.log(localStorage.length);
  console.log(`numgame: ${numgame}`);
  if (localStorage.length == 0) {
    console.log("localStore is empty");
  }
  numgame++;
  let player = {
    sesion: numgame,
    intentos: intentos,
  };
  localStorage.setItem(numgame, JSON.stringify(player));

  returnArray(localStorage);
};

const returnArray = (localStorage) => {
  const listaGames = [];
  console.log(`listaGames start:${listaGames}`);
  // Objects.key Returns an array containing the names of all of the given object's own enumerable string properties.
  // Objects.value Returns an array containing the values that correspond to all of a given object's own enumerable string properties.
  Object.keys(localStorage).forEach(function (key) {
    //console.log(localStorage.getItem(key));
    // Transform string to obj with JSON
    objets = JSON.parse(localStorage.getItem(key));
    console.log(objets);
    //Save objets on array
    listaGames.push(objets);
    console.log(listaGames.length);
  });
  console.log(listaGames);

  if (listaGames.length > 1) {
    // / Shows all indexes, not just those with assigned values
    listaGames.find(function (value, index) {
      console.log("Visited index ", index, " with value ", value);
    });
    let games = listaGames.length;
    console.log(`Number off games: ${games}`);

    // Sort array
    sortGames(listaGames);

    // Render results players
    // Create html table
    const storelocalDiv = document.createElement("div");
    storelocalDiv.id = "score";
    storelocalDiv.className = "main-content-table";
    storelocalDiv.innerHTML = `<table class ="content-table">
      <tr>
      <th>Total Games</th>
      <th>Best score</th>
      <th>Worst score</th>
      </tr>
      <tr>
      <td>${games}</td>
      <td>${listaGames[0].intentos}</td>
      <td>${listaGames[games - 1].intentos}</td>
      </tr>
      </table>`;
    document.body.appendChild(storelocalDiv);
  }
};

const sortGames = (listaGames) => {
  // Sort an array of objects by numbers and returns the sorted array
  // sorts the arrayGames array by ages in ascending order:
  listaGames.sort((a, b) => {
    return a.intentos - b.intentos;
  });
  listaGames.forEach((item) => {
    console.log(`score: ${item.intentos} and sesion ${item.sesion}`);
  });
};

const restart = () => {
  location.reload();
};

// Geolocation
const success = (pos) => {
  var crd = pos.coords;
  console.log(`Your current position is Latitude : ${crd.latitude} and Longitude ${crd.longitude}`
  );
};
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};