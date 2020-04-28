mapboxgl.accessToken =
  "pk.eyJ1IjoiYWpma2wzc2Rma2xhc2ZkYXNma2FzZGZrYWRzIiwiYSI6ImNrOWljeTY5eDA1NXgzbW5vcTF2dHpzN2IifQ.auTbowSpUIE_MNp6awCzyA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 1.5,
});

async function loadMap() {
  const response = await fetch("/api/get-memories");
  const dataJSON = await response.json()
  const memories = dataJSON.data

  memories.forEach(memory => {
    new mapboxgl.Marker().setLngLat(memory.gps.split(", ")).addTo(map);

  })
}

loadMap();
