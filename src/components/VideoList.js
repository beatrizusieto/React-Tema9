import VideoItem from './VideoItem';

const VideoList = ({handleVideoSelect, videos, fav, setFav}) => {

      const renderedVideos = videos.map((video) => {
          const checkedini = false
  	       return <VideoItem
             handleVideoSelect={handleVideoSelect}
	          key={video.id.videoId} 
             video={video}
             fav={fav}
             setFav={setFav}
             checkedini={checkedini}/>
          });
         return <div className="d-inline-flex">{renderedVideos}<br></br></div>;
}
export default VideoList;