import { useEffect, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// 📍 Static location (Amsterdam example)
const staticLocation = {
  lat: 52.352434,
  lng: 4.783112,
};

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !markerRef.current && window.google) {
      try {
        const { AdvancedMarkerElement } = window.google.maps.marker;

        // ✅ Create a custom content element for the marker
        const markerDiv = document.createElement("div");
        markerDiv.innerHTML = `
          <div style="
            background-color: red; 
            color: white; 
            padding: 5px 10px; 
            border-radius: 5px; 
            font-size: 14px; 
            font-weight: bold;
          ">
            📍 IronHack Amsterdam
          </div>`;

        // ✅ Initialize AdvancedMarkerElement
        markerRef.current = new AdvancedMarkerElement({
          position: staticLocation,
          map: mapRef.current,
          content: markerDiv, // ✅ Use custom content instead of default icon
        });

        console.log("Google Map Instance:", mapRef.current);
        console.log("Advanced Marker Instance:", markerRef.current);
      } catch (error) {
        console.error("Error creating AdvancedMarkerElement:", error);
      }
    }
  }, [mapRef.current]); // ✅ Run when `mapRef.current` is assigned

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={staticLocation}
      zoom={15}
      onLoad={(map) => {
        mapRef.current = map; // ✅ Store map instance before creating marker
      }}
    />
  );
};

export default GoogleMapComponent;
