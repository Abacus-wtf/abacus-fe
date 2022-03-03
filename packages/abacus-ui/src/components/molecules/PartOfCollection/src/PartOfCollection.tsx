import { OpenseaObject } from "components/atoms/OpenseaObject";
import { CardWithTitle } from "components/molecules/CardWithTitle";
import _ from "lodash";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type PartOfCollectionProps = {
  openseaObjects: {
    src: string;
    link: string;
  }[];
};

const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  grid-gap: 20px;
`;

const PartOfCollection: FunctionComponent<PartOfCollectionProps> = ({
  openseaObjects,
}) => (
  <CardWithTitle style={{ height: "fit-content" }} title="Part of Collection">
    <Container>
      {_.map(openseaObjects, (openseaObject) => (
        <OpenseaObject key={openseaObject.link} {...openseaObject} />
      ))}
    </Container>
  </CardWithTitle>
);

export default PartOfCollection;
