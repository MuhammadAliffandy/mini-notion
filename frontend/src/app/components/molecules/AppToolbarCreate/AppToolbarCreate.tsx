"use client";
import AppContainer from "../../atoms/AppContainer/AppContainer";
import { Icon } from "@iconify/react";

interface AppToolbarCreateProps {
  onAddImage?: () => void;
  onAddTitle?: () => void;
  onAddSubtitle?: () => void;
}

const AppToolbarCreate: React.FC<AppToolbarCreateProps> = (props) => {
  return (
    <AppContainer className="flex items-center gap-[10px]">
      <Icon
        icon="icon-park-outline:link"
        className="text-white bg-purple-400 text-[40px] p-[10px] rounded-lg cursor-pointer"
        onClick={props.onAddImage}
      />
      <Icon
        icon="fa-solid:heading"
        className="text-white bg-green-600 text-[40px] p-[10px] rounded-lg cursor-pointer"
        onClick={props.onAddTitle}
      />
      <Icon
        icon="fluent:text-12-regular"
        className="text-white bg-green-400 text-[40px] p-[10px] rounded-lg cursor-pointer"
        onClick={props.onAddSubtitle}
      />
    </AppContainer>
  );
};

export default AppToolbarCreate;
