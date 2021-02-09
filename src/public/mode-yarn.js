define('ace/mode/yarn', [
  'require',
  'exports',
  'module',
  'ace/lib/oop',
  'ace/mode/text',
  'ace/mode/text_highlight_rules',
  'ace/mode/behaviour'
], function(require, exports, module) {
  'use strict';

  var oop = require('../lib/oop');
  var TextMode = require('./text').Mode;
  var TextHighlightRules = require('./text_highlight_rules').TextHighlightRules;
  var CstyleBehaviour = require('./behaviour/cstyle').CstyleBehaviour;

  var YarnHighlightRules = function() {
    this.$rules = {
      start: [
        {
          token: 'comment',
          regex: '\/\/.*$'
        },
        {
          token: 'command_open',
          regex: '<<',
          next: 'command'
        },
        {
          token: 'expression_open',
          regex: '\\{',
          next: 'expression'
        },
        {
          token: 'shortcut',
          regex: '->\\s'
        },
        {
          token: 'nametag',
          regex: '.+(?=:)'
        }
      ],
      expression: [
        {
          token: 'variable',
          regex: '\\$\\w*'
        },
        {
          token: 'expression_close',
          regex: '\\}',
          next: 'start'
        }
      ],
      command: [
        {
          token: 'keyword',
          regex: '(stop|set|declare|if|else|elseif|endif)',
        },
        {
          token: 'keyword',
          regex: 'jump',
          next: 'jump'
        },
        {
          token: 'string',
          regex: '"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"'
        },
        {
          token: 'variable',
          regex: '\\$\\w*'
        },
        {
          token: 'numeric',
          regex: '((\\b[0-9]+)?\\.)?[0-9]+\\b'
        },
        {
          token: 'boolean',
          regex: '(true|false)'
        },
        {
          token: 'command_close',
          regex: '>>',
          next: 'start'
        },
        {
          token: 'expression_open',
          regex: '\\{'
        },
        {
          token: 'expression_close',
          regex: '\\}'
        }
      ],
      jump: [
        {
          token: function(value) {
            console.log(app.getOtherNodeTitles());
            console.log(value.replace(/[ >>]+/g, ''));
            if (app.getOtherNodeTitles().includes(value.replace(/[ >>]+/g, ''))) {
              return 'node_name'
            } else {
              return 'yarn'
            }
          },
          regex: '[^ >>]+'
        },
        {
          token: 'command_close',
          regex: '>>',
          next: 'start'
        },
      ]
    };
  };

  var Mode = function() {
    this.HighlightRules = YarnHighlightRules;
    this.$behaviour = new CstyleBehaviour();
  };

  oop.inherits(YarnHighlightRules, TextHighlightRules);
  oop.inherits(Mode, TextMode);

  (function() {
    this.type = 'text';
    this.getNextLineIndent = function(state, line, tab) {
      return '';
    };
    this.$id = 'ace/mode/yarn';
  }.call(Mode.prototype));

  exports.Mode = Mode;

  /// set context menu
  $.contextMenu({
    selector: '.node-editor .form .editor',
    trigger: 'right',
    build: function($trigger) {
      var options = {
        items: {}
        // callback: () => { self.editor.focus() }
      };

      // color picker is being called instead
      if (/^\[color=#([a-zA-Z0-9]{3,6})$/.test(app.getTagBeforeCursor())) {
        return;
      }
      // There is some text selected
      if (app.editor.getSelectedText().length > 1) {
        options.items = {
          cut: {
            name: 'Cut',
            icon: 'cut',
            callback: () => {
              if (app.clipboard.length > 0) {
                app.data.triggerCopyClipboard();
                app.insertTextAtCursor('');
              }
            }
          },
          copy: {
            name: 'Copy',
            icon: 'copy',
            callback: () => {
              app.data.triggerCopyClipboard();
            }
          },
          paste: {
            name: 'Paste',
            icon: 'paste',
            callback: () => app.data.triggerPasteClipboard()
          }
        };
        // add menu option to go to selected node if an option is selected
        // FIXME: ADD ABILITY TO HIGHLIGHT NODES AND EDIT THEM FROM CONTEXT MENU FOR YARN 2.0 SPEC
        // if (app.getTagBeforeCursor().match(/\|/g)) {
        //   options.items.sep1 = '---------';
        //   options.items['go to node'] = {
        //     name: 'Edit node: ' + app.editor.getSelectedText(),
        //     callback: () => {
        //       const title = app.getFutureEditedNodeTitle();
        //       // We add the node to visited nodes history before navigating to the next node
        //       if (!app.nodeVisitHistory.includes(title)) {
        //         app.nodeVisitHistory.push(title);
        //       }
        //       app.openNodeByTitle(app.editor.getSelectedText());
        //     }
        //   };
        // }
        // suggest word corrections if the selected word is misspelled
        if (app.settings.spellcheckEnabled()) {
          var suggestedCorrections = app.getSpellCheckSuggestionItems();
          if (suggestedCorrections !== false) {
            options.items.sep1 = '---------';
            options.items.corrections = {
              name: 'Suggested Corrections',
              items: suggestedCorrections
            };
          }
        }
        // suggest similar words - thesaurus.com sysnonyms and anthonyms
        var suggested = app.getThesaurusItems();
        if (suggested !== false) {
          options.items.sep1 = '---------';
          options.items.corrections = {
            name: 'Related Words',
            items: suggested
          };
        }
      } else {
        options.items = {
          paste: {
            name: 'Paste',
            icon: 'paste',
            callback: () => app.data.triggerPasteClipboard()
          }
        };
      }
      // add option to add path of local image file between img tags
      if (app.getTagBeforeCursor().match(/\[img/g)) {
        options.items.sep1 = '---------';
        options.items['Choose image'] = {
          name: 'Choose image',
          callback: () => {
            app.data.insertImageFileName();
          }
        };
      }
      return options;
    }
  });

  /// Enable autocompletion via word guessing
  app.editor.setOptions({
    enableBasicAutocompletion: app.settings.autocompleteSuggestionsEnabled(),
    enableLiveAutocompletion: app.settings.autocompleteSuggestionsEnabled(),
    behavioursEnabled: app.settings.autoCloseBrackets(),
  });
});
