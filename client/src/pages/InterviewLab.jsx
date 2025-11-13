// client/src/pages/Interview.jsx
import React from "react";

export default function Interview() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Interview Lab</h1>
      <p className="text-slate-600">
        Practice technical interviews, run mock sessions, or use AI-assisted interview questions here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 border rounded">
          <h3 className="font-medium mb-2">Mock Technical Interview</h3>
          <p className="text-sm text-slate-500 mb-3">Simulate timed coding or system-design interviews.</p>
          <button onClick={() => alert("Start mock interview (implement).")} className="px-3 py-2 rounded bg-sky-600 text-white">
            Start Mock Interview
          </button>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-medium mb-2">Behavioral Practice</h3>
          <p className="text-sm text-slate-500 mb-3">Practice common HR / behavioral questions and get AI feedback.</p>
          <button onClick={() => alert("Start behavioral practice (implement).")} className="px-3 py-2 rounded border">
            Start Practice
          </button>
        </div>
      </div>
    </div>
  );
}
