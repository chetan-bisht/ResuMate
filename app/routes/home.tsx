import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

import ResumeCard from "../components/resumeCard";
import {usePuterStore} from "../lib/puter";
import {useEffect} from "react";
import {useNavigate, Link} from "react-router";
import {useState} from "react";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMate" },
    { name: "description", content: "ResuMate – AI-powered insights to make your resume stand out!" },
  ];
}

export default function Home() {
    const { auth , kv} = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])
      
    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);
            const resumes = (await kv.list('resume:*',true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);
        

  return <main className="modern-bg-pattern">
    <Navbar />
    <section className="main-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-fade-in"></div>
      <div className="page-heading py-20 relative z-10">
        <h1 className="font-black text-7xl tracking-wider animate-custom-pulse text-gradient drop-shadow-lg">
          Analyze Your Resume<br />
          <span className="block text-center mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in animation-delay-1000">
            Unlock Better Opportunities
          </span>
        </h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2 className="text-xl text-gray-600 animate-fade-in animation-delay-1000">
            No resumes found. Upload a resume to get started.
          </h2>
        ):(
          <h2 className="text-xl text-gray-600 animate-fade-in animation-delay-1000">
            Improve your resume with AI feedback and boost your chances of getting hired.
          </h2>
        )}
      </div>
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center animate-fade-in">
          <img src="/images/resume-scan-2.gif" className="w-32 h-32" alt="Scanning resume" />
        </div>
      )}
    </section>

    {!loadingResumes && resumes.length > 0 && (
    <div className="resumes-section animate-fade-in animation-delay-1000">
      {resumes.map((resume, index) => (
        <div key={resume.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <ResumeCard resume={resume} />
        </div>
      ))}
    </div>
    )}

    <section className="flex flex-col items-center py-16">
      <Link
        to="/upload"
        className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.4)] transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden border-2 border-white/10"
      >
        <span className="relative z-10 flex items-center justify-center gap-3 text-xl">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload New Resume
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </Link>
    </section>
  </main>
}
