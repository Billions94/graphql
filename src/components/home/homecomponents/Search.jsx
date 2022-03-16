import { useState, useEffect } from "react";
import * as RB from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listSongs } from "../../../graphql/queries";

export default function Search({ updateSongs }) {
  const [query, updateQuery] = useState("");

  async function search() {
    try {
      const { data } = await API.graphql(graphqlOperation(listSongs));
      const { items } = data.listSongs;
      const filteredItems = items.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase())
      })
      updateSongs(filteredItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <RB.FormControl
        value={query}
        className="search"
        onChange={(e) => updateQuery(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
}
