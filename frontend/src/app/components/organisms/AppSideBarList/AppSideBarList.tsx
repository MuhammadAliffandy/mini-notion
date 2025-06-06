"use client";

import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppSideBar from "@/app/components/molecules/AppSideBar/AppSideBar";
import * as userRepository from "@/app/api/repository/userRepository";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AppSideBarList: React.FC = () => {
    const { push } = useRouter();

    const handleLogout = async () => {
        try {
            const res = await userRepository.logout();

            if (res.status === "OK") {
                push("auth/login");
            } else {
                toast.error(res.message || "Logout failed. Please try again.");
            }
        } catch (error) {
            toast.error("Internal server error. Please try again later.");
        }
    };

    return (
        <AppContainer className="w-full h-full flex flex-col gap-[30px] p-[20px]">
            <h1 className="h-max text-white text-[24px] font-bold !font-montserrat ">
                Mini Notion
            </h1>
            <AppContainer className="h-full flex flex-col items-stretch justify-between">
                <AppSideBar icon="mdi:view-dashboard" text="Dashboard" />
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
