import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    GlobalContext,
} from "../hooks/useGlobals";

import type {
    Member,
} from "../../libs/types/member";

import useBasket
    from "../hooks/useBasket";

import MemberService
    from "../services/MemberService";


interface ContextProviderProps {
    children: ReactNode;
}


const ContextProvider = ({
    children,
}: ContextProviderProps) => {


    /* =====================================================
       AUTH MEMBER
    ===================================================== */

    const [
        authMember,
        setAuthMemberState,
    ] = useState<Member | null>(() => {

        const memberData =
            localStorage.getItem(
                "memberData",
            );


        if (!memberData) {
            return null;
        }


        try {

            return JSON.parse(
                memberData,
            ) as Member;

        } catch {

            localStorage.removeItem(
                "memberData",
            );

            return null;
        }
    });


    /* =====================================================
       AUTH LOADING
    ===================================================== */

    const [
        authLoading,
        setAuthLoading,
    ] = useState(true);


    /* =====================================================
       SET AUTH MEMBER
    ===================================================== */

    const setAuthMember = (
        member: Member | null,
    ) => {

        /*
         * React state
         */

        setAuthMemberState(
            member,
        );


        /*
         * localStorage
         */

        if (member) {

            localStorage.setItem(
                "memberData",
                JSON.stringify(
                    member,
                ),
            );

        } else {

            localStorage.removeItem(
                "memberData",
            );
        }
    };


    /* =====================================================
       RESTORE AUTH
    ===================================================== */

    useEffect(() => {

        const restoreAuth =
            async () => {

                try {

                    const memberService =
                        new MemberService();


                    /*
                     * Backend:
                     *
                     * GET /user/detail
                     *       ↓
                     * verifyAuth
                     *       ↓
                     * authenticated Member
                     */

                    const member =
                        await memberService
                            .getUserDetail();


                    console.log(
                        "AUTH RESTORED:",
                        member,
                    );


                    /*
                     * Session/cookie hali valid.
                     */

                    setAuthMember(
                        member,
                    );


                } catch (err) {

                    console.log(
                        "NO ACTIVE AUTH SESSION:",
                        err,
                    );


                    /*
                     * Token/session yo'q
                     * yoki expired.
                     */

                    setAuthMember(
                        null,
                    );


                } finally {

                    setAuthLoading(
                        false,
                    );
                }
            };


        restoreAuth();

    }, []);


    /* =====================================================
       ORDER BUILDER
    ===================================================== */

    const [
        orderBuilder,
        setOrderBuilder,
    ] =
        useState<Date>(
            new Date(),
        );


    /* =====================================================
       BASKET
    ===================================================== */

    const basket =
        useBasket();


    /* =====================================================
       PROVIDER
    ===================================================== */

    return (

        <GlobalContext.Provider
            value={{

                /* AUTH */

                authMember,

                setAuthMember,

                authLoading,


                /* BASKET */

                basket,


                /* ORDER */

                orderBuilder,

                setOrderBuilder,

            }}
        >

            {children}

        </GlobalContext.Provider>
    );
};


export default ContextProvider;