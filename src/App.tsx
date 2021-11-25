import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";

import NavBar from "./components/navbar";
import SearchView from "./views/search";
import { api } from "./index";

function App() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    api.get("/shows").then((data) => {
      console.log(data);
    });
  }, []);

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

      <Switch>
        <Route path="/search" component={SearchView} />
      </Switch>
    </div>
  );
}

export default App;
