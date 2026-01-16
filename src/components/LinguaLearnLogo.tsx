import * as React from 'react';

const LinguaLearnLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>

      {/* Mortarboard */}
      <polygon
        points="256 40 460 120 256 200 52 120"
        fill="#012169"/>

      {/* Accent: small red diamond on mortarboard */}
      <polygon
        points="256,80 276,120 256,160 236,120"
        fill="#C8102E"/>

      {/* Mortarboard base */}
      <rect
        x="176"
        y="200"
        width="160"
        height="28"
        rx="6"
        fill="#C8102E"/>

      {/* Tassel string: navy outline */}
      <line
        x1="460"
        y1="120"
        x2="460"
        y2="260"
        stroke="#012169"
        strokeWidth="10"
        strokeLinecap="round"/>

      {/* Tassel string: white core */}
      <line
        x1="460"
        y1="120"
        x2="460"
        y2="260"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"/>

      {/* Tassel pompon */}
      <circle
        cx="460"
        cy="270"
        r="10"
        fill="#FFFFFF"
        stroke="#012169"
        strokeWidth="3"/>

      {/* Book: left page */}
      <path
        d="M96 280
           Q176 250 256 280
           V420
           Q176 400 96 420 Z"
        fill="#FFFFFF"
        stroke="#012169"
        strokeWidth="8"/>

      {/* Book: right page */}
      <path
        d="M256 280
           Q336 250 416 280
           V420
           Q336 400 256 420 Z"
        fill="#FFFFFF"
        stroke="#012169"
        strokeWidth="8"/>

      {/* Book spine */}
      <line
        x1="256"
        y1="280"
        x2="256"
        y2="420"
        stroke="#C8102E"
        strokeWidth="6"/>

      {/* Page details */}
      <line x1="140" y1="320" x2="230" y2="330" stroke="#012169" strokeWidth="4"/>
      <line x1="140" y1="350" x2="230" y2="360" stroke="#012169" strokeWidth="4"/>
      <line x1="282" y1="330" x2="372" y2="320" stroke="#012169" strokeWidth="4"/>
      <line x1="282" y1="360" x2="372" y2="350" stroke="#012169" strokeWidth="4"/>

    </svg>
);

export default LinguaLearnLogo;
