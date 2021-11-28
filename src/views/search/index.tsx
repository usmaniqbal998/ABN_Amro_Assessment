import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { api } from "../..";
import { TVShowLoader } from "../../components/SekeletonLoaders";
import TvShowCard from "../../components/tvshowcard";
import { device } from "../../styles/devices";
import { searchResponse } from "./types";
import debounce from "lodash.debounce";
import NotFoundIco from "./notfoundIco";

interface SearchViewProps {}

const SearchView: React.FunctionComponent<SearchViewProps> = () => {
  let { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<searchResponse[]>([]);

  useEffect(() => {
    setLoading(true);

    const urlParams = new URLSearchParams(search);
    const searchKeyword = urlParams.get("q");
    if (searchKeyword || searchKeyword === "") debouncedSearch(searchKeyword);
  }, [search]);

  const debouncedSearch = debounce(
    (searchKeyword) => searchShows(searchKeyword),
    400
  );

  async function searchShows(searchQuery: string | null) {
    try {
      const shows = await api.get(`/search/shows?q=${searchQuery}`);
      setSearchResults(shows.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <ListTitle> {searchResults.length !== 0 && "Search Results"}</ListTitle>
      {searchResults.length === 0 && !loading ? (
        <EmptyStateContainer>
          <NotFoundIco />
        </EmptyStateContainer>
      ) : (
        <MainContainer>
          <>
            {loading
              ? Array.from(Array(10).keys()).map((i) => (
                  <TVShowLoader key={i} />
                ))
              : searchResults.map(({ show }) => (
                  <TvShowCard
                    key={show.id}
                    coverImage={show?.image?.medium}
                    title={show.name}
                    summary={show.summary}
                    genres={show.genres}
                    searchCard={true}
                    id={show.id}
                  />
                ))}
          </>
        </MainContainer>
      )}
    </>
  );
};

const ListTitle = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  color: #fff;
  padding-left: 2rem;
  margin-bottom: 8px;

  @media ${device.mobileL} {
    font-size: 1.6rem;
    margin-bottom: 0;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
`;

const MainContainer = styled.div`
  display: grid;
  padding-left: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
  row-gap: 2rem;

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  }
`;

export default SearchView;
