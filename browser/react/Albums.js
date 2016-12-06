'use strict';
import React from 'react';
import Album from './Album.js'

export default function Albums(props) {
  // console.log("In Albums, props: ",props);
  return (
  <div className="col-xs-10">
    <h3>Albums</h3>
    <div className="row">
    {
      props.albums.map(album => <Album key={album.id} album={album} selectAlbum={props.selectAlbum}/>)
    }
    </div>
  </div>
  )
}