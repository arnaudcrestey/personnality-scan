import { PROFILES, Profile } from "../lib/quiz";

type ProfileRadarProps = {
  scores: Record<Profile, number>;
};

export function ProfileRadar({ scores }: ProfileRadarProps) {

  const size = 520;
  const center = size / 2;
  const radius = 200;

  const maxValue = Math.max(1, ...Object.values(scores));

  const levels = [0.25, 0.5, 0.75, 1];

  const points = PROFILES.map((profile, index) => {
    const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;
    const value = scores[profile] / maxValue;

    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;

    return `${x},${y}`;
  }).join(" ");

  return (

    <div className="flex justify-center py-6">

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-[480px] h-[480px]"
      >

        {/* Grille radar */}
        {levels.map((level, i) => {

          const gridPoints = PROFILES.map((_, index) => {

            const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;

            const x = center + Math.cos(angle) * radius * level;
            const y = center + Math.sin(angle) * radius * level;

            return `${x},${y}`;

          }).join(" ");

          return (
            <polygon
              key={i}
              points={gridPoints}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          );

        })}

        {/* Axes */}
        {PROFILES.map((profile, index) => {

          const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;

          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;

          const labelX = center + Math.cos(angle) * (radius + 60);
          const labelY = center + Math.sin(angle) * (radius + 60);

          return (

            <g key={profile}>

              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.25)"
              />

              <text
                x={labelX}
                y={labelY}
                fill="white"
                fontSize="20"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {profile.replace("Le ", "")}
              </text>

            </g>

          );

        })}

        {/* Données */}
        <polygon
          points={points}
          fill="rgba(92,242,255,0.25)"
          stroke="#5cf2ff"
          strokeWidth="3"
        />

      </svg>

    </div>

  );

}
