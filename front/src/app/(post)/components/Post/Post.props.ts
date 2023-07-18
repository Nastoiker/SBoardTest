import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {IPost} from "@/types/User.interface";

export interface  PostProps extends  DetailedHTMLProps<
ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement> {
    post: IPost,
}