import * as L from "leaflet";
import { Marker } from "react-leaflet";


const JobMarker = ({ position, children }) => {
    const LeafIcon = L.Icon.extend({
        options: {}
    });

    const blueIcon = new LeafIcon({
        iconUrl:
            "/blue_marker.svg",
        iconSize: [38, 38],
    });

    return (
        <Marker position={position} icon={blueIcon}>
            {children}
        </Marker>
    );
};

export default JobMarker;