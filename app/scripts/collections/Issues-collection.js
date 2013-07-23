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
            var that = this;

            this.fetch();

            OAuth.initialize('eP7bkHIVjYxvjVHW6YOqQ626_lI');
            OAuth.popup('github', function(error, result) {
                $.ajax({
                    url: "https://api.github.com/issues",
                    dataType: 'json',
                    data: {
                        per_page: 100,
                        filter: 'all',
                        state: 'open'
                    },
                    success: function(data, status, request) {
                        _.each(data, function (item) {
                            that.create(item);
                        });
                    },
                    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + result.access_token); }
                });
            });
        }
    });

    return new IssuesCollection();
});