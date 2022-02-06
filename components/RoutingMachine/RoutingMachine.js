import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


const createRoutineMachineLayer = ({ position, start, end, color, collapsible, autoRoute, language }) => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const instance = L.Routing.control({
        // EN PROD UTILISER MAPBOX
        // router: L.Routing.mapbox(mapboxToken),
        position,
        waypoints: [
            start,
            end
        ],
        lineOptions: {
            styles: [
                {
                    color,
                },
            ],
        },
        collapsible,
        autoRoute,
        language,
        createMarker: function () { return null; }
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;