import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
    _id: string
    memberType: MemberType,
    memberStatus: MemberStatus,
    memberNick: string,
    memberPhone: string,
    memberPassword: string,
    memberImage?: string,
    memberPoints: number,
    memberAddress?: string,
    memberDesc?: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface MemberInput {
    memberType?: MemberType,
    memberStatus?: MemberStatus,
    memberNick: string,
    memberPhone: string,
    memberPassword: string,
    memberImage?: string,
    memberPoints?: number,
    memberAddress?: string,
    memberDesc?: string,
}

export interface MemberUpdateInput {
    _id: string,
    memberType?: MemberType,
    memberStatus?: MemberStatus,
    memberNick?: string,
    memberPhone?: string,
    memberPassword?: string,
    memberImage?: string,
    memberPoints?: number,
    memberAddress?: string,
    memberDesc?: string,
}

export interface LoginInput {
    memberNick: string,
    memberPassword: string,
}


