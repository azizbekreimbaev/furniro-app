import {
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

import "../../css/mypage.css";

interface MemberProfile {
    memberNick: string;
    memberPhone: string;
    memberAddress: string;
    memberDescription: string;
}

const MyPage = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    /*
     * Hozircha static user.
     * Keyinchalik authMember/context dan olamiz.
     */
    const [profile, setProfile] = useState<MemberProfile>({
        memberNick: "Aziz",
        memberPhone: "01075570089",
        memberAddress: "Seoul, South Korea",
        memberDescription:
            "Furniture enthusiast. I enjoy modern and minimal interior design.",
    });

    /*
     * Keyinchalik backenddan keladigan memberImage
     * shu yerga qo'yiladi.
     */
    const [profileImage, setProfileImage] = useState<string>("");

    /*
     * Backendga yuborish uchun original File.
     */
    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    /* ============================
       INPUT CHANGE
    ============================ */

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    /* ============================
       IMAGE SELECT
    ============================ */

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        /*
         * 5MB limit
         */
        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be smaller than 5MB.");
            return;
        }

        setSelectedImage(file);

        /*
         * Local preview
         */
        const imageUrl = URL.createObjectURL(file);

        setProfileImage(imageUrl);
    };

    /* ============================
       OPEN FILE INPUT
    ============================ */

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    /* ============================
       REMOVE IMAGE
    ============================ */

    const handleRemoveImage = () => {
        setProfileImage("");
        setSelectedImage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    /* ============================
       SAVE PROFILE
    ============================ */

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        /*
         * Keyinchalik backendga FormData
         * qilib yuboramiz.
         */

        const formData = new FormData();

        formData.append(
            "memberNick",
            profile.memberNick
        );

        formData.append(
            "memberPhone",
            profile.memberPhone
        );

        formData.append(
            "memberAddress",
            profile.memberAddress
        );

        formData.append(
            "memberDescription",
            profile.memberDescription
        );

        if (selectedImage) {
            formData.append(
                "memberImage",
                selectedImage
            );
        }

        console.log("PROFILE:", profile);
        console.log("IMAGE:", selectedImage);

        /*
         * Keyinchalik:
         *
         * const memberService = new MemberService();
         * const updatedMember =
         *   await memberService.updateMember(formData);
         *
         * setAuthMember(updatedMember);
         */

        setIsEditing(false);
    };

    return (
        <main className="my-page">
            {/* ============================
          PAGE HEADER
      ============================ */}

            <section className="mypage-header">
                <div className="mypage-container">
                    <span>ACCOUNT SETTINGS</span>

                    <h1>MY PROFILE</h1>

                    <p>
                        Manage your personal information and
                        account details.
                    </p>
                </div>
            </section>

            {/* ============================
          PROFILE
      ============================ */}

            <section className="mypage-content">
                <div className="mypage-container">
                    <div className="mypage-layout">
                        {/* ========================
                LEFT PROFILE CARD
            ======================== */}

                        <aside className="mypage-sidebar">
                            <div className="mypage-profile-card">
                                <div className="mypage-avatar-wrapper">
                                    <Avatar
                                        src={profileImage || undefined}
                                        alt={profile.memberNick}
                                        sx={{
                                            width: 130,
                                            height: 130,
                                            fontSize: 42,
                                            backgroundColor: "#222",
                                        }}
                                    >
                                        {profile.memberNick
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </Avatar>

                                    <button
                                        type="button"
                                        className="mypage-camera-button"
                                        onClick={handleChooseImage}
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
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                    hidden
                                />

                                <h2>
                                    {profile.memberNick}
                                </h2>

                                <span className="mypage-member-status">
                                    ACTIVE MEMBER
                                </span>

                                <p className="mypage-phone">
                                    {profile.memberPhone}
                                </p>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleChooseImage}
                                    sx={{
                                        mt: 3,
                                        height: 42,
                                        borderRadius: 0,
                                        borderColor: "#222",
                                        color: "#222",
                                        fontSize: 10,
                                        letterSpacing: 1,
                                        "&:hover": {
                                            borderColor: "#222",
                                            backgroundColor: "#222",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    CHANGE PHOTO
                                </Button>

                                {profileImage && (
                                    <button
                                        type="button"
                                        className="mypage-remove-photo"
                                        onClick={handleRemoveImage}
                                    >
                                        Remove photo
                                    </button>
                                )}

                                <div className="mypage-image-note">
                                    JPG, PNG or WEBP.
                                    <br />
                                    Maximum size 5MB.
                                </div>
                            </div>

                            {/* ACCOUNT MENU */}

                            <div className="mypage-account-menu">
                                <button
                                    type="button"
                                    className="active"
                                >
                                    Profile Information
                                </button>

                                <button type="button">
                                    My Orders
                                </button>

                                <button type="button">
                                    Saved Products
                                </button>

                                <button type="button">
                                    Account Settings
                                </button>
                            </div>
                        </aside>

                        {/* ========================
                RIGHT FORM
            ======================== */}

                        <div className="mypage-form-wrapper">
                            <div className="mypage-form-header">
                                <div>
                                    <span>
                                        PERSONAL INFORMATION
                                    </span>

                                    <h2>
                                        Profile Details
                                    </h2>

                                    <p>
                                        Update your personal information
                                        and profile details.
                                    </p>
                                </div>

                                {!isEditing && (
                                    <button
                                        type="button"
                                        className="mypage-edit-button"
                                        onClick={() =>
                                            setIsEditing(true)
                                        }
                                    >
                                        EDIT PROFILE
                                    </button>
                                )}
                            </div>

                            <form
                                className="mypage-form"
                                onSubmit={handleSubmit}
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
                                        value={profile.memberNick}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Your nickname"
                                        variant="outlined"
                                        sx={inputStyles}
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
                                        value={profile.memberPhone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Your phone number"
                                        variant="outlined"
                                        sx={inputStyles}
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
                                        value={profile.memberAddress}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Your address"
                                        variant="outlined"
                                        sx={inputStyles}
                                    />
                                </div>

                                {/* DESCRIPTION */}

                                <div className="mypage-form-group mypage-full-width">
                                    <div className="mypage-label-row">
                                        <label htmlFor="memberDescription">
                                            DESCRIPTION
                                        </label>

                                        <span>
                                            {
                                                profile.memberDescription
                                                    .length
                                            }
                                            /300
                                        </span>
                                    </div>

                                    <TextField
                                        id="memberDescription"
                                        name="memberDescription"
                                        fullWidth
                                        multiline
                                        minRows={5}
                                        value={
                                            profile.memberDescription
                                        }
                                        onChange={(event) => {
                                            if (
                                                event.target.value
                                                    .length <= 300
                                            ) {
                                                handleInputChange(event);
                                            }
                                        }}
                                        disabled={!isEditing}
                                        placeholder="Tell us something about yourself"
                                        variant="outlined"
                                        sx={inputStyles}
                                    />
                                </div>

                                {/* BUTTONS */}

                                {isEditing && (
                                    <div className="mypage-form-actions">
                                        <button
                                            type="button"
                                            className="mypage-cancel-button"
                                            onClick={() =>
                                                setIsEditing(false)
                                            }
                                        >
                                            CANCEL
                                        </button>

                                        <button
                                            type="submit"
                                            className="mypage-save-button"
                                        >
                                            SAVE CHANGES
                                        </button>
                                    </div>
                                )}
                            </form>

                            {/* ========================
                  ACCOUNT INFO
              ======================== */}

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
                                    <div>
                                        <span>
                                            ACCOUNT STATUS
                                        </span>

                                        <strong>
                                            Active
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            MEMBER TYPE
                                        </span>

                                        <strong>
                                            User
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            JOINED
                                        </span>

                                        <strong>
                                            August 2026
                                        </strong>
                                    </div>

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

/*
 * MUI TextField common styling
 */

const inputStyles = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 0,

        fontFamily: "inherit",

        "& fieldset": {
            borderColor: "#e2e2e2",
        },

        "&:hover fieldset": {
            borderColor: "#999",
        },

        "&.Mui-focused fieldset": {
            borderColor: "#222",
            borderWidth: "1px",
        },

        "&.Mui-disabled": {
            backgroundColor: "#fafafa",
        },
    },

    "& .MuiInputBase-input": {
        fontSize: "12px",
    },

    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#555",
    },
};

export default MyPage;