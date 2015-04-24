# Ember CLI addon for Mixpanel

An Ember-CLI addon that eases integration between your application and [Mixpanel](https://mixpanel.com). This is a close port of [rahim](https://github.com/rahim)'s [ember-segmentio](https://github.com/rahim/ember-segmentio).

## Usage

Add `ember-cli-mixpanel` as a dependency to your `package.json` or just run `ember install:addon ember-cli-mixpanel`.

There is one manual step, which includes our wrapper in your Router. Just extend your Router with `tracking_mixin.js`.

This addon includes the required Mixpanel script automatically, so no extra effort needed here.

### Configuration

There are some options available to configure the mixpanel addon. Only `token` is a mandatory option otherwise 

```
mixpanel: {
  enabled: false,
  LOG_EVENT_TRACKING: false,
  token: 'b619c413e0d49a362236388a4f5ec679',
  disable_auto_tracking: true // default: false
}
```

### Tracking Page Views

Once included your router will automatically send a page view event to
Mixpanel everytime the URL changes. This behavior can be disabled with `disable_auto_tracking: true`.

### Tracking Additional Events

You can track addinional events as well. Let's say we would like to track play events
on our controller.

```javascript
import Ember from 'ember'
import TrackingMixin from './mixin/tracking_mixin'

var VideoController = Ember.Controller.extend(
  TrackingMixin, {

  actions: {
    play: function() {
      // ...
      // this.trackEvent(event, properties, options, callback)
      this.trackEvent('Play video');
      // or
      this.trackEvent('Play video', {
        title: 'Never gonna give you up'
      }
    });
  }
});
```

The mixin can be applied to any Ember object.

### identifyUser, aliasUser

TBD

## Logging

For debugging purposes you can enable logging for all events. Events are still send to Mixpanel but you will get an additional output in your console.

Add `LOG_EVENT_TRACKING = true|false ` to your config file


## Development

Simple [ember-cli addon](http://www.ember-cli.com/#developing-addons-and-blueprints) just follow the documentation :)
