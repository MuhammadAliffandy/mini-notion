'use client'
import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppTitleContent from "@/app/components/molecules/AppTitleContent/AppTitleContent";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import AppSubtitleContent from "@/app/components/molecules/AppSubtitleContent/AppSubtitleContent";

interface AppCardContent {
    control: Control<any>;
}

const AppCardContent: React.FC<AppCardContent> = (props) => {
    return(
    <AppContainer className="w-full h-full flex flex-col items-start justify-start">
    <AppTitleContent
        control={props.control}
        name="title"
        rules={{ required: "Judul tidak boleh kosong" }}
      />
       <AppSubtitleContent
        control={props.control}
        name="subtitle"
        rules={{ required: "Judul tidak boleh kosong" }}
      />
    </AppContainer>)
}

export default AppCardContent;