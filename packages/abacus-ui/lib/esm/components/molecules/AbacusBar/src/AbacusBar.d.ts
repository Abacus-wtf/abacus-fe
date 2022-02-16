import { FunctionComponent } from "react";
declare type AbacusBarProps = {
    currentPosition: number;
    totalNumberOfBeads: number;
    changeToPosition: (newPosition: number) => void;
};
declare const AbacusBar: FunctionComponent<AbacusBarProps>;
export default AbacusBar;
