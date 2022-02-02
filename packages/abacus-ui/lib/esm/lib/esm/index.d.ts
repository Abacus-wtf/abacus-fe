declare function Abacus(_a: any): React.ReactSVGElement;
export function Button(_a: any): React.DOMElement<{
    buttonType: any;
    disabled: any;
    onClick: any;
}, Element>;
export var ButtonType: any;
declare var Container$h: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export function Flex(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
export function Font(size: any, fontFamily: any): import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<import("styled-components").DefaultTheme>>;
export function FontImport(): import("styled-components").FlattenSimpleInterpolation;
declare var Container$g: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare var Container$f: import("styled-components").StyledComponent<"h1", import("styled-components").DefaultTheme, {}, never>;
declare var Container$e: import("styled-components").StyledComponent<"h2", import("styled-components").DefaultTheme, {}, never>;
declare var Container$d: import("styled-components").StyledComponent<"h3", import("styled-components").DefaultTheme, {}, never>;
declare var Container$c: import("styled-components").StyledComponent<"h4", import("styled-components").DefaultTheme, {}, never>;
declare var Container$b: import("styled-components").StyledComponent<"h5", import("styled-components").DefaultTheme, {}, never>;
declare var StyledH6: import("styled-components").StyledComponent<"h6", import("styled-components").DefaultTheme, {}, never>;
export function Infographic(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
export function Input(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
declare var StyledDiv: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export function Logo(_a: any): React.DOMElement<{
    onClick: any;
}, Element>;
export var Media: any;
declare var Container$j: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare var Container$a: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export function MiniList(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
export function Navbar(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
declare var StyledP: import("styled-components").StyledComponent<"p", import("styled-components").DefaultTheme, {}, never>;
declare var Container$9: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export function Section(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
export function SessionCard(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
declare var Container$8: import("styled-components").StyledComponent<"small", import("styled-components").DefaultTheme, {}, never>;
export function SocialLinks(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
export function SplitSection(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
export function StatInfo(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
declare var Container$7: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export function VisuallyHidden(_a: any): React.DOMElement<React.DOMAttributes<Element>, Element>;
declare var Container$6: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
declare var Container$5: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export var breakpoints: {
    size: string;
    value: string;
}[];
export namespace defaultTheme {
    export namespace colors {
        export const core: {
            primary: string;
            900: string;
            800: string;
            700: string;
            border: string;
            lightWhite: string;
            white: string;
        };
        export namespace button {
            export const secondary: string;
            export const primary: string;
        }
        export namespace utility {
            export const green: string;
            export const purple: string;
            export const blue: string;
            export const red: string;
            export const yellow: string;
            export const white: string;
            export const black: string;
        }
    }
    export namespace layout {
        export const maxWidth: string;
    }
    export namespace borderRadius {
        export const main: string;
        export const section: string;
    }
    export namespace boxShadow {
        const button_1: string;
        export { button_1 as button };
        const main_1: string;
        export { main_1 as main };
        export const alt: string;
        const section_1: string;
        export { section_1 as section };
    }
    export namespace padding {
        const main_2: string;
        export { main_2 as main };
    }
    export namespace transitionTime {
        const main_3: string;
        export { main_3 as main };
    }
    export namespace copy {
        export const pico: {};
        export const nano: {};
        export const micro: {};
        export const milli: {
            "font-size": string;
            "line-height": string;
        };
        export const kilo: {
            "font-size": string;
            "line-height": string;
        };
        export const mega: {
            "font-size": string;
            "line-height": string;
        };
        export const giga: {
            "font-size": string;
            "line-height": string;
        };
        export const tera: {
            "font-size": string;
            "line-height": string;
        };
        export const peta: {
            "font-size": string;
            "line-height": string;
        };
        export const exa: {
            "font-size": string;
            "line-height": string;
        };
        export const zetta: {
            "font-size": string;
            "line-height": string;
        };
        export const yotta: {
            "font-size": string;
            "line-height": string;
        };
        export const nina: {
            "font-size": string;
            "line-height": string;
        };
        export const tena: {
            "font-size": string;
            "line-height": string;
        };
    }
}
import React from "react";
export { Abacus as AbacusIcon, Container$h as Exa, Container$g as Giga, Container$f as H1, Container$e as H2, Container$d as H3, Container$c as H4, Container$b as H5, StyledH6 as H6, StyledDiv as Kilo, Container$j as Mega, Container$a as Milli, StyledP as P, Container$9 as Peta, Container$8 as Small, Container$7 as Tera, Container$6 as Yotta, Container$5 as Zetta };
