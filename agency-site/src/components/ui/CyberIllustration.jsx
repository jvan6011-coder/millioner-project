// Cyberpunk-style SVG illustrations for case study cards
// Each illustration is a unique themed graphic

function InvoiceBot() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Grid background */}
      <defs>
        <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="neon1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8"/>
          <stop offset="100%" stopColor="#c084fc"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#grid1)"/>

      {/* Document stack */}
      <rect x="140" y="40" width="70" height="90" rx="4" fill="rgba(99,102,241,0.1)" stroke="#818cf8" strokeWidth="1.5"/>
      <rect x="150" y="30" width="70" height="90" rx="4" fill="rgba(99,102,241,0.15)" stroke="#818cf8" strokeWidth="1.5"/>
      <rect x="160" y="20" width="70" height="90" rx="4" fill="rgba(99,102,241,0.2)" stroke="#818cf8" strokeWidth="1.5"/>
      {/* Lines on doc */}
      <line x1="170" y1="40" x2="220" y2="40" stroke="#818cf8" strokeWidth="1" opacity="0.6"/>
      <line x1="170" y1="50" x2="210" y2="50" stroke="#818cf8" strokeWidth="1" opacity="0.4"/>
      <line x1="170" y1="60" x2="215" y2="60" stroke="#818cf8" strokeWidth="1" opacity="0.4"/>
      <line x1="170" y1="70" x2="205" y2="70" stroke="#818cf8" strokeWidth="1" opacity="0.3"/>

      {/* Arrow */}
      <path d="M240 65 L270 65" stroke="url(#neon1)" strokeWidth="2" strokeDasharray="4 2">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <polygon points="275,65 268,60 268,70" fill="#c084fc"/>

      {/* AI Brain */}
      <circle cx="310" cy="65" r="30" fill="rgba(192,132,252,0.1)" stroke="#c084fc" strokeWidth="1.5"/>
      <circle cx="310" cy="65" r="20" fill="rgba(192,132,252,0.05)" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="3 3">
        <animateTransform attributeName="transform" type="rotate" from="0 310 65" to="360 310 65" dur="8s" repeatCount="indefinite"/>
      </circle>
      {/* Neural connections */}
      <circle cx="300" cy="55" r="2" fill="#c084fc"/>
      <circle cx="320" cy="55" r="2" fill="#c084fc"/>
      <circle cx="310" cy="75" r="2" fill="#c084fc"/>
      <circle cx="298" cy="70" r="2" fill="#c084fc"/>
      <circle cx="322" cy="68" r="2" fill="#c084fc"/>
      <line x1="300" y1="55" x2="320" y2="55" stroke="#c084fc" strokeWidth="0.5" opacity="0.5"/>
      <line x1="300" y1="55" x2="310" y2="75" stroke="#c084fc" strokeWidth="0.5" opacity="0.5"/>
      <line x1="320" y1="55" x2="310" y2="75" stroke="#c084fc" strokeWidth="0.5" opacity="0.5"/>

      {/* Scan lines */}
      <line x1="0" y1="150" x2="400" y2="150" stroke="#818cf8" strokeWidth="0.3" opacity="0.2"/>
      <line x1="0" y1="160" x2="400" y2="160" stroke="#818cf8" strokeWidth="0.3" opacity="0.15"/>
      <line x1="0" y1="170" x2="400" y2="170" stroke="#818cf8" strokeWidth="0.3" opacity="0.1"/>

      {/* Data particles */}
      <circle cx="80" cy="100" r="1.5" fill="#818cf8" opacity="0.6">
        <animate attributeName="cy" values="100;80;100" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="350" cy="120" r="1" fill="#c084fc" opacity="0.5">
        <animate attributeName="cy" values="120;140;120" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="50" r="1" fill="#818cf8" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

