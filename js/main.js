console.log("connected to javascript");

const clocks = document.querySelectorAll(".clock");

let timezonesObj = {
  JST: {
    abbr: "JST",
    offset: 9
  },
  HST: {
    abbr: "HST",
    offset: -10
  },
  AKDT: {
    abbr: "AKDT",
    offset: -8
  },
  PST: {
    abbr: "PST",
    offset: -7
  },
  MDT: {
    abbr: "MDT",
    offset: -6
  },
  EST: {
    abbr: "EST",
    offset: -5
  },
  UTC: {
    abbr: "UTC",
    offset: 0
  }
}

// function constructor 
function TimeZone(UTCoffset, timezoneAbbrv) {
  this.UTCoffset = UTCoffset;
  this.timezoneAbbrv = timezoneAbbrv;

  // TIME VALUES
  this.date = new Date();
  // console.log(`date`, this.date);
  this.seconds = this.date.getUTCSeconds();
  // console.log(`timezone seconds`, this.seconds);
  this.minutes = this.date.getUTCMinutes();
  // console.log(`timezone minutes`, this.minutes);
  this.hours = Math.abs(this.date.getUTCHours() + this.UTCoffset);
  // console.log(`timezone hours`, this.hours);

  if (this.hours > 23) {
    this.hours = 0;
  }

  // DIGITAL FORMAT
  this.digitalFormat = `${this.hours}:${this.minutes}:${this.seconds}`;

  // STYLING HANDS
  this.secondHand = document.querySelector(
    `[data-seconds-hand="${timezoneAbbrv}Time"]`
  );

  this.minuteHand = document.querySelector(
    `[data-minutes-hand="${timezoneAbbrv}Time"]`
  );
  this.hourHand = document.querySelector(`[data-hour-hand="${timezoneAbbrv}Time"]`);

  this.getSecondsDegrees = function () {
    return (this.seconds / 60) * 360 + 90;
  };

  this.getMinutesDegrees = function () {
    return (this.minutes / 60) * 360 + 90;
  };

  this.getHoursDegrees = function () {
    return (this.hours / 60) * 360 + 90;
  };

  this.setStyle = function () {
    if (this.getSecondsDegrees() > 60) {
      this.secondHand.style.transition = "none";
    }
    this.secondHand.style.transform = `rotate(${this.getSecondsDegrees()}deg)`;

    if (this.getMinutesDegrees() > 60) {
      this.minuteHand.style.transition = "none";
    }
    this.minuteHand.style.transform = `rotate(${this.getMinutesDegrees()}deg)`;

    if (this.getHoursDegrees() > 60) {
      this.hourHand.style.transition = "none";
    }
    this.hourHand.style.transform = `rotate(${this.getHoursDegrees()}deg)`;
  };

  this.setStyle();
}

function setDate() {

  // let digitalFormat;


  clocks.forEach((clock) => {
    Object.keys(timezonesObj).forEach(timezone => {
      const TIMEZONE_ABBR = timezonesObj[timezone].abbr;
      const TIMEZONE_OFFSET = timezonesObj[timezone].offset;

      console.log(`obj`, timezone);
      // console.log(`TIMEZONE_ABBR`, TIMEZONE_ABBR);
      // console.log(`objects[obj].offset`, objects[obj].offset);
      const newClock = new TimeZone(TIMEZONE_OFFSET, TIMEZONE_ABBR);
      const DIGITAL_FORMAT = newClock.digitalFormat;

      console.log(`newClock.digitalFormat`, DIGITAL_FORMAT);
      console.log(`newClock`, newClock);

      // console.log(`digital`, digital);
      document.querySelector(`.digitalFormat[data-${TIMEZONE_ABBR}]`).innerText = DIGITAL_FORMAT;
      // console.log(`digitalFormat`, digitalFormat);

      // document.querySelector('[data-digital]').innerText =
      //   newClock.digitalFormat;
    })

    // for (const obj in objects) {
    //   console.log(`obj`, obj.offset.value);
    //   const newClock = new TimeZone(obj.offset, TIMEZONE_ABBR);

    //   console.log(`newClock`, newClock);
    //   document.querySelector('clock.dataset.digital').innerText =
    //     newClock.digitalFormat;
    // }

    // // console.log(`clock is`, clock);
    // if (clock.dataset.timezone === "UTC") {
    //   const UTCClock = new TimeZone(0, "UTCTime");
    //   document.querySelector("#UCTDigitalFormat").innerText =
    //     UTCClock.digitalFormat;
    // }

    // if (clock.dataset.timezone === "JST") {
    //   const JSTClock = new TimeZone(9, "JSTTime");
    //   console.log(JSTClock);
    //   document.querySelector("#JSTDigitalFormat").innerText =
    //     JSTClock.digitalFormat;
    // }

    // if (clock.dataset.timezone === "EST") {
    //   const ESTClock = new TimeZone(-5, "ESTTime");
    //   document.querySelector("#ESTDigitalFormat").innerText =
    //     ESTClock.digitalFormat;
    // }

    // if (clock.dataset.timezone === "HST") {
    //   const HSTClock = new TimeZone(-10, "HSTTime");
    //   document.querySelector("#HSTDigitalFormat").innerText =
    //     HSTClock.digitalFormat;
    // }

    // if (clock.dataset.timezone === "AKDT") {
    //   const AKDTClock = new TimeZone(-8, "AKDTTime");
    //   document.querySelector("#AKDTDigitalFormat").innerText =
    //     AKDTClock.digitalFormat;
    // }

    // if (clock.dataset.timezone === "PST") {
    //   const PSTClock = new TimeZone(-7, "PSTTime");
    //   document.querySelector("#PSTDigitalFormat").innerText =
    //     PSTClock.digitalFormat;
    // }

    // if (clock.dataset.timezone === "MDT") {
    //   const MDTClock = new TimeZone(-6, "MDTTime");
    //   document.querySelector("#MDTDigitalFormat").innerText =
    //     MDTClock.digitalFormat;
    // }
  });
}

// setDate();
setInterval(setDate, 1000);
