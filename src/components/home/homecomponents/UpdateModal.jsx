import * as RB from "react-bootstrap";
import { useState } from "react";
import { updateSong } from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify"; 

export default function UpdateModal(props) {

  const initialState = {
    title: "",
    artist: "",
    album: "",
    cover: "",
    likes: 0,
  };

  const [newSong, updateNewSong] = useState(initialState);

  function setInput(key, value) {
    updateNewSong({ ...newSong, [key]: value });
  }

  async function update() {
    try {
      const { index } = props;
      const song = { ...props.songs[index] };
      // Appending the data from the form to the existing song
      song.title = newSong.title
      song.artist = newSong.artist
      song.album = newSong.album
      song.cover = newSong.cover
      song.likes = newSong.likes
      // Deleting these information because they are handled by graphql
      delete song.createdAt;
      delete song.updatedAt;
      delete song.owner;

      const { data } = await API.graphql(graphqlOperation(updateSong, { input: song }));
      const newSongList = [...props.songs];
      newSongList[index] = data.updateSong;
      props.updateSongs(newSongList);
      updateNewSong(initialState);
      props.setSmShow(false);
      props.updateRefresh(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <RB.Modal
        size="sm"
        centered
        show={props.smShow}
        onHide={() => props.setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <RB.Modal.Header closeButton>
          <RB.Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </RB.Modal.Title>
        </RB.Modal.Header>
        <RB.Modal.Body>
          <RB.Form className="mx-auto justify-content-center mt-3 w-100">
            <RB.FormGroup className="mb-2">
              <RB.FormControl
                value={newSong.title}
                placeholder="title"
                type="text"
                onChange={(e) => setInput("title", e.target.value)}
              />
            </RB.FormGroup>

            <RB.FormGroup className="mb-2">
              <RB.FormControl
                value={newSong.artist}
                placeholder="artist"
                type="text"
                onChange={(e) => setInput("artist", e.target.value)}
              />
            </RB.FormGroup>

            <RB.FormGroup className="mb-2">
              <RB.FormControl
                value={newSong.album}
                placeholder="album"
                type="text"
                onChange={(e) => setInput("album", e.target.value)}
              />
            </RB.FormGroup>

            <RB.FormGroup className="mb-2">
              <RB.FormControl
                value={newSong.cover}
                placeholder="cover"
                type="text"
                onChange={(e) => setInput("cover", e.target.value)}
              />
            </RB.FormGroup>

            <RB.FormGroup className="mb-2">
              <RB.FormControl
                value={newSong.likes}
                placeholder="likes"
                type="number"
                onChange={(e) => setInput("likes", e.target.value)}
              />
            </RB.FormGroup>
            <RB.Button onClick={update} variant="success">
              Update song
            </RB.Button>
          </RB.Form>
        </RB.Modal.Body>
      </RB.Modal>
    </>
  );
}
