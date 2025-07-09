import React from 'react';
import Image from 'next/image';

export interface LexicalNode {
    type: string;
    text?: string;
    format?: string | number;
    listType?: string;
    url?: string;
    children?: LexicalNode[];
    src?: string;
    alignment?: string;
    width?: number;
    height?: number;
    tag?: string;
}

const processChildren = (children: LexicalNode[], parentType?: string, parentCellIndex?: number): React.ReactNode[] => {
    return children.map((child, index) => {
        switch (child.type) {
            case 'paragraph': {
                const innerNodes = processChildren(child.children ?? [], child.type);
                return (
                    <p
                        key={index}
                        className={`mb-4 text-base leading-relaxed ${child.alignment ? `text-${child.alignment}` : ''}`}
                    >
                        {innerNodes}
                    </p>
                );
            }
            case 'text': {
                const text = child.text || '';
                let className = '';
                
                // Apply text formatting
                if (child.format) {
                    const format = Number(child.format);
                    if (format & 1) className += 'font-bold ';
                    if (format & 2) className += 'italic ';
                    if (format & 4) className += 'underline ';
                    if (format & 8) className += 'line-through ';
                    if (format & 128) className += 'bg-yellow-200 dark:bg-yellow-800 ';
                }
                
                return <span key={index} className={className.trim() || undefined}>{text}</span>;
            }
            case 'hashtag':
                return (
                    <span key={index} className="text-blue-500 font-semibold cursor-pointer hover:text-blue-700 transition-colors">
                        {child.text}
                    </span>
                );
            case 'h1':
                return (
                    <h1 key={index} className="text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-white">
                        {processChildren(child.children ?? [], child.type)}
                    </h1>
                );
            case 'h2':
                return (
                    <h2 key={index} className="text-3xl font-semibold mb-4 mt-6 text-red-600 dark:text-red-400">
                        {processChildren(child.children ?? [], child.type)}
                    </h2>
                );
            case 'h3':
                return (
                    <h3 key={index} className="text-2xl font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-200">
                        {processChildren(child.children ?? [], child.type)}
                    </h3>
                );
            case 'h4':
                return (
                    <h4 key={index} className="text-xl font-semibold mb-2 mt-4 text-gray-700 dark:text-gray-300">
                        {processChildren(child.children ?? [], child.type)}
                    </h4>
                );
            case 'h5':
                return (
                    <h5 key={index} className="text-lg font-semibold mb-2 mt-3 text-gray-600 dark:text-gray-400">
                        {processChildren(child.children ?? [], child.type)}
                    </h5>
                );
            case 'h6':
                return (
                    <h6 key={index} className="text-base font-semibold mb-1 mt-2 text-gray-500 dark:text-gray-500">
                        {processChildren(child.children ?? [], child.type)}
                    </h6>
                );
            case 'list': {
                const ListTag = child.listType === 'bullet' ? 'ul' : 'ol';
                const listClassName = child.listType === 'bullet' 
                    ? 'list-disc space-y-1' 
                    : 'list-decimal space-y-1';
                return (
                    <ListTag key={index} className={`pl-6 my-4 ${listClassName}`}>
                        {processChildren(child.children ?? [], child.type)}
                    </ListTag>
                );
            }
            case 'listitem':
                return (
                    <li key={index} className="mb-1 leading-relaxed">
                        {processChildren(child.children ?? [], child.type)}
                    </li>
                );
            case 'link':
                return (
                    <a 
                        key={index} 
                        href={child.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-500 hover:text-blue-700 underline transition-colors"
                    >
                        {processChildren(child.children ?? [], child.type)}
                    </a>
                );
            case 'image':
                return (
                    <div key={index} className="my-6 relative w-full h-[400px] max-w-full">
                        <Image
                            src={child.src ?? ''}
                            alt={child.text ?? 'image'}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-contain rounded-lg shadow-md"
                        />
                    </div>
                );
            case 'table': {
                const rows = child.children ?? [];
                const [headerRow, ...bodyRows] = rows;
                return (
                    <div key={index} className="my-6 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                {processChildren([headerRow], 'thead')}
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900">
                                {processChildren(bodyRows, 'tbody')}
                            </tbody>
                        </table>
                    </div>
                );
            }
            case 'tablerow':
                return (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        {(child.children ?? []).map((cell, cellIndex) =>
                            processChildren([cell], parentType, cellIndex)
                        )}
                    </tr>
                );
            case 'tablecell': {
                const CellTag = parentType === 'thead' ? 'th' : 'td';
                const isFirstColumn = parentCellIndex === 0;
                return (
                    <CellTag
                        key={index}
                        className={`p-3 border-r border-gray-200 dark:border-gray-700 text-left
                            ${parentType === 'thead' 
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold' 
                                : 'bg-white dark:bg-gray-900'
                            }
                            ${isFirstColumn && parentType !== 'thead' 
                                ? 'bg-blue-50 dark:bg-blue-900/20 font-medium' 
                                : ''
                            }
                        `}
                    >
                        {processChildren(child.children ?? [], child.type)}
                    </CellTag>
                );
            }
            case 'quote':
                return (
                    <blockquote key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-600 dark:text-gray-400">
                        {processChildren(child.children ?? [], child.type)}
                    </blockquote>
                );
            case 'code':
                return (
                    <pre key={index} className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4 overflow-x-auto">
                        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                            {processChildren(child.children ?? [], child.type)}
                        </code>
                    </pre>
                );
            case 'heading': {
                const tag = typeof child.tag === 'string' ? child.tag : 'h1';
                const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
                const Tag = allowedTags.includes(tag) ? tag : 'h1';
                const headingClass = {
                    h1: "text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-white",
                    h2: "text-3xl font-semibold mb-4 mt-6 text-red-600 dark:text-red-400",
                    h3: "text-2xl font-semibold mb-3 mt-5 text-gray-800 dark:text-gray-200",
                    h4: "text-xl font-semibold mb-2 mt-4 text-gray-700 dark:text-gray-300",
                    h5: "text-lg font-semibold mb-2 mt-3 text-gray-600 dark:text-gray-400",
                    h6: "text-base font-semibold mb-1 mt-2 text-gray-500 dark:text-gray-500",
                }[Tag] || "";
                return React.createElement(
                    Tag,
                    { key: index, className: headingClass },
                    processChildren(child.children ?? [], child.type)
                );
            }
            default:
                return null;
        }
    });
};

export default function RichTextPreview({ lexicalJson }: { lexicalJson: { root: { children: LexicalNode[] } } }): React.ReactNode {
    return (
        <div className="prose prose-lg max-w-none dark:prose-invert">
            {processChildren(lexicalJson.root.children)}
        </div>
    );
}
