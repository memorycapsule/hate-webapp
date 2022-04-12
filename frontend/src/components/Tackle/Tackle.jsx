import React, {useState} from "react";
import axios from 'axios'

import * as S from "./Tackle.styles"

export const Tackle = () => {

  const [inputData, setInputData] = useState('')
  const [responseData, setResponseData] = useState('')




  const onSubmit = () => {
    axios.post('http://localhost:8000/api', {"data": inputData})
    .then( (result) => {
      // handle success
      console.log(result.data)
      setResponseData(result.data)
    })
    .catch( (error) => {
      // handle error
      console.log(error);
    })
  }



  return (<>
    <S.ParentFlex>
    <S.ContentBox>
        <S.Title>Tackle Hate Online</S.Title>
        <S.textBody>With the growth of the world wide web, people have been able to express themselves freely on a wide variety of platforms. In today's situation, freedom of speech has created many issues, having moved past the point of communication to the use of hate speech, resulting in a vicious online culture for all its users, expecially young teens. Solidary is a solution to move toward a safer, cleaner online environment </S.textBody>
        <S.Button>
            How It Works
        </S.Button>
    </S.ContentBox>
    </S.ParentFlex>
    <S.ParentFlex>
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
        <S.Form onSubmit={(e)=>{ e.preventDefault(); onSubmit()}} >
        <S.label>Try this hassle-free demo of our application.        
        </S.label>
        <S.input onChange={(data) => setInputData(data.target.value)} type="text" id="fname" name="fname"></S.input>
        <S.response>
    
            {responseData === 0 ? 'Hate speech' : null}
            {responseData === 1 ? 'Offensive' : null}
            {responseData === 2 ? 'Neither' : null}

        </S.response>
        <S.disclaimer>Note: Please do not enter any personal information.</S.disclaimer>

        </S.Form>

        </S.ContentBox>
    </S.ParentFlex>

  </>);
};


