const term = require("terminal-kit").terminal
// const getPixels = require('get-pixels');


function drawImage(url, options = {}, callback) {
    const defaultOptions = {
        shrink: { width: term.width, height: term.height * 2 }
    };

    options = Object.assign({}, defaultOptions, options);

    term.drawImage(url, {
        shrink: options.shrink
    }).then(() => {
        console.log("Image drawn successfully");
        if (callback) callback(null);
    }).catch((error) => {
        console.error("Error drawing image:", error);
        if (callback) callback(error);
    });
}

// Example usage:
const imagePath = '/Users/navdeepkaur/Documents/web-dev/PomodoroTimer/peakpx-3.jpg';  // Can be a local file path or URL (with get-pixels)
drawImage(imagePath, {
    shrink: { width: term.width, height: term.height * 2 }  // Optional size constraints
}, (error) => {
    if (error) {
        console.log("An error occurred:", error);
    } else {
        console.log("Image successfully rendered in the terminal.");
    }
});