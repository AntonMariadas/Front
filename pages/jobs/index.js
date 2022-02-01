import Head from "next/head";
import Card from "../../components/Card";
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt, faStar, faArrowDown, faArrowUp, } from "@fortawesome/free-solid-svg-icons";
import withAuth from "../../components/HOC/withAuth";


const jobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [rerender, setRerender] = useState(false);
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;

    useEffect(() => {
        axios.get(`${nodeJsApi}/api/rome/${user.profile}`)
            .then(res => setJobs(res.data))
            .catch(err => console.log(err));
    }, []);



    const sortByStarsAsc = () => {
        setJobs(
            jobs.sort((a, b) => {
                return b.stars - a.stars;
            })
        );
        setRerender(!rerender);
    };

    const sortByStarsDesc = () => {
        setJobs(
            jobs.sort((a, b) => {
                return a.stars - b.stars;
            })
        );
        setRerender(!rerender);
    };


    return (
        <>
            <Head>
                <title>Jobs</title>
                <meta name="job informatique" content="Offres d'emploi pour candidatures spontanées" />
            </Head>
            <div className="container my-5">
                <div className="form-check form-switch my-2 text-center pt-3">
                    <button type="button" className="btn btn-outline-warning btn-sm" onClick={sortByStarsAsc}>
                        <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                    <button type="button" className="btn btn-outline-warning btn-sm" onClick={sortByStarsDesc}>
                        <FontAwesomeIcon icon={faStarHalfAlt} /> <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                </div>
                <div className="row">
                    {jobs.map((job, index) => {
                        return (
                            <Card
                                key={index}
                                name={job.name}
                                naf_text={job.naf_text}
                                text={job.text}
                                address={job.address}
                                headcount_text={job.headcount_text}
                                contact_mode={job.contact_mode}
                                id={job._id}
                                stars={job.stars}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default withAuth(jobs);