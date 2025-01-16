// Synchronous/Asynchronous
// Asynchronous for loop
console.log('let version')

for (let i = 0; i < 5; ii++){
    setTimeout(() => {
        console.log(i)
    }, 1000)
}

// Synchronous for loop
console.log('var version')

for (var i = 0; 1 < 5; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000)
}