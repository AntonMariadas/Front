import { faArrowLeft, faHeart, faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import MapBox from "../components/MapBox";
import SpotMarker from "../components/SpotMarker";
import Link from "next/link";
import { useRouter } from "next/router";


export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(`API NodeJs/${context.parmas.id}`);
        const job = res.json();
        return {
            props: { job }
        };
    }
    catch (err) {
        console.log(err);
    }
};

const offre = ({ job }) => {
    // const router = useRouter();
    // const { id } = router.query;
    const addToFavorites = () => {
        alert("Ajout aux favoris");
    };

    const showRoute = () => {
        alert("Trajet");
    };

    return (
        <>
            <div className="py-5">

                <section className="my-5 d-flex flex-column align-items-center">
                    <div className="">
                        {/* <MapBox>
                            <SpotMarker lat={48.853733} lng={2.549027} />
                        </MapBox> */}
                    </div>

                    <div className="my-4">
                        <h3 className="text-center">Header</h3>
                        <h5 className="text-decoration-italic">Title</h5>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda recusandae necessitatibus illo officia, laboriosam facilis et quasi magnam sint dolor sequi totam tenetur ab quas minus accusantium, corrupti ipsam nesciunt!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda recusandae necessitatibus illo officia, laboriosam facilis et quasi magnam sint dolor sequi totam tenetur ab quas minus accusantium, corrupti ipsam nesciuntLorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda recusandae necessitatibus illo officia, laboriosam facilis et quasi magnam sint dolor sequi totam tenetur ab quas minus accusantium, corrupti ipsam nesciuntLorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda recusandae necessitatibus illo officia, laboriosam facilis et quasi magnam sint dolor sequi totam tenetur ab quas minus accusantium, corrupti ipsam nesciunt</p>
                    </div>
                    <div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <Link href="/jobs">
                                <button type="button" className="btn btn-primary">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            </Link>
                            <button type="button" className="btn btn-warning" onClick={addToFavorites}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button type="button" className="btn btn-success" onClick={showRoute}>
                                <FontAwesomeIcon icon={faRoute} />
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default offre;