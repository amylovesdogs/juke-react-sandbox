'use strict';
import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';
import SingleAlbum from './SingleAlbum';
import axios from 'axios';

const fakeAlbums = [{
  name: 'Abbey Road',
  id: 1,
  imageUrl: 'http://fillmurray.com/300/300',
  songs: [{
    id: 1,
    name: 'Romeo & Juliette',
    artists: [{name: 'Bill'}],
    genre: 'Funk',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }, {
    id: 2,
    name: 'White Rabbit',
    artists: [{name: 'Bill'}, {name: 'Alice'}],
    genre: 'Fantasy',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }, {
    id: 3,
    name: 'Lucy in the Sky with Diamonds',
    artists: [{name: 'Bob'}],
    genre: 'Space',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }]
},
{
  name: 'Yellow Submarine',
  id: 2,
  imageUrl: 'http://fillmurray.com/300/300',
  songs: [{
    id: 4,
    name: 'London Calling',
    artists: [{name: 'Bill'}],
    genre: 'Punk',
    audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  }]
}];

const convertSong = (song) => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

const convertAlbum = (album) => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      selectedAlbum: {}
      };
      this.selectAlbum = this.selectAlbum.bind(this);
  }

  selectAlbum(albumId) {
    console.log("In selectAlbum");
    axios.get(`/api/albums/${albumId}`)
    .then(res => res.data)
    .then(album => {
      console.log("album is ", album);
      this.setState({
        selectedAlbum: convertAlbum(album)
        });
      return "foo";
    })
    .then((junk) => {
        console.log("selected album is ", this.state.selectedAlbum);
        console.log("this is ",this);
    });

  }

  componentDidMount() {
    axios.get('api/albums')
    .then(response => {
      return response.data;
    })
    .then(albums => {
      //console.log(albums);
      albums.map(album => {
        album.imageUrl = `/api/albums/${album.id}/image`;
        return album;
      });
      this.setState({albums: albums});
    })
    .catch(err => {
      console.error('error');
      console.error(err);
    });
    //this.setState({albums: fakeAlbums});
  }

  render() {
     return (
      <div id="main" className="container-fluid">
        <Sidebar />
        <div className="col-xs-10">
          <Albums albums={this.state.albums} selectAlbum={this.selectAlbum} />
          {this.state.selectedAlbum.name &&
            <SingleAlbum album={this.state.selectedAlbum}/>}
        </div>
        <Footer />
      </div>
     )
  }
}
