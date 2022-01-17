import * as React from "react";

type DummyProps = {
  foo: string;
};

const Dummy = ({ foo }: DummyProps) => (
  <>
    <div>Dummy</div>
    <p>{foo}</p>
    <p>Hello!</p>
  </>
);

export default Dummy;
