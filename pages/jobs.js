import Head from "next/head";
import Card from "../components/Card";

export async function getStaticProps() {
    try {
        const res = await fetch('API NodeJs');
        const jobs = await res.json();
        return {
            props: { jobs }
        };
    }
    catch (err) {
        console.log(err);
    }
}


const jobs = (jobs) => {
    return (
        <>
            <Head>
                <title>Jobs</title>
                <meta name="job informatique" content="Offres d'emploi pour candidatures sponatnées" />
            </Head>
            <div className="container my-5">
                <div className="row">
                    {jobs.map(job => <Card job={job} />)}
                </div>
            </div>
        </>
    );
};

export default jobs;