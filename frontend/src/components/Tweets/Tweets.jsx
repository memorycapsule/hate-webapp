import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./Tweets.styles";

export const Tweets = () => {
  const [responseData, setResponseData] = useState([]);

//Fetching all comments
  const fetchComment = () => {
    axios
      .get("http://localhost:8000/api")
      .then((result) => {
        setResponseData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log("test");
      });
  };
  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <>
      <S.ContentBox>
        <S.Title>An example use case below. Tweets from trending topcis are taken and the model is applied to see whether they contain hate or not. </S.Title>
      </S.ContentBox>

      <S.Headings>
      <S.TwitterHeadings>
        <S.Title>Tweet text</S.Title>
        <S.Title>Prediction model</S.Title>
      </S.TwitterHeadings>
      <S.TwitterHeadings>
        <S.Title>Tweet text</S.Title>
        <S.Title>Prediction model</S.Title>
      </S.TwitterHeadings>
      </S.Headings>
      <S.CommentParent>
        {responseData.map((responseData) => (
          <S.CommentBox>
            <S.Comment>{responseData.Tweet}</S.Comment>
            <S.Prediction>{responseData.Prediction}</S.Prediction>
          </S.CommentBox>
        ))}
        {!responseData.length && <S.Loading>Loading... </S.Loading>}
      </S.CommentParent>
    </>
  );
};
