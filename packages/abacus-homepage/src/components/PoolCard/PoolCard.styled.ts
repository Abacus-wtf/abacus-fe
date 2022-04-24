import { Kilo, Mega } from "abacus-ui"
import styled from "styled-components"

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`

export const Image = styled.img`
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  width: 100%;
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`

export const Info = styled.div<{ right?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ right }) => (right ? "flex-end" : "flex-start")};
`

export const InfoData = styled(Mega)`
  font-size: 22px;
`

export const InfoTitle = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`
