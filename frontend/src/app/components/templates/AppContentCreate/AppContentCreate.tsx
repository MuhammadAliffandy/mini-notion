"use client";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AppTitleContent from "../../molecules/AppTitleContent/AppTitleContent";
import AppSubtitleContent from "../../molecules/AppSubtitleContent/AppSubtitleContent";
import { Icon } from "@iconify/react";
import AppButton from "../../atoms/AppButton/AppButton";
import AppImageContent from "../../molecules/AppImageContent/AppImageContent";
import AppToolbarCreate from "../../molecules/AppToolbarCreate/AppToolbarCreate";

interface AppContentViewProps {
    onClick?: () => void;
}

type FieldItem = {
    type: "title" | "subtitle" | "image";
    name: string;
};

type ImageField = {
    imageUrl: string;
    width: string;
    height: string;
};

type FormValues = {
    title: string;
    subtitle: string;
    [key: string]: string | ImageField | undefined;
};

const AppContentView: React.FC<AppContentViewProps> = (props) => {
    const { control, setValue } = useForm<FormValues>({
        defaultValues: {
            title: "<p>Judul awal</p>",
            subtitle: "<p>Subjudul awal</p>",
            image_0: {
                imageUrl: "https://picsum.photos/200/300",
                width: "200",
                height: "200",
            },
        },
    });

    const [fields, setFields] = useState<FieldItem[]>([
        { type: "title", name: "title" },
        { type: "subtitle", name: "subtitle" },
        { type: "image", name: "image_0" },
    ]);

    const [titleCount, setTitleCount] = useState(1);
    const [subtitleCount, setSubtitleCount] = useState(1);
    const [imageCount, setImageCount] = useState(1);

    const addTitleField = () => {
        const name = `title_${titleCount}`;
        setFields((prev) => [...prev, { type: "title", name }]);
        setTitleCount((prev) => prev + 1);
        setValue(name, "<p>Judul baru</p>");
    };

    const addSubtitleField = () => {
        const name = `subtitle_${subtitleCount}`;
        setFields((prev) => [...prev, { type: "subtitle", name }]);
        setSubtitleCount((prev) => prev + 1);
        setValue(name, "<p>Subjudul baru</p>");
    };

    const addImageField = () => {
        const name = `image_${imageCount}`;
        setFields((prev) => [...prev, { type: "image", name }]);
        setImageCount((prev) => prev + 1);
        setValue(name, {
            imageUrl: "https://picsum.photos/200/300",
            width: "200",
            height: "200",
        });
    };

    // Fungsi untuk menghapus field
    const removeField = (name: string) => {
        // Hapus dari fields
        setFields((prev) => prev.filter((f) => f.name !== name));
        // Hapus value di form (set undefined)
        setValue(name, undefined);
    };

    return (
        <AppContainer className="w-full bg-white h-full flex flex-col items-start p-[20px] rounded-2xl">
            <AppContainer className="w-full h-full bg-transparent p-[20px] flex flex-col gap-[40px] border-2 border-gray-300 rounded-2xl">
                {/* Header Icons */}
                <AppContainer className="w-full flex items-start justify-between">
                    <AppContainer className="flex items-center gap-[10px]">
                        <Icon
                            onClick={props.onClick}
                            icon="mdi:arrow-back"
                            className="text-[24px] cursor-pointer text-black"
                        />
                    </AppContainer>
                    <AppToolbarCreate
                        onAddImage={addImageField}
                        onAddTitle={addTitleField}
                        onAddSubtitle={addSubtitleField}
                    />
                </AppContainer>

                {/* Dynamic Content Rendering */}
                <AppContainer className="w-full h-full flex flex-col gap-[10px] text-black overflow-y-auto overflow-x-hidden">
                    {fields.map((field) => {
                        // Render dengan tombol hapus di samping
                        return (
                            <AppContainer
                                key={field.name}
                                className="flex items-center gap-2"
                            >
                                {field.type === "title" && (
                                    <AppTitleContent
                                        control={control}
                                        name={field.name}
                                        rules={{
                                            required:
                                                "Judul tidak boleh kosong",
                                        }}
                                        className="text-[22px] font-bold flex-1"
                                    />
                                )}
                                {field.type === "subtitle" && (
                                    <AppSubtitleContent
                                        control={control}
                                        name={field.name}
                                        rules={{
                                            required:
                                                "Subjudul tidak boleh kosong",
                                        }}
                                    />
                                )}
                                {field.type === "image" && (
                                    <AppImageContent
                                        control={control}
                                        namePrefix={field.name}
                                    />
                                )}

                                {/* Tombol hapus */}
                                <Icon
                                    icon="gg:trash"
                                    className="text-gray-300 cursor-pointer text-[28px]"
                                    onClick={() => removeField(field.name)}
                                />
                            </AppContainer>
                        );
                    })}
                </AppContainer>

                {/* Save Button */}

                <AppContainer className="w-max self-end">
                    <AppButton text="Tambah Blocks" onClick={() => {}} />
                </AppContainer>
            </AppContainer>
        </AppContainer>
    );
};

export default AppContentView;
