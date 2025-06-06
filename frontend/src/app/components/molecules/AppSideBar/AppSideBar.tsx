"use client";

import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import { Icon } from "@iconify/react";

interface AppSideBarProps {
    className?: string;
    icon?: string;
    text?: string;
    onClick?: () => void;
}

const AppSideBar: React.FC<AppSideBarProps> = (props) => {
    return (
        <AppContainer
            onClick={props.onClick}
            className="flex items-center gap-[10px] cursor-pointer"
        >
            <Icon
                icon={props.icon || "mdi:chevron-right"}
                className="text-white text-[18px]"
            />
            <p>{props.text}</p>
        </AppContainer>
    );
};

export default AppSideBar;
