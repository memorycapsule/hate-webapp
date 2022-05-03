import styled from "styled-components";

export const BlurOverLay = styled.div`
${props => props.blur ? `-webkit-filter: blur(6px);  
  filter: blur(6px);` : ``};
`;

export const BlurText = styled.p`
    display: flex;
    font-size: 26px;
    position: absolute;
    color: white;
    top: 50%;
    left: 20%;
    justify-self: center;
    align-self: center;
    z-index: 55;
`
export const Title = styled.p`
    font-size: 15px;
    justify-content: center;
    margin: 3rem;
    color: white;
`
export const ParentFlex = styled.div`
    display: flex;
    justify-content: left;
    color: white;
    width: 100vw;
    height: 40%;
`
export const textBody = styled.p`
    text-align: left;
    width:70%;
`;

export const ContentBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 30vh;
    margin-left: 3rem;
`;
export const Form = styled.form`

`;
export const label = styled.label`
display: flex;

`;
export const input = styled.textarea`
height: 110px;
width: 500px;
background-color: lightgray;
resize:none;
outline: none;


`;
export const response = styled.div`
height: 30px;
width: 100%;
background-color: #fcca40;
`;

export const disclaimer = styled.p`
font-style: italic;
font-size: 12px;
align-self: center;
color: white;;
`;


export const CommentParent = styled.div`
display: flex;
flex-direction: column;
margin-left: 3rem;
align-items: center;
@media only screen and (max-width: 600px) {
  width: 100vw;

}
`;

export const CommentBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 1rem;
background-color: #2f2f2f;
border-radius: 25px;
padding: 0.75rem;
min-width: 50%;

`;

export const Comment = styled.div`
color: white;
flex: 0.5;
font-size: 24px;
padding-left: 3rem;
`;

export const LikeCounter = styled.div`
color: white;
flex: 0.25;
font-size: 24px;
`;

export const LikeButton = styled.div`
display: flex;
flex: 0.2;
justify-content: flex-end;
padding-right: 3rem;

`;