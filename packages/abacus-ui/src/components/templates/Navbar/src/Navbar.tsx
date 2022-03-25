import React, { FunctionComponent } from "react";
import styled from "styled-components";

type NavbarProps = {
  children: JSX.Element;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Navbar: FunctionComponent<NavbarProps> = ({ children }) => (
  <Container>{children}</Container>
);

export default Navbar;
