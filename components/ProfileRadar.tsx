import { PROFILES, Profile } from "../lib/quiz";

type ProfileRadarProps = {
  scores: Record<Profile, number>;
};

export function ProfileRadar({ scores }: ProfileRadarProps) {

  const size = 420;
  const center = size / 2;
  const radius = 140;

  const maxValue = Math.max(1, ...Object.values(scores));

  const points = PROFILES.map((profile, index) => {

    const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;
    const value = scores[profile] / maxValue;

    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;

    return `${x},${y}`;

  }).join(" ");

  return (

    <article className="flex justify-center">

      {/* CADRE INTERIEUR */}
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-[320px] flex justify-center">

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full"
        >

          {PROFILES.map((profile, index) => {

            const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;

            const lineX = center + Math.cos(angle) * radius;
            const lineY = center + Math.sin(angle) * radius;

            const labelX = center + Math.cos(angle) * (radius + 30);
            const labelY = center + Math.sin(angle) * (radius + 30);

            return (

              <g key={profile}>

                <line
                  x1={center}
                  y1={center}
                  x2={lineX}
                  y2={lineY}
                  stroke="rgba(255,255,255,0.25)"
                />

                <text
                  x={labelX}
                  y={labelY}
                  fill="white"
                  fontSize="15"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {profile.replace("Le ", "")}
                </text>

              </g>

            );

          })}

          <polygon
            points={points}
            fill="rgba(92,242,255,0.25)"
            stroke="#5cf2ff"
            strokeWidth="2"
          />

        </svg>

      </div>

    </article>

  );

}
