import { Button, FormInput, InputGroupAddon, InputGroup, Col, Tooltip } from 'shards-react';
import styled from 'styled-components';
import * as React from 'react';
import React__default, { useState } from 'react';
import { Search } from 'react-iconly';
import { Info } from 'react-feather';

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

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var sizes = {
    tablet: "1200px",
    splitCenter: "885px",
    phone: "600px",
};
var theme = {
    colors: {
        text1: "#000",
        text2: "#6C7388",
        text3: "#D5D7DF",
        oppositeText1: "#fff",
        primary1: "#355DFF",
        bg1: "#fff",
        bg2: "#E4E4E4",
        accent: "#355DFF",
    },
    layout: {
        maxWidth: "800px",
    },
    copy: {
        large: "40px",
    },
    navbar: {
        height: "60px",
    },
    media: {
        splitCenter: "(max-width: " + sizes.splitCenter + ")",
        tablet: "(max-width: " + sizes.tablet + ")",
        phone: "(max-width: " + sizes.phone + ")",
    },
    mediaMin: {
        splitCenter: "(min-width: " + sizes.splitCenter + ")",
        tablet: "(min-width: " + sizes.tablet + ")",
        phone: "(min-width: " + sizes.phone + ")",
    },
};

var Buttons = styled(Button)(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  background-color: ", " !important;\n  border-radius: 53px;\n  color: ", ";\n  transition: 0.3s;\n  opacity: 1;\n  font-size: 0.85rem;\n  font-weight: 500;\n  border: none;\n  padding: 11px 16px;\n  width: fit-content;\n  min-width: fit-content;\n\n  &:hover {\n    opacity: 0.8;\n    color: ", ";\n    background-color: ", " !important;\n    box-shadow: none;\n  }\n"], ["\n  background-color: ", " !important;\n  border-radius: 53px;\n  color: ", ";\n  transition: 0.3s;\n  opacity: 1;\n  font-size: 0.85rem;\n  font-weight: 500;\n  border: none;\n  padding: 11px 16px;\n  width: fit-content;\n  min-width: fit-content;\n\n  &:hover {\n    opacity: 0.8;\n    color: ", ";\n    background-color: ", " !important;\n    box-shadow: none;\n  }\n"])), theme.colors.accent, theme.colors.bg1, theme.colors.bg1, theme.colors.accent);
var ButtonsWhite = styled(Buttons)(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  background-color: #fff !important;\n  color: ", ";\n  border: 1px solid #c3c8d7;\n  &:hover {\n    opacity: 0.8;\n    color: ", " !important;\n    border: 1px solid #c3c8d7;\n    background-color: #fff !important;\n  }\n\n  &:active {\n    box-shadow: none !important;\n    color: ", " !important;\n  }\n\n  &:focus {\n    box-shadow: none !important;\n    color: ", " !important;\n  }\n\n  &:disabled {\n    opacity: 0.6;\n    color: ", " !important;\n    border: 1px solid #c3c8d7;\n    background-color: #fff !important;\n  }\n"], ["\n  background-color: #fff !important;\n  color: ", ";\n  border: 1px solid #c3c8d7;\n  &:hover {\n    opacity: 0.8;\n    color: ", " !important;\n    border: 1px solid #c3c8d7;\n    background-color: #fff !important;\n  }\n\n  &:active {\n    box-shadow: none !important;\n    color: ", " !important;\n  }\n\n  &:focus {\n    box-shadow: none !important;\n    color: ", " !important;\n  }\n\n  &:disabled {\n    opacity: 0.6;\n    color: ", " !important;\n    border: 1px solid #c3c8d7;\n    background-color: #fff !important;\n  }\n"])), theme.colors.text2, theme.colors.text2, theme.colors.text1, theme.colors.text1, theme.colors.text2);
var ButtonClear = styled(Buttons)(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  background-color: transparent !important;\n  color: black;\n\n  &:disabled {\n    opacity: 0.6;\n    color: ", " !important;\n  }\n\n  &:hover {\n    background-color: transparent !important;\n    opacity: 0.8;\n    color: black;\n  }\n\n  &:active {\n    color: black !important;\n    box-shadow: none !important;\n  }\n\n  &:focus {\n    border: none !important;\n    color: black !important;\n  }\n"], ["\n  background-color: transparent !important;\n  color: black;\n\n  &:disabled {\n    opacity: 0.6;\n    color: ", " !important;\n  }\n\n  &:hover {\n    background-color: transparent !important;\n    opacity: 0.8;\n    color: black;\n  }\n\n  &:active {\n    color: black !important;\n    box-shadow: none !important;\n  }\n\n  &:focus {\n    border: none !important;\n    color: black !important;\n  }\n"])), theme.colors.text2);
var templateObject_1$3, templateObject_2$3, templateObject_3$3;

var SearchBar = styled(FormInput).attrs({
    size: "sm",
    type: "search",
})(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  border: none;\n  border-radius: 53px !important;\n"], ["\n  border: none;\n  border-radius: 53px !important;\n"])));
var InputGroupAddonStyles = styled(InputGroupAddon)(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: 0.15s;\n  cursor: pointer;\n  opacity: 1;\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: 0.15s;\n  cursor: pointer;\n  opacity: 1;\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])));
var SearchStyled = styled(Search)(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  width: 40px;\n  height: 17px;\n"], ["\n  width: 40px;\n  height: 17px;\n"])));
var InputGroupContainer = styled(InputGroup)(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  border: 1px solid #c3c8d7;\n  border-radius: 53px !important;\n"], ["\n  border: 1px solid #c3c8d7;\n  border-radius: 53px !important;\n"])));
var index = (function (_a) {
    var placeholder = _a.placeholder, onEnter = _a.onEnter;
    var _b = React.useState(""), searchValue = _b[0], setSearchValue = _b[1];
    var search = function () {
        onEnter(searchValue);
    };
    return (React.createElement(InputGroupContainer, { seamless: true },
        React.createElement(InputGroupAddonStyles, { onClick: search, type: "prepend" },
            React.createElement(SearchStyled, null)),
        React.createElement(SearchBar, { value: searchValue, onChange: function (e) { return setSearchValue(e.target.value); }, placeholder: placeholder, onKeyDown: function (e) {
                if (e.key === "Enter") {
                    search();
                }
            } })));
});
var templateObject_1$2, templateObject_2$2, templateObject_3$2, templateObject_4$1;

var Text = styled.span(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  color: ", ";\n  text-align: center;\n  font-weight: normal;\n"], ["\n  color: ", ";\n  text-align: center;\n  font-weight: normal;\n"])), theme.colors.text1);
var SubText = styled.span(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  font-weight: 400;\n  color: ", ";\n  font-size: 0.8rem;\n"], ["\n  font-weight: 400;\n  color: ", ";\n  font-size: 0.8rem;\n"])), theme.colors.text2);
var Subheader = styled.h4(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  color: ", " !important;\n  font-weight: bold;\n  text-align: left;\n  font-size: 1rem;\n  margin: 0px !important;\n"], ["\n  color: ", " !important;\n  font-weight: bold;\n  text-align: left;\n  font-size: 1rem;\n  margin: 0px !important;\n"])), theme.colors.text2);
var UniversalContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  padding-bottom: 0px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  padding-bottom: 0px;\n"])));
var SmallUniversalContainer = styled(UniversalContainer)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  max-width: 1100px;\n"], ["\n  max-width: 1100px;\n"])));
var Title = styled.h2(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: ", " !important;\n  font-weight: 900;\n  font-size: 1.5rem;\n  text-align: left;\n  margin: 0px !important;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], ["\n  color: ", " !important;\n  font-weight: 900;\n  font-size: 1.5rem;\n  text-align: left;\n  margin: 0px !important;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"])), theme.colors.text1);
var MainContainer = styled(Col)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  padding: 32px;\n  grid-gap: 24px;\n  padding-top: 32px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  padding: 32px;\n  grid-gap: 24px;\n  padding-top: 32px;\n"])));
var CategoryButton = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-weight: 400;\n  padding: 8px 16px;\n  border-radius: 20px;\n  opacity: 1;\n  cursor: pointer;\n  transition: 0.3s;\n  font-size: 0.85rem;\n  width: fit-content;\n  color: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n\n  ", "\n"], ["\n  font-weight: 400;\n  padding: 8px 16px;\n  border-radius: 20px;\n  opacity: 1;\n  cursor: pointer;\n  transition: 0.3s;\n  font-size: 0.85rem;\n  width: fit-content;\n  color: ", ";\n\n  &:hover {\n    opacity: 0.8;\n  }\n\n  ",
    "\n"])), theme.colors.text1, function (_a) {
    var active = _a.active, theme = _a.theme;
    return active &&
        "\n        cursor: default;\n        color: " + theme.colors.accent + ";\n        background-color: rgba(89,89,89, 0.06);\n        &:hover {\n            opacity: 1.0;\n        }\n    ";
});
var ImageContainer = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  border: 1px solid #c3c8d7;\n  background-image: url(\"", "\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 7px;\n  background-position: center;\n  background-color: black;\n  border-radius: 6px;\n"], ["\n  width: 100%;\n  height: 100%;\n  border: 1px solid #c3c8d7;\n  background-image: url(\"", "\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 7px;\n  background-position: center;\n  background-color: black;\n  border-radius: 6px;\n"])), function (_a) {
    var src = _a.src;
    return src;
});
var Label = styled.label(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-weight: 500;\n  font-size: 0.9rem;\n  cursor: default;\n"], ["\n  font-weight: 500;\n  font-size: 0.9rem;\n  cursor: default;\n"])));
var templateObject_1$1, templateObject_2$1, templateObject_3$1, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;

var MainInput = styled(FormInput).attrs(function (props) { return ({
    size: props.size || "sm",
    ...props,
}); })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: transparent;\n  border-radius: 0px;\n  padding: 0px;\n  ", "\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  &:active {\n    border-color: transparent !important;\n    box-shadow: none !important;\n  }\n\n  .form-control:focus {\n    border-color: transparent !important;\n    box-shadow: none !important;\n  }\n\n  &:focus {\n    border-color: transparent !important;\n    box-shadow: none !important;\n  }\n\n  &:disabled {\n    background-color: transparent !important;\n  }\n"], ["\n  border: transparent;\n  border-radius: 0px;\n  padding: 0px;\n  ",
    "\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  &:active {\n    border-color: transparent !important;\n    box-shadow: none !important;\n  }\n\n  .form-control:focus {\n    border-color: transparent !important;\n    box-shadow: none !important;\n  }\n\n  &:focus {\n    border-color: transparent !important;\n    box-shadow: none !important;\n  }\n\n  &:disabled {\n    background-color: transparent !important;\n  }\n"])), function (_a) {
    var type = _a.type;
    return type === "checkbox" &&
        "\n    appearance: auto;\n    width: 20px;\n  ";
});
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: ", ";\n  align-items: ", ";\n  justify-content: ", ";\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: ", ";\n  align-items: ", ";\n  justify-content: ",
    ";\n  width: 100%;\n"])), function (_a) {
    var type = _a.type;
    return (type === "checkbox" ? "" : "column");
}, function (_a) {
    var type = _a.type;
    return (type === "checkbox" ? "center" : "flex-start");
}, function (_a) {
    var type = _a.type;
    return type === "checkbox" ? "space-between" : "center";
});
var InputWithTitle = function (_a) {
    var title = _a.title, _b = _a.type, type = _b === void 0 ? "text" : _b, id = _a.id, infoText = _a.infoText, props = __rest(_a, ["title", "type", "id", "infoText"]);
    var _c = useState(false), isToolTipOpen = _c[0], setIsToolTipOpen = _c[1];
    return (React__default.createElement(Container, { type: type },
        React__default.createElement(Label, { style: { marginBottom: type === "checkbox" ? 0 : 10 }, htmlFor: id },
            title,
            infoText && (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(Info, { id: id, style: { height: 15, marginTop: -2, marginLeft: 1 } }),
                React__default.createElement(Tooltip, { open: isToolTipOpen, target: "#" + id, toggle: function () { return setIsToolTipOpen(!isToolTipOpen); }, placement: "right", trigger: "hover" }, infoText)))),
        React__default.createElement(MainInput, __assign({ id: id, size: "lg", type: type }, props))));
};
var InputContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n"], ["\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n"])));
var InputWithTitleAndButton = function (_a) {
    var title = _a.title, _b = _a.type, type = _b === void 0 ? "text" : _b, id = _a.id, buttonText = _a.buttonText, onClick = _a.onClick, props = __rest(_a, ["title", "type", "id", "buttonText", "onClick"]);
    return (React__default.createElement(Container, { type: type },
        React__default.createElement(Label, { style: { marginBottom: type === "checkbox" ? 0 : 10 }, htmlFor: id }, title),
        React__default.createElement(InputContainer, null,
            React__default.createElement(MainInput, __assign({ id: id, style: { borderRadius: 0 }, size: "lg", type: type }, props)),
            React__default.createElement(ButtonsWhite, { onClick: onClick }, buttonText))));
};
var templateObject_1, templateObject_2, templateObject_3;

export { Buttons as Button, ButtonClear, ButtonsWhite, CategoryButton, ImageContainer, InputWithTitle, InputWithTitleAndButton, Label, MainContainer, MainInput, index as SearchBard, SmallUniversalContainer, SubText, Subheader, Text, Title, UniversalContainer };
//# sourceMappingURL=index.js.map
