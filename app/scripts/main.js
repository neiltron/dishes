/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        localstorage: {
            deps: [
                'backbone'
            ],
            exports: 'Backbone'
        },
        moment: {
            deps: [
                'jquery'
            ],
            exports: 'jquery'
        },
        livestamp: {
            deps: ['moment'],
            exports: 'livestamp'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        localstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
        moment: '../bower_components/moment/moment',
        livestamp: '../bower_components/livestampjs/livestamp',
        oauth: 'vendor/oauth',
    }
});

require([
    'backbone', 'routes/application-router', 'livestamp'
], function (Backbone, ApplicationRouter, livestamp) {
    new ApplicationRouter();
    Backbone.history.start();
});
