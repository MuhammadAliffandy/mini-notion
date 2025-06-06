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
            className="bg-black rounded-full flex items-center gap-[10px] px-[10px] py-[8px]"
        >
            <AppHeadline
                title={props.ttile || "John Doe"}
                subtitle=""
                className="text-white text-right items-end min-w-fit"
                titleClassName="text-[12px] font-bold !font-montserrat"
                subtitleClassName="text-[8px] !font-montserrat  w-[60%] break-words "
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
