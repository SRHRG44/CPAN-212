const _ = require("lodash")

const holidays = [
    {name: "New Years Day", date: new Date("2025-1-1") },
    {name: "Valentines Day", date: new Date("2025-2-14")},
    {name: "April Fools", date: new Date("2025-4-1") },
    {name: "Good Friday", date: new Date("2025-4-18") },
    {name: "Easter Monday", date: new Date("2025-4-21") },
    {name: "Canada Day", date: new Date("2025-7-1") },
    {name: "Civic Holiday", date: new Date("2025-8-4") },
    {name: "Labour Day", date: new Date("2025-9-1") },
    {name: "Thanksgiving Day", date: new Date("2025-10-13") },
    {name: "Halloween", date: new Date("2025-10-31") },
    {name: "Remembrance Day", date: new Date("2025-11-11") },
    {name: "Christmas Eve", date: new Date("2025-12-24")},
    {name: "Christmas Day", date: new Date("2025-12-25") },
    {name: "Boxing Day", date: new Date("2025-12-26")},
    {name: "New Years Eve", date: new Date("2025-12-31")},
]
let today = new Date();
holidays.forEach(holiday => {
    let dateDifference = holiday.date - today
    let days = Math.ceil((dateDifference/(1000 *60 *60 *24)))
    console.log(days)
})

console.log(_.sample(holidays))
console.log(_.findIndex(holidays, { name: "Christmas Eve" }))
console.log(_.findIndex(holidays, {name: "Canada Day"}))