/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/Today-collection',
    'views/TodayItem-view'
], function ($, _, Backbone, JST, Today, ItemView) {
    'use strict';

    var TodayView = Backbone.View.extend({
        el: $('#content'),
        template: JST['app/scripts/templates/Today.ejs'],

        initialize: function  () {
            Today.bind('add', this.addOne, this);
            Today.bind('change', this.render, this);
            Today.bind('reset', this.render, this);
        },

        addAll: function () {
            _.each(Today.models, function (item) {
                this.addOne(item);
            }, this);
        },

        addOne: function (item) {
            var itemView = new ItemView({ model: item });
            $(this.el).find('#issues_list').append(itemView.render().el);
        },

        render: function () {
            console.log(Today)
            $(this.el).html(this.template);

            this.addAll();
        }
    });

    return TodayView;
});