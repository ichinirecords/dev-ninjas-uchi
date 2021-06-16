import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

import icon from "./constants";

const LeafletControlGeocoder = () => {
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search your city here...",
      defaultMarkGeocode: false,
      geocoder,
	  collapsed: false,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
		console.log(e.geocode.properties.address)
		console.log("city",
      e.geocode.properties.address.city ||
        e.geocode.properties.address.village ||
        e.geocode.properties.address.municipality ||
        e.geocode.properties.address.county
    );
		console.log("country",e.geocode.properties.address.country)
		console.log("lat", e.geocode.center.lat);
		console.log("lon", e.geocode.center.lng);
        L.marker(latlng, { icon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
}

export default LeafletControlGeocoder;
