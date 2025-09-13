import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;



    return (
        <div className="w-full">
            {file ? (
                <div className="modern-file-uploaded-container">
                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-lg">
                                    <img src="/images/pdf.png" alt="pdf" className="size-8" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-lg font-bold text-gray-800 truncate mb-1">
                                    {file.name}
                                </p>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        ✓ Uploaded successfully
                                    </p>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button className="modern-remove-button-enhanced" onClick={(e) => {
                            e.stopPropagation();
                            onFileSelect?.(null);
                        }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="px-6 pb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>File ready for analysis</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full modern-upload-area">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <div className="space-y-6 cursor-pointer p-8">
                            <div className="text-center">
                                <div className="mx-auto w-20 h-20 flex items-center justify-center mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full shadow-lg">
                                    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="text-xl text-gray-700 mb-2">
                                    <span className="font-semibold text-indigo-600">
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p className="text-base text-gray-500">PDF files only (max {formatSize(maxFileSize)})</p>
                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Secure & private</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default FileUploader
