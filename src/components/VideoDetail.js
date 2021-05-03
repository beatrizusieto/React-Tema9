import React from 'react';

const VideoDetail = ({video}) => {
  if (!video) {
    return (
      <div><p>No se pudo cargar el vídeo</p></div>);
  }
  const videoId = video.id.videoId;
  const url = `https:www.youtube.com/embed/${videoId}`;

  return (
    <div className="mb-2 mr-3 ml-3 rounded bg-white d-inline-flex p-3">
    <div className="embed-responsive embed-responsive-16by9">
    <iframe className="embed-responsive-item rounded" src={url} title={url}></iframe>
    </div>
    <div className="ml-2 bg-white">
    <div className=""><b>{video.snippet.title}</b></div>
    <div className="">{video.snippet.description}</div>
    </div>
    </div>);
};
export default VideoDetail;