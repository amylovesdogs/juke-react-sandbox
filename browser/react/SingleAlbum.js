'use strict';
import React from 'react';

export default function SingleAlbum(props) {
  console.log("In SingleAlbum, props: ",props);
  return (
    <div className="col-xs-10">
      <div>
        <h3>{props.album.name}</h3>
        <img src={props.album.imageUrl} className="img-thumbnail" />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
        {
          props.album.songs.map(song => {
            return (
              <tr key={song.id}>
                <td>
                  <button className="btn btn-default btn-xs">
                    <span className="glyphicon glyphicon-play"></span>
                  </button>
                </td>
                <td>{song.name}</td>
                <td>{song.artists.map(artist => artist.name).join(', ')}</td>
                <td>{song.genre}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )

}