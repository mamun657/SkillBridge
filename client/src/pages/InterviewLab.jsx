import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const InterviewLab = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const skills = skillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/generate-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, skills })
      });
      const data = await response.json();
      setLoading(false);

      if (!response.ok || !data.ok) {
        alert(data.error || 'Unable to generate questions right now.');
        return;
      }

      setQuestions(data.questions || []);
    } catch (error) {
      console.error('generate questions error', error);
      setLoading(false);
      alert('Failed to contact interview questions API.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Interview Practice Lab</h1>
        <p className="text-sm text-gray-600 mt-2">
          Generate quick interview questions aligned with your target role and skills.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="e.g. Frontend Developer"
          value={jobTitle}
          onChange={(event) => setJobTitle(event.target.value)}
          required
        />

        <label className="block text-sm font-medium text-gray-700">
          Skills (comma separated)
        </label>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="React, JavaScript, CSS"
          value={skillsInput}
          onChange={(event) => setSkillsInput(event.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
          disabled={loading}
        >
          {loading ? 'Generating…' : 'Generate Questions'}
        </button>
      </form>

      <div className="space-y-3">
        {questions.map((item, index) => (
          <div key={`${item.question}-${index}`} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <p className="font-semibold">Q{index + 1}: {item.question}</p>
            <p className="text-sm text-gray-600 mt-2">Hint: {item.answerHint}</p>
          </div>
        ))}

        {!questions.length && (
          <p className="text-sm text-gray-500">Questions will appear here after you generate them.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewLab;
