const SignInHero = () => {
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-0 border-bottom">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-4 fw-bold lh-1 mb-3">Analyse de milliers de recrutements</h1>
                    <p className="lead">La candidature spontanée nécessite de bien cibler ses entreprises et son secteur d'activité. <span className="fw-bold">MyItJob</span> se base sur des données officielles triées et fournis par Api.gouv pour accélerer votre prise de poste.</p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">
                    <form className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Mot de passe</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Voir les offres</button>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default SignInHero;