import React, { useEffect, useState } from "react";

const calculateTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return [minutes, seconds];
}

const useTimer = (isRunning: boolean) => {
    const [time, setTime] = useState(0);
    const [results, setResults] = useState([0,0]);

    useEffect(()=>{
        let interval = 0;
        if(isRunning){
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            },1000);
        } else if(!isRunning){
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    },[isRunning]);

    useEffect(() => {
        setResults(calculateTime(time));
    }, [time]);

    return results;
}

export default useTimer;