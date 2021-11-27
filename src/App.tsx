import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";

import NavBar from "./components/navbar";
import SearchView from "./views/search";
import BrowseShows from "./views/browse";
import styled from "styled-components";

function App() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  function changeQuerySearchParams(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    history.push({
      pathname: "/search",
      search: new URLSearchParams({ q: e.target.value }).toString(),
    });
  }

  return (
    <div className="App">
      <NavBar
        searchText={searchText}
        onSearchTextChanged={changeQuerySearchParams}
      />
      <Main>
        <Switch>
          <Route path="/search" component={SearchView} />
          <Route path="/browse" component={BrowseShows} />
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
