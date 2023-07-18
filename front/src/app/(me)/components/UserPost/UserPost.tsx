import cn from "classnames";
import {Button} from "@/components/ui/Button/Button";
import React, {useState} from "react";
import {UserPostProps} from "@/app/(me)/components/UserPost/UserPost.props";
import {useRouter} from "next/navigation";
import {useDelPostMutation, useUpdatePostMutation} from "@/stores/slices/api";
import {Input} from "@/components/ui/Input/Input";
import Link from "next/link";

export const UserPost = ({post, className, onDelete, ...props}: UserPostProps) => {
    const router = useRouter();
    const [updatePost, setUpdatePost] = useState<boolean>();
    const [postData, setPostData] = useState<{title:string, content: string}>({title: post.title, content: post.content});

    const [deletePostHandle, deleted] = useDelPostMutation();
    const [updateHandle, updated] = useUpdatePostMutation();
    const submitDelete = async () => {
        await deletePostHandle(post.id);
        onDelete();
    }
    const submitUpdate = async () => {
        setUpdatePost((u) => !u)
        await updateHandle({id: post.id, value:postData});
    }
    return <div {...props} className={cn(className, "bg-gray-400 space-y-5 transition-all p-5 mx-auto my-5 break-words w-[500px]")}>
            {
                updatePost ? <>
                    <Input onChange={(e) => setPostData((p) => ({ title: e.target.value, content: p.content}) )} className={'font-bold'} value={postData.title}/>
                    <Input  onChange={(e) => setPostData((p) => ({ title: p.title, content: e.target.value}))} value={postData.content}/>
                </> :<>
                    <h1 className={'font-bold'}>{postData.title}</h1>
                    <p>{postData.content}</p>
                </>
            }
        <div>
            <Link className={'bg-green-500 px-5 py-2 my-4 rounded-md'} href={'/post/' +post.id}>
                Перейти на страницу поста
            </Link>
            <div className={'flex flex-wrap'}>
                <button className={'px-5   bg-red-600 py-2 my-4'} onClick={() => submitDelete()}>
                    Удалить пост
                </button>
                {
                    updatePost ?
                        <button className={'px-5 bg-green-200 py-2 my-4'} onClick={() =>submitUpdate()}>
                            Сохранить пост
                        </button>:
                        <button className={'px-5 bg-orange-600  py-2 my-4'} onClick={() => setUpdatePost((u) => !u)}>
                            Обновить пост
                        </button>
                }
            </div>
        </div>
    </div>
}