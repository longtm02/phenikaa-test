import React, { ReactNode, useEffect, useState } from "react";
import IconLoading from "../../components/Loading";

interface ILayoutProps {
  children: ReactNode;
  isLoading?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, isLoading }) => {
  return (
    <div className="w-full overflow-x-auto lg:p-24 min-w-[900px] p-6">
      {children}
      {isLoading && (
        <div className=" text-center top-0 flex items-center justify-center flex-col left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.3)] fixed w-full h-full overflow-hidden z-[1000]">
          <IconLoading />
        </div>
      )}
    </div>
  );
};

export default Layout;
