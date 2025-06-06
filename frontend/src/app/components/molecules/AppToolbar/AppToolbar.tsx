"use client";

import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppButton from "@/app/components/atoms/AppButton/AppButton";
import AppCheck from "../../atoms/AppCheck/AppCheck";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface AppToolbarProps {
  isChecked?: boolean;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onChecked?: (value: boolean) => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const AppToolbar: React.FC<AppToolbarProps> = (props) => {
  const [checklist, setChecklist] = useState<boolean>(false);

  return (
    <AppContainer className="flex w-full items-center justify-between">
      <AppContainer className="flex items-center gap-[10px]">
        {checklist && (
          <AppCheck checked={props.checked} onChange={props.onChange} />
        )}
        <h1 className="text-black font-bold text-[22px] font-montserrat">
          Konten{" "}
        </h1>
      </AppContainer>
      <AppContainer className="flex items-center gap-[10px] ">
        {checklist ? (
          <>
            <AppButton
              className="bg-gray-300 !text-black"
              text="Cancel"
              onClick={() => {
                setChecklist(false);
                props.onChecked?.(false);
              }}
            />
            <AppButton
              className="bg-red-400"
              text="Delete"
              onClick={props.onDelete}
            />
          </>
        ) : (
          <>
            <Icon
              icon="gridicons:add"
              className="text-black text-[45px] p-0 rounded-full"
              onClick={props.onClick}
            />
            <AppButton
              text="Tandai"
              onClick={() => {
                setChecklist(true);
                props.onChecked?.(true);
              }}
            />
          </>
        )}
      </AppContainer>
    </AppContainer>
  );
};

export default AppToolbar;
