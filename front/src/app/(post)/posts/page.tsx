'use client'

import React, {useEffect, useState} from "react";
import {PostContainer, PostItem} from "@/components/posts";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {StyledLink} from "@/components/layout";
import {useGetPostQuery} from "@/stores/slices/api";
import {IPost} from "@/types/User.interface";


const Posts: React.FC = () => {
    const router = useRouter();
    const {data, error, isLoading} = useGetPostQuery({});

    const edtPost = (postId: string) => {
        return () => {
            router.push(`/posts/${postId}/update`)
        }
    }

    const delPost = (postId: string, token: string) => {
        return async () => {
            // @ts-ignore
            setPosts(posts?.filter((post) => post.id !== postId))
        }
    }

    return (
        <div>

            <PostContainer>
                <h1>Посты</h1>
                <StyledLink href='/posts/create'>Создать пост</StyledLink>
                {
                    data && data.map((p: IPost) => <div className={'bg-gray-400 p-5 mx-auto my-5'} key={p.id}>
                        <h1 className={'font-bold'}>{p.title}</h1>
                        <p>{p.content}</p>
                    </div>)
                }
            </PostContainer>
        </div>
    );
};

export default Posts;