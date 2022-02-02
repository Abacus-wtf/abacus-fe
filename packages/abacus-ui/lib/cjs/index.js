'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

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
            primary: "#1C233399",
            900: "rgba(28, 35, 51, 0.72)",
            800: "rgba(28, 35, 51, 0.6)",
            700: "rgba(28, 35, 51, 0.4)",
            border: "rgba(28, 35, 51, 0.04)",
            lightWhite: "rgba(255, 255, 255, 0.8)",
            white: "white",
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
            black: "#000000",
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
        nano: {},
        micro: {},
        milli: {
            "font-size": "14px",
            "line-height": "17px",
        },
        kilo: {
            "font-size": "16px",
            "line-height": "19px",
        },
        mega: {
            "font-size": "20px",
            "line-height": "24px",
        },
        giga: {
            "font-size": "24px",
            "line-height": "29px",
        },
        tera: {
            "font-size": "26px",
            "line-height": "31.47px",
        },
        peta: {
            "font-size": "30px",
            "line-height": "36px",
        },
        exa: {
            "font-size": "32px",
            "line-height": "38.73px",
        },
        zetta: {
            "font-size": "34px",
            "line-height": "40.8px",
        },
        yotta: {
            "font-size": "38px",
            "line-height": "45.6px",
        },
        nina: {
            "font-size": "48px",
            "line-height": "57.6px",
        },
        tena: {
            "font-size": "72px",
            "line-height": "78.6px",
        },
    },
};
var FontImport = function () { return styled.css(templateObject_1$u || (templateObject_1$u = __makeTemplateObject(["\n  @import url(\"https://rsms.me/inter/inter.css\");\n"], ["\n  @import url(\"https://rsms.me/inter/inter.css\");\n"]))); };
var Font = function (size, fontFamily) {
    if (size === void 0) { size = "kilo"; }
    if (fontFamily === void 0) { fontFamily = "Inter"; }
    return styled.css(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n  font-family: \"", "\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  ", ";\n"], ["\n  font-family: \"", "\", sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  ",
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
})(Sizes || (Sizes = {}));
var breakpoints = [
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
        return styled.css(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n      @media (min-width: ", ") {\n        ", ";\n      }\n    "], ["\n      @media (min-width: ", ") {\n        ", ";\n      }\n    "])), value, styled.css.apply(void 0, __spreadArrays([first], interpolations)));
    };
    return __assign(__assign({}, accumulator), (_b = {}, _b[size] = nextMedia, _b));
}, {
    sm: styled.css,
    md: styled.css,
    lg: styled.css,
});
var templateObject_1$u, templateObject_2$9, templateObject_3$5;

