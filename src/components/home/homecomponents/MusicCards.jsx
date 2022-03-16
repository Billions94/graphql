import * as RB from "react-bootstrap";
import * as Icon from "../../lib";
import { useState } from "react";
// eslint-disable-next-line 

export default function MusicCards({ music, song, index, delSong, setSmShow, setSelectedSong }) {

  const [moreInfo, updateMoreInfo] = useState(false);

  const open = () => updateMoreInfo(true);
  const close = () => updateMoreInfo(false);

  return (
    <div className="w-50 mt-2 songList">
      <RB.Card 
        className='card h-100'
        onMouseEnter={open} 
        onMouseLeave={close}>
      
          <RB.Image src={song.cover} width="100%" height="100%" alt="" />

          {/* { moreInfo === true && */}
          <div className={`${music[index]} infos-container`}>
            <RB.Card.Header className="d-flex">
            <>
              <div className="songInfo">
                <h5 className='title'>{song.title}</h5>
                <h6 className='artist'>{song.artist}</h6>
                <h6 className='album'>{song.album}</h6>
                {song.likes > 1 ? (
                  <h6 className='likes'>{song.likes} likes</h6>
                ) : (
                  <h6 className='likes'>{song.likes} like</h6>
                )}
              </div>
              <div className="deleteAndUpdate">
                <RB.Button
                  onClick={() => delSong(index)}
                  variant="danger"
                  className="delete">
                  <RB.Image src={Icon.trashIcon} alt="" width="27px" />
                </RB.Button>

                <RB.Button
                  onClick={() => {setSmShow(true);setSelectedSong(index)}}
                  variant="warning"
                  className="update">
                  <RB.Image src={Icon.updateIcon} alt="" width="27px" />
                </RB.Button>
              </div>
            </>
            </RB.Card.Header>
          </div>
          {/* } */}
      </RB.Card>
    </div>
  );
}
