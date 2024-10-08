// Using terminal kit 

const term = require("terminal-kit").terminal

const workDuration = 25 * 60 // 25 minutes
const smallBreakDuration = 5 * 60 // 5 minutes
const longBreakDuration = 20 * 60 // 20 minutes
let pomodoro = 4 // Number of pomodoros before a long break

let timerInterval // Global reference to the interval, allows clearing from different scopes

function startTimer(type, duration) {
    term.clear()
    term(`${type} timer started. Duration: ${duration / 60} minutes\n`)

    let seconds = duration
    timerInterval = setInterval(() => {
        seconds--
        term.moveTo(1, 2)
        term.eraseLineAfter()
        term(
            `Time left: ${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60
            }`
        )

        if (seconds <= 0) {
            clearInterval(timerInterval)
            term("\n")
            term(`${type} timer finished\n`)
            if (type === "work") {
                pomodoro--
                if (pomodoro === 0) {
                    pomodoro = 4
                    startTimer("long break", longBreakDuration)
                } else {
                    startTimer("small break", smallBreakDuration)
                }
            } else {
                startTimer("work", workDuration)
            }
        }
    }, 1000)
}

function askStartTimer() {
    term("Press Y to start timer or any other key to exit: ")

    term.yesOrNo({ yes: ["y", "Y"], no: ["n", "N"] }, (error, result) => {
        if (error) {
            term.red(`An error occurred: ${error}\n`)
            process.exit(1)
        }
        if (result) {
            startTimer("work", workDuration)
        } else {
            term("Bye!\n")
            process.exit(0)
        }
    })
}

term.on("key", function (name, matches, data) {
    // Listen for Ctrl+C or 'q' key to quit the application at any time
    if (name === "CTRL_C" || name === "q") {
        clearInterval(timerInterval) // Stop the timer
        term.clear()
        term("Exiting...\n")
        process.exit(0) // Exit the process
    }
})

term.bold("Welcome to the Pomodoro Timer!\n")
askStartTimer()