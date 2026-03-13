import { PROFILES, Profile } from "../lib/quiz";

type ProfileRadarProps = {
  scores: Record<Profile, number>;
};

export function ProfileRadar({ scores }: ProfileRadarProps) {
  const size = 260;
  const center = size / 2;
  const radius = 90;
  const maxValue = Math.max(1, ...Object.values(scores));

  const points = PROFILES.map((profile, index) => {
    const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;
    const value = scores[profile] / maxValue;
    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;
    return `${x},${y}`;
  }).join(" ");

  return (
    <article className="glass-card p-6">
      <h3 className="text-lg font-semibold">Radar de personnalité</h3>
      <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto mt-4 h-64 w-64">
        {PROFILES.map((profile, index) => {
          const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          return (
            <g key={profile}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.2)" />
              <text x={x} y={y} fill="white" fontSize="10" textAnchor="middle" dy={y < center ? -6 : 14}>
                {profile.replace("Le ", "")}
              </text>
            </g>
          );
        })}
        <polygon points={points} fill="rgba(92,242,255,0.25)" stroke="#5cf2ff" strokeWidth="2" />
      </svg>
    </article>
  );
}
