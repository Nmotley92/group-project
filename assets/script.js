// selects Header and event container element
var eventContainer = $('#events-container');
var mainHeader = $('#main-header');
var modal2El = $('#form-modal');
var formObject = {
    eventTitle: "",
    time: "",
    details: ""
}
var saveForm = $('#save');
var closeForm = $('#close');
var eventName = $('#event-name');
var eventTime = $('#event-time');
var eventDetails = $('#event-details');
var key;
var target;
var newKEy;

// Finds the amount of days based off of current month
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// adds current date to the header
var date = new Date()
mainHeader.text(date.toDateString());
// current year and month as variables
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1; // 👈️ months are 0-based
var currentDay = date.getDate();


// 👇️ Current Month
var daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
// 👇️ first day of the month
var firstDayOfMonth = new Date(`${currentYear}-${currentMonth}-1`).getDay()
// 👇️ what weekday the month starts on
var weekDay = firstDayOfMonth;
// Run create calendar function
createCalendar();

function createCalendar() {
    for (let i = 1; i <= daysInCurrentMonth; i++) {
        var dayOfWeek;
        // checks what day should be added 
        if (weekDay == 0) {
            dayOfWeek = "Sunday";
        }
        if (weekDay == 1) {
            dayOfWeek = "Monday";
        }
        if (weekDay == 2) {
            dayOfWeek = "Tuesday";
        }
        if (weekDay == 3) {
            dayOfWeek = "Wednesday";
        }
        if (weekDay == 4) {
            dayOfWeek = "Thursday";
        }
        if (weekDay == 5) {
            dayOfWeek = "Friday";
        }
        if (weekDay == 6) {
            dayOfWeek = "Saturday";
        }
        // creates elemenst for the date cards
        var articleEL = $('<article>');
        var cardHeader = $('<div>');
        var headerText = $('<p>');
        var cardText = $('<div>');
        var addEventButton = $('<button>');


        // adds classes, ids, and appends created elements
        articleEL.addClass("bg-white dark:bg-slate-800 shadow-xl shadow-slate-200 dark:shadow-slate-800 rounded-lg");
        eventContainer.append(articleEL);
        cardHeader.addClass("p-3 shadow bg-indigo-500 text-indigo-50 uppercase grid place-items-center rounded-t-lg");
        articleEL.append(cardHeader);
        headerText.text(dayOfWeek + " " + i);
        cardHeader.append(headerText);
        cardText.addClass("date p-4 md:p-6 lg:p-8 grid gap-4 md:gap-6");
        cardText.attr('id', "key-" + i);
        addEventButton.addClass("x w-full bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring");
        addEventButton.attr("id", "date-" + i);
        addEventButton.text("Add Event");
        articleEL.append(cardText);
        cardText.append(addEventButton)
        // keeps trak of the days
        if (weekDay >= 6) {
            weekDay = 0;
        } else {
            weekDay++;
        }

    }
}

// lisstens for an add event click
var clickable = $('.x');
clickable.click(function () {
    // use target to teel where to add new event button
    target = $(this).parent();
    
    // makes the modal pop up 
    modal2El.css('display', 'block');
    // creates key to save in local storage
    newKEy = $(this).parent().attr('id');
    // clears out the event form
    eventName.val('');
    eventTime.val('');
    eventDetails.val('');
   
});


// listens for a save button click
saveForm.on('click', () => {
    // takes iput from form and creates an object
    formObject.eventTitle = eventName.val();
    formObject.time = eventTime.val();
    formObject.details = eventDetails.val();
    // makes form disapear once user clicks the save button
    modal2El.css('display', 'none');

    // creates the new button
    var pELTitle = $('<button>');
    pELTitle.addClass('y w-full bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring ');
    pELTitle.text(eventName.val());
    pELTitle.attr("id", newKEy);
    // saves object to local storage
    localStorage.setItem(newKEy, JSON.stringify(formObject));
    // adds the button to the page
    target.append(pELTitle);
    // clears form on save click
    eventName.val('');
    eventTime.val('');
    eventDetails.val('');
    // class selecter for the new buttons 
    var buttutu = $('.y');
    // click listener for new buttons
    buttutu.click((event) => {
        var newForm = JSON.parse(localStorage.getItem(event.target.id));

        eventName.val(newForm.eventTitle);
        eventTime.val(newForm.time);
        eventDetails.val(newForm.details);
        modal2El.css('display', 'block');
    })

})

// closes the modal on close button click
closeForm.on('click', () => {
    modal2El.css('display', 'none');

});

// Creates concert list
var localEventCont = $('#local-events');
var inputEl = $('#input');
var searchEl = $('#search-button');
var modal = $('#myModal');
var x = $('.close');


