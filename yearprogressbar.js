
// eslint-disable-next-line linebreak-style

    // choices
var titleBefore = false;
var titleBeforeText = "Year in progress: ";
var titleAfterText = "% of year elapsed";
let decimalPlaces = 1; // recommend 1 to 5, 0 rounds up, 5 lets you see some nice movement


const currentYear = new Date().getFullYear();
changeTitle();                                      // sets the title so there is no delay

    window.onload = function newUpdate() {
    update = setInterval(changeTitle, 800);
        save = setInterval(saveAllContent, 2000);
        //loadContent('taNotes', 'lsNotes', 'Start here...');
        loadAllContent();



    }



    function changeTitle() {
    // change title, formatted either before or after style
    titleBefore ? document.title = titleBeforeText + getYearProgress() + '%' : document.title = getYearProgress() + titleAfterText;
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

        return yearElapsedPercentage.toFixed(decimalPlaces);
    }



    function saveAllContent() {
    saveContent('taNotes', 'lsNotes', 'Start here...');
        saveContent('taGoalsToday', 'lsGoalsToday', 'Start goals today here...');
        saveContent('taGoalsWeek', 'lsGoalsWeek', 'Start goals week here...');
        saveContent('taGoalsMonth', 'lsGoalsMonth', 'Start goals month here...');
        saveContent('taGoalsYear', 'lsGoalsYear', 'Start goals year here...');
        saveContent('taHabits', 'lsHabits', 'Start habits here...');
    }


    function saveContent(inputID, storageID, placeholderText) {
        var content = document.getElementById(inputID).value;
        localStorage.setItem(storageID, content);
        loadContent(inputID, storageID, placeholderText);
    }




    function loadAllContent() {
    loadContent('taNotes', 'lsNotes', 'Start here...');
        loadContent('taGoalsToday', 'lsGoalsToday', 'Start goals today here...');
        loadContent('taGoalsWeek', 'lsGoalsWeek', 'Start goals week here...');
        loadContent('taGoalsMonth', 'lsGoalsMonth', 'Start goals month here...');
        loadContent('taGoalsYear', 'lsGoalsYear', 'Start goals year here...');
        loadContent('taHabits', 'lsHabits', 'Start habits here...');
    }


    function loadContent(inputID, storageID, placeholderText) {
        document.getElementById(inputID).setAttribute("placeholder", '');
        var content = localStorage.getItem(storageID);

        if (content.length > 0) {
            document.getElementById(inputID).value = content;
            //document.getElementById(inputID).focus();
        }
        else {
            document.getElementById(inputID).setAttribute("placeholder", placeholderText);
        }

    }


