const Tabs = () => {
    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" href="#home">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#profile">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                    <div className="dropdown-menu" style="">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </li>
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade active show" id="home">

                </div>
                <div className="tab-pane fade" id="profile">

                </div>
                <div className="tab-pane fade" id="dropdown1">

                </div>
                <div className="tab-pane fade" id="dropdown2">

                </div>
            </div>
        </>
    );
};

export default Tabs;