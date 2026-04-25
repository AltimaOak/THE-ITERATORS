import React from 'react';

export default function LucidaLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Book / 'L' Structure */}
      <path 
        d="M180 120V320C180 340 195 360 220 375L250 395L280 375C305 360 320 340 320 320V230" 
        stroke="#0F172A" 
        strokeWidth="35" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 'X' Structure */}
      <path 
        d="M260 180L380 350M380 180L260 350" 
        stroke="url(#gradient-blue)" 
        strokeWidth="35" 
        strokeLinecap="round" 
      />

      {/* Data Lines */}
      <line x1="195" y1="210" x2="240" y2="210" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
      <line x1="195" y1="235" x2="240" y2="235" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
      <line x1="195" y1="260" x2="260" y2="260" stroke="#38BDF8" strokeWidth="12" strokeLinecap="round" />
      <circle cx="265" cy="260" r="6" fill="white" stroke="#38BDF8" strokeWidth="4" />
      <line x1="195" y1="285" x2="240" y2="285" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />

      {/* Pages Bottom */}
      <path d="M150 370C180 340 220 340 250 395" stroke="#38BDF8" strokeWidth="15" strokeLinecap="round" />
      <path d="M150 390C180 360 220 360 250 415" stroke="#A855F7" strokeWidth="15" strokeLinecap="round" />

      {/* Sparkles */}
      <path d="M350 140L355 125L370 120L355 115L350 100L345 115L330 120L345 125L350 140Z" fill="#38BDF8" />
      <path d="M380 170L383 162L390 160L383 158L380 150L377 158L370 160L377 162L380 170Z" fill="#A855F7" />

      <defs>
        <linearGradient id="gradient-blue" x1="260" y1="180" x2="380" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
