"use client";
import { useForm } from "react-hook-form";
import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppTextField from "@/app/components/atoms/AppTextField/AppTextField";
import AppHeadline from "@/app/components/molecules/AppHeadline/AppHeadline";
import AppRichTextButton from "@/app/components/molecules/AppRichTextButton/AppRichTextButton";
import AppButton from "@/app/components/atoms/AppButton/AppButton";
import { toast } from "react-toastify";
import * as userRepository from "@/app/api/repository/userRepository";
import { Users } from "@/app/utils/types";

const RegisterView = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleRegister = async (data: Users) => {
        try {
            const res = await userRepository.register(data);
            if (res.status === "OK") {
                toast.success("Registration successful!", {
                    onClose: () => {
                        console.log("Redirect to login page");
                    },
                });
            } else {
                toast.error(
                    res.message || "Registration failed. Please try again."
                );
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };

    const onSubmit = (data: any) => {
        handleRegister(data as Users);
    };

    return (
        <AppContainer className="w-[30%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl shadow-xl bg-white">
            <AppHeadline
                title="Hallo, Welcome To Mini Notice"
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

            <p className="text-black text-[14px] self-end ">Lupa Password ?</p>
            <AppButton
                text="Register"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />

            <AppRichTextButton
                title="Do have an account?"
                subtitle="Sign In"
                onClick={() => console.log("Navigate to Sign In")}
            />
        </AppContainer>
    );
};

export default RegisterView;
