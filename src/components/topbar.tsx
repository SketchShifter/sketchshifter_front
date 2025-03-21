import Link from 'next/link';

const TopBar = () => {
    return (
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl">
            <Link href={"/"}>SketchShifter</Link>
        </h1>
        <div className="ml-auto flex space-x-4"> {/* ボタンを右端に配置 */}
          <button className="text-white">
            投稿
          </button>
          <button className="text-white">
            <Link href={"artworks"}>作品一覧</Link>
          </button>
          <button className="text-white">
            <Link href={"mylist"}>マイリスト</Link>
          </button>
          <button className="text-white">
            <Link href={"preview"}>ゲストプレビュー</Link>
          </button>
          <button className="text-white">
            <Link href={"/login"}>ログイン</Link>
          </button>
          <button className="text-white">
            <Link href={"register"}>アカウント登録</Link>
          </button>
        </div>
      </div>
    );
  };
  
  export default TopBar;
  
