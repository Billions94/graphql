import * as RB from 'react-bootstrap'

export default function MusicCards({ song, index, delSong, setSmShow, setSelectedSong }) {
  return (
    <div className="w-100 mt-2 songList">
    <RB.Card className="w-100">
      <RB.Card.Header className="d-flex">
        <RB.Image src={song.cover} width="100" alt="" />
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
            delete
          </RB.Button>

          <RB.Button
            onClick={() => { setSmShow(true); setSelectedSong(index) }}
            variant="warning"
            className="update">
            update
          </RB.Button>
        </div>
      </RB.Card.Header>
    </RB.Card>
  </div>
  )
}
