import { PROFILES, Profile } from "../lib/quiz";

type ProfileRadarProps = {
  scores: Record<Profile, number>;
};

export function ProfileRadar({ scores }: ProfileRadarProps) {

  const size = 420;            // taille du canvas
  const center = size / 2;
  const radius = 160;          // rayon du radar

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

      <div className="mx-auto mt-6 max-w-xl">

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="mx-auto w-full h-[260px] md:h-[360px] lg:h-[460px]"
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
                  fontSize="14"
                  textAnchor="middle"
                  dy={y < center ? -12 : 18}
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
