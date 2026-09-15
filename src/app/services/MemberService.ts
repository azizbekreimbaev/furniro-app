import axios from "axios";
import type {
    LoginInput,
    Member,
    MemberInput,
    MemberUpdateInput,
} from "../../libs/types/member";
import { serverApi } from "../../libs/config";


class MemberService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async signup(input: MemberInput): Promise<Member> {
        try {
            const url = `${this.path}/user/signup`;

            const result = await axios.post(url, input, {
                withCredentials: true,
            });

            console.log("signup:", result);

            return result.data.result ?? result.data.member ?? result.data;
        } catch (err) {
            console.log("Error. signup:", err);
            throw err;
        }
    }

    public async login(input: LoginInput): Promise<Member> {
        try {
            const url = `${this.path}/user/login`;

            const result = await axios.post(url, input, {
                withCredentials: true,
            });

            console.log("login:", result);

            return result.data.result ?? result.data.member ?? result.data;
        } catch (err) {
            console.log("Error. login:", err);
            throw err;
        }
    }

    public async logout(): Promise<void> {
        try {
            const url = `${this.path}/user/logout`;

            const result = await axios.post(url, {}, {
                withCredentials: true,
            });

            console.log("logout:", result);
        } catch (err) {
            console.log("Error. logout:", err);
            throw err;
        }
    }

    public async getUserDetail(): Promise<Member> {
        try {
            const url = `${this.path}/user/detail`;


            const response = await axios.get(url, {
                withCredentials: true,
            }
            );


            console.log(
                "GET USER DETAIL:",
                response
            );


            console.log(
                "GET USER DETAIL DATA:",
                response.data
            );




            const member: Member =
                response.data.user ??
                response.data.result?.user ??
                response.data.result ??
                response.data.member ??
                response.data;


            console.log(
                "FINAL AUTH MEMBER:",
                member
            );


            return member;


        } catch (err) {

            console.log(
                "Error. getUserDetail:",
                err
            );

            throw err;

        }

    }


    public async updateUser(
        input: MemberUpdateInput,
        image?: File,
    ): Promise<Member> {
        try {
            const formData = new FormData();

            if (input.memberNick !== undefined) {
                formData.append(
                    "memberNick",
                    input.memberNick,
                );
            }

            if (input.memberPhone !== undefined) {
                formData.append(
                    "memberPhone",
                    input.memberPhone,
                );
            }

            if (input.memberAddress !== undefined) {
                formData.append(
                    "memberAddress",
                    input.memberAddress,
                );
            }

            if (input.memberDesc !== undefined) {
                formData.append(
                    "memberDesc",
                    input.memberDesc,
                );
            }

            if (image) {
                formData.append(
                    "memberImage",
                    image,
                );
            }

            const url = `${this.path}/user/update`;

            const result = await axios.post(
                url,
                formData,
                {
                    withCredentials: true,
                },
            );

            console.log("updateUser:", result);

            return result.data.result ?? result.data.member ?? result.data;
        } catch (err) {
            console.log("Error. updateUser:", err);
            throw err;
        }
    }
}

export default MemberService;