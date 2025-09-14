import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "../components/Summary";
import ATS from "../components/ATS";
import Details from "../components/Details";

export const meta = () => ([
    { title: 'Resumate | Review ' },
    { name: 'description', content: 'Resume insights at a glance' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);
            console.log('Parsed resume data:', data);
            console.log('Feedback structure:', data.feedback);
            console.log('ATS in feedback:', data.feedback?.ATS);
            console.log('toneAndStyle in feedback:', data.feedback?.toneAndStyle);
            console.log('content in feedback:', data.feedback?.content);
            console.log('structure in feedback:', data.feedback?.structure);
            console.log('skills in feedback:', data.feedback?.skills);
            console.log('overallScore in feedback:', data.feedback?.overallScore);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
            console.log('Setting feedback state:', data.feedback);
            console.log('Feedback ATS after setting:', data.feedback?.ATS);
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav relative">
                <Link to="/" className="group flex flex-row items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl hover:border-indigo-300/50 transition-all duration-300 hover:scale-[1.02] hover:bg-white relative overflow-hidden">
                    {/* Subtle background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-purple-50/50 to-pink-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="p-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-300 relative z-10">
                        <img src="/icons/back.svg" alt="back" className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-300" />
                    </div>
                    <span className="text-gray-700 text-sm font-semibold group-hover:text-indigo-700 transition-colors duration-300 relative z-10">Back to Homepage</span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine"></div>
                </Link>

                {/* Floating particles effect */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-1 -left-3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    {/* Enhanced Resume Review Header */}
                    <div className="relative mb-8 group">
                        {/* Background decorative elements */}
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-pink-200/30 to-rose-200/30 rounded-full blur-lg group-hover:scale-110 transition-transform duration-500"></div>

                        {/* Main header */}
                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center gap-4 mb-3">
                                <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl animate-pulse">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                                    Resume Review
                                </h2>
                            </div>

                            {/* Subtitle with animated underline */}
                            <div className="relative inline-block">
                                <p className="text-lg text-gray-600 font-medium">
                                    Comprehensive analysis of your resume's performance
                                </p>
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        </div>

                        {/* Floating particles */}
                        <div className="absolute top-2 right-8 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-bounce"></div>
                        <div className="absolute bottom-4 left-12 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-ping"></div>
                        <div className="absolute top-8 left-1/4 w-1 h-1 bg-pink-400 rounded-full opacity-50 animate-pulse"></div>
                    </div>

                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS?.score || 0} suggestions={feedback.ATS?.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <div className="relative">
                            <img src="/images/resume-scan-2.gif" className="w-full rounded-2xl shadow-lg" />
                            {/* Loading overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl backdrop-blur-sm"></div>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume
