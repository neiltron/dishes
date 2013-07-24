/*global define*/
/*global OAuth*/

define([
    'underscore',
    'backbone',
    'oauth',
    'models/Issue-model',
    'localstorage'
], function (_, Backbone, oauth, IssuesModel, localstorage) {
    'use strict';

    var IssuesCollection = Backbone.Collection.extend({
        model: IssuesModel,
        localStorage: new Backbone.LocalStorage('Issues'),

        initialize: function () {
            this.fetch();
            this.verifyAccessToken();
        },

        verifyAccessToken: function () {
            var accessToken = window.localStorage['access_token'] || '',
                that = this;

            $.ajax({
                type: 'get',
                url: 'https://api.github.com/applications/19a40e62322f61bef109/tokens/' + accessToken,
                success: function (data, status) {
                    this.fetchFromGithub();
                },
                error: function (request) {
                    that.authenticate();
                }
            });
        },

        authenticate: function () {
            var that = this;

            OAuth.initialize('U1c6yltalcdfq2isdYeAe34zZSE');
            OAuth.popup('github', function(error, result) {
                window.localStorage['access_token'] = result.access_token;

                that.fetchFromGithub();
            });
        },

        fetchFromGithub: function () {
            var that = this;

            $.ajax({
                url: "https://api.github.com/issues",
                dataType: 'json',
                data: {
                    per_page: 100,
                    filter: 'all',
                    state: 'open'
                },
                success: function(data, status, request) {
                    window.localStorage['issue_etag'] = request.ETag;

                    _.each(data, function (item) {
                        that.create(item);
                    });
                },
                beforeSend: function(xhr) {
                    var accessToken = window.localStorage['access_token'],
                        issuesETag = window.localStorage['issue_etag'];

                    xhr.setRequestHeader('Authorization','Bearer ' + accessToken);
                    xhr.setRequestHeader('If-None-Match', issuesETag);
                }
            });
        }

    });

    return new IssuesCollection();
});