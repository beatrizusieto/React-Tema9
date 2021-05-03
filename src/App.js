import React, { useState, useEffect } from 'react';
import youtube from './apis/youtube'
import inicial from './sample/inicial.json';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import  SearchBar  from './components/SearchBar.js'
import  NavBar  from './components/NavBar.js'
import  VideoDetail from './components/VideoDetail.js'
import  VideoList from './components/VideoList.js'
import  VideoItem from './components/VideoItem.js'
import  FondoStyled from './components/Fondo-styled'
import PhotoStyled from './components/Photo-styled';
import Moment from 'react-moment';
import 'moment-timezone';

const App = () => {
   const [videos, setVideos] = useState(inicial);
   const [selectedVideo, setselectedVideo] = useState(inicial[0]);
   const [fav, setFav] = useState([]);
   const [busquedaItem, setBusqueda] = useState([]);

   useEffect(() => {
        let data = localStorage.getItem('favoritos')
        if(data != null) {
         setFav(JSON.parse(data));       
        }
   },[]);

   useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(fav))
   }, [fav]);
    
   useEffect(() => {
        let data = localStorage.getItem('busqueda')
        if(data != null) {
         setBusqueda(JSON.parse(data));       
        }
   }, []);

   useEffect(() => {
        localStorage.setItem('busqueda', JSON.stringify(busquedaItem))
   }, [busquedaItem]);
 
   const handleSubmit = async (termFromSearchBar) => {
         const response = await youtube.get('/search', { 
               params: {
                   q: termFromSearchBar
               }
            })

         const respuesta = response.data.items
         setVideos(respuesta)
         setBusqueda([...busquedaItem, {videoBus: response.data.items[0], 
               icono: response.data.items[0].snippet.thumbnails.medium.url,   
               palabra: termFromSearchBar,
               tiempo: Date()}])       
   }   
      
   const cargaBusqueda = (busqueda) => {

            handleSubmit(busqueda.palabra)
            setselectedVideo(busqueda.videoBus)
   }

   const handleVideoSelect = (video) => {
            setselectedVideo(video)
   }
      
   const busquedaTableRows = () => { 

      return busquedaItem.map(busqueda => (
         <tr 
               key={busqueda.icono}
               className="d-flex rounded justify-content-between align-items-center bg-secondary border-bottom">
            <td className="text-light">{<PhotoStyled className="p-2" 
               src={busqueda.icono} 
               data-holder-rendered="true"></PhotoStyled>}
               <span className="font-weight-bold">{busqueda.palabra}</span> · <Moment fromNow>{busqueda.tiempo}</Moment>
            </td>
            <td className="pr-4">
               <Link to="/VideoDetail"  
                  className="btn btn-danger btn-sm font-weight-bold py-1 px-2"
                  onClick={ () => {cargaBusqueda(busqueda)} }> 
                        Cargar videos
               </Link>
            </td>
         </tr>))
      }    
            
   const favoritosTableRows = () => { 
      return  fav.map( favorito => ( 
                  <Link to="/VideoDetail" onClick={() => handleVideoSelect(favorito)}>
                  <img className="rounded w-50 h-100 pr-2 pb-2" src={favorito.snippet.thumbnails.medium.url} 
                  alt={favorito.snippet.description} /></Link>)
      ) 
   }   
                        
   const favoritosTableRows2 = () => { 
      return  fav.map( favorito => ( 
                    <VideoItem
                       handleVideoSelect={handleVideoSelect}
                       video={favorito}
                       key={favorito.id.videoId}
                       fav={fav}
                       setFav={setFav}
                       checkedini="true"/> ) 
                   ) 
   }   
    
   return (
      <Router>
       <Switch>
           <Route exact path="/">
               <FondoStyled className="container-fluid d-inline-flex h-100 m-0">
               <div className="row d-inline-flex">
                    <NavBar/>
               <div className="col-10">
                    <SearchBar handleFormSubmit={handleSubmit} />
                    <div className="row">
                    <div className="col-11">
                    <p className="text-light font-weight-bold">&nbsp;&nbsp;&nbsp;Recommended videos</p>
                        <VideoList
                           handleVideoSelect={handleVideoSelect} 
                           videos={videos} 
                           fav={fav}
                           setFav={setFav}
                        />
                    </div>
                    </div>
               <div className="row">
                     <table className="col-5 ml-4">
                        <thead>
                          <tr>
                             <th className="text-light font-weight-bold"> 
                                   Last searches
                             </th>
                           </tr>
                           <tr><th></th></tr>
                        </thead>
                        <tbody className="rounded">
                            {busquedaTableRows()}
                        </tbody>
                     </table>
               <div className="col-5 ml-4">
                  <span className="text-light font-weight-bold">Favourites videos</span> 
                  
                  
                    <div className="rounded" >       
                           {favoritosTableRows()}
                   </div> 
                   <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                   <br></br><br></br><br></br><br></br>
               </div>
               </div>
               </div>
               </div>
               </FondoStyled>
            </Route>
            <Route path="/VideoDetail">
               <FondoStyled className="container-fluid h-100 m-0">
               <div className="row d-inline-flex h-100">
                    <NavBar />
               <div className="col-10 h-100">
                    <SearchBar handleFormSubmit={handleSubmit}/>
               <div className="row rounded h-20">
               <div className="col-11">
                     <VideoDetail video={selectedVideo} />
               </div>
               </div>
               <div className="row">
                  <div className="col-11">
                     <p className="text-light font-weight-bold">&nbsp;&nbsp;&nbsp;Related videos</p>
                     <VideoList
                           handleVideoSelect={handleVideoSelect} 
                           videos={videos}
                           fav={fav}
                           setFav={setFav}
                     />
                  </div>
               </div>
               </div>
               </div>
               </FondoStyled>
            </Route>
            <Route path="/history">
               <FondoStyled className="container-fluid h-100 m-0">
               <div className="row h-100">
                  <NavBar/>
               <div className="col-10 h-100">
                   <SearchBar handleFormSubmit={handleSubmit}/>
               <div className="row">
                    <table className="col-10 ml-5">
                        <thead>
                          <tr>
                             <th className="text-light font-weight-bold"> Last searches
                              </th>
                          </tr>
                          <tr><th>" "</th></tr>
                       </thead>
                          <tbody className="rounded">
                             {busquedaTableRows()}
                           </tbody>
                       </table>      
                     </div>
                    </div>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                  </div>
                  </FondoStyled>
               </Route>
               <Route path="/LikedVideos">
                 <FondoStyled className="container-fluid d-flex h-100 m-0">
                 <NavBar/>
                    <div className="col-10">
                        <div ClassName="row"> 
                        <br></br><br></br>
                        <p className="text-light font-weight-bold">&nbsp;&nbsp;&nbsp;Liked videos</p>
                    <div className="col-11 d-flex flex-row flex-fill flex-wrap w-100">
                        {favoritosTableRows2()} 
                     </div>
                      <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                       <br></br><br></br><br></br><br></br>
                  </div>
                  </div>   
                 </FondoStyled>
         </Route>
         </Switch>
         </Router>);
    }
  export default App;
