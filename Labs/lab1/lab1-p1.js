const _ = require("lodash")

const holidays = [
    { name: "April Fools", date: new Date("2025-4-1") },
    {name: "Canada Day", date: new Date("2025-7-1")},
    {name: "Christmas", date: new Date("2025-12-25")},
    {name: "New Years Eve", date: new Date("2025-12-31")},
]
let today = new Date();
holidays.forEach(holiday => {
    let dateDifference = holiday.date - today
    let days = Math.ceil((dateDifference/(1000 *60 *60 *24)))
    console.log(days)
})

console.log(_.sample(holidays))
console.log(_.findIndex(holidays, { name: "Christmas" }))
console.log(_.findIndex(holidays, {name: "Canada Day"}))