function ChatBot() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="neon2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#grid2)"/>

      {/* Chat bubbles */}
      <rect x="80" y="30" width="120" height="35" rx="12" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1"/>
      <line x1="95" y1="45" x2="175" y2="45" stroke="#a855f7" strokeWidth="1" opacity="0.4"/>
      <line x1="95" y1="52" x2="155" y2="52" stroke="#a855f7" strokeWidth="1" opacity="0.3"/>

      <rect x="200" y="80" width="140" height="35" rx="12" fill="rgba(236,72,153,0.15)" stroke="#ec4899" strokeWidth="1"/>
      <line x1="215" y1="95" x2="315" y2="95" stroke="#ec4899" strokeWidth="1" opacity="0.4"/>
      <line x1="215" y1="102" x2="295" y2="102" stroke="#ec4899" strokeWidth="1" opacity="0.3"/>

      <rect x="100" y="130" width="110" height="35" rx="12" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1"/>
      <line x1="115" y1="145" x2="190" y2="145" stroke="#a855f7" strokeWidth="1" opacity="0.4"/>
      <line x1="115" y1="152" x2="170" y2="152" stroke="#a855f7" strokeWidth="1" opacity="0.3"/>

      {/* Robot head */}
      <rect x="305" y="25" width="50" height="45" rx="8" fill="rgba(236,72,153,0.1)" stroke="#ec4899" strokeWidth="1.5"/>
      <circle cx="320" cy="42" r="5" fill="none" stroke="#ec4899" strokeWidth="1.5">
        <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="340" cy="42" r="5" fill="none" stroke="#ec4899" strokeWidth="1.5">
        <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite" begin="0.3s"/>
      </circle>
      <line x1="315" y1="58" x2="345" y2="58" stroke="#ec4899" strokeWidth="1" opacity="0.5"/>
      {/* Antenna */}
      <line x1="330" y1="25" x2="330" y2="15" stroke="#ec4899" strokeWidth="1"/>
      <circle cx="330" cy="12" r="3" fill="#ec4899" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
      </circle>

      {/* Connection lines */}
      <path d="M200 47 Q250 60 305 40" stroke="url(#neon2)" strokeWidth="0.8" strokeDasharray="3 3" fill="none">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

function PredictiveChart() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="neon3" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#06b6d4"/>
          <stop offset="100%" stopColor="#818cf8"/>
        </linearGradient>
        <linearGradient id="fill3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(6,182,212,0.3)"/>
          <stop offset="100%" stopColor="rgba(6,182,212,0)"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#grid3)"/>

      {/* Chart axes */}
      <line x1="60" y1="30" x2="60" y2="160" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>
      <line x1="60" y1="160" x2="360" y2="160" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>

      {/* Chart line - actual data */}
      <polyline points="60,140 100,130 140,120 180,100 220,110 260,80" stroke="#06b6d4" strokeWidth="2" fill="none"/>
      {/* Fill under line */}
      <polygon points="60,140 100,130 140,120 180,100 220,110 260,80 260,160 60,160" fill="url(#fill3)"/>

      {/* Prediction dashed line */}
      <polyline points="260,80 300,55 340,40" stroke="#818cf8" strokeWidth="2" fill="none" strokeDasharray="6 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2s" repeatCount="indefinite"/>
      </polyline>

      {/* Data points */}
      <circle cx="60" cy="140" r="3" fill="#06b6d4"/>
      <circle cx="100" cy="130" r="3" fill="#06b6d4"/>
      <circle cx="140" cy="120" r="3" fill="#06b6d4"/>
      <circle cx="180" cy="100" r="3" fill="#06b6d4"/>
      <circle cx="220" cy="110" r="3" fill="#06b6d4"/>
      <circle cx="260" cy="80" r="4" fill="#818cf8" stroke="#818cf8" strokeWidth="2" opacity="0.5">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Prediction markers */}
      <circle cx="300" cy="55" r="3" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2"/>
      <circle cx="340" cy="40" r="3" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2"/>

      {/* Arrow up indicator */}
      <polygon points="350,100 356,115 344,115" fill="#10b981" opacity="0.8"/>
      <text x="340" y="130" fill="#10b981" fontSize="10" fontFamily="monospace" opacity="0.8">+35%</text>

      {/* Box labels */}
      <rect x="70" y="40" width="55" height="18" rx="3" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="0.5"/>
      <text x="78" y="52" fill="#06b6d4" fontSize="8" fontFamily="monospace">ACTUAL</text>
      <rect x="265" y="30" width="70" height="18" rx="3" fill="rgba(129,140,248,0.1)" stroke="#818cf8" strokeWidth="0.5"/>
      <text x="271" y="42" fill="#818cf8" fontSize="8" fontFamily="monospace">PREDICTED</text>
    </svg>
  )
}

