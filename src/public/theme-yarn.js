define("ace/theme/yarn",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-yarn";
exports.cssText = "\
.ace-yarn .ace_gutter {\
background: #e8e8e8;\
color: #AAA;\
}\
.ace-yarn  {\
background: #fff;\
color: #4d4d4c;\
}\
.ace-yarn .ace_comment {\
color: #8e908c;\
}\
.ace-yarn .ace_hashtag {\
color: #de935f;\
}\
.ace-yarn .ace_keyword {\
color: #8959a8;\
font-weight: bold;\
}\
.ace-yarn .ace_variable {\
color: #c82829;\
}\
.ace-yarn .ace_function {\
color: #4271ae;\
}\
.ace-yarn .ace_numeric {\
color: #f5871f;\
}\
.ace-yarn .ace_boolean {\
color: #f5871f;\
}\
.ace-yarn .ace_shortcut {\
color: #3e999f;\
}\
.ace-yarn .ace_string {\
color: #718c00;\
}\
.ace-yarn .ace_nametag {\
color: #3e999f;\
}\
.ace-yarn .ace_node_name {\
color: #c82829;\
}\
.ace-yarn .ace_command_open, .ace-yarn .ace_command_close {\
color: #4d4d4c;\
font-weight: bold;\
}\
.ace-yarn .ace_expression_open, .ace-yarn .ace_expression_close {\
color: #4d4d4c;\
font-weight: bold;\
}\
.ace-yarn .ace_variable.ace_instance {\
color: teal;\
}\
.ace-yarn .ace_cursor {\
color: black;\
}\
.ace-yarn .ace_marker-layer .ace_active-line {\
background: #efefef;\
}\
.ace-yarn .ace_marker-layer .ace_selection {\
background: #d6d6d6;\
}\
.ace-yarn.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
border-radius: 2px;\
}\
.ace-yarn.ace_nobold .ace_line > span {\
font-weight: normal !important;\
}\
.ace-yarn .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-yarn .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-yarn .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-yarn .ace_gutter-active-line {\
background-color : rgba(0, 0, 0, 0.07);\
}\
.ace-yarn .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-yarn .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-yarn .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}";

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});