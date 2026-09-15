import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Avatar,
    Button,
    TextField,
} from "@mui/material";

import MemberService from "../../services/MemberService";

import type {
    MemberUpdateInput,
} from "../../../libs/types/member";

import "../../css/mypage.css";
import { serverApi } from "../../../libs/config";


interface MemberProfile {
    memberNick: string;
    memberPhone: string;
    memberAddress: string;
    memberDesc: string;
}


interface MemberAccountInfo {
    memberStatus: string;
    memberType: string;
    createdAt: Date | null;
}


const EMPTY_PROFILE: MemberProfile = {
    memberNick: "",
    memberPhone: "",
    memberAddress: "",
    memberDesc: "",
};


const MyPage = () => {

    const fileInputRef =
        useRef<HTMLInputElement | null>(null);


    /* ============================
       PROFILE
    ============================ */

    const [profile, setProfile] =
        useState<MemberProfile>(
            EMPTY_PROFILE
        );


    /*
     * Backenddan kelgan original
     * ma'lumotlar.
     *
     * Qaysi field o'zgarganini
     * tekshirish uchun kerak.
     */
    const [
        originalProfile,
        setOriginalProfile,
    ] = useState<MemberProfile>(
        EMPTY_PROFILE
    );


    /* ============================
       ACCOUNT INFO
    ============================ */

    const [
        accountInfo,
        setAccountInfo,
    ] = useState<MemberAccountInfo>({
        memberStatus: "",
        memberType: "",
        createdAt: null,
    });


    /* ============================
       IMAGE
    ============================ */

    const [
        profileImage,
        setProfileImage,
    ] = useState<string>("");


    const [
        originalProfileImage,
        setOriginalProfileImage,
    ] = useState<string>("");


    const [
        selectedImage,
        setSelectedImage,
    ] = useState<File | null>(null);


    /* ============================
       EDIT / LOADING
    ============================ */

    const [
        isEditing,
        setIsEditing,
    ] = useState(false);


    const [
        isLoading,
        setIsLoading,
    ] = useState(true);


    const [
        isSaving,
        setIsSaving,
    ] = useState(false);


    /* ============================
       GET AUTH MEMBER
    ============================ */

    useEffect(() => {

        const memberService =
            new MemberService();

        const loadMember = async () => {

            try {

                setIsLoading(true);

                const member =
                    await memberService.getUserDetail();


                console.log(
                    "MY PAGE MEMBER:",
                    member
                );


                console.log(
                    "NICK:",
                    member?.memberNick
                );

                console.log(
                    "PHONE:",
                    member?.memberPhone
                );

                console.log(
                    "ADDRESS:",
                    member?.memberAddress
                );

                console.log(
                    "STATUS:",
                    member?.memberStatus
                );


                const loadedProfile: MemberProfile = {

                    memberNick:
                        member?.memberNick || "",

                    memberPhone:
                        member?.memberPhone || "",

                    memberAddress:
                        member?.memberAddress || "",

                    memberDesc:
                        member?.memberDesc || "",
                };


                console.log(
                    "LOADED PROFILE:",
                    loadedProfile
                );


                setProfile(
                    loadedProfile
                );

                setOriginalProfile(
                    loadedProfile
                );


                setAccountInfo({

                    memberStatus:
                        member?.memberStatus || "",

                    memberType:
                        member?.memberType || "",

                    createdAt:
                        member?.createdAt
                            ? new Date(member.createdAt)
                            : null,
                });


                /* ===============================
                   MEMBER IMAGE
                =============================== */

                if (member?.memberImage) {

                    const imageUrl =
                        member.memberImage.startsWith("http")
                            ? member.memberImage
                            : `${serverApi}/${member.memberImage}`;


                    console.log(
                        "PROFILE IMAGE URL:",
                        imageUrl
                    );


                    setProfileImage(
                        imageUrl
                    );

                    setOriginalProfileImage(
                        imageUrl
                    );

                } else {

                    setProfileImage("");

                    setOriginalProfileImage("");

                }


            } catch (err) {

                console.log(
                    "LOAD MEMBER ERROR:",
                    err
                );

            } finally {

                setIsLoading(false);

            }

        };


        loadMember();

    }, []);

    /* ============================
       INPUT CHANGE
    ============================ */

    const handleInputChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;


        setProfile((prev) => ({

            ...prev,

            [name]: value,

        }));

    };


    /* ============================
       IMAGE SELECT
    ============================ */

    const handleImageChange = (
        event:
            ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) return;


        /*
         * Image ekanligini tekshiramiz
         */

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select an image file."
            );

            return;
        }


        /*
         * Maximum 5MB
         */

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            alert(
                "Image must be smaller than 5MB."
            );

            return;
        }


        /*
         * Backendga yuboriladigan File
         */

        setSelectedImage(
            file
        );


        /*
         * Local preview
         */

        const imageUrl =
            URL.createObjectURL(
                file
            );


        setProfileImage(
            imageUrl
        );

    };


    /* ============================
       CHOOSE IMAGE
    ============================ */

    const handleChooseImage = () => {

        /*
         * Photo almashtirayotgan bo'lsa
         * editing ham ochiladi.
         */

        setIsEditing(true);


        fileInputRef
            .current
            ?.click();

    };


    /* ============================
       REMOVE IMAGE
    ============================ */

    const handleRemoveImage = () => {

        setProfileImage("");

        setSelectedImage(null);


        if (
            fileInputRef.current
        ) {

            fileInputRef.current.value =
                "";

        }

    };


    /* ============================
       CANCEL
    ============================ */

    const handleCancel = () => {

        /*
         * O'zgartirishlarni bekor qilib
         * backenddan kelgan eski
         * ma'lumotlarga qaytaramiz.
         */

        setProfile(
            originalProfile
        );


        setProfileImage(
            originalProfileImage
        );


        setSelectedImage(
            null
        );


        if (
            fileInputRef.current
        ) {

            fileInputRef.current.value =
                "";

        }


        setIsEditing(false);

    };


    /* ============================
       SAVE
    ============================ */

    const handleSubmit = async (
        event:
            FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();


        try {

            setIsSaving(true);


            /*
             * MUHIM:
             *
             * MemberService.updateUser()
             *
             * FormData emas,
             * MemberUpdateInput kutmoqda.
             */

            const updateInput:
                MemberUpdateInput = {};


            /*
             * ===================================
             * FAQAT O'ZGARGAN FIELDLAR
             * ===================================
             */


            /* NICK */

            if (
                profile.memberNick !==
                originalProfile.memberNick
            ) {

                updateInput.memberNick =
                    profile.memberNick;

            }


            /* PHONE */

            if (
                profile.memberPhone !==
                originalProfile.memberPhone
            ) {

                updateInput.memberPhone =
                    profile.memberPhone;

            }


            /* ADDRESS */

            if (
                profile.memberAddress !==
                originalProfile.memberAddress
            ) {

                updateInput.memberAddress =
                    profile.memberAddress;

            }


            /* DESCRIPTION */

            if (
                profile.memberDesc !==
                originalProfile.memberDesc
            ) {

                updateInput.memberDesc =
                    profile.memberDesc;

            }


            /*
             * Birorta text field
             * o'zgarganmi?
             */

            const hasTextChanges =
                Object.keys(
                    updateInput
                ).length > 0;


            /*
             * Text ham,
             * image ham o'zgarmagan
             */

            if (
                !hasTextChanges &&
                !selectedImage
            ) {

                console.log(
                    "NO CHANGES"
                );


                setIsEditing(
                    false
                );


                return;

            }


            console.log(
                "UPDATE INPUT:",
                updateInput
            );


            console.log(
                "SELECTED IMAGE:",
                selectedImage
            );


            const memberService =
                new MemberService();


            /*
             * MUHIM:
             *
             * updateUser(
             *    MemberUpdateInput,
             *    File?
             * )
             */

            const updatedMember =
                await memberService
                    .updateUser(
                        updateInput,
                        selectedImage ??
                        undefined
                    );


            console.log(
                "UPDATED MEMBER:",
                updatedMember
            );


            /* ============================
               UPDATED PROFILE
            ============================ */

            const updatedProfile:
                MemberProfile = {

                memberNick:
                    updatedMember
                        .memberNick ??
                    profile.memberNick,

                memberPhone:
                    updatedMember
                        .memberPhone ??
                    profile.memberPhone,

                memberAddress:
                    updatedMember
                        .memberAddress ??
                    profile.memberAddress,

                memberDesc:
                    updatedMember
                        .memberDesc ??
                    profile.memberDesc,
            };


            /*
             * UI update
             */

            setProfile(
                updatedProfile
            );


            /*
             * Endi shu yangi data
             * original bo'ladi
             */

            setOriginalProfile(
                updatedProfile
            );


            /* ============================
               UPDATED ACCOUNT INFO
            ============================ */

            setAccountInfo(
                (prev) => ({

                    memberStatus:
                        String(
                            updatedMember
                                .memberStatus ??
                            prev.memberStatus
                        ),

                    memberType:
                        String(
                            updatedMember
                                .memberType ??
                            prev.memberType
                        ),

                    createdAt:
                        updatedMember.createdAt
                            ? new Date(
                                updatedMember
                                    .createdAt
                            )
                            : prev.createdAt,

                })
            );


            /* ============================
               UPDATED IMAGE
            ============================ */

            if (
                updatedMember.memberImage
            ) {

                setProfileImage(
                    updatedMember
                        .memberImage
                );


                setOriginalProfileImage(
                    updatedMember
                        .memberImage
                );

            } else {

                /*
                 * Agar backend yangi image
                 * URL qaytarmagan bo'lsa
                 * hozirgi previewni saqlaymiz.
                 */

                setOriginalProfileImage(
                    profileImage
                );

            }


            setSelectedImage(
                null
            );


            setIsEditing(
                false
            );


            alert(
                "Profile updated successfully!"
            );


        } catch (err) {

            console.log(
                "UPDATE PROFILE ERROR:",
                err
            );


            alert(
                "Failed to update profile."
            );


        } finally {

            setIsSaving(
                false
            );

        }

    };


    /* ============================
       JOINED DATE
    ============================ */

    const joinedDate =
        accountInfo.createdAt
            ? accountInfo
                .createdAt
                .toLocaleDateString(
                    "en-US",
                    {
                        month:
                            "long",

                        year:
                            "numeric",
                    }
                )
            : "-";


    /* ============================
       LOADING
    ============================ */

    if (isLoading) {

        return (

            <main className="my-page">

                <section className="mypage-content">

                    <div className="mypage-container">

                        <p>
                            Loading profile...
                        </p>

                    </div>

                </section>

            </main>

        );

    }


    return (

        <main className="my-page">


            {/* ============================
                HEADER
            ============================ */}

            <section className="mypage-header">

                <div className="mypage-container">

                    <span>
                        ACCOUNT SETTINGS
                    </span>

                    <h1>
                        MY PROFILE
                    </h1>

                    <p>
                        Manage your personal
                        information and account
                        details.
                    </p>

                </div>

            </section>


            {/* ============================
                CONTENT
            ============================ */}

            <section className="mypage-content">

                <div className="mypage-container">

                    <div className="mypage-layout">


                        {/* ============================
                            LEFT CARD
                        ============================ */}

                        <aside className="mypage-sidebar">

                            <div className="mypage-profile-card">


                                {/* AVATAR */}

                                <div className="mypage-avatar-wrapper">

                                    <Avatar
                                        src={
                                            profileImage ||
                                            undefined
                                        }
                                        alt={
                                            profile
                                                .memberNick
                                        }
                                        sx={{
                                            width: 130,
                                            height: 130,
                                            fontSize: 42,

                                            backgroundColor:
                                                "#292722",

                                            color:
                                                "#fffdf8",
                                        }}
                                    >

                                        {
                                            profile
                                                .memberNick
                                                ?.charAt(0)
                                                .toUpperCase()
                                        }

                                    </Avatar>


                                    <button
                                        type="button"
                                        className="mypage-camera-button"
                                        onClick={
                                            handleChooseImage
                                        }
                                        aria-label="Change profile image"
                                    >

                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >

                                            <path
                                                d="M4 7H7L9 4H15L17 7H20C21.1 7 22 7.9 22 9V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V9C2 7.9 2.9 7 4 7Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />

                                            <circle
                                                cx="12"
                                                cy="14"
                                                r="4"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />

                                        </svg>

                                    </button>

                                </div>


                                <input
                                    ref={
                                        fileInputRef
                                    }
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={
                                        handleImageChange
                                    }
                                    hidden
                                />


                                {/* ============================
                                    AUTH MEMBER NICK
                                ============================ */}

                                <h2>

                                    {
                                        profile
                                            .memberNick
                                    }

                                </h2>


                                {/* STATUS */}

                                <span className="mypage-member-status">

                                    {
                                        accountInfo
                                            .memberStatus
                                            ? `${accountInfo.memberStatus} MEMBER`
                                            : "MEMBER"
                                    }

                                </span>


                                {/* ============================
                                    AUTH MEMBER PHONE
                                ============================ */}

                                <p className="mypage-phone">

                                    {
                                        profile
                                            .memberPhone ||
                                        "No phone number"
                                    }

                                </p>


                                {/* CHANGE PHOTO */}

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={
                                        handleChooseImage
                                    }
                                    sx={{
                                        mt: 3,

                                        height:
                                            46,

                                        borderRadius:
                                            0,

                                        borderColor:
                                            "#292722",

                                        color:
                                            "#292722",

                                        fontSize:
                                            11,

                                        fontWeight:
                                            600,

                                        letterSpacing:
                                            1,

                                        "&:hover": {

                                            borderColor:
                                                "#292722",

                                            backgroundColor:
                                                "#292722",

                                            color:
                                                "#fffdf8",
                                        },
                                    }}
                                >

                                    CHANGE PHOTO

                                </Button>


                                {
                                    profileImage &&
                                    isEditing && (

                                        <button
                                            type="button"
                                            className="mypage-remove-photo"
                                            onClick={
                                                handleRemoveImage
                                            }
                                        >

                                            Remove photo

                                        </button>

                                    )
                                }


                                <div className="mypage-image-note">

                                    JPG, PNG or WEBP.

                                    <br />

                                    Maximum size 5MB.

                                </div>

                            </div>


                            {/* ============================
                                MENU
                            ============================ */}



                        </aside>


                        {/* ============================
                            RIGHT
                        ============================ */}

                        <div className="mypage-form-wrapper">


                            {/* HEADER */}

                            <div className="mypage-form-header">

                                <div>

                                    <span>
                                        PERSONAL INFORMATION
                                    </span>

                                    <h2>
                                        Profile Details
                                    </h2>

                                    <p>
                                        Update your personal
                                        information and
                                        profile details.
                                    </p>

                                </div>


                                {!isEditing && (

                                    <button
                                        type="button"
                                        className="mypage-edit-button"
                                        onClick={() =>
                                            setIsEditing(
                                                true
                                            )
                                        }
                                    >

                                        EDIT PROFILE

                                    </button>

                                )}

                            </div>


                            {/* ============================
                                FORM
                            ============================ */}

                            <form
                                className="mypage-form"
                                onSubmit={
                                    handleSubmit
                                }
                            >


                                {/* NICKNAME */}

                                <div className="mypage-form-group">

                                    <label htmlFor="memberNick">

                                        NICKNAME

                                    </label>


                                    <TextField
                                        id="memberNick"
                                        name="memberNick"
                                        fullWidth

                                        value={
                                            profile
                                                .memberNick
                                        }

                                        onChange={
                                            handleInputChange
                                        }

                                        disabled={
                                            !isEditing
                                        }

                                        placeholder="Your nickname"

                                        variant="outlined"

                                        sx={
                                            inputStyles
                                        }
                                    />

                                </div>


                                {/* PHONE */}

                                <div className="mypage-form-group">

                                    <label htmlFor="memberPhone">

                                        PHONE NUMBER

                                    </label>


                                    <TextField
                                        id="memberPhone"
                                        name="memberPhone"
                                        fullWidth

                                        value={
                                            profile
                                                .memberPhone
                                        }

                                        onChange={
                                            handleInputChange
                                        }

                                        disabled={
                                            !isEditing
                                        }

                                        placeholder="Your phone number"

                                        variant="outlined"

                                        sx={
                                            inputStyles
                                        }
                                    />

                                </div>


                                {/* ADDRESS */}

                                <div className="mypage-form-group mypage-full-width">

                                    <label htmlFor="memberAddress">

                                        ADDRESS

                                    </label>


                                    <TextField
                                        id="memberAddress"
                                        name="memberAddress"
                                        fullWidth

                                        value={
                                            profile
                                                .memberAddress
                                        }

                                        onChange={
                                            handleInputChange
                                        }

                                        disabled={
                                            !isEditing
                                        }

                                        placeholder="Your address"

                                        variant="outlined"

                                        sx={
                                            inputStyles
                                        }
                                    />

                                </div>


                                {/* ============================
                                    DESCRIPTION

                                    Backend nomi:
                                    memberDesc
                                ============================ */}

                                <div className="mypage-form-group mypage-full-width">


                                    <div className="mypage-label-row">

                                        <label htmlFor="memberDesc">

                                            DESCRIPTION

                                        </label>


                                        <span>

                                            {
                                                profile
                                                    .memberDesc
                                                    .length
                                            }

                                            /300

                                        </span>

                                    </div>


                                    <TextField
                                        id="memberDesc"
                                        name="memberDesc"

                                        fullWidth

                                        multiline

                                        minRows={5}

                                        value={
                                            profile
                                                .memberDesc
                                        }

                                        onChange={(
                                            event
                                        ) => {

                                            if (
                                                event
                                                    .target
                                                    .value
                                                    .length
                                                <= 300
                                            ) {

                                                handleInputChange(
                                                    event
                                                );

                                            }

                                        }}

                                        disabled={
                                            !isEditing
                                        }

                                        placeholder="Tell us something about yourself"

                                        variant="outlined"

                                        sx={
                                            inputStyles
                                        }
                                    />

                                </div>


                                {/* ============================
                                    BUTTONS
                                ============================ */}

                                {isEditing && (

                                    <div className="mypage-form-actions">


                                        <button
                                            type="button"
                                            className="mypage-cancel-button"

                                            onClick={
                                                handleCancel
                                            }

                                            disabled={
                                                isSaving
                                            }
                                        >

                                            CANCEL

                                        </button>


                                        <button
                                            type="submit"
                                            className="mypage-save-button"

                                            disabled={
                                                isSaving
                                            }
                                        >

                                            {
                                                isSaving
                                                    ? "SAVING..."
                                                    : "SAVE CHANGES"
                                            }

                                        </button>

                                    </div>

                                )}

                            </form>


                            {/* ============================
                                ACCOUNT INFO
                            ============================ */}

                            <div className="mypage-account-info">


                                <div className="mypage-info-title">

                                    <span>
                                        ACCOUNT INFORMATION
                                    </span>

                                    <h3>
                                        Account Details
                                    </h3>

                                </div>


                                <div className="mypage-details-grid">


                                    {/* STATUS */}

                                    <div>

                                        <span>
                                            ACCOUNT STATUS
                                        </span>

                                        <strong>

                                            {
                                                accountInfo
                                                    .memberStatus ||
                                                "-"
                                            }

                                        </strong>

                                    </div>


                                    {/* TYPE */}

                                    <div>

                                        <span>
                                            MEMBER TYPE
                                        </span>

                                        <strong>

                                            {
                                                accountInfo
                                                    .memberType ||
                                                "-"
                                            }

                                        </strong>

                                    </div>


                                    {/* JOINED */}

                                    <div>

                                        <span>
                                            JOINED
                                        </span>

                                        <strong>

                                            {
                                                joinedDate
                                            }

                                        </strong>

                                    </div>


                                    {/* ORDERS */}

                                    <div>

                                        <span>
                                            TOTAL ORDERS
                                        </span>

                                        <strong>
                                            0
                                        </strong>

                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );

};


/* ============================
   MUI STYLES
============================ */

const inputStyles = {

    "& .MuiOutlinedInput-root": {

        borderRadius: 0,

        fontFamily: "inherit",

        color: "#292722",

        backgroundColor:
            "#fffdf8",


        "& fieldset": {

            borderColor:
                "#ded5c8",

        },


        "&:hover fieldset": {

            borderColor:
                "#b8aa96",

        },


        "&.Mui-focused fieldset": {

            borderColor:
                "#a68966",

            borderWidth:
                "1px",

        },


        "&.Mui-disabled": {

            backgroundColor:
                "#f5eee4",

        },

    },


    "& .MuiInputBase-input": {

        fontSize:
            "12px",

    },


    "& .MuiInputBase-input.Mui-disabled": {

        WebkitTextFillColor:
            "#716b62",

    },

};


export default MyPage;