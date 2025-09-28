import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, Shield, FileText, ArrowLeft, Download, Share2 } from 'lucide-react';

interface VerificationResult {
  isValid: boolean;
  confidence: number;
  institutionName: string;
  studentName: string;
  degree: string;
  graduationDate: string;
  issueDate: string;
  certificateId: string;
  risks: string[];
  validationChecks: {
    signatureVerified: boolean;
    sealAuthentic: boolean;
    formatValid: boolean;
    databaseMatch: boolean;
    tamperingDetected: boolean;
  };
}

const Results = () => {
  const location = useLocation();
  const { result, fileName } = location.state || {};

  // Mock result if no data passed (for direct navigation)
  const mockResult: VerificationResult = {
    isValid: true,
    confidence: 95.7,
    institutionName: "Stanford University",
    studentName: "John Doe",
    degree: "Bachelor of Science in Computer Science",
    graduationDate: "June 15, 2023",
    issueDate: "June 20, 2023",
    certificateId: "STU-2023-CS-4521",
    risks: [],
    validationChecks: {
      signatureVerified: true,
      sealAuthentic: true,
      formatValid: true,
      databaseMatch: true,
      tamperingDetected: false
    }
  };

  const verificationResult = result || mockResult;
  const documentName = fileName || "sample-certificate.pdf";

  const getStatusColor = () => {
    if (verificationResult.confidence >= 90) return 'text-green-400';
    if (verificationResult.confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = () => {
    if (verificationResult.confidence >= 90) return CheckCircle;
    return AlertTriangle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/verify"
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Verification</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-green-400/50 rounded-lg text-green-400 hover:bg-green-400/10 transition-all duration-300">
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-blue-400/50 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-all duration-300">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Status Card */}
        <div className="mb-8">
          <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <StatusIcon className={`h-12 w-12 ${getStatusColor()}`} />
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {verificationResult.isValid ? 'Certificate Verified' : 'Verification Failed'}
                  </h1>
                  <p className="text-gray-400">Document: {documentName}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-bold ${getStatusColor()}`}>
                  {verificationResult.confidence}%
                </div>
                <div className="text-gray-400">Confidence Score</div>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Confidence Level</span>
                <span>{verificationResult.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    verificationResult.confidence >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    verificationResult.confidence >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${verificationResult.confidence}%` }}
                ></div>
              </div>
            </div>

            {verificationResult.risks.length > 0 && (
              <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2">Risk Factors Detected:</h3>
                <ul className="text-red-300 space-y-1">
                  {verificationResult.risks.map((risk, index) => (
                    <li key={index}>• {risk}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certificate Details */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-green-400" />
              <span>Certificate Details</span>
            </h2>
            
            <div className="space-y-4">
              {[
                { label: 'Institution', value: verificationResult.institutionName },
                { label: 'Student Name', value: verificationResult.studentName },
                { label: 'Degree', value: verificationResult.degree },
                { label: 'Graduation Date', value: verificationResult.graduationDate },
                { label: 'Issue Date', value: verificationResult.issueDate },
                { label: 'Certificate ID', value: verificationResult.certificateId }
              ].map((detail, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">{detail.label}:</span>
                  <span className="text-white font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Checks */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-400" />
              <span>Validation Checks</span>
            </h2>
            
            <div className="space-y-4">
              {[
                { label: 'Digital Signature', key: 'signatureVerified' },
                { label: 'Official Seal', key: 'sealAuthentic' },
                { label: 'Document Format', key: 'formatValid' },
                { label: 'Database Match', key: 'databaseMatch' },
                { label: 'Tampering Detection', key: 'tamperingDetected', invert: true }
              ].map((check, index) => {
                const isValid = check.invert 
                  ? !verificationResult.validationChecks[check.key as keyof typeof verificationResult.validationChecks]
                  : verificationResult.validationChecks[check.key as keyof typeof verificationResult.validationChecks];
                
                return (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-300">{check.label}</span>
                    <div className="flex items-center space-x-2">
                      {isValid ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-green-400">Verified</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <span className="text-red-400">Failed</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          Verification completed on {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Results;