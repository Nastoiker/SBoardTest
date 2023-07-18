'use client'

import React, {useEffect, useState} from "react";
import {PostContainer, PostItem} from "@/components/posts";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {StyledLink} from "@/components/layout";
import {useGetPostsQuery} from "@/stores/slices/api";
import {IPost} from "@/types/User.interface";
import {WrapperPost} from "@/app/(post)/components/Wrapper/Wrapper";
import {Post} from "@/app/(post)/components/Post/Post";


const Posts: React.FC = () => {
    const router = useRouter();
    const {data, error, isLoading} = useGetPostsQuery({});
    return (
        <div>

            <PostContainer>
                <h1>Посты</h1>
                <StyledLink href='/posts/create'>Создать пост</StyledLink>
                <WrapperPost>
                    {
                        data && data.map((p: IPost) => <Post key={p.id} post={p} />)
                    }
                </WrapperPost>
            </PostContainer>
        </div>
    );
};

export default Posts;