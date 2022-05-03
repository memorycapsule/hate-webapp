import React, { useState, useEffect } from "react";
import axios from 'axios'
import * as S from "./Dashboard.styles"

export const Dashboard = () => {
  const [inputData, setInputData] = useState('')
  const [responseData, setResponseData] = useState([])
  const [blur, setBlur] = useState(true)


  //Posting comments
  const fetchComment = () => {
    axios.get('http://localhost:8000/comment/update')
      .then((result) => {
        // handle success
        setResponseData(result.data)
        console.log(result.data)
      })
      .catch((error) => {
        // handle error
        console.log("test");
      })
  }
  useEffect(() => {
    fetchComment();
  }, []);

  const onSubmit = () => {
    axios.post('http://localhost:8000/comment/update', { "word": inputData, "likes": 0 })
      .then((result) => {
        // handle success
        window.location.reload();
        console.log(result.data)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const onLike = (comment, likes) => {
    axios.post('http://localhost:8000/comment/update', { "word": comment, "likes": likes })
      .then((result) => {
        // handle success
        fetchComment();
        console.log(result.data)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }
  return (<>
    {blur && <S.BlurText>

      This page may contain offensive language. Press anywhere to continue or use the navigation bar
    </S.BlurText>}
    <S.BlurOverLay onClick={() => setBlur(false)} blur={blur}>






      <S.ContentBox>
        <S.Title>
          Please post any feedback below. </S.Title>
          <S.input onKeyDown={event => {if(event.key === 'Enter') {event.preventDefault(); onSubmit();}} } onChange={(data) => setInputData(data.target.value)} type="text" id="fname" name="fname"></S.input>
        <S.disclaimer>Note: Sensitive language is used in some of the comments.</S.disclaimer>

      </S.ContentBox>
      <S.CommentParent>
        {responseData.map((responseData) => (
          <S.CommentBox>
            <S.Comment>
              {responseData.word}
            </S.Comment>
            <S.LikeCounter>
              {responseData.likes}
            </S.LikeCounter>
            <S.LikeButton>
              <button onClick={() => onLike(responseData.word, responseData.likes + 1)}> Like </button>
            </S.LikeButton>
          </S.CommentBox>
        ))}
      </S.CommentParent>


    </S.BlurOverLay>

  </>);
};


