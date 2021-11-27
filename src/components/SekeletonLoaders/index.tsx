import React from "react";
import styled, { keyframes } from "styled-components";
import { device } from "../../styles/devices";

export function TextLoader() {
  return <TextLoading></TextLoading>;
}

export function PostLoader() {
  return (
    <Card>
      <ImageLoading />
      <TitleLoading />
      <SubTitleLoading />
    </Card>
  );
}

const SkeletonAnimation = keyframes`
 0% { background-color: hsl(211deg 29% 14%) }
 100% { background-color: hsl(211deg 29% 24%) }
`;

const TextLoading = styled.div`
  height: 1.8rem;
  width: 16rem;
  margin-left: 2rem;
  animation: ${SkeletonAnimation} 1s linear infinite alternate;
`;

const Card = styled.div`
  display: flex;
  width: 23rem;
  margin-right: 1.6rem;
  flex-direction: column;
  display: inline-block;

  @media ${device.mobileL} {
    width: 14rem;
    margin-right: 1.2rem;
  }
`;

const ImageLoading = styled.div`
  height: 50%;
  animation: ${SkeletonAnimation} 1s linear infinite alternate;
  height: 15rem;
`;

const TitleLoading = styled.div`
  height: 1.8rem;
  width: 12rem;
  animation: ${SkeletonAnimation} 1s linear infinite alternate;
  margin-top: 1.6rem;

  @media ${device.mobileL} {
    width: 8rem;
  }
`;

const SubTitleLoading = styled.div`
  height: 1.8rem;
  width: 16rem;
  animation: ${SkeletonAnimation} 1s linear infinite alternate;
  margin-top: 1.2rem;

  @media ${device.mobileL} {
    width: 12rem;
  }
`;
