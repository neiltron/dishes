/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/Today-collection'
], function ($, _, Backbone, JST, Today) {
    'use strict';

    var IssueitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/IssueItem.ejs'],
        tagName: 'li',
        className: 'clearfix',

        events: {
            'click button': 'addToToday'
        },

        addToToday: function (e) {
            if (typeof e !== 'undefined') { e.preventDefault(); }

            Today.create(this.model.attributes);
        },

        render: function () {
            $(this.el).html(this.template(this.model.attributes));

            return this;
        }
    });

    return IssueitemView;
});