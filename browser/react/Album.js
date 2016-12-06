'use strict';
import React from 'react';

export default function Album(props) {
  // console.log("In Album, props: ",props);
  return (
    <div className="col-xs-4">
      <a className="thumbnail" href="#" onClick={() => props.selectAlbum(props.album.id)}>
         <img src={props.album.imageUrl} />
         <div className="caption">
           <h5>
             <span>{props.album.name}</span>
           </h5>
           <small>{props.album.songs.length}</small>
         </div>
      </a>
    </div>
  )

}
