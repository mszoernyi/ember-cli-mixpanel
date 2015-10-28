import MixpanelMixin from '../mixin/tracking_mixin'

export function initialize(registry, application) {
    application.register("mixinpanel:main", MixpanelMixin);
}

export default {
  name: 'mixpanel',
  initialize: initialize
};
