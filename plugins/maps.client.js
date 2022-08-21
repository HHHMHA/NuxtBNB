export default function(context, inject) {
  let mapLoaded = false;
  let mapArgs = null;

  addScript();

  inject("maps", {
    showMap,
  })

  function addScript() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap";
    script.async = true;
    window.initMap = initMap;
    document.head.appendChild(script);
  }

  function initMap() {
    mapLoaded = true;
    if (!mapArgs)
      return;

    let { canvas, lat, lng } = mapArgs;
    showMap(canvas, lat, lng);
    mapArgs = null;
  }

  function showMap(canvas, lat, lng) {
    mapArgs = { canvas, lat, lng };
    if (mapLoaded)
      renderMap(canvas, lat, lng);
  }

  function renderMap(canvas, lat, lng) {
    const position = new window.google.maps.LatLng(lat, lng);

    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true
    };
    const map = new window.google.maps.Map(canvas, mapOptions);

    const marker = new window.google.maps.Marker({
      position
    });
    marker.setMap(map);
  }
}
