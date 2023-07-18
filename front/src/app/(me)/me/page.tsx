'use client';
import React, {useEffect, useLayoutEffect} from 'react';
import UserInfo from "@/components/user";
import {useRouter} from "next/navigation";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {IPost} from "@/types/User.interface";
import {WrapperPost} from "@/app/(post)/components/Wrapper/Wrapper";
import {UserPost} from "@/app/(me)/components/UserPost/UserPost";

const UserPage: React.FC = () => {

    const router = useRouter()
    const user = useCheckAuthQuery({})
    useLayoutEffect(() => {
        if(!user.isLoading && !user.data) {
            router.push('/');
        }
    },[user])

    return (
        <div>
            <h1>Пользователь</h1>
            <UserInfo {...user.data} />
            <h1>Мои посты</h1>
            <WrapperPost>
                {
                    user.data?.posts.map((p: IPost) => <UserPost onDelete={()=> user.refetch()} key={p.id} post={p} />)
                }
            </WrapperPost>

        </div>
    );
};

export default UserPage;
