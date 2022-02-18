import React, { useContext, useState } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import CrossfadeImage from 'react-crossfade-image';
import Countdown from 'react-countdown';
import _ from 'lodash';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

/* eslint-disable no-bitwise */
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
var getUniqueId = function (elementType) {
    return elementType + "-" + uuid();
};

var defaultTheme = {
    colors: {
        core: {
            primary: "#1C2333",
            900: "rgba(28, 35, 51, 0.72)",
            800: "rgba(28, 35, 51, 0.6)",
            700: "rgba(28, 35, 51, 0.4)",
            border: "rgba(28, 35, 51, 0.04)",
            lightWhite: "rgba(255, 255, 255, 0.8)",
            white: "white",
            semiTitle: "#1C2333",
            background: "#E5E5E5",
        },
        button: {
            secondary: "rgba(28, 35, 51, 0.04)",
            primary: "#1A1A1A",
        },
        utility: {
            green: "#23CE7C",
            purple: "#8673FF",
            blue: "#3E74FF",
            red: "#F33636",
            yellow: "#FFC93E",
            white: "#FFFFFF",
            gray: "#CCCCCC",
            black: "#000000",
            brown: "#964B00",
        },
    },
    layout: {
        maxWidth: "800px",
    },
    borderRadius: {
        main: "10px",
        section: "26px",
    },
    boxShadow: {
        button: "0px 5px 60px rgba(0, 0, 0, 0.1)",
        main: "0px 2px 0px #f6f6f6",
        alt: "0px 2px 0px #6b6b6b",
        section: "0px 2px 32px rgba(0, 0, 0, 0.06)",
    },
    padding: {
        main: "16px 24px",
    },
    transitionTime: {
        main: "0.3s",
    },
    copy: {
        // https://learn-the-web.algonquindesign.ca/topics/typografier-cheat-sheet/
        pico: {},
        nano: {
            "font-size": "10px",
            "line-height": "132%",
        },
        micro: {
            "font-size": "12px",
            "line-height": "132%",
        },
        milli: {
            "font-size": "14px",
            "line-height": "132%",
        },
        kilo: {
            "font-size": "16px",
            "line-height": "132%",
        },
        mega: {
            "font-size": "20px",
            "line-height": "132%",
        },
        giga: {
            "font-size": "24px",
            "line-height": "132%",
        },
        tera: {
            "font-size": "28px",
            "line-height": "132%",
        },
        peta: {
            "font-size": "32px",
            "line-height": "132%",
        },
        exa: {
            "font-size": "38px",
            "line-height": "132%",
        },
        zetta: {
            "font-size": "42px",
            "line-height": "120%",
        },
        yotta: {
            "font-size": "52px",
            "line-height": "120%",
        },
        nina: {
            "font-size": "62px",
            "line-height": "120%",
        },
        tena: {
            "font-size": "72px",
            "line-height": "120%",
        },
    },
};
var FontImport = function () { return css(templateObject_1$M || (templateObject_1$M = __makeTemplateObject(["\n  @import url(\"https://rsms.me/inter/inter.css\");\n"], ["\n  @import url(\"https://rsms.me/inter/inter.css\");\n"]))); };
var Font = function (size, fontFamily) {
    if (size === void 0) { size = "kilo"; }
    if (fontFamily === void 0) { fontFamily = "Inter"; }
    return css(templateObject_2$l || (templateObject_2$l = __makeTemplateObject(["\n  font-family: \"", "\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  ", ";\n"], ["\n  font-family: \"", "\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  ",
        ";\n"])), fontFamily, function (_a) {
        var theme = _a.theme;
        return (theme === null || theme === void 0 ? void 0 : theme.copy) ? theme.copy[size] : defaultTheme.copy[size];
    });
};
var Sizes;
(function (Sizes) {
    Sizes["SMALL"] = "sm";
    Sizes["MEDIUM"] = "md";
    Sizes["LARGE"] = "lg";
    Sizes["XLARGE"] = "xl";
})(Sizes || (Sizes = {}));
var breakpoints = [
    { size: "xl", value: "2000px" },
    { size: "lg", value: "1200px" },
    { size: "md", value: "885px" },
    { size: "sm", value: "600px" },
];
var Media = breakpoints.reduce(function (accumulator, _a) {
    var _b;
    var size = _a.size, value = _a.value;
    var nextMedia = function (first) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        return css(templateObject_3$f || (templateObject_3$f = __makeTemplateObject(["\n      @media (min-width: ", ") {\n        ", ";\n      }\n    "], ["\n      @media (min-width: ", ") {\n        ", ";\n      }\n    "])), value, css.apply(void 0, __spreadArrays([first], interpolations)));
    };
    return __assign(__assign({}, accumulator), (_b = {}, _b[size] = nextMedia, _b));
}, {
    sm: css,
    md: css,
    lg: css,
    xl: css,
});
var templateObject_1$M, templateObject_2$l, templateObject_3$f;

var InputContainer = styled.div(templateObject_1$L || (templateObject_1$L = __makeTemplateObject(["\n  background-color: white;\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0px 2px 0px #f6f6f6;\n\n  &:focus-within {\n    box-shadow: 0px 2px 0px #6b6b6b;\n  }\n"], ["\n  background-color: white;\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0px 2px 0px #f6f6f6;\n\n  &:focus-within {\n    box-shadow: 0px 2px 0px #6b6b6b;\n  }\n"])));
var StyledLabel$1 = styled.label(templateObject_2$k || (templateObject_2$k = __makeTemplateObject(["\n  ", "\n  text-align: center;\n  background-color: ", ";\n  padding: 10px;\n  height: calc(100% - 17px);\n  margin: 8.5px 0;\n  border-radius: ", ";\n"], ["\n  ", "\n  text-align: center;\n  background-color: ", ";\n  padding: 10px;\n  height: calc(100% - 17px);\n  margin: 8.5px 0;\n  border-radius: ", ";\n"])), Font("milli"), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.main;
});
var StyledInput$1 = styled.input(templateObject_3$e || (templateObject_3$e = __makeTemplateObject(["\n  ", "\n  border: none;\n  outline: none;\n  padding: 0;\n  width: 100%;\n"], ["\n  ", "\n  border: none;\n  outline: none;\n  padding: 0;\n  width: 100%;\n"])), Font("mega"));
var Input = function (_a) {
    var value = _a.value, onChange = _a.onChange, type = _a.type, label = _a.label, name = _a.name, id = _a.id;
    var ID = typeof id === "string" ? id : getUniqueId("input");
    return (React.createElement(InputContainer, null,
        typeof label === "string" && label && (React.createElement(StyledLabel$1, { htmlFor: ID }, label)),
        React.createElement(StyledInput$1, { id: ID, name: name, value: value, type: type, onChange: function (e) { return onChange(e.target.value); } })));
};
var templateObject_1$L, templateObject_2$k, templateObject_3$e;

var Container$A = styled.section(templateObject_2$j || (templateObject_2$j = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 20px;\n  background: ", ";\n  box-shadow: ", ";\n  border-radius: ", ";\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 20px;\n  background: ", ";\n  box-shadow: ", ";\n  border-radius: ", ";\n\n  ",
    "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, Media.sm(templateObject_1$K || (templateObject_1$K = __makeTemplateObject(["\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n  "], ["\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n  "]))));
var Section = function (_a) {
    var children = _a.children;
    return (React.createElement(Container$A, null, children));
};
var templateObject_1$K, templateObject_2$j;

var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["Standard"] = 0] = "Standard";
    ButtonType[ButtonType["White"] = 1] = "White";
    ButtonType[ButtonType["Clear"] = 2] = "Clear";
})(ButtonType || (ButtonType = {}));
var Button = styled.button(templateObject_1$J || (templateObject_1$J = __makeTemplateObject(["\n  ", "\n  text-decoration: none;\n  border-radius: ", ";\n  padding: ", ";\n  box-shadow: ", ";\n  border: none;\n  cursor: pointer;\n  transition: ", ";\n  color: ", ";\n  background-color: ", ";\n  width: max-content;\n  height: min-content;\n\n  &:hover {\n    opacity: 0.6;\n    box-shadow: none;\n  }\n"], ["\n  ", "\n  text-decoration: none;\n  border-radius: ", ";\n  padding: ", ";\n  box-shadow: ",
    ";\n  border: none;\n  cursor: pointer;\n  transition: ", ";\n  color: ",
    ";\n  background-color: ",
    ";\n  width: max-content;\n  height: min-content;\n\n  &:hover {\n    opacity: 0.6;\n    box-shadow: none;\n  }\n"])), Font(), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.padding.main;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === ButtonType.Clear ? "none" : theme.boxShadow.button;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === ButtonType.White
        ? theme.colors.button.primary
        : theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === ButtonType.Clear
        ? "transparent"
        : buttonType === ButtonType.White
            ? theme.colors.core.white
            : theme.colors.utility.blue;
});
var templateObject_1$J;

