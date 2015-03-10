// copied from https://raw.githubusercontent.com/rahim/ember-segmentio/master/lib/tracking_mixin.js
// thanks to https://github.com/rahim
import config from '../config/environment';

var MixpanelMixin = Ember.Mixin.create({
    pageHasAnalytics: function() {
        return window.mixpanel && typeof window.mixpanel === "object" && config.mixpanel.enabled;
    },

    logTrackingEnabled: function() {
        return !!config && !! config.mixpanel.LOG_EVENT_TRACKING;
    },

    logTracking: function() {
        Ember.Logger.info('[Mixpanel] ', arguments);
    },

    trackRouteChange: function(page) {
        if (! config.mixpanel.disable_auto_tracking) {
            this.trackPageView(page)
        }
    },

    trackPageView: function(page) {
        if (this.pageHasAnalytics()) {
            if (!page) {
                var loc = window.location;
                page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
            }

            mixpanel.track("visit", {pageName: page});
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('page view', page);
        }
    },

    trackEvent: function(event, properties, options, callback) {
        if (this.pageHasAnalytics()) {
            mixpanel.track(event, properties, options, callback);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking(event, properties, options);
        }
    },

    identifyUser: function(userId, traits, options, callback) {
        if (this.pageHasAnalytics()) {
            mixpanel.identify(userId, traits, options, callback);
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('identify user', traits, options);
        }
    },

    aliasUser: function(userId, previousId, options, callback) {
        if (this.pageHasAnalytics()) {
            mixpanel.alias(userId, previousId, options, callback)
        }

        if (this.logTrackingEnabled()) {
            this.logTracking('alias user', previousId, options);
        }
    }
});

export default MixpanelMixin
