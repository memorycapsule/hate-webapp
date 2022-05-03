import React, { useState } from "react";
import SchoolImage from '../../assets/school.svg'
import WorkImage from '../../assets/work.svg'
import SocialMediaImage from '../../assets/social_media.svg'


import * as S from "./How.styles"


export const How = () => {

  return (<S.PageParent>
    <S.HalfPageBox>

      <S.MainContentParent>
        <S.Title>Machine Learning</S.Title>
        <S.SubTitle>This web application was developed to create an online tool where users can search through text for hate speech. There are not many available tools on the internet to check for hate, so instead Solidarity was created. Four models were rigourously tested: Linear Regression, Random Forest, Naive Bayes, and Linear SVC. These models were tuned, compared against each other using the data from Davidson et al.</S.SubTitle>

      </ S.MainContentParent>
    </ S.HalfPageBox>
    <S.HalfPageBox>

      <S.SubContentParent>
      <S.ImageContainer src={SchoolImage} alt="School image icon" />

        <S.Title>School</S.Title>
        <S.SubTitle>There will be approximately this much text in hereThere will be approximately this much text in hereThere will be approximately this much text in hereThere will be approximately this much text in here</S.SubTitle>

      </S.SubContentParent>

      <S.SubContentParent>
      <S.ImageContainer src={WorkImage} alt="School image icon" />

        <S.Title>Work</S.Title>
        <S.SubTitle>There will be approximately this much text in hereThere will be approximately this much text in hereThere will be approximately this much text in hereThere will be approximately this much text in here</S.SubTitle>

      </S.SubContentParent>

      <S.SubContentParent>
      <S.ImageContainer src={SocialMediaImage} alt="School image icon" />
        
        <S.Title>Social Media</S.Title>
        <S.SubTitle>There will be approximately this much text in hereThere will be approximately this much text in hereThere will be approximately this much text in hereThere will be approximately this much text in here</S.SubTitle>

      </S.SubContentParent>


    </ S.HalfPageBox>



  </ S.PageParent>);
};


