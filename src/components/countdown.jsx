"use client";

import { useEffect, useState } from "react";

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateCountdown = () => {
            const target = new Date(targetDate).getTime();
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft("Started");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h`);
            } else {
                setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call

        return () => clearInterval(interval);
    }, [targetDate]);

    return <p>{timeLeft}</p>;
};

export default Countdown;