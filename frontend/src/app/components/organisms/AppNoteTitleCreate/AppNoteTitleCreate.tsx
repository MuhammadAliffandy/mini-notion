"use client";

import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppTextField from "../../atoms/AppTextField/AppTextField";
import { Icon } from "@iconify/react";
import { Control } from "react-hook-form";

interface AppNoteTitleCreateProps {
    control: Control<any>;
    onCancel: () => void;
    onAdd: () => void;
}

const AppNoteTitleCreate: React.FC<AppNoteTitleCreateProps> = (props) => {
    return (
        <AppContainer className="w-full flex items-center gap-[20px]">
            <AppTextField
                className="rounded-full px-[20px] py-[15px]"
                control={props.control}
                name={"noteTitle"}
                rules={{
                    required: "Link wajib diisi",
                    pattern: {
                        value: /^(?!\s*$).+/,
                        message: "Input tidak boleh kosong atau hanya spasi",
                    },
                }}
                placeholder="Masukkan judul catatan baru"
            />
            <AppContainer className="flex items-center gap-[10px]">
                <Icon
                    icon="mdi:check-bold"
                    className="text-white text-[32px] p-[5px] bg-black rounded-full cursor-pointer"
                    onClick={props.onAdd}
                />
                <Icon
                    icon="mdi:close-bold"
                    className="text-white text-[32px] p-[5px] bg-gray-400 rounded-full cursor-pointer"
                    onClick={props.onCancel}
                />
            </AppContainer>
        </AppContainer>
    );
};

export default AppNoteTitleCreate;
