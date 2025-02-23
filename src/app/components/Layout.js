import { useTheme } from '../ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      title={`Switch theme (current: ${theme})`}
    >
      {theme === 'light' && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )}
      {theme === 'dark' && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
      {theme === 'system' && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )}
    </button>
  );
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <img src="https://i.ibb.co/DPQnwsPc/download-2.png" alt="Instans Logo" className="w-8 h-8" />
              <span className="text-2xl font-black text-orange-500">Instans</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6 mr-4">
              <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">Home</a>
              <a href="/about" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">About</a>
              <a href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">Contact</a>
              <a href="/privacy" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">Privacy</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="https://i.ibb.co/DPQnwsPc/download-2.png" alt="Instans Logo" className="w-8 h-8" />
                <span className="text-2xl font-black text-orange-500">Instans</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Your AI-powered interview preparation assistant. Get personalized feedback and improve your chances of success.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-orange-500">Home</a></li>
                <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-orange-500">About</a></li>
                <li><a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-orange-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-orange-500">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-orange-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} Instans. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
