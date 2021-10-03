import { css } from "utils";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { getSnapshot } from "mobx-state-tree";
import { useRoot } from "store/Root";



export const PutButton: React.FC = () => {
  const root = useRoot();
  return <button
    onClick={async () => {
      const snap = getSnapshot(root);
      const snapStr = JSON.stringify(snap, undefined, 4);
      await axios.put(`${API_ROUTE}/posts/${"1"}`, {
        id: 1,
        content: snapStr,
        author_id: 1,
        title: 'test state 1'
      })
    }}
  >
    Update
  </button>
}


const Home: React.FC = () => {
  const root = useRoot();
  return <div css={css({ margin: "20px" })} >
    <h2>Мир вашему дому!</h2>
    <PutButton/>
  </div >
}


export default Home;