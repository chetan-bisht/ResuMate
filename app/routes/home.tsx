import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import {resumes} from "../../constants/index";
import ResumeCard from "../components/resumeCard";
import {usePuterStore} from "../lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMate" },
    { name: "description", content: "ResuMate – AI-powered insights to make your resume stand out!" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

  return <main>
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1 className="font-black text-7xl tracking-wider animate-custom-pulse">
          Analyze Your Resume<br />
          <span className="block text-center mt-2">Unlock Better Opportunities</span>
        </h1>
        <h2>
          Improve your resume with AI feedback and boost your chances of getting hired.
        </h2>

      </div>
    </section>

    {resumes.length > 0 && (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
    )}
  </main>
}