function ContentEngine() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,158,11,0.08)" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="neon4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#grid4)"/>

      {/* Central gear/engine */}
      <circle cx="200" cy="90" r="35" fill="none" stroke="url(#neon4)" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" from="0 200 90" to="360 200 90" dur="12s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="90" r="25" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="360 200 90" to="0 200 90" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="90" r="8" fill="#f59e0b" opacity="0.3"/>
      <text x="193" y="94" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">AI</text>

      {/* Input arrows (left) */}
      <line x1="60" y1="60" x2="155" y2="75" stroke="#f59e0b" strokeWidth="1" opacity="0.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="60" y1="90" x2="155" y2="90" stroke="#f59e0b" strokeWidth="1" opacity="0.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite" begin="0.3s"/>
      </line>
      <line x1="60" y1="120" x2="155" y2="105" stroke="#f59e0b" strokeWidth="1" opacity="0.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite" begin="0.6s"/>
      </line>

      {/* Input labels */}
      <rect x="15" y="50" width="45" height="18" rx="3" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="0.5"/>
      <text x="22" y="62" fill="#f59e0b" fontSize="7" fontFamily="monospace">BRIEF</text>
      <rect x="15" y="81" width="45" height="18" rx="3" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="0.5"/>
      <text x="22" y="93" fill="#f59e0b" fontSize="7" fontFamily="monospace">DATA</text>
      <rect x="15" y="112" width="45" height="18" rx="3" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="0.5"/>
      <text x="21" y="124" fill="#f59e0b" fontSize="7" fontFamily="monospace">BRAND</text>

      {/* Output arrows (right) */}
      <line x1="245" y1="70" x2="310" y2="45" stroke="#ef4444" strokeWidth="1" opacity="0.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="245" y1="90" x2="310" y2="90" stroke="#ef4444" strokeWidth="1" opacity="0.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite" begin="0.3s"/>
      </line>
      <line x1="245" y1="110" x2="310" y2="135" stroke="#ef4444" strokeWidth="1" opacity="0.5" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="2s" repeatCount="indefinite" begin="0.6s"/>
      </line>

      {/* Output labels */}
      <rect x="315" y="35" width="60" height="18" rx="3" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="0.5"/>
      <text x="322" y="47" fill="#ef4444" fontSize="7" fontFamily="monospace">BLOG</text>
      <rect x="315" y="81" width="60" height="18" rx="3" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="0.5"/>
      <text x="320" y="93" fill="#ef4444" fontSize="7" fontFamily="monospace">SOCIAL</text>
      <rect x="315" y="127" width="60" height="18" rx="3" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="0.5"/>
      <text x="322" y="139" fill="#ef4444" fontSize="7" fontFamily="monospace">EMAIL</text>

      {/* 10x label */}
      <text x="175" y="165" fill="url(#neon4)" fontSize="16" fontWeight="bold" fontFamily="monospace" opacity="0.6">10x</text>
    </svg>
  )
}

const illustrations = [InvoiceBot, ChatBot, PredictiveChart, ContentEngine]

export default function CyberIllustration({ index = 0 }) {
  const Illustration = illustrations[index % illustrations.length]
  return <Illustration />
}
