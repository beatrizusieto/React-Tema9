import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
   return(
      <div className="col-2 bg-dark">
      <nav className="navbar bg-dark flex-column navbar-expand-lg navbar-light bg-light">
      <span className="d-inline-flex"><h3 className="text-primary">R<ion-icon name="caret-forward-outline"></ion-icon></h3><p className="text-white text-end font-weight-bold">Reactube</p></span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav flex-column text-white" style={{fontSize: 12}}>
      <br></br>
      <h6 className="nav-item font-weight-bold align-left">&nbsp;Menu</h6>
      <br></br>
      <Link to="/" className="nav-item text-white font-weight-bold nav-link active"><ion-icon name="home-sharp"></ion-icon>&nbsp;&nbsp;Home <span className="sr-only">(current)</span></Link>
      <Link to="/history" className="nav-item text-white font-weight-bold nav-link"><ion-icon name="time-sharp"></ion-icon>&nbsp;&nbsp;History</Link>
      <Link to="/LikedVideos" className="nav-item text-white font-weight-bold nav-link" href="#"><ion-icon name="heart-sharp"></ion-icon>&nbsp;&nbsp;Liked Videos</Link>
      </div>
      </div>
      </nav>
      </div> )
}
export default NavBar;
