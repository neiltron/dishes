/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TodayitemView = Backbone.View.extend({
        template: JST['app/scripts/templates/TodayItem.ejs'],
        tagName: 'li',
        className: 'clearfix',

        render: function () {
            $(this.el).html(this.template(this.model.attributes))

            return this;
        }
    });

    return TodayitemView;
});