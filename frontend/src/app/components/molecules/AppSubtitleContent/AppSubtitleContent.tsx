"use client";

import { useState, useEffect } from "react";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface AppSubtitleContentProps {
    control: Control<any>;
    name: string;
    rules?: RegisterOptions;
    className?: string;
    onChange?: (value: boolean) => void;
}

const AppSubtitleContent: React.FC<AppSubtitleContentProps> = (props) => {
    const [editing, setEditing] = useState(false);

    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            render={({ field: { value, onChange }, fieldState }) => {
                const editor = useEditor({
                    extensions: [StarterKit],
                    content: value,
                    onUpdate: ({ editor }) => {
                        const html = editor.getHTML();
                        onChange(html);
                    },
                    editorProps: {
                        attributes: {
                            class: "max-h-max p-2 max-w-[80vw] break-words w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 ",
                        },
                        handleDOMEvents: {
                            blur: () => {
                                setEditing(false);
                                props.onChange?.(false);
                                return false;
                            },
                        },
                    },
                });

                useEffect(() => {
                    if (editor && editor.getHTML() !== value) {
                        editor.commands.setContent(value || "");
                    }
                }, [value, editor]);

                if (!editor) return <></>;

                return (
                    <AppContainer
                        className={`w-max h-max flex flex-col ${
                            props.className || ""
                        }`}
                    >
                        {editing ? (
                            <EditorContent editor={editor} />
                        ) : (
                            <div
                                className="prose prose-sm text-black cursor-pointer"
                                onClick={() => {
                                    setEditing(true);
                                    props.onChange?.(true);
                                }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        value ||
                                        "<p>Klik untuk mulai mengetik</p>",
                                }}
                            />
                        )}
                        {fieldState.error && (
                            <p className="text-sm text-red-500 mt-1">
                                {fieldState.error.message}
                            </p>
                        )}
                    </AppContainer>
                );
            }}
        />
    );
};

export default AppSubtitleContent;
