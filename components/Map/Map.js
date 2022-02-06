import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from '../../styles/Map.module.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';


const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
    let mapClassName = styles.map;

    if (className) {
        mapClassName = `${mapClassName} ${className}`;
    }

    return (
        <MapContainer className={mapClassName} {...rest}>
            {children(ReactLeaflet)}
        </MapContainer>
    );
};

export default Map;