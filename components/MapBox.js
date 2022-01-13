import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = ({ children }) => {
    const API_KEY = "pk.eyJ1IjoiYW50b24yNyIsImEiOiJja3libnN3ZnQwaGFlMnBvZmRtbmFra2hyIn0.UWh2PzsvAY7qd6E4EVt-XA";

    const [viewport, setViewport] = useState({
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 9,
        width: 400,
        height: 400,
    });

    return (
        <div>
            <ReactMapGL
                mapboxApiAccessToken={API_KEY}
                mapStyle={'mapbox://styles/mapbox/streets-v11'}
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
                {children}
            </ReactMapGL>
        </div>
    );
};

export default Map;