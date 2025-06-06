"use client";

import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppSideBar from "@/app/components/molecules/AppSideBar/AppSideBar";
import * as userRepository from "@/app/api/repository/userRepository";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/redux/slices/authSlices";

import { persistor } from "@/app/redux/store";

const AppSideBarList: React.FC = () => {
    const { push } = useRouter();
    const dipatch = useDispatch();

    const pathname = usePathname();
    const lastSegment = pathname.split("/").filter(Boolean).pop();

    const handleLogout = async () => {
        try {
            const res = await userRepository.logout();

            if (res.status === "OK") {
                dipatch(setToken(""));
                persistor.purge();
                push("auth/login");
            } else {
                toast.error(res.message || "Logout failed. Please try again.");
            }
        } catch (error) {
            toast.error("Internal server error. Please try again later.");
        }
    };

    return (
        <AppContainer className=" h-full flex flex-col gap-[30px] p-[20px]">
            <h1 className="h-max text-white text-center text-[24px] font-bold !font-montserrat ">
                Mini Notion
            </h1>
            <AppContainer className="h-full  flex flex-col items-stretch justify-between">
                <AppSideBar
                    icon="mdi:view-dashboard"
                    text="Dashboard"
                    isSelected={lastSegment == "dashboard" ? true : false}
                />
                <AppSideBar
                    icon="mdi:logout"
                    text="Logout"
                    onClick={handleLogout}
                />
            </AppContainer>
        </AppContainer>
    );
};

export default AppSideBarList;
