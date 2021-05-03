import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import React, { useState, useEffect } from 'react';

const VideoItem = ({handleVideoSelect, video, fav, setFav, checkedini}) => {

   const cor = (fav.find(t => t === video)) ? 'heart' : 'heart-outline'
   checkedini = (cor === 'heart' ) ? true : false
   const [fecha, setDate] = useState(Date()); 
   const [checked, setClick] = useState(checkedini)

   useEffect (() =>{

      if(fav.find(t => t === video))
      {
         checked ? setFav(fav) : setFav(fav.filter(t => t !== video))
      }

      if(!fav.find(t => t === video))
      {
        checked ? setFav([...fav, video]) : setFav(fav)
      } 
   },[!checked]);

return (
    <div className="col-3 flex-column w-100 h-100">
    <div>
    <Link to="/VideoDetail" className="" onClick={() => handleVideoSelect(video)}>
    <div className="text-center align-center bg-white rounded-top w-100 h-100">
    <img className="rounded-top w-100 h-100" src={video.snippet.thumbnails.medium.url} 
    alt={video.snippet.description} onChange={() => setDate(Date())}/>
          <br></br>
          <b className="col-3 text-dark">{video.snippet.title}</b>
          <br></br>
    </div> 
    </Link>
    <div className="d-flex rounded-bottom pb-2 bg-white">
    <Moment fromNow className="d-flex text-center justify-content-start text-dark pl-4 pr-4">
                  {fecha}
    </Moment>
    <span className="text-center align-center justify-content-end text-danger"><ion-icon name={cor} 
      onClick={() => setClick(!checked)} ></ion-icon></span>
    </div>
    </div>
    <br></br>
    </div>);
};
export default VideoItem