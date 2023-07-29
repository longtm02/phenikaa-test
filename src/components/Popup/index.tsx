import { FC, useEffect } from "react";

interface IModalProps {
  visibility: Boolean;
  setVisibility: (value: boolean) => void;
  children: any;
  className?: string;
}

const Modal : FC<IModalProps> = (props) => {
  const { visibility, setVisibility, children, className } = props;
  useEffect(() : () => void => {
    if (visibility) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    return () =>
      (document.getElementsByTagName("body")[0].style.overflow = "auto");
  }, [visibility]);

  if (!visibility) return null;
  return (
    <div
      className="fixed w-full overflow-y-auto bg-[rgba(0,0,0,0.3)] z-50 top-0 bottom-0 left-0 flex justify-center items-center"
      onClick={() => {
        setVisibility(false);
      }}
    >
      <div className={className} onClick={(e) => e.stopPropagation()}> {children} </div>
    </div>
  );
};

export default Modal;
