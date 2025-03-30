import './globals.css';
import TopBar from '@/components/topbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="ja">
      <body className="overflow-y-scroll">
        <header className='fixed z-997 w-screen'>
          <TopBar />
        </header>
        <main className="bg-gray-50 min-h-screen pt-18">
          <ToastContainer />
          <div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
