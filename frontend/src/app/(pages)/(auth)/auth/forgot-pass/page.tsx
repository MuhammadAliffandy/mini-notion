"use client";
import { useForm } from "react-hook-form";
import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppTextField from "@/app/components/atoms/AppTextField/AppTextField";
import AppHeadline from "@/app/components/molecules/AppHeadline/AppHeadline";
import AppButton from "@/app/components/atoms/AppButton/AppButton";
import { toast } from "react-toastify";
import * as userRepository from "@/app/api/repository/userRepository";
import { useRouter } from "next/navigation";

const ForgotPassView: React.FC = () => {
    const { push } = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleForgotPass = async (data: any) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
            };

            const res = await userRepository.forgotPass(payload);

            if (res.status == "OK") {
                toast.success("Password reset successful!");
                push("/auth/login");
            } else {
                toast.error(
                    res.message || "Failed to reset password. Please try again."
                );
            }
        } catch (error) {
            toast.error("Failed to reset password. Please try again later.");
        }
    };

    return (
        <AppContainer className="w-[90%] sm:w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl shadow-xl bg-white">
            <AppHeadline
                title="Dont worry for your account"
                subtitle="Fill Your Email"
            />
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

            <AppContainer className="flex flex-col w-full h-max gap-[10px]">
                <label className="text-black text-[14px] ">New Password</label>
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

            <AppButton
                text="Submit"
                type="submit"
                onClick={handleSubmit(handleForgotPass)}
            />
        </AppContainer>
    );
};

export default ForgotPassView;
