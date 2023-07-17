'use client';

import React, {useEffect, useLayoutEffect} from 'react';
import UserInfo from "@/components/user";
import {useRouter} from "next/navigation";
import {useCheckAuthQuery} from "@/stores/slices/regapi";
import {IPost} from "@/types/User.interface";

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
            <h1>Посты</h1>
            <div className={'flex flex-wrap '}>
                {
                    user.data?.posts.map((p: IPost) => <div className={'bg-gray-400 p-5 mx-auto my-5 break-words w-[500px]'} key={p.id}>
                        <h1 className={'font-bold'}>{p.title}</h1>
                        <p>{p.content}</p>
                    </div>)
                }
            </div>

        </div>
    );
};

export default UserPage;
