import styled from "styled-components";



export const Title = styled.a`
    font-size: 30px;
    justify-content: center;
`

export const Button = styled.button`



  appearance: none;
  background-color: #fcca40;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  line-height: normal;
  margin: 0;
  min-height: 16px;
  min-width: 32px;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;


:disabled {
  pointer-events: none;
}

:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

:active {
  box-shadow: none;
  transform: translateY(0);
}
`

export const ParentFlex = styled.div`
    display: flex;
    justify-content: center;
    color: white;
    width: 100vw;
    height: 40%;
`
export const textBody = styled.p`
    text-align: left;
    width:70%
`

export const ContentBox = styled.div`

    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 40%;
`
export const Form = styled.form`

`
export const label = styled.label`
display: flex;

`
export const input = styled.input`
height: 200px;
width: 400px;
`
export const response = styled.div`
height: 30px;
width: 100%;
background-color: #fcca40;
`

export const disclaimer = styled.p`
font-style: italic;
font-size: 12px;
align-self: flex-start;`