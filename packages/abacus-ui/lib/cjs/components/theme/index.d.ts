import { css } from "styled-components";
declare const defaultTheme: {
    readonly colors: {
        readonly core: {
            readonly primary: "#1C2333";
            readonly 900: "rgba(28, 35, 51, 0.72)";
            readonly 800: "rgba(28, 35, 51, 0.6)";
            readonly 700: "rgba(28, 35, 51, 0.4)";
            readonly border: "rgba(28, 35, 51, 0.04)";
            readonly lightWhite: "rgba(255, 255, 255, 0.8)";
            readonly white: "white";
            readonly semiTitle: "#1C2333";
            readonly background: "#E5E5E5";
            readonly modalBg: "rgba(98, 101, 101, 0.7)";
            readonly label: "rgba(26, 26, 26, 0.04)";
        };
        readonly button: {
            readonly secondary: "rgba(28, 35, 51, 0.04)";
            readonly primary: "#1A1A1A";
            readonly gray: "rgb(220,220,220)";
        };
        readonly utility: {
            readonly green: "#23CE7C";
            readonly purple: "#8673FF";
            readonly blue: "#3E74FF";
            readonly red: "#F33636";
            readonly yellow: "#FFC93E";
            readonly white: "#FFFFFF";
            readonly gray: "#CCCCCC";
            readonly black: "#000000";
            readonly brown: "#964B00";
        };
    };
    readonly layout: {
        readonly maxWidth: "800px";
    };
    readonly borderRadius: {
        readonly main: "10px";
        readonly section: "26px";
        readonly progressBar: "24px";
    };
    readonly boxShadow: {
        readonly button: "0px 5px 60px rgba(0, 0, 0, 0.1)";
        readonly main: "0px 2px 0px #f6f6f6";
        readonly alt: "0px 2px 0px #6b6b6b";
        readonly section: "0px 2px 32px rgba(0, 0, 0, 0.06)";
    };
    readonly padding: {
        readonly main: "16px 24px";
    };
    readonly transitionTime: {
        readonly main: "0.3s";
    };
    readonly copy: {
        readonly pico: {};
        readonly nano: {
            readonly "font-size": "10px";
            readonly "line-height": "132%";
        };
        readonly micro: {
            readonly "font-size": "12px";
            readonly "line-height": "132%";
        };
        readonly milli: {
            readonly "font-size": "14px";
            readonly "line-height": "132%";
        };
        readonly kilo: {
            readonly "font-size": "16px";
            readonly "line-height": "132%";
        };
        readonly mega: {
            readonly "font-size": "20px";
            readonly "line-height": "132%";
        };
        readonly giga: {
            readonly "font-size": "24px";
            readonly "line-height": "132%";
        };
        readonly tera: {
            readonly "font-size": "28px";
            readonly "line-height": "132%";
        };
        readonly peta: {
            readonly "font-size": "32px";
            readonly "line-height": "132%";
        };
        readonly exa: {
            readonly "font-size": "38px";
            readonly "line-height": "132%";
        };
        readonly zetta: {
            readonly "font-size": "42px";
            readonly "line-height": "120%";
        };
        readonly yotta: {
            readonly "font-size": "52px";
            readonly "line-height": "120%";
        };
        readonly nina: {
            readonly "font-size": "62px";
            readonly "line-height": "120%";
        };
        readonly tena: {
            readonly "font-size": "72px";
            readonly "line-height": "120%";
        };
    };
};
export declare type Theme = typeof defaultTheme;
export declare type WithTheme = {
    theme: Theme;
};
export declare const FontImport: () => import("styled-components").FlattenSimpleInterpolation;
export declare const Font: (size?: string, fontFamily?: string) => import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<import("styled-components").DefaultTheme>>;
declare enum Sizes {
    SMALL = "sm",
    MEDIUM = "md",
    LARGE = "lg",
    XLARGE = "xl"
}
export declare const breakpoints: {
    size: Sizes;
    value: string;
}[];
export declare const Media: {
    [breakpoint in Sizes]: typeof css;
};
export default defaultTheme;
