import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { api } from "../..";
import TvShowCard from "../tvshowcard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { device } from "../../styles/devices";
import { PostLoader, TextLoader } from "../SekeletonLoaders";

interface TvShowsByGenreProps {
  genre: string;
  title: string;
}

const TvShowsByGenre: React.FunctionComponent<TvShowsByGenreProps> = ({
  genre,
  title,
}) => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTvShows();
  }, []);

  async function getTvShows() {
    try {
      const shows = await api.get("/shows?page=1&embed=episodes");
      filterbyGenre(shows.data, genre);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function filterbyGenre(shows: any, genre: string) {
    const filteredShows = shows.filter((show: { genres?: string[] }) => {
      return show?.genres?.includes(genre);
    });

    setTvShows(filteredShows);
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

  return (
    <MainContainer>
      {loading ? <TextLoader /> : <ListTitle>{title}</ListTitle>}
      <SliderContainer ref={sliderRef}>
        {loading
          ? Array.from(Array(10).keys()).map((i) => <PostLoader key={i} />)
          : tvShows.map(
              (show: {
                id: string;
                image: { medium: string };
                name: string;
                summary: string;
                genres: string[];
              }) => (
                <TvShowCard
                  key={show.id}
                  coverImage={show?.image.medium}
                  title={show.name}
                  summary={show.summary}
                  genres={show.genres}
                />
              )
            )}
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
