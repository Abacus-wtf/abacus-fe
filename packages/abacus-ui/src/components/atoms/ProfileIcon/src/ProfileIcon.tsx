import styled from "styled-components";

export default styled.img.attrs((props) => ({
  alt: "Profile Icon",
  ...props,
}))`
  border-radius: 50%;
  width: 24px;
  height: 24px;
`;
