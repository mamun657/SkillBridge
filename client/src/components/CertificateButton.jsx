import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const CertificateButton = ({ userId, name, courseId, courseName }) => {
  const [loading, setLoading] = useState(false);

  const handleIssue = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/issue-certificate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, courseId, courseName })
      });
      const data = await response.json();
      setLoading(false);

      if (!response.ok || !data.ok) {
        alert(data.error || 'Failed to issue certificate');
        return;
      }

      window.open(data.certificate.url, '_blank');
    } catch (error) {
      console.error('issue certificate error', error);
      setLoading(false);
      alert('Unable to issue certificate right now.');
    }
  };

  return (
    <button
      onClick={handleIssue}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow disabled:opacity-60"
    >
      {loading ? 'Issuing…' : 'Get Certificate'}
    </button>
  );
};

export default CertificateButton;
