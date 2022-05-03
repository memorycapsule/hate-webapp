import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as S from "./Tackle.styles";

export const Tackle = () => {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState(false);
  const [color, setColor] = useState("orange");
  const [responseData, setResponseData] = useState("");
  const [selectedModel, setSelectedModel] = useState("Linear SVC");
  console.log(selectedModel);
  const onDisagree = () => {
    axios
      .post("http://localhost:8000/comment/update", {
        word: inputData,
        likes: 0,
      })
      .then((result) => {
        window.location.reload();
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:8000/api", {
        data: inputData,
        model: selectedModel,
      })
      .then((result) => {
        console.log(result.data);
        setResponseData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <S.PageParent>
      <S.HalfPageBox>
        <S.ContentBox>
          <S.Title>Tackle Hate Online</S.Title>
          <S.textBody>
            With the growth of the world wide web, people have been able to
            express themselves freely on a wide variety of platforms. In today's
            situation, freedom of speech has created many issues, having moved
            past the point of communication to the use of hate speech, resulting
            in a vicious online culture for all its users, expecially young
            teens. Solidary is a solution to move toward a safer, cleaner online
            environment{" "}
          </S.textBody>
          <Link to="/how">
            <S.Button>How It Works</S.Button>
          </Link>
        </S.ContentBox>
      </S.HalfPageBox>
      <S.HalfPageBox>
        <S.ContentBox>
          <S.Title>What is Solidarity?</S.Title>
          <S.textBody>
            There are very little commerically availabe hate speech detection
            tools available for use, thus it is not implemented everywhere.
            Solidarity aims to solve this problem by implementing a
            machine-learning based algorithm to detect hateful or abusive words
            from a large dataset. Using state-of-the-art techniques researched
            upon, and implementing features that aim to create a precise,
            accurate, and helpful solution for online hate-speech detection
          </S.textBody>
        </S.ContentBox>
        <S.ContentBox>
          <S.Title>Try it out!</S.Title>
          <S.Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <select onChange={(e) => setSelectedModel(e.target.value)}>
              <option selected value="Linear SVC">
                Linear SVC
              </option>
              <option value="Logistic Regression">Logistic Regression</option>
              <option value="Naive Bayes">Naive Bayes</option>
              <option value="Random Forest">Random Forest</option>
              <option value="MLP">MLP</option>
              <option value="SGDClassifier">SGDClassifier</option>
            </select>
            <S.label>Try this hassle-free demo of our application.</S.label>
            <S.input
              validate={error}
              colour={color}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (!inputData) {
                    event.preventDefault();
                    setError(true);
                  } else {
                    event.preventDefault();
                    setError(false);
                    onSubmit();
                  }
                }
              }}
              onChange={(data) => setInputData(data.target.value)}
              type="text"
              id="fname"
              name="fname"
            ></S.input>
            <S.ResponseBox response={responseData}>
              <S.Response>
                {responseData === 0 ? "Hate speech" : null}
                {responseData === 1 ? "No Hate Speech" : null}
                {responseData === 2 ? "No Hate Speech" : null}
              </S.Response>

              <S.disagreeButton>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure? Your text will be stored in the comment page."
                      )
                    ) {
                      onDisagree();
                    }
                  }}
                >
                  Don't agree?
                </button>
              </S.disagreeButton>
            </S.ResponseBox>
            <S.disclaimer>
              Note: None of the information put into the box is stored.
            </S.disclaimer>
            <S.disclaimer>
              If you disagree with the model output, the text will be added to
              the comments.
            </S.disclaimer>
          </S.Form>
        </S.ContentBox>
      </S.HalfPageBox>
    </S.PageParent>
  );
};
