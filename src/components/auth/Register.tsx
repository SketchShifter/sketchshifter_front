'use client';

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FieldError } from "react-hook-form";

const redirectTo = "";

interface InputType {
    email: string;
    password: string;
    passwordRe: string;
    name: string;
    nickname: string;
}

const Register = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<InputType>({
        mode: 'onBlur'
    });

    useEffect(() => {
        const checkAuthSession = async () => {
            const user = await getAuthSession();
            if (user) {
                window.location.href = '/'; // ホーム画面にリロード
            }
        };

        checkAuthSession();
    }, []);

    const registerReq = async (data: InputType) => {
        try {
            if (data.password !== data.passwordRe) {
                alert("パスワードが一致しません");
                return null;
            }
            const setData = {
                email: data.email,
                password: data.password,
                name: data.name,
                nickname: data.nickname
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setData)
            });
            if (!res.ok) {
                if (res.status === 409) {
                    alert("既に登録されています。");
                    window.location.href = '/login';
                }
                throw new Error(`レスポンスステータス: ${res.status}`);
            }
            const responce = await res.json()
            const token = responce.token
            const user = responce.user
            localStorage.setItem("token", token);
            loginSuccess(user.id);
        } catch (error: any) {
            console.log(error);
            loginFailed(error);
            return error;
        }
    };

    const isValid = (data: InputType) => {
        setLoading(true);
        registerReq(data);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6">アカウント登録</h1>
                <form onSubmit={handleSubmit(isValid)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            名前
                        </label>
                        <input
                            {...register("name", { required: "名前を入力してください" })}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            type="text"
                            name="name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                            ニックネーム
                        </label>
                        <input
                            {...register("nickname", { required: "ニックネームを入力してください" })}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.nickname ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            type="text"
                            name="nickname"
                        />
                        {errors.nickname && (
                            <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            メールアドレス
                        </label>
                        <input
                            {...register("email", { required: "メールアドレスを入力してください" })}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            type="email"
                            name="email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            パスワード
                        </label>
                        <input
                            {...register("password", {
                                required: "パスワードを入力してください",
                                minLength: { value: 8, message: "8文字以上入力してください" }
                            })}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            type="password"
                            name="password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="passwordRe" className="block text-sm font-medium text-gray-700">
                            パスワード（再入力）
                        </label>
                        <input
                            {...register("passwordRe", {
                                required: "パスワードを再入力してください",
                                minLength: { value: 8, message: "8文字以上入力してください" },
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const { password } = getValues();
                                        return password === value || "パスワードが一致しません";
                                    }
                                }
                            })}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.passwordRe ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            type="password"
                            name="passwordRe"
                        />
                        {errors.passwordRe && (
                            <p className="text-red-500 text-sm mt-1">{errors.passwordRe.message}</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-4 py-2 text-white font-medium rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        >
                            {loading ? "登録中..." : "登録する"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Register };