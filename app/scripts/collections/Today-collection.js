/*global define*/

define([
    'underscore',
    'backbone',
    'models/Issue-model',
    'localstorage'
], function (_, Backbone, TodayModel, localstorage) {
    'use strict';

    var TodayCollection = Backbone.Collection.extend({
        model: TodayModel,
        localStorage: new Backbone.LocalStorage('Today'),

        initialize: function () {
            this.fetch();
        }
    });

    return new TodayCollection();
});