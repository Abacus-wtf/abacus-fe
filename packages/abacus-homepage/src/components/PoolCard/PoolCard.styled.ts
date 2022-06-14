import { Kilo, Mega } from "abacus-ui"
import styled from "styled-components"

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
  width: 100%;
`

export const Image = styled.img`
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  width: 100%;
  max-width: 310px;
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

export const NumNFTsPill = styled.span`
  padding: 8px 14px;
  border-radius: 70px;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  width: max-content;
  position: absolute;
  top: 24px;
  right: 24px;
`
