import React from "react";
import * as S from "./Navbar.styles"

export const Navbar = () => {
  // <S.title>HELLO</S.title>
  return (<>
    <S.nav>
      <div><S.Title>Solidarity</S.Title>
        </div>
        <div>
      <S.sub>How it works</S.sub>
      <S.sub>Why</S.sub>
      <S.sub>Implement</S.sub>
      </div>
    </S.nav>
  </>);
};

