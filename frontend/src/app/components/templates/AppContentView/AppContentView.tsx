"use client";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppHeadline from "../../molecules/AppHeadline/AppHeadline";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AppTitleContent from "../../molecules/AppTitleContent/AppTitleContent";
import AppSubtitleContent from "../../molecules/AppSubtitleContent/AppSubtitleContent";
import { Icon } from "@iconify/react";
import AppImageContent from "../../molecules/AppImageContent/AppImageContent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as blockRepository from "../../../api/repository/blockRepository";
import * as noteRepository from "../../../api/repository/noteRepository";
import { Blocks, Notes } from "@/app/utils/types";
import { convertDateString } from "@/app/utils/helper";
import AppButton from "../../atoms/AppButton/AppButton";

interface AppContentViewProps {
    onClick?: () => void;
}

const AppContentView: React.FC<AppContentViewProps> = (props) => {
    const noteId = useSelector((state: any) => state.note.value);

    const [note, setNote] = useState<Partial<Notes>>({});
    const [blocks, setBlocks] = useState<Blocks[]>([]);
    const [buttonSaved, setButtonSaved] = useState<boolean>(false);
    const { control, handleSubmit, setValue, getValues } = useForm();

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

    const handleGetBlocks = async () => {
        try {
            const res = await blockRepository.readByNoteId(noteId);
            if (res.status === "OK") {
                setBlocks(res.data);

                res.data.forEach((data: Blocks, index: number) => {
                    if (data.type === "text" && data.parent_id == null) {
                        setValue(`title_${index}`, data.content || "");
                    }
                    if (data.type === "text" && data.parent_id != null) {
                        setValue(`subtitle_${index}`, data.content || "");
                    }
                });
            } else {
                toast.error(res.message || "Failed to fetch blocks data");
            }
        } catch (error) {
            toast.error("Failed to fetch blocks data");
        }
    };

    const handleUpdateBlocks = async (id: number, data: Blocks) => {
        try {
            const res = await blockRepository.updateBlock(id, data);
            if (res.status === "OK") {
                toast.success("Blocks data updated successfully");
                setButtonSaved(false);
                await handleGetBlocks();
            } else {
                toast.error(res.message || "Failed to update blocks data");
            }
        } catch (error) {
            toast.error("Failed to update blocks data");
        }
    };

    useEffect(() => {
        handleGetBlocks();
    }, []);

    useEffect(() => {
        handleGetNote();
    }, []);

    return (
        <AppContainer className="w-full bg-white h-full flex flex-col items-start p-[20px] rounded-2xl  ">
            <AppContainer className="w-full h-full bg-transparent p-[20px] flex flex-col gap-[40px] border-2 border-gray-300 rounded-2xl ">
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
                            subtitle={`Published ${convertDateString(
                                note.createdAt || ""
                            )}`}
                            titleClassName="font-bold text-left text-[18px]"
                            subtitleClassName="text-[12px] text-left text-gray-500"
                        />
                    </AppContainer>
                    <p className="text-[12px] text-gray-400 ">
                        Updated {convertDateString(note.updatedAt || "")}
                    </p>
                </AppContainer>
                <AppContainer className="w-full h-full flex flex-col gap-[10px] text-black overflow-hidden  ">
                    {blocks.map((block, index) => (
                        <div key={index} className="block-item">
                            {getValues(`title_${index}`) && (
                                <AppTitleContent
                                    control={control}
                                    name={`title_${index}`}
                                    rules={{ required: "Title is required" }}
                                    className="text-[22px] font-bold"
                                    onChange={(value) => setButtonSaved(value)}
                                />
                            )}
                            {getValues(`subtitle_${index}`) && (
                                <AppSubtitleContent
                                    control={control}
                                    name={`subtitle_${index}`}
                                    rules={{ required: "Subtitle is required" }}
                                    onChange={(value) => setButtonSaved(value)}
                                />
                            )}
                            {getValues(`image_${index}`) && (
                                <AppImageContent
                                    control={control}
                                    namePrefix={`image_${index}`}
                                />
                            )}
                        </div>
                    ))}
                </AppContainer>
                {buttonSaved && (
                    <AppButton
                        text="Simpan"
                        className="w-max self-end"
                        onClick={() => {}}
                    />
                )}
            </AppContainer>
        </AppContainer>
    );
};

export default AppContentView;
