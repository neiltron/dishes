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

        showIssues: function (wut) {
            var issuesList = new IssuesList();
            issuesList.render();
        },

        showToday: function () {
            var todayList = new TodayList();
            todayList.render();
        }
    });

    return ApplicationRouter;
});