
const CenterHero = () => {
    return (
        <>
            <div className="px-4 pt-4 my-5 text-center border-bottom">
                <h1 className="display-4 fw-bold">N'envoyez plus vos CV au hasard</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4"> <span className="fw-bold">MyItJob</span> vous permet de cibler les entreprises avec un fort potentiel d'embauche pours vos candidatures spontanées dans le domaine informatique.</p>
                </div>
                <div>
                    <div className="container px-5">
                        <img src="pair_programming.svg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CenterHero;