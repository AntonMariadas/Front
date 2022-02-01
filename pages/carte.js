import { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import axios from 'axios';
import Map from '../components/Map';
import { icon } from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import withAuth from '../components/HOC/withAuth';


const carte = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    const defaultCenter = [48.8566, 2.3522];
    let userPosition = [user.latitude, user.longitude];
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;

    const JOB_ICON = icon({
        iconUrl: "/marker.png",
        iconSize: [36, 36],
    });

    const USER_ICON = icon({
        iconUrl: "/user.png",
        iconSize: [36, 36],
    });


    useEffect(() => {
        axios.get(`${nodeJsApi}/api/rome/${user.profile}`)
            .then(res => setJobs(res.data))
            .catch(err => console.log(err));
    }, []);


    return (
        <div className='my-5 py-5'>
            <Map style={{ width: '100%', height: '40rem' }} center={defaultCenter} zoom={10} scrollWheelZoom={false}>
                {({ TileLayer, Marker, Popup }) => (
                    <>
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                            attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                        />
                        <Marker icon={USER_ICON} position={userPosition}>
                            <Popup>
                                Vous êtes ici !
                            </Popup>
                        </Marker>
                        {jobs.map(job => {
                            return (
                                <Marker icon={JOB_ICON} position={[job.lat, job.lon]} key={job._id}>
                                    <Popup>
                                        {job.name} <br />
                                        {job.naf_text} <br />
                                        {job.address} <br />
                                        {job.headcount_text} <br />
                                        {job.contact_mode} <br />
                                        <FontAwesomeIcon icon={faStar} /> {job.stars} <br />
                                        <Link href={`/jobs/${job._id}`}>
                                            <a href="" className='text-primary'>Voir l'offre</a>
                                        </Link>
                                    </Popup>
                                </Marker>

                            );
                        })}
                    </>
                )}
            </Map>
        </div>
    );
};

export default withAuth(carte);