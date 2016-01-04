import MixpanelMixin from '../mixin/tracking_mixin';
import Ember from 'ember';

export function initialize(container) {
    if (container.lookup) {
      var router = container.lookup('router:main');
      router.on('didTransition', function() {
        this.trackRouteChange(this.get('url'));
      });
    } else {
      var routerFactory = container.resolveRegistration('router:main');
      routerFactory.reopen({
        didTransition: function didTransition() {
          var self = this;
          this._super.apply(this, arguments);
          // Must run this later for the URL to have changed
          Ember.run.schedule('afterRender', function() {
            self.trackRouteChange(self.get('url'));
          });
        }
      });
    }
}

export default {
  name: 'mixpanel',
  initialize: initialize
};
