import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { Media } from "@theme";
import { Section } from "@atoms";

const Container = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "unset" : "none")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.core.modalBg};
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(40px);
  z-index: ${({ isOpen }) => (isOpen ? "10" : "-1")};
  padding: 12px;
  transition: opacity 0.33s ease, z-index 0.33s ease;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  overflow-y: scroll;

  ${Media.sm`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    padding: 16px;
  `}
`;

const ModalBody = styled.div`
  margin: 0;
  max-width: 1040px;
  height: max-content;
  opacity: 1;
  overflow: auto;
  position: relative;

  ${Media.sm`
    max-height: 90vh;
  `}
`;

type OpenAppModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const OpenAppModal: FunctionComponent<OpenAppModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  useEffect(() => {
    const closeOnEsc = (e: { key: string; code: string }) => {
      if (isOpen && (e.key === "Escape" || e.code === "Escape")) {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeOnEsc);

    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [isOpen, closeModal]);

  return (
    <Container onClick={closeModal} isOpen={isOpen}>
      <ModalBody onClick={preventBubbling}>
        <Section>{children}</Section>
      </ModalBody>
    </Container>
  );
};

export default OpenAppModal;
