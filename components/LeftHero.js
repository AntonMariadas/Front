const LeftHero = () => {
    return (
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src="interview.svg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">7 entreprises sur 10 examinent d'abord les candidatures spontanées</h1>
                    <p className="lead"></p>
                </div>
                <p className="lead">La candidature spontanée est un moyen direct de se faire connaître auprès d'une entreprise et d'anticiper ses éventuels besoins professionnels. L’intérêt est double : choisir les entreprises qui vous intéressent réellement et être confronté à moins de concurrence.</p>
            </div>
        </div>
    );
};

export default LeftHero;