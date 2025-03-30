'use client'

import { getAuthSession, type ReturnDataProps } from '@/lib/auth';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TopBar = () => {
  const [session, setSession] = useState<ReturnDataProps>(null)
  console.log(session); // セッション情報をログに出力
  useEffect(() => {
    const fetchSession = async () => {
      const getSession = await getAuthSession();
      setSession(getSession);
    }
    // getSession = {
    //   id: string
    //   name: string
    //   email: string
    //   role?: string // 追加機能に使うかも？
    // }
    fetchSession()
  }, [])

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">
        <Link href={"/"}>
          <img src="/ssjs.svg" alt="SketchShifter Logo" className="h-10 w-auto" />
        </Link>
      </h1>
      <div className="ml-auto flex space-x-4">
        <button className="text-white">
          <Link href={"/post"}>投稿</Link>
        </button>
        <button className="text-white">
          <Link href={"/artworks"}>作品一覧</Link>
        </button>
        <button className="text-white">
          <Link href={"/mylist"}>マイリスト</Link>
        </button>
        <button className="text-white">
          <Link href={"/preview"}>ゲストプレビュー</Link>
        </button>
        <button className="text-white">
          <Link href={"/login"}>ログイン</Link>
        </button>
        <button className="text-white">
          <Link href={"/register"}>アカウント登録</Link>
        </button>
        <p className="text-white">{session ? `${session.nickname} さん` : "ゲスト さん"}</p> {/* ユーザ情報の取得が上手くいってないかも */}
      </div >
    </div >
  );
};

export default TopBar;

