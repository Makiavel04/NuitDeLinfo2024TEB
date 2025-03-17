
const _KEY = "2a4026b85173ac4ff9aa4ae0d9fe67cd";  // Remplacez par votre clé API
const _URL = "https://api.openweathermap.org/data/2.5/weather";
const F_URL = "https://api.openweathermap.org/data/2.5/forecast";  // URL pour les prévisions

function clearWeatherData() {
    // Effacer les informations météo actuelles
    document.getElementById("cityName").innerText = "";
    document.getElementById("weatherDescription").innerText = "";
    document.getElementById("temperature").innerText = "";

    // Effacer les prévisions (le corps du tableau des prévisions)
    const forecastBody = document.getElementById("forecastBody");
    forecastBody.innerHTML = ""; // Vider le tableau des prévisions
}


function getCapital(regionName) {
    return fetch('regions.json') // Remplacez par le chemin vers votre fichier
      .then(response => response.json())
      .then(data => {
        const region = data.regions.find(region => region.name === regionName);
        if (region) {
          return region.capital; // Retourne la capitale
        } else {
          throw new Error(`Région "${regionName}" non trouvée.`);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la lecture du fichier JSON :', error);
        throw error;
      });
}

function getPrefecture(departmentName) {
    return fetch('departements.json') // Remplacez par le chemin vers votre fichier
      .then(response => response.json())
      .then(data => {
        const department = data.departments.find(dept => dept.name === departmentName);
        if (department) {
          return department.prefecture; // Retourne la préfecture
        } else {
          throw new Error(`Département "${departmentName}" non trouvé.`);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la lecture du fichier JSON :', error);
        throw error;
      });
}


// Initialisation de la carte Leaflet.js, centrée sur la France
const map = L.map('map').setView([46.603354, 1.888334], 6); // Latitude et longitude de la France

// Définir des limites plus restreintes
const bounds = [
    [35, -20], // Coin sud-ouest (Espagne)
    [55, 32]   // Coin nord-est (Allemagne)
];

// Ajouter une couche de tuiles avec OpenStreetMap comme fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Définir les limites de la carte (maxBounds)
map.setMaxBounds(bounds);
// Couche dynamique pour gérer les différentes couches GeoJSON

let geojsonLayer;

// Fonction pour réinitialiser la carte
function resetMap() {
    if (geojsonLayer) {
        map.removeLayer(geojsonLayer); // Retirer la couche existante
    }
}

// Fonction pour charger et afficher un GeoJSON
function loadGeoJSON(url, style, popupContentCallback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            geojsonLayer = L.geoJSON(data, {
                style: style,
                onEachFeature: popupContentCallback
            }).addTo(map);
        })
        .catch(error => console.error('Erreur de chargement GeoJSON:', error));
}

// Styles pour les différentes couches
const defaultStyle = {
    color: "#0066cc",
    weight: 2,
    opacity: 1,
    fillColor: "#99ccff",
    fillOpacity: 0.4
};

let sanscheck = document.querySelector("#sans").checked;
let regionscheck = document.querySelector("#regions").checked;
let departementscheck = document.querySelector("#departements").checked;


async function bindPopup(feature, layer) {
    const name = feature.properties.nom || "Inconnu";
    let cityName = "Inconnu";

    try {
        if (regionscheck) {
            cityName = await getCapital(name); // Attendre le résultat de la promesse
        } else if (departementscheck) {
            cityName = await getPrefecture(name); // Attendre le résultat de la promesse
        }
        layer.bindPopup(`<b>${name}</b><br><b>${cityName}</b>`); // Afficher le lien dans le popup
    } catch (error) {
        layer.bindPopup(`<b>${name}</b><br><b>Erreur : données non trouvées</b>`);
    }
}

// Bouton "Sans régions ni départements"
document.querySelector("#sans").addEventListener("click", function () {
    resetMap();
    loadGeoJSON(
        'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-region-idf.geojson',
        defaultStyle,
        bindPopup
    );
    sanscheck = true;
    regionscheck = false;
    departementscheck = false;
});

// Bouton "Régions"
document.querySelector("#regions").addEventListener("click", function () {
    resetMap();
    loadGeoJSON(
        'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson',
        defaultStyle,
        bindPopup
    );
    sanscheck = false;
    regionscheck = true;
    departementscheck = false;
});

// Bouton "Départements"
document.querySelector("#departements").addEventListener("click", function () {
    resetMap();
    loadGeoJSON(
        'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson',
        defaultStyle,
        bindPopup
    );
    sanscheck = false;
    regionscheck = false;
    departementscheck = true;
});

