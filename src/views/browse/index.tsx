import React from "react";
import TvShowsByGenre from "../../components/tvshowsbygenre";

interface BrowseShowsProps {}

const BrowseShows: React.FunctionComponent<BrowseShowsProps> = (props) => {
  return (
    <>
      <TvShowsByGenre genre="Science-Fiction" title="Sci-Fi Series" />
      <TvShowsByGenre genre="Crime" title="Trending Crime Shows" />
      <TvShowsByGenre genre="Drama" title="Top Drama Tv Shows" />
    </>
  );
};

export default BrowseShows;
