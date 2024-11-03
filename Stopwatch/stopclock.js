//timer: Stores the interval timer’s ID so we can start and stop it as needed.
//startTime: Holds the time when the stopwatch was started.
//elapsedTime: Stores the total elapsed time between starting and stopping the timer, 
//              which allows us to continue from where we left off when the stopwatch is restarted.

let timer = null;
let startTime = 0;
let elapsedTime = 0;

/*1. Checks if timer is already running. If not, it:
        a. Sets startTime to the current time minus any previous elapsed time. 
          This allows the stopwatch to continue from where it left off after a pause.
        b.. Starts the update function using setInterval every 10 milliseconds (for smooth updating).
*/

        function startTimer() {
            if (!timer) {
                startTime = Date.now() - elapsedTime;
                timer = setInterval(update, 10);
                
            }
            console.log(startTime)
        }
/*
2.Checks if timer is running. If it is:
        a.Stops the timer using clearInterval, which pauses the stopwatch.
        b.Stores the total elapsedTime since the last start() so the stopwatch can resume from this time later.
  */
function stopTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
                elapsedTime = Date.now() - startTime;
            }
        }

        /*
            1. Stops the timer and clears variables to reset all values.
            2. Updates the display to show 00:00:00:00, resetting it visually.
        */
            function resetTimer() {
            clearInterval(timer);
            timer = null;
            startTime = 0;
            elapsedTime = 0;
            document.getElementById("display").textContent = "00:00:00:00";
        }
        /*
           Calculates the elapsed time in hours, minutes, seconds, and milliseconds.
           Formatting: padStart(2, "0") ensures each unit is two digits (e.g., 04 for 4 seconds).
           Updates the display with the formatted time.

           Purpose: Calculates and displays the current elapsed time.
Explanation:
Time Calculations:
hours is calculated by dividing elapsedTime by 3,600,000 (milliseconds in an hour).
minutes is the remaining minutes after hours are accounted for, using modulus (%) and dividing by 60,000 (milliseconds in a minute).
seconds follows a similar pattern but divides by 1,000 (milliseconds in a second).
milliseconds is the remaining milliseconds after all seconds are accounted for.
padStart(2, "0") ensures each value (hours, minutes, seconds, milliseconds) is at least two digits (e.g., "03" instead of "3").
Updating Display: Updates the <div id="display"> with the current time formatted as hours:minutes:seconds:milliseconds.

        */

        function update() {
            elapsedTime = Date.now() - startTime;
            const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, "0");
            const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, "0");
            const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, "0");
            const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");
            document.getElementById("display").textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
        }

        /*
        Explanation:
                1. HTML Structure: Only one <div> to display the time and three buttons for Start, Stop, and Reset.
                2. JavaScript:
                            start() starts the timer if it's not already running.
                            stop() pauses the timer if it's running.
                            reset() stops the timer and resets the display.
                3. Update Function: Calculates hours, minutes, seconds, and milliseconds, and displays them.
        */