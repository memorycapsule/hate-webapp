import styled from "styled-components";

export const Title = styled.a`
  font-size: 30px;
  justify-content: center;
`;

export const Button = styled.button`
  appearance: none;
  background-color: #fcca40;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  font-size: 16px;
  margin: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  min-height: 16px;
  min-width: 32px;
`;

export const PageParent = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

export const HalfPageBox = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: center;
  color: white;
  width: 100vw;
`;
export const textBody = styled.p`
  text-align: center;
  width: 70%;
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 40%;
`;
export const Form = styled.form``;
export const label = styled.label`
  display: flex;
`;
export const input = styled.textarea`
  height: 200px;
  width: 400px;
  resize: none;
  outline: none;
  border-color: ${(props) => (props.validate ? "red" : "transparent")};
`;
export const ResponseBox = styled.div`
  display: flex;
  justify-content: space-between;

  height: 30px;
  width: 100%;
  background-color: ${(props) => (props.response ? "green" : "#fcca40")};
`;

export const Response = styled.div`
  display: flex;
  color: black;
`;

export const disclaimer = styled.p`
  font-style: italic;
  font-size: 12px;
  align-self: flex-start;
`;

export const disagreeButton = styled.div`
  display: flex;
  justify-self: flex-end;
  align-self: center;
  padding-right: 1rem;
`;
