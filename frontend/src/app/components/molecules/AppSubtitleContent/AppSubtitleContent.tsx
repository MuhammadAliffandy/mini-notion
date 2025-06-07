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
    onIdle?: () => void;
}

const AppSubtitleContent: React.FC<AppSubtitleContentProps> = (props) => {
    const [editing, setEditing] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

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

                        
                        if (typingTimeout) {
                            clearTimeout(typingTimeout);
                        }

            
                        const timeout = setTimeout(() => {
                            props.onIdle?.(); 
                          
                        }, 1000); 
                        setTypingTimeout(timeout);

                    },
                    editorProps: {
                        attributes: {
                            class: "max-h-max break-words w-full  border border-none focus:outline-none whitespace-normal overflow-wrap  ",
                        },
                        handleDOMEvents: {
                            blur: () => {
                                setEditing(false);
                                props.onChange?.(false);
                                return false;
                            },
                        },
                    },
                    autofocus: true,
                });

                useEffect(() => {
                    if (editor && editor.getHTML() !== value) {
                        editor.commands.setContent(value || "");
                    }
                }, [value, editor]);

                useEffect(() => {
                    if (editing && editor) {
                        editor.commands.focus();
                    }
                }, [editing, editor]);

                if (!editor) return <></>;

                return (
                    <AppContainer
                        className={`w-full h-max flex flex-col ${
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
                                        "<p>Click for get the type text</p>",
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
