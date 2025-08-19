//UWU.js

const UWU = {
        initialize: function (){
            for (let i = 0; i < document.getElementsByClassName('uwu-primary').length;i++)
            {
                let btn = document.getElementsByClassName('uwu-primary')[i];
                let btnAction = btn.getAttribute('action');
                let btnTargetValue = btn.getAttribute('target');
                let btnTarget = document.getElementById(btnTargetValue);
                btn.addEventListener('click', function () {UWU.event(btnTarget,btnAction)});
            }

                for (let i = 0; i < document.getElementsByClassName('uwu-modal-close').length;i++)
            {
                let btn = document.getElementsByClassName('uwu-modal-close')[i];
                let btnAction = 'toggle';
                let btnTargetValue = btn.getAttribute('target');
                let btnTarget = document.getElementById(btnTargetValue);
                btn.addEventListener('click', function () {UWU.event(btnTarget,btnAction)});
            }
        },

        event: function (target,action,data) {
            if (action == 'toggle' && target.getAttribute('class') == 'uwu-modal') {
                UWU.toggleModal(target);
            }
            if (action == 'toggle' && target.getAttribute('class') == 'uwu-shelf') {
                UWU.toggleShelf(target);
            }
            if (action == 'save' && target.getAttribute('class') == 'uwu-modal') {
                UWU.saveModal(target);
            }
        },
        toggleModal: function (target,at,value1,value2) {
            if (target.getAttribute('state') == 'hidden') {
                target.setAttribute('state', 'visible');

                let darkenEffect = document.createElement('div');
                darkenEffect.setAttribute('class','dark-bg');
                document.body.appendChild(darkenEffect);
            }
            else {
                target.setAttribute('state', 'hidden');
                document.body.removeChild(document.getElementsByClassName('dark-bg')[0]);
            }
        },
        toggleShelf: function (target) {
            if (target.getAttribute('state') == 'closed') {
                target.setAttribute('state', 'open');
            }
            else {
                target.setAttribute('state', 'closed');
            }
        },
        htmlNameify: function (name) {
            let htmlFriendlyName = name.toLowerCase();
            htmlFriendlyName = htmlFriendlyName.replace(' ', '-');
            htmlFriendlyName = htmlFriendlyName.replace('.', '%p');

            return(htmlFriendlyName);
        },
        saveModal: function (target, data) {
            if (target.getAttribute('id') == 'new-shelf-modal') {
                let name = target.getElementsByClassName('shelf-name')[0].value;
                let color = target.getElementsByClassName('shelf-color')[0];
                let bookmarks = target.getElementsByClassName('shelf-import-bookmarks')[0];
                let oldData = JSON.parse(localStorage.getItem('categories'));
                console.log(oldData);
                let newData = {'name':name, bookmarks:[{label:'Student Portal',link:'https://classesportal.com'}]};
                console.log(newData);
                localStorage.setItem('categories', JSON.stringify(oldData.concat(newData)));
            }

            if (target.getAttribute('id') == 'add-bookmark-modal') {
                let oldData = JSON.parse(localStorage.getItem('categories'));
                let catName = data.categoryName;
                let bmLabel = data.bookmarkLabel;
                let bmLink = data.bookmarkLink;
                let selectedCategory = oldData[oldData.findIndex(category => category.name == catName)];

                selectedCategory.bookmarks = selectedCategory.bookmarks.concat({label:bmLabel,link:bmLink});

                let newData = (oldData[oldData.findIndex(category => category.name == catName)].bookmarks = selectedCategory.bookmarks);
            }
        }
        
}

addEventListener('DOMContentLoaded',function (){UWU.initialize()});

//UWU-custom-homepage.js

