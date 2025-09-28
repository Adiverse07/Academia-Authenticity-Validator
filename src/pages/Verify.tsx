import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Camera, Loader, AlertTriangle, CheckCircle } from 'lucide-react';

const Verify = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/'))) {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF or image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleVerify = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('certificate', file);

      const response = await fetch('/api/verify', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        navigate('/results', { state: { result, fileName: file.name } });
      }, 1000);

    } catch (error) {
      console.error('Upload failed:', error);
      clearInterval(progressInterval);
      setIsUploading(false);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Certificate Verification
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload your certificate for instant AI-powered verification and fraud detection
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-12">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-green-400/50 rounded-xl p-12 text-center cursor-pointer
                     hover:border-green-400 hover:bg-green-400/5 transition-all duration-300
                     bg-black/30 backdrop-blur-sm"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            
            {file ? (
              <div className="space-y-4">
                <FileText className="h-16 w-16 text-green-400 mx-auto" />
                <div className="text-white">
                  <p className="text-lg font-semibold">{file.name}</p>
                  <p className="text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto" />
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                <div className="text-gray-300">
                  <p className="text-lg font-semibold">Drop your certificate here</p>
                  <p className="text-gray-400">or click to browse files</p>
                  <p className="text-sm text-gray-500 mt-2">Supports PDF, JPG, PNG files up to 10MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-8">
            <div className="bg-black/50 rounded-lg p-6 border border-green-400/30">
              <div className="flex items-center space-x-4 mb-4">
                <Loader className="h-6 w-6 text-green-400 animate-spin" />
                <span className="text-white font-medium">Processing certificate...</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-400 mt-2">{uploadProgress}%</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleVerify}
            disabled={!file || isUploading}
            className="group px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg
                     disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed
                     hover:from-green-300 hover:to-blue-300 transition-all duration-300
                     shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:shadow-[0_0_30px_rgba(0,255,65,0.7)]
                     transform hover:scale-105 disabled:shadow-none disabled:transform-none"
          >
            <span className="flex items-center space-x-2">
              {isUploading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
              <span>{isUploading ? 'Processing...' : 'Verify Certificate'}</span>
            </span>
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: AlertTriangle,
              title: 'Fraud Detection',
              description: 'Advanced AI algorithms detect tampering, forged seals, and altered information',
              color: 'text-red-400'
            },
            {
              icon: CheckCircle,
              title: 'Instant Results',
              description: 'Get verification results in seconds with detailed confidence scores',
              color: 'text-green-400'
            },
            {
              icon: FileText,
              title: 'Detailed Reports',
              description: 'Comprehensive verification reports with security analysis',
              color: 'text-blue-400'
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-lg p-6 hover:border-green-400/50 transition-all duration-300">
                <Icon className={`h-8 w-8 ${card.color} mb-4`} />
                <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Verify;