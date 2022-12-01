
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

    fetch(`https://api.seatgeek.com/2/events?lat=${lat}&lon=${long}&client_id=${apiKey}`, {

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


};
const errorCallback = (error) => {
    console.log(error)
}
// call for user to be prompted for their location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

