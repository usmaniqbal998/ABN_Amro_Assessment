import React, { useEffect } from "react";
import { api } from "./index";

function App() {
  useEffect(() => {
    api.get("/shows").then((data) => {
      console.log(data);
    });
  }, []);
  return <div className="App"></div>;
}

export default App;
