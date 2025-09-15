import React from 'react'
import { Link } from 'react-router'
import ScoreCircle from '../components/scoreCircle';
import { usePuterStore } from '../lib/puter';
import { useEffect, useState } from 'react';


const ResumeCard = ({resume:{id,companyName,jobTitle,feedback,imagePath,resumePath}}:{resume:Resume}) => {

  const {fs} = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  const getFileName = (path: string) => {
    return path.split('/').pop() || 'Resume';
  };

  useEffect(() => {
        const loadResume = async () => {
          const blob = await fs.read(imagePath);
          if(!blob) return;
          let url = URL.createObjectURL(blob);
          setResumeUrl(url);

        };
        loadResume();
      }, [imagePath]);


  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000 no-underline">
      <div className="resume-card-header">
        <div className='flex flex-col gap-2'>
          {companyName && <h2 className="text-lg font-semibold break-words text-dark-200 mb-1">
            {companyName}
          </h2>}
          {jobTitle && <h3 className='text-lg break-words text-gray-500'>
            {jobTitle}
          </h3>}
          {!companyName && !jobTitle && <h2 className="!text-black font-bold">{getFileName(resumePath)}</h2>}
        </div>
        
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore}/>
        </div>
      </div>
      {resumeUrl && (
      <div className = "gradient-border animate-in fade-in duration-1000">
        <div className='w-full h-full'>
          <img src={resumeUrl}
           alt = "resume"
           className='w-full h-[350px] max-sm:h-[200px] object-cover object-top'
          />

        </div>

      </div>
      )}

      
    </Link>

  )
}

export default ResumeCard
