import { useState, useEffect } from "react";
import * as RB from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listSongs } from "../../graphql/queries";
import { createSong, deleteSong } from "../../graphql/mutations";
import UpdateModal from "./homecomponents/UpdateModal";
import MusicCards from "./homecomponents/MusicCards";
import Form from "./homecomponents/Form";
import { classNames } from "../lib";
import "../../index.scss";
import Search from "./homecomponents/Search";

export default function Home() {
  const initialState = {
    title: "",
    artist: "",
    album: "",
    cover: "",
    likes: "",
  };

  const [newSong, updateNewSong] = useState(initialState);
  const [songs, updateSongs] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [refresh, updateRefresh] = useState(false);
  const [selectedSong, setSelectedSong] = useState(0);

  const songIndex = songs.findIndex((s, index) => index === selectedSong);

  const getData = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listSongs));
      const { items } = data.listSongs;
      updateSongs(items);
    } catch (error) {
      console.log("Error occured while contacting db", error);
    }
  };

  function setInput(key, value) {
    updateNewSong({ ...newSong, [key]: value });
  }

  // Create a new song
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

  // Delete existing song by index
  async function delSong(idx) {
    try {
      const song = songs[idx];

      delete song.title;
      delete song.artist;
      delete song.album;
      delete song.cover;
      delete song.likes;
      delete song.createdAt;
      delete song.updatedAt;
      delete song.owner;

      await API.graphql(graphqlOperation(deleteSong, { input: song }));
      updateRefresh(true);
      updateNewSong(initialState);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <RB.Row id="home" className="justify-content-center mt-3">
      <RB.Col md={4}>
        <Form setInput={setInput} newSong={newSong} addSong={addSong} />
      </RB.Col>

      <RB.Col md={7} className="main-feed">
        <Search updateSongs={updateSongs} />
        <div className='musicCards'>
          {songs.map((song, idx) => (
            <MusicCards
              music={classNames.map((cls) => cls.className)}
              key={idx}
              song={song}
              index={idx}
              delSong={delSong}
              setSmShow={setSmShow}
              setSelectedSong={setSelectedSong}
            />
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
        </div>
      </RB.Col>
    </RB.Row>
  );
}
