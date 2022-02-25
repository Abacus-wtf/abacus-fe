import { FunctionComponent } from "react";
declare type AbacusBarProps = {
    currentPosition: number;
    totalNumberOfBeads: number;
    changeToPosition: (newPosition: number) => void;
    loading?: boolean;
};
declare const AbacusBar: FunctionComponent<AbacusBarProps>;
export default AbacusBar;
