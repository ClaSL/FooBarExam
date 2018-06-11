"use strict"

let myObject;
let beersServed = 0;
let lastIdCounted = 0;


document.addEventListener("DOMContentLoaded", loadScript);

function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);
    console.log(myObject);

    myObject.serving.forEach(customer => {
        if (customer.id > lastIdCounted) {
            beersServed += customer.order.length;
            lastIdCounted = customer.id;
        }
    });

    // SECTION 1 : Display PEOPLE IN LINE
    document.querySelector('.waiting').textContent = `${myObject.queue.length}`;
    document.querySelector('.people-served').textContent = `People served: ${myObject.serving.length}`;


    // SECTION 2 : Display BEERS SERVED TODAY
    document.querySelector('.beers-served').textContent = `Served beers: ${beersServed}`;

    // SECTION 3 : Display tap capacity/level
    
    // myObject.taps.forEach(tapLavel => {
    // document.querySelector('.tap-status').style.height = `${myObject.taps.level}0px`;})


};
// SECTION 4

// SECTION 5

// SECTION 6



// RELOAD all 3 sec for development, for presentation set to 10 sec
setInterval(function () {
    loadScript();
}, 3000);