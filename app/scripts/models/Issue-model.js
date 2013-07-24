/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var IssueModel = Backbone.Model.extend({
        defaults: {
          active: false
        },

        initialize: function () {
            this.bind('change', function () { this.save() }, this);
        }
    });

    return IssueModel;
});