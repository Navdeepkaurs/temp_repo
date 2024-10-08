// basic one 

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output }); // interface

// Constants for durations in minutes
const WORK_DURATION_MINUTES = 25;
const BREAK_DURATION_MINUTES = 5;
const LONG_BREAK_DURATION_MINUTES = 20;

let pomodoroCycles = 4; // Total Pomodoro cycles

const pomodoroArt = `
🍅🍅🍅 POMODORO TIMER! 🍅🍅🍅
Stay focused and productive!
`;

const breakEmoji = "☕ Time for a short break! Relax and recharge.";
const longBreakEmoji = "🎉 You've earned a long break! Great job!";
const workEmoji = "💻 Work Session! Stay focused.";

// Starts the timer for either work or break
function startTimer(type, durationInMinutes) {
    console.log(`\n${type} Timer started for ${durationInMinutes} minutes! ${type === "Work" ? workEmoji : breakEmoji}`);

    let remainingTime = durationInMinutes * 60; // Convert minutes to seconds

    // Countdown function to show remaining time
    const countdown = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        // Display remaining time 
        process.stdout.write(`\r⏳ Remaining time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} `);

        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(countdown); // Stop countdown when time is up
            console.log(`\n✅ ${type} finished!`);

            if (type === "Work") {
                if (pomodoroCycles === 1) {
                    console.log(longBreakEmoji);
                    startTimer("Long Break", LONG_BREAK_DURATION_MINUTES);
                } else {
                    pomodoroCycles--;
                    console.log(`Switching to short break. Remaining cycles: ${pomodoroCycles}`);
                    startTimer("Break", BREAK_DURATION_MINUTES);
                }
            } else if (type === "Break") {
                if (pomodoroCycles > 0) {
                    console.log("🎯 Starting next work session.");
                    startTimer("Work", WORK_DURATION_MINUTES);
                } else {
                    console.log("🎉 All Pomodoro cycles completed. Great job!");
                    console.log(pomodoroArt);
                    rl.close();
                }
            }
        }
    }, 1000);
}

// Asking user to start the Pomodoro timer
rl.question("Press Y to start the Pomodoro timer 🍅: ", (answer) => {
    if (answer.toLowerCase() === 'y') {
        console.log(pomodoroArt);
        startTimer("Work", WORK_DURATION_MINUTES);
    } else {
        console.log("Goodbye! 👋 See you next time!");
        rl.close(); // Close the readline interface
    }
});

