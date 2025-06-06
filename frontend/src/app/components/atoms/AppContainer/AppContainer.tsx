"use client";

interface AppContainerProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;

  style?: React.CSSProperties;
  animation?: string;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  return (
    <div
      id={props.id}
      data-aos={props.animation}
      style={props.style}
      onClick={props.onClick}
      className={props.className ?? `flex flex-col`}
    >
      {props.children}
    </div>
  );
};

export default AppContainer;
