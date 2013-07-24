/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/Issues-collection',
    'views/IssueItem-view'
], function ($, _, Backbone, JST, Issues, ItemView) {
    'use strict';

    var IssuesView = Backbone.View.extend({
        template: JST['app/scripts/templates/Issues.ejs'],

        initialize: function  () {
            Issues.bind('add', this.addOne, this);
            Issues.bind('reset', this.render, this);
        },

        addAll: function () {
            _.each(Issues.models, function (item) {
                this.addOne(item);
            }, this);
        },

        addOne: function (item) {
            var itemView = new ItemView({ model: item });
            $(this.el).find('#issues_list').append(itemView.render().el);
        },

        render: function () {
            $('ul.nav li').removeClass('active');
            $('ul.nav li:first').addClass('active')

            $(this.el).html(this.template);

            this.addAll();

            return this;
        }
    });

    return IssuesView;
});