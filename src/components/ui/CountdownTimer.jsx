import { useCountdown } from "../../hooks/useCountdown";

const CountdownTimer = ({ targetDateUnix, className = "" }) => {
  const { countdown, isExpired } = useCountdown(targetDateUnix);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {isExpired ? "Launched!" : countdown}
    </span>
  );
};

export default CountdownTimer;