const UWU_Mommy = {
    button: function (type,data) {
        if (type == 'modalCLose') {
        let btn = document.createElement('button');
        btn.setAttribute('class','uwu-modal-close');
        btn.setAttribute('type','button');
        btn.setAttribute('target',UWU.htmlNameify(data['target']));
        btn.setAttribute('action',data['action']);
        btn.addEventListener('click',UWU.event(data['target'],data['action']));
        return(btn);
        }

        if (type == 'primary') {
        let btn = document.createElement('button');
        btn.setAttribute('class','uwu-primary');
        btn.setAttribute('type','button');
        btn.setAttribute('target',UWU.htmlNameify(data['target']));
        btn.setAttribute('action',data['action']);

        let txt = document.createTextNode(data['label']);
        btn.appendChild(txt);
        btn.addEventListener('click',UWU.event(data['target'],data['action']));
        return(btn);
        }

        if (type == 'shelfLabel') {
        let btn = document.createElement('button');
        btn.setAttribute('class','uwu-shelf-label');
        btn.setAttribute('type','button');
        btn.setAttribute('target',UWU.htmlNameify(data.label));
        btn.setAttribute('action',data['action']);

        let txt = document.createTextNode(data['label']);
        btn.appendChild(txt);
        btn.addEventListener('click',function (){UWU.event(data['target'],data['action'])});
        return(btn);
        }

        if (type == 'saveBookmark')
        {

        }

    },
    modal: function (name, label, state, data) {
        let modal = document.createElement('div');
        modal.setAttribute('class','uwu-modal');
        modal.setAttribute('id',UWU.htmlNameify(name));
        modal.setAttribute('state',state);
        
        let hd = document.createElement('button');
        hd.setAttribute('class','uwu-modal-header');

        let h2 = document.createElement('h2');
        let h2Txt = document.createTextNode(label);
        h2.appendChild(h2Txt);

        let xBtn = UWU_Mommy.button('modalClose',{'target':name, 'action':'toggle'});

        let bdy = document.createElement('div');
        bdy.setAttribute('class','uwu-modal-content');

        let ft = document.createElement('div');
        ft.setAttribute('class','uwu-modal-footer');

        let ftCloseBtn = UWU_Mommy.button('primary',{'target':name, 'label':'Close', 'action':'toggle'});

        modal.appendChild(hd);
        modal.appendChild(bdy);
        modal.appendChild(ft);
        hd.appendChild(h2);
        hd.appendChild(xBtn);
        ft.appendChild(ftCloseBtn);
        return(modal);
    },
    shelf: function (cat) {
        let shelf = document.createElement('div');
        shelf.setAttribute('class','uwu-shelf');
        shelf.setAttribute('id',UWU.htmlNameify(cat.name));
        shelf.setAttribute('state','closed');
        shelf.addEventListener('contextmenu',function() {})

        let hd = document.createElement('div');
        hd.setAttribute('class','uwu-shelf-header');
        hd.addEventListener('click', function() {UWU.event(shelf,'toggle')});

        let hdLabel = document.createElement('h2');
        let hdLabelText = document.createTextNode(cat.name);

        let bdy = document.createElement('div');
        bdy.setAttribute('class','uwu-shelf-body');
        
        for (let i = 0; i < cat.bookmarks.length; i++) {
            bdy.appendChild(UWU_Mommy.bookmark(cat.bookmarks[i]));
        }
        shelf.appendChild(hd);
        hd.appendChild(hdLabel);
        hdLabel.appendChild(hdLabelText);
        shelf.appendChild(bdy);
        return(shelf);
        

    },
    bookmark: function (bm) {
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class','uwu-bookmark');

        let anc = document.createElement('a');
        anc.setAttribute('href',bm.link);
        anc.setAttribute('uwu','uwu-bookmark');

        let icon = document.createElement('img');
        icon.setAttribute('src','http://www.google.com/s2/favicons?domain=' + bm.link + '&sz=128');
        icon.setAttribute('alt',bm.label);
        icon.setAttribute('uwu','uwu-bookmark');

        wrapper.appendChild(anc);
        anc.appendChild(icon);
        return(wrapper);
    }
}

const UWU_Daddy = {
    loadElement: function(element,parent) {
        parent.appendChild(element);
    },
    loadPageData: function() {
        let cats = localStorage.getItem('categories');
        cats = JSON.parse(cats);


        if (cats == undefined) {
            localStorage.setItem('categories',JSON.stringify([{
            name:'Default',
            bookmarks:[{label:'Student Portal',link:'https://classesportal.com'}]}]));
        }
        
        for (let i = 0; i < cats.length; i++) {
            let cat = cats[i];
            console.log(cat);
            UWU_Daddy.loadElement(UWU_Mommy.shelf(cat),document.body);
        }
    }
}

addEventListener('DOMContentLoaded',function() {UWU_Daddy.loadPageData()});

let rcm = document.getElementsByClassName('uwu-rcm')[0];
let rcmMain = document.getElementsByClassName('uwu-rcm-sub')[0];
let rcmBookmark = document.getElementsByClassName('uwu-rcm-sub')[1];
let rcmShelfHd = document.getElementsByClassName('uwu-rcm-sub')[2];
let rcmShelfBdy = document.getElementsByClassName('uwu-rcm-sub')[3];

document.body.addEventListener('click',function (e){rcm.setAttribute('state','hidden')});



const contextMenu = {
    isVisible: 'none',
    canShow: true,
    bookmark: {edit:'',delete:'',move:'',duplicate:'',new:''},
    main: {newShelf:'',newWidget:'',background:'',theme:'',edit:''},
    shelfHd: {edit:'',export:'',delete:'',import:''},
    shelfBdy: {newBookmark:'',newCluster:''},
    cluster: {edit:'',import:'',delete:''},

    click: function (e) {
    
    let element = document.querySelectorAll(':hover');
    element = element[element.length - 1];

    rcmBookmark.style.display = 'none';
    rcmShelfHd.style.display = 'none';
    rcmShelfBdy.style.display = 'none';
    rcmMain.style.display = 'none';

    rcm.style.position = 'absolute'; 
    rcm.style.left = e.pageX + 'px'; 
    rcm.style.top = e.pageY + 'px'; 
    rcm.setAttribute('state','visible');

    if (element.getAttribute('class') == 'uwu-shelf-header' || element.getAttribute('class') == 'uwu-shelf-label') {rcmShelfHd.style.display = 'flex';}

    if (element.getAttribute('class') == 'uwu-shelf-body') {rcmShelfBdy.style.display = 'flex';}

    if (element == document.body) {rcmMain.style.display = 'flex';}

    if (element.getAttribute('uwu') == 'uwu-bookmark') {rcmBookmark.style.display = 'flex';}

    if (element.getAttribute('uwu') == 'uwu-cluster') {rcmCluster.style.display = 'flex';}
    
    }

};

document.body.addEventListener('contextmenu',function (e) {
    e.preventDefault();
    contextMenu.click(e);
});