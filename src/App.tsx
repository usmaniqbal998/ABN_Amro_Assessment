import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect, useHistory } from "react-router";

import NavBar from "./components/navbar";
import SearchView from "./views/search";
import BrowseShows from "./views/browse";
import styled from "styled-components";
import ShowDetail from "./views/showDetail";
import useModal from "./hooks/useModal";

export const ModalContext = React.createContext(
  (args: { open: boolean; showId: string }) => {}
);

function App() {
  const history = useHistory();
  const { modalData, setModalData } = useModal();

  React.useEffect(() => {
    history.listen((location, action) => {
      if (action === "POP") {
        history.replace("/browse");
      }
    });
  });

  function changeQuerySearchParams(e: React.ChangeEvent<HTMLInputElement>) {
    history.push({
      pathname: "/search",
      search: new URLSearchParams({ q: e.target.value }).toString(),
    });
  }

  function openModal(args: { open: boolean; showId: string }) {
    setModalData(args);
  }

  return (
    <div className="App">
      <NavBar onSearchTextChanged={changeQuerySearchParams} />
      <ModalContext.Provider value={openModal}>
        <Main>
          <Switch>
            <Route path="/search" component={SearchView} />
            <Route path="/browse" component={BrowseShows} />
            <Route path="/" component={BrowseShows}>
              <Redirect to="/browse" />
            </Route>
          </Switch>
        </Main>
      </ModalContext.Provider>
      <ShowDetail modalData={modalData} onClose={openModal} />
    </div>
  );
}

const Main = styled.div`
  max-width: 180rem;
  margin: 2rem auto;
`;

export default App;
