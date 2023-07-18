import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";

export interface  WrapperProps extends  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement> {
    children: ReactNode,

}