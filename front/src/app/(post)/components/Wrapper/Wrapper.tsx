import {WrapperProps} from "@/app/(post)/components/Wrapper/Wrapper.props";
import cn from "classnames";

export const WrapperPost = ({children, className}: WrapperProps) => {
    return <div className={cn(className, "flex flex-wrap")}>
        {children}
    </div>
}