import { Media } from "@theme";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  background: ${({ theme }) => theme.colors.utility.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};

  ${Media.md`
    padding: 20px;
  `}
`;

export default Section;
