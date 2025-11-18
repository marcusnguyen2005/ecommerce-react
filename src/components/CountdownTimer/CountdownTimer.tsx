import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  hours: number;
  onComplete?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  hours,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: hours,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const totalSeconds = hours * 3600;
    let remainingSeconds = totalSeconds;

    const timer = setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds <= 0) {
        clearInterval(timer);
        if (onComplete) {
          onComplete();
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(remainingSeconds / 86400);
      const h = Math.floor((remainingSeconds % 86400) / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, onComplete]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col">
      <div className="text-yellow-400 text-sm font-medium mb-2">
        • Ưu đãi chỉ còn lại:
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-blue-900 text-yellow-400 px-4 py-3 rounded-lg text-center min-w-[70px] shadow-lg">
          <div className="text-2xl font-bold">{formatTime(timeLeft.days)}</div>
          <div className="text-xs font-medium mt-1">NGÀY</div>
        </div>
        <div className="bg-blue-900 text-yellow-400 px-4 py-3 rounded-lg text-center min-w-[70px] shadow-lg">
          <div className="text-2xl font-bold">{formatTime(timeLeft.hours)}</div>
          <div className="text-xs font-medium mt-1">GIỜ</div>
        </div>
        <div className="bg-blue-900 text-yellow-400 px-4 py-3 rounded-lg text-center min-w-[70px] shadow-lg">
          <div className="text-2xl font-bold">{formatTime(timeLeft.minutes)}</div>
          <div className="text-xs font-medium mt-1">PHÚT</div>
        </div>
        <div className="bg-blue-900 text-yellow-400 px-4 py-3 rounded-lg text-center min-w-[70px] shadow-lg">
          <div className="text-2xl font-bold">{formatTime(timeLeft.seconds)}</div>
          <div className="text-xs font-medium mt-1">GIÂY</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

