/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */

// eslint-disable-next-line linebreak-style

    // choices
var titleBefore = false;
var titleBeforeText = 'Year in progress: ';
var titleAfterText = '% of year elapsed';
let decimalPlacesYear = 1; // recommend 1 to 5, 0 rounds up, 5 lets you see some nice movement
let decimalPlacesDay = 1;
let decimalPlacesWeek = 1;
let decimalPlacesMonth =1;
var beginHour = 7;
var endHour = 18;
var beginDay = 1;
var WeekDuration= 5;


const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();



changeTitle();                                      // sets the title so there is no delay
//changeProgressStatus();


    window.onload = function newUpdate() {
    update = setInterval(changeTitle, 800);
        progress = this.setInterval(changeProgressStatus, 800);
        save = setInterval(saveAllContent, 2000);
        //loadContent('taNotes', 'lsNotes', 'Start here...');
        loadAllContent();



    }



    function changeTitle() {
    // change title, formatted either before or after style
    // eslint-disable-next-line prefer-template
    titleBefore ? document.title = titleBeforeText + getYearProgress() + '%' : document.title = getYearProgress() + titleAfterText;
    }




function changeProgressStatus(){


    document.getElementById('spTodayElapsed').innerHTML = '' + getDayProgress() + ' % of today has elapsed';
    document.getElementById('spWeekElapsed').innerHTML = '' + getWeekProgress() + ' % of week has elapsed';
    document.getElementById('spMonthElapsed').innerHTML = '' + getMonthProgress() + ' % of month has elapsed';
    document.getElementById('spYearElapsed').innerHTML = '' + getYearProgress() + ' % of year has elapsed';
}



    function isLeapYear() {
        // returns true or false depending on the conditions being met
        // exactly divisible by 4 but not 100 OR exactly divisible by 100
        return ((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0);
    }


    function getTotalDays() {
        const leapYearDays = 366;
        const normalYearDays = 365;

        // if true, returns 366 else returns 365
        return isLeapYear() ? leapYearDays : normalYearDays;
    }


    function getYearProgress() {

        var now = new Date();
        var yearStart = new Date(currentYear, 0, 1);
        var yearElapsed = now - yearStart;

        // the days need to be multiplied by 24 hours, 60 mins, 60 seconds and 1000 milliseconds so we are using the same units
        // multiply by 100 so it's expressed as a percentage
        yearElapsedPercentage = (yearElapsed / (getTotalDays() * 24 * 60 * 60 * 1000)) * 100;

        return yearElapsedPercentage.toFixed(decimalPlacesYear);
    }


function getDayProgress() {

    var now = new Date();
    var dayStart = new Date(currentYear, currentMonth, currentDay, beginHour, 0, 0, 0);
    var dayElapsed = now - dayStart;

    // the days need to be multiplied by 24 hours, 60 mins, 60 seconds and 1000 milliseconds so we are using the same units
    // multiply by 100 so it's expressed as a percentage
    dayElapsedPercentage = (dayElapsed / (getDayLength(beginHour, endHour))) * 100;

    return dayElapsedPercentage.toFixed(decimalPlacesDay);
}


function getDayLength(beginHour, endHour){
    return (endHour - beginHour) * 60 * 60 * 1000;
}




function getWeekProgress() {

    var now = new Date();
    var dayOfWeek = now.getDay();
    //var weekDuration = Maths.abs(beginDay-endDay) + 1;

    var weekStart = new Date(currentYear, currentMonth, getWeekBeginDate(dayOfWeek), 0, 0, 0, 0); // date of last monday or today if today is monday
    var weekElapsed = now - weekStart;

    // a week in milliseconds is a multiplication of  7 days, 24 hours, 60 mins, 60 seconds and 1000 milliseconds
    // multiply by 100 so it's expressed as a percentage
    weekElapsedPercentage = (weekElapsed / (WeekDuration * 24 * 60 * 60 * 1000)) * 100;
    //weekElapsedPercentage = (weekElapsed / ((beginDay - (endDay + 1))) * 24 * 60 * 60 * 1000)) * 100;

    return weekElapsedPercentage.toFixed(decimalPlacesWeek);
}


// dayofweek is a number of the day where Sunday is 0
// week progress is based on Monday as start of the week
// in the first week of a month this may return a negative value which should result in weekStart being from the previous month
function getWeekBeginDate(dayOfWeek) {
    var weekBeginDate;

    if (dayOfWeek == beginDay) { // if it's a Monday then today is the week beginning
        weekBeginDate = currentDay;
    }
    else if (dayOfWeek > beginDay)  {
        // if it's Tuesday 12th then we need to do 12-1 to get to the start of the week ie 11th
        // Tues is 2 when using getDay ie Sunday is start of week in Javascript
        // therefore subtract 1 to allow for this
        weekBeginDate = currentDay - (dayOfWeek - beginDay);
    }
    else if (dayOfWeek < beginDay) {
        // if it's Tuesday 12th then we need to do 12-1 to get to the start of the week ie 11th
        // Tues is 2 when using getDay ie Sunday is start of week in Javascript
        // therefore subtract 1 to allow for this
        weekBeginDate = currentDay - ((7 + dayOfWeek) - beginDay);
    }

    return weekBeginDate;
}








function getMonthProgress() {

    var now = new Date();
    var monthStart = new Date(currentYear, currentMonth, 1, 1, 0, 0, 0);
    var monthElapsed = now - monthStart;
    var DaysInMonth = new Date(currentYear, (currentMonth+1), 0).getDate();

//alert(DaysInMonth);

    // the days need to be multiplied by 24 hours, 60 mins, 60 seconds and 1000 milliseconds so we are using the same units
    // multiply by 100 so it's expressed as a percentage
    monthElapsedPercentage = (monthElapsed / (DaysInMonth * 24 * 60 * 60 * 1000)) * 100;

    return monthElapsedPercentage.toFixed(decimalPlacesMonth);
}










    function saveAllContent() {
    saveContent('taNotes', 'lsNotes', 'Start here...');
        saveContent('inGoalsToday1', 'lsGoalsToday1', 'goal 1 here...');
        saveContent('inGoalsToday2', 'lsGoalsToday2', 'goal 2 here...');
        saveContent('inGoalsToday3', 'lsGoalsToday3', 'goal 3 here...');
        saveContent('inGoalsToday4', 'lsGoalsToday4', 'goal 4 here...');
        saveContent('inGoalsToday5', 'lsGoalsToday5', 'goal 5 here...');
        saveContent('inGoalsToday6', 'lsGoalsToday6', 'goal 6 here...');
        saveContent('inGoalsToday7', 'lsGoalsToday7', 'goal 7 here...');
        saveContent('inGoalsToday8', 'lsGoalsToday8', 'goal 8 here...');
        saveContent('inGoalsToday9', 'lsGoalsToday9', 'goal 9 here...');
        saveContent('inGoalsWeek1', 'lsGoalsWeek1', 'goal 1 here...');
        saveContent('inGoalsWeek2', 'lsGoalsWeek2', 'goal 2 here...');
        saveContent('inGoalsWeek3', 'lsGoalsWeek3', 'goal 3 here...');
        saveContent('inGoalsWeek4', 'lsGoalsWeek4', 'goal 4 here...');
        saveContent('inGoalsWeek5', 'lsGoalsWeek5', 'goal 5 here...');
        saveContent('inGoalsWeek6', 'lsGoalsWeek6', 'goal 6 here...');
        saveContent('inGoalsMonth1', 'lsGoalsMonth1', 'goal 1 here...');
        saveContent('inGoalsMonth2', 'lsGoalsMonth2', 'goal 2 here...');
        saveContent('inGoalsMonth3', 'lsGoalsMonth3', 'goal 3 here...');
        saveContent('inGoalsMonth4', 'lsGoalsMonth4', 'goal 4 here...');
        saveContent('inGoalsYear1', 'lsGoalsYear1', 'goal 1 here...');
        saveContent('inGoalsYear2', 'lsGoalsYear2', 'goal 2 here...');
        saveContent('inGoalsYear3', 'lsGoalsYear3', 'goal 3 here...');
        saveContent('inGoalsYear4', 'lsGoalsYear4', 'goal 4 here...');

        saveContent('inHabits1', 'lsHabits1', 'habit 1 here...');
        saveContent('inHabits2', 'lsHabits2', 'habit 2 here...');
        saveContent('inHabits3', 'lsHabits3', 'habit 3 here...');
        saveContent('inHabits4', 'lsHabits4', 'habit 4 here...');
        saveContent('inHabits5', 'lsHabits5', 'habit 5 here...');
        saveContent('inHabits6', 'lsHabits6', 'habit 6 here...');

    }


    function saveContent(inputID, storageID, placeholderText) {
        var content = document.getElementById(inputID).value;
        localStorage.setItem(storageID, content);
        loadContent(inputID, storageID, placeholderText);
    }




    function loadAllContent() {
    loadContent('taNotes', 'lsNotes', 'Start here...');
        loadContent('inGoalsToday1', 'lsGoalsToday1', 'goal 1 here...');
        loadContent('inGoalsToday2', 'lsGoalsToday2', 'goal 2 here...');
        loadContent('inGoalsToday3', 'lsGoalsToday3', 'goal 3 here...');
        loadContent('inGoalsToday4', 'lsGoalsToday4', 'goal 4 here...');
        loadContent('inGoalsToday5', 'lsGoalsToday5', 'goal 5 here...');
        loadContent('inGoalsToday6', 'lsGoalsToday6', 'goal 6 here...');
        loadContent('inGoalsToday7', 'lsGoalsToday7', 'goal 7 here...');
        loadContent('inGoalsToday8', 'lsGoalsToday8', 'goal 8 here...');
        loadContent('inGoalsToday9', 'lsGoalsToday9', 'goal 9 here...');
        loadContent('inGoalsWeek1', 'lsGoalsWeek1', 'goal 1 here...');
        loadContent('inGoalsWeek2', 'lsGoalsWeek2', 'goal 2 here...');
        loadContent('inGoalsWeek3', 'lsGoalsWeek3', 'goal 3 here...');
        loadContent('inGoalsWeek4', 'lsGoalsWeek4', 'goal 4 here...');
        loadContent('inGoalsWeek5', 'lsGoalsWeek5', 'goal 5 here...');
        loadContent('inGoalsWeek6', 'lsGoalsWeek6', 'goal 6 here...');
        loadContent('inGoalsMonth1', 'lsGoalsMonth1', 'goal 1 here...');
        loadContent('inGoalsMonth2', 'lsGoalsMonth2', 'goal 2 here...');
        loadContent('inGoalsMonth3', 'lsGoalsMonth3', 'goal 3 here...');
        loadContent('inGoalsMonth4', 'lsGoalsMonth4', 'goal 4 here...');
        loadContent('inGoalsYear1', 'lsGoalsYear1', 'goal 1 here...');
        loadContent('inGoalsYear2', 'lsGoalsYear2', 'goal 2 here...');
        loadContent('inGoalsYear3', 'lsGoalsYear3', 'goal 3 here...');
        loadContent('inGoalsYear4', 'lsGoalsYear4', 'goal 4 here...');

        loadContent('inHabits1', 'lsHabits1', 'habit 1 here...');
        loadContent('inHabits2', 'lsHabits2', 'habit 2 here...');
        loadContent('inHabits3', 'lsHabits3', 'habit 3 here...');
        loadContent('inHabits4', 'lsHabits4', 'habit 4 here...');
        loadContent('inHabits5', 'lsHabits5', 'habit 5 here...');
        loadContent('inHabits6', 'lsHabits6', 'habit 6 here...');
    }


    function loadContent(inputID, storageID, placeholderText) {
        document.getElementById(inputID).setAttribute('placeholder', '');
        var content = localStorage.getItem(storageID);

        if (content.length > 0) {
            document.getElementById(inputID).value = content;
            //document.getElementById(inputID).focus();
        }
        else {
            document.getElementById(inputID).setAttribute('placeholder', placeholderText);
        }

    }


