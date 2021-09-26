import React from 'react';
import localforage from 'localforage';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import theme from "css/theme";
import Root from "store/Root";
import { persist } from 'mst-persist';
import { observer } from 'mobx-react-lite';
import Goer from 'store/Goer';
import { useAsync } from "react-async";
// import forumStore from 'forum/store/index';


// async function getRoot() {
//   const root = Root.create({}, { goer: new Goer() });
//   await Promise.all([
//     persist('tabata', root, { storage: localforage, jsonify: false, blacklist: ["ui", "tmp", "selected"] }),
//     persist(`tabata.ui`, root.ui, { storage: localforage, jsonify: false, blacklist: ["navMenuIsCollapsed"] }),
//     persist(`tabata.selected`, root.selected, { storage: localforage, jsonify: false })
//   ]);
//   return root;
// }

const Providers: React.FC = ({ children }) => {
  // const { data, error, isPending } = useAsync({ promiseFn: getRoot })
  // if (isPending) return <h1>Загрузка...</h1>
  // if (error) throw error;
  // if (data) 
  return <>
    <Provider
    // root={data} store={forumStore}
    >
      <ThemeProvider
        theme={{}}
      >
        {children}
      </ThemeProvider>
    </Provider>
  </>;
  return <h1>Whoops!!! Something defaul has happend!!! It was supposed imposible!!!</h1>
}

export default observer(Providers);