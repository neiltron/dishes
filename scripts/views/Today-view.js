/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/Issues-collection',
    'views/TodayItem-view'
], function ($, _, Backbone, JST, Issues, ItemView) {
    'use strict';

    var TodayView = Backbone.View.extend({
        template: JST['app/scripts/templates/Today.ejs'],

        initialize: function  () {
            Issues.bind('add', this.addOne, this);
            Issues.bind('reset', this.render, this);
        },

        addAll: function () {
            _.each(Issues.where({ active: true }), function (item) {
                this.addOne(item);
            }, this);
        },

        addOne: function (item) {
            var itemView = new ItemView({ model: item });
            $(this.el).find('#issues_list').append(itemView.render().el);
        },

        render: function () {
            $('ul.nav li').removeClass('active');
            $('ul.nav li:last').addClass('active')

            $(this.el).html(this.template);

            this.addAll();

            return this;
        }
    });

    return TodayView;
});