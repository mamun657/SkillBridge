import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import Tag from '../components/Tag';
import SkillPill from '../components/SkillPill';
import CertificateButton from '../components/CertificateButton';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const createSvgDataUri = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const RESOURCE_IMAGE_MAP = {
  'Programming Hero – Complete Web Development Course': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6d5dfc"/>
          <stop offset="50%" stop-color="#7f5bff"/>
          <stop offset="100%" stop-color="#ff6fe6"/>
        </linearGradient>
        <linearGradient id="heroCard" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#dce6ff" stop-opacity="0.9"/>
        </linearGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3d2db7" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#heroGradient)"/>
      <g filter="url(#softShadow)">
        <rect x="70" y="70" width="230" height="150" rx="16" fill="url(#heroCard)"/>
        <rect x="90" y="105" width="110" height="12" rx="6" fill="#bb7bff" opacity="0.5"/>
        <rect x="90" y="130" width="170" height="12" rx="6" fill="#754bff" opacity="0.55"/>
        <rect x="90" y="155" width="140" height="12" rx="6" fill="#5f37ff" opacity="0.45"/>
      </g>
      <g filter="url(#softShadow)">
        <rect x="320" y="120" width="180" height="120" rx="14" fill="url(#heroCard)"/>
        <rect x="340" y="150" width="70" height="58" rx="10" fill="#ffe082"/>
        <path d="M365 160 L365 200" stroke="#3e2723" stroke-width="6" stroke-linecap="round"/>
        <path d="M352 173 L378 173" stroke="#3e2723" stroke-width="6" stroke-linecap="round"/>
        <circle cx="445" cy="168" r="22" fill="#00c9a7"/>
        <path d="M435 168 L445 180 L462 156" stroke="#014d40" stroke-width="6" stroke-linecap="round" fill="none"/>
        <rect x="410" y="205" width="80" height="16" rx="8" fill="#7c4dff" opacity="0.55"/>
      </g>
      <g transform="translate(120 230) rotate(-12)">
        <rect x="0" y="0" width="140" height="90" rx="18" fill="#0c1226" opacity="0.75"/>
        <rect x="18" y="22" width="90" height="10" rx="5" fill="#4ade80"/>
        <rect x="18" y="46" width="110" height="10" rx="5" fill="#60a5fa"/>
        <rect x="18" y="70" width="70" height="10" rx="5" fill="#a855f7"/>
      </g>
      <g transform="translate(360 255)">
        <rect x="80" y="50" width="110" height="44" rx="18" fill="#1d1f2f" opacity="0.75"/>
        <rect x="85" y="55" width="100" height="34" rx="17" fill="#30d091"/>
        <path d="M168 73 L178 83 L158 83 Z" fill="#ffffff"/>
      </g>
      <g transform="translate(230 70)">
        <circle cx="0" cy="0" r="36" fill="#ffcf53"/>
        <path d="M-18 6 Q0 -20 18 6" fill="#ffb300"/>
        <path d="M-12 12 L12 -12" stroke="#2d2a4a" stroke-width="6" stroke-linecap="round"/>
        <path d="M-12 -12 L12 12" stroke="#2d2a4a" stroke-width="6" stroke-linecap="round"/>
      </g>
      <g transform="translate(450 90)">
        <rect x="-30" y="-30" width="60" height="60" rx="14" fill="#66e7ff" opacity="0.9"/>
        <path d="M-12 -8 L0 16 L12 -8 Z" fill="#006d77" opacity="0.85"/>
        <rect x="-12" y="-20" width="24" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
      </g>
      <g transform="translate(495 292) scale(0.8)">
        <rect x="-60" y="-28" width="120" height="56" rx="24" fill="#ffffff" opacity="0.95"/>
        <rect x="-52" y="-20" width="104" height="40" rx="20" fill="#13263a"/>
        <rect x="-50" y="-18" width="100" height="36" rx="18" fill="#35d398"/>
        <path d="M10 -4 L30 16 L4 12 Z" fill="#ffffff"/>
      </g>
    </svg>
  `),
  'AWS Cloud Practitioner': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="awsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5b8def"/>
          <stop offset="100%" stop-color="#9060ff"/>
        </linearGradient>
      </defs>
        <rect width="600" height="360" rx="28" fill="url(#awsBg)"/>
        <g opacity="0.65">
          <circle cx="160" cy="120" r="60" fill="#ffffff"/>
          <circle cx="220" cy="150" r="45" fill="#e0f2ff"/>
          <circle cx="120" cy="150" r="30" fill="#ffffff"/>
        </g>
        <rect x="340" y="90" width="180" height="120" rx="22" fill="rgba(255,255,255,0.7)"/>
        <rect x="360" y="120" width="90" height="18" rx="9" fill="#ffb347"/>
        <rect x="360" y="150" width="140" height="14" rx="7" fill="#455a64" opacity="0.4"/>
        <rect x="360" y="174" width="110" height="14" rx="7" fill="#455a64" opacity="0.3"/>
        <path d="M170 230 Q220 280 290 230" stroke="#ffb347" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.6"/>
        <path d="M210 260 L250 300 L160 300 Z" fill="#ffb347" opacity="0.55"/>
        <rect x="420" y="246" width="120" height="42" rx="21" fill="#17222f" opacity="0.55"/>
        <rect x="426" y="252" width="108" height="30" rx="15" fill="#ffb347"/>
        <path d="M500 258 L520 276 L496 272 Z" fill="#17222f"/>
    </svg>
  `),
  'Advanced React Patterns': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="reactBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4c6fff"/>
          <stop offset="100%" stop-color="#9a6bff"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#reactBg)"/>
      <g transform="translate(180 180) scale(1.2)" stroke="#bde0ff" stroke-width="6" fill="none">
        <ellipse rx="80" ry="30"/>
        <ellipse rx="80" ry="30" transform="rotate(60)"/>
        <ellipse rx="80" ry="30" transform="rotate(120)"/>
      </g>
      <circle cx="180" cy="180" r="18" fill="#ffffff"/>
      <rect x="330" y="100" width="180" height="110" rx="20" fill="rgba(255,255,255,0.5)"/>
      <rect x="350" y="130" width="80" height="14" rx="7" fill="#4c6fff" opacity="0.6"/>
      <rect x="350" y="160" width="120" height="14" rx="7" fill="#ffffff" opacity="0.7"/>
      <rect x="350" y="190" width="90" height="14" rx="7" fill="#ffffff" opacity="0.45"/>
      <rect x="420" y="250" width="120" height="40" rx="20" fill="#1f2933" opacity="0.5"/>
      <rect x="426" y="256" width="108" height="28" rx="14" fill="#6ee7ff"/>
      <path d="M508 260 L526 278 L502 276 Z" fill="#1f2933"/>
    </svg>
  `),
  'Communication Skills Workshop': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="commBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9c98ff"/>
          <stop offset="100%" stop-color="#f0a7ff"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#commBg)"/>
      <rect x="120" y="100" width="150" height="110" rx="24" fill="#ffffff" opacity="0.75"/>
      <rect x="140" y="130" width="110" height="18" rx="9" fill="#6366f1" opacity="0.7"/>
      <circle cx="160" cy="190" r="26" fill="#f9a8d4"/>
      <circle cx="230" cy="190" r="26" fill="#6366f1"/>
      <rect x="320" y="100" width="170" height="110" rx="24" fill="#ffffff" opacity="0.65"/>
      <rect x="340" y="128" width="130" height="18" rx="9" fill="#c084fc" opacity="0.7"/>
      <circle cx="360" cy="188" r="26" fill="#38bdf8"/>
      <circle cx="430" cy="188" r="26" fill="#f97316"/>
      <rect x="220" y="246" width="180" height="44" rx="22" fill="#1f2933" opacity="0.5"/>
      <rect x="226" y="252" width="168" height="32" rx="16" fill="#22d3ee"/>
      <path d="M360 260 L380 280 L352 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'Complete React Developer Course': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="reactCourseBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5b21b6"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#reactCourseBg)"/>
      <g transform="translate(170 180) scale(1.1)" stroke="#ffffff" stroke-width="6" fill="none">
        <ellipse rx="70" ry="28"/>
        <ellipse rx="70" ry="28" transform="rotate(60)"/>
        <ellipse rx="70" ry="28" transform="rotate(120)"/>
      </g>
      <circle cx="170" cy="180" r="15" fill="#ffffff"/>
      <rect x="320" y="90" width="190" height="120" rx="22" fill="rgba(255,255,255,0.55)"/>
      <rect x="340" y="120" width="110" height="18" rx="9" fill="#38bdf8"/>
      <rect x="340" y="150" width="140" height="14" rx="7" fill="#0ea5e9" opacity="0.65"/>
      <rect x="340" y="176" width="120" height="14" rx="7" fill="#ffffff" opacity="0.5"/>
      <rect x="400" y="248" width="140" height="48" rx="24" fill="#111827" opacity="0.5"/>
      <rect x="406" y="254" width="128" height="36" rx="18" fill="#06b6d4"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#0b1120"/>
    </svg>
  `),
  'Digital Marketing Essentials': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="marketingBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399"/>
          <stop offset="100%" stop-color="#0ea5e9"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#marketingBg)"/>
      <rect x="120" y="110" width="180" height="120" rx="24" fill="rgba(255,255,255,0.7)"/>
      <path d="M150 150 L210 122 L210 198 L150 170 Z" fill="#f97316"/>
      <circle cx="190" cy="196" r="26" fill="#6366f1"/>
      <rect x="340" y="90" width="180" height="120" rx="24" fill="rgba(255,255,255,0.55)"/>
      <rect x="360" y="120" width="120" height="16" rx="8" fill="#0f172a" opacity="0.4"/>
      <rect x="360" y="150" width="140" height="16" rx="8" fill="#f1f5f9" opacity="0.7"/>
      <path d="M360 190 Q420 230 480 190" stroke="#facc15" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.5"/>
      <rect x="420" y="248" width="120" height="44" rx="22" fill="#0f172a" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="32" rx="16" fill="#22d3ee"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'Docker & Containerization': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="dockerBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#dockerBg)"/>
      <g transform="translate(170 200)">
        <rect x="-60" y="-40" width="120" height="80" rx="12" fill="#1e3a8a"/>
        <rect x="-40" y="-60" width="80" height="40" rx="10" fill="#1d4ed8"/>
        <rect x="10" y="-20" width="100" height="50" rx="12" fill="#1d4ed8"/>
        <rect x="122" y="-20" width="40" height="50" rx="12" fill="#7dd3fc"/>
        <circle cx="120" cy="-54" r="18" fill="#facc15"/>
      </g>
      <path d="M120 250 Q220 300 320 250" stroke="#f1f5f9" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.4"/>
      <rect x="340" y="100" width="170" height="120" rx="22" fill="rgba(255,255,255,0.55)"/>
      <rect x="360" y="130" width="120" height="16" rx="8" fill="#0f172a" opacity="0.3"/>
      <rect x="360" y="160" width="140" height="16" rx="8" fill="#e0f2fe" opacity="0.6"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.4"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#22d3ee"/>
      <path d="M502 258 L520 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `),
  'Express.js API Development': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="expressBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3730a3"/>
          <stop offset="100%" stop-color="#0ea5e9"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#expressBg)"/>
      <rect x="120" y="110" width="180" height="110" rx="20" fill="rgba(255,255,255,0.65)"/>
      <rect x="140" y="140" width="120" height="16" rx="8" fill="#f5f5f5" opacity="0.8"/>
      <rect x="140" y="168" width="140" height="16" rx="8" fill="#c7d2fe" opacity="0.7"/>
      <path d="M150 210 Q210 260 270 210" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" fill="none"/>
      <rect x="340" y="90" width="180" height="120" rx="20" fill="rgba(15,23,42,0.45)"/>
      <rect x="360" y="120" width="120" height="18" rx="9" fill="#22d3ee"/>
      <rect x="360" y="150" width="140" height="14" rx="7" fill="#0ea5e9" opacity="0.6"/>
      <rect x="360" y="176" width="100" height="14" rx="7" fill="#e0f2fe" opacity="0.5"/>
      <rect x="420" y="248" width="120" height="44" rx="22" fill="#0f172a" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="32" rx="16" fill="#38bdf8"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'Full Stack Web Development Bootcamp': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="odinBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#14b8a6"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#odinBg)"/>
      <rect x="120" y="100" width="170" height="120" rx="22" fill="rgba(255,255,255,0.6)"/>
      <rect x="138" y="130" width="134" height="18" rx="9" fill="#0ea5e9" opacity="0.6"/>
      <rect x="138" y="160" width="150" height="14" rx="7" fill="#2dd4bf" opacity="0.6"/>
      <rect x="138" y="186" width="120" height="14" rx="7" fill="#111827" opacity="0.45"/>
      <rect x="340" y="90" width="180" height="120" rx="24" fill="rgba(255,255,255,0.55)"/>
      <path d="M360 140 L420 110 L420 200 L360 170 Z" fill="#1f2937" opacity="0.6"/>
      <rect x="360" y="200" width="120" height="14" rx="7" fill="#22d3ee" opacity="0.8"/>
      <rect x="400" y="250" width="140" height="46" rx="23" fill="#0f172a" opacity="0.45"/>
      <rect x="406" y="256" width="128" height="34" rx="17" fill="#10b981"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'Git & Version Control': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="gitBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fb7185"/>
          <stop offset="100%" stop-color="#f97316"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#gitBg)"/>
      <path d="M150 120 L240 210" stroke="#111827" stroke-width="12" stroke-linecap="round" opacity="0.45"/>
      <circle cx="150" cy="120" r="24" fill="#fef3c7"/>
      <circle cx="240" cy="210" r="24" fill="#fef3c7"/>
      <circle cx="190" cy="168" r="20" fill="#ea580c"/>
      <rect x="320" y="100" width="180" height="120" rx="24" fill="rgba(255,255,255,0.55)"/>
      <rect x="340" y="130" width="120" height="16" rx="8" fill="#f97316"/>
      <rect x="340" y="158" width="140" height="16" rx="8" fill="#0f172a" opacity="0.4"/>
      <rect x="340" y="186" width="100" height="16" rx="8" fill="#fef3c7" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="44" rx="22" fill="#111827" opacity="0.5"/>
      <rect x="426" y="254" width="108" height="32" rx="16" fill="#f97316"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#111827"/>
    </svg>
  `),
  'GraphQL API Development': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="graphqlBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f472b6"/>
          <stop offset="100%" stop-color="#8b5cf6"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#graphqlBg)"/>
      <polygon points="180,90 260,140 260,220 180,270 100,220 100,140" fill="rgba(255,255,255,0.5)" stroke="#ffffff" stroke-width="6"/>
      <circle cx="180" cy="90" r="12" fill="#ffffff"/>
      <circle cx="260" cy="140" r="12" fill="#ffffff"/>
      <circle cx="260" cy="220" r="12" fill="#ffffff"/>
      <circle cx="180" cy="270" r="12" fill="#ffffff"/>
      <circle cx="100" cy="220" r="12" fill="#ffffff"/>
      <circle cx="100" cy="140" r="12" fill="#ffffff"/>
      <rect x="340" y="100" width="180" height="120" rx="22" fill="rgba(255,255,255,0.45)"/>
      <rect x="360" y="130" width="120" height="16" rx="8" fill="#ffffff" opacity="0.6"/>
      <rect x="360" y="158" width="140" height="16" rx="8" fill="#ede9fe" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#d946ef"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `),
  'HTML & CSS Basics': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="htmlBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#93c5fd"/>
          <stop offset="100%" stop-color="#f9a8d4"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#htmlBg)"/>
      <rect x="140" y="110" width="160" height="120" rx="22" fill="#ffffff" opacity="0.8"/>
      <rect x="160" y="132" width="120" height="16" rx="8" fill="#60a5fa" opacity="0.6"/>
      <rect x="160" y="160" width="140" height="16" rx="8" fill="#f9a8d4" opacity="0.6"/>
      <rect x="160" y="188" width="100" height="16" rx="8" fill="#111827" opacity="0.4"/>
      <rect x="360" y="90" width="180" height="120" rx="22" fill="rgba(255,255,255,0.6)"/>
      <rect x="380" y="120" width="120" height="14" rx="7" fill="#f97316" opacity="0.7"/>
      <rect x="380" y="146" width="140" height="14" rx="7" fill="#0f172a" opacity="0.4"/>
      <rect x="380" y="172" width="110" height="14" rx="7" fill="#0ea5e9" opacity="0.6"/>
      <rect x="260" y="246" width="180" height="44" rx="22" fill="#0f172a" opacity="0.45"/>
      <rect x="266" y="252" width="168" height="32" rx="16" fill="#60a5fa"/>
      <path d="M400 260 L420 280 L392 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'JavaScript: The Complete Guide': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="jsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbbf24"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#jsBg)"/>
      <rect x="130" y="110" width="200" height="120" rx="24" fill="#111827" opacity="0.6"/>
      <text x="190" y="180" fill="#fbbf24" font-family="Arial" font-size="60" font-weight="bold">JS</text>
      <rect x="360" y="90" width="180" height="120" rx="22" fill="rgba(255,255,255,0.55)"/>
      <rect x="380" y="120" width="120" height="16" rx="8" fill="#f59e0b"/>
      <rect x="380" y="150" width="140" height="16" rx="8" fill="#1f2933" opacity="0.5"/>
      <rect x="380" y="178" width="110" height="16" rx="8" fill="#fbbf24" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="44" rx="22" fill="#1f2937" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="32" rx="16" fill="#fbbf24"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#1f2937"/>
    </svg>
  `),
  'MongoDB University': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="mongoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#mongoBg)"/>
      <path d="M180 120 Q200 220 180 260 Q140 200 180 120" fill="#bbf7d0" stroke="#047857" stroke-width="6" opacity="0.85"/>
      <rect x="340" y="90" width="180" height="120" rx="24" fill="rgba(255,255,255,0.55)"/>
      <rect x="360" y="120" width="120" height="16" rx="8" fill="#0f172a" opacity="0.45"/>
      <rect x="360" y="150" width="140" height="16" rx="8" fill="#10b981" opacity="0.7"/>
      <rect x="360" y="178" width="110" height="16" rx="8" fill="#bbf7d0" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#10b981"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `),
  'Node.js Masterclass': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="nodeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#nodeBg)"/>
      <polygon points="160,110 240,150 240,230 160,270 80,230 80,150" fill="#111827" opacity="0.4" stroke="#10b981" stroke-width="6"/>
      <text x="150" y="200" fill="#34d399" font-family="Arial" font-size="36" font-weight="bold">node</text>
      <rect x="340" y="90" width="180" height="120" rx="24" fill="rgba(255,255,255,0.5)"/>
      <rect x="360" y="120" width="120" height="16" rx="8" fill="#38bdf8" opacity="0.7"/>
      <rect x="360" y="150" width="140" height="16" rx="8" fill="#10b981" opacity="0.7"/>
      <rect x="360" y="178" width="110" height="16" rx="8" fill="#0f172a" opacity="0.5"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.4"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#34d399"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `),
  'Python for Data Science': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="pythonBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#60a5fa"/>
          <stop offset="100%" stop-color="#facc15"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#pythonBg)"/>
      <rect x="120" y="110" width="180" height="120" rx="22" fill="rgba(255,255,255,0.6)"/>
      <path d="M150 140 H240 C260 140 260 170 240 170 H180 C160 170 160 200 180 200 H240" stroke="#1f2937" stroke-width="12" fill="none" stroke-linecap="round"/>
      <circle cx="200" cy="148" r="8" fill="#1f2937"/>
      <rect x="340" y="100" width="180" height="120" rx="22" fill="rgba(15,23,42,0.45)"/>
      <rect x="360" y="130" width="140" height="16" rx="8" fill="#facc15" opacity="0.7"/>
      <rect x="360" y="158" width="120" height="16" rx="8" fill="#60a5fa" opacity="0.7"/>
      <rect x="360" y="186" width="110" height="16" rx="8" fill="#ffffff" opacity="0.5"/>
      <rect x="420" y="248" width="120" height="44" rx="22" fill="#0f172a" opacity="0.4"/>
      <rect x="426" y="254" width="108" height="32" rx="16" fill="#60a5fa"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'SQL Fundamentals': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="sqlBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0ea5e9"/>
          <stop offset="100%" stop-color="#4c1d95"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#sqlBg)"/>
      <ellipse cx="190" cy="140" rx="80" ry="30" fill="#e0f2fe" opacity="0.7"/>
      <rect x="110" y="140" width="160" height="100" rx="30" fill="#0f172a" opacity="0.45"/>
      <ellipse cx="190" cy="240" rx="80" ry="30" fill="#4c1d95" opacity="0.6"/>
      <rect x="360" y="100" width="180" height="120" rx="22" fill="rgba(255,255,255,0.55)"/>
      <rect x="380" y="130" width="120" height="16" rx="8" fill="#0f172a" opacity="0.45"/>
      <rect x="380" y="158" width="140" height="16" rx="8" fill="#38bdf8" opacity="0.7"/>
      <rect x="380" y="186" width="110" height="16" rx="8" fill="#c7d2fe" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.4"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#38bdf8"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `),
  'Testing with Jest': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="jestBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fda4af"/>
          <stop offset="100%" stop-color="#f87171"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#jestBg)"/>
      <path d="M160 180 L200 120 L240 180 Z" fill="#fee2e2" stroke="#7f1d1d" stroke-width="6"/>
      <circle cx="200" cy="200" r="26" fill="#7f1d1d"/>
      <path d="M190 196 L198 206 L212 188" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="340" y="100" width="180" height="120" rx="22" fill="rgba(255,255,255,0.5)"/>
      <rect x="360" y="130" width="120" height="16" rx="8" fill="#ef4444" opacity="0.6"/>
      <rect x="360" y="158" width="140" height="16" rx="8" fill="#7f1d1d" opacity="0.4"/>
      <rect x="360" y="186" width="110" height="16" rx="8" fill="#fee2e2" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#7f1d1d" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#ef4444"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#7f1d1d"/>
    </svg>
  `),
  'TypeScript for JavaScript Developers': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="tsBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0ea5e9"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#tsBg)"/>
      <rect x="140" y="110" width="180" height="120" rx="20" fill="#1e3a8a"/>
      <text x="190" y="180" fill="#bfdbfe" font-family="Arial" font-size="50" font-weight="bold">TS</text>
      <rect x="360" y="90" width="180" height="120" rx="22" fill="rgba(255,255,255,0.5)"/>
      <rect x="380" y="120" width="120" height="16" rx="8" fill="#0ea5e9" opacity="0.7"/>
      <rect x="380" y="150" width="140" height="16" rx="8" fill="#1d4ed8" opacity="0.6"/>
      <rect x="380" y="178" width="110" height="16" rx="8" fill="#bfdbfe" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.4"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#38bdf8"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `),
  'UI/UX Design Principles': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="uiuxBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#uiuxBg)"/>
      <rect x="120" y="110" width="180" height="120" rx="28" fill="rgba(255,255,255,0.7)"/>
      <rect x="140" y="130" width="80" height="16" rx="8" fill="#ec4899" opacity="0.7"/>
      <rect x="140" y="158" width="120" height="16" rx="8" fill="#6366f1" opacity="0.6"/>
      <rect x="140" y="186" width="100" height="16" rx="8" fill="#0f172a" opacity="0.4"/>
      <rect x="340" y="90" width="180" height="120" rx="24" fill="rgba(255,255,255,0.55)"/>
      <rect x="360" y="120" width="140" height="18" rx="9" fill="#ec4899" opacity="0.7"/>
      <rect x="360" y="150" width="120" height="14" rx="7" fill="#6366f1" opacity="0.6"/>
      <rect x="360" y="176" width="110" height="14" rx="7" fill="#a855f7" opacity="0.5"/>
      <rect x="400" y="248" width="140" height="46" rx="23" fill="#0f172a" opacity="0.45"/>
      <rect x="406" y="254" width="128" height="34" rx="17" fill="#ec4899"/>
      <path d="M502 260 L522 280 L496 276 Z" fill="#0f172a"/>
    </svg>
  `),
  'Web Accessibility (a11y)': createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <defs>
        <linearGradient id="a11yBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient>
      </defs>
      <rect width="600" height="360" rx="28" fill="url(#a11yBg)"/>
      <circle cx="180" cy="180" r="60" fill="#f8fafc" opacity="0.75"/>
      <path d="M180 140 L195 180 H230 L202 200 L215 240 L180 214 L145 240 L158 200 L130 180 H165 Z" fill="#0f172a" opacity="0.65"/>
      <rect x="340" y="100" width="180" height="120" rx="22" fill="rgba(255,255,255,0.55)"/>
      <rect x="360" y="130" width="120" height="16" rx="8" fill="#0f172a" opacity="0.4"/>
      <rect x="360" y="158" width="140" height="16" rx="8" fill="#bae6fd" opacity="0.7"/>
      <rect x="360" y="186" width="110" height="16" rx="8" fill="#f8fafc" opacity="0.7"/>
      <rect x="420" y="248" width="120" height="42" rx="21" fill="#0f172a" opacity="0.45"/>
      <rect x="426" y="254" width="108" height="30" rx="15" fill="#38bdf8"/>
      <path d="M502 258 L522 276 L496 272 Z" fill="#0f172a"/>
    </svg>
  `)
};

