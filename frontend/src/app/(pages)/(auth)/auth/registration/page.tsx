"use client";
import { useForm } from "react-hook-form";
import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppTextField from "@/app/components/atoms/AppTextField/AppTextField";
import AppHeadline from "@/app/components/molecules/AppHeadline/AppHeadline";
import AppRichTextButton from "@/app/components/molecules/AppRichTextButton/AppRichTextButton";
import AppButton from "@/app/components/atoms/AppButton/AppButton";
import { toast } from "react-toastify";
import * as userRepository from "@/app/api/repository/userRepository";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/redux/slices/authSlices";
import { updateToastConfig } from "@/app/utils/helper";

const RegisterView = () => {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm();

    const handleRegister = async (data: any) => {
        const toastId = toast.loading("Processing registration..."); 
        try {
            const res = await userRepository.register(data);
            if (res.status === "OK") {
                toast.update(toastId, updateToastConfig("Registration successful! Logging in..." , "success"));
    
                const loginData = await userRepository.login({
                    email: data.email,
                    password: data.password,
                });
    
                if (loginData.status === "OK") {
                    dispatch(setToken(loginData.data.accessToken));
                    push("/dashboard");
                } else {
                    toast.error(
                        loginData.message || "Login failed. Please try again."
                    );
                }
            } else {
                toast.update(toastId, updateToastConfig("Registration failed. Please try again.", "error"));
            }
        } catch (error) {
            toast.update(toastId, updateToastConfig("An error occurred during registration. Please try again.", "error"));
        }
    };

    return (
        <AppContainer className="w-[90%] sm:w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl shadow-xl bg-white">
            <AppHeadline
                title="Hallo, Welcome To Mini Notion"
                subtitle="Please register to continue"
            />
            <AppContainer className="flex flex-col w-full h-max gap-[10px]">
                <label className="text-black text-[14px] ">Name</label>
                <AppTextField
                    control={control}
                    name="name"
                    rules={{
                        required: "Name is required",
                        pattern: { value: "", message: "Invalid email format" },
                    }}
                    placeholder="Name"
                />
            </AppContainer>
            <AppContainer className="flex flex-col w-full h-max gap-[10px]">
                <label className="text-black text-[14px] ">Email</label>
                <AppTextField
                    control={control}
                    name="email"
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/,
                            message: "Invalid email format",
                        },
                    }}
                    placeholder="Email"
                />
            </AppContainer>
            <AppContainer className="flex flex-col w-full h-max gap-[10px] ">
                <label className="text-black text-[14px] ">Password</label>
                <AppTextField
                    control={control}
                    name="password"
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    }}
                    placeholder="Password"
                    type="password"
                />
            </AppContainer>
            <AppContainer className="flex flex-col w-full h-max gap-[10px] ">
                <label className="text-black text-[14px] ">
                    Konfirmasi Password
                </label>
                <AppTextField
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: "Password confirmation is required",
                        validate: (value: string) =>
                            value === getValues("password") ||
                            "Password tidak cocok",
                    }}
                    placeholder="Confirm Password"
                    type="password"
                />
            </AppContainer>

            <AppButton
                text="Register"
                type="submit"
                onClick={handleSubmit(handleRegister)}
            />

            <AppRichTextButton
                title="Do have an account?"
                subtitle="Sign In"
                onClick={() => push("/auth/login")}
            />
        </AppContainer>
    );
};

export default RegisterView;
