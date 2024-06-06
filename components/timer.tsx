"use client";

import { useEffect, useState } from "react";

type TimerProps = {
  target: string;
};

const Timer = ({ target }: TimerProps) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = new Date(target).getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown("Quiz is now open");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          `Quiz opens in ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return <p className="">{countdown}</p>;
};

export default Timer;
