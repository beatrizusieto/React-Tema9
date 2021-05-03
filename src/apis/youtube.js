import axios from 'axios';
const KEY = 'AIzaSyCtGReJ0yzOL8TsU467C4FUYD-TQtCzBjM';

export default axios.create({

  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: 'snippet',
    maxResults: 4,
    key: KEY,
    type: 'video'
  }
})