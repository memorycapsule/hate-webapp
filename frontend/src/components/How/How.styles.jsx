import styled from "styled-components";

export const PageParent = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

export const HalfPageBox = styled.div`
  display: flex;
  flex: 0.5;  
  flex-direction: row;
  justify-content: space-evenly;
  @media only screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;

}

`;

export const MainContentParent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 26rem;
  @media only screen and (max-width: 600px) {
  max-width: 90vw;
}
`;

export const SubContentParent = styled.div`
display: flex;
flex-direction: column;
max-width: 16rem;

@media only screen and (max-width: 600px) {
  max-width: 90vw;
}

`;


export const ImageContainer = styled.img`
display: flex;
object-fit: contain ;
max-height: 8rem;

`;

export const Title = styled.h1`
display: flex;
flex: 0.1;
flex-direction: column;
color: white;
text-align: center;

`;

export const SubTitle = styled.p`
display: flex;
flex: 0.8;
flex-direction: column;

color: white;
text-align: center;

`;

