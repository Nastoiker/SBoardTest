"use client"
import { useForm } from "react-hook-form"

export interface IRegister {
    lastName: string
    firstName: string

    email: string

    password: string;
    confirm_password: string;
}

import { Htag } from "@/components/ui/Htag/Htag"
import Link from 'next/link';
import {useRegistrationMutation} from "@/stores/slices/regapi";
import {useState} from "react";
import { useRouter } from "next/navigation"
import {Input} from "@/components/ui/Input/Input";
import {Button} from "@/components/ui/Button/Button";
const PageRegistration = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<IRegister>({});
    const [error, setError] = useState<boolean>(false);
    const [registrationFunc, {isLoading, data}] = useRegistrationMutation({});
    const onSubmit = async (formData: IRegister) => {
        try {
            const { confirm_password, ...dataAuth} = formData;
            await registrationFunc(dataAuth);
            setError(false);
            window.location.href = '/'
        } catch (e) {
            if(e instanceof Error) {
                console.log(e.message);
                setError(true);
            }
        }

    }
    return (
        <div className="mx-auto bg-background max-w-[500px]">
            <form
                className={"space-y-5 w-full border mx-auto p-10 my-5 rounded-2xl"}
                onSubmit={handleSubmit(onSubmit)}
            >

                <Htag type='h1'  className='text-center' >Регистрация</Htag>
                <p className="text-center">
                    Есть аккаунт?
                    <Link className="border-b-2" href='/login'>Авторизируйтесь</Link>
                </p>
                <Input placeholder={'почта'} error={errors.email} {...register("email", { required:  {value: true,  message: "Заполните email"}, pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Введите  email",
                    }, })} id={"email"} />
                <Input placeholder={'Имя'} error={errors.firstName} {...register("firstName", { required:  {value: true,  message: "Заполните имя"} })} id={"login"} />
                <Input placeholder={'Фамилия'} error={errors.lastName} {...register("lastName", { required:  {value: true,  message: "Заполните Фамилию"} })} id={"login"} />

                <Input placeholder={'пароль'} type={"password"} error={errors.password} {...register("password", { required: {value: true,  message: "Заполните пароль"} })} id={"password"} />
                <Input placeholder={'Подтвердите пароль'} error={errors.confirm_password} type={"password"} id={"passwordVerif"} {...register("confirm_password", {
                    required: {value: true,  message: "Подтвердите пароль"},
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "Пароль должен совпадать";
                        }
                    },
                })} />
                <div className={"text-center"}>
                    {" "}
                    <Button type={"submit"} className={"w-full text-center"}>
                        Регистрация
                    </Button>
                </div>
                { error && <div>
                    <h1>
                        Ошибка регистрации
                    </h1>
                </div> }
            </form>
        </div>
    )
}
export default PageRegistration
