import {
    useState,
    type KeyboardEvent,
} from "react";

import {
    Backdrop,
    Box,
    Button,
    Fade,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import type {
    LoginInput,
    MemberInput,
} from "../../../libs/types/member";

import {
    Messages,
} from "../../../libs/config";

import {
    sweetErrorHandling,
} from "../../../libs/sweetAlert";

import MemberService
    from "../../services/MemberService";

import {
    useGlobals,
} from "../../hooks/useGlobals";


/* =====================================================
   PROPS
===================================================== */

interface AuthenticationModalProps {
    signupOpen: boolean;

    loginOpen: boolean;

    handleSignupClose: () => void;

    handleLoginClose: () => void;

    handleSignupOpen?: () => void;

    handleLoginOpen?: () => void;
}


/* =====================================================
   COMPONENT
===================================================== */

export default function AuthenticationModal({
    signupOpen,
    loginOpen,
    handleSignupClose,
    handleLoginClose,
    handleSignupOpen,
    handleLoginOpen,
}: AuthenticationModalProps) {


    /* =================================================
       GLOBAL CONTEXT
    ================================================= */

    const {
        setAuthMember,
    } = useGlobals();


    /* =================================================
       FORM STATE
    ================================================= */

    const [
        memberNick,
        setMemberNick,
    ] = useState("");


    const [
        memberPhone,
        setMemberPhone,
    ] = useState("");


    const [
        memberPassword,
        setMemberPassword,
    ] = useState("");


    /* =================================================
       LOADING
    ================================================= */

    const [
        loading,
        setLoading,
    ] = useState(false);


    /* =================================================
       RESET FORM
    ================================================= */

    const resetForm = () => {

        setMemberNick("");

        setMemberPhone("");

        setMemberPassword("");
    };


    /* =================================================
       SIGNUP REQUEST
    ================================================= */

    const handleSignupRequest =
        async () => {

            if (loading) {
                return;
            }


            try {

                /* =============================
                   VALIDATION
                ============================== */

                const isFullFill =
                    memberNick.trim() !== "" &&
                    memberPhone.trim() !== "" &&
                    memberPassword.trim() !== "";


                if (!isFullFill) {

                    throw new Error(
                        Messages.error3,
                    );
                }


                setLoading(
                    true,
                );


                /* =============================
                   INPUT
                ============================== */

                const signupInput:
                    MemberInput = {

                    memberNick:
                        memberNick.trim(),

                    memberPhone:
                        memberPhone.trim(),

                    memberPassword:
                        memberPassword,
                };


                /* =============================
                   SERVICE
                ============================== */

                const memberService =
                    new MemberService();


                const result =
                    await memberService.signup(
                        signupInput,
                    );


                console.log(
                    "SIGNUP RESULT:",
                    result,
                );


                /* =============================
                   SUCCESS
                ============================== */

                setAuthMember(
                    result,
                );


                resetForm();


                handleSignupClose();


            } catch (err) {

                console.log(
                    "SIGNUP ERROR:",
                    err,
                );


                /*
                 * MUHIM:
                 *
                 * Avval modalni yopamiz.
                 */

                handleSignupClose();


                /*
                 * Inputlarni tozalaymiz.
                 */

                resetForm();


                /*
                 * Loadingni alertdan OLDIN
                 * to'xtatamiz.
                 */

                setLoading(
                    false,
                );


                /*
                 * Keyin backend error
                 * SweetAlertda chiqadi.
                 */

                await sweetErrorHandling(
                    err,
                );


            } finally {

                setLoading(
                    false,
                );
            }
        };


    /* =================================================
       LOGIN REQUEST
    ================================================= */

    const handleLoginRequest =
        async () => {

            if (loading) {
                return;
            }


            try {

                /* =============================
                   VALIDATION
                ============================== */

                const isFullFill =
                    memberNick.trim() !== "" &&
                    memberPassword.trim() !== "";


                if (!isFullFill) {

                    throw new Error(
                        Messages.error3,
                    );
                }


                setLoading(
                    true,
                );


                /* =============================
                   INPUT
                ============================== */

                const loginInput:
                    LoginInput = {

                    memberNick:
                        memberNick.trim(),

                    memberPassword:
                        memberPassword,
                };


                /* =============================
                   SERVICE
                ============================== */

                const memberService =
                    new MemberService();


                const result =
                    await memberService.login(
                        loginInput,
                    );


                console.log(
                    "LOGIN RESULT:",
                    result,
                );


                /* =============================
                   SUCCESS
                ============================== */

                setAuthMember(
                    result,
                );


                resetForm();


                handleLoginClose();


            } catch (err) {

                console.log(
                    "LOGIN ERROR:",
                    err,
                );


                /*
                 * 1. LOGIN WINDOW YOPILADI
                 */

                handleLoginClose();


                /*
                 * 2. INPUT CLEAR
                 */

                resetForm();


                /*
                 * 3. LOADING OFF
                 */

                setLoading(
                    false,
                );


                /*
                 * 4. HAQIQIY ERROR
                 */

                await sweetErrorHandling(
                    err,
                );


            } finally {

                setLoading(
                    false,
                );
            }
        };


    /* =================================================
       ENTER KEY
    ================================================= */

    const handlePasswordKeyDown = (
        event:
            KeyboardEvent<HTMLInputElement>,
    ) => {

        if (
            event.key !== "Enter"
        ) {
            return;
        }


        event.preventDefault();


        if (
            signupOpen
        ) {

            handleSignupRequest()
                .then();

            return;
        }


        if (
            loginOpen
        ) {

            handleLoginRequest()
                .then();
        }
    };


    /* =================================================
       CLOSE SIGNUP
    ================================================= */

    const closeSignup =
        () => {

            if (loading) {
                return;
            }


            resetForm();

            handleSignupClose();
        };


    /* =================================================
       CLOSE LOGIN
    ================================================= */

    const closeLogin =
        () => {

            if (loading) {
                return;
            }


            resetForm();

            handleLoginClose();
        };


    /* =================================================
       SWITCH LOGIN
    ================================================= */

    const switchToLogin =
        () => {

            resetForm();

            handleSignupClose();


            if (
                handleLoginOpen
            ) {

                setTimeout(
                    () =>
                        handleLoginOpen(),
                    150,
                );
            }
        };


    /* =================================================
       SWITCH SIGNUP
    ================================================= */

    const switchToSignup =
        () => {

            resetForm();

            handleLoginClose();


            if (
                handleSignupOpen
            ) {

                setTimeout(
                    () =>
                        handleSignupOpen(),
                    150,
                );
            }
        };


    /* =================================================
       RENDER
    ================================================= */

    return (

        <>

            {/* =================================================
                SIGNUP MODAL
            ================================================= */}

            <Modal
                open={
                    signupOpen
                }

                onClose={
                    closeSignup
                }

                closeAfterTransition

                slots={{
                    backdrop:
                        Backdrop,
                }}

                slotProps={{
                    backdrop: {
                        timeout:
                            300,

                        sx: {
                            backgroundColor:
                                "rgba(0, 0, 0, 0.65)",

                            backdropFilter:
                                "blur(4px)",
                        },
                    },
                }}

                sx={{
                    display:
                        "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",

                    px: 2,
                }}
            >

                <Fade
                    in={
                        signupOpen
                    }
                >

                    <Box
                        sx={{
                            position:
                                "relative",

                            display:
                                "grid",

                            gridTemplateColumns: {
                                xs:
                                    "1fr",

                                md:
                                    "1.05fr 0.95fr",
                            },

                            width:
                                "min(960px, 96vw)",

                            maxHeight:
                                "92vh",

                            overflow:
                                "auto",

                            bgcolor:
                                "#fff",

                            boxShadow:
                                "0 30px 100px rgba(0,0,0,0.25)",

                            outline:
                                "none",
                        }}
                    >

                        {/* =====================================
                            LEFT IMAGE
                        ====================================== */}

                        <AuthImageSection
                            title="Create your space."
                            text="Join Furniro and discover furniture designed for modern living."
                        />


                        {/* =====================================
                            SIGNUP FORM
                        ====================================== */}

                        <Box
                            sx={{
                                position:
                                    "relative",

                                px: {
                                    xs:
                                        3,

                                    sm:
                                        6,
                                },

                                py: {
                                    xs:
                                        5,

                                    md:
                                        7,
                                },

                                display:
                                    "flex",

                                flexDirection:
                                    "column",

                                justifyContent:
                                    "center",
                            }}
                        >

                            {/* CLOSE */}

                            <IconButton
                                onClick={
                                    closeSignup
                                }

                                disabled={
                                    loading
                                }

                                sx={{
                                    position:
                                        "absolute",

                                    top:
                                        18,

                                    right:
                                        18,

                                    width:
                                        38,

                                    height:
                                        38,

                                    border:
                                        "1px solid #e5e5e5",

                                    color:
                                        "#222",

                                    "&:hover": {
                                        bgcolor:
                                            "#f5f5f5",
                                    },
                                }}
                            >

                                <CloseIcon
                                    sx={{
                                        fontSize:
                                            19,
                                    }}
                                />

                            </IconButton>


                            {/* HEADER */}

                            <Typography
                                sx={{
                                    color:
                                        "#999",

                                    fontSize:
                                        10,

                                    fontWeight:
                                        600,

                                    letterSpacing:
                                        2.5,

                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Welcome to Furniro
                            </Typography>


                            <Typography
                                component="h1"

                                sx={{
                                    mt:
                                        1.5,

                                    color:
                                        "#1f1f1f",

                                    fontSize: {
                                        xs:
                                            30,

                                        md:
                                            38,
                                    },

                                    fontWeight:
                                        700,

                                    lineHeight:
                                        1.1,
                                }}
                            >
                                Create Account
                            </Typography>


                            <Typography
                                sx={{
                                    mt:
                                        1.5,

                                    mb:
                                        4,

                                    color:
                                        "#888",

                                    fontSize:
                                        12,

                                    lineHeight:
                                        1.8,
                                }}
                            >
                                Enter your details
                                below to create your
                                Furniro account.
                            </Typography>


                            {/* USERNAME */}

                            <AuthInput
                                label="USERNAME"

                                value={
                                    memberNick
                                }

                                onChange={
                                    setMemberNick
                                }

                                placeholder="Enter your username"
                            />


                            {/* PHONE */}

                            <AuthInput
                                label="PHONE NUMBER"

                                value={
                                    memberPhone
                                }

                                onChange={
                                    setMemberPhone
                                }

                                placeholder="Enter your phone number"
                            />


                            {/* PASSWORD */}

                            <AuthInput
                                label="PASSWORD"

                                type="password"

                                value={
                                    memberPassword
                                }

                                onChange={
                                    setMemberPassword
                                }

                                onKeyDown={
                                    handlePasswordKeyDown
                                }

                                placeholder="Create your password"
                            />


                            {/* SIGNUP BUTTON */}

                            <Button
                                fullWidth

                                disabled={
                                    loading
                                }

                                endIcon={
                                    <ArrowForwardIcon />
                                }

                                onClick={
                                    handleSignupRequest
                                }

                                sx={{
                                    mt:
                                        1.5,

                                    height:
                                        52,

                                    borderRadius:
                                        0,

                                    bgcolor:
                                        "#222",

                                    color:
                                        "#fff",

                                    fontSize:
                                        11,

                                    fontWeight:
                                        600,

                                    letterSpacing:
                                        1.5,

                                    "&:hover": {
                                        bgcolor:
                                            "#000",
                                    },

                                    "&.Mui-disabled":
                                    {
                                        bgcolor:
                                            "#888",

                                        color:
                                            "#fff",
                                    },
                                }}
                            >

                                {loading
                                    ? "CREATING ACCOUNT..."
                                    : "CREATE ACCOUNT"}

                            </Button>


                            {/* LOGIN SWITCH */}

                            <Stack
                                direction="row"

                                sx={{
                                    mt:
                                        3,

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",

                                    gap:
                                        0.6,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color:
                                            "#999",

                                        fontSize:
                                            11,
                                    }}
                                >
                                    Already have an
                                    account?
                                </Typography>


                                <Button
                                    onClick={
                                        switchToLogin
                                    }

                                    disabled={
                                        loading ||
                                        !handleLoginOpen
                                    }

                                    sx={{
                                        p:
                                            0,

                                        minWidth:
                                            "auto",

                                        color:
                                            "#222",

                                        fontSize:
                                            11,

                                        fontWeight:
                                            700,

                                        textTransform:
                                            "none",

                                        textDecoration:
                                            "underline",

                                        "&:hover":
                                        {
                                            bgcolor:
                                                "transparent",
                                        },
                                    }}
                                >
                                    Sign in
                                </Button>

                            </Stack>

                        </Box>

                    </Box>

                </Fade>

            </Modal>


            {/* =================================================
                LOGIN MODAL
            ================================================= */}

            <Modal
                open={
                    loginOpen
                }

                onClose={
                    closeLogin
                }

                closeAfterTransition

                slots={{
                    backdrop:
                        Backdrop,
                }}

                slotProps={{
                    backdrop: {
                        timeout:
                            300,

                        sx: {
                            backgroundColor:
                                "rgba(0, 0, 0, 0.65)",

                            backdropFilter:
                                "blur(4px)",
                        },
                    },
                }}

                sx={{
                    display:
                        "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",

                    px:
                        2,
                }}
            >

                <Fade
                    in={
                        loginOpen
                    }
                >

                    <Box
                        sx={{
                            position:
                                "relative",

                            display:
                                "grid",

                            gridTemplateColumns: {
                                xs:
                                    "1fr",

                                md:
                                    "1.05fr 0.95fr",
                            },

                            width:
                                "min(920px, 96vw)",

                            maxHeight:
                                "92vh",

                            overflow:
                                "auto",

                            bgcolor:
                                "#fff",

                            boxShadow:
                                "0 30px 100px rgba(0,0,0,0.25)",

                            outline:
                                "none",
                        }}
                    >

                        {/* IMAGE */}

                        <AuthImageSection
                            title="Welcome back."
                            text="Sign in and continue building a home that feels completely yours."
                        />


                        {/* LOGIN FORM */}

                        <Box
                            sx={{
                                position:
                                    "relative",

                                px: {
                                    xs:
                                        3,

                                    sm:
                                        6,
                                },

                                py: {
                                    xs:
                                        5,

                                    md:
                                        8,
                                },

                                display:
                                    "flex",

                                flexDirection:
                                    "column",

                                justifyContent:
                                    "center",
                            }}
                        >

                            {/* CLOSE */}

                            <IconButton
                                onClick={
                                    closeLogin
                                }

                                disabled={
                                    loading
                                }

                                sx={{
                                    position:
                                        "absolute",

                                    top:
                                        18,

                                    right:
                                        18,

                                    width:
                                        38,

                                    height:
                                        38,

                                    border:
                                        "1px solid #e5e5e5",

                                    color:
                                        "#222",

                                    "&:hover": {
                                        bgcolor:
                                            "#f5f5f5",
                                    },
                                }}
                            >

                                <CloseIcon
                                    sx={{
                                        fontSize:
                                            19,
                                    }}
                                />

                            </IconButton>


                            {/* HEADER */}

                            <Typography
                                sx={{
                                    color:
                                        "#999",

                                    fontSize:
                                        10,

                                    fontWeight:
                                        600,

                                    letterSpacing:
                                        2.5,

                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Furniro Account
                            </Typography>


                            <Typography
                                component="h1"

                                sx={{
                                    mt:
                                        1.5,

                                    color:
                                        "#1f1f1f",

                                    fontSize: {
                                        xs:
                                            30,

                                        md:
                                            38,
                                    },

                                    fontWeight:
                                        700,

                                    lineHeight:
                                        1.1,
                                }}
                            >
                                Sign In
                            </Typography>


                            <Typography
                                sx={{
                                    mt:
                                        1.5,

                                    mb:
                                        4,

                                    color:
                                        "#888",

                                    fontSize:
                                        12,

                                    lineHeight:
                                        1.8,
                                }}
                            >
                                Welcome back. Enter
                                your account details
                                to continue.
                            </Typography>


                            {/* USERNAME */}

                            <AuthInput
                                label="USERNAME"

                                value={
                                    memberNick
                                }

                                onChange={
                                    setMemberNick
                                }

                                placeholder="Enter your username"
                            />


                            {/* PASSWORD */}

                            <AuthInput
                                label="PASSWORD"

                                type="password"

                                value={
                                    memberPassword
                                }

                                onChange={
                                    setMemberPassword
                                }

                                onKeyDown={
                                    handlePasswordKeyDown
                                }

                                placeholder="Enter your password"
                            />


                            {/* LOGIN BUTTON */}

                            <Button
                                fullWidth

                                disabled={
                                    loading
                                }

                                endIcon={
                                    <ArrowForwardIcon />
                                }

                                onClick={
                                    handleLoginRequest
                                }

                                sx={{
                                    mt:
                                        1.5,

                                    height:
                                        52,

                                    borderRadius:
                                        0,

                                    bgcolor:
                                        "#222",

                                    color:
                                        "#fff",

                                    fontSize:
                                        11,

                                    fontWeight:
                                        600,

                                    letterSpacing:
                                        1.5,

                                    "&:hover": {
                                        bgcolor:
                                            "#000",
                                    },

                                    "&.Mui-disabled":
                                    {
                                        bgcolor:
                                            "#888",

                                        color:
                                            "#fff",
                                    },
                                }}
                            >

                                {loading
                                    ? "SIGNING IN..."
                                    : "SIGN IN"}

                            </Button>


                            {/* SIGNUP SWITCH */}

                            <Stack
                                direction="row"

                                sx={{
                                    mt:
                                        3,

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",

                                    gap:
                                        0.6,
                                }}
                            >

                                <Typography
                                    sx={{
                                        color:
                                            "#999",

                                        fontSize:
                                            11,
                                    }}
                                >
                                    Don't have an
                                    account?
                                </Typography>


                                <Button
                                    onClick={
                                        switchToSignup
                                    }

                                    disabled={
                                        loading ||
                                        !handleSignupOpen
                                    }

                                    sx={{
                                        p:
                                            0,

                                        minWidth:
                                            "auto",

                                        color:
                                            "#222",

                                        fontSize:
                                            11,

                                        fontWeight:
                                            700,

                                        textTransform:
                                            "none",

                                        textDecoration:
                                            "underline",

                                        "&:hover":
                                        {
                                            bgcolor:
                                                "transparent",
                                        },
                                    }}
                                >
                                    Create account
                                </Button>

                            </Stack>

                        </Box>

                    </Box>

                </Fade>

            </Modal>

        </>
    );
}


/* =====================================================
   AUTH INPUT
===================================================== */

interface AuthInputProps {
    label: string;

    value: string;

    placeholder?: string;

    type?: string;

    onChange:
    (
        value: string,
    ) => void;

    onKeyDown?:
    (
        event:
            KeyboardEvent<HTMLInputElement>,
    ) => void;
}


const AuthInput = ({
    label,
    value,
    placeholder = "",
    type = "text",
    onChange,
    onKeyDown,
}: AuthInputProps) => {

    return (

        <Box
            sx={{
                mb:
                    2.3,
            }}
        >

            <Typography
                sx={{
                    mb:
                        1,

                    color:
                        "#444",

                    fontSize:
                        9,

                    fontWeight:
                        700,

                    letterSpacing:
                        1.5,
                }}
            >
                {label}
            </Typography>


            <TextField
                fullWidth

                type={
                    type
                }

                value={
                    value
                }

                placeholder={
                    placeholder
                }

                onChange={(
                    event,
                ) =>
                    onChange(
                        event.target.value,
                    )
                }

                onKeyDown={
                    onKeyDown
                }

                autoComplete={
                    type === "password"
                        ? "current-password"
                        : "off"
                }

                sx={{

                    "& .MuiOutlinedInput-root":
                    {
                        height:
                            50,

                        borderRadius:
                            0,

                        bgcolor:
                            "#fafafa",

                        fontSize:
                            12,

                        "& fieldset":
                        {
                            borderColor:
                                "#e2e2e2",
                        },

                        "&:hover fieldset":
                        {
                            borderColor:
                                "#999",
                        },

                        "&.Mui-focused fieldset":
                        {
                            borderColor:
                                "#222",

                            borderWidth:
                                "1px",
                        },
                    },


                    "& input::placeholder":
                    {
                        color:
                            "#aaa",

                        opacity:
                            1,
                    },
                }}
            />

        </Box>
    );
};


/* =====================================================
   IMAGE SIDE
===================================================== */

interface AuthImageSectionProps {
    title: string;

    text: string;
}


const AuthImageSection = ({
    title,
    text,
}: AuthImageSectionProps) => {

    return (

        <Box
            sx={{
                position:
                    "relative",

                minHeight: {
                    xs:
                        210,

                    md:
                        620,
                },

                display:
                    "flex",

                alignItems:
                    "flex-end",

                overflow:
                    "hidden",

                background:
                    "#e9e7e2",
            }}
        >

            {/* IMAGE */}

            <Box
                component="img"

                src="/images/banner.png"

                alt="Furniro furniture"

                sx={{
                    position:
                        "absolute",

                    inset:
                        0,

                    width:
                        "100%",

                    height:
                        "100%",

                    objectFit:
                        "cover",
                }}
            />


            {/* DARK OVERLAY */}

            <Box
                sx={{
                    position:
                        "absolute",

                    inset:
                        0,

                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.70) 100%)",
                }}
            />


            {/* TEXT */}

            <Box
                sx={{
                    position:
                        "relative",

                    zIndex:
                        1,

                    p: {
                        xs:
                            3,

                        md:
                            5,
                    },

                    color:
                        "#fff",
                }}
            >

                <Typography
                    sx={{
                        fontSize: {
                            xs:
                                28,

                            md:
                                40,
                        },

                        fontWeight:
                            600,

                        lineHeight:
                            1.05,

                        letterSpacing:
                            -1,
                    }}
                >
                    {title}
                </Typography>


                <Typography
                    sx={{
                        mt:
                            1.5,

                        maxWidth:
                            360,

                        color:
                            "rgba(255,255,255,0.78)",

                        fontSize:
                            11,

                        lineHeight:
                            1.8,
                    }}
                >
                    {text}
                </Typography>

            </Box>

        </Box>
    );
};