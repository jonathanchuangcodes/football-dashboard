import { useEffect, useRef } from "react";

export default function useInterval(callback: Function, delay: number) {
    const savedCallback = useRef(<Function>{});

    // Remember the latest callback and delay.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current!();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
