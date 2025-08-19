isNewUser = true;
if (!localStorage.getItem('categories') == undefined) {isNewUser = false;}
if (isNewUser == true) {
    isNewUser = false;
    UwuModal.show('new-user-modal');
}


const Handler = {
    event: function(data) {
        if (data.event == 'right-click') {RCM.event(data.rcmData)}
        if (data.event == 'build-block') {Builder.block(data.block)}
    }
};
const RCM = {
    event: function(data) {
        if (RCM.canDisplay == true) {
            if (data.elementType == 'body') {RCM.body(data)}
            if (data.elementType == 'uwu-shelf-head') {RCM.shelfHead(data)}
            if (data.elementType == 'uwu-shelf-body') {RCM.shelfBody(data)}
            if (data.elementType == 'uwu-bookmark') {RCM.bookmark(data)}
            if (data.elementType == 'uwu-cluster') {RCM.cluster(data)}
            if (data.elementType == 'uwu-widget') {RCM.widget(data)}
            if (data.elementType == 'uwu-sticky') {RCM.sticky(data)}
        }
    },
    canDisplay: true,
    body: function() {},
    shelfHead: function() {},
    shelfBody: function() {},
    bookmark: function() {},
    cluster: function() {},
    widget: function() {},
    sticky: function() {},
    close: function() {}
};
const Builder = {
  block: function(data) {
        if (data.blockType == 'shelf') {Builder.shelf(data.shelfData)}
        if (data.blockType == 'widget') {Builder.widget(data.widgetData)}
    },
  shelfLink: function(data) {
        if (data.type == 'bookmark') {Builder.bookmark(data)}
        if (data.type == 'cluster') {Builder.cluster(data)}

    },
  shelf: function(data) {
        let shelfBody = document.createElement('div');
        shelfBody.setAttribute('class','uwu-shelf-body');
        for (let i = 0; i < data.shelf.links.length; i++)
        {
            shelfBody.appendChild(Builder.shelfLink(data.shelf.links[i]));
        }

        let shelfLabel = document.createTextNode(data.shelf.name);

        let shelfHead = document.createElement('div');
        shelfHead.setAttribute('class','uwu-shelf-head');
        shelfHead.addEventListener('click',function() {Handler.event({target:data.shelf.htmlId, action:'toggle'})});
        shelfHead.appendChild(shelfLabel);

        let shelf = document.createElement('div');
        shelf.setAttribute('id',data.shelf.htmlId);
        shelf.setAttribute('class','uwu-shelf');
        shelf.setAttribute('name',data.shelf.name);
        shelf.appendChild(shelfHead);
        shelf.appendChild(shelfBody);
    },
  button: function(data) {},
  widget: function(data) {},
  bookmark: function(data) {
        let bmImg = document.createElement('img');
        bmImg.setAttribute('src',StringCheese.iconFromUrl(data.link));
        bmImg.setAttribute('class', 'uwu-bookmark-icon');

        let bmA = document.createElement('a'); 
        bmA.setAttribute('class', 'uwu-bookmark');
        bmA.setAttribute('href',data.link);
        bmA.setAttribute('label',data.label);
        bmA.appendChild(bmImg);
        return(bmA);
    },
  cluster: function(data) {},
};

const StringCheese = {
    iconFromUrl: function(url) {return('http://www.google.com/s2/favicons?domain='+url+'&sz=128')},
    nameToHtmlId: function(name) {
            name = name.replace(' ', '-');
            name = name.replace('.', '%p');
            return(name.toLowerCase());
        },

}

const UserInterface = {

}

const UwuModal = {
    isShowing: false,
    canShow: true,
    show: function(id) {
        let modal = document.getElementById(id);
        modal.setAttribute('state',visible);
    },
    hide: function(id) {
        let modal = document.getElementById(id);
        modal.setAttribute('state',hidden);
    },
    save: function(id) {
        let fields = document.getElementById(id).childNodes;

        for (let i = 0; i < fields.length; i++) {
            let name = fields[i].getAttribute('name');
            let dataToSave = fields[i].value;
        }
    },
}