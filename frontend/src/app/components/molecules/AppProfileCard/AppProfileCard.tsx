import AppContainer from "../../atoms/AppContainer/AppContainer";
import AppHeadline from "../AppHeadline/AppHeadline";
import Image from "next/image";

interface AppProfileCardProps {
    onClick?: () => void;
    ttile?: string;
}

const AppProfileCard: React.FC<AppProfileCardProps> = (props) => {
    return (
        <AppContainer
            onClick={props.onClick}
            className="bg-black max-w-[10%] w-max sm:w-max md:w-max lg:w-max   xl:w-[10%] rounded-full flex items-center justify-end gap-[10px] px-[10px] py-[8px]"
        >
            <AppHeadline
                title={props.ttile || "John Doe"}
                subtitle=""
                className="text-white text-right hidden sm:hidden md:hidden lg:flex xl:flex items-end min-w-fit"
                titleClassName="text-[12px] font-bold !font-montserrat"
                subtitleClassName="hidden"
            />
            <Image
                width={50}
                height={50}
                alt="profile picture"
                src={"https://picsum.photos/seed/picsum/200/300"}
                className="rounded-full w-[40px] h-[40px]  "
            />
        </AppContainer>
    );
};

export default AppProfileCard;
