console.log("connected to javascript")

const clocks = document.querySelectorAll('.clock');

console.log(`Hello Diss`);


function TimeZone(UTCoffset, clockType) {
    this.UTCoffset = UTCoffset;
    this.clockType = clockType;

    // TIME VALUES
    this.date = new Date();
    // console.log(`date`, this.date);
    this.seconds = this.date.getUTCSeconds();
    // console.log(`timezone seconds`, this.seconds);
    this.minutes = this.date.getUTCMinutes();
    // console.log(`timezone minutes`, this.minutes);
    this.hours = this.date.getUTCHours() + this.UTCoffset;
    // console.log(`timezone hours`, this.hours);

    if(this.hours > 24) {
        this.hours -= 24;
    }

    // DIGITAL FORMAT
    this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds}`;

    // STYLING HANDS
    this.secondHand = document.querySelector(`[data-seconds-hand="${clockType}"]`);
    this.minuteHand = document.querySelector(`[data-minutes-hand="${clockType}"]`);
    this.hourHand = document.querySelector(`[data-hour-hand="${clockType}"]`);

    this.getSecondsDegrees = function () {
        return ((this.seconds / 60) * 360 + 90);
    }

    this.getMinutesDegrees = function () {
        return ((this.minutes / 60) * 360 + 90);
    }

    this.getHoursDegrees = function () {
        return ((this.hours / 60) * 360 + 90);
    }
    
    this.setStyle = function () 
    {
        if (this.getSecondsDegrees() > 60) {
            this.secondHand.style.transition = 'none';
        }
        this.secondHand.style.transform = `rotate(${this.getSecondsDegrees()}deg)`;

        if (this.getMinutesDegrees() > 60) {
            this.minuteHand.style.transition = 'none';
        }
        this.minuteHand.style.transform = `rotate(${this.getMinutesDegrees()}deg)`;

        if (this.getHoursDegrees() > 60) {
            this.hourHand.style.transition = 'none';
        }
        this.hourHand.style.transform = `rotate(${this.getHoursDegrees()}deg)`;
    }

    this.setStyle();
 }

function setDate() {
    clocks.forEach(clock => {
        // console.log(`clock is`, clock);
        if (clock.dataset.timezone === 'UTC') {
            const UTCClock = new TimeZone(0, "UTCTime");
            document.querySelector('#UCTDigitalFormat').innerText = UTCClock.digitalFormat;
        }

        if (clock.dataset.timezone === 'JST') {
            const JSTClock = new TimeZone(9, "JSTTime");
            console.log(JSTClock);
            document.querySelector('#JSTDigitalFormat').innerText = JSTClock.digitalFormat;
        }

        if (clock.dataset.timezone === 'EST') {
            const ESTClock = new TimeZone(-5, "ESTTime");
            document.querySelector('#ESTDigitalFormat').innerText = ESTClock.digitalFormat;
        }

        if (clock.dataset.timezone === 'HST') {
            const HSTClock = new TimeZone(-10, "HSTTime");
            document.querySelector('#HSTDigitalFormat').innerText = HSTClock.digitalFormat;
        }

        if (clock.dataset.timezone === 'AKDT') {
            const AKDTClock = new TimeZone(-8, "AKDTTime");
            document.querySelector('#AKDTDigitalFormat').innerText = AKDTClock.digitalFormat;
        }

        if (clock.dataset.timezone === 'PST') {
            const PSTClock = new TimeZone(-7, "PSTTime");
            document.querySelector('#PSTDigitalFormat').innerText = PSTClock.digitalFormat;
        }

        if (clock.dataset.timezone === 'MDT') {
            const MDTClock = new TimeZone(-6, "MDTTime");
            document.querySelector('#MDTDigitalFormat').innerText = MDTClock.digitalFormat;
        }
    })
}

setInterval(setDate, 1000);