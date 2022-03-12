import { useState, useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { listSongs } from "./graphql/queries";
import { createSong } from "./graphql/mutations";
import * as RB from "react-bootstrap";
import "./styles.scss";

const initialState = {
  title: "",
  artist: "",
  album: "",
  cover: "",
  likes: 0,
};

function App() {
  const [newSong, updateNewSong] = useState(initialState);
  const [songs, updateSongs] = useState([]);

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

  async function deleteSong() {
    try {
      await API.graphql(graphqlOperation(deleteSong))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <RB.Form className="mx-auto justify-content-center mt-3 w-50">
        <RB.FormGroup className='mb-2'>
          <RB.FormControl
            value={newSong.title}
            placeholder="title"
            type="text"
            onChange={(e) => setInput("title", e.target.value)}
          />
        </RB.FormGroup>

        <RB.FormGroup className='mb-2'>
          <RB.FormControl
            value={newSong.artist}
            placeholder="artist"
            type="text"
            onChange={(e) => setInput("artist", e.target.value)}
          />
        </RB.FormGroup>

        <RB.FormGroup className='mb-2'>
          <RB.FormControl
            value={newSong.album}
            placeholder="album"
            type="text"
            onChange={(e) => setInput("album", e.target.value)}
          />
        </RB.FormGroup>

        <RB.FormGroup className='mb-2'>
          <RB.FormControl
            value={newSong.cover}
            placeholder="cover"
            type="text"
            onChange={(e) => setInput("cover", e.target.value)}
          />
        </RB.FormGroup>

        <RB.FormGroup className='mb-2'>
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

      <RB.Row className='justify-content-center mt-3'>
        <RB.Col  md={6}>
          {songs.map((song, idx) => (
            <div key={idx} className='w-50 mt-2'>
              <RB.Card className='w-50'>
                <RB.Card.Header>
                  <RB.Image src={song.cover} width="100" alt="" />
                </RB.Card.Header>
                <RB.Card.Body>
                  <span>{song.title}</span>
                </RB.Card.Body>
              </RB.Card>
            </div>
          ))}
        </RB.Col>
      </RB.Row>
    </div>
  );
}

export default withAuthenticator(App);
