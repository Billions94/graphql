import * as RB from "react-bootstrap";

export default function Form({ setInput, newSong, addSong }) {
  return (
    <RB.Form className="mx-auto justify-content-center mt-3 w-100">
      <RB.FormGroup className="mb-2">
        <RB.FormControl
          value={newSong.title}
          required
          placeholder="title"
          type="text"
          onChange={(e) => setInput("title", e.target.value)}
        />
      </RB.FormGroup>

      <RB.FormGroup className="mb-2">
        <RB.FormControl
          value={newSong.artist}
          required
          placeholder="artist"
          type="text"
          onChange={(e) => setInput("artist", e.target.value)}
        />
      </RB.FormGroup>

      <RB.FormGroup className="mb-2">
        <RB.FormControl
          value={newSong.album}
          required
          placeholder="album"
          type="text"
          onChange={(e) => setInput("album", e.target.value)}
        />
      </RB.FormGroup>

      <RB.FormGroup className="mb-2">
        <RB.FormControl
          value={newSong.cover}
          required
          placeholder="cover"
          type="text"
          onChange={(e) => setInput("cover", e.target.value)}
        />
      </RB.FormGroup>

      <RB.FormGroup className="mb-2">
        <RB.FormControl
          value={newSong.likes}
          required
          placeholder="likes"
          type="number"
          onChange={(e) => setInput("likes", e.target.value)}
        />
      </RB.FormGroup>
      {newSong.likes ? (
        <RB.Button
          className="addSongBtn"
          onClick={addSong}
          variant="success">
          Add song
        </RB.Button>
      ) : (
        <RB.Button
          className="addSongBtn"
          disabled
          variant="success">
          Add song
        </RB.Button>
      )}
    </RB.Form>
  );
}
