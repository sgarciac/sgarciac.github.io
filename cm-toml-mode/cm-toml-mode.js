var CmTomlMode =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NewLine;
(function (NewLine) {
    NewLine[NewLine["ERROR"] = 0] = "ERROR";
    NewLine[NewLine["POP"] = 1] = "POP";
})(NewLine || (NewLine = {}));
;
var Space;
(function (Space) {
    Space[Space["SKIP"] = 0] = "SKIP";
    Space[Space["ONLY_CLOSING_LINE"] = 1] = "ONLY_CLOSING_LINE";
})(Space || (Space = {}));
;
var PopMode;
(function (PopMode) {
    PopMode[PopMode["CONSUME_TOKEN"] = 0] = "CONSUME_TOKEN";
    PopMode[PopMode["LEAVE_TOKEN"] = 1] = "LEAVE_TOKEN";
})(PopMode || (PopMode = {}));
function makeStates(states) {
    return states;
}
// Complex regex's
var escaped_char_regex = /^((\\b)|(\\t)|(\\n)|(\\f)|(\\")|(\\r)|(\\\\))/;
var escaped_unicode_regex = /^((\\u([0-9A-Fa-f]{4}))|(\\U([0-9A-Fa-f]{8})))/;
var offset_datetime_regex = /^(-?\d{4}-\d{2}-\d{2}(t|\s)\d{2}:\d{2}:\d{2}(\.\d+)?(z|([-+]\d{2}:\d{2})))/i;
var local_datetime_regex = /^(-?\d{4}-\d{2}-\d{2}(t|\s)\d{2}:\d{2}:\d{2}(\.\d+)?)/i;
var local_date_regex = /^(-?\d{4}-\d{2}-\d{2})/i;
var local_time_regex = /^(\d{2}:\d{2}:\d{2}(\.\d+)?)/i;
var float_regex = /^([+-]?(\d_|_\d|\d)+)(((\.(\d_|_\d|\d)+)([Ee]([+-])?(\d_|_\d|\d)+))|((\.(\d_|_\d|\d)+)|([Ee]([+-])?(\d_|_\d|\d)+)))/;
var integer_regex = /^([+-]?(\d_|_\d|\d)+)/;
// common matchers
var string_escape_matchers = [
    { matcher: escaped_char_regex, style: "string" },
    { matcher: escaped_unicode_regex, style: "string" },
];
var atomic_value_matchers = [
    { matcher: "\"\"\"", style: "string", pushmode: "basic_string_multi_line" },
    { matcher: "\"", style: "string", pushmode: "basic_string" },
    { matcher: "'''", style: "string", pushmode: "literal_string_multi_line" },
    { matcher: "'", style: "string", pushmode: "literal_string" },
    { matcher: offset_datetime_regex, style: "builtin" },
    { matcher: local_datetime_regex, style: "builtin" },
    { matcher: local_date_regex, style: "builtin" },
    { matcher: local_time_regex, style: "builtin" },
    { matcher: float_regex, style: "number" },
    { matcher: integer_regex, style: "number" },
    { matcher: /^(true|false)/, style: "number" } // boolean
];
var top_table_identifiers = [
    { matcher: /^[A-Za-z0-9_-]+/, style: "keyword" },
    { matcher: "\"", style: "keyword", pushmode: "basic_identifier_string" },
    { matcher: "'", style: "keyword", pushmode: "literal_identifier_string" },
    { matcher: ".", style: "punctuation" },
];
var matchers = {
    top: {
        eatSpace: Space.SKIP,
        comment: "#",
        patterns: [
            { matcher: "[[", style: "bracket", pushmode: "table_array_item" },
            { matcher: "[", style: "bracket", pushmode: "table_array" },
            { matcher: /^[A-Za-z0-9_-]+/, style: "keyword" },
            { matcher: "\"", style: "keyword", pushmode: "basic_identifier_string" },
            { matcher: "'", style: "keyword", pushmode: "literal_identifier_string" },
            { matcher: /=\s*/, style: "punctuation", pushmode: "value" }
        ]
    },
    basic_identifier_string: {
        newLine: NewLine.ERROR,
        patterns: [
            { matcher: "\"", style: "keyword", popmode: PopMode.CONSUME_TOKEN },
            { matcher: escaped_char_regex, style: "keyword" },
            { matcher: escaped_unicode_regex, style: "keyword" },
            { matcher: /^[^\\"]+/, style: "keyword" }
        ]
    },
    literal_identifier_string: {
        newLine: NewLine.ERROR,
        patterns: [
            { matcher: "'", style: "keyword", popmode: PopMode.CONSUME_TOKEN },
            { matcher: /^[^']+/, style: "keyword" }
        ]
    },
    literal_string: {
        newLine: NewLine.ERROR,
        patterns: [
            { matcher: "'", style: "string", popmode: PopMode.CONSUME_TOKEN },
            { matcher: /^[^']+/, style: "string" }
        ]
    },
    basic_string: {
        newLine: NewLine.ERROR,
        patterns: [
            { matcher: "\"", style: "string", popmode: PopMode.CONSUME_TOKEN }
        ].concat(string_escape_matchers, [
            { matcher: /^[^\\"]+/, style: "string" }
        ])
    },
    basic_string_multi_line: {
        patterns: [
            { matcher: "\"\"\"", style: "string", popmode: PopMode.CONSUME_TOKEN }
        ].concat(string_escape_matchers, [
            { matcher: /^(\\\s*)$/, style: "string" },
            { matcher: /^([^\\"]|"(?!""))+/, style: "string" }
        ])
    },
    literal_string_multi_line: {
        patterns: [
            { matcher: "'''", style: "string", popmode: PopMode.CONSUME_TOKEN },
            { matcher: /^([^']+|'(?!''))+/, style: "string" }
        ]
    },
    table_array: {
        eatSpace: Space.SKIP,
        newLine: NewLine.ERROR,
        patterns: top_table_identifiers.concat([
            { matcher: "]", style: "bracket", popmode: PopMode.CONSUME_TOKEN }
        ])
    },
    table_array_item: {
        eatSpace: Space.SKIP,
        newLine: NewLine.ERROR,
        patterns: top_table_identifiers.concat([
            { matcher: "]]", style: "bracket", popmode: PopMode.CONSUME_TOKEN }
        ])
    },
    value: {
        newLine: NewLine.POP,
        eatSpace: Space.ONLY_CLOSING_LINE,
        comment: "#",
        patterns: atomic_value_matchers.concat([
            { matcher: "[", style: "bracket", pushmode: "array" },
            { matcher: "{", style: "bracket", pushmode: "inner_table" }
        ])
    },
    array: {
        eatSpace: Space.SKIP,
        comment: "#",
        patterns: atomic_value_matchers.concat([
            { matcher: "{", style: "bracket", pushmode: "inner_table" },
            { matcher: "[", style: "bracket", pushmode: "array" },
            { matcher: ",", style: "punctuation" },
            { matcher: "]", style: "bracket", popmode: PopMode.CONSUME_TOKEN }
        ])
    },
    inner_table: {
        eatSpace: Space.SKIP,
        comment: "#",
        patterns: [
            { matcher: /^[A-Za-z0-9_-]+/, style: "keyword" },
            { matcher: "\"", style: "keyword", pushmode: "basic_identifier_string" },
            { matcher: "'", style: "keyword", pushmode: "literal_identifier_string" },
            { matcher: /=\s*/, style: "punctuation", pushmode: "inner_table_value" },
            { matcher: "}", style: "bracket", popmode: PopMode.CONSUME_TOKEN }
        ]
    },
    inner_table_value: {
        eatSpace: Space.SKIP,
        patterns: atomic_value_matchers.concat([
            { matcher: "[", style: "bracket", pushmode: "array" },
            { matcher: "{", style: "bracket", pushmode: "inner_table" },
            { matcher: "}", style: "bracket", popmode: PopMode.LEAVE_TOKEN },
            { matcher: ",", style: "bracket", popmode: PopMode.CONSUME_TOKEN }
        ])
    }
};
exports.tomlMode = function (config) {
    return {
        startState: function () {
            return {
                lexer_states_stack: [matchers.top],
                currentMatcher: function () {
                    return this.lexer_states_stack[this.lexer_states_stack.length - 1];
                },
                popMatcher: function () {
                    return this.lexer_states_stack.pop();
                },
                pushMatcher: function (matcherName) {
                    return this.lexer_states_stack.push(matchers[matcherName]);
                },
                readNext: function (stream) {
                    var matcher = this.currentMatcher();
                    // HANDLE NEW LINES
                    if ((matcher.newLine === NewLine.ERROR) && stream.sol()) {
                        stream.skipToEnd();
                        return "error strikethrough";
                    }
                    if ((matcher.newLine === NewLine.POP) && stream.sol()) {
                        this.popMatcher();
                        return this.readNext(stream);
                    }
                    if (matcher.eatSpace === Space.SKIP && stream.eatSpace()) {
                        return null;
                    }
                    if (matcher.comment) {
                        if (stream.match(new RegExp("\\s*" + matcher.comment + ".*"), false)) {
                            stream.skipToEnd();
                            return "comment";
                        }
                    }
                    if (matcher.eatSpace === Space.ONLY_CLOSING_LINE && stream.peek() && stream.peek().match(/\s/)) {
                        if (stream.match(/\s+[^\s]/, false)) {
                            stream.skipToEnd();
                            return "error strikethrough";
                        }
                        else {
                            stream.skipToEnd();
                            return null;
                        }
                    }
                    for (var _i = 0, _a = matcher.patterns; _i < _a.length; _i++) {
                        var pattern = _a[_i];
                        var consumeToken = pattern.popmode !== PopMode.LEAVE_TOKEN;
                        var matched = stream.match(pattern.matcher, consumeToken);
                        if (matched) {
                            if (pattern.popmode === PopMode.CONSUME_TOKEN || pattern.popmode === PopMode.LEAVE_TOKEN) {
                                this.popMatcher();
                            }
                            if (pattern.pushmode) {
                                this.pushMatcher(pattern.pushmode);
                            }
                            return pattern.style;
                        }
                    }
                    stream.next();
                    return "error strikethrough";
                }
            };
        },
        token: function (stream, state) {
            return state.readNext(stream);
        }
    };
};


/***/ })
/******/ ]);