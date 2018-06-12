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

    // SECTION 1 : Display PEOPLE IN LINE and PEOPLE GETTING SERVED
    document.querySelector('.waiting').textContent = `${myObject.queue.length}`;
    document.querySelector('.people-served').textContent = `People served: ${myObject.serving.length}`;


    // SECTION 2 : Display BEERS SERVED TODAY
    document.querySelector('.beers-served').textContent = `Served beers: ${beersServed}`;



    

    // This is for Section 3:
    showTabStatus();

    //This is for Section 6: 
    bartenderInfo();

};


// SECTION 3 : Display TAP CAPACITY/LEVEL
function showTabStatus() {
    // console.log(myObject.taps);

    // This is for Section 3: clean container:
    document.querySelector(".status").innerHTML = "";

    let taps = myObject.taps;

    taps.forEach(tap => {

        // console.log(tap.level);


        //define template
        let tapTemplate = document.querySelector('.status-temp').content;
        //define clone
        let clone = tapTemplate.cloneNode(true);

        //grab the value of level and set as height of level
        clone.querySelector('.tap-level').style.height = `${tap.level/10}px`;
        //grab the name of beer
        clone.querySelector('.beer-tap-name').textContent = tap.beer;



        // SECTION 4 ALERTS


        // 4.1 CHANGE TAP
        if (tap.level <= 2450) {
            document.querySelector(".change-tap").textContent = `Change tap ${tap.beer}`
            document.querySelector('.tap-level').style.backgroundColor = "red";
        };

        //append clone to div
        document.querySelector(".status").appendChild(clone);


    });

};

// 4.2 BUY BEER

// let beerStorage = myObject.storage;
// if(tap.storage.amount<=2){
//     document.querySelector(".more-beer").textContent = `Buy more: ${tap.beer}`
// };



// SECTION 5 BEER INFO

// SECTION 6 BARTENDERS

function bartenderInfo() {
    //console.log(myObject.bartenders);

    //clean container:
    document.querySelector(".bartenders").innerHTML = "";


    let bartenders = myObject.bartenders;

    bartenders.forEach(bart => {
        //console.log(bart.name);

        //define template
        let bartTemplate = document.querySelector('.bartTemp').content;
        //define clone
        let bartClone = bartTemplate.cloneNode(true);

        //get and display the name 
        bartClone.querySelector('.bartName').textContent = `${bart.name}`;
        //get and display status
        bartClone.querySelector('.bartStatus').textContent = `${bart.status}`;
        //get and display the statusdetail 
        bartClone.querySelector('.statusDetail').textContent = `${bart.statusDetail}`;

        //append clone to div
        document.querySelector(".bartenders").appendChild(bartClone);
    });

}



// RELOAD all 3 sec for development, for presentation set to 10 sec
setInterval(function () {
    loadScript();
}, 3000);