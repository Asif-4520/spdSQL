import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';
export const Dark = HighlightStyle.define([
    {
        tag: tags.keyword,
        color: '#ec43deff',
        fontWeight: '600',
        fontStyle: 'oblique',
    },
    { tag: tags.operator, color: '#d4d4d4' },
    { tag: tags.string, color: '#ce9178' },
    { tag: tags.number, color: '#b5cea8' },
    { tag: tags.bool, color: '#569cd6' },
    { tag: tags.null, color: '#569cd6' },
    { tag: tags.comment, color: '#6a9955', fontStyle: 'italic' },
    { tag: tags.variableName, color: '#9cdcfe' },
    { tag: tags.function(tags.variableName), color: '#dcdcaa' },
    { tag: tags.typeName, color: '#4ec9b0' },
    { tag: tags.propertyName, color: '#d4d4d4' },
    { tag: tags.punctuation, color: '#d4d4d4' },
    { tag: tags.bracket, color: '#ffd700' },
]);

export const Light = HighlightStyle.define([
    {
        tag: tags.keyword,
        color: '#5900ffff',
        fontWeight: '600',
        fontStyle: 'oblique',
    },
    { tag: tags.operator, color: '#24292f' },
    { tag: tags.string, color: '#0a3069' },
    { tag: tags.number, color: '#0550ae' },
    { tag: tags.bool, color: '#0550ae' },
    { tag: tags.null, color: '#8250df' },
    { tag: tags.comment, color: '#6e7781', fontStyle: 'italic' },
    { tag: tags.variableName, color: '#24292f' },
    { tag: tags.function(tags.variableName), color: '#953800' },
    { tag: tags.typeName, color: '#0f766e' },
    { tag: tags.propertyName, color: '#24292f' },
    { tag: tags.punctuation, color: '#24292f' },
    { tag: tags.bracket, color: '#00c3ffff' },
]);