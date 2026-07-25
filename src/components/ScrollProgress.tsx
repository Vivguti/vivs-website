import { motion, useTransform, type MotionValue } from 'framer-motion';

interface ScrollProgressProps {
  progress: MotionValue<number>;
  visible: MotionValue<number>;
}

const phases = [
  { label: 'Blueprint', position: 0.12 },
  { label: 'Transform', position: 0.40 },
  { label: 'Reveal', position: 0.68 },
];

// ─── Sub-component for each phase label (avoids hooks-in-map) ──────────────
function PhaseLabel({
  label,
  position,
  progress,
}: {
  label: string;
  position: number;
  progress: MotionValue<number>;
}) {
  const labelOpacity = useTransform(
    progress,
    [
      Math.max(0, position - 0.15),
      position - 0.05,
      position + 0.05,
      Math.min(1, position + 0.15),
    ],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.span
      className="scroll-phase-label"
      style={{
        top: `${35 + position * 30}%`,
        opacity: labelOpacity,
      }}
    >
      {label}
    </motion.span>
  );
}

// ─── Main ScrollProgress Component ─────────────────────────────────────────
export default function ScrollProgress({ progress, visible }: ScrollProgressProps) {
  const fillHeight = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      style={{ opacity: visible }}
      className="hidden lg:block"
      aria-hidden="true"
    >
      {/* Track */}
      <div className="scroll-progress-track">
        <motion.div
          className="scroll-progress-fill"
          style={{ height: fillHeight }}
        />
      </div>

      {/* Phase labels */}
      {phases.map((phase) => (
        <PhaseLabel
          key={phase.label}
          label={phase.label}
          position={phase.position}
          progress={progress}
        />
      ))}
    </motion.div>
  );
}
