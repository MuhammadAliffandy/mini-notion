'use client'

import AppContainer from "@/app/components/atoms/AppContainer/AppContainer";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {




    return (
        <>
            <AppContainer className="w-full h-screen flex flex-col items-center justify-center ">
                {props.children}
            </AppContainer>

        </>

    ) 
}

export default Layout;