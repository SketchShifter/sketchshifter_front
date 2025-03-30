import './globals.css';
import TopBar from '@/components/topbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="ja">
      <body className="overflow-y-scroll">
        <header>
          <TopBar />
        </header>
        <main className="flex bg-gray-100 mx-auto min-h-screen">
          <ToastContainer />
            {children}
        </main>
      </body>
    </html>
  );
}
