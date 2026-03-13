import { PROFILES, Profile } from "../lib/quiz";

type ProfileRadarProps = {
  scores: Record<Profile, number>;
};

export function ProfileRadar({ scores }: ProfileRadarProps) {

  const size = 360;
  const center = size / 2;
  const radius = 130;

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

      <h3 className="text-lg font-semibold">
        Radar de personnalité
      </h3>

      <div className="mx-auto mt-6 max-w-xl">

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-[260px] md:h-[340px] lg:h-[420px]"
        >

          {PROFILES.map((profile, index) => {

            const angle = (Math.PI * 2 * index) / PROFILES.length - Math.PI / 2;

            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;

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
                  x={x}
                  y={y}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  dy={y < center ? -10 : 16}
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
