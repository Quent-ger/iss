const elLatitude = document.querySelector(".lat");
const elLongitude = document.querySelector(".long");
let issMarker = null;


// Leaflet

var map = L.map('map');

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
}).addTo(map);

var issIcon = L.icon({
    iconUrl: 'images/iss_back.jpg',
    iconSize:     [100, 100], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
   
});


function getIssCoords(){
    fetch("http://api.open-notify.org/iss-now.json")
    .then(response => { 
        return response.json()
    })
    .then(data => { 
        try {
           let latitude = data.iss_position.latitude
           let longitude = data.iss_position.longitude
           return {latitude, longitude};
        }
        catch(error) {
            errorDiv.textContent = error;
        }    
    })
    .then( coords => { updateUi(coords.latitude, coords.longitude)
    })
    
}

function updateUi(latitude, longitude){
    elLatitude.textContent = latitude;
    elLongitude.textContent = longitude; 
    map.setView([latitude, longitude], 6);

    if(issMarker){
        map.removeLayer(issMarker);  
    }

    issMarker = L.marker([latitude, longitude], {icon:issIcon}).addTo(map);
   
}


getIssCoords();
let followIss = setInterval(() => getIssCoords(), 7000);