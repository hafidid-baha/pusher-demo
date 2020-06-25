window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER
    // forceTLS: true
});


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: process.env.MIX_PUSHER_APP_CLUSTER
});

var channel = pusher.subscribe('main-channel');
channel.bind('share-event', function(data) {
    alert(JSON.stringify(data));
});


// listen to online channel
window.Echo.join('online')
            .here(users => {
                // get html elements
                var liveUsers = document.querySelector("#online");
                
                
                users.forEach(u => {
                    // create new para element
                    var user = document.createElement("P");
                    // add the user name to the online list
                    user.appendChild(document.createTextNode(u.name));
                    liveUsers.appendChild(user);
                });
            })
            .joining(u => {
                // get html elements
                var liveUsers = document.querySelector("#online");

                // create new para element
                var user = document.createElement("P");
                // add the user name to the online list
                user.appendChild(document.createTextNode(u.name));
                liveUsers.appendChild(user);
            })
            .leaving(u => {
                var parags = document.querySelectorAll("#online p");
                parags.forEach(p => {
                    if(p.textContent == u.name){
                        //remove the user name from list
                        p.parentNode.removeChild(p);
                    }
                });
            })
            // .leaving(user => (this.users = this.users.filter(u => (u.id !== user.id))))
