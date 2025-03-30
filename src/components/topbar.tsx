'use client'

import { getAuthSession, type ReturnDataProps } from '@/lib/auth';
import { set } from 'date-fns';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

const TopBar = () => {
  const [session, setSession] = useState<ReturnDataProps>(null);
  const [humOpen, setHumOpen] = useState(false);
  useEffect(() => {
    setHumOpen(false);
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

  const handleLogout = async () => {
    setSession(null);
    localStorage.removeItem('token'); // トークンをローカルストレージから削除
  }
  const Button = ({title,props,btnprops}:{title:string,props?:any,btnprops?:any}) => {
    return(
    <button className="text-white p-2 md:p-0 border-b border-solid md:border-none" {...btnprops} onClick={() => {setHumOpen(false)}}>
        <Link {...props}>{title}</Link>
    </button>
  )}
  const Hum = ({open}:{open:boolean}) => {
    const [cn,setCN] = useState({
      top:"rotate-none translate-none",
      middle:"rotate-none",
      bottom:"rotate-none translate-none"
    })
    useEffect(()=>{
      if(open){
        setCN({
          top:"rotate-45 translate-y-[0.5rem]",
          middle:"rotate-y-90",
          bottom:"-rotate-45 translate-y-[-0.5rem]"
        })
      }else{
        setCN({
          top:"rotate-0 translate-none",
          middle:"rotate-y-0",
          bottom:"-rotate-0 translate-none"
        })
      }
      setCN
    },[open])
    return(<>
    <div className="flex flex-col w-full" onClick={() => {setHumOpen(!humOpen)}}>
      <div className={`bg-white w-8 h-1 rounded-lg my-1 transition-all duration-500 ease-in-out ${cn.top}`}></div>
      <div className={`bg-white w-8 h-1 rounded-lg mb-1 transition-all duration-500 ease-in-out ${cn.middle}`}></div>
      <div className={`bg-white w-8 h-1 rounded-lg mb-1 transition-all duration-500 ease-in-out ${cn.bottom}`}></div>
    </div>
    </>)
  }

  return (
    <div className="h-18 bg-gray-800 p-4 flex justify-between items-center w-full">
      <h1 className="text-white text-xl z-999">
        <Link href={"/"} onClick={()=>{setHumOpen(false)}}>
          <img src="/ssjs.svg" alt="SketchShifter Logo" className="h-10 w-auto" />
        </Link>
      </h1>
      <div className={`md:hidden absolute right-5 top-5 z-999`}>
        <Hum open={humOpen} />
      </div>
      {/* <div> */}
      <div className={`md:contents py-20 px-10 fixed w-screen h-screen overflow-hidden z-998 left-0 bg-gray-800 transition-all duration-500 ease-in-out ${humOpen? "top-0":"top-[-100vh]"}`}>
      <div className="flex space-x-4 flex-col md:flex-row md:flex-nowrap">
        {session ? (
          <>
            <Button title="投稿" props={{href:"/post"}} />
            <Button title="作品一覧" props={{href:"/artworks"}} />
            <Button title="マイリスト" props={{href:"/mylist"}} />
            <Button title="ゲストプレビュー" props={{href:"/preview"}} />
            <button className="text-white" onClick={() => {handleLogout();setHumOpen(false);}}>
              ログアウト
            </button>
            <p className="text-white">{`${session.nickname} さん`}</p>
          </>
        ) : (
          <>
            <Button title="投稿" props={{href:"/post"}} />
            <Button title="作品一覧" props={{href:"/artworks"}} />
            <Button title="ゲストプレビュー" props={{href:"/preview"}} />
            <Button title="ログイン" props={{href:"/login"}} />
            <Button title="アカウント登録" props={{href:"/register"}} />
            <p className="text-white">ゲスト さん</p>
          </>
        )}
      </div></div>
    </div>
  );
};

export default TopBar;

