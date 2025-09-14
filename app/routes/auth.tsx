import {usePuterStore} from "../lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Resumate | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Unique floating elements for visual interest */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-custom-pulse"></div>
                <div className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-30 animate-custom-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-full opacity-25 animate-custom-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="unique-gradient-border shadow-2xl animate-fade-in">
                <section className="flex flex-col gap-8 bg-white/95 backdrop-blur-sm rounded-3xl p-12 relative">
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
                    <div className="flex flex-col items-center gap-4 text-center relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Welcome</h1>
                        <h2 className="text-xl text-gray-600 font-medium">Login to your account</h2>
                    </div>
                    <div className="relative z-10">
                        {isLoading ? (
                            <button className="unique-auth-button animate-pulse">
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <p>Signing you in...</p>
                                </div>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="unique-auth-button hover:scale-105 transition-transform duration-300" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="unique-auth-button hover:scale-105 transition-transform duration-300" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth
