import React, { useContext } from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import { device } from "../../styles/devices";
import { ModalContext } from "../../App";

interface TvShowCardProps {
  coverImage: string;
  title: string;
  summary: string;
  genres?: string[];
  searchCard?: boolean;
  episode?: boolean;
  id: number;
}

interface CardContainerProps {
  searchCard: boolean;
  cardTypeEpisode: boolean;
}
const TvShowCard: React.FunctionComponent<TvShowCardProps> = ({
  coverImage,
  title,
  summary,
  genres,
  searchCard = false,
  episode = false,
  id,
}) => {
  const openModal = useContext(ModalContext);

  function stripHtml(summary: string): string {
    return summary?.replace(/<\/?[^>]+(>|$)/g, "");
  }

  function openDetails() {
    if (!episode)
      openModal({
        open: true,
        showId: id.toString(),
      });
  }

  return (
    <CardContainer
      searchCard={searchCard}
      cardTypeEpisode={episode}
      onClick={openDetails}
    >
      <CardImageContainer>
        <CardImage src={coverImage} />
      </CardImageContainer>
      <ContentContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <AddToListIcon />
        </TitleContainer>
        <GenreContainer>
          {genres?.map((genre) => (
            <GenreChips>{genre}</GenreChips>
          ))}
        </GenreContainer>
        <Summary>{stripHtml(summary)?.slice(0, 70) || ""}</Summary>
        {/* <EpisodesCount>23 Episodes</EpisodesCount> */}
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div<CardContainerProps>`
  position: relative;
  width: ${(props) => !props.searchCard && "23rem"};
  width: ${(props) => props.cardTypeEpisode && "18rem"};

  height: ${(props) => (props.cardTypeEpisode ? "34rem" : "38rem")};
  background-color: #1a242f;
  border-radius: 0.6rem;
  overflow: hidden;
  transition: all 0.22s ease-in;
  display: inline-block;
  margin-right: 1.6rem;

  &:hover {
    border: 3px solid #05a7e1;
    cursor: pointer;
    -webkit-box-shadow: 0px 1px 6px -1px #1a242f;
    box-shadow: 0px 1px 6px -1px #1a242f;
    transform: scale(1.05);
  }

  @media ${device.mobileL} {
    width: ${(props) => !props.searchCard && "14rem"};
    height: 28rem;
    margin-right: 1.2rem;
  }
`;

const CardImageContainer = styled.div`
  height: 62%;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fit-content;
`;

const ContentContainer = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
  white-space: break-spaces;

  @media ${device.mobileL} {
    font-size: 1.2rem;
  }
`;

const AddToListIcon = styled(IoIosAddCircleOutline)`
  color: #fff;
  font-size: 1.8rem;
  &:hover {
    color: #05a7e1;
  }

  @media ${device.mobileL} {
    font-size: 1.4rem;
    padding: 0.6rem;
    box-sizing: content-box;
  }
`;

const GenreContainer = styled.div`
  display: "flex";
`;

const GenreChips = styled.div`
  color: #fff;
  font-size: 11px;
  padding: 0px 4px;
  background-color: #05a7e1;
  border-radius: 4px;
  display: inline-block;
  width: max-content;
  margin-right: 5px;

  @media ${device.mobileL} {
    display: none;
  }
`;

const Summary = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-top: 0.8rem;
  white-space: break-spaces;

  @media ${device.mobileL} {
    font-size: 1rem;
  }
`;

export default TvShowCard;
