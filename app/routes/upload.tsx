import {type FormEvent, useState} from 'react'
import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";
import {usePuterStore} from "../lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "../lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 min-h-screen modern-bg-pattern">
            
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-20">
                    <h1 className="animate-fade-in text-white">AI-Powered Resume Analysis</h1>
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-2 mt-8">
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent"></div>
                                <h2 className="text-xl font-medium text-gray-300">{statusText}</h2>
                            </div>
                            <div className="mt-4">
                                <img src="/images/resume-scan.gif" className="w-80 h-auto rounded-2xl shadow-xl" />
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-gray-300 max-w-2xl">Get instant ATS scoring and personalized improvement suggestions for your resume</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-12 w-full max-w-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-div">
                                    <label htmlFor="company-name" className="text-sm font-semibold text-gray-300 mb-2 block">Company Name</label>
                                    <input type="text" name="company-name" placeholder="Enter company name" id="company-name" className="modern-input" />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title" className="text-sm font-semibold text-gray-300 mb-2 block">Job Title</label>
                                    <input type="text" name="job-title" placeholder="Enter job title" id="job-title" className="modern-input" />
                                </div>
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description" className="text-sm font-semibold text-gray-300 mb-2 block">Job Description</label>
                                <textarea rows={6} name="job-description" placeholder="Paste the job description here..." id="job-description" className="modern-textarea" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader" className="text-sm font-semibold text-gray-300 mb-2 block">Upload Your Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <div className="flex justify-center mt-8">
                                <button className="modern-analyze-button" type="submit">
                                    <span>
                                        <svg className="w-10 h-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Analyze Resume
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
