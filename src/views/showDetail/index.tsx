import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import TvShowCard from "../../components/tvshowcard";
import { api } from "../..";
import { DetailsLoader, TVShowLoader } from "../../components/SekeletonLoaders";
import { device } from "../../styles/devices";

interface episode {
  id: number;
  name: string;
  image: {
    medium: string;
  };
  summary: string;
}

interface tvshow {
  name: string;
  image: {
    medium: string;
  };
  summary: string;
  _embedded: {
    episodes: episode[];
  };
}

interface ShowDetailProps {
  modalData: {
    showId: string;
    open: boolean;
  };
  onClose: (args: { showId: string; open: boolean }) => void;
}

const ShowDetail: React.FunctionComponent<ShowDetailProps> = ({
  modalData,
  onClose,
}) => {
  const [TvShow, setTvShow] = useState<tvshow>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalData.showId) {
      setLoading(true);
      fetchShowData();
    }
  }, [modalData]);

  async function fetchShowData() {
    try {
      const show = await api.get(`/shows/${modalData.showId}?embed=episodes`);
      setTvShow(show.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function stripHtml(summary: string | undefined): string {
    if (typeof summary === "string")
      return summary?.replace(/<\/?[^>]+(>|$)/g, "");
    return "";
  }

  function closeModal() {
    onClose({ open: false, showId: "" });
  }

  if (!modalData.open) return null;

  return ReactDom.createPortal(
    <>
      <Overlay>
        <ModalContainer>
          <ActionBar>
            <CloseIcon onClick={closeModal} />
          </ActionBar>
          {loading ? (
            <DetailsLoader />
          ) : (
            <ShowDetailsContainer>
              <TvShowImage src={TvShow?.image?.medium} />
              <Details>
                <Title>{TvShow?.name}</Title>
                <Summary>
                  {TvShow?.summary && stripHtml(TvShow?.summary)}
                </Summary>
              </Details>
            </ShowDetailsContainer>
          )}
          <Etitle>Previous Episodes</Etitle>
          <SliderContainer>
            {loading
              ? Array.from(Array(5).keys()).map((i) => <TVShowLoader key={i} />)
              : TvShow?._embedded?.episodes?.map((episode: episode) => (
                  <TvShowCard
                    key={episode.id}
                    coverImage={episode?.image?.medium}
                    title={episode.name}
                    summary={episode.summary}
                    episode
                    id={episode.id}
                  />
                ))}
          </SliderContainer>
        </ModalContainer>
      </Overlay>
    </>,
    document.getElementById("detailsModal")!
  );
};

const ActionBar = styled.div`
  height: 2.4rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const ModalContainer = styled.div`
  padding: 1.6rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1a242f;
  z-index: 100;
  width: 50vw;
  transform-origin: center;
  border-radius: 0.5rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  scrollbar-width: none; /* Firefox */

  @media ${device.laptopsSmall} {
    width: 70vw;
  }

  @media ${device.tablets} {
    width: 80vw;
  }

  @media ${device.mobileL} {
    width: 100vw;
    top: 0%;
    left: 0%;
    transform: translate(0%, 0%);
    overflow: auto;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #10171e85;
  z-index: 100;

  @media ${device.mobileL} {
    overflow: auto;
  }
`;

const TvShowImage = styled.img`
  height: 30rem;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
  margin-right: 1.8rem;

  @media ${device.mobileL} {
    float: unset;
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-top: 2rem;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 2.4rem;
  font-weight: 500;
  text-align: left;

  @media ${device.mobileL} {
    float: unset;
    font-size: 1.6rem;
  }
`;

const ShowDetailsContainer = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

const Etitle = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  margin-top: 2.4rem;
  color: #fff;

  @media ${device.mobileL} {
    font-size: 1.6rem;
    margin-top: 1.6rem;
  }
`;

const Details = styled.div`
  margin-left: 1.6rem;

  @media ${device.mobileL} {
    margin-left: 0;
    margin-top: 1.6rem;
  }
`;

const Summary = styled.p`
  text-align: justify;
  color: #fff;
  font-size: 1.4rem;
  margin-top: 1.4rem;
  line-height: 2.4rem;

  @media ${device.mobileL} {
    font-size: 1.2rem;
    line-height: 2rem;
  }
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.2rem;
  color: #fff;
  &:hover {
    color: #05a7e1;
    cursor: pointer;
  }
`;

const SliderContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  padding: 1.6rem;

  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  scrollbar-width: none; /* Firefox */
`;

export default ShowDetail;
