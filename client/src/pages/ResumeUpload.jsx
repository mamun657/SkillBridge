import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [sampleText, setSampleText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a PDF resume first.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/parse-resume`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setLoading(false);

      if (!response.ok || !data.ok) {
        alert(data.error || 'Failed to parse resume.');
        return;
      }

      setSkills(data.extractedSkills || []);
      setSampleText(data.sampleText || '');
    } catch (error) {
      console.error('Resume upload error', error);
      setLoading(false);
      alert('Upload failed. Check server logs for details.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Resume Upload</h1>
      <p className="text-sm text-gray-600 mb-6">
        Upload a PDF resume and we will extract key skills for job matching.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow disabled:opacity-60"
        >
          {loading ? 'Parsing…' : 'Upload & Parse'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Extracted Skills</h2>
        {skills.length ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Upload a resume to see detected skills.</p>
        )}
      </div>

      {sampleText && (
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Sample Parsed Text</h3>
          <p className="text-sm text-gray-600 bg-slate-100 rounded-lg p-4">
            {sampleText}…
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
