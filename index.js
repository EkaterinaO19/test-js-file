const busy = [{start: '10:30', stop: '10:50'}, {start: '18:40', stop: '18:50'}, {
    start: '14:40', stop: '15:50'
}, {start: '16:40', stop: '17:20'}, {start: '20:05', stop: '20:20'}];

const windowSize = 30;
const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
    const mins = (minutes % 60).toString().padStart(2, '0');
    return `${hours}:${mins}`;
};

const totalWindows = (21 - 9) * 60 / windowSize;

const freeWindows = [];
let startMinute = 9 * 60; // Start from 9 am
for (let i = 0; i < totalWindows; i++) {
    const stopMinute = startMinute + windowSize;
    const window = {start: minutesToTime(startMinute), stop: minutesToTime(stopMinute)};

    let isBusy = false;
    for (const busyWindow of busy) {
        const busyStartMinute = parseInt(busyWindow.start.split(':')[0]) * 60 + parseInt(busyWindow.start.split(':')[1]);
        const busyStopMinute = parseInt(busyWindow.stop.split(':')[0]) * 60 + parseInt(busyWindow.stop.split(':')[1]);

        if (startMinute < busyStopMinute && stopMinute > busyStartMinute) {
            isBusy = true;
            break;
        }
    }

    if (!isBusy) {
        freeWindows.push(window);
    }

    startMinute += windowSize;
}

console.log(freeWindows);