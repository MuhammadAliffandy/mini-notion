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
import { convertDateString, decodeImageUrl , encodeImageUrl } from "@/app/utils/helper";
import { io } from "socket.io-client";
import { debounce, set } from "lodash";


interface AppContentViewProps {
    onClick?: () => void;
}

const AppContentView: React.FC<AppContentViewProps> = (props) => {
    const socket = io(process.env.BASE_URL, {
        transports: ["websocket", "polling"],
    });

    const noteId = useSelector((state: any) => state.note.value);

    const [note, setNote] = useState<Partial<Notes>>({});
    const [blocks, setBlocks] = useState<Blocks[]>([]);
    const [typing , setTyping] = useState<boolean>(false);
 
    const [fields, setFields] = useState<string[]>([]);
    const { control, setValue, getValues, watch } = useForm();

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
                    if (data.type === "image") {
                        setValue(`image_${index}`, decodeImageUrl(data.content || ""));
                    }
                });

             
            } else {
                toast.error(res.message || "Failed to fetch blocks data");
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch blocks data");
        }
    };

    const handleUpdateBlocks = async (id: number, data: Blocks) => {
        try {
            const res = await blockRepository.updateBlock(id, data);
            if (res.status === "OK") {
         
            } else {
                toast.error(res.message || "Failed to update blocks data");
            }
        } catch (error) {
            toast.error("Failed to update blocks data");
        }
    };


    useEffect(() => {
        if (blocks.length === 0) handleGetBlocks();
    }, []);


    useEffect(() => {
        handleGetNote();
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("✅ Connected to server");
        });

        socket.on("block_updated", (updatedBlock) => {
              blocks.map(data => {
                if (data.id === updatedBlock.id) {
                    if (data.type === "text" && data.parent_id == null) {
                        setValue(`title_${data.order_index}`, updatedBlock.content || "");
                    }
                    if (data.type === "text" && data.parent_id != null) {
                        setValue(`subtitle_${data.order_index}`, updatedBlock.content || "");
                    }
                    if (data.type === "image") {
                        setValue(`image_${data.order_index}`, decodeImageUrl(updatedBlock.content || ""));
                    }
                }
              })
         
        });

        return () => {
            socket.off("block_updated");
        };
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
                        <div key={block.id} className="block-item">
                            {getValues(`title_${index as number}`) && (
                                <AppTitleContent
                                    control={control}
                                    name={`title_${index}`}
                                    rules={{ required: "Title is required" }}
                                    className="text-[22px] font-bold"
                                 
                                    onIdle={()=> { 
                                        handleUpdateBlocks(block.id as number, { ...block, content: getValues(`title_${index as number}`)});
                                        console.log('selesai ngetik')}}
                                />
                            )}
                            {getValues(`subtitle_${index as number}`) && (
                                <AppSubtitleContent
                                    control={control}
                                    name={`subtitle_${index}`}
                                    rules={{ required: "Subtitle is required" }}
                                    onIdle={() => {
                                        handleUpdateBlocks(block.id as number, { ...block, content: getValues(`subtitle_${index as number}`)});
                                        console.log('selesai ngetik subtitle')}
                                    } 
                                />
                            )}
                            {getValues(`image_${index as number}`) && (
                                <AppImageContent
                                    control={control}
                                    namePrefix={`image_${index}`}
                                    onIdleImageUrl={
                                        () => {
                                            handleUpdateBlocks(block.id as number, { ...block, content:getValues(`image_${index as number}`).imageUrl});
                                            console.log('selesai ngetik image')
                                        }
                                    }
                                    onIdleWidth={
                                        () => {
                                            handleUpdateBlocks(block.id as number, { ...block, content:getValues(`image_${index as number}`).width});
                                            console.log('selesai ngetik width')
                                        }
                                    }
                                    onIdleHeight={
                                        () => {
                                            handleUpdateBlocks(block.id as number, { ...block, content:getValues(`image_${index as number}`).height});
                                            console.log('selesai ngetik height')
                                        }
                                    }
                                />
                            )}
                        </div>
                    ))}
                </AppContainer>
             
            </AppContainer>
        </AppContainer>
    );
};

export default AppContentView;
