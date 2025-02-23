'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Highlight } from 'prism-react-renderer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt, getInitialMessage } from './systemPrompt';
import { useTheme } from './ThemeProvider';
import ResumeUpload from './components/ResumeUpload';
import { analyzeResume } from './services/resumeService';

// Add EmptyState component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
    <p className="text-sm mb-2">Start a conversation with Instans</p>
    <p className="text-xs text-gray-400 text-center max-w-[240px] mx-auto">
      Get help with coding problems, system design, and interview prep
    </p>
  </div>
);

const VideoDisplay = ({ stream, videoRef }) => {
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 overflow-hidden group">
      <div className="w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Add ThemeToggle component
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

// Add this new component before the Home component
const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile devices
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        textArea.remove();
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="mt-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
      title={isCopied ? "Copied!" : "Copy message"}
    >
      {isCopied ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
        </svg>
      )}
    </button>
  );
};

const LandingPage = ({ onGetStarted }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="https://i.ibb.co/DPQnwsPc/download-2.png" alt="Instans Logo" className="w-8 h-8" />
              <span className="text-2xl font-black text-orange-500">Instans</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex gap-6 mr-4">
                <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">Home</a>
                <a href="/about" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">About</a>
                <a href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">Contact</a>
                <a href="/privacy" className="text-gray-700 dark:text-gray-200 hover:text-orange-500">Privacy</a>
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen 
                ? 'max-h-64 opacity-100 mt-4'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col gap-2 py-2">
              <a href="/" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Home
              </a>
              <a href="/about" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                About
              </a>
              <a href="/contact" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Contact
              </a>
              <a href="/privacy" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 reveal-text">
              AI-Powered Interview Assistant
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 reveal-text">
              Ace Your Technical Interviews
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed reveal-text-delay-1">
              Get personalized interview preparation with real-time AI feedback and screen sharing capabilities. Upload your resume and transform your interview skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal-text-delay-2">
              <button
                onClick={onGetStarted}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full overflow-hidden gradient-animate"
                style={{
                  background: 'linear-gradient(45deg, #FF6B00, #FF8533, #FF9966)',
                  backgroundSize: '200% 200%',
                }}
              >
                <span className="relative">
                  Get Started Free
                  <svg className="w-5 h-5 ml-2 -mr-1 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Everything You Need to Succeed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Screen Sharing",
                  description: "Share your screen for technical interviews and get real-time guidance during coding challenges.",
                  icon: "🖥️"
                },
                {
                  title: "AI Chat Assistant",
                  description: "Interactive chat interface with instant feedback and personalized suggestions.",
                  icon: "🤖"
                },
                {
                  title: "Resume Analysis",
                  description: "AI-powered resume analysis tailored to your target role and company.",
                  icon: "📝"
                }
              ].map((feature, index) => (
                <div key={index} className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Updated Simplified Footer */}
        <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-40 dark:opacity-20">
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-orange-200 to-orange-300 dark:from-orange-900 dark:to-orange-800 blur-3xl"></div>
            <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-l from-orange-200 to-orange-300 dark:from-orange-900 dark:to-orange-800 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            {/* Footer Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <img src="https://i.ibb.co/DPQnwsPc/download-2.png" alt="Instans Logo" className="w-10 h-10" />
                  <span className="text-3xl font-black text-orange-500">Instans</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Your AI-powered interview preparation assistant. Get personalized feedback and improve your chances of success.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  {[
                    { name: 'Home', path: '/' },  // Changed from 'home' to '/'
                    { name: 'About', path: '/about' },
                    { name: 'Contact', path: '/contact' },
                    { name: 'Privacy Policy', path: '/privacy-policy' }
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.path}
                        className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-6">Connect With Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/instans"
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/instans"
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/instans"
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Centered Copyright */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © {new Date().getFullYear()} Instans. All rights reserved. | Developed by Kushyanth Pothineni
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default function Home() {
  const [isSharing, setIsSharing] = useState(false);
  const [stream, setStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(-1);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const typingSpeed = 25; // adjusted to be more readable (was 10)
  const animationFrameRef = useRef();
  const [conversationContext, setConversationContext] = useState('');
  const [showUpload, setShowUpload] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeContext, setResumeContext] = useState({
    resumeText: '',
    jobDescription: '',
    companyName: '',
    jobTitle: '',
    isResumeUploaded: false
  });

  // Add new state for chat history near other state declarations
  const [chatHistory, setChatHistory] = useState([]);
  const [showLanding, setShowLanding] = useState(true);

  const startSharing = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      setStream(mediaStream);
      setIsSharing(true);
      
      // Handle stream end
      mediaStream.getVideoTracks()[0].onended = () => {
        setIsSharing(false);
        setStream(null);
      };
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };

  const stopSharing = () => {
    stream?.getTracks().forEach(track => track.stop());
    setIsSharing(false);
    setStream(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim()) {
        sendMessage(e);
      }
    }
  };

  const typeMessage = useCallback((text) => {
    return new Promise((resolve) => {
      let currentIndex = 0;
      setCurrentTypingText('');

      const typeChar = () => {
        if (currentIndex <= text.length) {
          setCurrentTypingText(text.slice(0, currentIndex));
          currentIndex++;
          // Add a small random delay to make it feel more natural
          const randomDelay = Math.random() * 10; // 0-10ms random variation
          animationFrameRef.current = requestAnimationFrame(() => {
            setTimeout(typeChar, typingSpeed + randomDelay);
          });
        } else {
          resolve();
        }
      };

      typeChar();
    });
  }, []);

  // Clean up animation frame on component unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Update the API configuration
  const genAI = new GoogleGenerativeAI("AIzaSyCFTixFFDthF4GYWhjsjAM6pyNgingTPg0");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    tools: [
      {
        googleSearch: {}  // Enable Google Search as a tool
      }
    ]
  });

  // Add history management helper
  const addMessageToHistory = (role, content) => {
    const newMessage = { role, content };
    setChatHistory(prev => [...prev, newMessage]);
    return newMessage;
  };

  // In the sendMessage function, update the API call
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = addMessageToHistory('user', inputMessage);
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Create chat history content
      const historyText = chatHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      // Combine system prompt with context and history
      const combinedPrompt = `
        ${systemPrompt}

        Current Context:
        Company: ${resumeContext.companyName}
        Position: ${resumeContext.jobTitle}
        
        ${resumeContext.isResumeUploaded ? `
        Additional Context:
        Resume Content: ${resumeContext.resumeText}
        Job Description: ${resumeContext.jobDescription}
        ` : ''}

        Previous conversation history:
        ${historyText}

        Remember to:
        - Consider the company (${resumeContext.companyName}) and role (${resumeContext.jobTitle}) in your answers
        - Provide relevant context about the company and position when asked
        - Use the job description details when applicable
        - Maintain professional tone while being direct

        Current user message: ${inputMessage}
      `;

      const result = await model.generateContentStream(combinedPrompt);
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setCurrentTypingIndex(messages.length + 1);
      setIsLoading(false);

      let fullResponse = '';

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        setCurrentTypingText(fullResponse);
      }

      // Handle grounding metadata
      const groundingMetadata = result.response?.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.searchEntryPoint?.renderedContent) {
        fullResponse += `\n\n${groundingMetadata.searchEntryPoint.renderedContent}`;
      }

      // Add assistant response to history
      const assistantMessage = addMessageToHistory('assistant', fullResponse);

      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = assistantMessage;
        return newMessages;
      });
      setCurrentTypingIndex(-1);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      const errorMessage = addMessageToHistory('assistant', 'Sorry, there was an error processing your request.');
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Add this new function for auto-scrolling
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add this new function for copying code
  const CodeBlock = ({ children, className }) => {
    const { theme } = useTheme();
    const [isCopied, setIsCopied] = useState(false);
    const codeRef = useRef(null);
    const language = className ? className.replace(/language-/, '') : 'javascript';
    const code = children && children.props ? children.props.children || '' : '';

    const isDarkTheme = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const copyCode = async () => {
      if (codeRef.current) {
        try {
          await navigator.clipboard.writeText(code);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    };

    return (
      <div className="relative group">
        <Highlight
          code={code}
          language={language}
          theme={{
            plain: {
              backgroundColor: isDarkTheme ? '#000000' : '#1f2937',
              color: '#e5e7eb'
            },
            styles: [
              {
                types: ['comment'],
                style: { color: '#6B7280', fontStyle: 'italic' }
              },
              {
                types: ['keyword', 'builtin'],
                style: { color: '#93C5FD' }
              },
              {
                types: ['string', 'regex'],
                style: { color: '#34D399' }
              },
              {
                types: ['number', 'boolean'],
                style: { color: '#F472B6' }
              },
              {
                types: ['function'],
                style: { color: '#60A5FA' }
              },
              {
                types: ['class-name', 'constant'],
                style: { color: '#F59E0B' }
              },
              {
                types: ['operator', 'punctuation'],
                style: { color: '#9CA3AF' }
              }
            ]
          }}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre className="p-3 rounded-md overflow-x-auto text-[13px] leading-relaxed" style={style}>
              <div ref={codeRef}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="whitespace-pre">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </div>
            </pre>
          )}
        </Highlight>
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 p-1 rounded bg-gray-700 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {isCopied ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </button>
      </div>
    );
  };

  // Add speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInputMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleStartAnalysis = async (resumeFile, jobDescription, companyName, jobTitle) => {
    setIsAnalyzing(true);
    try {
      const { extractedText } = await analyzeResume(resumeFile, jobDescription);
      
      // Store all context information
      setResumeContext({
        resumeText: extractedText,
        jobDescription: jobDescription,
        companyName: companyName,
        jobTitle: jobTitle,
        isResumeUploaded: true
      });
      
      setShowUpload(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowUpload(true);
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Show upload page next
  if (showUpload) {
    return <ResumeUpload onStartAnalysis={handleStartAnalysis} isLoading={isAnalyzing} />;
  }

  // Update the clear conversation function
  const clearConversation = () => {
    setMessages([]);
    setChatHistory([]);
    setConversationContext('');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden font-merriweather bg-white dark:bg-gray-900">
      <div className="flex-1 container mx-auto p-2 max-w-[2000px] h-screen overflow-y-auto md:overflow-hidden"> {/* Added overflow controls */}
        <div className="grid grid-cols-1 lg:grid-cols-screen gap-2 min-h-[calc(100vh-1rem)] md:h-[calc(100vh-1rem)]"> {/* Updated height handling */}
          {/* Screen Share Section - Hidden on mobile */}
          <div className="hidden md:block space-y-2 md:overflow-hidden"> {/* Added overflow handling */}
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <img 
                  src="https://i.ibb.co/DPQnwsPc/download-2.png" 
                  alt="Instans Logo" 
                  className="w-8 h-8"
                />
                <h1 className="text-2xl font-black text-orange-500">Instans</h1>
              </div>
              <div className="flex items-center gap-2">
                {isSharing && (
                  <button
                    onClick={stopSharing}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-light"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Stop
                  </button>
                )}
                <ThemeToggle />
              </div>
            </div>
            {/* Updated height and rounded corners for screen share section */}
            <div className="relative overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 min-h-[565px] h-[80vh] md:h-[calc(100vh-5rem)]"> {/* Updated height */}
              {isSharing ? (
                <VideoDisplay
                  stream={stream}
                  videoRef={videoRef}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={startSharing}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full transition-colors duration-200 flex items-center gap-2 font-light"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                    Share Screen
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Assistant Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm flex flex-col h-[calc(100vh-1rem)] max-h-[100vh] md:max-h-[calc(100vh-1rem)] overflow-hidden"> {/* Updated height and overflow */}
            {/* Chat Section */}
            <div className="flex flex-col min-h-0 flex-1">
              <div className="flex-shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Chat Assistant</h3>
                  <button
                    onClick={clearConversation}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    title="New Chat"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto messages-scrollbar">
                <div className="px-4 py-4 space-y-4 h-full">
                  {messages.length === 0 ? (
                    <EmptyState />
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start w-full'}`}>
                        <div className={`${
                          msg.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-none max-w-[80%] rounded-2xl font-regular text-[13px]' 
                            : 'text-gray-900 dark:text-white w-full font-light text-[13px]'
                        } p-3`}>
                          {msg.role === 'assistant' ? (
                            <div>
                              <div className="prose prose-slate dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-1 prose-p:text-[13px] prose-li:text-[13px] prose-p:text-gray-900 dark:prose-p:text-white prose-a:text-blue-500 dark:prose-a:text-blue-400">
                                <ReactMarkdown
                                  rehypePlugins={[rehypeRaw]}
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    pre: ({ children, className }) => (
                                      <CodeBlock className="text-[13px] leading-relaxed">
                                        {children}
                                      </CodeBlock>
                                    ),
                                    code: ({ node, inline, ...props }) => (
                                      inline 
                                        ? <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded text-[13px]" {...props} />
                                        : <code {...props} />
                                    ),
                                  }}
                                >
                                  {index === currentTypingIndex ? currentTypingText : msg.content}
                                </ReactMarkdown>
                              </div>
                              <CopyButton text={msg.content} />
                            </div>
                          ) : (
                            msg.content
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Form */}
              <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    rows="1"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-light text-[13px] resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 invisible-scrollbar"
                  />
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`${
                      isListening 
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    } p-2 rounded-lg transition-colors duration-200 flex items-center justify-center aspect-square`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-primary hover:bg-primary-hover text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center aspect-square"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
