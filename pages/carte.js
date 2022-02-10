import { useEffect, useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import axios from 'axios';
import Map from '../components/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faList } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import withAuth from '../components/HOC/withAuth';
import HighJobMarker from '../components/HighJobMarker';
import UserMarker from '../components/UserMarker';


const carte = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    const defaultCenter = [48.8566, 2.3522];
    let userPosition = [user.latitude, user.longitude];
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;

    useEffect(() => {
        axios.get(`${nodeJsApi}/api/rome/${user.profile}`)
            .then(res => setJobs(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='my-5 py-3'>
            <Link href="/jobs">
                <button type="button" className="btn btn-outline-dark btn-sm">
                    <FontAwesomeIcon icon={faArrowLeft} /> <FontAwesomeIcon icon={faList} />
                </button>
            </Link>
            <Map style={{ width: '100%', height: '40rem' }} center={defaultCenter} zoom={10} scrollWheelZoom={false}>
                {({ TileLayer, Marker, Popup }) => (
                    <>
                        {/* <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`}
                            attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                        /> */}
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <UserMarker position={userPosition}>
                            <Popup>
                                Vous êtes ici !
                            </Popup>
                        </UserMarker>
                        {jobs.map(job => {
                            if (job.stars > 2.5)
                                return (
                                    <HighJobMarker position={[job.lat, job.lon]} key={job._id}>
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
                                    </HighJobMarker>
                                );
                            else return (
                                <Marker position={[job.lat, job.lon]} key={job._id}>
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
            <div className='text-center'>
                <h4>Légende</h4>
                <span className="badge bg-danger rounded-pill">Ma Position</span>
                <span className="badge bg-info rounded-pill">Job</span>
                <span className="badge bg-primary rounded-pill">Job bien noté</span>
            </div>
        </div>
    );
};

export default withAuth(carte);