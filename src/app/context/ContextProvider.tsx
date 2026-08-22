import React, { useState, type ReactNode } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";
import type { Member } from "../../libs/types/member";
import useBasket from "../hooks/useBasket";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const cookies = new Cookies();

    if (!cookies.get("accessToken")) {
        localStorage.removeItem("memberData");
    }

    const [authMember, setAuthMember] = useState<Member | null>(
        localStorage.getItem("memberData")
            ? JSON.parse(localStorage.getItem("memberData") as string)
            : null,
    );

    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

    const basket = useBasket();

    return (
        <GlobalContext.Provider
            value={{
                authMember,
                setAuthMember,
                basket,
                orderBuilder,
                setOrderBuilder,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextProvider;