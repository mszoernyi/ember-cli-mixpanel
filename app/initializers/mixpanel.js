import MixpanelMixin from '../mixin/tracking_mixin'

export function initialize(container) {
    var router = container.lookup('router:main');
    router.on('didTransition', function() {
      this.trackRouteChange(this.get('url'));
    });
}

export default {
  name: 'mixpanel',
  initialize: initialize
};
