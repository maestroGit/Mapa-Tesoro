// numRamdom returns a random number between min (inclusive) and max (exclusive)
// Math.random() returns a Number between 0 (inclusive) and 1 (exclusive). So we have an interval like this: 1 -> Tamaño img
const numRandom = (size) => {
  return Math.floor(Math.random() * size);
};

// Detect click position
const detectClickPosition = (e) => {
  const UserPoint = { Xcoord: e.clientX, Ycoord: e.clientY };
  getDistance(UserPoint);
  drawImage(e);
  intentos++;
  showIntentos(intentos);
};

// images
const myImage = new Image(10, 10);

const drawImage = (e) => {
  myImage.src = "./img/transprent-pala.png";
  myImage.id = "hole";
  myImage.style.top = e.clientY + "px";
  myImage.style.left = e.clientX + "px";
  document.body.appendChild(myImage);
};

// Show number off times
const showIntentos = (intentos) => {
  if (intentmsg) {
    intentmsg.innerHTML = intentos;
  }
};

// Copy to clipBoard
const secretClipBoard = () => {
  let texto =
    "Si has llegado hasta aquí estás cerca de la recompensa \n 42.63169393537795, 0.6565823348016667 \n ¿Qué lugar marcan las coordenadas? \n envíame la respuesta y recibirás tu premio";
  document.oncopy = (event) => {
    event.preventDefault();
    event.clipboardData.setData("text/plain", texto);
  };
};

// Mesure distance between two points
const getDistance = (UserPoint) => {
  let difX = treasurePoint.Xcoord - UserPoint.Xcoord;
  let difY = treasurePoint.Ycoord - UserPoint.Ycoord;
  // Aplicar teorema de pitagoras para hayar distance (hipotenusa) que es igual a la suma de los cuadrados de los catetos (difX difY).
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
    //setInterval(restart, 10000);
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

// Remove and show changes on message
const deleteMessage = () => {
  intentmsg.parentNode.removeChild(intentmsg);
  let coords = document.getElementById("coords");
  coords.parentNode.removeChild(coords);
  mousecoords = false;
  let distance = document.getElementById("distance");
  distance.parentNode.removeChild(distance);
  let message = document.getElementById("message");
  message.style.width = "90%";
  message.style.background = "#fffc4e";
};

const showCoords = (event) => {
  if (mousecoords == true) {
    let x = event.clientX;
    let y = event.clientY;
    let coor = x + "/" + y;
    document.getElementById("coords").innerHTML = coor;
  }
};

// Show new Modal window
const foundTresore = () => {
  message.innerHTML = `<div class=modal-text><p>Tienes 8 segundo para copiar el código:</p><p><span class ="text">jA@j7-aKOug</span></p><p>Pégalo en el Block Notas y ver como obtener tu recompensa.</p>Encontrado en ${intentos} intentos.</div>`;
  const imgTresor = document.getElementById("map-img");
  imgTresor.src = "./img/chest-treasure.jpg";
  imgTresor.style.height = "350px";
  map.removeEventListener("click", detectClickPosition);
};

// Saved in object player key/value pairs and set the values in localStorage from browser sessions
// localstore solo almacena strings - para serializar como un json usamos: JSON.stringify
const saveStorage = (intentos) => {
  numgame++;
  let player = {
    sesion: numgame,
    intentos: intentos,
  };
  localStorage.setItem(numgame, JSON.stringify(player));
  returnArray(localStorage);
};

// Read localStorage
const returnArray = (localStorage) => {
  const listaGames = [];
  // Object.keys()acepta un objeto como argumento y devuelve una matriz de todas sus (propias) propiedades.
  // Objects.value Returns an array containing the values that correspond to all of a given object's own enumerable string properties.
  Object.keys(localStorage).forEach(function (key) {
    //console.log(localStorage.getItem(key));
    // Transform string to obj with JSON
    objets = JSON.parse(localStorage.getItem(key));
    console.log(objets);
    //Saved objets on array
    listaGames.push(objets);
    console.log(listaGames.length);
  });
  //console.log(listaGames);

  if (listaGames.length > 1) {
    // Shows all indexes, not just those with assigned values
    listaGames.find(function (value, index) {
      console.log("Visited index ", index, " with value ", value);
    });
    let games = listaGames.length;
    // Calculate the average
    let total = 0;
    for (i = 0; i < games; i++) {
      let j = listaGames[i].intentos;
      total = total + j;
    }
    let average = total / games;

    // Sort array
    sortGames(listaGames);

    // Render results players and create html table
    const storelocalDiv = document.createElement("div");
    storelocalDiv.id = "score";
    storelocalDiv.className = "main-content-table";
    storelocalDiv.innerHTML = `<table class ="content-table">
    <tr><th colspan ="4">SCORE</th></tr>
      <tr>
      <th>Games</th>
      <th>Best</th>
      <th>Worst</th>
      <th>Average</th>
      </tr>
      <tr>
      <td>${games}</td>
      <td>${listaGames[0].intentos}</td>
      <td>${listaGames[games - 1].intentos}</td>
      <td>${average.toFixed(1)}</td>
      </tr>
      </table>`;
    document.body.appendChild(storelocalDiv);
  }
};

// Sort an array of objects by numbers and returns the sorted array. Sorts the arrayGames by intentos in ascending order:
const sortGames = (listaGames) => {
  listaGames.sort((a, b) => {
    return a.intentos - b.intentos;
  });
  listaGames.forEach((item) => {
    console.log(`score: ${item.intentos} and sesion ${item.sesion}`);
  });
};

// Restar de game reloading de page
const restart = () => {
  location.reload();
};

// Geolocation
const success = (pos) => {
  const crd = pos.coords;
  console.log(
    `Your current position is Latitude : ${crd.latitude} and Longitude ${crd.longitude}`
  );
};
const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
