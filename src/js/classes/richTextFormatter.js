import { BbcodeRichTextFormatter } from './richTextFormatterBbcode';
import { HtmlRichTextFormatter } from './richTextFormatterHtml';
import { ScribbleRichTextFormatter } from './richTextFormatterScribble';

export const RichTextFormatter = function(app) {
  return new ScribbleRichTextFormatter(app);
};
