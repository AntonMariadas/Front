import { Marker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const SpotMarker = ({ lat, lng, onClick }) => {
    return (
        <>
            <Marker latitude={lat} longitude={lng}>
                <a href='#' onClick={onClick}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size='2x' className='text-primary' />
                </a>
            </Marker>
        </>
    );
};

export default SpotMarker;