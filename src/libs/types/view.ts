import { ViewGroup } from "../enums/view.enun";

export interface View {
    _id: string
    viewGroup: ViewGroup
    memberId: string
    viewRef: string
    createdAt: Date
    updatedAt: Date
}

export interface ViewInput {
    viewGroup: ViewGroup
    memberId: string
    viewRef: string
}