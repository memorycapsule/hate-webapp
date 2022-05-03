import styled from "styled-components";
import { Link } from "react-router-dom";

export const nav = styled.div`
  justify-content: space-between;
  padding: 20px;
  display: flex;
  gap: 0.5rem;
  > * {
    &:first-child {
      flex: 0.95;
    }
  }
  color: #ffffff;
  font-size: 30px;
  background-color: #2f2f2f;
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
`;

export const linked = styled(Link)`
  justify-content: space-between;
  color: #ffffff;
  font-size: 30px;
  background-color: #2f2f2f;
  text-decoration: none;

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;
