import React, { useState } from "react";
import SchoolImage from "../../assets/school.svg";
import WorkImage from "../../assets/work.svg";
import SocialMediaImage from "../../assets/social_media.svg";

import * as S from "./How.styles";

export const How = () => {
  return (
    <S.PageParent>
      <S.HalfPageBox>
        <S.MainContentParent>
          <S.Title>Machine Learning</S.Title>
          <S.SubTitle>
            This web application was developed to create an online tool where
            users can search through text for hate speech. There are not many
            available tools on the internet to check for hate, so instead
            Solidarity was created. Four models were rigourously tested: Linear
            Regression, Random Forest, Naive Bayes, and Linear SVC. These models
            were tuned, compared against each other using the data from Twitter.
          </S.SubTitle>
        </S.MainContentParent>
      </S.HalfPageBox>
      <S.HalfPageBox>
        <S.SubContentParent>
          <S.ImageContainer src={SchoolImage} alt="School image icon" />

          <S.Title>School</S.Title>
          <S.SubTitle>
            An example use case of Solidarity is applying it to academic forums
            or chat groups. With the breakout of Covid-19, online education
            became more popular. Solidarity could be used to prevent harmful
            language used in lesson chat rooms.
          </S.SubTitle>
        </S.SubContentParent>

        <S.SubContentParent>
          <S.ImageContainer src={WorkImage} alt="Work image icon" />

          <S.Title>Work</S.Title>
          <S.SubTitle>
            Solidarity could also be used in work environment. Often, emails are
            sent around in the company, and Solidarity could be used to prevent
            hate speech in emails or published business documents.
          </S.SubTitle>
        </S.SubContentParent>

        <S.SubContentParent>
          <S.ImageContainer src={SocialMediaImage} alt="Social Media image icon" />

          <S.Title>Social Media</S.Title>
          <S.SubTitle>
            Large social media platforms have many tools implemented for hate
            speech prevention. Solidarity could be used for smalelr social media
            sites so that they can also prevent hate speech.
          </S.SubTitle>
        </S.SubContentParent>
      </S.HalfPageBox>
    </S.PageParent>
  );
};
