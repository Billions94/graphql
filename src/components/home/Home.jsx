import { useState, useEffect } from "react";
import * as RB from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listSongs } from "../../graphql/queries";
import { createSong, deleteSong, updateSong } from "../../graphql/mutations";
import "../../index.scss";
import UpdateModal from "./UpdateModal";

export default function Home() {
  const initialState = {
    title: "",
    artist: "",
    album: "",
    cover: "",
    likes: 0,
  };

  const [newSong, updateNewSong] = useState(initialState);
  const [songs, updateSongs] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [refresh, updateRefresh] = useState(false);
  const [selectedSong, setSelectedSong] = useState(0);

  const songIndex = songs.findIndex((s, index) => index === selectedSong);
  const actualSong = songs[songIndex];

  console.log("this is the song", actualSong);

  const getData = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listSongs));
      const { items } = data.listSongs;
      console.log("This is the data", items);
      updateSongs(items);
    } catch (error) {
      console.log("Error occured while contacting db", error);
    }
  };

  function setInput(key, value) {
    updateNewSong({ ...newSong, [key]: value });
  }

  async function addSong() {
    try {
      const song = { ...newSong };
      updateSongs([...songs, song]);
      updateNewSong(initialState);
      await API.graphql(graphqlOperation(createSong, { input: song }));
    } catch (error) {
      console.log("error creating song:", error);
    }
  }

  async function delSong(idx) {
    try {
      const song = songs[idx];
      console.log("this is the deleted song:", song);
      await API.graphql(graphqlOperation(deleteSong, { input: song.id }));
      updateNewSong(initialState);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <RB.Row className="justify-content-center mt-3">
      <RB.Col md={4}>
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
          <RB.Button onClick={addSong} variant="success">
            Add song
          </RB.Button>
        </RB.Form>
      </RB.Col>

      {/* <RB.Row className="justify-content-center mt-3"> */}
      <RB.Col md={7}>
        {songs.map((song, idx) => (
          <div key={idx} className="w-100 mt-2 songList">
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
                    onClick={() => delSong(idx)}
                    variant="danger"
                    className="delete"
                  >
                    delete
                  </RB.Button>

                  <RB.Button
                    onClick={() => {
                      setSmShow(true);
                      setSelectedSong(idx);
                    }}
                    variant="warning"
                    className="update"
                  >
                    update
                  </RB.Button>
                </div>
              </RB.Card.Header>
            </RB.Card>
          </div>
        ))}
        <UpdateModal
          index={songIndex}
          smShow={smShow}
          setSmShow={setSmShow}
          newSong={newSong}
          songs={songs}
          updateSongs={updateSongs}
          updateNewSong={updateNewSong}
          updateRefresh={updateRefresh}
        />
      </RB.Col>
    </RB.Row>
  );
}
