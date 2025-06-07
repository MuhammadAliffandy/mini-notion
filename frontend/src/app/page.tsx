'use client'
import Image from "next/image";
import AppButton from "./components/atoms/AppButton/AppButton";
import { useRouter } from "next/navigation";


export default function Home() {

  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen  font-[family-name:var(--font-unbounded)]">
        <div className="flex flex-col items-center gap-[10px]"> 
            <h1 className="text-[60px] font-bold text-center">Welcome to Mini Notion Clone</h1>
            <p className="text-center text-gray-400 text-[24px]">This is a simple Mini Notion application. Be have fun and enjoy to try this</p>
              <AppButton
                text="Lest's Get Started"
                className="bg-white mt-6 w-max !text-black hover:bg-gray-300 transition-colors duration-300"
                onClick={() => push('/auth/login')}
              />

        </div>
    </div>
  );
}
