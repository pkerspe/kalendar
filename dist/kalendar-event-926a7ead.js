import { g as getLocaleTime, f as isBefore, j as addTimezoneInfo, d as __vue_normalize__, e as __vue_create_injector__ } from './index-da5b199b.js';
import 'vue';

//
var script = {
  props: ['event', 'total', 'index', 'overlaps'],
  created: function created() {},
  inject: ['kalendar_options'],
  data: function data() {
    return {
      inspecting: false,
      editing: false,
      new_appointment: {}
    };
  },
  methods: {
    addAppointment: function addAppointment(information) {
      window.calendarEventBus.$emit('addAppointmentEvent', information);
    },
    closePopups: function closePopups() {
      window.calendarEventBus.$emit('closePopupsEvent');
    }
  },
  computed: {
    eventCardClasses: function eventCardClasses() {
      var props = {
        'is-past': this.isPast,
        overlaps: this.overlaps > 0,
        'two-in-one': this.total > 1,
        inspecting: !!this.inspecting,
        'event-card__mini': this.event.distance <= 10,
        'event-card__small': this.event.distance > 10 && this.event.distance < 40 || this.overlaps > 1
      };

      if (this.customCalendarEventClass != "") {
        props[this.customCalendarEventClass] = true;
      }
      return props;
    },
    customCalendarEventClass: function customCalendarEventClass() {
      if (!this.event || !this.event.data || !this.event.data.customEventCardClass) return '';
      return this.event.data.customEventCardClass + '';
    },
    isPast: function isPast() {
      var now = getLocaleTime(new Date().toISOString());
      return isBefore(this.event.start.value, now);
    },
    width_value: function width_value() {
      return "".concat(100 / this.total, "% - ").concat(this.overlaps * 50 / this.total, "px");
    },
    left_offset: function left_offset() {
      return "(".concat(this.index, " * (").concat(this.width_value, ")) + ").concat(this.overlaps * 50, "px");
    },
    top_offset: function top_offset() {
      return this.event.start.round_offset ? "".concat(this.event.start.round_offset, "px") : "0px";
    },
    distance: function distance() {
      if (!this.event) return;
      var multiplier = this.kalendar_options.cell_height / 10; // 0.5 * multiplier for an offset so next cell is easily selected

      return "".concat(this.event.distance * multiplier - 0.2 * multiplier, "px");
    },
    status: function status() {
      return this.event && this.event.status || this.editing;
    },
    information: function information() {
      var _this$event = this.event,
          start = _this$event.start,
          end = _this$event.end,
          data = _this$event.data,
          id = _this$event.id,
          key = _this$event.key;
      var payload = {
        start_time: addTimezoneInfo(start.value),
        end_time: addTimezoneInfo(end.value),
        kalendar_id: id,
        key: key,
        data: data
      };
      return payload;
    },
    editEvent: function editEvent() {
      this.$kalendar.closePopups();
      this.editing = true;
    },
    closeEventPopup: function closeEventPopup() {
      this.editing = false;
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "kalendarEventRef-" + _vm.event.id,
    staticClass: "event-card",
    class: _vm.eventCardClasses,
    style: "\n  height: " + _vm.distance + ";\n  width: calc(" + _vm.width_value + ");\n  left: calc(" + _vm.left_offset + ");\n  top: " + _vm.top_offset + ";\n",
    on: {
      "click": function click($event) {
        _vm.inspecting = true;
      },
      "mouseleave": function mouseleave($event) {
        _vm.inspecting = false;
      }
    }
  }, [_vm.status === 'creating' || _vm.status === 'popup-initiated' ? [_c('div', {
    staticClass: "creating-event"
  }, [_vm._t("creating-card", [_c('h4', {
    staticClass: "appointment-title",
    staticStyle: {
      "text-align": "left"
    }
  }, [_vm._v("New Appointment 1")]), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v(_vm._s(new Date(_vm.information.start_time).toLocaleTimeString().substring(0, 5)) + " - " + _vm._s(new Date(_vm.information.end_time).toLocaleTimeString().substring(0, 5)))])], {
    "event_information": _vm.information
  })], 2)] : [_c('div', {
    staticClass: "created-event"
  }, [_vm._t("created-card", [_c('h4', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_vm._v(_vm._s(_vm.information.data) + " XY")]), _vm._v(" "), _c('p', [_vm._v("\n                    " + _vm._s(_vm.information.start_time.substr(11, 5)) + " -\n                    " + _vm._s(_vm.information.end_time.substr(11, 5)) + "\n                ")])], {
    "event_information": _vm.information
  })], 2)], _vm._v(" "), _vm.status === 'popup-initiated' ? _c('div', {
    staticClass: "popup-wrapper"
  }, [_c('div', {
    staticClass: "popup-event"
  }, [_vm._t("event-popup-form", [_c('h4', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v("New Appointment")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.new_appointment['title'],
      expression: "new_appointment['title']"
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "text",
      "name": "title",
      "placeholder": "Title"
    },
    domProps: {
      "value": _vm.new_appointment['title']
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.new_appointment, 'title', $event.target.value);
      }
    }
  }), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.new_appointment['description'],
      expression: "new_appointment['description']"
    }],
    attrs: {
      "type": "text",
      "name": "description",
      "placeholder": "Description",
      "rows": "2"
    },
    domProps: {
      "value": _vm.new_appointment['description']
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.new_appointment, 'description', $event.target.value);
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "buttons"
  }, [_c('button', {
    staticClass: "cancel",
    on: {
      "click": function click($event) {
        return _vm.closePopups();
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('button', {
    on: {
      "click": function click($event) {
        return _vm.addAppointment(_vm.information);
      }
    }
  }, [_vm._v("Save")])])], {
    "popup_information": _vm.information
  })], 2)]) : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-07dae51b_0", {
    source: ".event-card{display:flex;flex-direction:column;height:100%;width:100%;position:absolute;pointer-events:none;top:0;left:0;right:0;bottom:0;color:#fff;user-select:none;will-change:height}.event-card h4,.event-card p,.event-card span{margin:0}.event-card>*{flex:1;position:relative}.event-card.creating{z-index:-1}.event-card.overlaps>*{border:solid 1px #fff!important}.event-card.inspecting{z-index:11!important}.event-card.inspecting .created-event{box-shadow:0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 3px 5px -1px rgba(0,0,0,.2);transition:opacity .1s linear}.event-card__mini .created-event>.details-card>*{display:none}.event-card__mini .appointment-title,.event-card__mini .time{display:block!important;position:absolute;top:0;font-size:9px;z-index:1;overflow:visible;height:100%}.event-card__small .appointment-title{font-size:80%}.event-card__small .time{font-size:70%}.event-card.two-in-one .details-card>*{font-size:60%}.event-card h1,.event-card h2,.event-card h3,.event-card h4,.event-card h5,.event-card h6,.event-card p{margin:0}.time{position:absolute;bottom:0;right:0;font-size:11px}.popup-wrapper{text-shadow:none;color:#000;z-index:10;position:absolute;top:0;left:calc(100% + 5px);display:flex;flex-direction:column;pointer-events:all;user-select:none;background-color:#fff;border:solid 1px rgba(0,0,0,.08);border-radius:4px;box-shadow:0 2px 12px -3px rgba(0,0,0,.3);padding:10px}.popup-wrapper h4{color:#000;font-weight:400}.popup-wrapper input,.popup-wrapper textarea{border:none;background-color:#ebebeb;color:#030303;border-radius:4px;padding:5px 8px;margin-bottom:5px}.created-event{pointer-events:all;position:relative}.created-event>.details-card{max-width:100%;width:100%;overflow:hidden;position:relative;white-space:nowrap;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}.created-event>.details-card h2,.created-event>.details-card h3,.created-event>.details-card h4,.created-event>.details-card p,.created-event>.details-card small,.created-event>.details-card span,.created-event>.details-card strong,.created-event>.details-card>h1{text-overflow:ellipsis;overflow:hidden;display:block}ul:last-child .popup-wrapper{left:auto;right:100%;margin-right:10px}.day-view ul .popup-wrapper{left:auto;right:auto;width:calc(100% - 10px);top:10px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, __vue_create_injector__, undefined, undefined);

export default __vue_component__;