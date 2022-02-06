import * as L from "leaflet";
import { Marker } from "react-leaflet";

const HighJobMarker = ({ position, children }) => {
    const LeafIcon = L.Icon.extend({
        options: {}
    });

    const purpleIcon = new LeafIcon({
        iconUrl:
            "/purple_marker.svg",
        iconSize: [48, 48],
    });

    return (
        <Marker position={position} icon={purpleIcon}>
            {children}
        </Marker>
    );
};

export default HighJobMarker;