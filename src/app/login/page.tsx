import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>ログインページ</h1>
      <p>アカウントにログインします</p>
      <div>
        <Link href="/register">アカウント登録はこちら</Link>
      </div>
      <div>
        <Link href="/">ホームに戻る</Link>
      </div>
    </div>
  );
}
