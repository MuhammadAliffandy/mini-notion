"use client";

import { useState, MouseEvent, ReactNode } from "react";
import { Tooltip, Popover } from "@mui/material";
import { Icon } from "@iconify/react";

interface AppPopoverProps {
    children: ReactNode;
}

const AppPopover: React.FC<AppPopoverProps> = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget as unknown as HTMLElement);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="More">
                <Icon
                    icon="mdi:dots-horizontal"
                    className="text-black cursor-pointer"
                    onClick={handleClick}
                    fontSize={24}
                />
            </Tooltip>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <div className="bg-white rounded-xl flex gap-[10px] p-[10px] items-center">
                    {children}
                </div>
            </Popover>
        </>
    );
};

export default AppPopover;
