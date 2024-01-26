/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Italic, Underline } from '@ckeditor/ckeditor5-basic-styles';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor } from '@ckeditor/ckeditor5-font';
import { DocumentList, TodoDocumentList } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Undo } from '@ckeditor/ckeditor5-undo';
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof Bold | typeof DocumentList | typeof Essentials | typeof FontBackgroundColor | typeof FontColor | typeof Italic | typeof Paragraph | typeof TodoDocumentList | typeof Underline | typeof Undo)[];
    static defaultConfig: EditorConfig;
}
export default Editor;