var InputContainer = styled__default["default"].div(templateObject_1$t || (templateObject_1$t = __makeTemplateObject(["\n  background-color: white;\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0px 2px 0px #f6f6f6;\n\n  &:focus-within {\n    box-shadow: 0px 2px 0px #6b6b6b;\n  }\n"], ["\n  background-color: white;\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0px 2px 0px #f6f6f6;\n\n  &:focus-within {\n    box-shadow: 0px 2px 0px #6b6b6b;\n  }\n"])));
var StyledLabel = styled__default["default"].label(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n  ", "\n  text-align: center;\n  background-color: ", ";\n  padding: 10px;\n  height: calc(100% - 17px);\n  margin: 8.5px 0;\n  border-radius: ", ";\n"], ["\n  ", "\n  text-align: center;\n  background-color: ", ";\n  padding: 10px;\n  height: calc(100% - 17px);\n  margin: 8.5px 0;\n  border-radius: ", ";\n"])), Font("milli"), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.main;
});
var StyledInput = styled__default["default"].input(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  ", "\n  border: none;\n  outline: none;\n  padding: 0;\n  width: 100%;\n"], ["\n  ", "\n  border: none;\n  outline: none;\n  padding: 0;\n  width: 100%;\n"])), Font("mega"));
var Input = function (_a) {
    var value = _a.value, onChange = _a.onChange, type = _a.type, label = _a.label, name = _a.name, id = _a.id;
    var ID = typeof id === "string" ? id : getUniqueId("input");
    return (React__default["default"].createElement(InputContainer, null,
        typeof label === "string" && label && (React__default["default"].createElement(StyledLabel, { htmlFor: ID }, label)),
        React__default["default"].createElement(StyledInput, { id: ID, name: name, value: value, type: type, onChange: function (e) { return onChange(e.target.value); } })));
};
var templateObject_1$t, templateObject_2$8, templateObject_3$4;

var Container$p = styled__default["default"].section(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 20px;\n  background: ", ";\n  box-shadow: ", ";\n  border-radius: ", ";\n\n  ", "\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: 20px;\n  background: ", ";\n  box-shadow: ", ";\n  border-radius: ", ";\n\n  ",
    "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.boxShadow.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, Media.sm(templateObject_1$s || (templateObject_1$s = __makeTemplateObject(["\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n  "], ["\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n  "]))));
var Section = function (_a) {
    var children = _a.children;
    return (React__default["default"].createElement(Container$p, null, children));
};
var templateObject_1$s, templateObject_2$7;

exports.ButtonType = void 0;
(function (ButtonType) {
    ButtonType[ButtonType["Standard"] = 0] = "Standard";
    ButtonType[ButtonType["White"] = 1] = "White";
    ButtonType[ButtonType["Clear"] = 2] = "Clear";
})(exports.ButtonType || (exports.ButtonType = {}));
var Container$o = styled__default["default"].button(templateObject_1$r || (templateObject_1$r = __makeTemplateObject(["\n  ", "\n  border-radius: ", ";\n  padding: ", ";\n  box-shadow: ", ";\n  border: none;\n  cursor: pointer;\n  transition: ", ";\n  color: ", ";\n  background-color: ", ";\n  width: max-content;\n\n  &:hover {\n    opacity: 0.6;\n    box-shadow: none;\n  }\n"], ["\n  ", "\n  border-radius: ", ";\n  padding: ", ";\n  box-shadow: ",
    ";\n  border: none;\n  cursor: pointer;\n  transition: ", ";\n  color: ",
    ";\n  background-color: ",
    ";\n  width: max-content;\n\n  &:hover {\n    opacity: 0.6;\n    box-shadow: none;\n  }\n"])), Font(), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.padding.main;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === exports.ButtonType.Clear ? "none" : theme.boxShadow.button;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === exports.ButtonType.White
        ? theme.colors.button.primary
        : theme.colors.core.white;
}, function (_a) {
    var theme = _a.theme, buttonType = _a.buttonType;
    return buttonType === exports.ButtonType.Standard
        ? theme.colors.utility.blue
        : buttonType === exports.ButtonType.White
            ? theme.colors.core.white
            : "transparent";
});
var Button = function (_a) {
    var children = _a.children, onClick = _a.onClick, disabled = _a.disabled, _b = _a.type, type = _b === void 0 ? exports.ButtonType.Standard : _b, className = _a.className;
    return (React__default["default"].createElement(Container$o, { className: className, buttonType: type, disabled: disabled, onClick: onClick }, children));
};
var templateObject_1$r;

var StyledDiv = styled__default["default"].div(templateObject_1$q || (templateObject_1$q = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$q;

var Container$n = styled__default["default"].div(templateObject_1$p || (templateObject_1$p = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 10px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  grid-gap: 10px;\n"])));
var MiniContainer = styled__default["default"].div(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
var StyledKilo = styled__default["default"](StyledDiv)(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  color: ", ";\n"], ["\n  color: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Divider$1 = styled__default["default"].div(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  background: #ffffff;\n  opacity: 0.1;\n  height: 2px;\n  width: 100%;\n"], ["\n  background: #ffffff;\n  opacity: 0.1;\n  height: 2px;\n  width: 100%;\n"])));
var MiniList = function (_a) {
    var info = _a.info;
    return (React__default["default"].createElement(Container$n, null, Object.entries(info).map(function (_a, index) {
        var key = _a[0], value = _a[1];
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(MiniContainer, null,
                React__default["default"].createElement(StyledKilo, null,
                    React__default["default"].createElement("b", null, key)),
                React__default["default"].createElement(StyledKilo, null, value)),
            index !== Object.entries(info).length - 1 ? React__default["default"].createElement(Divider$1, null) : null));
    })));
};
var templateObject_1$p, templateObject_2$6, templateObject_3$3, templateObject_4$2;

var Container$m = styled__default["default"].span(templateObject_1$o || (templateObject_1$o = __makeTemplateObject(["\n  border: 0px;\n  clip: rect(0px, 0px, 0px, 0px);\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  padding: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  position: absolute;\n"], ["\n  border: 0px;\n  clip: rect(0px, 0px, 0px, 0px);\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  padding: 0px;\n  overflow: hidden;\n  white-space: nowrap;\n  position: absolute;\n"])));
var VisuallyHidden = function (_a) {
    var children = _a.children;
    return (React__default["default"].createElement(Container$m, null, children));
};
var templateObject_1$o;

var Container$l = styled__default["default"].div(templateObject_1$n || (templateObject_1$n = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n"])));
var Flex = function (_a) {
    var children = _a.children;
    return (React__default["default"].createElement(Container$l, null, children));
};
var templateObject_1$n;

var AbacusLogoWhite = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"20\" height=\"1\" rx=\"0.5\" transform=\"matrix(1 0 0 -1 0 3.75)\" fill=\"white\"/>\n<circle r=\"2.5\" transform=\"matrix(1 0 0 -1 17.5 3)\" fill=\"white\"/>\n<circle r=\"2.5\" transform=\"matrix(1 0 0 -1 10 3)\" fill=\"white\"/>\n<rect width=\"20\" height=\"1\" rx=\"0.5\" transform=\"matrix(1 0 0 -1 0 10.75)\" fill=\"white\"/>\n<circle r=\"2.5\" transform=\"matrix(1 0 0 -1 10 10)\" fill=\"white\"/>\n<circle r=\"2.5\" transform=\"matrix(1 0 0 -1 2.5 10)\" fill=\"white\"/>\n<rect width=\"20\" height=\"1\" rx=\"0.5\" transform=\"matrix(1 0 0 -1 0 17.75)\" fill=\"white\"/>\n<circle r=\"2.5\" transform=\"matrix(1 0 0 -1 17.5 17)\" fill=\"white\"/>\n<circle r=\"2.5\" transform=\"matrix(1 0 0 -1 2.5 17)\" fill=\"white\"/>\n</svg>";

var AbacusLogoDark = "<svg width=\"38\" height=\"38\" viewBox=\"0 0 38 38\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"37.1248\" height=\"1.85624\" rx=\"0.92812\" transform=\"matrix(1 0 0 -1 0.155441 7.06525)\" fill=\"#1A1A1A\"/>\n<circle r=\"4.6406\" transform=\"matrix(1 0 0 -1 32.6397 5.67309)\" fill=\"#1A1A1A\"/>\n<circle r=\"4.6406\" transform=\"matrix(1 0 0 -1 18.7178 5.67309)\" fill=\"#1A1A1A\"/>\n<rect width=\"37.1248\" height=\"1.85624\" rx=\"0.92812\" transform=\"matrix(1 0 0 -1 0.155441 20.059)\" fill=\"#1A1A1A\"/>\n<circle r=\"4.6406\" transform=\"matrix(1 0 0 -1 18.7178 18.6668)\" fill=\"#1A1A1A\"/>\n<circle r=\"4.6406\" transform=\"matrix(1 0 0 -1 4.79604 18.6668)\" fill=\"#1A1A1A\"/>\n<rect width=\"37.1248\" height=\"1.85624\" rx=\"0.92812\" transform=\"matrix(1 0 0 -1 0.155441 33.0527)\" fill=\"#1A1A1A\"/>\n<circle r=\"4.6406\" transform=\"matrix(1 0 0 -1 32.6397 31.6605)\" fill=\"#1A1A1A\"/>\n<circle r=\"4.6406\" transform=\"matrix(1 0 0 -1 4.79604 31.6605)\" fill=\"#1A1A1A\"/>\n</svg>";

var PetaModified = styled__default["default"].div(templateObject_1$m || (templateObject_1$m = __makeTemplateObject(["\n  ", ";\n  color: ", ";\n"], ["\n  ", ";\n  color: ",
    ";\n"])), Font("peta", "Bluu Next"), function (_a) {
    var isDark = _a.isDark, theme = _a.theme;
    return isDark ? theme.colors.button.primary : theme.colors.core.white;
});
var Container$k = styled__default["default"].div(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 8px;\n  cursor: pointer;\n  transition: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 8px;\n  cursor: pointer;\n  transition: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var Logo = function (_a) {
    var onClick = _a.onClick, _b = _a.isDark, isDark = _b === void 0 ? false : _b;
    return (React__default["default"].createElement(Container$k, { onClick: onClick },
        React__default["default"].createElement("img", { style: { width: 20 }, src: isDark ? AbacusLogoDark : AbacusLogoWhite, alt: "Abacus Logo" }),
        React__default["default"].createElement(PetaModified, { isDark: isDark }, "Abacus")));
};
var templateObject_1$m, templateObject_2$5;

var Container$j = styled__default["default"].div(templateObject_1$l || (templateObject_1$l = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), Font("mega"));
var templateObject_1$l;

var Container$i = styled__default["default"].div(templateObject_1$k || (templateObject_1$k = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: fit-content;\n"])));
var StatText = styled__default["default"].div(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  ", ";\n  color: ", ";\n  text-align: center;\n  display: flex;\n"], ["\n  ", ";\n  color: ", ";\n  text-align: center;\n  display: flex;\n"])), Font("tena", "Bluu Next"), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Title = styled__default["default"](Container$j)(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n"], ["\n  color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var StatInfo = function (_a) {
    var stat = _a.stat, title = _a.title, _b = _a.showEthIcon, showEthIcon = _b === void 0 ? false : _b;
    return (React__default["default"].createElement(Container$i, null,
        React__default["default"].createElement(StatText, null,
            stat,
            " ",
            showEthIcon ? (React__default["default"].createElement("div", { style: { marginLeft: 8, marginTop: 5, fontSize: 59 } }, "\u039E")) : null),
        React__default["default"].createElement(Title, null, title)));
};
var templateObject_1$k, templateObject_2$4, templateObject_3$2;

var Container$h = styled__default["default"].div(templateObject_1$j || (templateObject_1$j = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("exa"));
var templateObject_1$j;

var Container$g = styled__default["default"].div(templateObject_1$i || (templateObject_1$i = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("giga"));
var templateObject_1$i;

var Container$f = styled__default["default"].h1(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("exa"));
var templateObject_1$h;

var Container$e = styled__default["default"].h2(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("peta"));
var templateObject_1$g;

var Container$d = styled__default["default"].h3(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("tera"));
var templateObject_1$f;

var Container$c = styled__default["default"].h4(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("giga"));
var templateObject_1$e;

var Container$b = styled__default["default"].h5(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("mega"));
var templateObject_1$d;

var StyledH6 = styled__default["default"].h6(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$c;

var Container$a = styled__default["default"].div(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("milli"));
var templateObject_1$b;

var StyledP = styled__default["default"].p(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font());
var templateObject_1$a;

var Container$9 = styled__default["default"].div(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("peta"));
var templateObject_1$9;

var Container$8 = styled__default["default"].small(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("milli"));
var templateObject_1$8;

var Container$7 = styled__default["default"].div(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("tera"));
var templateObject_1$7;

var Container$6 = styled__default["default"].div(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("yotta"));
var templateObject_1$6;

var Container$5 = styled__default["default"].div(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Font("zetta"));
var templateObject_1$5;

var ImageStyled = styled__default["default"].img(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  transform: rotate(15deg);\n  width: 70%;\n"], ["\n  transform: rotate(15deg);\n  width: 70%;\n"])));
var Container$4 = styled__default["default"].div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  grid-gap: 20px;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  grid-gap: 20px;\n  width: 100%;\n"])));
var ZettaStyled = styled__default["default"](Container$5)(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  font-family: \"Bluu Next\";\n  color: ", ";\n  text-align: center;\n"], ["\n  font-family: \"Bluu Next\";\n  color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var MegaStyled$1 = styled__default["default"](Container$j)(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n"], ["\n  color: ", ";\n  text-align: center;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var Infographic = function (_a) {
    var imgSrc = _a.imgSrc, icon = _a.icon, title = _a.title, description = _a.description, onClick = _a.onClick;
    return (React__default["default"].createElement(Container$4, null,
        React__default["default"].createElement(ImageStyled, { src: imgSrc }),
        React__default["default"].createElement("img", { src: icon, alt: title + " icon", style: { height: 58, width: 58, marginBottom: 10 } }),
        React__default["default"].createElement(ZettaStyled, null, title),
        React__default["default"].createElement(MegaStyled$1, null, description),
        React__default["default"].createElement(Button, { onClick: onClick }, title)));
};
var templateObject_1$4, templateObject_2$3, templateObject_3$1, templateObject_4$1;

var ImageSection = styled__default["default"].img(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  width: 280px;\n  height: 280px;\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  object-fit: cover;\n"], ["\n  width: 280px;\n  height: 280px;\n  border-top-left-radius: ", ";\n  border-top-right-radius: ", ";\n  object-fit: cover;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
});
var MegaStyled = styled__default["default"](Container$j)(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  color: ", ";\n  font-family: \"Bluu Next\";\n  padding-bottom: 24px;\n"], ["\n  color: ", ";\n  font-family: \"Bluu Next\";\n  padding-bottom: 24px;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.core.white;
});
var Container$3 = styled__default["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-radius: ", ";\n  background-color: rgba(255, 255, 255, 0.1);\n  cursor: pointer;\n  transition: ", ";\n  padding: 0px;\n  width: 280px;\n  height: 480px;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"], ["\n  border-radius: ", ";\n  background-color: rgba(255, 255, 255, 0.1);\n  cursor: pointer;\n  transition: ", ";\n  padding: 0px;\n  width: 280px;\n  height: 480px;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.borderRadius.section;
}, function (_a) {
    var theme = _a.theme;
    return theme.transitionTime.main;
});
var BottomSection = styled__default["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 24px;\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n"], ["\n  padding: 24px;\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n"])));
var SessionCard = function (_a) {
    var imgSrc = _a.imgSrc, title = _a.title, bounty = _a.bounty, participants = _a.participants, appraisal = _a.appraisal;
    return (React__default["default"].createElement(Container$3, null,
        React__default["default"].createElement(ImageSection, { src: imgSrc, alt: "" + title }),
        React__default["default"].createElement(BottomSection, null,
            React__default["default"].createElement(MegaStyled, null, title),
            React__default["default"].createElement(MiniList, { info: {
                    "Final Bounty": bounty + " ETH",
                    Participants: participants + " People",
                    Appraisal: appraisal + " ETH",
                } }))));
};
var templateObject_1$3, templateObject_2$2, templateObject_3, templateObject_4;

var Twitter = function () { return (React__default["default"].createElement("svg", { width: "20", height: "17", viewBox: "0 0 20 17", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.9167 4.37657C17.9167 4.37599 17.9167 4.37542 17.9167 4.37484C17.9167 4.37478 17.9167 4.37472 17.9167 4.37466L19.7721 2.37263C20.0746 2.0463 19.8026 1.52051 19.3615 1.57885L17.0368 1.88632C16.3111 0.98973 15.2016 0.416504 13.9583 0.416504C11.7722 0.416504 10 2.18871 10 4.37484C10 4.89679 10.101 5.39514 10.2846 5.85141C7.3194 5.78207 4.14454 5.19533 2.53939 2.01507C2.34076 1.62155 1.77136 1.59876 1.64492 2.02104C0.483412 5.90022 2.52751 10.9404 7.03103 12.2915C5.90757 13.39 3.0196 13.6882 0.65626 13.4718C0.196371 13.4297 -0.0923447 13.9536 0.263296 14.2482C2.24496 15.8897 4.99341 16.2498 7.5259 16.2498C13.9575 16.2498 18.4104 10.8081 17.9167 4.37657Z", fill: "#6C7388" }))); };
var Discord = function () { return (React__default["default"].createElement("svg", { width: "26", height: "20", viewBox: "0 0 26 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default["default"].createElement("path", { d: "M21.7736 2.40825C20.2094 1.67925 18.532 1.14216 16.7782 0.834542C16.7463 0.828605 16.7144 0.843442 16.6979 0.873116C16.4822 1.26283 16.2433 1.77124 16.0759 2.17084C14.1896 1.884 12.313 1.884 10.4653 2.17084C10.298 1.76235 10.0503 1.26283 9.83363 0.873116C9.81718 0.844432 9.78528 0.829596 9.75334 0.834542C8.00051 1.14117 6.32314 1.67827 4.75797 2.40825C4.74442 2.41418 4.7328 2.42408 4.7251 2.43693C1.54348 7.26487 0.671898 11.9741 1.09947 16.625C1.1014 16.6478 1.11398 16.6695 1.13139 16.6834C3.23053 18.2492 5.26391 19.1997 7.25952 19.8298C7.29146 19.8397 7.3253 19.8278 7.34563 19.8011C7.81769 19.1463 8.23849 18.4559 8.59929 17.7299C8.62058 17.6873 8.60026 17.6369 8.55674 17.6201C7.88928 17.3629 7.25372 17.0494 6.64235 16.6933C6.594 16.6646 6.59013 16.5943 6.63461 16.5607C6.76326 16.4628 6.89195 16.3609 7.0148 16.258C7.03702 16.2393 7.068 16.2353 7.09413 16.2472C11.1105 18.1097 15.4588 18.1097 19.4278 16.2472C19.4539 16.2343 19.4849 16.2383 19.5081 16.2571C19.6309 16.3599 19.7596 16.4628 19.8892 16.5607C19.9337 16.5943 19.9308 16.6646 19.8824 16.6933C19.2711 17.0563 18.6355 17.3629 17.9671 17.6191C17.9236 17.6359 17.9042 17.6873 17.9255 17.7299C18.294 18.4549 18.7148 19.1453 19.1782 19.8001C19.1976 19.8278 19.2324 19.8397 19.2643 19.8298C21.2696 19.1997 23.303 18.2492 25.4021 16.6834C25.4205 16.6695 25.4321 16.6488 25.434 16.626C25.9458 11.2491 24.577 6.57843 21.8055 2.43792C21.7987 2.42408 21.7872 2.41418 21.7736 2.40825ZM9.19908 13.7931C7.98986 13.7931 6.99351 12.6655 6.99351 11.2807C6.99351 9.89595 7.97054 8.76837 9.19908 8.76837C10.4373 8.76837 11.424 9.90585 11.4046 11.2807C11.4046 12.6655 10.4276 13.7931 9.19908 13.7931ZM17.3538 13.7931C16.1446 13.7931 15.1483 12.6655 15.1483 11.2807C15.1483 9.89595 16.1253 8.76837 17.3538 8.76837C18.592 8.76837 19.5787 9.90585 19.5594 11.2807C19.5594 12.6655 18.592 13.7931 17.3538 13.7931Z", fill: "#6C7388" }))); };
var Medium = function () { return (React__default["default"].createElement("svg", { width: "24", height: "14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default["default"].createElement("path", { d: "M13.488 6.895c0 3.727-3.002 6.749-6.704 6.749S.081 10.622.081 6.894C.081 3.168 3.082.146 6.784.146c3.703 0 6.704 3.022 6.704 6.75ZM20.841 6.895c0 3.508-1.5 6.354-3.351 6.354s-3.352-2.846-3.352-6.354c0-3.509 1.5-6.354 3.351-6.354s3.352 2.844 3.352 6.354ZM23.85 6.895c0 3.143-.529 5.692-1.18 5.692-.65 0-1.178-2.549-1.178-5.692 0-3.144.527-5.693 1.178-5.693.651 0 1.18 2.549 1.18 5.693Z", fill: "#fff" }))); };

// You probably want to change this to something semantic or abandon it all together
var Container$2 = styled__default["default"].div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"])));
var StyledLink = styled__default["default"].a(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  display: flex;\n  margin: 0 12px;\n  cursor: pointer;\n\n  &:first-of-type {\n    margin-left: 0;\n  }\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n\n  & path {\n    fill: ", ";\n  }\n\n  &:hover,\n  &:focus {\n    & path {\n      fill: ", ";\n    }\n  }\n"], ["\n  display: flex;\n  margin: 0 12px;\n  cursor: pointer;\n\n  &:first-of-type {\n    margin-left: 0;\n  }\n\n  &:last-of-type {\n    margin-right: 0;\n  }\n\n  & path {\n    fill: ", ";\n  }\n\n  &:hover,\n  &:focus {\n    & path {\n      fill: ", ";\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.utility.white;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.core.lightWhite;
});
var SocialLinks = function (_a) {
    var twitter = _a.twitter, discord = _a.discord, medium = _a.medium, className = _a.className;
    return (React__default["default"].createElement(Container$2, { className: className },
        React__default["default"].createElement(StyledLink, { href: twitter },
            React__default["default"].createElement(Twitter, null),
            React__default["default"].createElement(VisuallyHidden, null, "Twitter Profile")),
        React__default["default"].createElement(StyledLink, { href: discord },
            React__default["default"].createElement(Discord, null),
            React__default["default"].createElement(VisuallyHidden, null, "Discord Channel")),
        React__default["default"].createElement(StyledLink, { href: medium },
            React__default["default"].createElement(Medium, null),
            React__default["default"].createElement(VisuallyHidden, null, "Medium Account"))));
};
var templateObject_1$2, templateObject_2$1;

// You probably want to change this to something semantic or abandon it all together
var Container$1 = styled__default["default"].div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"])));
var Navbar = function (_a) {
    var children = _a.children;
    return (React__default["default"].createElement(Container$1, null, children));
};
var templateObject_1$1;

var Container = styled__default["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 90px;\n  width: 100%;\n  height: fit-content;\n"], ["\n  display: flex;\n  flex-direction: row;\n  grid-gap: 90px;\n  width: 100%;\n  height: fit-content;\n"])));
var Divider = styled__default["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);\n  min-width: 2px;\n"], ["\n  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);\n  min-width: 2px;\n"])));
var SplitSection = function (_a) {
    var leftSection = _a.leftSection, rightSection = _a.rightSection;
    return (React__default["default"].createElement(Container, null,
        leftSection,
        React__default["default"].createElement(Divider, null),
        rightSection));
};
var templateObject_1, templateObject_2;

var Abacus = function (_a) {
    var _b = _a.fill, fill = _b === void 0 ? "white" : _b;
    return (React__default["default"].createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("rect", { width: "20", height: "1", rx: "0.5", transform: "matrix(1 0 0 -1 0 3.75)", fill: fill }),
        React__default["default"].createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 17.5 3)", fill: fill }),
        React__default["default"].createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 10 3)", fill: fill }),
        React__default["default"].createElement("rect", { width: "20", height: "1", rx: "0.5", transform: "matrix(1 0 0 -1 0 10.75)", fill: fill }),
        React__default["default"].createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 10 10)", fill: fill }),
        React__default["default"].createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 2.5 10)", fill: fill }),
        React__default["default"].createElement("rect", { width: "20", height: "1", rx: "0.5", transform: "matrix(1 0 0 -1 0 17.75)", fill: fill }),
        React__default["default"].createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 17.5 17)", fill: fill }),
        React__default["default"].createElement("circle", { r: "2.5", transform: "matrix(1 0 0 -1 2.5 17)", fill: fill })));
};

exports.AbacusIcon = Abacus;
exports.Button = Button;
exports.Exa = Container$h;
exports.Flex = Flex;
exports.Font = Font;
exports.FontImport = FontImport;
exports.Giga = Container$g;
exports.H1 = Container$f;
exports.H2 = Container$e;
exports.H3 = Container$d;
exports.H4 = Container$c;
exports.H5 = Container$b;
exports.H6 = StyledH6;
exports.Infographic = Infographic;
exports.Input = Input;
exports.Kilo = StyledDiv;
exports.Logo = Logo;
exports.Media = Media;
exports.Mega = Container$j;
exports.Milli = Container$a;
exports.MiniList = MiniList;
exports.Navbar = Navbar;
exports.P = StyledP;
exports.Peta = Container$9;
exports.Section = Section;
exports.SessionCard = SessionCard;
exports.Small = Container$8;
exports.SocialLinks = SocialLinks;
exports.SplitSection = SplitSection;
exports.StatInfo = StatInfo;
exports.Tera = Container$7;
exports.VisuallyHidden = VisuallyHidden;
exports.Yotta = Container$6;
exports.Zetta = Container$5;
exports.breakpoints = breakpoints;
exports.defaultTheme = defaultTheme;
//# sourceMappingURL=index.js.map
