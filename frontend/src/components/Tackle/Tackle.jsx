import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


import * as S from "./Tackle.styles"

export const Tackle = () => {

  const [inputData, setInputData] = useState('')
  const [responseData, setResponseData] = useState('')
  const [selectedModel, setSelectedModel] = useState('Linear SVC')

  console.log(selectedModel)



  //YO

  const onSubmit = () => {
    axios.post('http://localhost:8000/api', { "data": inputData, "model": selectedModel })
      .then((result) => {
        // handle success
        console.log(result.data)
        setResponseData(result.data)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }
  return (

    <S.PageParent>

    <S.HalfPageBox>
      <S.ContentBox>
        <S.Title>Tackle Hate Online</S.Title>
        <S.textBody>With the growth of the world wide web, people have been able to express themselves freely on a wide variety of platforms. In today's situation, freedom of speech has created many issues, having moved past the point of communication to the use of hate speech, resulting in a vicious online culture for all its users, expecially young teens. Solidary is a solution to move toward a safer, cleaner online environment </S.textBody>
        <Link to="/how"><S.Button>
          How It Works
        </S.Button>
        </Link>
      </S.ContentBox>
    </S.HalfPageBox>
    <S.HalfPageBox>
      <S.ContentBox>
        <S.Title>
          What is Solidarity?
        </S.Title>
        <S.textBody>
          There are very little commerically availabe hate speech detection tools available for use, thus it is not implemented everywhere.
          Solidarity aims to solve this problem by implementing a machine-learning based algorithm to detect hateful or abusive words from a large dataset. Using state-of-the-art techniques researched upon, and implementing features that aim to create a precise, accurate, and helpful solution for online hate-speech detection

        </S.textBody>
      </S.ContentBox>
      <S.ContentBox>
        <S.Title>
          Try it out!
        </S.Title>
        <S.Form onSubmit={(e) => { e.preventDefault();}} >
          <select onChange={e => setSelectedModel(e.target.value)}>
          <option selected value="Linear SVC
">Linear SVC
            </option>
            <option value="Logistic Regression
">Logistic Regression
            </option>
            
            <option value="Naive Bayes
">Naive Bayes
            </option>
            <option value="Random Forest
">Random Forest
            </option>
            <option value="MLP
">MLP
            </option>
            <option value="SGDClassifier
">SGDClassifier
            </option>
          </select>
          <S.label>Try this hassle-free demo of our application.
          </S.label>

          <S.input onKeyDown={event => {if(event.key === 'Enter') {event.preventDefault(); onSubmit();}} } onChange={(data) => setInputData(data.target.value)} type="text" id="fname" name="fname"></S.input>
          <S.response>

            {responseData === 0 ? 'Hate speech' : null}
            {responseData === 1 ? 'No Hate Speech' : null}
            {responseData === 2 ? 'No Hate Speech' : null}

          </S.response>
          <S.disclaimer>Note: None of the information put into the box is stored.</S.disclaimer>

        </S.Form>

      </S.ContentBox>
    </S.HalfPageBox>

    </S.PageParent>);
};


