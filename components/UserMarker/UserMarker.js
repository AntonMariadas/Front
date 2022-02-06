import * as L from "leaflet";
import { Marker } from "react-leaflet";


const JobMarker = ({ position, children }) => {
    const LeafIcon = L.Icon.extend({
        options: {}
    });

    const redIcon = new LeafIcon({
        iconUrl:
            "/red_marker.svg",
        iconSize: [38, 38],
    });

    return (
        <Marker position={position} icon={redIcon}>
            {children}
        </Marker>
    );
};

export default JobMarker;