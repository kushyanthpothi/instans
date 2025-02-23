'use client';
import { useState, useRef, useCallback } from 'react';

const Step1CompanyInfo = ({ companyName, jobTitle, onNext, setCompanyName, setJobTitle, progress }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !jobTitle) {
      alert('Please fill in all fields');
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Logo and Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co/DPQnwsPc/download-2.png" 
            alt="Instans Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-black text-orange-500">Instans</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-xs font-semibold inline-block text-orange-600 dark:text-orange-200">
              {progress}% Complete
            </span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200 dark:bg-gray-700">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500 ease-out"
            ></div>
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Company Name
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3
            focus:ring-2 focus:ring-primary/50 focus:border-transparent
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Enter company name..."
        />
      </div>

      {/* Job Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Job Title
        </label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3
            focus:ring-2 focus:ring-primary/50 focus:border-transparent
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Enter job title..."
        />
      </div>

      {/* Next Button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-lg
          transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Next Step
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  );
};

const Step2ResumeUpload = ({ companyName, jobTitle, resumeFile, jobDescription, isLoading, onStartAnalysis, onBack, setResumeFile, setJobDescription, progress }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) {
      alert('Please upload your resume and provide a job description');
      return;
    }
    // Pass all context information to onStartAnalysis
    onStartAnalysis(resumeFile, jobDescription, companyName, jobTitle);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Logo and Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <img 
            src="https://i.ibb.co/DPQnwsPc/download-2.png" 
            alt="Instans Logo" 
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-black text-orange-500">Instans</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-xs font-semibold inline-block text-orange-600 dark:text-orange-200">
              {progress}% Complete
            </span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200 dark:bg-gray-700">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500 ease-out"
            ></div>
          </div>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Upload Resume (PDF)
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-regular
              file:bg-primary file:text-white
              hover:file:bg-primary-hover"
          />
        </div>
        {resumeFile && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selected: {resumeFile.name}
          </p>
        )}
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows="4"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3
            focus:ring-2 focus:ring-primary/50 focus:border-transparent
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            resize-none h-[96px]"
          placeholder="Paste the job description here..."
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-lg
            transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading || !resumeFile || !jobDescription}
          className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-lg
            transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Start Analysis
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default function ResumeUpload({ onStartAnalysis, isLoading }) {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const fileInputRef = useRef(null);

  // Update progress calculation to be more reactive
  const calculateProgress = useCallback(() => {
    let progress = 0;
    if (companyName.trim()) progress += 25;
    if (jobTitle.trim()) progress += 25;
    if (resumeFile) progress += 25;
    if (jobDescription.trim()) progress += 25;
    return progress;
  }, [companyName, jobTitle, resumeFile, jobDescription]);

  const progress = calculateProgress();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm max-w-md w-full">
        {step === 1 ? (
          <Step1CompanyInfo
            companyName={companyName}
            jobTitle={jobTitle}
            setCompanyName={setCompanyName}
            setJobTitle={setJobTitle}
            onNext={() => setStep(2)}
            progress={progress}
          />
        ) : (
          <Step2ResumeUpload
            companyName={companyName}
            jobTitle={jobTitle}
            resumeFile={resumeFile}
            jobDescription={jobDescription}
            isLoading={isLoading}
            setResumeFile={setResumeFile}
            setJobDescription={setJobDescription}
            onStartAnalysis={onStartAnalysis}
            onBack={() => setStep(1)}
            progress={progress}
          />
        )}
      </div>
    </div>
  );
}