function createLocalEvents(cityInput) {
    var apiKey = "MzA0NzM4MTd8MTY2ODc0MTg3OC41MTA0NzE4";
    var city = cityInput;
    // fetches events on search by city
    fetch(`https://api.seatgeek.com/2/events?venue.city=${city}&client_id=${apiKey}`, {

        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (containerImgEl) {
                containerImgEl.remove();
            }
            if (data.events.length == 0) {
                modal.css('display', 'block')
                return;
            }

            for (let i = 0; i < data.events.length; i++) {
                // creats a clickable image
                var containerImgEl = $('<div>');
                var imageEL = $('<img>');
                var aEL = $('<a>');
                var thirdDivEl = $('<div>');
                var foruthDivEl = $('<div>');
                var fifthDiveEl = $('<div>');
                var h5El = $('<h5>');
                var pel = $('<p>');
                // pulls and assigns data from fetch
                var imgSrc = data.events[i].performers[0].image;
                var link = data.events[i].url;
                var title = data.events[i].title + " " + data.events[0].type;
                var time = new Date(data.events[i].datetime_local).toLocaleString();


                // adds classes for the image container
                containerImgEl.addClass("relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg");
                containerImgEl.attr("style", 'background-position: 50%;');
                containerImgEl.attr("data-mdb-ripple", 'true');
                containerImgEl.attr("data-mdb-ripple-color", 'life');
                imageEL.addClass("w-full");
                thirdDivEl.addClass("absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed");
                thirdDivEl.attr("style", "background-color: rgba(0, 0, 0, 0.4)");
                foruthDivEl.addClass("flex justify-start items-end h-full");
                fifthDiveEl.addClass("text-white m-6");
                h5El.addClass('font-bold text-lg mb-3');
                pel.addClass('font-bold text-lg mb-3');
                // adds src and href
                imageEL.attr("src", imgSrc);
                aEL.attr("href", link);
                //  puts the text for title and time
                h5El.text(title);
                pel.text(time);
                // adds all the above to page
                localEventCont.append(containerImgEl);
                containerImgEl.append(imageEL);
                containerImgEl.append(aEL);
                aEL.append(thirdDivEl);
                thirdDivEl.append(foruthDivEl);
                foruthDivEl.append(fifthDiveEl);
                fifthDiveEl.append(h5El);
                fifthDiveEl.append(pel);
            }

        });


}
// searches for city 
searchEl.on('click', () => {
    var cityInput = inputEl.val();
    inputEl.val("");
    // clecks to see if input is blank
    if (!cityInput) {
        modal.css('display', 'block');
        return;
    }
    
    createLocalEvents(cityInput);
});
// When the user clicks on <span> (x), close the modal
x.on('click', () => {
    modal.css('display', 'none');
});

window.onload = function () {
    $('.date').each(function () {
        var id = $(this).attr('id');
        var text2 = JSON.parse(localStorage.getItem(id));
        if (text2 !== null) {
            var eventButton = $('<button>');
            eventButton.addClass('y w-full bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring');
            eventButton.attr('id', id);
            eventButton.text(text2.eventTitle);
            $(this).append(eventButton);
            // class selecter for the new buttons 
             var buttutu = $('.y');
        // click listener for new buttons
        buttutu.click((event) => {
        var newForm = JSON.parse(localStorage.getItem(event.target.id));

        eventName.val(newForm.eventTitle);
        eventTime.val(newForm.time);
        eventDetails.val(newForm.details);
        modal2El.css('display', 'block');
    })

        }
    });
}


var holidayButton = $('#holidays');
var holidayRemove = $('#holidays2');
holidayRemove.hide();
holidayButton.on('click', ()=>{
    apiKey="e4ed267f8e2a8e059e5a491b2d1b399f961485e0"
    holidayButton.hide();
    holidayRemove.show();
    fetch(`https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=US&year=${currentYear}&month=${currentMonth}`, {
        
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i=0; i<data.response.holidays.length; i++){
                var holidayBtn= $('<button>');
                holidayBtn.addClass('z w-full bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring');
                holidayBtn.attr('id', "holi-"+(i+1));
                holidayBtn.text(data.response.holidays[i].name);
                formObject.eventTitle= data.response.holidays[i].name;
                formObject.details= data.response.holidays[i].description;
                localStorage.setItem("holi-"+(i+1), JSON.stringify(formObject));
                if (i+1 == data.response.holidays.length){
                    $('#key-'+(data.response.holidays[i].date.datetime.day)).append(holidayBtn);
                    return;
                }
                if(data.response.holidays[i].name!==data.response.holidays[i+1].name){
                    $('#key-'+(data.response.holidays[i].date.datetime.day)).append(holidayBtn);
                }
                $('.z').click((event)=>{
                    var newForm = JSON.parse(localStorage.getItem(event.target.id));
                    eventName.val(newForm.eventTitle);
                    eventTime.val(newForm.time);
                    eventDetails.val(newForm.details);
                    modal2El.css('display', 'block');
                    
                })
                holidayRemove.on('click',()=>{
                    $('.z').remove();
                    holidayRemove.hide();
                    holidayButton.show();
                })
            }
        })

})
 