"use client";

import { useState, useEffect } from "react";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface AppTitleContentProps {
    control: Control<any>;
    name: string;
    rules?: RegisterOptions;
    className?: string;
    onChange?: (value: string) => void;
    onIdle?: () => void; 
}

const AppTitleContent: React.FC<AppTitleContentProps> = (props) => {
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
                        props.onChange?.(props.name);

        
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
                            class: "max-h-max w-full break-words border border-none focus:outline-none ",
                        },
                        handleDOMEvents: {
                            blur: () => {
                                setEditing(false);
                                return false;
                            },
                        } as any,
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
                                className="prose prose-sm text-black text-[22px] cursor-pointer"
                                onClick={() => {
                                    setEditing(true);
                                }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        value ||
                                        "<p>Click for get the type text </p>",
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

export default AppTitleContent;