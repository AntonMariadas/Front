import Head from "next/head";

const liens = () => {
    return (
        <>
            <Head>
                <title>Liens utiles</title>
                <meta name="job emploi informatique" content="Plateformes et organisations bénévoles aidant à la recherche d'emploi" />
            </Head>
            <section className="py-5">
                <div className="list-group my-5 text-center bg-secondary">
                    <p className="lead">Plateformes et organisations bénévoles dans la recheche d'emploi</p>
                    <a href="https://www.atypikall.com/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Atypikall</a>
                    <a href="https://www.lesdetermines.fr/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Les Déterminés</a>
                    <a href="https://www.whatthefabrik.fr/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">What The Fabrik</a>
                    <a href="https://www.skilz.io/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Skillz</a>
                    <a href="https://www.instagram.com/grimpe.fr/?hl=fr" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">L'Instagram Grimpe Qui Cartonne !</a>
                </div>

                <div className="list-group my-5 text-center bg-secondary">
                    <p className="lead">Lecture et veille informatique</p>
                    <a href="https://www.blogdumoderateur.com/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog Du Modérateur</a>
                    <a href="https://findyourway.io/blog/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog De Find Your Way</a>
                    <a href="https://www.jesuisundev.com/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog "jesuisundev"</a>
                    <a href="https://blog.cremedelacreme.io/blog" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog De Crème De La Crème</a>
                    <a href="https://grafikart.fr/blog" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog De Grafikart</a>
                    <a href="https://www.blogduwebdesign.com/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog Du Web Design</a>
                    <a href="https://www.webdesignertrends.com/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Web Designer Trends</a>
                    <a href="https://blog.clever-age.com/fr/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Le Blog De Clever Age</a>
                    <a href="https://www.opquast.com/rendre-le-web-meilleur/" target="_blank" className="list-group-item list-group-item-action list-group-item-primary">Opquast</a>
                </div>
            </section>
        </>
    );
};

export default liens;