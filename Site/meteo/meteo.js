const API_KEY = "2a4026b85173ac4ff9aa4ae0d9fe67cd";  // Remplacez par votre clé API
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";  // URL pour les prévisions

let currentMarkers = [];  // Variable pour stocker les marqueurs existants


function getWeather() {
    const city = document.getElementById("city").value;
  // Récupérer la ville entrée par l'utilisateur
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`; // URL avec les paramètres API
    console.log(url);

    // Supprimer tous les marqueurs existants
    currentMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    currentMarkers = [];  // Réinitialiser le tableau des marqueurs

    // Envoyer une requête GET à l'API
    fetch(url)
        .then(response => response.json())  // Parse la réponse en JSON
        .then(data => {
            console.log(data);  // Vérifiez ici si vous obtenez les bonnes données

            // Vérifier si l'API retourne une erreur ou si les coordonnées sont présentes
            if (data.cod === "404") {
                alert("Ville non trouvée");
            } else if (data.coord) {
                // Créer un marqueur pour la ville et l'ajouter à la carte
                const newMarker = L.marker([data.coord.lat, data.coord.lon]).addTo(map)
                    .bindPopup(data.name + "\n" + `${data.main.temp}°C` + "\n" + data.weather[0].description)
                    .openPopup();

                // Ajouter le marqueur au tableau pour pouvoir le supprimer plus tard
                currentMarkers.push(newMarker);

                // Afficher les informations météo actuelles dans le tableau
                document.getElementById("cityName").innerText = data.name;
                document.getElementById("weatherDescription").innerText = data.weather[0].description;
                document.getElementById("temperature").innerText = `${data.main.temp}°C`;

                // Récupérer et afficher les prévisions
                getForecast(city);
            } else {
                // Si les coordonnées sont manquantes
                alert("Les coordonnées de la ville sont manquantes.");
            }
        })
        .catch(error => {
            console.error("Erreur:", error);
            alert("Une erreur s'est produite");
        });
}

// Fonction pour récupérer les prévisions des 5 prochains jours
function getForecast(city) {
    const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

    // Envoyer la requête GET pour les prévisions
    fetch(url)
        .then(response => response.json())  // Parse la réponse en JSON
        .then(data => {
            console.log(data);  // Vérifiez les données des prévisions ici
            if (data.cod !== "200") {
                alert("Impossible de récupérer les prévisions.");
            } else {
                displayForecast(data);
            }
        })
        .catch(error => {
            console.error("Erreur:", error);
            alert("Une erreur s'est produite lors de la récupération des prévisions");
        });
}

// Fonction pour afficher les prévisions dans le tableau
function displayForecast(data) {
    const forecastList = data.list;  // Liste des prévisions horaires
    let forecastHTML = '';  // Contenu du tableau des prévisions

    // On prend une prévision toutes les 8 heures (c'est-à-dire une prévision par jour)
    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000);  // Convertir la date de Unix à JS
        const day = date.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
        const temperature = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        forecastHTML += `
            <tr>
                <td>${day}</td>
                <td><img src="${icon}" alt="${description}" /></td>
                <td>${temperature}°C</td>
            </tr>
        `;
    }

    // Insérer les prévisions dans le tableau
    document.getElementById("forecastBody").innerHTML = forecastHTML;
}
