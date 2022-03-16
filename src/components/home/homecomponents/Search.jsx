import { useState, useEffect } from 'react'
import * as RB from 'react-bootstrap'
import { API, graphqlOperation } from "aws-amplify";
import listSongs from '../../../graphql/queries'

export default function Search({ updateSongs }) {

    const [query, updateQuery] = useState('')

    async function search(query) {
        try {
            const { data } = await API.graphql(graphqlOperation(listSongs))
            const { item } = data.listSongs
            updateSongs(item)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        search()
    }, [query])

  return (
    <div>
        <RB.FormControl
            value={query}
            className='search'
            onChange={(e) => updateQuery(e.target.value)} 
            placeholder="Search" />
    </div>
  )
}