const DEFAULT_IMAGE = createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
    <defs>
      <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e0e7ff"/>
        <stop offset="50%" stop-color="#f5d0fe"/>
        <stop offset="100%" stop-color="#dbeafe"/>
      </linearGradient>
    </defs>
    <rect width="600" height="360" rx="28" fill="url(#defaultGradient)"/>
    <circle cx="160" cy="140" r="60" fill="rgba(124,58,237,0.25)"/>
    <circle cx="260" cy="210" r="40" fill="rgba(59,130,246,0.3)"/>
    <rect x="320" y="90" width="180" height="120" rx="18" fill="rgba(255,255,255,0.55)"/>
    <rect x="360" y="120" width="100" height="12" rx="6" fill="rgba(79,70,229,0.4)"/>
    <rect x="360" y="146" width="140" height="12" rx="6" fill="rgba(129,140,248,0.4)"/>
    <rect x="360" y="172" width="120" height="12" rx="6" fill="rgba(147,197,253,0.4)"/>
    <rect x="420" y="236" width="110" height="38" rx="19" fill="rgba(15,23,42,0.3)"/>
  </svg>
`);

const Resources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    platform: '',
    costType: '',
    skill: ''
  });

  useEffect(() => {
    fetchResources();
  }, [search, filters]);

  const fetchResources = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filters.platform) params.append('platform', filters.platform);
      if (filters.costType) params.append('costType', filters.costType);
      if (filters.skill) params.append('skill', filters.skill);

      const response = await axios.get(`${API_URL}/api/resources?${params}`);
      const data = response.data.resources || [];
      const targetTitle = 'Programming Hero – Complete Web Development Course';
      const featuredResource = {
        _id: 'featured-programming-hero',
        title: targetTitle,
        platform: 'Programming Hero',
        url: 'https://www.programming-hero.com/',
        relatedSkills: ['Web Development', 'JavaScript', 'MERN Stack'],
        costType: 'Paid',
        price: 29.99,
        description:
          'Learn full-stack web development with hands-on projects, JavaScript mastery, backend APIs, and modern tools.'
      };
      const prioritizedResources = [];
      let foundFeatured = false;

      data.forEach((resource) => {
        if (resource.title?.trim() === targetTitle) {
          prioritizedResources.unshift({
            ...featuredResource,
            ...resource,
            relatedSkills: resource.relatedSkills?.length ? resource.relatedSkills : featuredResource.relatedSkills
          });
          foundFeatured = true;
        } else {
          prioritizedResources.push(resource);
        }
      });

      if (!foundFeatured) {
        prioritizedResources.unshift(featuredResource);
      }

      setResources(prioritizedResources);
    } catch (error) {
      console.error('Fetch resources error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F7F9FF] px-4 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#6757F5] mb-6">Learning Resources</h1>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search resources..." />
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              placeholder="Filter by platform..."
              className="px-4 py-3 bg-white border border-[#E0E0E0] rounded-[10px] focus:ring-2 focus:ring-[#6757F5]/30 focus:border-[#6757F5] placeholder:text-gray-400"
            />
            <select
              value={filters.costType}
              onChange={(e) => handleFilterChange('costType', e.target.value)}
              className="px-4 py-3 bg-white border border-[#E0E0E0] rounded-[10px] focus:ring-2 focus:ring-[#6757F5]/30 focus:border-[#6757F5]"
            >
              <option value="">All Costs</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
            <input
              type="text"
              value={filters.skill}
              onChange={(e) => handleFilterChange('skill', e.target.value)}
              placeholder="Filter by skill..."
              className="px-4 py-3 bg-white border border-[#E0E0E0] rounded-[10px] focus:ring-2 focus:ring-[#6757F5]/30 focus:border-[#6757F5] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Card key={resource._id}>
              <img
                src={RESOURCE_IMAGE_MAP[resource.title?.trim()] || DEFAULT_IMAGE}
                alt={`${resource.title} illustration`}
                className="h-40 w-full object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <div className="mb-2">
                <Tag variant="default">{resource.platform}</Tag>
              </div>
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {(resource.relatedSkills || []).slice(0, 3).map((skill) => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <Tag variant={resource.costType === 'Free' ? 'success' : 'primary'}>
                  {resource.costType === 'Free' ? 'Free' : `$${resource.price}`}
                </Tag>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline text-sm"
                >
                  Visit →
                </a>
              </div>
              <div className="mt-4 flex justify-end">
                <CertificateButton
                  userId={user?._id || 'guest'}
                  name={user?.fullName || 'SkillBridge Learner'}
                  courseId={resource._id}
                  courseName={resource.title}
                />
              </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <p className="text-gray-500 text-center py-8">No resources found. Try adjusting your filters.</p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;

