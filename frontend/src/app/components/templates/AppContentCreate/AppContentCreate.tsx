"use client";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AppTitleContent from "../../molecules/AppTitleContent/AppTitleContent";
import AppSubtitleContent from "../../molecules/AppSubtitleContent/AppSubtitleContent";
import { Icon } from "@iconify/react";
import AppButton from "../../atoms/AppButton/AppButton";
import AppImageContent from "../../molecules/AppImageContent/AppImageContent";
import AppToolbarCreate from "../../molecules/AppToolbarCreate/AppToolbarCreate";
import * as bloksRepository from "@/app/api/repository/blockRepository";
import * as noteRepository from "@/app/api/repository/noteRepository";
import { toast } from "react-toastify";
import { Blocks, Notes } from "@/app/utils/types";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { encodeImageUrl, convertDateString, updateToastConfig } from "@/app/utils/helper";
import AppHeadline from "../../molecules/AppHeadline/AppHeadline";

interface AppContentViewProps {
    onClick?: () => void;
    onCreated?: (value: boolean ) => void;
}

type FieldItem = {
    type: "title" | "subtitle" | "image";
    name: string;
    order_index: number;
    parent_id?: number | null;
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
    const noteId = useSelector((state: any) => state.note.value);
    const { push } = useRouter();

    const { control, setValue, getValues, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            title: "<p>Type a New title</p>",
            subtitle: "<p>Type a new subtitle</p>",
            image_0: {
                imageUrl: "https://picsum.photos/200/300",
                width: "200",
                height: "200",
            },
        },
    });

    const [fields, setFields] = useState<FieldItem[]>([
        { type: "title", name: "title", order_index: 0 },
        { type: "subtitle", name: "subtitle", order_index: 1 },
        { type: "image", name: "image_0", order_index: 2 },
    ]);
    const [note, setNote] = useState<Partial<Notes>>({});
    const [titleCount, setTitleCount] = useState(1);
    const [subtitleCount, setSubtitleCount] = useState(1);
    const [imageCount, setImageCount] = useState(1);

    const handleGetNote = async () => {
        try {
            const res = await noteRepository.readNote(noteId);
            if (res.status === "OK") {
                setNote(res.data);
            } else {
                toast.error(res.message || "Failed to fetch note data");
            }
        } catch (error) {
            toast.error("Failed to fetch note data");
        }
    };


    const addTitleField = () => {
        const name = `title_${titleCount}`;
        setFields((prev) => [
            ...prev,
            { type: "title", name, order_index: prev.length },
        ]);
        setTitleCount((prev) => prev + 1);
        setValue(name, "<p>Judul baru</p>");
    };

    const addSubtitleField = () => {
        const name = `subtitle_${subtitleCount}`;
        setFields((prev) => [
            ...prev,
            { type: "subtitle", name, order_index: prev.length },
        ]);
        setSubtitleCount((prev) => prev + 1);
        setValue(name, "<p>Subjudul baru</p>");
    };

    const addImageField = () => {
        const name = `image_${imageCount}`;
        setFields((prev) => [
            ...prev,
            { type: "image", name, order_index: prev.length },
        ]);
        setImageCount((prev) => prev + 1);
        setValue(name, {
            imageUrl: "https://picsum.photos/200/300",
            width: "200",
            height: "200",
        });
    };

    const removeField = (name: string) => {
        setFields(
            (prev) =>
                prev
                    .filter((f) => f.name !== name)
                    .map((field, index) => ({ ...field, order_index: index })) // Update order_index
        );

        setValue(name, undefined);
    };

    const handleBlockCreate = async () => {
        const processedFields = fields.map((field, index, arr) => {
            if (field.type === "subtitle") {
                for (let i = index - 1; i >= 0; i--) {
                    if (arr[i].type === "title") {
                        return {
                            ...field,
                            parent_id: i + 1,
                        };
                    }
                }
            }
            return field;
        });

        const data = processedFields.map((field, index) => {
            return {
                content:
                    field.type == "image"
                        ? encodeImageUrl((getValues(field.name) as ImageField)?.imageUrl, (getValues(field.name) as ImageField)?.width , (getValues(field.name) as ImageField)?.height )    
                        : getValues(field.name),
                type: field.type != "image" ? "text" : "image",
                order_index: field.order_index,
                parent_id: field.type === "subtitle" ? field.parent_id : null,
                note_id: noteId,
            };
        });

        const toastId = toast.loading("Uploading blocks...");

        try {
            for (const item of data) {
                await bloksRepository.createBlock(item as Blocks);
            }

            toast.update(toastId, updateToastConfig("All blocks uploaded successfully!","success" ) )
            push("/dashboard");

            props.onCreated?.(true);

        } catch (error) {
  
            toast.update(toastId, updateToastConfig("Failed to upload some blocks.","error" ) )

            props.onCreated?.(false);
        }
    };

    useEffect(() => {
        handleGetNote();
    }, []);

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
                        <AppHeadline
                            className="text-start !items-start"
                            title={note.title || "Untitled Note"}
                            subtitle={`Published ${ convertDateString(
                                note.createdAt || ""
                            )}`}
                            titleClassName="font-bold text-left text-[18px]"
                            subtitleClassName="text-[12px] text-left text-gray-500"
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
                                        className="text-[22px] font-bold "
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

                                <Icon
                                    icon="gg:trash"
                                    className="text-gray-200 cursor-pointer text-[28px]"
                                    onClick={() => removeField(field.name)}
                                />
                            </AppContainer>
                        );
                    })}
                </AppContainer>

                <AppContainer className="w-max self-end">
                    <AppButton
                        text="Add Block"
                        onClick={handleSubmit(handleBlockCreate)}
                    />
                </AppContainer>
            </AppContainer>
        </AppContainer>
    );
};

export default AppContentView;
