"use client";
import { useForm } from "react-hook-form";
import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";
import AppTextField from "@/app/components/atoms/AppTextField/AppTextField";
import AppHeadline from "@/app/components/molecules/AppHeadline/AppHeadline";
import AppRichTextButton from "@/app/components/molecules/AppRichTextButton/AppRichTextButton";
import AppButton from "@/app/components/atoms/AppButton/AppButton";
import * as userRepository from "@/app/api/repository/userRepository";
import { Users } from "@/app/utils/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/redux/slices/authSlices";
import { setUserId } from "@/app/redux/slices/userSlices";

const LoginView: React.FC = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { push } = useRouter();
    const dispatch = useDispatch();

    const getUser = async () => {
        try {
            const res = await userRepository.getUser();

            if (res.status === "OK") {
                dispatch(setUserId(res.data.id));
            } else {
                toast.error(res.message || "Failed to fetch user data.");
            }
        } catch (error) {
            toast.error("Failed to fetch user data.");
        }
    };

    const handleLogin = async (data: Users) => {
        try {
            const res = await userRepository.login(data);
            if (res.status == "OK") {
                dispatch(setToken(res.data.accessToken));

                await getUser();
                toast.success("Login successful!", {
                    onClose: () => {
                        push("/dashboard");
                    },
                });
            } else {
                toast.error(res.message || "Login failed. Please try again.");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const onSubmit = (data: Object) => {
        handleLogin(data as Users);
    };

    return (
        <AppContainer className=" w-[90%] sm:w-[90%] md:w-[50%] lg:w-[40%]  xl:w-[30%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl shadow-xl bg-white">
            <AppHeadline
                title="Welcome To Mini Notion "
                subtitle="Please login to continue"
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

            <p
                className="text-black text-[14px] self-end cursor-pointer "
                onClick={() => push("/auth/forgot-pass")}
            >
                Lupa Password ?
            </p>
            <AppButton
                text="Login"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />

            <AppRichTextButton
                title="Don't have an account?"
                subtitle="Sign Up"
                onClick={() => push("/auth/registration")}
            />
        </AppContainer>
    );
};

export default LoginView;
