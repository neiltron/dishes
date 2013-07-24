/*global define*/

define([
    'jquery',
    'backbone',
    'views/Issues-view',
    'views/Today-view'
], function ($, Backbone, IssuesList, TodayList) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({
        routes: {
            '':             'showIssues',
            'today':        'showToday'
        },

        showIssues: function () {
            this.showView(new IssuesList());
        },

        showToday: function () {
            this.showView(new TodayList());
        },

        showView: function (view) {
            if (typeof this.currentView !== 'undefined') {
                this.currentView.undelegateEvents();
                this.currentView.remove();
            }

            this.currentView = view;
            $('#content').html(this.currentView.render().el);
        }
    });

    return ApplicationRouter;
});