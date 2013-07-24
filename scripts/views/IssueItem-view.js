/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var IssueitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/IssueItem.ejs'],
        tagName: 'li',
        className: 'clearfix',

        events: {
            'click button': 'toggleToday'
        },

        initialize: function () {
            this.model.bind('change', this.render, this);
        },

        toggleToday: function (e) {
            if (typeof e !== 'undefined') { e.preventDefault(); }

            if (!this.model.get('active')) {
                this.model.set('active', true);
            } else {
                this.model.set('active', false);
            }
        },

        render: function () {
            $(this.el).html(this.template(this.model.attributes));

            return this;
        }
    });

    return IssueitemView;
});