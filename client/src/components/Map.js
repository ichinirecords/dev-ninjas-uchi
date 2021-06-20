import { MapContainer, TileLayer, CircleMarker, Popup,} from "react-leaflet";
import ArtPopup from "./ArtPopup"
import "./Map.css"

const Map = ({ approvedArtwork }) => {
  const position = [41, 0];

  const filteredArtwork = approvedArtwork.filter(item => item.lat);

  const redOptions = { color: "red" };

  return (
    <MapContainer
      center={position}
      zoom={2}
      style={{ height: "75vh", width: "85vw", marginLeft: "5vw"}}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
      />
      {filteredArtwork.map((el) => (
        <CircleMarker
          key={el.id}
          pathOptions={redOptions}
          radius={5}
          center={[el.lat, el.lon]}
        >
          <Popup>
            <ArtPopup {...el} />
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;