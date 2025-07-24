let elementToAdd = 0;

// If loading for the first time, save some default data to local storage
if (localStorage.getItem('categories') == null)
{
    localStorage.setItem('categories', JSON.stringify(['Default']));
    localStorage.setItem('Default',JSON.stringify(['Add Bookmark','#add-bookmark-modal','favicons/add-bookmark.svg']));

}

let bookmarkCollections = JSON.parse(localStorage.getItem('categories'));

//URL validator, not my code. Source >>> (https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/#heading-example-of-url-constructor-method)
const isValidUrl = urlString=> {
      try { 
          return Boolean(new URL(urlString)); 
      }
      catch(e){ 
          return false; 
      }
  }

//Parses the 'categories' array within localStorage and construct accordions for each item in the array
for (let i = 0; i < bookmarkCollections.length; i++)
{
	let collectionName = bookmarkCollections[i];

    let collectionAccordion = accordionConstructor(collectionName);
    elementToAdd = collectionAccordion;
    document.body.appendChild(elementToAdd);
}

//Constructs the accordion element based on the input 'name'. Things are constructed using the standard format that Bootstrap accordion elements are setup in the HTML document, then passes the element to the HTML. Allows for dynamically generated HTML elements to be created from the data in the browser's localStorage.
function accordionConstructor(name = '') {
    let htmlFriendlyName = name.toLowerCase();
    htmlFriendlyName = htmlFriendlyName.replaceAll(' ', '-');

    let accordionContainer = document.createElement('div');

    accordionContainer.setAttribute('class','accordion');
    accordionContainer.setAttribute('id',htmlFriendlyName);

    let accordionItem = document.createElement('div');
    accordionItem.setAttribute('class','accordion-item');

    let itemH2 = document.createElement('h2');
    itemH2.setAttribute('class','accordion-header');

    let accordionButton = document.createElement('button');
    accordionButton.setAttribute('class','accordion-button');
    accordionButton.setAttribute('type','button');
    accordionButton.setAttribute('data-bs-toggle','collapse');
    accordionButton.setAttribute('data-bs-target','#collapse-' + htmlFriendlyName);
    accordionButton.setAttribute('aria-expanded','true');
    accordionButton.setAttribute('aria-controls','collapse-' + htmlFriendlyName);
    let buttonLabel = document.createTextNode(name);
    accordionButton.appendChild(buttonLabel);

    let accordionCollapse = document.createElement('div');
    accordionCollapse.setAttribute('id','collapse-' + htmlFriendlyName);
    accordionCollapse.setAttribute('class','accordion-collapse collapse show');
    accordionCollapse.setAttribute('data-bs-parent','#' + htmlFriendlyName);

    let accordionBody = document.createElement('div');
    accordionBody.setAttribute('class','accordion-body');

    let bookmarkContainer = document.createElement('div');
    bookmarkContainer.setAttribute('class','bookmark-container');
    bookmarkContainer.setAttribute('id',htmlFriendlyName + '-container');

    //Checks local storage for all bookmarks under this accordion's category name, then calls the bookmarkConstructor for each index
    const catAry = JSON.parse(localStorage.getItem(name));
    
    for (let i = 0; i < catAry.length / 3; i++) {
        let bmAry = [catAry[i*3], catAry[i*3+1], catAry[i*3+2]];

        let bmItem = bookmarkConstructor(bmAry[0],bmAry[1],bmAry[2]);
        bookmarkContainer.appendChild(bmItem);
    }

    //Formats all the elements and sends the container back as a return value, allowing this function to be used as if it were an object
    accordionBody.appendChild(bookmarkContainer);
    accordionCollapse.appendChild(accordionBody);
    itemH2.appendChild(accordionButton);
    accordionItem.appendChild(itemH2);
    accordionItem.appendChild(accordionCollapse);
    accordionContainer.appendChild(accordionItem);
    
    return accordionContainer;
}

//Adds the options for the category selector in the 'add-category' modal based on the 'categories' array in localStorage
selectorConstructor(document.getElementById('category-selector'));

function selectorConstructor(selector) {
    for (let i = 0; i < bookmarkCollections.length; i++) {
        let option = document.createElement('option');
        let optionText = document.createTextNode(bookmarkCollections[i]);
        option.appendChild(optionText);

        selector.appendChild(option);
    }
}

//Saves new bookmark data to localStorage
function saveBookmark(newSiteLabel, newSiteUrl, newSiteFavicon, newSiteCategory) {
    if (newSiteLabel =='' || isValidUrl(newSiteUrl) == false || isValidUrl(newSiteFavicon) == false || newSiteCategory ==''){
        alert('Please fill all fields or press close.') // replace with an animation, header text, and highlighting missing fields
    }
    else {
        alert('New bookmark added!') //replace with a message box that animates and fades away

        let bookmarkData = [newSiteLabel,newSiteUrl,newSiteFavicon];

        let newData = JSON.parse(localStorage.getItem(newSiteCategory));
        newData.push(bookmarkData[0], bookmarkData[1], bookmarkData[2]);
        localStorage.setItem(newSiteCategory,JSON.stringify(newData));
    }
}

document.getElementById('save-bookmark-button').addEventListener('click',() => saveBookmark(document.getElementById('site-label').value,document.getElementById('site-url').value,document.getElementById('site-favicon').value,document.getElementById('category-selector').value));

document.getElementById('save-category-button').addEventListener('click',() => saveCategory(document.getElementById('category-name').value));

//Saves a new category to local storage with the add bookmark button
function saveCategory(newCategory) {
    let categoriesNew = JSON.parse(localStorage.getItem('categories'));
    categoriesNew.push(newCategory);
    localStorage.setItem('categories',JSON.stringify(categoriesNew));
    localStorage.setItem(newCategory,JSON.stringify(['Add Bookmark','#add-bookmark-modal','favicons/add-bookmark.svg']))
    document.body.appendChild(accordionConstructor(newCategory));
}

//Needs to be reworked, instead of having an <a> or <button> as the container, use a div or span and then go fix the CSS.

//Creates elements for a bookmark link based on the input parameters
function bookmarkConstructor(bmLabel, bmLink, bmFavicon){

    let bmItem = document.createElement('button');
    let bmAnc = document.createElement('a');
    let returnItem = 0;
    bmItem.setAttribute('class','bookmark-button');
    bmItem.setAttribute('type','button');
    bmItem.setAttribute('data-bs-target',bmLink);

    let bmIcon = document.createElement('img');
    bmIcon.setAttribute('src',bmFavicon);

    bmItem.appendChild(bmIcon);

    //Some programmers hate nesting functions or loops inside functions or loops. Since this whole section needs to be reworked anyways, I'm leaving it be for now. The reason this can be frowned upon is due to the script being a little less readable each time something gets nested another layer deep. This video explains it more in depth than I can, and even lays out some techniques for avoiding this issue. >>> (https://www.youtube.com/watch?v=CFRhGnuXG-4)
    if (bmLink == '#add-bookmark-modal'){
        bmItem.setAttribute('data-bs-toggle','modal');
        returnItem = bmItem;
    }
    else {
        bmAnc.appendChild(bmItem);
        bmAnc.setAttribute('href',bmLink);
        bmAnc.setAttribute('target','_blank');
        returnItem = bmAnc;
    }
    return(returnItem);
}

//If you're reading this, hi, and thank you :3
// ~Jamie S Bell