var StyledDiv = styled.div(templateObject_1$I || (templateObject_1$I = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$I;

var Container$z = styled.div(templateObject_1$H || (templateObject_1$H = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 10px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 10px;\n"])));
var MiniContainer = styled.div(templateObject_2$i || (templateObject_2$i = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
var StyledKilo = styled(StyledDiv)(templateObject_3$d || (templateObject_3$d = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Divider$3 = styled.div(templateObject_4$8 || (templateObject_4$8 = __makeTemplateObject(["\n  background: #ffffff;\n  opacity: 0.1;\n  height: 2px;\n  width: 100%;\n"], ["\n  background: #ffffff;\n  opacity: 0.1;\n  height: 2px;\n  width: 100%;\n"])));
var MiniList = function (_a) {
    var info = _a.info;
    return (React.createElement(Container$z, null, Object.entries(info).map(function (_a, index) {
        var key = _a[0], value = _a[1];
        return (React.createElement(React.Fragment, { key: key },
            React.createElement(MiniContainer, null,
                React.createElement(StyledKilo, null,
                    React.createElement("b", null, key)),
                React.createElement(StyledKilo, null, value)),
            index !== Object.entries(info).length - 1 ? React.createElement(Divider$3, null) : null));
    })));
};
var templateObject_1$H, templateObject_2$i, templateObject_3$d, templateObject_4$8;

var Container$y = styled.span(templateObject_1$G || (templateObject_1$G = __makeTemplateObject(["\n  border: 0px;\n  clip: rect(0px, 0px, 0px, 0px);\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  padding: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  position: absolute;\n"], ["\n  border: 0px;\n  clip: rect(0px, 0px, 0px, 0px);\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  padding: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  position: absolute;\n"])));
var VisuallyHidden = function (_a) {
    var children = _a.children;
    return (React.createElement(Container$y, null, children));
};
var templateObject_1$G;

var Container$x = styled.div(templateObject_1$F || (templateObject_1$F = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"])));
var Flex = function (_a) {
    var children = _a.children;
    return (React.createElement(Container$x, null, children));
};
var templateObject_1$F;

var ImageContainer$1 = styled.div(templateObject_1$E || (templateObject_1$E = __makeTemplateObject(["\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  background-color: ", ";\n  border-radius: ", ";\n"], ["\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  background-color: ", ";\n  border-radius: ",
    ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme, enableFullBorderRadius = _a.enableFullBorderRadius;
    return enableFullBorderRadius ? theme.borderRadius.section : 0;
});
var ExploreImage = function (_a) {
    var imgSrc = _a.imgSrc, enableFullBorderRadius = _a.enableFullBorderRadius, onClick = _a.onClick;
    var theme = useContext(ThemeContext);
    var _b = useState(false), hover = _b[0], setHover = _b[1];
    return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    React.createElement(ImageContainer$1, { enableFullBorderRadius: true, onClick: onClick, onPointerOver: function () { return setHover(true); }, onPointerOut: function () { return setHover(false); } },
        React.createElement(CrossfadeImage, { src: imgSrc, enableFullBorderRadius: enableFullBorderRadius || false, alt: "Featured Explorer", style: {
                cursor: onClick !== undefined ? "pointer" : "default",
                maxWidth: "auto",
                maxHeight: "auto",
                width: "100%",
                borderRadius: enableFullBorderRadius ? theme.borderRadius.section : 0,
                borderTopLeftRadius: theme.borderRadius.section,
                borderTopRightRadius: theme.borderRadius.section,
                transition: theme.transitionTime.main,
                transform: hover && onClick !== undefined ? "scale(1.10)" : "scale(1)",
            } })));
};
var templateObject_1$E;

var Container$w = styled.div(templateObject_1$D || (templateObject_1$D = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("exa"));
var templateObject_1$D;

var Container$v = styled.div(templateObject_1$C || (templateObject_1$C = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("giga"));
var templateObject_1$C;

var Container$u = styled.h1(templateObject_1$B || (templateObject_1$B = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("exa"));
var templateObject_1$B;

var Container$t = styled.h2(templateObject_1$A || (templateObject_1$A = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("peta"));
var templateObject_1$A;

var Container$s = styled.h3(templateObject_1$z || (templateObject_1$z = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("tera"));
var templateObject_1$z;

var Container$r = styled.h4(templateObject_1$y || (templateObject_1$y = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("giga"));
var templateObject_1$y;

var Container$q = styled.h5(templateObject_1$x || (templateObject_1$x = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("mega"));
var templateObject_1$x;

var StyledH6 = styled.h6(templateObject_1$w || (templateObject_1$w = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$w;

var Container$p = styled.div(templateObject_1$v || (templateObject_1$v = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), Font("mega"));
var templateObject_1$v;

var Container$o = styled.div(templateObject_1$u || (templateObject_1$u = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("milli"));
var templateObject_1$u;

var StyledP = styled.p(templateObject_1$t || (templateObject_1$t = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$t;

var Container$n = styled.div(templateObject_1$s || (templateObject_1$s = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("peta"));
var templateObject_1$s;

var Container$m = styled.small(templateObject_1$r || (templateObject_1$r = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("milli"));
var templateObject_1$r;

var Container$l = styled.div(templateObject_1$q || (templateObject_1$q = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("tera"));
var templateObject_1$q;

var Container$k = styled.div(templateObject_1$p || (templateObject_1$p = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("yotta"));
var templateObject_1$p;

var Container$j = styled.div(templateObject_1$o || (templateObject_1$o = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("zetta"));
var templateObject_1$o;

var IndivContainer = styled.div(templateObject_1$n || (templateObject_1$n = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-right: 30px;\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-right: 30px;\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n"])));
var Text = styled(StyledDiv)(templateObject_3$c || (templateObject_3$c = __makeTemplateObject(["\n  ", "\n  margin-bottom: 6px;\n"], ["\n  ",
    "\n  margin-bottom: 6px;\n"])), Media.md(templateObject_2$h || (templateObject_2$h = __makeTemplateObject(["\n    font-size: 18px;\n  "], ["\n    font-size: 18px;\n  "]))));
var Subtext = styled(Container$o)(templateObject_5$5 || (templateObject_5$5 = __makeTemplateObject(["\n  ", "\n  color: ", ";\n\n  ", "\n"], ["\n  ", "\n  color: ", ";\n\n  ",
    "\n"])), Font("nano"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
}, Media.md(templateObject_4$7 || (templateObject_4$7 = __makeTemplateObject(["\n  ", "\n  "], ["\n  ", "\n  "])), Font("milli")));
var SessionCountdown = function (_a) {
    var endTime = _a.endTime;
    return (React.createElement(Countdown, { date: endTime, renderer: function (_a) {
            var hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, completed = _a.completed;
            if (completed) {
                return React.createElement(Text, null, "Session Completed");
            }
            return (React.createElement("div", { style: { display: "flex" } },
                React.createElement(IndivContainer, null,
                    React.createElement(Text, null, hours),
                    React.createElement(Subtext, null, "Hours")),
                React.createElement(IndivContainer, null,
                    React.createElement(Text, null, minutes),
                    React.createElement(Subtext, null, "Minutes")),
                React.createElement(IndivContainer, null,
                    React.createElement(Text, null, seconds),
                    React.createElement(Subtext, null, "Seconds"))));
        } }));
};
var templateObject_1$n, templateObject_2$h, templateObject_3$c, templateObject_4$7, templateObject_5$5;

// You probably want to change this to something semantic or abandon it all together
var Container$i = styled.div(templateObject_1$m || (templateObject_1$m = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: ", ";\n  align-items: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: ", ";\n  align-items: ", ";\n"])), function (_a) {
    var isCardBar = _a.isCardBar;
    return (isCardBar ? "5px" : "10px");
}, function (_a) {
    var isCardBar = _a.isCardBar;
    return (isCardBar ? "flex-start" : "center");
});
var BoldenKilo = styled(StyledDiv)(templateObject_3$b || (templateObject_3$b = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 600;\n  ", "\n\n  ", "\n"], ["\n  color: ",
    ";\n  font-weight: 600;\n  ", "\n\n  ",
    "\n"])), function (_a) {
    var theme = _a.theme, isCardBar = _a.isCardBar;
    return isCardBar ? theme.colors.core[900] : "black";
}, Font("micro"), Media.md(templateObject_2$g || (templateObject_2$g = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("kilo")));
var StyledGiga = styled(Container$v)(templateObject_5$4 || (templateObject_5$4 = __makeTemplateObject(["\n  color: ", ";\n  ", ";\n\n  ", "\n\n  ", "\n"], ["\n  color: ",
    ";\n  ", ";\n\n  ", "\n\n  ",
    "\n"])), function (_a) {
    var theme = _a.theme, isCardBar = _a.isCardBar;
    return isCardBar ? theme.colors.core[900] : "black";
}, function (_a) {
    var isCardBar = _a.isCardBar;
    return Font(isCardBar ? "mega" : "giga");
}, Font("mega"), Media.md(templateObject_4$6 || (templateObject_4$6 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("giga")));
var ColoredKilo = styled(StyledDiv)(templateObject_7$3 || (templateObject_7$3 = __makeTemplateObject(["\n  color: ", ";\n\n  ", "\n\n  ", "\n"], ["\n  color: ", ";\n\n  ", "\n\n  ",
    "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
}, Font("micro"), Media.md(templateObject_6$4 || (templateObject_6$4 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("kilo")));
var ExploreInfo = function (_a) {
    var title = _a.title, text = _a.text, unit = _a.unit, isCardBar = _a.isCardBar;
    return (React.createElement(Container$i, { isCardBar: isCardBar || false },
        React.createElement(BoldenKilo, { isCardBar: isCardBar || false }, title),
        React.createElement(StyledGiga, { isCardBar: isCardBar || false }, text),
        unit ? React.createElement(ColoredKilo, null, unit) : null));
};
var templateObject_1$m, templateObject_2$g, templateObject_3$b, templateObject_4$6, templateObject_5$4, templateObject_6$4, templateObject_7$3;

var ProfileIcon = styled.img.attrs(function (props) { return ({
    alt: "Profile Icon",
    ...props,
}); })(templateObject_1$l || (templateObject_1$l = __makeTemplateObject(["\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n"], ["\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n"])));
var templateObject_1$l;

// You probably want to change this to something semantic or abandon it all together
var Container$h = styled.div(templateObject_1$k || (templateObject_1$k = __makeTemplateObject(["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n  width: ", ";\n  height: fit-content;\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n"], ["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n  width: ", ";\n  height: fit-content;\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
}, function (_a) {
    var isHalfScreen = _a.isHalfScreen;
    return (isHalfScreen ? "50%" : "100%");
});
var CardBackground = function (_a) {
    var children = _a.children, isHalfScreen = _a.isHalfScreen, style = _a.style;
    return (React.createElement(Container$h, { style: __assign({}, style), isHalfScreen: isHalfScreen || false }, children));
};
var templateObject_1$k;

// You probably want to change this to something semantic or abandon it all together
var Container$g = styled.div(templateObject_1$j || (templateObject_1$j = __makeTemplateObject(["\n  margin: 0;\n  position: relative;\n  width: min-content;\n  margin-right: 6px;\n  margin-bottom: 12px;\n"], ["\n  margin: 0;\n  position: relative;\n  width: min-content;\n  margin-right: 6px;\n  margin-bottom: 12px;\n"])));
var StyledLabel = styled.label(templateObject_2$f || (templateObject_2$f = __makeTemplateObject(["\n  ", ";\n  cursor: pointer;\n  z-index: 1;\n  display: block;\n  border: 2px solid ", ";\n  border-radius: 70px;\n  padding: 8px 14px;\n  text-align: center;\n  position: relative;\n  background-color: ", ";\n"], ["\n  ", ";\n  cursor: pointer;\n  z-index: 1;\n  display: block;\n  border: 2px solid ", ";\n  border-radius: 70px;\n  padding: 8px 14px;\n  text-align: center;\n  position: relative;\n  background-color: ", ";\n"])), Font(), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var StyledInput = styled.input(templateObject_3$a || (templateObject_3$a = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: -1;\n\n  &:checked ~ ", " {\n    border: 2px solid ", ";\n  }\n\n  &:focus ~ ", " {\n    outline: 1px solid ", ";\n  }\n"], ["\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: -1;\n\n  &:checked ~ ", " {\n    border: 2px solid ", ";\n  }\n\n  &:focus ~ ", " {\n    outline: 1px solid ", ";\n  }\n"])), StyledLabel, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
}, StyledLabel, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var Checkbox = function (_a) {
    var checked = _a.checked, label = _a.label, name = _a.name, onChange = _a.onChange;
    return (React.createElement(Container$g, null,
        React.createElement(StyledInput, { type: "checkbox", id: name, name: name, value: name, checked: checked, onChange: onChange }),
        React.createElement(StyledLabel, { htmlFor: name }, label)));
};
var templateObject_1$j, templateObject_2$f, templateObject_3$a;

var Abacus = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "white" : _b;
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("rect", { width: "20", height: "1", rx: "0.5", transform: "matrix(1 0 0 -1 0 3.75)", fill: fill }),
        React.createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 17.5 3)", fill: fill }),
        React.createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 10 3)", fill: fill }),
        React.createElement("rect", { width: "20", height: "1", rx: "0.5", transform: "matrix(1 0 0 -1 0 10.75)", fill: fill }),
        React.createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 10 10)", fill: fill }),
        React.createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 2.5 10)", fill: fill }),
        React.createElement("rect", { width: "20", height: "1", rx: "0.5", transform: "matrix(1 0 0 -1 0 17.75)", fill: fill }),
        React.createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 17.5 17)", fill: fill }),
        React.createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 2.5 17)", fill: fill })));
};

var AbacusCrowds = function (_a) {
    var _b = _a.stroke, stroke = _b === void 0 ? "white" : _b;
    return (React.createElement("svg", { width: "58", height: "58", viewBox: "0 0 58 58", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("rect", { x: "2.41667", y: "2.41667", width: "21.75", height: "21.75", rx: "10.875", stroke: stroke, strokeWidth: "4.83333" }),
        React.createElement("rect", { x: "33.8333", y: "2.41667", width: "21.75", height: "21.75", rx: "10.875", stroke: stroke, strokeWidth: "4.83333" }),
        React.createElement("rect", { x: "2.41667", y: "33.8333", width: "21.75", height: "21.75", rx: "10.875", stroke: stroke, strokeWidth: "4.83333" }),
        React.createElement("rect", { x: "33.8333", y: "33.8333", width: "21.75", height: "21.75", rx: "10.875", stroke: stroke, strokeWidth: "4.83333" })));
};

var AbacusSpot = function (_a) {
    var _b = _a.stroke, stroke = _b === void 0 ? "white" : _b;
    return (React.createElement("svg", { width: "58", height: "58", viewBox: "0 0 58 58", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("rect", { x: "2.41667", y: "2.41667", width: "53.1667", height: "53.1667", rx: "26.5833", stroke: stroke, strokeWidth: "4.83333" }),
        React.createElement("rect", { x: "16.4167", y: "16.4167", width: "25.1667", height: "25.1667", rx: "12.5833", stroke: stroke, strokeWidth: "4.83333" })));
};

var Dropdown = function (_a) {
    var _b = _a.stroke, stroke = _b === void 0 ? "#1C2333" : _b, rest = __rest(_a, ["stroke"]);
    return (React.createElement("svg", __assign({ width: "14", height: "8", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, rest),
        React.createElement("path", { d: "M13 1 7 7 1 1", stroke: stroke, strokeOpacity: ".72", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
};

var Extras = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#1C2333" : _b;
    return (React.createElement("svg", { width: "24", height: "24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("circle", { cx: "5", cy: "12", r: "2", fill: fill }),
        React.createElement("circle", { cx: "12", cy: "12", r: "2", fill: fill }),
        React.createElement("circle", { cx: "19", cy: "12", r: "2", fill: fill })));
};

var PetaModified = styled.div(templateObject_1$i || (templateObject_1$i = __makeTemplateObject(["\n  ", ";\n  margin-left: 8px;\n  color: ", ";\n"], ["\n  ", ";\n  margin-left: 8px;\n  color: ",
    ";\n"])), Font("peta", "Bluu Next"), function (_a) {
    var isDark = _a.isDark, theme = _a.theme;
    return isDark ? theme.colors.core.white : theme.colors.button.primary;
});
var Container$f = styled.div(templateObject_2$e || (templateObject_2$e = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  transition: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  transition: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var Logo = function (_a) {
    var onClick = _a.onClick, _b = _a.isDark, isDark = _b === void 0 ? false : _b;
    return (React.createElement(Container$f, { onClick: onClick },
        React.createElement(Abacus, { fill: isDark ? "white" : "black" }),
        React.createElement(PetaModified, { isDark: isDark }, "Abacus")));
};
var templateObject_1$i, templateObject_2$e;

var Container$e = styled.div(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: fit-content;\n"])));
var StatText = styled.div(templateObject_2$d || (templateObject_2$d = __makeTemplateObject(["\n  ", ";\n  color: ", ";\n  text-align: center;\n  display: flex;\n  justify-content: center;\n"], ["\n  ", ";\n  color: ", ";\n  text-align: center;\n  display: flex;\n  justify-content: center;\n"])), Font("tena", "Bluu Next"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Title$1 = styled(Container$p)(templateObject_3$9 || (templateObject_3$9 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n"], ["\n  color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var StatInfo = function (_a) {
    var stat = _a.stat, title = _a.title, _b = _a.showEthIcon, showEthIcon = _b === void 0 ? false : _b, className = _a.className;
    return (React.createElement(Container$e, { className: className },
        React.createElement(StatText, null,
            stat,
            " ",
            showEthIcon ? (React.createElement("div", { style: { marginLeft: 8, marginTop: 5, fontSize: 59 } }, "\u039E")) : null),
        React.createElement(Title$1, null, title)));
};
var templateObject_1$h, templateObject_2$d, templateObject_3$9;

var ImageContainer = styled.div(templateObject_2$c || (templateObject_2$c = __makeTemplateObject(["\n  position: relative; /* If you want text inside of it */\n  max-width: 400px;\n  width: 70%;\n\n  ", "\n"], ["\n  position: relative; /* If you want text inside of it */\n  max-width: 400px;\n  width: 70%;\n\n  ",
    "\n"])), Media.lg(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["\n    height: 350px;\n  "], ["\n    height: 350px;\n  "]))));
var ImageStyled = styled.img(templateObject_3$8 || (templateObject_3$8 = __makeTemplateObject(["\n  transform: rotate(15deg);\n  width: 100%;\n"], ["\n  transform: rotate(15deg);\n  width: 100%;\n"])));
var Container$d = styled.div(templateObject_5$3 || (templateObject_5$3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  grid-gap: 20px;\n  width: 100%;\n  justify-content: space-evenly;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  grid-gap: 20px;\n  width: 100%;\n  justify-content: space-evenly;\n\n  ",
    "\n"])), Media.sm(templateObject_4$5 || (templateObject_4$5 = __makeTemplateObject(["\n    padding: 0 90px;\n    width: calc(100% - 180px);\n  "], ["\n    padding: 0 90px;\n    width: calc(100% - 180px);\n  "]))));
var ZettaStyled = styled(Container$j)(templateObject_6$3 || (templateObject_6$3 = __makeTemplateObject(["\n  font-family: \"Bluu Next\";\n  color: ", ";\n  text-align: center;\n"], ["\n  font-family: \"Bluu Next\";\n  color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var MegaStyled$1 = styled(Container$p)(templateObject_7$2 || (templateObject_7$2 = __makeTemplateObject(["\n  flex: 1 0 auto;\n  color: ", ";\n  text-align: center;\n"], ["\n  flex: 1 0 auto;\n  color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var Infographic = function (_a) {
    var imgSrc = _a.imgSrc, icon = _a.icon, title = _a.title, description = _a.description, link = _a.link;
    return (React.createElement(Container$d, null,
        React.createElement(ImageContainer, null,
            React.createElement(ImageStyled, { src: imgSrc })),
        icon,
        React.createElement(ZettaStyled, null, title),
        React.createElement(MegaStyled$1, null, description),
        React.createElement(Button, { as: "a", href: link }, title)));
};
var templateObject_1$g, templateObject_2$c, templateObject_3$8, templateObject_4$5, templateObject_5$3, templateObject_6$3, templateObject_7$2;

var ImageSection = styled.img(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n  width: 280px;\n  height: 280px;\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  object-fit: cover;\n"], ["\n  width: 280px;\n  height: 280px;\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  object-fit: cover;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
});
var MegaStyled = styled(Container$p)(templateObject_2$b || (templateObject_2$b = __makeTemplateObject(["\n  color: ", ";\n  font-family: \"Bluu Next\";\n  padding-bottom: 24px;\n  text-decoration: none;\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n"], ["\n  color: ", ";\n  font-family: \"Bluu Next\";\n  padding-bottom: 24px;\n  text-decoration: none;\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Container$c = styled.div(templateObject_3$7 || (templateObject_3$7 = __makeTemplateObject(["\n  position: relative;\n  border-radius: ", ";\n  background-color: rgba(255, 255, 255, 0.1);\n  transition: ", ";\n  padding: 0px;\n  width: 280px;\n  height: 480px;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"], ["\n  position: relative;\n  border-radius: ", ";\n  background-color: rgba(255, 255, 255, 0.1);\n  transition: ", ";\n  padding: 0px;\n  width: 280px;\n  height: 480px;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var BottomSection = styled.div(templateObject_4$4 || (templateObject_4$4 = __makeTemplateObject(["\n  padding: 24px;\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n"], ["\n  padding: 24px;\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n"])));
var SessionCard = function (_a) {
    var imgSrc = _a.imgSrc, title = _a.title, bounty = _a.bounty, participants = _a.participants, appraisal = _a.appraisal, nftAddress = _a.nftAddress, tokenId = _a.tokenId, nonce = _a.nonce;
    return (React.createElement(Container$c, null,
        React.createElement(ImageSection, { src: imgSrc, alt: "" + title }),
        React.createElement(BottomSection, null,
            React.createElement(MegaStyled, { as: "a", href: "https://app.abacus.wtf/current-session?address=" + nftAddress + "&tokenId=" + tokenId + "&nonce=" + nonce }, title),
            React.createElement(MiniList, { info: {
                    "Bounty + Staked": bounty + " ETH",
                    Participants: participants + " People",
                    Appraisal: appraisal + " ETH",
                } }))));
};
var templateObject_1$f, templateObject_2$b, templateObject_3$7, templateObject_4$4;

var Twitter = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "20" : _b;
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 20 17", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.9167 4.37657C17.9167 4.37599 17.9167 4.37542 17.9167 4.37484C17.9167 4.37478 17.9167 4.37472 17.9167 4.37466L19.7721 2.37263C20.0746 2.0463 19.8026 1.52051 19.3615 1.57885L17.0368 1.88632C16.3111 0.98973 15.2016 0.416504 13.9583 0.416504C11.7722 0.416504 10 2.18871 10 4.37484C10 4.89679 10.101 5.39514 10.2846 5.85141C7.3194 5.78207 4.14454 5.19533 2.53939 2.01507C2.34076 1.62155 1.77136 1.59876 1.64492 2.02104C0.483412 5.90022 2.52751 10.9404 7.03103 12.2915C5.90757 13.39 3.0196 13.6882 0.65626 13.4718C0.196371 13.4297 -0.0923447 13.9536 0.263296 14.2482C2.24496 15.8897 4.99341 16.2498 7.5259 16.2498C13.9575 16.2498 18.4104 10.8081 17.9167 4.37657Z", fill: "#6C7388" })));
};
var Discord = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "20" : _b;
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 26 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M21.7736 2.40825C20.2094 1.67925 18.532 1.14216 16.7782 0.834542C16.7463 0.828605 16.7144 0.843442 16.6979 0.873116C16.4822 1.26283 16.2433 1.77124 16.0759 2.17084C14.1896 1.884 12.313 1.884 10.4653 2.17084C10.298 1.76235 10.0503 1.26283 9.83363 0.873116C9.81718 0.844432 9.78528 0.829596 9.75334 0.834542C8.00051 1.14117 6.32314 1.67827 4.75797 2.40825C4.74442 2.41418 4.7328 2.42408 4.7251 2.43693C1.54348 7.26487 0.671898 11.9741 1.09947 16.625C1.1014 16.6478 1.11398 16.6695 1.13139 16.6834C3.23053 18.2492 5.26391 19.1997 7.25952 19.8298C7.29146 19.8397 7.3253 19.8278 7.34563 19.8011C7.81769 19.1463 8.23849 18.4559 8.59929 17.7299C8.62058 17.6873 8.60026 17.6369 8.55674 17.6201C7.88928 17.3629 7.25372 17.0494 6.64235 16.6933C6.594 16.6646 6.59013 16.5943 6.63461 16.5607C6.76326 16.4628 6.89195 16.3609 7.0148 16.258C7.03702 16.2393 7.068 16.2353 7.09413 16.2472C11.1105 18.1097 15.4588 18.1097 19.4278 16.2472C19.4539 16.2343 19.4849 16.2383 19.5081 16.2571C19.6309 16.3599 19.7596 16.4628 19.8892 16.5607C19.9337 16.5943 19.9308 16.6646 19.8824 16.6933C19.2711 17.0563 18.6355 17.3629 17.9671 17.6191C17.9236 17.6359 17.9042 17.6873 17.9255 17.7299C18.294 18.4549 18.7148 19.1453 19.1782 19.8001C19.1976 19.8278 19.2324 19.8397 19.2643 19.8298C21.2696 19.1997 23.303 18.2492 25.4021 16.6834C25.4205 16.6695 25.4321 16.6488 25.434 16.626C25.9458 11.2491 24.577 6.57843 21.8055 2.43792C21.7987 2.42408 21.7872 2.41418 21.7736 2.40825ZM9.19908 13.7931C7.98986 13.7931 6.99351 12.6655 6.99351 11.2807C6.99351 9.89595 7.97054 8.76837 9.19908 8.76837C10.4373 8.76837 11.424 9.90585 11.4046 11.2807C11.4046 12.6655 10.4276 13.7931 9.19908 13.7931ZM17.3538 13.7931C16.1446 13.7931 15.1483 12.6655 15.1483 11.2807C15.1483 9.89595 16.1253 8.76837 17.3538 8.76837C18.592 8.76837 19.5787 9.90585 19.5594 11.2807C19.5594 12.6655 18.592 13.7931 17.3538 13.7931Z", fill: "#6C7388" })));
};
var Medium = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "20" : _b;
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M13.488 6.895c0 3.727-3.002 6.749-6.704 6.749S.081 10.622.081 6.894C.081 3.168 3.082.146 6.784.146c3.703 0 6.704 3.022 6.704 6.75ZM20.841 6.895c0 3.508-1.5 6.354-3.351 6.354s-3.352-2.846-3.352-6.354c0-3.509 1.5-6.354 3.351-6.354s3.352 2.844 3.352 6.354ZM23.85 6.895c0 3.143-.529 5.692-1.18 5.692-.65 0-1.178-2.549-1.178-5.692 0-3.144.527-5.693 1.178-5.693.651 0 1.18 2.549 1.18 5.693Z", fill: "#fff" })));
};

// You probably want to change this to something semantic or abandon it all together
var Container$b = styled.div(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"])));
var StyledLink = styled.a(templateObject_2$a || (templateObject_2$a = __makeTemplateObject(["\n  display: flex;\n  margin: 0 12px;\n  cursor: pointer;\n\n  &:first-of-type {\n    margin-left: 0;\n  }\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n\n  & path {\n    fill: ", ";\n  }\n\n  &:hover,\n  &:focus {\n    & path {\n      fill: ", ";\n    }\n  }\n"], ["\n  display: flex;\n  margin: 0 12px;\n  cursor: pointer;\n\n  &:first-of-type {\n    margin-left: 0;\n  }\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n\n  & path {\n    fill: ", ";\n  }\n\n  &:hover,\n  &:focus {\n    & path {\n      fill: ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var SocialLinks = function (_a) {
    var twitter = _a.twitter, discord = _a.discord, medium = _a.medium, className = _a.className, _b = _a.size, size = _b === void 0 ? "20" : _b;
    return (React.createElement(Container$b, { className: className },
        React.createElement(StyledLink, { href: twitter },
            React.createElement(Twitter, { size: size }),
            React.createElement(VisuallyHidden, null, "Twitter Profile")),
        React.createElement(StyledLink, { href: discord },
            React.createElement(Discord, { size: size }),
            React.createElement(VisuallyHidden, null, "Discord Channel")),
        React.createElement(StyledLink, { href: medium },
            React.createElement(Medium, { size: size }),
            React.createElement(VisuallyHidden, null, "Medium Account"))));
};
var templateObject_1$e, templateObject_2$a;

var ButtonStyled$1 = styled(Button)(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  grid-gap: 8px;\n  display: flex;\n  flex-direction: row;\n  color: black;\n  padding: 0px;\n"], ["\n  grid-gap: 8px;\n  display: flex;\n  flex-direction: row;\n  color: black;\n  padding: 0px;\n"])));
var ProfileInfo = function (_a) {
    var profileName = _a.profileName, profileIcon = _a.profileIcon;
    return (React.createElement(ButtonStyled$1, { buttonType: ButtonType.Clear },
        React.createElement(ProfileIcon, { src: profileIcon }),
        React.createElement(StyledDiv, null, profileName)));
};
var templateObject_1$d;

// You probably want to change this to something semantic or abandon it all together
var Container$a = styled.div(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  border-radius: 60px;\n  box-shadow: ", ";\n  padding: 20px;\n  background-color: ", ";\n  width: fit-content;\n  display: flex;\n  height: 16px;\n  align-items: center;\n"], ["\n  border-radius: 60px;\n  box-shadow: ", ";\n  padding: 20px;\n  background-color: ", ";\n  width: fit-content;\n  display: flex;\n  height: 16px;\n  align-items: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.button;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Bead = styled.div(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n  background-color: ", ";\n  cursor: ", ";\n  border-radius: 20px;\n  height: 16px;\n  width: 12px;\n  border: 1px solid ", ";\n  position: absolute;\n  z-index: 1;\n  transform: translateX(\n    ", "px\n  );\n\n  transition: transform ", " ease;\n"], ["\n  background-color: ",
    ";\n  cursor: ",
    ";\n  border-radius: 20px;\n  height: 16px;\n  width: 12px;\n  border: 1px solid ", ";\n  position: absolute;\n  z-index: 1;\n  transform: translateX(\n    ",
    "px\n  );\n\n  transition: transform ", " ease;\n"])), function (_a) {
    var currentPosition = _a.currentPosition, beadPosition = _a.beadPosition, theme = _a.theme;
    return currentPosition === beadPosition
        ? theme.colors.utility.gray
        : theme.colors.utility.blue;
}, function (_a) {
    var currentPosition = _a.currentPosition, beadPosition = _a.beadPosition;
    return currentPosition === beadPosition ? "default" : "pointer";
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var beadPosition = _a.beadPosition, currentPosition = _a.currentPosition, maxPosition = _a.maxPosition;
    return beadPosition <= currentPosition
        ? beadPosition * 13
        : 250 - (maxPosition - beadPosition) * 13;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var GradientLine = styled.div(templateObject_3$6 || (templateObject_3$6 = __makeTemplateObject(["\n  height: 2px;\n  width: 250px;\n  z-index: 0;\n  background: linear-gradient(90deg, #3e74ff -14.08%, rgba(0, 0, 0, 0) 127.23%);\n"], ["\n  height: 2px;\n  width: 250px;\n  z-index: 0;\n  background: linear-gradient(90deg, #3e74ff -14.08%, rgba(0, 0, 0, 0) 127.23%);\n"])));
var AbacusBar = function (_a) {
    var currentPosition = _a.currentPosition, totalNumberOfBeads = _a.totalNumberOfBeads, changeToPosition = _a.changeToPosition;
    return (React.createElement(Container$a, null,
        React.createElement(GradientLine, null),
        _.map(_.range(0, totalNumberOfBeads), function (i) { return (React.createElement(Bead, { key: i, beadPosition: i, currentPosition: currentPosition, maxPosition: totalNumberOfBeads, onClick: function () {
                if (i !== currentPosition) {
                    changeToPosition(i);
                }
            } })); })));
};
var templateObject_1$c, templateObject_2$9, templateObject_3$6;

var ProfileContainer = styled.div(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n"], ["\n  display: flex;\n  flex-direction: row;\n"])));
var PlusIcon = styled.div(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n  border: 2px solid #fff;\n  height: 36px;\n  width: 36px;\n  margin-right: -8px;\n  background-color: #f6f6f6;\n  ", ";\n  color: ", ";\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  border: 2px solid #fff;\n  height: 36px;\n  width: 36px;\n  margin-right: -8px;\n  background-color: #f6f6f6;\n  ", ";\n  color: ", ";\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])), Font("milli"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var ProfileGroup = function (_a) {
    var imgs = _a.imgs, numParticipants = _a.numParticipants;
    return (React.createElement(ProfileContainer, null, _.map(_.range(0, imgs.length > 9 ? 9 : imgs.length), function (i) {
        if (i === 8) {
            return React.createElement(PlusIcon, { key: "plus-icon" },
                "+",
                numParticipants - 9);
        }
        return (React.createElement(ProfileIcon, { key: i, src: imgs[i], style: {
                border: "2px solid #fff",
                height: 36,
                width: 36,
                marginRight: -8,
            } }));
    })));
};
var templateObject_1$b, templateObject_2$8;

// You probably want to change this to something semantic or abandon it all together
var Container$9 = styled.div(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n  display: flex;\n  flex-direction: column;\n  padding: 0px;\n"], ["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n  display: flex;\n  flex-direction: column;\n  padding: 0px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
});
var SecondHalf = styled.div(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 15px 20px;\n  box-sizing: border-box;\n"], ["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 15px 20px;\n  box-sizing: border-box;\n"])));
var Title = styled.h3(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject(["\n  text-align: center;\n  margin-bottom: 18px;\n  ", "\n\n  ", "\n"], ["\n  text-align: center;\n  margin-bottom: 18px;\n  ", "\n\n  ",
    "\n"])), Font("peta", "Bluu Next"), Media.md(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("zetta", "Bluu Next")));
var Divider$2 = styled.hr(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject(["\n  margin: 18px 0px;\n  width: 100%;\n  border-color: ", ";\n"], ["\n  margin: 18px 0px;\n  width: 100%;\n  border-color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
});
var ExploreInfoContainer = styled.div(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  width: 100%;\n  justify-content: center;\n  margin-bottom: 18px;\n\n  ", "\n"], ["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  width: 100%;\n  justify-content: center;\n  margin-bottom: 18px;\n\n  ",
    "\n"])), Media.sm(templateObject_6$2 || (templateObject_6$2 = __makeTemplateObject(["\n    grid-column-gap: 50px;\n    width: max-content;\n  "], ["\n    grid-column-gap: 50px;\n    width: max-content;\n  "]))));
var ButtonStyled = styled(Button)(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var ProfileGroupContainer = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: none;\n  margin-top: 18px;\n\n  ", "\n"], ["\n  display: none;\n  margin-top: 18px;\n\n  ",
    "\n"])), Media.md(templateObject_9$1 || (templateObject_9$1 = __makeTemplateObject(["\n    display: block;\n  "], ["\n    display: block;\n  "]))));
var ExploreCard = function (_a) {
    var nftSrc = _a.nftSrc, nftTitle = _a.nftTitle, endTime = _a.endTime, numParticipants = _a.numParticipants, poolAmount = _a.poolAmount, poolAmountDollars = _a.poolAmountDollars, imgs = _a.imgs, link = _a.link;
    return (React.createElement(Container$9, null,
        React.createElement(ExploreImage, { imgSrc: nftSrc }),
        React.createElement(SecondHalf, null,
            React.createElement(Title, null, nftTitle),
            React.createElement(SessionCountdown, { endTime: endTime }),
            React.createElement(Divider$2, null),
            React.createElement(ExploreInfoContainer, null,
                React.createElement(ExploreInfo, { title: "Participants", text: "" + numParticipants, unit: "People" }),
                React.createElement(ExploreInfo, { title: "Pool Amount", text: poolAmount + " \u039E", unit: "$" + (poolAmountDollars !== null && poolAmountDollars !== void 0 ? poolAmountDollars : "-") })),
            React.createElement("a", { href: link, style: { width: "100%" } },
                React.createElement(ButtonStyled, { buttonType: ButtonType.Standard }, "Participate")),
            React.createElement(ProfileGroupContainer, null,
                React.createElement(ProfileGroup, { imgs: imgs, numParticipants: numParticipants })))));
};
var templateObject_1$a, templateObject_2$7, templateObject_3$5, templateObject_4$3, templateObject_5$2, templateObject_6$2, templateObject_7$1, templateObject_8$1, templateObject_9$1, templateObject_10;

var SessionState;
(function (SessionState) {
    SessionState[SessionState["Vote"] = 0] = "Vote";
    SessionState[SessionState["Weigh"] = 1] = "Weigh";
    SessionState[SessionState["SetFinalAppraisal"] = 2] = "SetFinalAppraisal";
    SessionState[SessionState["Harvest"] = 3] = "Harvest";
    SessionState[SessionState["Claim"] = 4] = "Claim";
    SessionState[SessionState["Complete"] = 5] = "Complete";
})(SessionState || (SessionState = {}));
// You probably want to change this to something semantic or abandon it all together
var Container$8 = styled.a(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n\n  // @TODO: Subject to change for differing screen sizes\n  width: 430px;\n  height: 665px;\n  display: flex;\n  flex-direction: column;\n  padding: 12px;\n  grid-gap: 20px;\n  align-items: center;\n  transition: ", ";\n  cursor: pointer;\n  text-decoration: none;\n  color: black;\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n\n  // @TODO: Subject to change for differing screen sizes\n  width: 430px;\n  height: 665px;\n  display: flex;\n  flex-direction: column;\n  padding: 12px;\n  grid-gap: 20px;\n  align-items: center;\n  transition: ", ";\n  cursor: pointer;\n  text-decoration: none;\n  color: black;\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var BadgeContainer = styled.div(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n  border: 2px solid ", ";\n  padding: 8px 18px;\n  border-radius: 70px;\n  width: fit-content;\n  height: fit-content;\n  grid-gap: 8px;\n  display: flex;\n  font-weight: 500;\n  ", ";\n  align-items: center;\n"], ["\n  border: 2px solid ", ";\n  padding: 8px 18px;\n  border-radius: 70px;\n  width: fit-content;\n  height: fit-content;\n  grid-gap: 8px;\n  display: flex;\n  font-weight: 500;\n  ", ";\n  align-items: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
}, Font("nano"));
var BadgeIndicator = styled.div(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  border-radius: 50%;\n  height: 8px;\n  width: 8px;\n  background-color: ", ";\n"], ["\n  border-radius: 50%;\n  height: 8px;\n  width: 8px;\n  background-color: ", ";\n"])), function (_a) {
    var color = _a.color;
    return color;
});
var NFTImage = styled.img(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  border-radius: ", ";\n  max-height: 220px;\n  width: fit-content;\n"], ["\n  border-radius: ", ";\n  max-height: 220px;\n  width: fit-content;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
});
var ExploreScrollableCard = function (_a) {
    var cardInfo = _a.cardInfo, currentStatus = _a.currentStatus;
    var theme = useContext(ThemeContext);
    var badgeTitle = currentStatus === SessionState.Vote
        ? "Voting Live"
        : currentStatus === SessionState.Weigh
            ? "Weighing Votes"
            : currentStatus === SessionState.SetFinalAppraisal
                ? "Setting Final Appraisal"
                : currentStatus === SessionState.Harvest
                    ? "Harvesting"
                    : currentStatus === SessionState.Claim
                        ? "Claiming"
                        : "Session Completed";
    var badgeColor = currentStatus === SessionState.Vote
        ? theme.colors.utility.blue
        : currentStatus === SessionState.Weigh
            ? theme.colors.core[900]
            : currentStatus === SessionState.SetFinalAppraisal
                ? theme.colors.utility.yellow
                : currentStatus === SessionState.Harvest
                    ? theme.colors.utility.purple
                    : currentStatus === SessionState.Claim
                        ? theme.colors.utility.brown
                        : theme.colors.utility.green;
    return (React.createElement(Container$8, { href: cardInfo.link },
        React.createElement("div", { style: { width: "100%" } },
            React.createElement(BadgeContainer, null,
                React.createElement(BadgeIndicator, { color: badgeColor }),
                badgeTitle)),
        React.createElement(NFTImage, { src: cardInfo.nftSrc, alt: cardInfo.nftTitle }),
        React.createElement(Container$l, { style: { fontFamily: "Bluu Next" } }, cardInfo.nftTitle),
        React.createElement(ExploreInfoContainer, null,
            React.createElement(ExploreInfo, { title: "Participants", text: "" + cardInfo.numParticipants, unit: "People" }),
            React.createElement(ExploreInfo, { title: "Pool Amount", text: cardInfo.poolAmount + " \u039E", unit: "$" + cardInfo.poolAmountDollars })),
        React.createElement(Divider$2, null),
        React.createElement("div", { style: {
                gridGap: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            } },
            React.createElement(ProfileGroup, { imgs: cardInfo.imgs, numParticipants: cardInfo.numParticipants }),
            React.createElement(SessionCountdown, { endTime: cardInfo.endTime }))));
};
var templateObject_1$9, templateObject_2$6, templateObject_3$4, templateObject_4$2;

// You probably want to change this to something semantic or abandon it all together
var Container$7 = styled.div(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: space-between;\n  align-items: center;\n"])));
var CardBar = function (_a) {
    var title = _a.title, poolAmount = _a.poolAmount, poolAmountUSD = _a.poolAmountUSD, participants = _a.participants, owner = _a.owner;
    return (React.createElement(CardBackground, { style: { padding: "26px 56px" } },
        React.createElement(Container$7, null,
            React.createElement(Container$n, { style: { fontFamily: "Bluu Next" } }, title),
            React.createElement(ExploreInfo, { title: "Pool Amount", text: poolAmount + " \u039E", unit: "$" + poolAmountUSD, isCardBar: true }),
            React.createElement(ExploreInfo, { title: "Participants", text: "" + participants, unit: "People", isCardBar: true }),
            React.createElement(ExploreInfo, { title: "Owner", text: "" + owner, isCardBar: true }))));
};
var templateObject_1$8;

var KiloStyled$2 = styled(StyledDiv)(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 500;\n"], ["\n  color: ", ";\n  font-weight: 500;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var Border = styled.div(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n  background-color: ", ";\n  height: 2px;\n  width: 100%;\n"], ["\n  background-color: ", ";\n  height: 2px;\n  width: 100%;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
});
var Container$6 = styled.div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 15px;\n  width: 100%;\n  height: 100%;\n  height: 300px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 15px;\n  width: 100%;\n  height: 100%;\n  height: 300px;\n"])));
var CardWithTitle = function (_a) {
    var title = _a.title, children = _a.children, style = _a.style;
    return (React.createElement(CardBackground, null,
        React.createElement(Container$6, { style: __assign({}, style) },
            React.createElement(KiloStyled$2, null, title),
            React.createElement(Border, null),
            children)));
};
var templateObject_1$7, templateObject_2$5, templateObject_3$3;

var KiloStyled$1 = styled(StyledDiv)(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  color: ", ";\n  overflow: hidden;\n"], ["\n  color: ", ";\n  overflow: hidden;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var AboutSection = function (_a) {
    var description = _a.description;
    return (React.createElement(CardWithTitle, { title: "About" },
        React.createElement(KiloStyled$1, null, description)));
};
var templateObject_1$6;

var LinkImage = "<svg width=\"15\" height=\"16\" viewBox=\"0 0 15 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4 1.5H14M14 1.5V11.5M14 1.5L1 14.5\" stroke=\"#1C2333\" stroke-opacity=\"0.6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>";

var Link = styled.a(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 8px 0px;\n  text-decoration: none;\n  transition: ", ";\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 8px 0px;\n  text-decoration: none;\n  transition: ", ";\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var KiloStyled = styled(StyledDiv)(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 500;\n"], ["\n  color: ", ";\n  font-weight: 500;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
});
var Container$5 = styled.div(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  grid-gap: 5px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  grid-gap: 5px;\n"])));
var PriceHistory = function (_a) {
    var etherscanLink = _a.etherscanLink, openseaLink = _a.openseaLink;
    return (React.createElement(CardWithTitle, { title: "Price History" },
        React.createElement(Container$5, null,
            React.createElement(Link, { style: { paddingTop: 5 }, href: etherscanLink },
                React.createElement(KiloStyled, null, "Etherscan"),
                React.createElement("img", { src: LinkImage, alt: "Etherscan link" })),
            React.createElement(Link, { href: openseaLink },
                React.createElement(KiloStyled, null, "OpenSea"),
                React.createElement("img", { src: LinkImage, alt: "OpenSea link" })))));
};
var templateObject_1$5, templateObject_2$4, templateObject_3$2;

// You probably want to change this to something semantic or abandon it all together
var Container$4 = styled.div(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
var Navbar = function (_a) {
    var children = _a.children;
    return (React.createElement(Container$4, null, children));
};
var templateObject_1$4;

var Container$3 = styled.div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 90px;\n  width: 100%;\n  height: fit-content;\n"], ["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 90px;\n  width: 100%;\n  height: fit-content;\n"])));
var Divider$1 = styled.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);\n  min-width: 2px;\n"], ["\n  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);\n  min-width: 2px;\n"])));
var SplitSection = function (_a) {
    var leftSection = _a.leftSection, rightSection = _a.rightSection;
    return (React.createElement(Container$3, null,
        leftSection,
        React.createElement(Divider$1, null),
        rightSection));
};
var templateObject_1$3, templateObject_2$3;

// You probably want to change this to something semantic or abandon it all together
var Container$2 = styled.div(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  display: flex;\n  padding: 16px;\n\n  ", "\n\n  ", "\n"], ["\n  display: flex;\n  padding: 16px;\n\n  ",
    "\n\n  ",
    "\n"])), function (_a) {
    var menuOpen = _a.menuOpen, theme = _a.theme;
    return menuOpen && css(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n      flex-direction: column;\n      background: ", ";\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 100;\n    "], ["\n      flex-direction: column;\n      background: ", ";\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 100;\n    "])), theme.colors.core.background);
}, Media.md(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 28px;\n  "], ["\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    padding: 28px;\n  "]))));
var SideContainer = styled.div(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n\n  ", "\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n\n  ",
    "\n\n  ",
    "\n"])), function (_a) {
    var isOptions = _a.isOptions, menuOpen = _a.menuOpen;
    return isOptions && css(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n      display: ", ";\n      flex-direction: column;\n      justify-content: center;\n      flex: 1 0 auto;\n    "], ["\n      display: ", ";\n      flex-direction: column;\n      justify-content: center;\n      flex: 1 0 auto;\n    "])), menuOpen ? "flex" : "none");
}, Media.md(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n    display: flex;\n    position: inherit;\n    flex-direction: row;\n    flex: 0 0 auto;\n  "], ["\n    display: flex;\n    position: inherit;\n    flex-direction: row;\n    flex: 0 0 auto;\n  "]))));
var Divider = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: rgba(0, 0, 0, 0.2);\n  width: 1px;\n  height: 38px;\n"], ["\n  background: rgba(0, 0, 0, 0.2);\n  width: 1px;\n  height: 38px;\n"])));
var DropdownButton = styled(Button)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  height: 38px;\n  justify-content: center;\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n  transition: transform 0.25s linear;\n\n  transform: ", ";\n\n  ", "\n"], ["\n  height: 38px;\n  justify-content: center;\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n  transition: transform 0.25s linear;\n\n  transform: ",
    ";\n\n  ",
    "\n"])), function (_a) {
    var menuOpen = _a.menuOpen;
    return menuOpen ? "rotateZ(-180deg)" : "rotateZ(0)";
}, Media.md(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    display: none;\n  "], ["\n    display: none;\n  "]))));
var PortalNavbar = function (_a) {
    var balance = _a.balance, profileName = _a.profileName, profileIcon = _a.profileIcon;
    var _b = React.useState(false), menuOpen = _b[0], setMenuOpen = _b[1];
    return (React.createElement(Container$2, { menuOpen: menuOpen },
        React.createElement(SideContainer, { style: { gridGap: 8 }, menuOpen: menuOpen },
            React.createElement(Logo, null),
            React.createElement(Divider, null),
            React.createElement(Container$l, null, "Crowds"),
            React.createElement(DropdownButton, { menuOpen: menuOpen, buttonType: ButtonType.Clear, onClick: function () { return setMenuOpen(function (open) { return !open; }); } },
                React.createElement(Dropdown, null),
                React.createElement(VisuallyHidden, null, "Dropdown"))),
        React.createElement(SideContainer, { style: { gridGap: 32 }, isOptions: true, menuOpen: menuOpen },
            React.createElement(StyledDiv, null,
                balance.toLocaleString("en-us", {
                    maximumSignificantDigits: 2,
                    minimumSignificantDigits: 2,
                }),
                " ",
                "ETH"),
            React.createElement(Button, { buttonType: ButtonType.White }, "New Session"),
            React.createElement(ProfileInfo, { profileIcon: profileIcon, profileName: profileName }),
            React.createElement(Button, { style: { padding: 0 }, buttonType: ButtonType.Clear },
                React.createElement(Extras, null),
                React.createElement(VisuallyHidden, null, "Menu Options")))));
};
var templateObject_1$2, templateObject_2$2, templateObject_3$1, templateObject_4$1, templateObject_5$1, templateObject_6$1, templateObject_7, templateObject_8, templateObject_9;

var Container$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  max-width: 100%;\n  height: fit-content;\n"], ["\n  max-width: 100%;\n  height: fit-content;\n"])));
var SessionContainer = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  grid-gap: 40px;\n"], ["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  grid-gap: 40px;\n"])));
var PreviousSessionsAutoScroll = function (_a) {
    var sessions = _a.sessions;
    return (React.createElement(Container$1, null,
        React.createElement(SessionContainer, { sessionLength: sessions.length }, sessions.map(function (session) { return (React.createElement(SessionCard, __assign({}, session))); }))));
};
var templateObject_1$1, templateObject_2$1;

var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n"], ["\n  position: relative;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n"])));
var Container = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n  height: fit-content;\n  display: grid;\n  width: 100%;\n  grid-template-columns: repeat(3, calc(75% - 24px));\n  grid-column-gap: 16px;\n  align-items: center;\n  justify-content: center;\n\n  ", "\n\n  ", "\n"], ["\n  position: relative;\n  height: fit-content;\n  display: grid;\n  width: 100%;\n  grid-template-columns: repeat(3, calc(75% - 24px));\n  grid-column-gap: 16px;\n  align-items: center;\n  justify-content: center;\n\n  ",
    "\n\n  ",
    "\n"])), Media.sm(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    grid-template-columns: repeat(3, 50%);\n    grid-column-gap: 80px;\n  "], ["\n    grid-template-columns: repeat(3, 50%);\n    grid-column-gap: 80px;\n  "]))), Media.xl(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    grid-template-columns: repeat(3, 42%);\n    grid-column-gap: 0;\n  "], ["\n    grid-template-columns: repeat(3, 42%);\n    grid-column-gap: 0;\n  "]))));
var CarouselItem = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  max-width: 480px;\n  width: 100%;\n  justify-self: center;\n\n  ", "\n"], ["\n  max-width: 480px;\n  width: 100%;\n  justify-self: center;\n\n  ",
    "\n"])), Media.lg(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: 75%;\n  "], ["\n    width: 75%;\n  "]))));
var ExploreCarousel = function (_a) {
    var cards = _a.cards, currentMid = _a.currentMid, setCurrentMid = _a.setCurrentMid;
    if (cards.length < 1) {
        return null;
    }
    return (React.createElement(Wrapper, null,
        React.createElement(Container, null,
            React.createElement(CarouselItem, null,
                React.createElement(ExploreImage, { onClick: function () {
                        if (currentMid === 0) {
                            setCurrentMid(cards.length - 1);
                        }
                        else {
                            setCurrentMid(currentMid - 1);
                        }
                    }, enableFullBorderRadius: true, imgSrc: cards[currentMid === 0 ? cards.length - 1 : currentMid - 1].nftSrc })),
            React.createElement(CarouselItem, null,
                React.createElement(ExploreCard, __assign({}, cards[currentMid]))),
            React.createElement(CarouselItem, null,
                React.createElement(ExploreImage, { onClick: function () {
                        if (currentMid === cards.length - 1) {
                            setCurrentMid(0);
                        }
                        else {
                            setCurrentMid(currentMid + 1);
                        }
                    }, enableFullBorderRadius: true, imgSrc: cards[currentMid === cards.length - 1 ? 0 : currentMid + 1].nftSrc })))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;

export { AbacusBar, AbacusCrowds as AbacusCrowdsIcon, Abacus as AbacusIcon, AbacusSpot as AbacusSpotIcon, AboutSection, Button, ButtonType, CardBackground, CardBar, Checkbox, Divider$2 as Divider, Dropdown, Container$w as Exa, ExploreCard, ExploreCarousel, ExploreImage, ExploreInfo, ExploreInfoContainer, ExploreScrollableCard, Extras, Flex, Font, FontImport, Container$v as Giga, Container$u as H1, Container$t as H2, Container$s as H3, Container$r as H4, Container$q as H5, StyledH6 as H6, Infographic, Input, StyledDiv as Kilo, Logo, Media, Container$p as Mega, Container$o as Milli, MiniList, Navbar, StyledP as P, Container$n as Peta, PortalNavbar, PreviousSessionsAutoScroll, PriceHistory, ProfileGroup, ProfileIcon, ProfileInfo, Section, SessionCard, SessionCountdown, Container$m as Small, SocialLinks, SplitSection, StatInfo, Container$l as Tera, VisuallyHidden, Container$k as Yotta, Container$j as Zetta, breakpoints, defaultTheme };
//# sourceMappingURL=index.js.map
