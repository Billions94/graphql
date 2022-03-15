import * as RB from "react-bootstrap";
import * as Icon from "../../lib";
import { useState } from "react";
// eslint-disable-next-line 

export default function MusicCards({ music, song, index, delSong, setSmShow, setSelectedSong }) {

  const [moreInfo, updateMoreInfo] = useState(false);

  const open = () => updateMoreInfo(true);
  const close = () => updateMoreInfo(false);

  return (
    <div className="w-100 mt-2 songList">
      <RB.Card className={music[index]}
        onMouseEnter={open} 
        onMouseLeave={close}>
        <RB.Card.Header className="d-flex">
          <RB.Image src={song.cover} width="100" alt="" />
          { moreInfo === true &&
            <>
              <div className="title">
                <h5>{song.title}</h5>
                <h6>{song.album}</h6>
                {song.likes > 1 ? (
                  <h6>{song.likes} likes</h6>
                ) : (
                  <h6>{song.likes} like</h6>
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
          }
        </RB.Card.Header>
      </RB.Card>
    </div>
  );
}
