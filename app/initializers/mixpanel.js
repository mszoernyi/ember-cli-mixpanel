import MixpanelMixin from '../mixin/tracking_mixin'

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
          this.trackRouteChange(this.get('url'));
          return this._super.apply(this, arguments);
        }
      });
    }
}

export default {
  name: 'mixpanel',
  initialize: initialize
};
