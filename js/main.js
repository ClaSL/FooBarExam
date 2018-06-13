"use strict"

let myObject;
let beers;
let beersServed = 0;
let lastIdCounted = 0;



document.addEventListener("DOMContentLoaded", getAllData);

function getAllData() {
    loadScript();
    getBeerData();
}

function loadScript() {
    let data = FooBar.getData(true);
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
    document.querySelector('.people-served').textContent = `${myObject.serving.length}`;


    // SECTION 2 : Display BEERS SERVED TODAY
    document.querySelector('.beers-served').textContent = `${beersServed}`;





    // This is for Section 3:
    showTabStatus();

    //This is for Section 6: 
    bartenderInfo();

    //This is for Section 4: 
    showStorageStatus();



    //This is for Section 5b More Info:
    //showDetails() 

};

function getBeerData() {
    let data = FooBar.getData();
    beers = JSON.parse(data).beertypes;

    //This is for Section 5: 
    beerInfo();
};

// SECTION 3 : Display TAP CAPACITY/LEVEL
function showTabStatus() {
    // console.log(myObject.taps);

    // This is for Section 3: clean container:
    document.querySelector(".status").innerHTML = "";
    // also empty change-tap list!
    document.querySelector(".change-tap").innerHTML = "";

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

            clone.querySelector('.tap-level').style.backgroundColor = "red";

            // clone changetab template

            let tapListTemplate = document.querySelector('.tap-list-temp').content;
            //define clone
            let tapListClone = tapListTemplate.cloneNode(true);

            // set beer-name in this new clone

            tapListClone.querySelector('.tap-name').textContent = `${tap.beer}`;

            // append the clone to .change-tap
            document.querySelector(".change-tap").appendChild(tapListClone);

            //document.querySelector(".change-tap").textContent = `Change tap ${tap.beer}`;
        };

        //append clone to div
        document.querySelector(".status").appendChild(clone);



    });

};

// 4.2 BUY BEER

function showStorageStatus() {
    //console.log(myObject.storage);

    // This is for Section 3: clean container:
    document.querySelector(".buy-beer").innerHTML = "";

    let storage = myObject.storage;

    storage.forEach(stor => {

        if (stor.amount <= 2) {
            let buyListTemplate = document.querySelector('.beer-list-temp').content;
            //define clone
            let buyListClone = buyListTemplate.cloneNode(true);

            // set beer-name in this new clone

            buyListClone.querySelector('.more-beer').textContent = `${stor.name}`;

            // append the clone to .change-tap
            document.querySelector(".buy-beer").appendChild(buyListClone);

        };
    });

};



// SECTION 5 BEER INFO
// 5a BEER OVERVIEW

function beerInfo() {
    //console.log(myObject.beertypes);

    // This is for Section 3: clean container:
    document.querySelector(".beer-info").innerHTML = "";

    // let beers = myObject.beertypes;



    beers.forEach(beer => {
        // console.log(beer.name);

        //define template
        let beersTemplate = document.querySelector('.beers-temp').content;
        //define clone
        let beerClone = beersTemplate.cloneNode(true);

        //get and display the label
        beerClone.querySelector('.beer-label').src = `images/${beer.label}`;

        //get and display the name 
        beerClone.querySelector('.beer-name').textContent = `${beer.name}`;
        //get and display category
        beerClone.querySelector('.beer-category').textContent = `${beer.category}`;

        let button = beerClone.querySelector('.read-more');
        let modal = beerClone.querySelector(".modal-content");

        button.addEventListener("click", function () {
            modal.classList.toggle("hide");

        })

        // 5b MORE BEER INFO


        
        beerClone.querySelector(".modal-description").textContent = `${beer.description.overallImpression}`;
        beerClone.querySelector(".modal-alc").textContent = `${beer.alc}% alc`;


        //modal.classList.remove("hide")

        //append clone to div
        document.querySelector(".beer-info").appendChild(beerClone);
    });

};










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

        if (bart.status === "WORKING") {
            bartClone.querySelector('.bartStatus').style.backgroundColor = "green";
        } else {
            bartClone.querySelector('.bartStatus, .statusDetail, .bartName').style.opacity = 0.5;
        };
    

        //Adjustment of activity string
        if (bart.statusDetail === "pourBeer") {
            bartClone.querySelector(".statusDetail").textContent = `...is pouring beer`;
        } else if (bart.statusDetail === "reserveTap") {
            bartClone.querySelector(".statusDetail").textContent = `...reserving tap`;
        } else if (bart.statusDetail === "startServing") {
            bartClone.querySelector(".statusDetail").textContent = `...starts serving`;
        } else if (bart.statusDetail === "receivePayment") {
            bartClone.querySelector(".statusDetail").textContent = `...receiveing payment`;
        } else if (bart.statusDetail === "releaseTap") {
            bartClone.querySelector(".statusDetail").textContent = `...releasing tap`;
        } else {
            bartClone.querySelector(".statusDetail").textContent = `...is waiting`;
        }

        //append clone to div
        document.querySelector(".bartenders").appendChild(bartClone);
    });

};



// RELOAD all 3 sec for development, for presentation set to 10 sec
setInterval(function () {
    loadScript();
}, 10000);