//Modal button toggle

const UWU = {
    initialize: function (){
        for (i = 0; i < document.getElementsByClassName('uwu-primary').length;i++)
        {
            let btn = document.getElementsByClassName('uwu-primary')[i];
            let btnAction = btn.getAttribute('action');
            let btnTargetValue = btn.getAttribute('target');
            let btnTarget = document.getElementById(btnTargetValue);
            btn.addEventListener('click', function () {UWU.event(btnTarget,btnAction)});
        }

            for (i = 0; i < document.getElementsByClassName('uwu-modal-close').length;i++)
        {
            let btn = document.getElementsByClassName('uwu-modal-close')[i];
            let btnAction = 'toggle';
            let btnTargetValue = btn.getAttribute('target');
            let btnTarget = document.getElementById(btnTargetValue);
            btn.addEventListener('click', function () {UWU.event(btnTarget,btnAction)});
        }
    },

    event: function (target,action) {
        if (action == 'toggle', target.getAttribute('class') == 'uwu-modal') {
            UWU.toggleModal(target);
        }
        if (action == 'toggle', target.getAttribute('class') == 'uwu-accordion') {
            UWU.toggleAccordion(target);
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
    toggleAccordion: function (target) {
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
    }
    
}

addEventListener('DOMContentLoaded',function (){UWU.initialize()});