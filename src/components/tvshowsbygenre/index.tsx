import React, { useEffect, useRef, useState, UIEvent } from "react";
import styled from "styled-components";
import { api } from "../..";
import TvShowCard from "../tvshowcard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { device } from "../../styles/devices";
import {
  TVShowLoader,
  SingleTVShowLoader,
  TextLoader,
} from "../SekeletonLoaders";
import { tvShow } from "./types";

interface TvShowsByGenreProps {
  genre: string;
  title: string;
}

const TvShowsByGenre: React.FunctionComponent<TvShowsByGenreProps> = ({
  genre,
  title,
}) => {
  const [tvShows, setTvShows] = useState<tvShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationEndReached, setPaginationEndReached] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTvShows();
  }, []);

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  async function getTvShows() {
    try {
      const shows = await api.get(`/shows?page=${page}&embed=episodes`);
      filterbyGenre(shows.data, genre);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function filterbyGenre(shows: tvShow[], genre: string) {
    const filteredShows = shows.filter((show: { genres?: string[] }) => {
      return show?.genres?.includes(genre);
    });
    setTvShows([...tvShows, ...filteredShows]); // destructuring because same function is being used by loadMore() also
  }

  function scrollLeft() {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft !== 0 &&
        sliderRef.current.scrollTo({
          left: sliderRef.current.scrollLeft - 400,
          behavior: "smooth",
        });
    }
  }

  function scrollRight() {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft !== sliderRef.current.scrollWidth &&
        sliderRef.current.scrollTo({
          left: sliderRef.current.scrollLeft + 400,
          behavior: "smooth",
        });
    }
  }

  function onSliderReachedEnd(e: UIEvent<HTMLDivElement>) {
    if (sliderRef.current) {
      if (
        sliderRef.current.scrollLeft + sliderRef.current.offsetWidth ===
        e.currentTarget.scrollWidth
      ) {
        if (!paginationEndReached) setPage(page + 1);
      }
    }
  }

  async function loadMore() {
    try {
      const shows = await api.get(`/shows?page=${page}&embed=episodes`);
      filterbyGenre(shows.data, genre);
    } catch (error) {
      console.log(error);
      setPaginationEndReached(true);
    }
  }

  return (
    <MainContainer>
      {loading ? <TextLoader /> : <ListTitle>{title}</ListTitle>}
      <SliderContainer ref={sliderRef} onScroll={onSliderReachedEnd}>
        <>
          {loading
            ? Array.from(Array(10).keys()).map((i) => <TVShowLoader key={i} />)
            : tvShows.map((show: tvShow) => (
                <TvShowCard
                  key={show.id}
                  coverImage={show?.image.medium}
                  title={show.name}
                  summary={show.summary}
                  genres={show.genres}
                  id={show.id}
                />
              ))}
          {!paginationEndReached && <SingleTVShowLoader />}
        </>
      </SliderContainer>
      {!loading && (
        <ArrowLeftContainer onClick={scrollLeft}>
          <SlideLeftIcon />
        </ArrowLeftContainer>
      )}

      {!loading && (
        <ArrowRightContainer onClick={scrollRight}>
          <SliderRightIcon />
        </ArrowRightContainer>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin-top: 1rem;
  position: relative;
`;

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

const SliderContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  padding: 1.2rem 2rem;

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  scrollbar-width: none; /* Firefox */
`;

const ArrowLeftContainer = styled.div`
  position: absolute;
  width: 5rem;
  height: 41rem;
  z-index: 100;
  bottom: 0;
  top: 5rem;
  background-color: rgba(15, 23, 30, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background-color: rgba(15, 23, 30, 0.75);
  }

  @media ${device.mobileL} {
    display: none;
  }
`;

const ArrowRightContainer = styled(ArrowLeftContainer)`
  right: 0;
`;

const SlideLeftIcon = styled(MdKeyboardArrowLeft)`
  color: #fff;
  font-size: 5rem;
`;

const SliderRightIcon = styled(MdKeyboardArrowRight)`
  color: #fff;
  font-size: 5rem;
`;

export default TvShowsByGenre;
