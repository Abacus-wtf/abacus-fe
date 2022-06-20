import styled from "styled-components";

const Pill = styled.span`
  padding: 8px 14px;
  border-radius: 70px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  width: max-content;
`;

export default Pill;
