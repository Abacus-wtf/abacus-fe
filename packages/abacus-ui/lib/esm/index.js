import React, { useState, useContext, useRef, useEffect } from 'react';
import styled, { css, keyframes, ThemeContext } from 'styled-components';
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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    return "".concat(elementType, "-").concat(uuid());
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
            modalBg: "rgba(98, 101, 101, 0.7)",
            label: "rgba(26, 26, 26, 0.04)",
        },
        button: {
            secondary: "rgba(28, 35, 51, 0.04)",
            primary: "#1A1A1A",
            gray: "rgb(220,220,220)",
        },
        utility: {
            green: "#23CE7C",
            purple: "#8673FF",
            lightPurple: "#8181ff",
            blue: "#3E74FF",
            red: "#F33636",
            yellow: "#FFC93E",
            white: "#FFFFFF",
            gray: "#C4C4C4",
            black: "#000000",
            brown: "#964B00",
            lightBlue: "#F3FCFF",
            lightGreen: "#DDFFF1",
        },
    },
    layout: {
        maxWidth: "800px",
    },
    borderRadius: {
        main: "10px",
        section: "24px",
        button: "80px",
    },
    boxShadow: {
        button: "0px 5px 60px rgba(0, 0, 0, 0.1)",
        main: "0px 2px 0px #f6f6f6",
        alt: "0px 2px 0px #6b6b6b",
        section: "0px 2px 32px rgba(0, 0, 0, 0.06)",
    },
    padding: {
        main: "13px 20px",
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
            "font-size": "22px",
            "line-height": "27px",
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
var FontImport = function () { return css(templateObject_1$W || (templateObject_1$W = __makeTemplateObject(["\n  @import url(\"https://rsms.me/inter/inter.css\");\n"], ["\n  @import url(\"https://rsms.me/inter/inter.css\");\n"]))); };
var Font = function (size, fontFamily) {
    if (size === void 0) { size = "kilo"; }
    if (fontFamily === void 0) { fontFamily = "Inter"; }
    return css(templateObject_2$w || (templateObject_2$w = __makeTemplateObject(["\n  font-family: \"", "\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  ", ";\n"], ["\n  font-family: \"", "\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  ", ";\n"])), fontFamily, function (_a) {
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
    Sizes["XSMALL"] = "xs";
})(Sizes || (Sizes = {}));
var breakpoints = [
    { size: "xl", value: "1700px" },
    { size: "lg", value: "1200px" },
    { size: "md", value: "885px" },
    { size: "sm", value: "600px" },
    { size: "xs", value: "425px" },
];
var Media = breakpoints.reduce(function (accumulator, _a) {
    var _b;
    var size = _a.size, value = _a.value;
    var nextMedia = function (first) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        return css(templateObject_3$l || (templateObject_3$l = __makeTemplateObject(["\n      @media (min-width: ", ") {\n        ", ";\n      }\n    "], ["\n      @media (min-width: ", ") {\n        ", ";\n      }\n    "])), value, css.apply(void 0, __spreadArray([first], interpolations, false)));
    };
    return __assign(__assign({}, accumulator), (_b = {}, _b[size] = nextMedia, _b));
}, {
    xs: css,
    sm: css,
    md: css,
    lg: css,
    xl: css,
});
var templateObject_1$W, templateObject_2$w, templateObject_3$l;

var Container$F = styled.div(templateObject_1$V || (templateObject_1$V = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("exa"));
var templateObject_1$V;

var Container$E = styled.div(templateObject_1$U || (templateObject_1$U = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("giga"));
var templateObject_1$U;

var Container$D = styled.h1(templateObject_1$T || (templateObject_1$T = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("exa"));
var templateObject_1$T;

var Container$C = styled.h2(templateObject_1$S || (templateObject_1$S = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("peta"));
var templateObject_1$S;

var Container$B = styled.h3(templateObject_1$R || (templateObject_1$R = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("tera"));
var templateObject_1$R;

var Container$A = styled.h4(templateObject_1$Q || (templateObject_1$Q = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("giga"));
var templateObject_1$Q;

var Container$z = styled.h5(templateObject_1$P || (templateObject_1$P = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("mega"));
var templateObject_1$P;

var StyledH6 = styled.h6(templateObject_1$O || (templateObject_1$O = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$O;

var StyledDiv = styled.div(templateObject_1$N || (templateObject_1$N = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$N;

var Container$y = styled.div(templateObject_1$M || (templateObject_1$M = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), Font("mega"));
var templateObject_1$M;

var Container$x = styled.div(templateObject_1$L || (templateObject_1$L = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("milli"));
var templateObject_1$L;

var StyledP = styled.p(templateObject_1$K || (templateObject_1$K = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$K;

var Container$w = styled.div(templateObject_1$J || (templateObject_1$J = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("peta"));
var templateObject_1$J;

var Container$v = styled.small(templateObject_1$I || (templateObject_1$I = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("milli"));
var templateObject_1$I;

var Container$u = styled.div(templateObject_1$H || (templateObject_1$H = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("tera"));
var templateObject_1$H;

var Container$t = styled.div(templateObject_1$G || (templateObject_1$G = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("yotta"));
var templateObject_1$G;

var Container$s = styled.div(templateObject_1$F || (templateObject_1$F = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("zetta"));
var templateObject_1$F;

var Container$r = styled.div(templateObject_1$E || (templateObject_1$E = __makeTemplateObject(["\n  width: 100%;\n  margin-bottom: 2px;\n  display: flex;\n  flex-direction: column;\n"], ["\n  width: 100%;\n  margin-bottom: 2px;\n  display: flex;\n  flex-direction: column;\n"])));
var InputContainer = styled.div(templateObject_4$b || (templateObject_4$b = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n  align-items: stretch;\n  box-shadow: 0px 4px 2px -2px #f6f6f6;\n\n  ", "\n\n  &:focus-within {\n    box-shadow: 0px 4px 2px -2px #6b6b6b;\n  }\n\n  ", "\n"], ["\n  display: flex;\n  width: 100%;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n  align-items: stretch;\n  box-shadow: 0px 4px 2px -2px #f6f6f6;\n\n  ", "\n\n  &:focus-within {\n    box-shadow: 0px 4px 2px -2px #6b6b6b;\n  }\n\n  ", "\n"])), function (_a) {
    var disabled = _a.disabled;
    return disabled
        ? css(templateObject_2$v || (templateObject_2$v = __makeTemplateObject(["\n          background-color: rgba(239, 239, 239, 0.3);\n          color: rgb(84, 84, 84);\n          cursor: not-allowed;\n        "], ["\n          background-color: rgba(239, 239, 239, 0.3);\n          color: rgb(84, 84, 84);\n          cursor: not-allowed;\n        "]))) : "";
}, function (_a) {
    var required = _a.required, pristine = _a.pristine, theme = _a.theme, value = _a.value;
    return required && !pristine && !value
        ? css(templateObject_3$k || (templateObject_3$k = __makeTemplateObject(["\n          box-shadow: 0px 4px 2px -2px ", ";\n        "], ["\n          box-shadow: 0px 4px 2px -2px ", ";\n        "])), theme.colors.utility.red) : "";
});
var ExteriorLabel = styled.label(templateObject_5$8 || (templateObject_5$8 = __makeTemplateObject(["\n  ", "\n  font-weight: bold;\n  text-align: left;\n  margin-bottom: 10px;\n"], ["\n  ", "\n  font-weight: bold;\n  text-align: left;\n  margin-bottom: 10px;\n"])), Font("mega"));
var Pill$1 = styled.span(templateObject_6$6 || (templateObject_6$6 = __makeTemplateObject(["\n  ", "\n  text-align: center;\n  background-color: ", ";\n  padding: ", ";\n  height: calc(100% - 17px);\n  margin: 8.5px 0;\n  border-radius: ", ";\n"], ["\n  ", "\n  text-align: center;\n  background-color: ", ";\n  padding: ", ";\n  height: calc(100% - 17px);\n  margin: 8.5px 0;\n  border-radius: ", ";\n"])), Font("milli"), function (_a) {
    var theme = _a.theme, isString = _a.isString;
    return isString ? theme.colors.core.label : "transparent";
}, function (_a) {
    var isString = _a.isString;
    return (isString ? "10px" : "0");
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.main;
});
var StyledInput$2 = styled.input(templateObject_8$3 || (templateObject_8$3 = __makeTemplateObject(["\n  ", "\n  font-size: 22px;\n  border: none;\n  outline: none;\n  padding: 0;\n  width: 100%;\n  padding-right: 6px;\n  background-color: transparent;\n\n  ", "\n"], ["\n  ", "\n  font-size: 22px;\n  border: none;\n  outline: none;\n  padding: 0;\n  width: 100%;\n  padding-right: 6px;\n  background-color: transparent;\n\n  ", "\n"])), Font("mega"), function (_a) {
    var disabled = _a.disabled;
    return disabled
        ? css(templateObject_7$4 || (templateObject_7$4 = __makeTemplateObject(["\n          background: unset;\n          cursor: not-allowed;\n        "], ["\n          background: unset;\n          cursor: not-allowed;\n        "]))) : "";
});
var StyledKilo$3 = styled(StyledDiv)(templateObject_9$3 || (templateObject_9$3 = __makeTemplateObject(["\n  color: ", ";\n  margin-top: 10px;\n"], ["\n  color: ", ";\n  margin-top: 10px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core["900"];
});
var Input = function (_a) {
    var value = _a.value, onChange = _a.onChange, type = _a.type, label = _a.label, pill = _a.pill, name = _a.name, id = _a.id, placeholder = _a.placeholder, className = _a.className, hint = _a.hint, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.required, required = _c === void 0 ? false : _c, _d = _a.step, step = _d === void 0 ? "0.1" : _d, min = _a.min, max = _a.max;
    var _e = useState(true), pristine = _e[0], setPristine = _e[1];
    var ID = typeof id === "string" ? id : getUniqueId("input");
    return (React.createElement(Container$r, { className: className },
        label && React.createElement(ExteriorLabel, { htmlFor: ID }, label),
        React.createElement(InputContainer, { disabled: disabled, pristine: pristine, required: required, value: value },
            pill ? React.createElement(Pill$1, { isString: typeof pill === "string" }, pill) : null,
            React.createElement(StyledInput$2, { id: ID, name: name, value: value, type: type, placeholder: placeholder, onChange: function (e) { return onChange(e.target.value); }, disabled: disabled, "aria-disabled": disabled, required: required, onFocus: function () { return setPristine(false); }, step: step, min: min, max: max })),
        hint && React.createElement(StyledKilo$3, null, hint)));
};
var templateObject_1$E, templateObject_2$v, templateObject_3$k, templateObject_4$b, templateObject_5$8, templateObject_6$6, templateObject_7$4, templateObject_8$3, templateObject_9$3;

var Section = styled.section(templateObject_2$u || (templateObject_2$u = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 12px;\n  background: ", ";\n  box-shadow: ", ";\n  border-radius: ", ";\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 12px;\n  background: ", ";\n  box-shadow: ", ";\n  border-radius: ", ";\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, Media.md(templateObject_1$D || (templateObject_1$D = __makeTemplateObject(["\n    padding: 20px;\n  "], ["\n    padding: 20px;\n  "]))));
var templateObject_1$D, templateObject_2$u;

var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["Standard"] = 0] = "Standard";
    ButtonType[ButtonType["White"] = 1] = "White";
    ButtonType[ButtonType["Gray"] = 2] = "Gray";
    ButtonType[ButtonType["Clear"] = 3] = "Clear";
})(ButtonType || (ButtonType = {}));
var Button = styled.button.attrs(function (_a) {
    var disabled = _a.disabled, rest = __rest(_a, ["disabled"]);
    return (__assign({ "aria-disabled": disabled, type: "button" }, rest));
})(templateObject_2$t || (templateObject_2$t = __makeTemplateObject(["\n  ", "\n  text-decoration: none;\n  border-radius: ", ";\n  padding: ", ";\n  box-shadow: ", ";\n  border: none;\n  cursor: pointer;\n  transition: ", ";\n  color: ", ";\n  background-color: ", ";\n  width: max-content;\n  height: min-content;\n\n  &:hover {\n    color: ", ";\n    opacity: 0.6;\n    box-shadow: none;\n  }\n\n  ", "\n"], ["\n  ", "\n  text-decoration: none;\n  border-radius: ", ";\n  padding: ", ";\n  box-shadow: ", ";\n  border: none;\n  cursor: pointer;\n  transition: ", ";\n  color: ", ";\n  background-color: ", ";\n  width: max-content;\n  height: min-content;\n\n  &:hover {\n    color: ", ";\n    opacity: 0.6;\n    box-shadow: none;\n  }\n\n  ", "\n"])), Font(), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.button;
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
    return buttonType === ButtonType.White ||
        buttonType === ButtonType.Gray ||
        buttonType === ButtonType.Clear
        ? theme.colors.button.primary
        : theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === ButtonType.Clear
        ? "transparent"
        : buttonType === ButtonType.White
            ? theme.colors.core.white
            : buttonType === ButtonType.Gray
                ? theme.colors.button.gray
                : theme.colors.utility.blue;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === ButtonType.White ||
        buttonType === ButtonType.Gray ||
        buttonType === ButtonType.Clear
        ? theme.colors.button.primary
        : theme.colors.core.white;
}, function (_a) {
    var disabled = _a.disabled;
    return disabled
        ? css(templateObject_1$C || (templateObject_1$C = __makeTemplateObject(["\n          opacity: 0.2;\n\n          &:hover {\n            cursor: not-allowed;\n            opacity: 0.2;\n          }\n        "], ["\n          opacity: 0.2;\n\n          &:hover {\n            cursor: not-allowed;\n            opacity: 0.2;\n          }\n        "]))) : "";
});
var templateObject_1$C, templateObject_2$t;

var Container$q = styled.div(templateObject_1$B || (templateObject_1$B = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 10px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 10px;\n"])));
var MiniContainer = styled.div(templateObject_2$s || (templateObject_2$s = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
var StyledKilo$2 = styled(StyledDiv)(templateObject_5$7 || (templateObject_5$7 = __makeTemplateObject(["\n  ", ";\n\n  color: ", ";\n"], ["\n  ", ";\n\n  color: ", ";\n"])), function (_a) {
    var isValue = _a.isValue;
    return isValue
        ? css(templateObject_3$j || (templateObject_3$j = __makeTemplateObject(["\n          word-break: break-word;\n        "], ["\n          word-break: break-word;\n        "]))) : css(templateObject_4$a || (templateObject_4$a = __makeTemplateObject(["\n          flex: 1 0 auto;\n          margin-right: 16px;\n        "], ["\n          flex: 1 0 auto;\n          margin-right: 16px;\n        "])));
}, function (_a) {
    var theme = _a.theme, isDark = _a.isDark, isValue = _a.isValue;
    return isDark && isValue
        ? theme.colors.core.primary
        : isDark
            ? theme.colors.core[800]
            : theme.colors.core.white;
});
var Divider$1 = styled.div(templateObject_6$5 || (templateObject_6$5 = __makeTemplateObject(["\n  background: ", ";\n  opacity: 0.1;\n  height: 2px;\n  width: 100%;\n"], ["\n  background: ", ";\n  opacity: 0.1;\n  height: 2px;\n  width: 100%;\n"])), function (_a) {
    var theme = _a.theme, isDark = _a.isDark;
    return isDark ? theme.colors.core[800] : theme.colors.core.white;
});
var MiniList = function (_a) {
    var info = _a.info, isDark = _a.isDark, className = _a.className;
    return (React.createElement(Container$q, { className: className }, Object.entries(info).map(function (_a, index) {
        var key = _a[0], value = _a[1];
        return (React.createElement(React.Fragment, { key: key },
            React.createElement(MiniContainer, null,
                React.createElement(StyledKilo$2, { isValue: false, isDark: isDark || false },
                    React.createElement("b", null, key)),
                React.createElement(StyledKilo$2, { isValue: true, isDark: isDark || false }, value)),
            index !== Object.entries(info).length - 1 ? (React.createElement(Divider$1, { isDark: isDark || false })) : null));
    })));
};
var templateObject_1$B, templateObject_2$s, templateObject_3$j, templateObject_4$a, templateObject_5$7, templateObject_6$5;

var Container$p = styled.span(templateObject_1$A || (templateObject_1$A = __makeTemplateObject(["\n  border: 0px;\n  clip: rect(0px, 0px, 0px, 0px);\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  padding: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  position: absolute;\n"], ["\n  border: 0px;\n  clip: rect(0px, 0px, 0px, 0px);\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  padding: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  position: absolute;\n"])));
var VisuallyHidden = function (_a) {
    var children = _a.children;
    return (React.createElement(Container$p, null, children));
};
var templateObject_1$A;

var Flex = styled.div(templateObject_1$z || (templateObject_1$z = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"])));
var templateObject_1$z;

var Shimmer = keyframes(templateObject_1$y || (templateObject_1$y = __makeTemplateObject(["\n    0% {\n        background-position: 100% 0;\n    }\n    100% {\n        background-position: -100% 0;\n    }\n"], ["\n    0% {\n        background-position: 100% 0;\n    }\n    100% {\n        background-position: -100% 0;\n    }\n"])));
var LoadingShimmer = styled.div(templateObject_2$r || (templateObject_2$r = __makeTemplateObject(["\n  animation-duration: 2.2s;\n  animation-fill-mode: forwards;\n  animation-iteration-count: infinite;\n  animation-name: ", ";\n  animation-timing-function: linear;\n  background: ", ";\n  background: linear-gradient(\n    to right,\n    ", " 9%,\n    ", " 18%,\n    ", " 27%\n  );\n  background-size: 300% 100%;\n  border-radius: ", ";\n  min-height: 16px;\n  height: 100%;\n  font-size: inherit;\n  line-height: inherit;\n  font-weight: inherit;\n  color: transparent !important;\n\n  & * {\n    color: transparent !important;\n  }\n"], ["\n  animation-duration: 2.2s;\n  animation-fill-mode: forwards;\n  animation-iteration-count: infinite;\n  animation-name: ", ";\n  animation-timing-function: linear;\n  background: ", ";\n  background: linear-gradient(\n    to right,\n    ", " 9%,\n    ", " 18%,\n    ", " 27%\n  );\n  background-size: 300% 100%;\n  border-radius: ", ";\n  min-height: 16px;\n  height: 100%;\n  font-size: inherit;\n  line-height: inherit;\n  font-weight: inherit;\n  color: transparent !important;\n\n  & * {\n    color: transparent !important;\n  }\n"])), Shimmer, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.background;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.background;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.background;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
});
var templateObject_1$y, templateObject_2$r;

var ImageContainer$1 = styled.div(templateObject_1$x || (templateObject_1$x = __makeTemplateObject(["\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  background-color: ", ";\n  border-radius: ", ";\n  transition: transform ", ";\n\n  &:hover {\n    transform: ", ";\n  }\n"], ["\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  background-color: ", ";\n  border-radius: ", ";\n  transition: transform ", ";\n\n  &:hover {\n    transform: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme, enableFullBorderRadius = _a.enableFullBorderRadius;
    return enableFullBorderRadius ? theme.borderRadius.section : 0;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
}, function (_a) {
    var onClick = _a.onClick;
    return typeof onClick !== "undefined" ? "scale(1.10)" : "scale(1)";
});
var ExploreImage = function (_a) {
    var imgSrc = _a.imgSrc, enableFullBorderRadius = _a.enableFullBorderRadius, onClick = _a.onClick, loading = _a.loading;
    var theme = useContext(ThemeContext);
    if (loading) {
        return (React.createElement(LoadingShimmer, null,
            React.createElement(ImageContainer$1, { enableFullBorderRadius: true })));
    }
    return (React.createElement(ImageContainer$1, { enableFullBorderRadius: true, onClick: onClick },
        React.createElement(CrossfadeImage, { src: imgSrc, enableFullBorderRadius: enableFullBorderRadius || false, alt: "Featured Explorer", style: {
                cursor: onClick !== undefined ? "pointer" : "default",
                maxWidth: "auto",
                maxHeight: 480,
                objectFit: "contain",
                width: "100%",
                borderRadius: enableFullBorderRadius ? theme.borderRadius.section : 0,
                borderTopLeftRadius: theme.borderRadius.section,
                borderTopRightRadius: theme.borderRadius.section,
            } })));
};
var templateObject_1$x;

var IndivContainer = styled.div(templateObject_1$w || (templateObject_1$w = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-right: 30px;\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-right: 30px;\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n"])));
var Text = styled(StyledDiv)(templateObject_3$i || (templateObject_3$i = __makeTemplateObject(["\n  ", "\n  margin-bottom: 6px;\n"], ["\n  ", "\n  margin-bottom: 6px;\n"])), Media.md(templateObject_2$q || (templateObject_2$q = __makeTemplateObject(["\n    font-size: 18px;\n  "], ["\n    font-size: 18px;\n  "]))));
var Subtext = styled(Container$x)(templateObject_5$6 || (templateObject_5$6 = __makeTemplateObject(["\n  ", "\n  color: ", ";\n\n  ", "\n"], ["\n  ", "\n  color: ", ";\n\n  ", "\n"])), Font("nano"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
}, Media.md(templateObject_4$9 || (templateObject_4$9 = __makeTemplateObject(["\n  ", "\n  "], ["\n  ", "\n  "])), Font("milli")));
var templateObject_1$w, templateObject_2$q, templateObject_3$i, templateObject_4$9, templateObject_5$6;

var Fallback$1 = function () { return (React.createElement("div", { style: { display: "flex" } },
    React.createElement(IndivContainer, null,
        React.createElement(Text, null,
            React.createElement(LoadingShimmer, null, "00")),
        React.createElement(Subtext, null, "Hours")),
    React.createElement(IndivContainer, null,
        React.createElement(Text, null,
            React.createElement(LoadingShimmer, null, "00")),
        React.createElement(Subtext, null, "Minutes")),
    React.createElement(IndivContainer, null,
        React.createElement(Text, null,
            React.createElement(LoadingShimmer, null, "00")),
        React.createElement(Subtext, null, "Seconds")))); };

var SessionCountdown = function (_a) {
    var endTime = _a.endTime, loading = _a.loading, key = _a.key, onComplete = _a.onComplete, completedText = _a.completedText;
    if (loading) {
        return React.createElement(Fallback$1, null);
    }
    return (React.createElement(Countdown, { date: endTime, key: key, onComplete: onComplete, renderer: function (_a) {
            var hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, completed = _a.completed;
            if (completed) {
                return React.createElement(Text, null, completedText || "Session Completed");
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

// You probably want to change this to something semantic or abandon it all together
var Container$o = styled.div(templateObject_1$v || (templateObject_1$v = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: ", ";\n  align-items: ", ";\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: ", ";\n  align-items: ", ";\n"])), function (_a) {
    var isCardBar = _a.isCardBar;
    return (isCardBar ? "5px" : "10px");
}, function (_a) {
    var isCardBar = _a.isCardBar;
    return (isCardBar ? "flex-start" : "center");
});
var BoldenKilo = styled(StyledDiv)(templateObject_3$h || (templateObject_3$h = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 600;\n  ", "\n\n  ", "\n"], ["\n  color: ", ";\n  font-weight: 600;\n  ", "\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme, isCardBar = _a.isCardBar;
    return isCardBar ? theme.colors.core[900] : "black";
}, Font("micro"), Media.md(templateObject_2$p || (templateObject_2$p = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("kilo")));
var StyledGiga = styled(Container$E)(templateObject_5$5 || (templateObject_5$5 = __makeTemplateObject(["\n  color: ", ";\n  ", ";\n  width: 100%;\n  text-align: inherit;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n\n  ", "\n\n  ", "\n"], ["\n  color: ", ";\n  ", ";\n  width: 100%;\n  text-align: inherit;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n\n  ", "\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme, isCardBar = _a.isCardBar;
    return isCardBar ? theme.colors.core[900] : "black";
}, function (_a) {
    var isCardBar = _a.isCardBar;
    return Font(isCardBar ? "mega" : "giga");
}, Font("mega"), Media.md(templateObject_4$8 || (templateObject_4$8 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("giga")));
var ColoredKilo = styled(StyledDiv)(templateObject_7$3 || (templateObject_7$3 = __makeTemplateObject(["\n  color: ", ";\n\n  ", "\n\n  ", "\n"], ["\n  color: ", ";\n\n  ", "\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
}, Font("micro"), Media.md(templateObject_6$4 || (templateObject_6$4 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), Font("kilo")));
var ExploreInfo = function (_a) {
    var title = _a.title, text = _a.text, unit = _a.unit, isCardBar = _a.isCardBar, className = _a.className;
    return (React.createElement(Container$o, { isCardBar: isCardBar || false, className: className },
        React.createElement(BoldenKilo, { isCardBar: isCardBar || false }, title),
        React.createElement(StyledGiga, { isCardBar: isCardBar || false }, text),
        unit ? React.createElement(ColoredKilo, null, unit) : null));
};
var templateObject_1$v, templateObject_2$p, templateObject_3$h, templateObject_4$8, templateObject_5$5, templateObject_6$4, templateObject_7$3;

var ProfileIcon = styled.img.attrs(function (props) { return (__assign({ alt: "Profile Icon" }, props)); })(templateObject_1$u || (templateObject_1$u = __makeTemplateObject(["\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n"], ["\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n"])));
var templateObject_1$u;

// You probably want to change this to something semantic or abandon it all together
var Container$n = styled.div(templateObject_1$t || (templateObject_1$t = __makeTemplateObject(["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n  width: auto;\n  height: 100%;\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n"], ["\n  border-radius: ", ";\n  background-color: ", ";\n  box-shadow: ", ";\n  width: auto;\n  height: 100%;\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
});
var CardBackground = function (_a) {
    var children = _a.children, isHalfScreen = _a.isHalfScreen, style = _a.style;
    return (React.createElement(Container$n, { style: __assign({}, style), isHalfScreen: isHalfScreen || false }, children));
};
var templateObject_1$t;

// You probably want to change this to something semantic or abandon it all together
var Container$m = styled.div(templateObject_1$s || (templateObject_1$s = __makeTemplateObject(["\n  margin: 0;\n  position: relative;\n  width: max-content;\n"], ["\n  margin: 0;\n  position: relative;\n  width: max-content;\n"])));
var StyledLabel = styled.label(templateObject_2$o || (templateObject_2$o = __makeTemplateObject(["\n  ", ";\n  cursor: pointer;\n  display: block;\n  border: 2px solid ", ";\n  border-radius: 70px;\n  padding: 8px 14px;\n  text-align: center;\n  position: relative;\n  background-color: transparent;\n"], ["\n  ", ";\n  cursor: pointer;\n  display: block;\n  border: 2px solid ", ";\n  border-radius: 70px;\n  padding: 8px 14px;\n  text-align: center;\n  position: relative;\n  background-color: transparent;\n"])), Font(), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
});
var StyledInput$1 = styled.input(templateObject_3$g || (templateObject_3$g = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  opacity: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: -1;\n\n  &:checked ~ ", " {\n    border: 2px solid ", ";\n    color: ", ";\n  }\n\n  &:focus ~ ", " {\n    outline: 1px solid ", ";\n  }\n\n  &:checked&:focus ~ ", " {\n    border: 2px solid ", ";\n    outline: 1px solid ", ";\n    box-shadow: 0 0 0 2px ", ";\n  }\n"], ["\n  position: absolute;\n  top: 0;\n  opacity: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: -1;\n\n  &:checked ~ ", " {\n    border: 2px solid ", ";\n    color: ", ";\n  }\n\n  &:focus ~ ", " {\n    outline: 1px solid ", ";\n  }\n\n  &:checked&:focus ~ ", " {\n    border: 2px solid ", ";\n    outline: 1px solid ", ";\n    box-shadow: 0 0 0 2px ", ";\n  }\n"])), StyledLabel, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, StyledLabel, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
}, StyledLabel, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var Checkbox = function (_a) {
    var checked = _a.checked, label = _a.label, name = _a.name, value = _a.value, id = _a.id, onChange = _a.onChange, _b = _a.type, type = _b === void 0 ? "checkbox" : _b, className = _a.className;
    return (React.createElement(Container$m, { className: className },
        React.createElement(StyledInput$1, { type: type, id: id, name: name, value: value, checked: checked, onChange: onChange }),
        React.createElement(StyledLabel, { htmlFor: id }, label)));
};
var templateObject_1$s, templateObject_2$o, templateObject_3$g;

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

/**
 * @deprecated
 * @description This icon has been deprecated in favour of OutboundLink
 */
var LinkImage = function (_a) {
    var _b = _a.stroke, stroke = _b === void 0 ? "#1C2333" : _b;
    return (React.createElement("svg", { width: "15", height: "16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M4 1.5h10m0 0v10m0-10-13 13", stroke: stroke, strokeOpacity: ".6", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
};

var Eth = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#1C2333" : _b, _c = _a.altFill, altFill = _c === void 0 ? "#FFF" : _c;
    return (React.createElement("svg", { width: "34", height: "34", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M0 16.5C0 7.387 7.387 0 16.5 0S33 7.387 33 16.5 25.613 33 16.5 33 0 25.613 0 16.5Z", fill: fill, fillOpacity: ".6" }),
        React.createElement("path", { d: "m10 16.797 6.507 2.845V6L10 16.797ZM16.508 6v13.642l6.505-2.845L16.508 6Z", fill: altFill }),
        React.createElement("path", { opacity: ".8", fillRule: "evenodd", clipRule: "evenodd", d: "M16.507 27.198 10 19.03l6.507 2.845v5.323Zm0 0v-5.323l6.51-2.845-6.51 8.168Z", fill: altFill })));
};

var Close = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#1C2333" : _b, _c = _a.size, size = _c === void 0 ? 18 : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 28 28", height: size, width: size },
        React.createElement("path", { d: "M17.453 8.668 14 12.121l-3.454-3.453-1.88 1.88 3.454 3.453-3.454 3.454 1.88 1.88L14 15.88l3.453 3.454 1.88-1.88L15.88 14l3.453-3.453-1.88-1.88ZM14 .668A13.321 13.321 0 0 0 .667 14.001c0 7.374 5.96 13.334 13.333 13.334S27.333 21.375 27.333 14C27.333 6.628 21.373.668 14 .668Zm0 24c-5.88 0-10.667-4.787-10.667-10.667S8.12 3.335 14 3.335 24.666 8.12 24.666 14c0 5.88-4.786 10.667-10.666 10.667Z", fill: fill, fillOpacity: ".72" })));
};

var Lock = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#1C2333" : _b;
    return (React.createElement("svg", { width: "19", height: "27", viewBox: "0 0 19 27", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M2.97266 26.1865H15.4014C17.1533 26.1865 18.0039 25.3105 18.0039 23.4189V13.8086C18.0039 12.1074 17.293 11.2188 15.8584 11.0791V7.99414C15.8584 3.13184 12.583 0.795898 9.18066 0.795898C5.77832 0.795898 2.51562 3.13184 2.51562 7.99414V11.1172C1.14453 11.3076 0.357422 12.1836 0.357422 13.8086V23.4189C0.357422 25.3105 1.2207 26.1865 2.97266 26.1865ZM5.19434 7.76562C5.19434 4.94727 6.98438 3.37305 9.18066 3.37305C11.377 3.37305 13.167 4.94727 13.167 7.76562V11.0537L5.19434 11.0664V7.76562Z", fill: fill, fillOpacity: "0.6" })));
};

var ChevronLeft = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#1C2333" : _b;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 8 14", width: "14", height: "14" },
        React.createElement("path", { d: "M7 13 1 7l6-6", stroke: fill, strokeOpacity: ".72", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
};

var Checkmark = function (_a) {
    var _b = _a.stroke, stroke = _b === void 0 ? "#23CE7C" : _b, _c = _a.size, size = _c === void 0 ? 13 : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 13 11", height: size, width: size },
        React.createElement("path", { d: "m.958 6.292 3.167 3.167 7.917-7.917", stroke: stroke, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })));
};

var Twitter = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "20" : _b, _c = _a.brandedColor, brandedColor = _c === void 0 ? false : _c;
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 20 17", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.9167 4.37657C17.9167 4.37599 17.9167 4.37542 17.9167 4.37484C17.9167 4.37478 17.9167 4.37472 17.9167 4.37466L19.7721 2.37263C20.0746 2.0463 19.8026 1.52051 19.3615 1.57885L17.0368 1.88632C16.3111 0.98973 15.2016 0.416504 13.9583 0.416504C11.7722 0.416504 10 2.18871 10 4.37484C10 4.89679 10.101 5.39514 10.2846 5.85141C7.3194 5.78207 4.14454 5.19533 2.53939 2.01507C2.34076 1.62155 1.77136 1.59876 1.64492 2.02104C0.483412 5.90022 2.52751 10.9404 7.03103 12.2915C5.90757 13.39 3.0196 13.6882 0.65626 13.4718C0.196371 13.4297 -0.0923447 13.9536 0.263296 14.2482C2.24496 15.8897 4.99341 16.2498 7.5259 16.2498C13.9575 16.2498 18.4104 10.8081 17.9167 4.37657Z", fill: brandedColor ? "#1DA1F2" : "#6C7388" })));
};
var Discord = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "20" : _b, _c = _a.brandedColor, brandedColor = _c === void 0 ? false : _c;
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 26 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M21.7736 2.40825C20.2094 1.67925 18.532 1.14216 16.7782 0.834542C16.7463 0.828605 16.7144 0.843442 16.6979 0.873116C16.4822 1.26283 16.2433 1.77124 16.0759 2.17084C14.1896 1.884 12.313 1.884 10.4653 2.17084C10.298 1.76235 10.0503 1.26283 9.83363 0.873116C9.81718 0.844432 9.78528 0.829596 9.75334 0.834542C8.00051 1.14117 6.32314 1.67827 4.75797 2.40825C4.74442 2.41418 4.7328 2.42408 4.7251 2.43693C1.54348 7.26487 0.671898 11.9741 1.09947 16.625C1.1014 16.6478 1.11398 16.6695 1.13139 16.6834C3.23053 18.2492 5.26391 19.1997 7.25952 19.8298C7.29146 19.8397 7.3253 19.8278 7.34563 19.8011C7.81769 19.1463 8.23849 18.4559 8.59929 17.7299C8.62058 17.6873 8.60026 17.6369 8.55674 17.6201C7.88928 17.3629 7.25372 17.0494 6.64235 16.6933C6.594 16.6646 6.59013 16.5943 6.63461 16.5607C6.76326 16.4628 6.89195 16.3609 7.0148 16.258C7.03702 16.2393 7.068 16.2353 7.09413 16.2472C11.1105 18.1097 15.4588 18.1097 19.4278 16.2472C19.4539 16.2343 19.4849 16.2383 19.5081 16.2571C19.6309 16.3599 19.7596 16.4628 19.8892 16.5607C19.9337 16.5943 19.9308 16.6646 19.8824 16.6933C19.2711 17.0563 18.6355 17.3629 17.9671 17.6191C17.9236 17.6359 17.9042 17.6873 17.9255 17.7299C18.294 18.4549 18.7148 19.1453 19.1782 19.8001C19.1976 19.8278 19.2324 19.8397 19.2643 19.8298C21.2696 19.1997 23.303 18.2492 25.4021 16.6834C25.4205 16.6695 25.4321 16.6488 25.434 16.626C25.9458 11.2491 24.577 6.57843 21.8055 2.43792C21.7987 2.42408 21.7872 2.41418 21.7736 2.40825ZM9.19908 13.7931C7.98986 13.7931 6.99351 12.6655 6.99351 11.2807C6.99351 9.89595 7.97054 8.76837 9.19908 8.76837C10.4373 8.76837 11.424 9.90585 11.4046 11.2807C11.4046 12.6655 10.4276 13.7931 9.19908 13.7931ZM17.3538 13.7931C16.1446 13.7931 15.1483 12.6655 15.1483 11.2807C15.1483 9.89595 16.1253 8.76837 17.3538 8.76837C18.592 8.76837 19.5787 9.90585 19.5594 11.2807C19.5594 12.6655 18.592 13.7931 17.3538 13.7931Z", fill: brandedColor ? "#7289da" : "#6C7388" })));
};
var Medium = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "20" : _b, _c = _a.brandedColor, brandedColor = _c === void 0 ? false : _c;
    return (React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M13.488 6.895c0 3.727-3.002 6.749-6.704 6.749S.081 10.622.081 6.894C.081 3.168 3.082.146 6.784.146c3.703 0 6.704 3.022 6.704 6.75ZM20.841 6.895c0 3.508-1.5 6.354-3.351 6.354s-3.352-2.846-3.352-6.354c0-3.509 1.5-6.354 3.351-6.354s3.352 2.844 3.352 6.354ZM23.85 6.895c0 3.143-.529 5.692-1.18 5.692-.65 0-1.178-2.549-1.178-5.692 0-3.144.527-5.693 1.178-5.693.651 0 1.18 2.549 1.18 5.693Z", fill: brandedColor ? "#1C2333" : "#6C7388" })));
};

var OutboundLink = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#323232" : _b, _c = _a.size, size = _c === void 0 ? 12 : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 13", height: size },
        React.createElement("path", { d: "M10.667 11.167H1.333V1.833H6V.5H1.333C.593.5 0 1.1 0 1.833v9.334C0 11.9.593 12.5 1.333 12.5h9.334c.733 0 1.333-.6 1.333-1.333V6.5h-1.333v4.667ZM7.333.5v1.333h2.394L3.173 8.387l.94.94 6.554-6.554v2.394H12V.5H7.333Z", fill: fill })));
};

var DownChevron = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#323232" : _b, _c = _a.size, size = _c === void 0 ? 8 : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 8 6", width: size, height: size * 0.75 },
        React.createElement("path", { d: "M7.06.227 4 3.28.94.227l-.94.94 4 4 4-4-.94-.94Z", fill: fill })));
};

var Hamburger = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "#323232" : _b, _c = _a.size, size = _c === void 0 ? 18 : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 18 12", width: size, height: size * (12 / 18) },
        React.createElement("path", { d: "M0 11a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H1a1 1 0 0 0-1 1Zm0-5a1 1 0 0 0 1 1h16a1 1 0 1 0 0-2H1a1 1 0 0 0-1 1Zm1-6a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2H1Z", fill: fill })));
};

var Activity = function () { return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
    React.createElement("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }))); };

var Remove = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 24 : _b, _c = _a.fill, fill = _c === void 0 ? "#F33636" : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", height: size, width: size },
        React.createElement("path", { d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0Zm6 13.2H6v-2.4h12v2.4Z", fill: fill })));
};

var Add = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 24 : _b, _c = _a.fill, fill = _c === void 0 ? "#1C2333" : _c;
    return (React.createElement("svg", { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 17", height: size, width: size },
        React.createElement("path", { d: "M8 .5c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8Zm4 8.8H8.8v3.2H7.2V9.3H4V7.7h3.2V4.5h1.6v3.2H12v1.6Z", fill: fill })));
};

var Spin = keyframes(templateObject_1$r || (templateObject_1$r = __makeTemplateObject(["\n   from {\n        transform:rotate(0deg);\n    }\n    to {\n        transform:rotate(360deg);\n    }\n"], ["\n   from {\n        transform:rotate(0deg);\n    }\n    to {\n        transform:rotate(360deg);\n    }\n"])));
var StyledSVG$1 = styled.svg(templateObject_2$n || (templateObject_2$n = __makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: 5000ms;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n"], ["\n  animation-name: ", ";\n  animation-duration: 5000ms;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n"])), Spin);
var Spinner = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 16 : _b;
    return (React.createElement(StyledSVG$1, { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 1024 1024", height: size, width: size, xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z", stroke: "none" })));
};
var templateObject_1$r, templateObject_2$n;

var Error = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 16 : _b, _c = _a.fill, fill = _c === void 0 ? "#F33636" : _c;
    return (React.createElement("svg", { stroke: "currentColor", fill: fill, strokeWidth: "0", viewBox: "0 0 24 24", height: size, width: size, xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("path", { d: "M11 7h2v7h-2zm0 8h2v2h-2z", stroke: "none" }),
        React.createElement("path", { d: "m21.707 7.293-5-5A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707zM20 15.586 15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z", stroke: "none" })));
};

// You probably want to change this to something semantic or abandon it all together
var Container$l = styled.div(templateObject_1$q || (templateObject_1$q = __makeTemplateObject(["\n  padding: 10px 20px;\n  border-radius: 56px;\n  border: 2px solid ", ";\n  display: flex;\n  grid-gap: 10px;\n  align-items: center;\n  width: fit-content;\n"], ["\n  padding: 10px 20px;\n  border-radius: 56px;\n  border: 2px solid ", ";\n  display: flex;\n  grid-gap: 10px;\n  align-items: center;\n  width: fit-content;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
});
var MegaStyled$2 = styled(Container$y)(templateObject_2$m || (templateObject_2$m = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 600;\n"], ["\n  color: ", ";\n  font-weight: 600;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
});
var AbacusBalance = function (_a) {
    var balance = _a.balance, _b = _a.isEth, isEth = _b === void 0 ? true : _b;
    var theme = useContext(ThemeContext);
    return (React.createElement(Container$l, null,
        isEth && React.createElement(Eth, { fill: theme.colors.utility.blue }),
        React.createElement(MegaStyled$2, null,
            balance,
            " ",
            isEth ? "ETH" : "ABC")));
};
var templateObject_1$q, templateObject_2$m;

// You probably want to change this to something semantic or abandon it all together
var Container$k = styled.div(templateObject_3$f || (templateObject_3$f = __makeTemplateObject(["\n  position: fixed;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 16px;\n  background-color: ", ";\n  color: ", ";\n  ", "\n  ", ";\n"], ["\n  position: fixed;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 16px;\n  background-color: ", ";\n  color: ", ";\n  ", "\n  ", ";\n"])), function (_a) {
    var type = _a.type, theme = _a.theme;
    switch (type) {
        case "warn":
            return theme.colors.utility.yellow;
        case "error":
            return theme.colors.utility.red;
        case "success":
            return theme.colors.utility.green;
        default:
            return theme.colors.utility.blue;
    }
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var bottom = _a.bottom;
    return bottom
        ? css(templateObject_1$p || (templateObject_1$p = __makeTemplateObject(["\n          bottom: ", ";\n        "], ["\n          bottom: ", ";\n        "])), bottom) : "";
}, function (_a) {
    var top = _a.top;
    return top
        ? css(templateObject_2$l || (templateObject_2$l = __makeTemplateObject(["\n          top: ", ";\n        "], ["\n          top: ", ";\n        "])), top) : "";
});
var PersistentBanner = function (_a) {
    var children = _a.children, rest = __rest(_a, ["children"]);
    return React.createElement(Container$k, __assign({}, rest), children);
};
var templateObject_1$p, templateObject_2$l, templateObject_3$f;

var RECT_HEIGHT = 2.8;
var CIRCLE_RADIUS = 5.65;
var BarY;
(function (BarY) {
    BarY[BarY["I"] = 20] = "I";
    BarY[BarY["II"] = 33.333333333333336] = "II";
    BarY[BarY["III"] = 46.66666666666667] = "III";
    BarY[BarY["IV"] = 60] = "IV";
})(BarY || (BarY = {}));
var FIRST_BEAD_POSITION = 14 + CIRCLE_RADIUS;
var LAST_BEAD_POSITION = 66 - CIRCLE_RADIUS;
var BEAD_GAP = (66 - CIRCLE_RADIUS - (14 + CIRCLE_RADIUS)) / 3;
var BarIBeadII = keyframes(templateObject_1$o || (templateObject_1$o = __makeTemplateObject(["\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(", "px)\n  }\n  100% {\n    transform: translateX(", "px)\n  }\n"], ["\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(", "px)\n  }\n  100% {\n    transform: translateX(", "px)\n  }\n"])), BEAD_GAP, BEAD_GAP);
var BarIBeadI = keyframes(templateObject_2$k || (templateObject_2$k = __makeTemplateObject(["\n  0% {\n    transform: translateX(", "px);\n  }\n  50% {\n    transform: translateX(0)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"], ["\n  0% {\n    transform: translateX(", "px);\n  }\n  50% {\n    transform: translateX(0)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"])), BEAD_GAP);
var BarIIBeadI = keyframes(templateObject_3$e || (templateObject_3$e = __makeTemplateObject(["\n  0% {\n    transform: translateX(", "px);\n  }\n  16.666% {\n    transform: translateX(0)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"], ["\n  0% {\n    transform: translateX(", "px);\n  }\n  16.666% {\n    transform: translateX(0)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"])), BEAD_GAP);
var BarIIBeadII = keyframes(templateObject_4$7 || (templateObject_4$7 = __makeTemplateObject(["\n  0% {\n    transform: 0;\n  }\n  16.666% {\n    transform: translateX(-", "px)\n  }\n  83.333% {\n    transform: translateX(-", "px)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"], ["\n  0% {\n    transform: 0;\n  }\n  16.666% {\n    transform: translateX(-", "px)\n  }\n  83.333% {\n    transform: translateX(-", "px)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"])), BEAD_GAP, BEAD_GAP);
var BarIIIBeadII = keyframes(templateObject_5$4 || (templateObject_5$4 = __makeTemplateObject(["\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(-", "px)\n  }\n  100% {\n    transform: translateX(-", "px)\n  }\n"], ["\n  0% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(-", "px)\n  }\n  100% {\n    transform: translateX(-", "px)\n  }\n"])), BEAD_GAP, BEAD_GAP);
var BarIIIBeadIII = keyframes(templateObject_6$3 || (templateObject_6$3 = __makeTemplateObject(["\n  0% {\n    transform: translateX(-", "px);\n  }\n  50% {\n    transform: translateX(0)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"], ["\n  0% {\n    transform: translateX(-", "px);\n  }\n  50% {\n    transform: translateX(0)\n  }\n  100% {\n    transform: translateX(0)\n  }\n"])), BEAD_GAP);
var BarIVBeadI = keyframes(templateObject_7$2 || (templateObject_7$2 = __makeTemplateObject(["\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(0);\n  }\n  75% {\n    transform: translateX(", "px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n"], ["\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(0);\n  }\n  75% {\n    transform: translateX(", "px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n"])), BEAD_GAP);
var BarIVBeadII = keyframes(templateObject_8$2 || (templateObject_8$2 = __makeTemplateObject(["\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(", "px);\n  }\n  75% {\n    transform: translateX(", "px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n"], ["\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(0);\n  }\n  50% {\n    transform: translateX(", "px);\n  }\n  75% {\n    transform: translateX(", "px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n"])), BEAD_GAP, BEAD_GAP);
var BarIVBeadIII = keyframes(templateObject_9$2 || (templateObject_9$2 = __makeTemplateObject(["\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(", "px);\n  }\n  50% {\n    transform: translateX(", "px);\n  }\n  75% {\n    transform: translateX(", "px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n"], ["\n  0% {\n    transform: translateX(0);\n  }\n  25% {\n    transform: translateX(", "px);\n  }\n  50% {\n    transform: translateX(", "px);\n  }\n  75% {\n    transform: translateX(", "px);\n  }\n  100% {\n    transform: translateX(0);\n  }\n"])), BEAD_GAP, BEAD_GAP, BEAD_GAP);
var BeadsX;
(function (BeadsX) {
    BeadsX[BeadsX["I"] = FIRST_BEAD_POSITION] = "I";
    BeadsX[BeadsX["II"] = FIRST_BEAD_POSITION + BEAD_GAP] = "II";
    BeadsX[BeadsX["III"] = LAST_BEAD_POSITION - BEAD_GAP] = "III";
    BeadsX[BeadsX["IV"] = LAST_BEAD_POSITION] = "IV";
})(BeadsX || (BeadsX = {}));
var StyledSVG = styled.svg(templateObject_10$1 || (templateObject_10$1 = __makeTemplateObject(["\n  & * {\n    transition: all 1s ease;\n  }\n\n  & #bar_1 {\n    & circle:nth-of-type(1) {\n      animation: ", " 1s ease-in-out 1s infinite alternate;\n    }\n\n    & circle:nth-of-type(2) {\n      animation: ", " 1s ease-in-out 0s infinite alternate;\n    }\n  }\n\n  & #bar_2 {\n    & circle:nth-of-type(1) {\n      animation: ", " 3s ease-in-out 0s infinite alternate;\n    }\n\n    & circle:nth-of-type(2) {\n      animation: ", " 3s ease-in-out 0s infinite alternate;\n    }\n\n    & circle:nth-of-type(3) {\n      animation: ", " 3s ease-in-out 1.5s infinite alternate;\n    }\n  }\n\n  & #bar_3 {\n    & circle:nth-of-type(2) {\n      animation: ", " 1.5s ease-in-out 0s infinite alternate;\n    }\n\n    & circle:nth-of-type(3) {\n      animation: ", " 1.5s ease-in-out 1s infinite alternate;\n    }\n  }\n\n  & #bar_4 {\n    & circle:nth-of-type(1) {\n      animation: ", " 3s ease-in-out 0s infinite forwards;\n    }\n\n    & circle:nth-of-type(2) {\n      animation: ", " 3s ease-in-out 0s infinite forwards;\n    }\n\n    & circle:nth-of-type(3) {\n      animation: ", " 3s ease-in-out 0s infinite forwards;\n    }\n  }\n"], ["\n  & * {\n    transition: all 1s ease;\n  }\n\n  & #bar_1 {\n    & circle:nth-of-type(1) {\n      animation: ", " 1s ease-in-out 1s infinite alternate;\n    }\n\n    & circle:nth-of-type(2) {\n      animation: ", " 1s ease-in-out 0s infinite alternate;\n    }\n  }\n\n  & #bar_2 {\n    & circle:nth-of-type(1) {\n      animation: ", " 3s ease-in-out 0s infinite alternate;\n    }\n\n    & circle:nth-of-type(2) {\n      animation: ", " 3s ease-in-out 0s infinite alternate;\n    }\n\n    & circle:nth-of-type(3) {\n      animation: ", " 3s ease-in-out 1.5s infinite alternate;\n    }\n  }\n\n  & #bar_3 {\n    & circle:nth-of-type(2) {\n      animation: ", " 1.5s ease-in-out 0s infinite alternate;\n    }\n\n    & circle:nth-of-type(3) {\n      animation: ", " 1.5s ease-in-out 1s infinite alternate;\n    }\n  }\n\n  & #bar_4 {\n    & circle:nth-of-type(1) {\n      animation: ", " 3s ease-in-out 0s infinite forwards;\n    }\n\n    & circle:nth-of-type(2) {\n      animation: ", " 3s ease-in-out 0s infinite forwards;\n    }\n\n    & circle:nth-of-type(3) {\n      animation: ", " 3s ease-in-out 0s infinite forwards;\n    }\n  }\n"])), BarIBeadI, BarIBeadII, BarIIBeadI, BarIIBeadII, BarIIIBeadIII, BarIIIBeadII, BarIIIBeadIII, BarIVBeadI, BarIVBeadII, BarIVBeadIII);
var Loader = function () { return (React.createElement(StyledSVG, { fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 80 80" },
    React.createElement("g", { filter: "url(#a)" },
        React.createElement("rect", { x: "0", y: "0", width: "80", height: "80", rx: "8", fill: "#fff" }),
        React.createElement("g", { id: "bar_1" },
            React.createElement("rect", { width: "60", rx: "1.412", x: "10", y: BarY.I, height: RECT_HEIGHT, fill: "#3E74FF", fillOpacity: ".2", radius: "10" }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.I + RECT_HEIGHT / 2, cx: BeadsX.I }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.I + RECT_HEIGHT / 2, cx: BeadsX.II }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.I + RECT_HEIGHT / 2, cx: BeadsX.IV })),
        React.createElement("g", { id: "bar_2" },
            React.createElement("rect", { width: "60", rx: "1.412", x: "10", y: BarY.II, height: RECT_HEIGHT, fill: "#3E74FF", fillOpacity: ".2", radius: "10" }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.II + RECT_HEIGHT / 2, cx: BeadsX.I }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.II + RECT_HEIGHT / 2, cx: BeadsX.III }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.II + RECT_HEIGHT / 2, cx: BeadsX.IV })),
        React.createElement("g", { id: "bar_3" },
            React.createElement("rect", { width: "60", rx: "1.412", x: "10", y: BarY.III, height: RECT_HEIGHT, fill: "#3E74FF", fillOpacity: ".2", radius: "10" }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.III + RECT_HEIGHT / 2, cx: BeadsX.I }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.III + RECT_HEIGHT / 2, cx: BeadsX.III }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.III + RECT_HEIGHT / 2, cx: BeadsX.IV })),
        React.createElement("g", { id: "bar_4" },
            React.createElement("rect", { width: "60", rx: "1.412", x: "10", y: BarY.IV, height: "2.824", fill: "#3E74FF", fillOpacity: ".2", radius: "10" }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.IV + RECT_HEIGHT / 2, cx: BeadsX.I }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.IV + RECT_HEIGHT / 2, cx: BeadsX.II }),
            React.createElement("circle", { r: CIRCLE_RADIUS, fill: "#3E74FF", cy: BarY.IV + RECT_HEIGHT / 2, cx: BeadsX.III }))),
    React.createElement("defs", null,
        React.createElement("filter", { id: "a", x: "0", y: "0", width: "80", height: "80", filterUnits: "userSpaceOnUse", colorInterpolationFilters: "sRGB" },
            React.createElement("feFlood", { floodOpacity: "0", result: "BackgroundImageFix" }),
            React.createElement("feColorMatrix", { in: "SourceAlpha", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }),
            React.createElement("feOffset", null),
            React.createElement("feGaussianBlur", { stdDeviation: "14.118" }),
            React.createElement("feComposite", { in2: "hardAlpha", operator: "out" }),
            React.createElement("feColorMatrix", { values: "0 0 0 0 0.854342 0 0 0 0 0.848819 0 0 0 0 0.917847 0 0 0 0.6 0" }),
            React.createElement("feBlend", { in2: "BackgroundImageFix", result: "effect1_dropShadow_1_208" }),
            React.createElement("feColorMatrix", { in: "SourceAlpha", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }),
            React.createElement("feOffset", null),
            React.createElement("feGaussianBlur", { stdDeviation: "3.529" }),
            React.createElement("feComposite", { in2: "hardAlpha", operator: "out" }),
            React.createElement("feColorMatrix", { values: "0 0 0 0 0.681333 0 0 0 0 0.646667 0 0 0 0 0.82 0 0 0 0.15 0" }),
            React.createElement("feBlend", { in2: "effect1_dropShadow_1_208", result: "effect2_dropShadow_1_208" }),
            React.createElement("feBlend", { in: "SourceGraphic", in2: "effect2_dropShadow_1_208", result: "shape" }))))); };
var Loader$1 = React.memo(Loader);
var templateObject_1$o, templateObject_2$k, templateObject_3$e, templateObject_4$7, templateObject_5$4, templateObject_6$3, templateObject_7$2, templateObject_8$2, templateObject_9$2, templateObject_10$1;

// You probably want to change this to something semantic or abandon it all together
var Container$j = styled.div(templateObject_1$n || (templateObject_1$n = __makeTemplateObject(["\n  background: ", ";\n  border-radius: ", ";\n  position: relative;\n  min-height: 24px;\n  overflow: hidden;\n"], ["\n  background: ", ";\n  border-radius: ", ";\n  position: relative;\n  min-height: 24px;\n  overflow: hidden;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.gray;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
});
var Progress = styled.div(templateObject_2$j || (templateObject_2$j = __makeTemplateObject(["\n  position: absolute;\n  border-bottom-left-radius: ", ";\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  border-bottom-right-radius: ", ";\n  background: ", ";\n  min-width: calc(100% * ", ");\n  top: 0;\n  left: 0;\n  bottom: 0;\n  transition: min-width 0.3s ease-in-out;\n  z-index: 0;\n"], ["\n  position: absolute;\n  border-bottom-left-radius: ", ";\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  border-bottom-right-radius: ", ";\n  background: ", ";\n  min-width: calc(100% * ", ");\n  top: 0;\n  left: 0;\n  bottom: 0;\n  transition: min-width 0.3s ease-in-out;\n  z-index: 0;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme, progress = _a.progress;
    return progress === 1 ? theme.borderRadius.section : 0;
}, function (_a) {
    var theme = _a.theme, progress = _a.progress;
    return progress === 1 ? theme.borderRadius.section : 0;
}, function (_a) {
    var theme = _a.theme, progress = _a.progress;
    return progress < 1 ? theme.colors.utility.yellow : theme.colors.utility.green;
}, function (_a) {
    var progress = _a.progress;
    return progress;
});
var Label = styled(StyledDiv)(templateObject_3$d || (templateObject_3$d = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: ", ";\n"], ["\n  position: relative;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
});
var ProgressBar = function (_a) {
    var progress = _a.progress, label = _a.label, className = _a.className;
    if (progress < 0 || progress > 1) {
        console.warn("Abacus UI | Progress Bar", "Progress should be a number between 0 and 1 representing the percentage of progress, you passed: ".concat(progress));
    }
    return (React.createElement(Container$j, { className: className },
        React.createElement(Progress, { progress: progress }),
        React.createElement(Label, null, label)));
};
var templateObject_1$n, templateObject_2$j, templateObject_3$d;

var Container$i = styled.div(templateObject_1$m || (templateObject_1$m = __makeTemplateObject(["\n  position: relative;\n  height: 48px;\n  margin-top: 16px;\n  margin-bottom: -14px;\n"], ["\n  position: relative;\n  height: 48px;\n  margin-top: 16px;\n  margin-bottom: -14px;\n"])));
var StyledInput = styled.input(templateObject_2$i || (templateObject_2$i = __makeTemplateObject(["\n  &[type=\"range\"] {\n    height: 100%;\n    -webkit-appearance: none;\n    margin: 0;\n    width: 100%;\n  }\n  &[type=\"range\"]:focus {\n    outline: none;\n  }\n  &[type=\"range\"]::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 0px;\n    cursor: pointer;\n    box-shadow: none;\n    background: ", ";\n    border-radius: 0px;\n    border: 1px solid ", ";\n  }\n  &[type=\"range\"]::-webkit-slider-thumb {\n    box-shadow: none;\n    border: 2px solid ", ";\n    height: 24px;\n    width: 24px;\n    border-radius: 24px;\n    background: ", ";\n    cursor: pointer;\n    -webkit-appearance: none;\n    transform: translateY(-50%);\n  }\n  &[type=\"range\"]:focus::-webkit-slider-runnable-track {\n    background: ", ";\n  }\n  &[type=\"range\"]::-moz-range-track {\n    width: 100%;\n    height: 0px;\n    cursor: pointer;\n    box-shadow: none;\n    background: ", ";\n    border-radius: 0px;\n    border: 1px solid ", ";\n  }\n  &[type=\"range\"]::-moz-range-thumb {\n    box-shadow: none;\n    border: 2px solid ", ";\n    height: 24px;\n    width: 24px;\n    border-radius: 24px;\n    background: ", ";\n    cursor: pointer;\n  }\n  &[type=\"range\"]::-ms-track {\n    width: 100%;\n    height: 0px;\n    cursor: pointer;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n  }\n  &[type=\"range\"]::-ms-fill-lower {\n    background: ", ";\n    border: 1px solid ", ";\n    border-radius: 0px;\n    box-shadow: none;\n  }\n  &[type=\"range\"]::-ms-fill-upper {\n    background: ", ";\n    border: 1px solid ", ";\n    border-radius: 0px;\n    box-shadow: none;\n  }\n  &[type=\"range\"]::-ms-thumb {\n    margin-top: 1px;\n    box-shadow: none;\n    border: 2px solid ", ";\n    height: 24px;\n    width: 24px;\n    border-radius: 24px;\n    background: ", ";\n    cursor: pointer;\n  }\n  &[type=\"range\"]:focus::-ms-fill-lower {\n    background: ", ";\n  }\n  &[type=\"range\"]:focus::-ms-fill-upper {\n    background: ", ";\n  }\n"], ["\n  &[type=\"range\"] {\n    height: 100%;\n    -webkit-appearance: none;\n    margin: 0;\n    width: 100%;\n  }\n  &[type=\"range\"]:focus {\n    outline: none;\n  }\n  &[type=\"range\"]::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 0px;\n    cursor: pointer;\n    box-shadow: none;\n    background: ", ";\n    border-radius: 0px;\n    border: 1px solid ", ";\n  }\n  &[type=\"range\"]::-webkit-slider-thumb {\n    box-shadow: none;\n    border: 2px solid ", ";\n    height: 24px;\n    width: 24px;\n    border-radius: 24px;\n    background: ", ";\n    cursor: pointer;\n    -webkit-appearance: none;\n    transform: translateY(-50%);\n  }\n  &[type=\"range\"]:focus::-webkit-slider-runnable-track {\n    background: ", ";\n  }\n  &[type=\"range\"]::-moz-range-track {\n    width: 100%;\n    height: 0px;\n    cursor: pointer;\n    box-shadow: none;\n    background: ", ";\n    border-radius: 0px;\n    border: 1px solid ", ";\n  }\n  &[type=\"range\"]::-moz-range-thumb {\n    box-shadow: none;\n    border: 2px solid ", ";\n    height: 24px;\n    width: 24px;\n    border-radius: 24px;\n    background: ", ";\n    cursor: pointer;\n  }\n  &[type=\"range\"]::-ms-track {\n    width: 100%;\n    height: 0px;\n    cursor: pointer;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n  }\n  &[type=\"range\"]::-ms-fill-lower {\n    background: ", ";\n    border: 1px solid ", ";\n    border-radius: 0px;\n    box-shadow: none;\n  }\n  &[type=\"range\"]::-ms-fill-upper {\n    background: ", ";\n    border: 1px solid ", ";\n    border-radius: 0px;\n    box-shadow: none;\n  }\n  &[type=\"range\"]::-ms-thumb {\n    margin-top: 1px;\n    box-shadow: none;\n    border: 2px solid ", ";\n    height: 24px;\n    width: 24px;\n    border-radius: 24px;\n    background: ", ";\n    cursor: pointer;\n  }\n  &[type=\"range\"]:focus::-ms-fill-lower {\n    background: ", ";\n  }\n  &[type=\"range\"]:focus::-ms-fill-upper {\n    background: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
});
var StyledOutput = styled.output(templateObject_3$c || (templateObject_3$c = __makeTemplateObject(["\n  background: ", ";\n  color: white;\n  padding: 2px 10px;\n  position: absolute;\n  width: max-content;\n  border-radius: 4px;\n  font-size: 14px;\n  line-height: 140%;\n  left: 0;\n  bottom: 40px;\n  transform: translateX(-50%);\n  visibility: ", ";\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    width: 5px;\n    height: 5px;\n    background: ", ";\n    top: 100%;\n    left: 50%;\n    transform-origin: center;\n    transform: translate(-50%, -50%) rotateZ(45deg);\n  }\n"], ["\n  background: ", ";\n  color: white;\n  padding: 2px 10px;\n  position: absolute;\n  width: max-content;\n  border-radius: 4px;\n  font-size: 14px;\n  line-height: 140%;\n  left: 0;\n  bottom: 40px;\n  transform: translateX(-50%);\n  visibility: ", ";\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    width: 5px;\n    height: 5px;\n    background: ", ";\n    top: 100%;\n    left: 50%;\n    transform-origin: center;\n    transform: translate(-50%, -50%) rotateZ(45deg);\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
}, function (_a) {
    var visible = _a.visible;
    return (visible ? "visible" : "hidden");
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.blue;
});
var CustomLockDuration = function (_a) {
    var id = _a.id, value = _a.value, setValue = _a.setValue, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.outputFormatter, outputFormatter = _d === void 0 ? null : _d, _e = _a.step, step = _e === void 0 ? 0.1 : _e;
    var outputRef = useRef(null);
    var validValue = value !== null && typeof value !== "undefined";
    useEffect(function () {
        if (validValue && outputRef.current) {
            var newVal = Number(((value - min) * 100) / (max - min));
            outputRef.current.style.left = "calc(".concat(newVal, "% + (").concat(13 - 26 * (newVal / 100), "px))");
        }
    }, [max, min, validValue, value]);
    return (React.createElement(Container$i, null,
        React.createElement(StyledInput, { type: "range", id: id, name: id, min: min, max: max, value: value, step: step, onChange: function (e) { return setValue(Number(e.target.value)); } }),
        React.createElement(StyledOutput, { visible: validValue, ref: outputRef }, typeof outputFormatter === "function" ? outputFormatter(value) : value)));
};
var templateObject_1$m, templateObject_2$i, templateObject_3$c;

var Container$h = styled.div(templateObject_1$l || (templateObject_1$l = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  position: relative;\n\n  & svg {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    right: 20px;\n  }\n"], ["\n  display: flex;\n  gap: 10px;\n  position: relative;\n\n  & svg {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    right: 20px;\n  }\n"])));
var StyledSelect = styled.select(templateObject_2$h || (templateObject_2$h = __makeTemplateObject(["\n  ", ";\n  border: none;\n  padding: 13px 20px;\n  padding-right: 38px;\n  background-color: ", ";\n  border-radius: ", ";\n  appearance: none;\n  width: 100%;\n"], ["\n  ", ";\n  border: none;\n  padding: 13px 20px;\n  padding-right: 38px;\n  background-color: ", ";\n  border-radius: ", ";\n  appearance: none;\n  width: 100%;\n"])), Font("kilo"), function (_a) {
    var theme = _a.theme;
    return theme.colors.button.secondary;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.button;
});
var Option = styled.option(templateObject_3$b || (templateObject_3$b = __makeTemplateObject(["\n  padding: 12px;\n"], ["\n  padding: 12px;\n"])));
var Select = function (_a) {
    var className = _a.className, options = _a.options, value = _a.value, setValue = _a.setValue;
    return (React.createElement(Container$h, null,
        React.createElement(StyledSelect, { className: className, value: value, onChange: function (e) { return setValue(e.target.value); } }, options.map(function (option) { return (React.createElement(Option, { key: option }, option)); })),
        React.createElement(DownChevron, null)));
};
var templateObject_1$l, templateObject_2$h, templateObject_3$b;

var Pill = styled.span(templateObject_1$k || (templateObject_1$k = __makeTemplateObject(["\n  padding: 8px 14px;\n  border-radius: 70px;\n  background-color: transparent;\n  border: 2px solid ", ";\n  width: max-content;\n"], ["\n  padding: 8px 14px;\n  border-radius: 70px;\n  background-color: transparent;\n  border: 2px solid ", ";\n  width: max-content;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
});
var templateObject_1$k;

var PetaModified = styled.div(templateObject_1$j || (templateObject_1$j = __makeTemplateObject(["\n  ", ";\n  margin-left: 8px;\n  color: ", ";\n"], ["\n  ", ";\n  margin-left: 8px;\n  color: ", ";\n"])), Font("peta", "Bluu Next"), function (_a) {
    var isDark = _a.isDark, theme = _a.theme;
    return isDark ? theme.colors.core.white : theme.colors.button.primary;
});
var Container$g = styled.div(templateObject_2$g || (templateObject_2$g = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  transition: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  cursor: pointer;\n  transition: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var Logo = function (_a) {
    var onClick = _a.onClick, _b = _a.isDark, isDark = _b === void 0 ? false : _b, className = _a.className;
    return (React.createElement(Container$g, { onClick: onClick, className: className },
        React.createElement(Abacus, { fill: isDark ? "white" : "black" }),
        React.createElement(PetaModified, { isDark: isDark }, "Abacus")));
};
var templateObject_1$j, templateObject_2$g;

var Container$f = styled.div(templateObject_1$i || (templateObject_1$i = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: fit-content;\n"])));
var StatText = styled.div(templateObject_2$f || (templateObject_2$f = __makeTemplateObject(["\n  ", ";\n  color: ", ";\n  text-align: center;\n  display: flex;\n  justify-content: center;\n"], ["\n  ", ";\n  color: ", ";\n  text-align: center;\n  display: flex;\n  justify-content: center;\n"])), Font("yotta", "Bluu Next"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
});
var Title$1 = styled(Container$y)(templateObject_3$a || (templateObject_3$a = __makeTemplateObject(["\n  color: ", ";\n  font-size: 22px;\n  text-align: center;\n"], ["\n  color: ", ";\n  font-size: 22px;\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
});
var StatInfo = function (_a) {
    var stat = _a.stat, title = _a.title, _b = _a.showEthIcon, showEthIcon = _b === void 0 ? false : _b, className = _a.className;
    return (React.createElement(Container$f, { className: className },
        React.createElement(StatText, null,
            stat,
            " ",
            showEthIcon ? (React.createElement("div", { style: { marginLeft: 8, marginTop: 5, fontSize: 59 } }, "\u039E")) : null),
        React.createElement(Title$1, null, title)));
};
var templateObject_1$i, templateObject_2$f, templateObject_3$a;

var Container$e = styled.div(templateObject_3$9 || (templateObject_3$9 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  grid-gap: 20px;\n  width: 100%;\n  justify-content: space-evenly;\n\n  ", "\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  grid-gap: 20px;\n  width: 100%;\n  justify-content: space-evenly;\n\n  ", "\n\n  ", "\n"])), Media.sm(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n    padding: 0 50px;\n  "], ["\n    padding: 0 50px;\n  "]))), Media.lg(templateObject_2$e || (templateObject_2$e = __makeTemplateObject(["\n    padding: 0 110px;\n  "], ["\n    padding: 0 110px;\n  "]))));
var PetaStyled = styled(Container$w)(templateObject_4$6 || (templateObject_4$6 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n  font-weight: bold;\n"], ["\n  color: ", ";\n  text-align: center;\n  font-weight: bold;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
});
var MegaStyled$1 = styled(Container$y)(templateObject_6$2 || (templateObject_6$2 = __makeTemplateObject(["\n  flex: 1 0 auto;\n  font-size: 1.375rem;\n  color: ", ";\n  text-align: center;\n\n  ", "\n"], ["\n  flex: 1 0 auto;\n  font-size: 1.375rem;\n  color: ", ";\n  text-align: center;\n\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, Media.md(templateObject_5$3 || (templateObject_5$3 = __makeTemplateObject(["\n    text-align: left;\n  "], ["\n    text-align: left;\n  "]))));
var IconContainer = styled.div(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n  height: 100px;\n  aspect-ratio: 1 / 1;\n"], ["\n  height: 100px;\n  aspect-ratio: 1 / 1;\n"])));
var StyledButton = styled(Button)(templateObject_9$1 || (templateObject_9$1 = __makeTemplateObject(["\n  border-radius: 35px;\n  margin: 0 auto;\n  margin-top: 4px;\n  padding: 22px 30px;\n\n  ", "\n"], ["\n  border-radius: 35px;\n  margin: 0 auto;\n  margin-top: 4px;\n  padding: 22px 30px;\n\n  ", "\n"])), Media.md(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject(["\n    padding: 22px 100px;\n  "], ["\n    padding: 22px 100px;\n  "]))));
var Infographic = function (_a) {
    var icon = _a.icon, title = _a.title, description = _a.description, link = _a.link;
    return (React.createElement(Container$e, null,
        React.createElement(PetaStyled, null, title),
        React.createElement(IconContainer, null, icon),
        React.createElement(MegaStyled$1, null, description),
        React.createElement(StyledButton, { as: "a", href: link }, title)));
};
var templateObject_1$h, templateObject_2$e, templateObject_3$9, templateObject_4$6, templateObject_5$3, templateObject_6$2, templateObject_7$1, templateObject_8$1, templateObject_9$1;

var ImageSection = styled.img(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["\n  width: 280px;\n  height: 280px;\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  object-fit: cover;\n"], ["\n  width: 280px;\n  height: 280px;\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  object-fit: cover;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
});
var MegaStyled = styled(Container$y)(templateObject_2$d || (templateObject_2$d = __makeTemplateObject(["\n  color: ", ";\n  font-family: \"Bluu Next\";\n  padding-bottom: 24px;\n  text-decoration: none;\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n"], ["\n  color: ", ";\n  font-family: \"Bluu Next\";\n  padding-bottom: 24px;\n  text-decoration: none;\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Container$d = styled.div(templateObject_3$8 || (templateObject_3$8 = __makeTemplateObject(["\n  position: relative;\n  border-radius: ", ";\n  background-color: rgba(255, 255, 255, 0.1);\n  transition: ", ";\n  padding: 0px;\n  width: 280px;\n  height: 480px;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"], ["\n  position: relative;\n  border-radius: ", ";\n  background-color: rgba(255, 255, 255, 0.1);\n  transition: ", ";\n  padding: 0px;\n  width: 280px;\n  height: 480px;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var BottomSection = styled.div(templateObject_4$5 || (templateObject_4$5 = __makeTemplateObject(["\n  padding: 24px;\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n"], ["\n  padding: 24px;\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n"])));
var SessionCard = function (_a) {
    var imgSrc = _a.imgSrc, title = _a.title, bounty = _a.bounty, participants = _a.participants, appraisal = _a.appraisal, nftAddress = _a.nftAddress, tokenId = _a.tokenId, nonce = _a.nonce;
    return (React.createElement(Container$d, null,
        React.createElement(ImageSection, { src: imgSrc, alt: "".concat(title) }),
        React.createElement(BottomSection, null,
            React.createElement(MegaStyled, { as: "a", href: "https://app.abacus.wtf/current-session?address=".concat(nftAddress, "&tokenId=").concat(tokenId, "&nonce=").concat(nonce) }, title),
            React.createElement(MiniList, { info: {
                    "Bounty + Staked": "".concat(bounty, " ETH"),
                    Participants: "".concat(participants, " People"),
                    Appraisal: "".concat(appraisal, " ETH"),
                } }))));
};
var templateObject_1$g, templateObject_2$d, templateObject_3$8, templateObject_4$5;

// You probably want to change this to something semantic or abandon it all together
var Container$c = styled.div(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"])));
var StyledLink = styled.a(templateObject_2$c || (templateObject_2$c = __makeTemplateObject(["\n  display: flex;\n  margin: 0 12px;\n  cursor: pointer;\n\n  &:first-of-type {\n    margin-left: 0;\n  }\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n\n  & path {\n    fill: ", ";\n  }\n\n  &:hover,\n  &:focus {\n    & path {\n      fill: ", ";\n    }\n  }\n"], ["\n  display: flex;\n  margin: 0 12px;\n  cursor: pointer;\n\n  &:first-of-type {\n    margin-left: 0;\n  }\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n\n  & path {\n    fill: ", ";\n  }\n\n  &:hover,\n  &:focus {\n    & path {\n      fill: ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var SocialLinks = function (_a) {
    var twitter = _a.twitter, discord = _a.discord, medium = _a.medium, className = _a.className, _b = _a.size, size = _b === void 0 ? "20" : _b;
    return (React.createElement(Container$c, { className: className },
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
var templateObject_1$f, templateObject_2$c;

var ButtonStyled = styled(Button)(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["\n  grid-gap: 8px;\n  display: flex;\n  flex-direction: row;\n  color: black;\n  padding: 0px;\n"], ["\n  grid-gap: 8px;\n  display: flex;\n  flex-direction: row;\n  color: black;\n  padding: 0px;\n"])));
var ProfileInfo = function (_a) {
    var profileName = _a.profileName, profileIcon = _a.profileIcon;
    return (React.createElement(ButtonStyled, { buttonType: ButtonType.Clear },
        React.createElement(ProfileIcon, { src: profileIcon }),
        React.createElement(StyledDiv, null, profileName)));
};
var templateObject_1$e;

// You probably want to change this to something semantic or abandon it all together
var Container$b = styled.div(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  border-radius: 60px;\n  box-shadow: ", ";\n  padding: 20px;\n  background-color: ", ";\n  width: fit-content;\n  display: flex;\n  height: 16px;\n  align-items: center;\n"], ["\n  border-radius: 60px;\n  box-shadow: ", ";\n  padding: 20px;\n  background-color: ", ";\n  width: fit-content;\n  display: flex;\n  height: 16px;\n  align-items: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.button;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Bead = styled.button(templateObject_2$b || (templateObject_2$b = __makeTemplateObject(["\n  background-color: ", ";\n  cursor: ", ";\n  border-radius: 20px;\n  height: 16px;\n  width: 12px;\n  border: 1px solid ", ";\n  position: absolute;\n  z-index: 1;\n  transform: translateX(\n    ", "px\n  );\n  ", "\n\n  transition: transform ", ";\n"], ["\n  background-color: ", ";\n  cursor: ", ";\n  border-radius: 20px;\n  height: 16px;\n  width: 12px;\n  border: 1px solid ", ";\n  position: absolute;\n  z-index: 1;\n  transform: translateX(\n    ", "px\n  );\n  ", "\n\n  transition: transform ", ";\n"])), function (_a) {
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
    var loading = _a.loading;
    return (loading ? "transform: translateX(0px);" : "");
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var GradientLine = styled.div(templateObject_3$7 || (templateObject_3$7 = __makeTemplateObject(["\n  height: 2px;\n  width: 250px;\n  z-index: 0;\n  background: linear-gradient(90deg, #3e74ff -14.08%, rgba(0, 0, 0, 0) 127.23%);\n"], ["\n  height: 2px;\n  width: 250px;\n  z-index: 0;\n  background: linear-gradient(90deg, #3e74ff -14.08%, rgba(0, 0, 0, 0) 127.23%);\n"])));
var AbacusBar = function (_a) {
    var currentPosition = _a.currentPosition, totalNumberOfBeads = _a.totalNumberOfBeads, changeToPosition = _a.changeToPosition, loading = _a.loading;
    return (React.createElement(Container$b, null,
        React.createElement(GradientLine, null),
        _.map(_.range(0, totalNumberOfBeads), function (i) { return (React.createElement(Bead, { key: i, beadPosition: i, currentPosition: currentPosition, maxPosition: totalNumberOfBeads, loading: Boolean(loading), onClick: function () {
                if (i !== currentPosition) {
                    changeToPosition(i);
                }
            } })); })));
};
var templateObject_1$d, templateObject_2$b, templateObject_3$7;

var Container$a = styled.div(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  display: flex;\n"], ["\n  display: flex;\n"])));
var RoundLoadingShimmer = styled(LoadingShimmer)(templateObject_2$a || (templateObject_2$a = __makeTemplateObject(["\n  border-radius: 100%;\n  height: 36px;\n  width: 36px;\n  margin-right: -8px;\n"], ["\n  border-radius: 100%;\n  height: 36px;\n  width: 36px;\n  margin-right: -8px;\n"])));
var Fallback = function () { return (React.createElement(Container$a, null,
    React.createElement(RoundLoadingShimmer, null),
    React.createElement(RoundLoadingShimmer, null),
    React.createElement(RoundLoadingShimmer, null),
    React.createElement(RoundLoadingShimmer, null),
    React.createElement(RoundLoadingShimmer, null))); };
var templateObject_1$c, templateObject_2$a;

var ProfileContainer = styled.div(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n"], ["\n  display: flex;\n  flex-direction: row;\n"])));
var PlusIcon = styled.div(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n  border: 2px solid #fff;\n  height: 36px;\n  width: 36px;\n  margin-right: -8px;\n  background-color: #f6f6f6;\n  ", ";\n  color: ", ";\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  border: 2px solid #fff;\n  height: 36px;\n  width: 36px;\n  margin-right: -8px;\n  background-color: #f6f6f6;\n  ", ";\n  color: ", ";\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])), Font("milli"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var ProfileGroup = function (_a) {
    var imgs = _a.imgs, numParticipants = _a.numParticipants, loading = _a.loading;
    if (loading) {
        return React.createElement(Fallback, null);
    }
    return (React.createElement(ProfileContainer, null, _.map(_.range(0, imgs.length > 9 ? 9 : imgs.length), function (i) {
        if (i === 8) {
            return React.createElement(PlusIcon, { key: "plus-icon" },
                "+",
                numParticipants - 9);
        }
        return (React.createElement(ProfileIcon, { key: i, src: imgs[i], alt: "", style: {
                border: "2px solid #fff",
                height: 36,
                width: 36,
                marginRight: -8,
            } }));
    })));
};
var templateObject_1$b, templateObject_2$9;

// You probably want to change this to something semantic or abandon it all together
var Container$9 = styled.div(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  justify-content: space-between;\n  align-items: center;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  justify-content: space-between;\n  align-items: center;\n\n  ", "\n"])), Media.lg(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n    display: grid;\n    grid-template-columns: 40% 60%;\n    flex-direction: row;\n    justify-content: flex-start;\n  "], ["\n    display: grid;\n    grid-template-columns: 40% 60%;\n    flex-direction: row;\n    justify-content: flex-start;\n  "]))));
var InfoWrapper = styled.div(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 50% 50%;\n  align-items: flex-start;\n\n  ", "\n\n  ", "\n"], ["\n  display: grid;\n  grid-template-columns: 50% 50%;\n  align-items: flex-start;\n\n  ", "\n\n  ", "\n"])), Media.sm(templateObject_3$6 || (templateObject_3$6 = __makeTemplateObject(["\n    grid-template-columns: repeat(3, calc(100%/3));\n  "], ["\n    grid-template-columns: repeat(3, calc(100%/3));\n  "]))), Media.lg(templateObject_4$4 || (templateObject_4$4 = __makeTemplateObject(["\n    width: 100%;\n    justfy-content: space-evenly;\n  "], ["\n    width: 100%;\n    justfy-content: space-evenly;\n  "]))));
var TitleContainer = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n  overflow: hidden;\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  width: 100%;\n  overflow: hidden;\n\n  ", "\n"])), Media.lg(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n    align-items: flex-start;\n    text-align: left;\n    flex: 1 0 auto;\n    padding: 0 36px;\n    width: 100%;\n  "], ["\n    align-items: flex-start;\n    text-align: left;\n    flex: 1 0 auto;\n    padding: 0 36px;\n    width: 100%;\n  "]))));
var Title = styled(Container$w)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  font-family: \"Bluu Next\";\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"], ["\n  display: flex;\n  font-family: \"Bluu Next\";\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"])));
var StyledExploreInfo = styled(ExploreInfo)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  margin-top: 16px;\n\n  &:first-of-type {\n    margin-right: 16px;\n  }\n\n  ", "\n"], ["\n  margin-top: 16px;\n\n  &:first-of-type {\n    margin-right: 16px;\n  }\n\n  ", "\n"])), Media.lg(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    margin: 0;\n  "], ["\n    margin: 0;\n  "]))));
var CardBar = function (_a) {
    var _b, _c;
    var title = _a.title, poolAmount = _a.poolAmount, poolAmountUSD = _a.poolAmountUSD, participants = _a.participants, owner = _a.owner;
    return (React.createElement(Section, null,
        React.createElement(Container$9, null,
            React.createElement(TitleContainer, null,
                React.createElement(Title, null, title),
                React.createElement(ProfileGroup, { imgs: participants, numParticipants: (_b = participants.length) !== null && _b !== void 0 ? _b : 0 })),
            React.createElement(InfoWrapper, null,
                React.createElement(StyledExploreInfo, { title: "Pool Amount", text: "".concat(poolAmount, " \u039E"), unit: "$".concat(poolAmountUSD), isCardBar: true }),
                React.createElement(StyledExploreInfo, { title: "Participants", text: "".concat((_c = participants === null || participants === void 0 ? void 0 : participants.length) !== null && _c !== void 0 ? _c : 0), unit: "People", isCardBar: true }),
                React.createElement(StyledExploreInfo, { title: "Owner", text: "".concat(owner), isCardBar: true })))));
};
var templateObject_1$a, templateObject_2$8, templateObject_3$6, templateObject_4$4, templateObject_5$2, templateObject_6$1, templateObject_7, templateObject_8, templateObject_9, templateObject_10;

var KiloStyled$2 = styled(StyledDiv)(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 600;\n"], ["\n  color: ", ";\n  font-weight: 600;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.semiTitle;
});
var Border = styled.div(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n  background-color: ", ";\n  height: 2px;\n  width: 100%;\n"], ["\n  background-color: ", ";\n  height: 2px;\n  width: 100%;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.border;
});
var Container$8 = styled.div(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 15px;\n  width: 100%;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 15px;\n  width: 100%;\n  height: 100%;\n"])));
var CardWithTitle = function (_a) {
    var title = _a.title, children = _a.children, style = _a.style, noBorder = _a.noBorder;
    return (React.createElement(CardBackground, null,
        React.createElement(Container$8, { style: __assign({}, style) },
            React.createElement(KiloStyled$2, null, title),
            noBorder ? null : React.createElement(Border, null),
            children)));
};
var templateObject_1$9, templateObject_2$7, templateObject_3$5;

var Link = styled.a(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 8px 0px;\n  text-decoration: none;\n  transition: ", ";\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 8px 0px;\n  text-decoration: none;\n  transition: ", ";\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var KiloStyled$1 = styled(StyledDiv)(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 500;\n"], ["\n  color: ", ";\n  font-weight: 500;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
});
var Container$7 = styled.div(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  grid-gap: 5px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  grid-gap: 5px;\n"])));
var PriceHistory = function (_a) {
    var etherscanLink = _a.etherscanLink, openseaLink = _a.openseaLink;
    return (React.createElement(CardWithTitle, { title: "Price History" },
        React.createElement(Container$7, null,
            React.createElement(Link, { style: { paddingTop: 5 }, href: etherscanLink },
                React.createElement(KiloStyled$1, null, "Etherscan"),
                React.createElement(LinkImage, null)),
            React.createElement(Link, { href: openseaLink },
                React.createElement(KiloStyled$1, null, "OpenSea"),
                React.createElement(LinkImage, null)))));
};
var templateObject_1$8, templateObject_2$6, templateObject_3$4;

var AnimatedDropdown = styled(Dropdown)(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject([""], [""])));
var AccordionButton = styled(Button)(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n  display: flex;\n  color: ", ";\n  padding: 16px 6px;\n  align-items: center;\n  width: 100%;\n\n  & ", " {\n    transform: ", ";\n  }\n"], ["\n  display: flex;\n  color: ", ";\n  padding: 16px 6px;\n  align-items: center;\n  width: 100%;\n\n  & ", " {\n    transform: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.primary;
}, AnimatedDropdown, function (_a) {
    var isOpen = _a.isOpen;
    return (isOpen ? "rotateZ(-180deg)" : "rotateZ(0)");
});
var StyledKilo$1 = styled(StyledDiv)(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  padding-left: 16px;\n  font-weight: bold;\n"], ["\n  padding-left: 16px;\n  font-weight: bold;\n"])));
var AccordionItems = styled.div(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject(["\n  margin-top: 2px;\n  display: ", ";\n  flex-wrap: wrap;\n"], ["\n  margin-top: 2px;\n  display: ", ";\n  flex-wrap: wrap;\n"])), function (_a) {
    var isOpen = _a.isOpen;
    return (isOpen ? "flex" : "none");
});
// You probably want to change this to something semantic or abandon it all together
var Container$6 = styled.div(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
var Accordion = function (_a) {
    var title = _a.title, children = _a.children;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    return (React.createElement(Container$6, null,
        React.createElement(AccordionButton, { isOpen: isOpen, buttonType: ButtonType.Clear, onClick: function () { return setIsOpen(function (open) { return !open; }); } },
            React.createElement(AnimatedDropdown, null),
            React.createElement(StyledKilo$1, null, title)),
        React.createElement(AccordionItems, { isOpen: isOpen }, children)));
};
var templateObject_1$7, templateObject_2$5, templateObject_3$3, templateObject_4$3, templateObject_5$1;

// You probably want to change this to something semantic or abandon it all together
var Container$5 = styled.a(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  text-decoration: none;\n  transition: ", ";\n  display: flex;\n  flex-direction: column;\n  width: 220px;\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  text-decoration: none;\n  transition: ", ";\n  display: flex;\n  flex-direction: column;\n  width: 220px;\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var ImageContainer = styled.img(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  border-radius: ", ";\n"], ["\n  border-radius: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.main;
});
var BottomContainer = styled.div(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  margin-top: 11px;\n  padding: 0px 3px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  margin-top: 11px;\n  padding: 0px 3px;\n"])));
var KiloStyled = styled(StyledDiv)(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: 500;\n"], ["\n  color: ", ";\n  font-weight: 500;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
});
var OpenseaObject = function (_a) {
    var src = _a.src, link = _a.link;
    return (React.createElement(Container$5, { href: link },
        React.createElement(ImageContainer, { src: src, alt: "Related in Collection" }),
        React.createElement(BottomContainer, null,
            React.createElement(KiloStyled, null, "OpenSea"),
            React.createElement(LinkImage, null))));
};
var templateObject_1$6, templateObject_2$4, templateObject_3$2, templateObject_4$2;

var Container$4 = styled.div(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  width: 100%;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  display: flex;\n  grid-gap: 20px;\n"], ["\n  width: 100%;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  display: flex;\n  grid-gap: 20px;\n"])));
var PartOfCollection = function (_a) {
    var openseaObjects = _a.openseaObjects;
    return (React.createElement(CardWithTitle, { style: { height: "fit-content" }, title: "Part of Collection" },
        React.createElement(Container$4, null, _.map(openseaObjects, function (openseaObject) { return (React.createElement(OpenseaObject, __assign({ key: openseaObject.link }, openseaObject))); }))));
};
var templateObject_1$5;

var ListContainer = styled.div(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  height: 100%;\n  overflow: scroll;\n  overflow-x: hidden;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  grid-gap: 15px;\n"], ["\n  height: 100%;\n  overflow: scroll;\n  overflow-x: hidden;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  grid-gap: 15px;\n"])));
var RowContainer = styled.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  grid-gap: 10px;\n"], ["\n  display: flex;\n  width: 100%;\n  grid-gap: 10px;\n"])));
var ProfileImage = styled.img(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n"], ["\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n"])));
var TextContainer = styled.div(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  grid-gap: 3px;\n"], ["\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  grid-gap: 3px;\n"])));
var StyledKilo = styled(StyledDiv)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core[900];
});
var EmptyContainer = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  grid-gap: 5px;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  grid-gap: 5px;\n"])));
var ActivitySection = function (_a) {
    var activityList = _a.activityList;
    return (React.createElement(CardWithTitle, { title: "Activity" },
        React.createElement(ListContainer, null, activityList.length > 0 ? (_.map(activityList, function (activity) { return (React.createElement(RowContainer, { key: activity.id },
            React.createElement(ProfileImage, { src: activity.img }),
            React.createElement(TextContainer, null,
                React.createElement(StyledDiv, { style: { fontWeight: 600 } }, activity.appraisorAddress),
                React.createElement(StyledKilo, null,
                    activity.appraisalAmount,
                    " ETH appraisal with a",
                    " ",
                    activity.stakeAmount,
                    " ETH stake")))); })) : (React.createElement(EmptyContainer, null,
            React.createElement("img", { src: "../../../../static/white_cube.png", alt: "White Cube" }),
            React.createElement(Container$y, { style: { fontWeight: 500, textAlign: "center" } }, "Nobody has appraised yet!"),
            React.createElement(StyledKilo, { style: { textAlign: "center" } }, "This will show all the people who submitted their appraisal."))))));
};
var templateObject_1$4, templateObject_2$3, templateObject_3$1, templateObject_4$1, templateObject_5, templateObject_6;

var Container$3 = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  display: ", ";\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: ", ";\n  background-repeat: no-repeat;\n  background-size: cover;\n  backdrop-filter: blur(40px);\n  z-index: ", ";\n  padding: 12px;\n  transition: opacity 0.33s ease, z-index 0.33s ease;\n  opacity: ", ";\n  overflow-y: scroll;\n\n  ", "\n"], ["\n  display: ", ";\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: ", ";\n  background-repeat: no-repeat;\n  background-size: cover;\n  backdrop-filter: blur(40px);\n  z-index: ", ";\n  padding: 12px;\n  transition: opacity 0.33s ease, z-index 0.33s ease;\n  opacity: ", ";\n  overflow-y: scroll;\n\n  ", "\n"])), function (_a) {
    var isOpen = _a.isOpen;
    return (isOpen ? "unset" : "none");
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.modalBg;
}, function (_a) {
    var isOpen = _a.isOpen;
    return (isOpen ? "10" : "-1");
}, function (_a) {
    var isOpen = _a.isOpen;
    return (isOpen ? 1 : 0);
}, Media.sm(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    overflow-y: hidden;\n    padding: 16px;\n  "], ["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    overflow-y: hidden;\n    padding: 16px;\n  "]))));
var ModalBody = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin: 0;\n  max-width: 1040px;\n  height: max-content;\n  opacity: 1;\n  overflow: auto;\n  position: relative;\n\n  ", "\n"], ["\n  margin: 0;\n  max-width: 1040px;\n  height: max-content;\n  opacity: 1;\n  overflow: auto;\n  position: relative;\n\n  ", "\n"])), Media.sm(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    max-height: 90vh;\n  "], ["\n    max-height: 90vh;\n  "]))));
var preventBubbling = function (e) {
    e.stopPropagation();
};
var OpenAppModal = function (_a) {
    var isOpen = _a.isOpen, closeModal = _a.closeModal, children = _a.children;
    useEffect(function () {
        var closeOnEsc = function (e) {
            if (isOpen && (e.key === "Escape" || e.code === "Escape")) {
                closeModal();
            }
        };
        document.addEventListener("keydown", closeOnEsc);
        return function () { return document.removeEventListener("keydown", closeOnEsc); };
    }, [isOpen, closeModal]);
    return (React.createElement(Container$3, { onClick: closeModal, isOpen: isOpen },
        React.createElement(ModalBody, { onClick: preventBubbling },
            React.createElement(Section, null, children))));
};
var templateObject_1$3, templateObject_2$2, templateObject_3, templateObject_4;

// You probably want to change this to something semantic or abandon it all together
var Container$2 = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
var Navbar = function (_a) {
    var children = _a.children;
    return (React.createElement(Container$2, null, children));
};
var templateObject_1$2;

var Container$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 90px;\n  width: 100%;\n  height: fit-content;\n"], ["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 90px;\n  width: 100%;\n  height: fit-content;\n"])));
var Divider = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);\n  min-width: 2px;\n"], ["\n  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);\n  min-width: 2px;\n"])));
var SplitSection = function (_a) {
    var leftSection = _a.leftSection, rightSection = _a.rightSection;
    return (React.createElement(Container$1, null,
        leftSection,
        React.createElement(Divider, null),
        rightSection));
};
var templateObject_1$1, templateObject_2$1;

var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 100%;\n  height: fit-content;\n"], ["\n  max-width: 100%;\n  height: fit-content;\n"])));
var SessionContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  grid-gap: 40px;\n"], ["\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  grid-gap: 40px;\n"])));
var PreviousSessionsAutoScroll = function (_a) {
    var sessions = _a.sessions;
    return (React.createElement(Container, null,
        React.createElement(SessionContainer, { sessionLength: sessions.length }, sessions.map(function (session) { return (React.createElement(SessionCard, __assign({}, session))); }))));
};
var templateObject_1, templateObject_2;

export { AbacusBalance, AbacusBar, AbacusCrowds as AbacusCrowdsIcon, Abacus as AbacusIcon, AbacusSpot as AbacusSpotIcon, Accordion, Activity, ActivitySection, Add, Button, ButtonType, CardBackground, CardBar, CardWithTitle, Checkbox, Checkmark, ChevronLeft, Close, Discord, DownChevron, Dropdown, Eth as ETH, Error, Container$F as Exa, ExploreImage, ExploreInfo, Extras, Flex, Font, FontImport, Container$E as Giga, Container$D as H1, Container$C as H2, Container$B as H3, Container$A as H4, Container$z as H5, StyledH6 as H6, Hamburger, Infographic, Input, StyledDiv as Kilo, LinkImage, Loader$1 as Loader, LoadingShimmer, Lock, Logo, Media, Medium, Container$y as Mega, Container$x as Milli, MiniList, OpenAppModal as Modal, Navbar, OutboundLink, StyledP as P, PartOfCollection, PersistentBanner, Container$w as Peta, Pill, PreviousSessionsAutoScroll, PriceHistory, ProfileGroup, ProfileIcon, ProfileInfo, ProgressBar, CustomLockDuration as Range, Remove, Section, Select, SessionCard, SessionCountdown, Container$v as Small, SocialLinks, Spinner, SplitSection, StatInfo, Container$u as Tera, Twitter, VisuallyHidden, Container$t as Yotta, Container$s as Zetta, breakpoints, defaultTheme };
//# sourceMappingURL=index.js.map
