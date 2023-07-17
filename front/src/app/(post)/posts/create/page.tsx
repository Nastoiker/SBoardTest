'use client'

import React, {useEffect, useLayoutEffect, useState} from 'react';
import { useForm } from 'react-hook-form';

import {useRouter} from "next/navigation";
import {useCreatePostMutation} from "@/stores/slices/api";
import {Input} from "@/components/ui/Input/Input";
import {Button} from "@/components/ui/Button/Button";
import {Htag} from "@/components/ui/Htag/Htag";
import {useCheckAuthQuery} from "@/stores/slices/regapi";

interface FormData  {
    title: string;
    content: string;
};

const CreatePostForm = ():JSX.Element => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const router = useRouter()
    const [error, setError] = useState<boolean>();
    const [created, setCreated] = useState<boolean>();
    const user = useCheckAuthQuery({})
    useEffect(() => {
        if(!user.isLoading && !user.data) {
            router.push('/');
        }
    },[user])
    const [createPost, isLoading] = useCreatePostMutation({});


    const onSubmit = async (data: FormData) => {
        try {
            await createPost(data);
            setError(false);
            setCreated(true);
            reset();
        } catch (e) {
            if(e instanceof Error) {
                console.log(e.message);
                setError(true);
                setCreated(false);
            }
        }
        await createPost(data);
    };

    return (
        <form className={"p-5 mx-auto space-y-5 max-w-[500px]"} onSubmit={handleSubmit(onSubmit)}>
            <Htag type={'h1'}>Создание поста</Htag>
            <Input
                type="text"
                id="title"
                error={errors.title}
                placeholder="Заголовок"
                {...register('title', { required: true })}
            />
            <Input
                id="description"
                error={errors.content}
                placeholder="Описание"
                {...register('content', { required: true })}
            />

            <Button type="submit">Создать</Button>
            { error && !created && <div>
                <h1>
                    Ошибка создания
                </h1>
            </div> }
            {
                (created && !error) && <div>
                    <h1>
                        Успешно
                    </h1>
                </div>
            }
        </form>
    );
};

export default CreatePostForm;
