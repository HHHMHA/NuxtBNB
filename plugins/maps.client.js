export default function(context, inject) {
  let isLoaded = false;
  let waiting = [];

  addScript();

  inject("maps", {
    showMap,
  })

  function addScript() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap";
    script.async = true;
    window.initMap = initGoogleMaps;
    document.head.appendChild(script);
  }

  function initGoogleMaps() {
    isLoaded = true;
    waiting.forEach( item => item.fn?.(...item.arguments) );
    waiting = [];
  }

  function showMap(canvas, lat, lng) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments,
      });
      return;
    }
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
