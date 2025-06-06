'use client'
import { useForm } from "react-hook-form";
import AppContainer from "@/app/components/atoms/AppContainer/AppContainer"
import AppTextField from "@/app/components/atoms/AppTextField/AppTextField";
import AppHeadline from "@/app/components/molecules/AppHeadline/AppHeadline";
import AppButton from "@/app/components/atoms/AppButton/AppButton";


const ForgotPassView: React.FC = () => {

    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data: any) => {
        console.log("Form data:", data);
      };

    return(
        <AppContainer className='w-[30%] h-max flex flex-col items-center gap-[20px] justify-center p-[40px] rounded-xl shadow-xl bg-white'>
            <AppHeadline
                title="Dont worry for your account"
                subtitle="Fill Your Email"
            />
            <AppContainer className="flex flex-col w-full h-max gap-[10px]">
                <label className="text-black text-[14px] ">Email</label>
                <AppTextField
                    control={control}
                    name="email"
                    rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } }}
                    placeholder="Email"
                    />
            </AppContainer>


            <AppButton
                text="Send Email"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                />
                

        </AppContainer>
    )
}

export default ForgotPassView;