import { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Static location (Amsterdam example)
const staticLocation = {
  lat: 52.352434,
  lng: 4.783112,
};

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !markerRef.current) {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      markerRef.current = new AdvancedMarkerElement({
        position: staticLocation,
        map: mapRef.current,
      });
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["marker"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={staticLocation}
        zoom={15}
        onLoad={(map) => (mapRef.current = map)} // Store map instance
      />
    </LoadScript>
  );
};

export default GoogleMapComponent;
