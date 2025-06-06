"use client";

import AppContainer from "../../atoms/AppContainer/AppContainer";
import React from "react";
import { Icon } from "@iconify/react";
import AppCheck from "../../atoms/AppCheck/AppCheck";
import AppPopover from "../../molecules/AppPopover/AppPopover";

interface AppCardTitleProps {
    title: string;
    createdAt: string;
    username: string;
    isChecked?: boolean;
    checked?: boolean;
    onCheck?: React.ChangeEventHandler<HTMLInputElement>;
    onClick?: () => void;
    onDetail?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}

const AppCardTitle: React.FC<AppCardTitleProps> = (props) => {
    return (
        <AppContainer className="w-full shadow-md flex items-center p-[20px] bg-white rounded-2xl  justify-between text-black  ">
            <AppContainer className="flex items-center gap-[10px] w-[30%]">
                {props.isChecked && (
                    <AppCheck
                        checked={props.checked}
                        onChange={props.onCheck}
                    />
                )}
                <h1 className="text-[16px] font-bold !font-montserrat">
                    {props.title}
                </h1>
            </AppContainer>
            <p className="text-gray-400 text-[14px] w-[20%] ">
                {props.createdAt}
            </p>
            <AppContainer className="flex items-center gap-[10px] w-[30%]">
                <p className="p-4 text-[14px]  leading-0 text-white bg-black rounded-full">
                    {props.username?.charAt(0).toUpperCase() || ""}
                </p>
                <p className="text-black text-[14px]">{props.username}</p>
            </AppContainer>
            <AppPopover>
                <Icon
                    icon="fluent:apps-list-detail-32-filled"
                    className="text-white bg-gray-400 p-[10px] rounded-md cursor-pointer  text-[40px]"
                    onClick={props.onDetail}
                />
                <Icon
                    icon="cuida:edit-outline"
                    className="text-white bg-blue-400 p-[10px] rounded-md cursor-pointer  text-[40px]"
                    onClick={props.onEdit}
                />
                <Icon
                    icon="gg:trash"
                    className="text-white bg-red-400 p-[10px] rounded-md cursor-pointer  text-[40px]"
                    onClick={props.onDelete}
                />
            </AppPopover>
        </AppContainer>
    );
};

export default AppCardTitle;
