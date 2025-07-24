//This does nothing so far

if(localStorage.getItem('personalization') == null) {


    let username = 'Jamie';
    let showGreeting = true;

    let isTitleDefault = true;
    let customTitle = '';

    let favicon = '';

    
    let clock = {showClock:false};

    let bmCatDisplay = {};

    let showGear = true;

    let theme = {};
    let bgCats = {};
    let bgCurCat = '';

    let clearOldData = true;



    let personalizationData = [];


    localStorage.setItem('personalization',personalizationData);
}