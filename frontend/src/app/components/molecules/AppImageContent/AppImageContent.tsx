"use client";

import AppContainer from "../../atoms/AppContainer/AppContainer";
import { Control, useWatch } from "react-hook-form";
import { useState } from "react";
import AppTextField from "../../atoms/AppTextField/AppTextField";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface AppImageContentProps {
  control: Control<any>;
  namePrefix: string; // ← Tambahkan ini
}

const AppImageContent: React.FC<AppImageContentProps> = ({
  control,
  namePrefix,
}) => {
  const [editing, setEditing] = useState(false);

  // Watch dengan prefix
  const imageUrl = useWatch({ control, name: `${namePrefix}.imageUrl` });
  const width = useWatch({ control, name: `${namePrefix}.width` });
  const height = useWatch({ control, name: `${namePrefix}.height` });

  return (
    <AppContainer className="flex flex-col gap-4">
      {editing && (
        <>
          <AppContainer className="flex items-center gap-[20px]">
            <AppTextField
              control={control}
              name={`${namePrefix}.imageUrl`} // ← Gunakan prefix
              rules={{
                required: "Link wajib diisi",
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                  message: "Format link tidak valid",
                },
              }}
              placeholder="Image URL"
            />
            <AppContainer className="flex items-center gap-[10px]">
              <AppTextField
                control={control}
                name={`${namePrefix}.width`} // ← Gunakan prefix
                rules={{
                  required: "Angka wajib diisi",
                  pattern: {
                    value: /^\d+$/,
                    message: "Hanya boleh angka",
                  },
                }}
                placeholder="Width"
              />
              <AppTextField
                control={control}
                name={`${namePrefix}.height`} // ← Gunakan prefix
                rules={{
                  required: "Angka wajib diisi",
                  pattern: {
                    value: /^\d+$/,
                    message: "Hanya boleh angka",
                  },
                }}
                placeholder="Height"
              />
            </AppContainer>

            <Icon
              onClick={() => setEditing(false)}
              icon="mdi:check"
              className="text-[24px] cursor-pointer text-white bg-green-500"
            />
          </AppContainer>
        </>
      )}

      {!editing && imageUrl && width && height && (
        <Image
          onClick={() => setEditing(true)}
          src={imageUrl}
          alt="preview"
          width={parseInt(width)}
          height={parseInt(height)}
          className="rounded-lg border border-gray-300 cursor-pointer"
        />
      )}
    </AppContainer>
  );
};

export default AppImageContent;
