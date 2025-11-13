import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Recommendations = ({ userSkills = [] }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!userSkills.length) {
      setRecommendations([]);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const skillQuery = encodeURIComponent(userSkills.join(','));
        const response = await fetch(
          `${API_BASE}/api/recommendations?skills=${skillQuery}`
        );
        const data = await response.json();
        if (data.ok) {
          setRecommendations(data.results || []);
        }
      } catch (error) {
        console.error('fetch recommendations error', error);
      }
    };

    fetchRecommendations();
  }, [userSkills]);

  if (!userSkills.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-600">
          Add skills to your profile to unlock explainable recommendations.
        </p>
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-600">No recommendations yet. Try uploading a resume or adding more skills.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((item) => (
        <div
          key={item.id || item.jobId}
          className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              {item.company ? (
                <p className="text-sm text-gray-500">{item.company}</p>
              ) : null}
              <p className="text-sm text-gray-600 mt-2">
                Score: <span className="font-semibold">{item.score}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{item.explainability?.reasoning}</p>
            </div>
            <button className="text-sm text-purple-600 hover:underline">
              Get Learning Plan
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {item.matchedSkills?.map((skill) => (
              <span
                key={`${item.id}-match-${skill}`}
                className="px-2 py-1 bg-green-100 text-green-700 rounded-full"
              >
                {skill}
              </span>
            ))}
            {item.missingSkills?.map((skill) => (
              <span
                key={`${item.id}-missing-${skill}`}
                className="px-2 py-1 bg-red-100 text-red-700 rounded-full"
              >
                Missing: {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
