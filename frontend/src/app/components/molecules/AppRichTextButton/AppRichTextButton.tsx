"use client";
import AppContainer from "../../atoms/AppContainer/AppContainer";

interface AppRichTextButton {
  title?: string;
  subtitle?: string;
  onClick?: () => void;
}

const AppRichTextButton: React.FC<AppRichTextButton> = (props) => {
  return (
    <AppContainer className="w-max flex items-center gap-[5px]">
      <p className="text-black text-[14px]">{props.title}</p>
      <p
        onClick={props.onClick}
        className="text-blue-500 text-[14px] cursor-pointer"
      >
        {props.subtitle}
      </p>
    </AppContainer>
  );
};

export default AppRichTextButton;
