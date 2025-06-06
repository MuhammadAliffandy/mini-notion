"use client";

import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppTextField from "../../atoms/AppTextField/AppTextField";
import { Icon } from "@iconify/react";
import { Control } from "react-hook-form";
import AppProfileCard from "../AppProfileCard/AppProfileCard";

interface AppToolbarDashboardProps {
    control: Control<any>;
    titleProfile?: string;
    onClickProfile?: () => void;
}

const AppToolbarDashboard: React.FC<AppToolbarDashboardProps> = (props) => {
    return (
        <AppContainer className="flex items-center w-full justify-between">
            <AppContainer className="flex items-center relative w-[50%] h-max  rounded-2xl">
                <AppTextField
                    control={props.control}
                    name="search"
                    className="bg-white rounded-full p-[15px] !w-full text-[12px] relative "
                    rules={{
                        required: "search",
                        pattern: {
                            value: /^(?!\s*$).+/,
                            message:
                                "Input tidak boleh kosong atau hanya spasi",
                        },
                    }}
                    placeholder="Search content..."
                />
                <Icon
                    icon="mingcute:search-line"
                    className="text-gray-500 text-[24px] absolute  right-4"
                />
            </AppContainer>
            <AppProfileCard
                ttile={props.titleProfile}
                onClick={props.onClickProfile}
            />
        </AppContainer>
    );
};

export default AppToolbarDashboard;
