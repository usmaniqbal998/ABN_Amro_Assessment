import React from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect, useHistory } from "react-router";

import NavBar from "./components/navbar";
import SearchView from "./views/search";
import BrowseShows from "./views/browse";
import styled from "styled-components";

function App() {
  const history = useHistory();

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

  return (
    <div className="App">
      <NavBar onSearchTextChanged={changeQuerySearchParams} />
      <Main>
        <Switch>
          <Route path="/search" component={SearchView} />
          <Route path="/browse" component={BrowseShows} />
          <Route path="/" component={BrowseShows}>
            <Redirect to="/browse" />
          </Route>
        </Switch>
      </Main>
    </div>
  );
}

const Main = styled.div`
  max-width: 180rem;
  margin: 2rem auto;
`;

export default App;
