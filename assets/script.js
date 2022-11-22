// selects Header and event container element
var eventContainer = $('#events-container');
var mainHeader = $('#main-header');

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

// 👇️ Current Month
var daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
// 👇️ first day of the month
var firstDayOfMonth = new Date(`${currentYear}-${currentMonth}-1`).getDay()
// 👇️ what weekday the month starts on
var weekDay = firstDayOfMonth;
// Run create calendar function
createCalendar();
function createCalendar (){
for (let i = 1; i <= daysInCurrentMonth; i++) {
    var dayOfWeek;
    // checks what day should be added 
    if(weekDay==0){dayOfWeek="Sunday";}
    if(weekDay==1){dayOfWeek="Monday";}
    if(weekDay==2){dayOfWeek="Tuesday";}
    if(weekDay==3){dayOfWeek="Wednesday";}
    if(weekDay==4){dayOfWeek="Thursday";}
    if(weekDay==5){dayOfWeek="Friday";}
    if(weekDay==6){dayOfWeek="Saturday";}
    // creates elemenst for the date cards
    var articleEL = $('<article>');
    var cardHeader = $('<div>');
    var headerText = $('<p>');
    var cardText = $('<div>');
    var card = $('<div>');
    var textArea = $('<textarea>');
    var saveButton = $('<button>');
    // adds classes, ids, and appends created elements
    articleEL.addClass("bg-white dark:bg-slate-800 shadow-xl shadow-slate-200 dark:shadow-slate-800 rounded-lg");
    eventContainer.append(articleEL);
    cardHeader.addClass("p-3 shadow bg-indigo-500 text-indigo-50 uppercase grid place-items-center rounded-t-lg");
    articleEL.append(cardHeader);
    headerText.text(dayOfWeek + " "+ i);
    cardHeader.append(headerText);
    cardText.addClass("p-4 md:p-6 lg:p-8 grid gap-4 md:gap-6");
    cardText.attr("id", "date-"+i);
    articleEL.append(cardText);
    card.addClass("grid gap-1");
    cardText.append(card);
    textArea.attr("id", "date-"+i);
    textArea.addClass("bg-white dark:bg-slate-800 shadow-xl shadow-slate-200 dark:shadow-slate-800")
    card.append(textArea);
    saveButton.text("Save");
    saveButton.addClass('btn bg-indigo-500 my-1 rounded-md px-4 py-1 text-indigo-50 shadow-black-200 dark:shadow-none text-center font-bold hover:showdow-none ring ring-offset-0 ');
    card.append(saveButton);
    // keeps trak of the days
    if(weekDay>=6){
        weekDay=0;
    }else{
        weekDay++;
    }
}
}
// saves on save button click
var saveButtonsEl = $('.btn')
saveButtonsEl.click(function(){
    var id = $(this).prev().attr('id');
    console.log(id);
    var value = $(this).prev().val();
    localStorage.setItem(id, value);
    
  })
//   onload it loads current local storage
  window.onload = function() {        
    $('textarea').each(function(){    
       var id = $(this).attr('id');
       var text2 = localStorage.getItem(id);
       if (text2 !== null) $(this).val(text2);
    }); 
   }
