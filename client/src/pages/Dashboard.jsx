// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Recommendations from "../components/Recommendations";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Dashboard() {
  const { user, token } = useAuth();
  const [recommendations, setRecommendations] = useState({
    recommendedJobs: [],
    recommendedResources: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [token]);

  const fetchRecommendations = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${API_URL}/api/dashboard/recommendations`, { headers });
      setRecommendations(res.data || { recommendedJobs: [], recommendedResources: [] });
    } catch (err) {
      console.error("Fetch recommendations error:", err);
      setRecommendations({ recommendedJobs: [], recommendedResources: [] });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-slate-600">
        Loading Dashboard…
      </div>
    );
  }

  const resources =
    recommendations.recommendedResources?.length > 0
      ? recommendations.recommendedResources
      : [
          {
            _id: "r1",
            title: "Docker & Containerization",
            platform: "Docker Official",
            costType: "Free",
            price: 0,
            image: "",
            url: "/learning/r1",
          },
          {
            _id: "r2",
            title: "AWS Cloud Practitioner",
            platform: "AWS Training",
            costType: "Free",
            price: 0,
            image: "",
            url: "/learning/r2",
          },
        ];

  return (
    <main className="bg-sky-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto p-6">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Welcome back, {user?.fullName || "User"}! 👋
          </h1>
          <p className="text-slate-600">Ready to continue your learning journey?</p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl p-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow">
            <p>Courses Completed</p>
            <h2 className="text-4xl font-bold mt-2">12</h2>
          </div>

          <Card>
            <p className="text-slate-600">Current Streak</p>
            <h2 className="text-2xl font-bold mt-2">7 Days</h2>
          </Card>

          <Card>
            <p className="text-slate-600">Skill Level</p>
            <h2 className="text-2xl font-bold mt-2">
              {user?.experienceLevel || "Intermediate"}
            </h2>
          </Card>

          <Card>
            <p className="text-slate-600">Badges Earned</p>
            <h2 className="text-2xl font-bold mt-2">12</h2>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended Jobs */}
            <Card>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Recommended Jobs</h2>
                <Link to="/jobs" className="text-sm text-sky-600 hover:underline">
                  View All
                </Link>
              </div>

              <Recommendations userSkills={user?.skills || []} />
            </Card>

            {/* Recommended Learning */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recommended Learning</h2>
                <Link to="/learning" className="text-sm text-sky-600 hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {resources.map((res) => {
                  const imgSrc = res.image || "/assets/course-default.png";
                  const link = res.url || `/learning/${res._id}`;

                  return (
                    <div
                      key={res._id}
                      className="flex items-center justify-between p-3 border rounded-xl bg-white"
                    >
                      {/* Left: Image + title */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                          <div className="absolute top-1 left-1 z-10">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-semibold shadow">
                              ★
                            </span>
                          </div>

                          <img
                            src={imgSrc}
                            alt="course"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/assets/course-default.png";
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-medium text-slate-800 truncate">{res.title}</h3>
                          <p className="text-xs text-slate-500 truncate">{res.platform}</p>
                        </div>
                      </div>

                      {/* Right: Price + Button */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-semibold ${
                            res.costType === "Free" || res.price === 0
                              ? "text-emerald-600"
                              : "text-slate-800"
                          }`}
                        >
                          {res.costType === "Free" || res.price === 0
                            ? "Free"
                            : `Money starting ${res.price}`}
                        </span>

                        <Link
                          to="/resources"
                          className="px-3 py-1 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow"
                        >
                          Start Learning
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold mb-3">Skill Progress</h3>
              <ProgressBar label="JavaScript" percentage={85} />
              <ProgressBar label="React" percentage={70} />
              <ProgressBar label="Node.js" percentage={60} />
              <ProgressBar label="Python" percentage={45} />

              <Link
                to="/progress"
                className="w-full mt-3 block text-center py-2 text-sm border rounded-lg hover:bg-slate-100"
              >
                View Detailed Progress
              </Link>
            </Card>

            <Card>
              <h3 className="font-semibold mb-3">Recent Badges</h3>
              <ul className="space-y-3">
                <li>🏅 First Step — 50 pts</li>
                <li>🌟 Pathfinder Initiate — 100 pts</li>
                <li>🎯 Skill Seeker — 75 pts</li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sky-600">
                <Link to="/jobs">Browse Jobs</Link>
                <Link to="/learning">Explore Courses</Link>
                <Link to="/quiz">Career Quiz</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
