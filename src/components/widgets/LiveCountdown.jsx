import { useCountdown } from "../../hooks/useCountdown";
import { RiTimeLine } from "react-icons/ri";

const LiveCountdown = ({ targetDateUnix, title = "T-minus" }) => {
  const { countdown, isExpired } = useCountdown(targetDateUnix);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-white">
      <div className="flex items-center justify-center gap-2 text-blue-300 mb-2">
        <RiTimeLine />
        <span className="text-sm font-medium uppercase tracking-wide">{title}</span>
      </div>
      <div className="text-3xl md:text-5xl font-mono font-bold text-center tabular-nums">
        {isExpired ? "Liftoff!" : countdown}
      </div>
    </div>
  );
};

export default LiveCountdown;