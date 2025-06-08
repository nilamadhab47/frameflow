"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormSubmission {
  _id: string;
  name: string;
  email: string;
  company?: string;
  useCase?: string;
  companySize?: string;
  message?: string;
  submittedAt: string;
  emailSent: boolean;
  emailSentAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: FormSubmission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchSubmissions = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/contact?page=${page}&limit=10`);
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setSubmissions(result.data);
        setPagination(result.pagination);
        setCurrentPage(page);
      } else {
        setError('Failed to fetch submissions');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getUseCaseLabel = (useCase: string) => {
    const labels: { [key: string]: string } = {
      surveillance: 'Smart City & Surveillance',
      autonomous: 'Autonomous Vehicle Training',
      research: 'AI/ML Research',
      security: 'Security & Monitoring',
      other: 'Other'
    };
    return labels[useCase] || useCase;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading submissions...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-red-400">Error: {error}</h1>
          <button 
            onClick={() => fetchSubmissions()} 
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Form Submissions
          </h1>
          <div className="text-slate-400">
            Total: {pagination.total} submissions
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{pagination.total}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Emails Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {submissions.filter(s => s.emailSent).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Email Failures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">
                {submissions.filter(s => !s.emailSent).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {submissions.length > 0 
                  ? Math.round((submissions.filter(s => s.emailSent).length / submissions.length) * 100)
                  : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission._id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {submission.name}
                    </h3>
                    <div className="space-y-2 text-slate-300">
                      <p><strong>Email:</strong> {submission.email}</p>
                      {submission.company && (
                        <p><strong>Company:</strong> {submission.company}</p>
                      )}
                      {submission.useCase && (
                        <p><strong>Use Case:</strong> {getUseCaseLabel(submission.useCase)}</p>
                      )}
                      {submission.companySize && (
                        <p><strong>Company Size:</strong> {submission.companySize}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2 text-slate-300">
                      <p><strong>Submitted:</strong> {formatDate(submission.submittedAt)}</p>
                      <p>
                        <strong>Email Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          submission.emailSent 
                            ? 'bg-green-600 text-green-100' 
                            : 'bg-red-600 text-red-100'
                        }`}>
                          {submission.emailSent ? 'Sent' : 'Failed'}
                        </span>
                      </p>
                      {submission.emailSentAt && (
                        <p><strong>Email Sent:</strong> {formatDate(submission.emailSentAt)}</p>
                      )}
                    </div>
                    
                    {submission.message && (
                      <div className="mt-4">
                        <strong className="text-slate-300">Message:</strong>
                        <p className="mt-1 p-3 bg-slate-700 rounded text-slate-200 text-sm">
                          {submission.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => fetchSubmissions(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-slate-300">
              Page {currentPage} of {pagination.pages}
            </span>
            
            <button
              onClick={() => fetchSubmissions(currentPage + 1)}
              disabled={currentPage === pagination.pages}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 