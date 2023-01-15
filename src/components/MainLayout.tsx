import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const StyledDiv = styled.div`
  background-image: url("https://www.thesun.co.uk/wp-content/uploads/2023/01/League-of-Legends-key-art.jpg");
  /* filter: blur(8px);
  -webkit-filter: blur(8px); */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainLayout = (props: { children: ReactNode }): JSX.Element => {
  const { children } = props;
  return (
    <StyledDiv>
      <Navbar />
      {children}
    </StyledDiv>
  );
};

export default MainLayout;
