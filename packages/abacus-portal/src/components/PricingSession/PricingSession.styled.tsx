import styled from "styled-components"
import { Media } from "abacus-ui"

export const Container = styled.div`
  display: grid;
  width: 100%;

  ${Media.sm`
    grid-template-columns: 45% 55%;
  `};
`

export const LeftHalf = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 20px;

  ${Media.lg`
    padding: 28px 64px;
  `}
`

export const RightHalf = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 20px;
  padding: 20px 0;

  ${Media.sm`
    padding: 8px;
    padding-top: 0px;
    padding-left: 28px;
  `}

  ${Media.lg`
    padding-top: 22px;
  `}
`

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`

export const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`
