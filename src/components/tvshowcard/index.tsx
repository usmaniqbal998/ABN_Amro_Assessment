import React from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
import { device } from "../../styles/devices";

interface TvShowCardProps {
  coverImage: string;
  title: string;
  summary: string;
  genres: string[];
}

const TvShowCard: React.FunctionComponent<TvShowCardProps> = ({
  coverImage,
  title,
  summary,
  genres,
}) => {
  function stripHtml(summary: string): string {
    return summary.replace(/<\/?[^>]+(>|$)/g, "");
  }

  return (
    <CardContainer>
      <CardImageContainer>
        <CardImage src={coverImage} />
      </CardImageContainer>
      <ContentContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <AddToListIcon />
        </TitleContainer>
        <GenreContainer>
          {genres.map((genre) => (
            <GenreChips>genre</GenreChips>
          ))}
        </GenreContainer>
        <Summary>{stripHtml(summary).slice(0, 70)}</Summary>
        {/* <EpisodesCount>23 Episodes</EpisodesCount> */}
      </ContentContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  width: 23rem;
  height: 38rem;
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
    width: 14rem;
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

const EpisodesCount = styled.div`
  color: #fff;
  font-size: 1.2rem;
  padding: 0px 4px;
  background-color: #05a7e1;
  border-radius: 4px;
  display: inline-block;
  width: max-content;
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;

  @media ${device.mobileL} {
    display: none;
  }
`;

export default TvShowCard;
