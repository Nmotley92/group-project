
// Grab users Geolocation
//set variables for user confirming or denying geolocation
const successCallback = (position) => {
    console.log(position)
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
// create varaiables 

            
    createLocalEventsGeo();

function createLocalEventsGeo(lat, long) {
    var apiKey = "MzA0NzM4MTd8MTY2ODc0MTg3OC41MTA0NzE4";
   
   var long = position.coords.longitude
   var lat = position.coords.latitude

    fetch(`https://api.seatgeek.com/2/events?lat=${lat}&lon=${long}&client_id=${apiKey}&per_page=25`, {

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
            var formObject = {
                key: "",
                date: "",
                eventTitle: "",
                time: "",
                details: ""
            };

            for (let i = 0; i < data.events.length; i++) {
                // creats a clickable image
                var containerImgEl = $('<div>');
                var imageEL = $('<img>');
                // var aEL = $('<a>');
                var thirdDivEl = $('<div>');
                var foruthDivEl = $('<div>');
                var fifthDiveEl = $('<div>');
                var h5El = $('<h5>');
                var pel = $('<p>');
                var newButton = $('<a>');

                // pulls and assigns data from fetch
                var imgSrc = data.events[i].performers[0].image;
                var link = data.events[i].url;
                var title = data.events[i].title + " " + data.events[i].type;
                var time = new Date(data.events[i].datetime_local).toLocaleString();
                var time2 = new Date(data.events[i].datetime_local).getDate();
                var time3 = new Date(data.events[i].datetime_local).toLocaleTimeString();
                var month = new Date(data.events[i].datetime_local).getMonth()+1;
                var copyButtonEl = $('<button>');
                copyButtonEl.addClass('copy float-right w-auto bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring');
                copyButtonEl.text("Add to calendar");
                copyButtonEl.attr("value", title);
                copyButtonEl.attr("id", "key-"+time2);



                // adds classes for the image container
                containerImgEl.addClass("relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg");
                containerImgEl.attr("style", 'background-position: 50%;');
                containerImgEl.attr("data-mdb-ripple", 'true');
                containerImgEl.attr("data-mdb-ripple-color", 'life');
                imageEL.addClass("w-full");
                thirdDivEl.addClass("absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed");
                thirdDivEl.attr("style", "background-color: rgba(0, 0, 0, 0.4)");
                foruthDivEl.addClass("flex justify-start items-end h-full");
                fifthDiveEl.addClass("w-full text-white m-6");
                h5El.addClass(' font-bold text-lg mb-3');
                pel.addClass('font-bold text-lg mb-3');
                // adds src and href
                imageEL.attr("src", imgSrc);
                newButton.attr("href", link);
                newButton.attr("target", "_blank");
                newButton.addClass("w-auto float-left bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring")
                //  puts the text for title and time
                h5El.text(title);
                pel.text(time);
                newButton.text("Buy tickets");
                // adds all the above to page

                localEventCont.append(containerImgEl);
                containerImgEl.append(imageEL);
                // containerImgEl.append(aEL);

                containerImgEl.append(thirdDivEl);
                thirdDivEl.append(foruthDivEl);
                foruthDivEl.append(fifthDiveEl);
                fifthDiveEl.append(h5El);
                fifthDiveEl.append(pel);
                fifthDiveEl.append(newButton);
                fifthDiveEl.append(copyButtonEl);
                formObject.eventTitle = title;
                formObject.time = time3;
                formObject.date= "#key-"+time2;
                formObject.key = title;
                localStorage.setItem(title, JSON.stringify( formObject));
                if(month>currentMonth){
                    copyButtonEl.hide();
                }

            }
            // listen event for adding local events to the calendar
            $('.copy').click((event) => {
                var formObject = JSON.parse(localStorage.getItem(event.target.value));
                formArray.push(formObject);
                localStorage.setItem("allButtons", JSON.stringify(formArray));
                var eventButton = $('<button>');
                eventButton.addClass('x w-full bg-grey-500 rounded-md mb-1 px-4 py-1 text-black-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring');
                eventButton.attr('id', event.target.id);
                eventButton.text(event.target.value);
                eventButton.attr('value', event.target.value);
                $("#" +event.target.id).append(eventButton);
                // formArray.push(formObject);
                
                var buttutu = $('.x');
                // click listener for new buttons
                buttutu.click((event) => {
                    var newForm = JSON.parse(localStorage.getItem(event.target.value));
                    // saveForm.hide();
                    eventName.val(newForm.eventTitle);
                    eventTime.val(newForm.time);
                    eventDetails.val(newForm.details);
                    modal2El.css('display', 'block');
                })
              
        

            })

        });

}


};
const errorCallback = (error) => {
    console.log(error)
}
// call for user to be prompted for their location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

