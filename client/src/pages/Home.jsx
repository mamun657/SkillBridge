// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import aiAnimation from "../assets/ai-lab-animation.json"; // ensure file exists

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#0B1120] text-white py-24 overflow-visible">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 20% 40%, rgba(56,189,248,0.06), transparent 25%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.03), transparent 25%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LEFT */}
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-sky-400">
                Discover Your Path
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
                Connect your skills with opportunities and unlock your career potential.
                Learn, grow, and land the right job — all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-block px-8 py-3 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold shadow-lg transition text-black"
                >
                  Get Started
                </Link>

                <Link
                  to="/jobs"
                  className="inline-block px-8 py-3 border-2 border-sky-400 hover:bg-sky-400 hover:text-black rounded-lg font-semibold transition text-sky-400"
                >
                  Explore Jobs
                </Link>
              </div>
            </div>

            {/* RIGHT - BIG LOTTIE (no box) */}
            <div className="flex justify-center lg:justify-end relative">
              {/* container allows Lottie to overflow and become larger than hero cell */}
              <div
                className="relative overflow-visible w-[360px] h-[360px] md:w-[520px] md:h-[520px] lg:w-[640px] lg:h-[640px]"
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
              >
                <Lottie
                  animationData={aiAnimation}
                  loop={true}
                  autoplay={true}
                  style={{
                    // make it larger than container so it visually "pops"
                    width: "100%",
                    height: "100%",
                    transform: "translateX(10%) translateY(-5%)",
                    // increase brightness and add subtle shadow to stand out on dark bg
                    filter: "brightness(1.25) drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
                    // preserve aspect and avoid clipping inside container
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">AI-powered job and resource recommendations based on your skills.</p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
              <p className="text-gray-100">Curated courses and resources to help you grow your skills.</p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-gray-100">Track your progress and discover new opportunities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
