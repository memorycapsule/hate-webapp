import React from "react";
import * as S from "./Navbar.styles";

export const Navbar = () => {
  return (
    //Links to pages in navbar
    <S.nav>
      <S.linked to="/"> Solidarity </S.linked>
      <S.linked to="/How"> How </S.linked>
      <S.linked to="/Tweets"> Use Case </S.linked>
      <S.linked to="/Dashboard"> Comments </S.linked>
    </S.nav>
  );
};
