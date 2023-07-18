import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {IPost} from "@/types/User.interface";

export interface  UserPostProps extends  DetailedHTMLProps<
ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement> {
    post: IPost,
    onDelete: () => void
}