
import React from "react";
import {PostProps} from "@/app/(post)/components/Post/Post.props";
import cn from "classnames";
import Link from "next/link";

export const Post = ({post, className, ...props}: PostProps) => {

    return <div {...props} className={cn(className, "bg-gray-400 transition-all space-y-2 p-5 mx-auto my-5 break-words w-[500px]")}>
        <h1 className={'font-bold'}>{post.title}</h1>
        <p>{post.content}</p>
        <div>
            <Link className={'bg-green-500 px-5 py-2 rounded-md'} href={'/post/' +post.id}>
                Перейти на страницу поста
            </Link>
        </div>
    </div>
}