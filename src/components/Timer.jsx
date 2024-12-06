import { useEffect, useState } from "react";

const Timer = ({ setSessionsCompleted, currentTaskIndex }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default time 
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState(25 * 60); // Custom user-defined time
  const [audio] = useState(new Audio("/alarm.wav"));

  // Start or pause the timer
  const toggleTimer = () => setIsRunning(!isRunning);

  // Reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(customTime); // Reset to custom time
  };

  // Handle custom time input from the user
  const handleTimeInput = (event) => {
    const inputMinutes = parseInt(event.target.value, 10);
    if (!isNaN(inputMinutes) && inputMinutes > 0) {
      const newTime = inputMinutes * 60;
      setCustomTime(newTime);
      setTimeLeft(newTime);
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    console.log('creating timer')

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          audio.play();
          console.log(`Timer finished for task at index: ${currentTaskIndex}`);
          if (currentTaskIndex !== null) {
            setSessionsCompleted(); // Call the function to mark task complete
          }
          return customTime; // Reset to custom time
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, audio, customTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      {/* Timer Display */}
      <div className="text-5xl font-bold">{formatTime(timeLeft)}</div>

      {/* Custom Time Input */}
      <div className="mt-4">
        <label htmlFor="timeInput" className="block text-sm font-medium">
          Set Time (in minutes):
        </label>
        <input
          type="number"
          id="timeInput"
          className="mt-1 block w-24 mx-auto px-2 py-1 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          placeholder="25"
          onChange={handleTimeInput}
          disabled={isRunning} // Prevent changing time while running
        />
      </div>

      {/* Timer Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
