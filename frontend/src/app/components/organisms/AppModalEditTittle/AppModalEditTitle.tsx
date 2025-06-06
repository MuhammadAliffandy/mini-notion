"use client";
import AppModal from "../../atoms/AppModal/AppModal";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppTextField from "../../atoms/AppTextField/AppTextField";
import { Control } from "react-hook-form";
import AppButton from "../../atoms/AppButton/AppButton";

interface AppModalEditTitleProps {
    control: Control<any>;
    open: boolean;
    onClose: () => void;
    onEdit: () => void;
}

const AppModalEditTitle: React.FC<AppModalEditTitleProps> = (props) => {
    return (
        <AppModal open={props.open} onClose={props.onClose}>
            <AppContainer className="w-full  h-full flex flex-col gap-[20px]">
                <h1 className="text-black font-bold text-[16px]">
                    Edit Judul Catatan
                </h1>
                <AppContainer className="w-full flex items-center gap-[20px]">
                    <AppTextField
                        className="rounded-full px-[20px] py-[15px]"
                        control={props.control}
                        name={"noteEditTitle"}
                        rules={{
                            required: "Masukkan Edit Judul Catatan",
                            pattern: {
                                value: /^(?!\s*$).+/,
                                message:
                                    "Input tidak boleh kosong atau hanya spasi",
                            },
                        }}
                        placeholder="Masukkan judul catatan baru"
                    />
                </AppContainer>
                <AppContainer className="w-full flex items-center gap-[10px]">
                    <AppButton
                        text="Cancel"
                        className="bg-gray-200 text-black"
                        onClick={props.onClose}
                    />
                    <AppButton
                        text="Simpan"
                        className="bg-black text-white"
                        onClick={props.onEdit}
                    />
                </AppContainer>
            </AppContainer>
        </AppModal>
    );
};

export default AppModalEditTitle;
