"use client";

import AppContainer from "../../atoms/AppContainer/AppContainer";
import { Control, useWatch } from "react-hook-form";
import { useState } from "react";
import AppTextField from "../../atoms/AppTextField/AppTextField";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface AppImageContentProps {
    control: Control<any>;
    namePrefix: string;
    onChange?: (value: boolean) => void;
    onIdleImageUrl?: () => void; 
    onIdleWidth?: () => void;
    onIdleHeight?: () => void;
}

const AppImageContent: React.FC<AppImageContentProps> = ({
    control,
    namePrefix,
    onChange,
    onIdleImageUrl,
    onIdleWidth,
    onIdleHeight,
}) => {
    const [editing, setEditing] = useState(false);
    const [typingTimeoutImage, setTypingTimeoutImage] = useState<NodeJS.Timeout | null>(null);
    const [typingTimeoutWidth, setTypingTimeoutWidth] = useState<NodeJS.Timeout | null>(null);
    const [typingTimeoutHeight, setTypingTimeoutHeight] = useState<NodeJS.Timeout | null>(null);
    const imageUrl = useWatch({ control, name: `${namePrefix}.imageUrl` });
    const width = useWatch({ control, name: `${namePrefix}.width` });
    const height = useWatch({ control, name: `${namePrefix}.height` });

    return (
        <AppContainer className="flex flex-col gap-4">
            {editing && (
                <>
                    <AppContainer className="flex items-center gap-[20px]">
                        <AppTextField
                            control={control}
                            name={`${namePrefix}.imageUrl`}
                            rules={{
                                required: "Link wajib diisi",
                                pattern: {
                                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                                    message: "Format link tidak valid",
                                },
                            }}
                            placeholder="Image URL"
                            onChange={(value) => {
                                if (typingTimeoutImage) {
                                    clearTimeout(typingTimeoutImage);
                                }

                                const timeout = setTimeout(() => {
                                    onIdleImageUrl?.(); 
                                }, 1000); 

                                setTypingTimeoutImage(timeout);
                            }}
                        />
                        <AppContainer className="flex items-center gap-[10px]">
                            <AppTextField
                                control={control}
                                name={`${namePrefix}.width`}
                                rules={{
                                    required: "Angka wajib diisi",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Hanya boleh angka",
                                    },
                                }}
                                placeholder="Width"
                                onChange={(value) => {
                                    if (typingTimeoutWidth) {
                                        clearTimeout(typingTimeoutWidth);
                                    }

                                    const timeout = setTimeout(() => {
                                        onIdleWidth?.(); 
                                    }, 1000); 

                                    setTypingTimeoutWidth(timeout);
                                }}
                            />
                            <AppTextField
                                control={control}
                                name={`${namePrefix}.height`}
                                rules={{
                                    required: "Angka wajib diisi",
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Hanya boleh angka",
                                    },
                                }}
                                placeholder="Height"
                                onChange={(value) => {
                                    if (typingTimeoutHeight) {
                                        clearTimeout(typingTimeoutHeight);
                                    }

                                    const timeout = setTimeout(() => {
                                        onIdleHeight?.(); 
                                    }, 1000); 

                                    setTypingTimeoutHeight(timeout);
                                }}
                            />
                        </AppContainer>

                        <Icon
                            onClick={() => {
                                setEditing(false);
                                onChange?.(false);
                            }}
                            icon="mdi:check-bold"
                            className="text-[32px] w-[42px]  p-[5px] cursor-pointer  text-white bg-black rounded-full"
                        />
                    </AppContainer>
                </>
            )}

            {!editing && imageUrl && width && height && (
                <Image
                    onClick={() => {
                        setEditing(true);
                        onChange?.(true);
                    }}
                    src={imageUrl}
                    alt="preview"
                    width={200}
                    height={100}
                    className="rounded-lg border border-gray-300 cursor-pointer"
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                />
            )}
        </AppContainer>
    );
};

export default AppImageContent;
