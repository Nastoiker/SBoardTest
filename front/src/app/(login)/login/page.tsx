"use client"

import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";

import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/Input/Input";
import {Button} from "@/components/ui/Button/Button";
import {useAuthorizationQuery} from "@/stores/slices/regapi";

interface ILogin  {
    email: string
    password: string
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<ILogin>();
    const [login, setLogin] = useState<ILogin>()
    const{ data, isLoading, error } = useAuthorizationQuery(login);
    const [errorMessage, setErrorMessage] = useState<string>();
    const onSubmit = async (formData: ILogin) => {
        try {
            setLogin(formData)
            if(localStorage.getItem('token')) {
                window.location.href='/';
            }
        } catch {
            console.log(error);
            setErrorMessage('Пользователь не найден');
        }
    }

    return (
        <div className={"mx-auto space-y-5 text-center max-w-[500px]"}>
            <h2>Вход</h2>
            <form className={"mx-auto space-y-5 "} onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="введите email" error={errors.email} {...register("email", { required:  {value: true,  message: "Заполните email"}, pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Введите  email",
                    }, })} id={"email"} />
                <Input
                    type="password"
                    placeholder="введите пароль"
                    {...register('password')}
                />
                <Button type="submit">Войти</Button>
                {errorMessage}
            </form>
        </div>
    );
};

export default LoginForm;