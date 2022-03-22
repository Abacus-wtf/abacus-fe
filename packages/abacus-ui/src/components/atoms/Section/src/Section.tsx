import styled from "styled-components";
import { Media } from "@theme";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: ${({ theme }) => theme.colors.utility.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};

  ${Media.sm`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  `}
`;

export default Section;
