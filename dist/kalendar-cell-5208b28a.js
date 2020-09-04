import { k as getTime, g as getLocaleTime, f as isBefore, j as addTimezoneInfo, d as __vue_normalize__, e as __vue_create_injector__, c as cloneObject, b as _objectSpread2 } from './index-78e89a8a.js';
import 'vue';

//
var script = {
  props: ['event', 'total', 'index', 'overlaps', 'cellData'],
  created: function created() {},
  inject: ['kalendar_options'],
  data: function data() {
    return {
      inspecting: false,
      editing: false,
      new_appointment: {}
    };
  },
  filters: {
    formatTime: function formatTime(date) {
      return getTime(date);
    }
  },
  methods: {
    addAppointment: function addAppointment(information) {
      information['data'] = this.new_appointment;
      window.calendarEventBus.$emit('addAppointmentEvent', information);
      this.new_appointment = {};
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
      var multiplier = this.kalendar_options.cell_height / 10;
      var totalCellsPerDay = (this.kalendar_options.day_ends_at - this.kalendar_options.day_starts_at) * 6;
      var numberOfCellsToScheduleEnd = totalCellsPerDay - this.cellData.index;
      var numberOfMinutesToScheduleEnd = numberOfCellsToScheduleEnd * 10 - this.event.start.round_offset;

      if (this.event.distance > numberOfMinutesToScheduleEnd) {
        this.event.distance = numberOfMinutesToScheduleEnd;
      } // 0.2 * multiplier for an offset so next cell is easily selected


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

  return _c("div", {
    ref: "kalendarEventRef-" + _vm.event.id,
    staticClass: "event-card",
    class: _vm.eventCardClasses,
    style: "height: " + _vm.distance + "; width: calc(" + _vm.width_value + "); left: calc(" + _vm.left_offset + "); top: " + _vm.top_offset + ";",
    on: {
      click: function click($event) {
        _vm.inspecting = true;
      },
      mouseleave: function mouseleave($event) {
        _vm.inspecting = false;
      }
    }
  }, [_vm.status === "creating" || _vm.status === "popup-initiated" ? [_c("div", {
    staticClass: "creating-event"
  }, [_vm._t("creating-card", [_c("h4", {
    staticClass: "appointment-title",
    staticStyle: {
      "text-align": "left"
    }
  }, [_vm._v("New Appointment")]), _vm._v(" "), _c("span", {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm._f("formatTime")(_vm.information.start_time)) + " - " + _vm._s(_vm._f("formatTime")(_vm.information.end_time)))])], {
    event_information: _vm.information
  })], 2)] : [_c("div", {
    staticClass: "created-event"
  }, [_vm._t("created-card", [_c("h4", {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_vm._v(_vm._s(_vm.information.data) + " XY")]), _vm._v(" "), _c("p", [_vm._v("\n                    " + _vm._s(_vm._f("formatTime")(_vm.information.start_time)) + " -\n                    " + _vm._s(_vm._f("formatTime")(_vm.information.end_time)) + "\n                ")])], {
    event_information: _vm.information
  })], 2)], _vm._v(" "), _vm.status === "popup-initiated" ? _c("div", {
    staticClass: "popup-wrapper"
  }, [_c("div", {
    staticClass: "popup-event"
  }, [_vm._t("event-popup-form", [_c("h4", {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_vm._v("New Appointment")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.new_appointment["title"],
      expression: "new_appointment['title']"
    }],
    staticStyle: {
      width: "100%"
    },
    attrs: {
      type: "text",
      name: "title",
      placeholder: "Title"
    },
    domProps: {
      value: _vm.new_appointment["title"]
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.new_appointment, "title", $event.target.value);
      }
    }
  }), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.new_appointment["description"],
      expression: "new_appointment['description']"
    }],
    attrs: {
      type: "text",
      name: "description",
      placeholder: "Description",
      rows: "2"
    },
    domProps: {
      value: _vm.new_appointment["description"]
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.new_appointment, "description", $event.target.value);
      }
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "buttons"
  }, [_c("button", {
    staticClass: "cancel",
    on: {
      click: function click($event) {
        return _vm.closePopups();
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c("button", {
    on: {
      click: function click($event) {
        return _vm.addAppointment(_vm.information);
      }
    }
  }, [_vm._v("Save")])])], {
    popup_information: _vm.information
  })], 2)]) : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-7967297c_0", {
    source: ".event-card {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  color: white;\n  user-select: none;\n  will-change: height;\n}\n.event-card h4,\n.event-card p,\n.event-card span {\n  margin: 0px;\n}\n.event-card > * {\n  flex: 1;\n  position: relative;\n}\n.event-card.creating {\n  z-index: -1;\n}\n.event-card.overlaps > * {\n  border: solid 1px white !important;\n}\n.event-card.inspecting {\n  z-index: 11 !important;\n}\n.event-card.inspecting .created-event {\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);\n  transition: opacity 100ms linear;\n}\n.event-card__mini .created-event > .details-card > * {\n  display: none;\n}\n.event-card__mini .appointment-title,\n.event-card__mini .time {\n  display: block !important;\n  position: absolute;\n  top: 0;\n  font-size: 9px;\n  z-index: 1;\n  overflow: visible;\n  height: 100%;\n}\n.event-card__small .appointment-title {\n  font-size: 80%;\n}\n.event-card__small .time {\n  font-size: 70%;\n}\n.event-card.two-in-one .details-card > * {\n  font-size: 60%;\n}\n.event-card h1,\n.event-card h2,\n.event-card h3,\n.event-card h4,\n.event-card h5,\n.event-card h6,\n.event-card p {\n  margin: 0px;\n}\n.time {\n  position: absolute;\n  bottom: 0px;\n  right: 0px;\n  font-size: 11px;\n}\n.popup-wrapper {\n  text-shadow: none;\n  color: black;\n  z-index: 10;\n  position: absolute;\n  top: 0;\n  left: calc(100% + 5px);\n  display: flex;\n  flex-direction: column;\n  pointer-events: all;\n  user-select: none;\n  background-color: white;\n  border: solid 1px rgba(0, 0, 0, 0.08);\n  border-radius: 4px;\n  box-shadow: 0px 2px 12px -3px rgba(0, 0, 0, 0.3);\n  padding: 10px;\n}\n.popup-wrapper h4 {\n  color: black;\n  font-weight: 400;\n}\n.popup-wrapper input,\n.popup-wrapper textarea {\n  border: none;\n  background-color: #ebebeb;\n  color: #030303;\n  border-radius: 4px;\n  padding: 5px 8px;\n  margin-bottom: 5px;\n}\n.created-event {\n  pointer-events: all;\n  position: relative;\n}\n.created-event > .details-card {\n  max-width: 100%;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n}\n.created-event > .details-card > h1,\n.created-event > .details-card h2,\n.created-event > .details-card h3,\n.created-event > .details-card h4,\n.created-event > .details-card p,\n.created-event > .details-card small,\n.created-event > .details-card strong,\n.created-event > .details-card span {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n}\nul:last-child .popup-wrapper {\n  left: auto;\n  right: 100%;\n  margin-right: 10px;\n}\n.day-view ul .popup-wrapper {\n  left: auto;\n  right: auto;\n  width: calc(100% - 10px);\n  top: 10px;\n}\n\n/*# sourceMappingURL=kalendar-event.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/paul.kerspe/PhpstormProjects/calendar-ext/src/lib-components/kalendar-event.vue", "kalendar-event.vue"],
      "names": [],
      "mappings": "AAiKA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;EACA,WAAA;EA+DA,kBAAA;EACA,oBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EAEA,YA5EA;EA6EA,iBAAA;EACA,mBAAA;AC/NA;ADyJA;;;EAGA,WAAA;ACvJA;AD0JA;EACA,OAAA;EACA,kBAAA;ACxJA;AD2JA;EACA,WAAA;ACzJA;AD4JA;EACA,kCAAA;AC1JA;AD6JA;EACA,sBAAA;AC3JA;AD6JA;EACA,iHAAA;EAGA,gCAAA;AC7JA;ADkKA;EACA,aAAA;AChKA;ADmKA;;EAEA,yBAAA;EACA,kBAAA;EACA,MAAA;EACA,cAAA;EACA,UAAA;EACA,iBAAA;EACA,YAAA;ACjKA;ADsKA;EACA,cAAA;ACpKA;ADuKA;EACA,cAAA;ACrKA;ADyKA;EACA,cAAA;ACvKA;ADqLA;;;;;;;EAOA,WAAA;ACnLA;ADuLA;EACA,kBAAA;EACA,WAAA;EACA,UAAA;EACA,eAAA;ACpLA;ADuLA;EACA,iBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,MAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,iBAAA;EACA,uBAAA;EACA,qCAAA;EACA,kBAAA;EACA,gDAAA;EACA,aAAA;ACpLA;ADsLA;EACA,YAAA;EACA,gBAAA;ACpLA;ADuLA;;EAEA,YAAA;EACA,yBAAA;EACA,cAAA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;ACrLA;ADyLA;EACA,mBAAA;EACA,kBAAA;ACtLA;ADwLA;EACA,eAAA;EACA,WAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,uBAAA;EACA,oBAAA;EACA,qBAAA;EACA,4BAAA;ACtLA;ADwLA;;;;;;;;EAQA,uBAAA;EACA,gBAAA;EACA,cAAA;ACtLA;AD2LA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;ACxLA;AD2LA;EACA,UAAA;EACA,WAAA;EACA,wBAAA;EACA,SAAA;ACxLA;;AAEA,6CAA6C",
      "file": "kalendar-event.vue",
      "sourcesContent": ["<template>\n    <div class=\"event-card\"\n         :ref=\"`kalendarEventRef-${event.id}`\"\n         :style=\"`height: ${distance}; width: calc(${width_value}); left: calc(${left_offset}); top: ${top_offset};`\"\n         @click=\"inspecting = true\"\n         @mouseleave=\"inspecting = false\"\n         :class=\"eventCardClasses\"\n    >\n        <template v-if=\"status === 'creating' || status === 'popup-initiated'\">\n            <div class=\"creating-event\">\n                <slot name=\"creating-card\" v-bind:event_information=\"information\">\n                    <h4 class=\"appointment-title\" style=\"text-align: left;\">New Appointment</h4>\n                    <span class=\"time\">{{ information.start_time | formatTime }} - {{ information.end_time | formatTime }}</span>\n                </slot>\n            </div>\n        </template>\n\n        <template v-else>\n            <div class=\"created-event\">\n                <slot name=\"created-card\" v-bind:event_information=\"information\">\n                    <h4 style=\"margin-bottom: 5px\">{{ information.data }} XY</h4>\n                    <p>\n                        {{ information.start_time | formatTime }} -\n                        {{ information.end_time | formatTime }}\n                    </p>\n                </slot>\n            </div>\n        </template>\n\n        <div v-if=\"status === 'popup-initiated'\" class=\"popup-wrapper\">\n            <div class=\"popup-event\">\n                <slot name=\"event-popup-form\" :popup_information=\"information\">\n                    <h4 style=\"margin-bottom: 10px\">New Appointment</h4>\n                    <input\n                            v-model=\"new_appointment['title']\"\n                            type=\"text\"\n                            name=\"title\"\n                            placeholder=\"Title\"\n                            style=\"width: 100%;\"\n                    />\n                    <textarea v-model=\"new_appointment['description']\"\n                              type=\"text\"\n                              name=\"description\"\n                              placeholder=\"Description\"\n                              rows=\"2\"\n                    ></textarea>\n                    <div class=\"buttons\">\n                        <button class=\"cancel\" @click=\"closePopups()\">Cancel</button>\n                        <button @click=\"addAppointment(information)\">Save</button>\n                    </div>\n                </slot>\n            </div>\n        </div>\n    </div>\n</template>\n<script>\n    import {isBefore, getLocaleTime, addTimezoneInfo, getTime} from './utils.js';\n\n    export default {\n        props: ['event', 'total', 'index', 'overlaps', 'cellData'],\n        created() {\n        },\n        inject: ['kalendar_options'],\n        data: () => ({\n            inspecting: false,\n            editing: false,\n            new_appointment: {},\n        }),\n        filters: {\n            formatTime: function (date) {\n                return getTime(date);\n            }\n        },\n        methods: {\n            addAppointment: function (information) {\n                information['data'] = this.new_appointment;\n                window.calendarEventBus.$emit('addAppointmentEvent', information);\n                this.new_appointment = {};\n            },\n            closePopups: function () {\n                window.calendarEventBus.$emit('closePopupsEvent');\n            }\n        },\n        computed: {\n            eventCardClasses() {\n                let props = {\n                    'is-past': this.isPast,\n                    overlaps: this.overlaps > 0,\n                    'two-in-one': this.total > 1,\n                    inspecting: !!this.inspecting,\n                    'event-card__mini': this.event.distance <= 10,\n                    'event-card__small': (this.event.distance > 10 && this.event.distance < 40) || this.overlaps > 1\n                };\n                if (this.customCalendarEventClass != \"\") {\n                    props[this.customCalendarEventClass] = true;\n                }\n                return props;\n            },\n            customCalendarEventClass() {\n                if (!this.event || !this.event.data || !this.event.data.customEventCardClass) return '';\n                return this.event.data.customEventCardClass + '';\n            },\n            isPast() {\n                let now = getLocaleTime(new Date().toISOString());\n                return isBefore(this.event.start.value, now);\n            },\n            width_value() {\n                return `${100 / this.total}% - ${(this.overlaps * 50) /\n                this.total}px`;\n            },\n            left_offset() {\n                return `(${this.index} * (${this.width_value})) + ${this.overlaps *\n                50}px`;\n            },\n            top_offset() {\n                return this.event.start.round_offset\n                    ? `${this.event.start.round_offset}px`\n                    : `0px`;\n            },\n            distance() {\n                if (!this.event) return;\n                let multiplier = this.kalendar_options.cell_height / 10;\n\n                let totalCellsPerDay = (this.kalendar_options.day_ends_at - this.kalendar_options.day_starts_at) * 6;\n                let numberOfCellsToScheduleEnd = totalCellsPerDay - this.cellData.index;\n                let numberOfMinutesToScheduleEnd = numberOfCellsToScheduleEnd * 10 - this.event.start.round_offset;\n\n                if (this.event.distance > numberOfMinutesToScheduleEnd) {\n                    this.event.distance = numberOfMinutesToScheduleEnd;\n                }\n                // 0.2 * multiplier for an offset so next cell is easily selected\n                return `${this.event.distance * multiplier - 0.2 * multiplier}px`;\n            },\n            status() {\n                return (this.event && this.event.status) || this.editing;\n            },\n            information() {\n                let {start, end, data, id, key} = this.event;\n                let payload = {\n                    start_time: addTimezoneInfo(start.value),\n                    end_time: addTimezoneInfo(end.value),\n                    kalendar_id: id,\n                    key,\n                    data,\n                };\n                return payload;\n            },\n            editEvent() {\n                this.$kalendar.closePopups();\n                this.editing = true;\n            },\n            closeEventPopup() {\n                this.editing = false;\n            },\n        },\n    };\n</script>\n<style lang=\"scss\">\n    $creator-bg: #34aadc;\n    $creator-content: white;\n\n    .event-card {\n        display: flex;\n        flex-direction: column;\n        height: 100%;\n        width: 100%;\n\n        h4,\n        p,\n        span {\n            margin: 0px;\n        }\n\n        > * {\n            flex: 1;\n            position: relative;\n        }\n\n        &.creating {\n            z-index: -1;\n        }\n\n        &.overlaps > * {\n            border: solid 1px white !important;\n        }\n\n        &.inspecting {\n            z-index: 11 !important;\n\n            .created-event {\n                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),\n                0 1px 18px 0 rgba(0, 0, 0, 0.12),\n                0 3px 5px -1px rgba(0, 0, 0, 0.2);\n                transition: opacity 100ms linear;\n            }\n        }\n\n        &__mini {\n            .created-event > .details-card > * {\n                display: none;\n            }\n\n            .appointment-title,\n            .time {\n                display: block !important;\n                position: absolute;\n                top: 0;\n                font-size: 9px;\n                z-index: 1;\n                overflow: visible;\n                height: 100%;\n            }\n        }\n\n        &__small {\n            .appointment-title {\n                font-size: 80%;\n            }\n\n            .time {\n                font-size: 70%;\n            }\n        }\n\n        &.two-in-one .details-card > * {\n            font-size: 60%;\n        }\n\n        position: absolute;\n        pointer-events: none;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0; //z-index: 20!important;\n        //background-color: rgba($creator-bg, .85);\n        color: $creator-content;\n        user-select: none;\n        will-change: height; //padding: 4px 6px;\n\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6,\n        p {\n            margin: 0px;\n        }\n    }\n\n    .time {\n        position: absolute;\n        bottom: 0px;\n        right: 0px;\n        font-size: 11px;\n    }\n\n    .popup-wrapper {\n        text-shadow: none;\n        color: black;\n        z-index: 10;\n        position: absolute;\n        top: 0;\n        left: calc(100% + 5px);\n        display: flex;\n        flex-direction: column;\n        pointer-events: all;\n        user-select: none;\n        background-color: white;\n        border: solid 1px rgba(black, 0.08);\n        border-radius: 4px;\n        box-shadow: 0px 2px 12px -3px rgba(black, 0.3);\n        padding: 10px;\n\n        h4 {\n            color: black;\n            font-weight: 400;\n        }\n\n        input,\n        textarea {\n            border: none;\n            background-color: darken(white, 8);\n            color: lighten(black, 1);\n            border-radius: 4px;\n            padding: 5px 8px;\n            margin-bottom: 5px;\n        }\n    }\n\n    .created-event {\n        pointer-events: all;\n        position: relative;\n\n        > .details-card {\n            max-width: 100%;\n            width: 100%;\n            overflow: hidden;\n            position: relative;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n            display: -webkit-box;\n            -webkit-line-clamp: 3;\n            -webkit-box-orient: vertical;\n\n            > h1,\n            h2,\n            h3,\n            h4,\n            p,\n            small,\n            strong,\n            span {\n                text-overflow: ellipsis;\n                overflow: hidden;\n                display: block;\n            }\n        }\n    }\n\n    ul:last-child .popup-wrapper {\n        left: auto;\n        right: 100%;\n        margin-right: 10px;\n    }\n\n    .day-view ul .popup-wrapper {\n        left: auto;\n        right: auto;\n        width: calc(100% - 10px);\n        top: 10px;\n    }\n</style>\n", ".event-card {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  color: white;\n  user-select: none;\n  will-change: height;\n}\n.event-card h4,\n.event-card p,\n.event-card span {\n  margin: 0px;\n}\n.event-card > * {\n  flex: 1;\n  position: relative;\n}\n.event-card.creating {\n  z-index: -1;\n}\n.event-card.overlaps > * {\n  border: solid 1px white !important;\n}\n.event-card.inspecting {\n  z-index: 11 !important;\n}\n.event-card.inspecting .created-event {\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);\n  transition: opacity 100ms linear;\n}\n.event-card__mini .created-event > .details-card > * {\n  display: none;\n}\n.event-card__mini .appointment-title,\n.event-card__mini .time {\n  display: block !important;\n  position: absolute;\n  top: 0;\n  font-size: 9px;\n  z-index: 1;\n  overflow: visible;\n  height: 100%;\n}\n.event-card__small .appointment-title {\n  font-size: 80%;\n}\n.event-card__small .time {\n  font-size: 70%;\n}\n.event-card.two-in-one .details-card > * {\n  font-size: 60%;\n}\n.event-card h1,\n.event-card h2,\n.event-card h3,\n.event-card h4,\n.event-card h5,\n.event-card h6,\n.event-card p {\n  margin: 0px;\n}\n\n.time {\n  position: absolute;\n  bottom: 0px;\n  right: 0px;\n  font-size: 11px;\n}\n\n.popup-wrapper {\n  text-shadow: none;\n  color: black;\n  z-index: 10;\n  position: absolute;\n  top: 0;\n  left: calc(100% + 5px);\n  display: flex;\n  flex-direction: column;\n  pointer-events: all;\n  user-select: none;\n  background-color: white;\n  border: solid 1px rgba(0, 0, 0, 0.08);\n  border-radius: 4px;\n  box-shadow: 0px 2px 12px -3px rgba(0, 0, 0, 0.3);\n  padding: 10px;\n}\n.popup-wrapper h4 {\n  color: black;\n  font-weight: 400;\n}\n.popup-wrapper input,\n.popup-wrapper textarea {\n  border: none;\n  background-color: #ebebeb;\n  color: #030303;\n  border-radius: 4px;\n  padding: 5px 8px;\n  margin-bottom: 5px;\n}\n\n.created-event {\n  pointer-events: all;\n  position: relative;\n}\n.created-event > .details-card {\n  max-width: 100%;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n}\n.created-event > .details-card > h1,\n.created-event > .details-card h2,\n.created-event > .details-card h3,\n.created-event > .details-card h4,\n.created-event > .details-card p,\n.created-event > .details-card small,\n.created-event > .details-card strong,\n.created-event > .details-card span {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n}\n\nul:last-child .popup-wrapper {\n  left: auto;\n  right: 100%;\n  margin-right: 10px;\n}\n\n.day-view ul .popup-wrapper {\n  left: auto;\n  right: auto;\n  width: calc(100% - 10px);\n  top: 10px;\n}\n\n/*# sourceMappingURL=kalendar-event.vue.map */"]
    },
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

var script$1 = {
  props: ['creator', 'index', 'cellData', 'constructedEvents', 'temporaryEvent'],
  inject: ['kalendar_options'],
  components: {
    KalendarEvent: __vue_component__
  },
  computed: {
    cell_events: function cell_events() {
      var all_events = [];

      if (this.completed_events) {
        all_events = all_events.concat(this.completed_events);
      }

      if (this.being_created) {
        all_events = all_events.concat(this.being_created);
      }

      return all_events;
    },
    completed_events: function completed_events() {
      return this.constructedEvents && this.constructedEvents.hasOwnProperty(this.cellData.value) && this.constructedEvents[this.cellData.value];
    },
    being_created: function being_created() {
      return this.temporaryEvent && this.temporaryEvent.start.value === this.cellData.value && this.temporaryEvent;
    },
    overlappingEvents: function overlappingEvents() {
      var _this = this;

      if (!this.constructedEvents || this.cell_events.length < 1) return [];
      return Object.values(this.constructedEvents).flat().filter(function (event) {
        var cellDate = new Date(_this.cellData.value);
        var eventStarts = new Date(event.start.value);
        var eventEnds = new Date(event.end.value);
        return eventStarts < cellDate && eventEnds > cellDate;
      });
    },
    overlapValue: function overlapValue() {
      var length = this.overlappingEvents.length;
      return length > 2 ? 2 : length;
    },
    selected: function selected() {
      return this.cell_events && this.cell_events.length > 0;
    },
    hasPopups: function hasPopups() {
      return this.selected && !!this.cell_events.find(function (ev) {
        return ev.status === 'popup-initiated';
      });
    }
  },
  methods: {
    mouseDown: function mouseDown() {
      // user mouse got depressed while outside kalendar-cells
      // came back in and clicked while the creator was on
      if (!!this.creator.creating) {
        this.mouseUp();
        return;
      }

      var _this$kalendar_option = this.kalendar_options,
          read_only = _this$kalendar_option.read_only,
          overlap = _this$kalendar_option.overlap,
          past_event_creation = _this$kalendar_option.past_event_creation;
      if (read_only) return; // if past_event_creation is set to false, check if cell value is
      // before current time

      if (past_event_creation === false) {
        var now = getLocaleTime(new Date());

        if (new Date(now) > new Date(this.cellData.value)) {
          this.mouseUp();
          return;
        }
      } // if overlap is set to false, prevent selection on top of
      // other events


      if (!overlap && this.cell_events.length > 0) return; // close any open popups in the whole kalendar instance
      // before starting a new one

      this.$kalendar.closePopups(); // create a payload consisting of
      // starting, current, ending and originalStarting cell
      // starting, current and ending are self explanatory
      // but originalStarting cell is required
      // to determine the direction of the scroll/drag

      var payload = {
        creating: true,
        original_starting_cell: cloneObject(this.cellData),
        starting_cell: cloneObject(this.cellData),
        current_cell: cloneObject(this.cellData),
        ending_cell: cloneObject(this.cellData)
      };
      this.$emit('select', payload);
    },
    mouseMove: function mouseMove() {
      // same guards like in the mouseDown function
      var _this$kalendar_option2 = this.kalendar_options,
          read_only = _this$kalendar_option2.read_only,
          overlap = _this$kalendar_option2.overlap;
      if (read_only) return;
      if (this.creator && !this.creator.creating) return;
      var _this$creator = this.creator,
          starting_cell = _this$creator.starting_cell,
          original_starting_cell = _this$creator.original_starting_cell,
          creating = _this$creator.creating; // direction of scroll

      var going_down = this.cellData.index >= starting_cell.index && starting_cell.index === original_starting_cell.index;

      if (creating) {
        var payload = _objectSpread2(_objectSpread2({}, this.creator), {}, {
          current_cell: this.cellData,
          ending_cell: this.cellData,
          direction: going_down ? 'normal' : 'reverse'
        });

        this.$emit('select', payload);
      }
    },
    mouseUp: function mouseUp() {
      if (this.kalendar_options.read_only) return;

      if (this.creator.creating) {
        this.$emit('initiatePopup');
      }
    },
    resetCreator: function resetCreator() {
      this.$emit('reset');
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.cellData.visible ? _c("li", {
    staticClass: "kalendar-cell",
    class: {
      selected: _vm.selected,
      "is-an-hour": (_vm.index + 1) % (60 / 10) === 0,
      "has-events": _vm.cell_events && _vm.cell_events.length > 0,
      "being-created": !!_vm.being_created || _vm.hasPopups
    },
    style: "\n  height: " + _vm.kalendar_options.cell_height + "px;\n",
    on: {
      mouseover: function mouseover($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.mouseMove();
      },
      mousedown: function mousedown($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }

        return _vm.mouseDown();
      },
      mouseup: function mouseup($event) {
        return _vm.mouseUp();
      }
    }
  }, _vm._l(_vm.cell_events, function (event, eventIndex) {
    return _vm.cell_events && _vm.cell_events.length ? _c("KalendarEvent", {
      key: eventIndex,
      style: "z-index: 10",
      attrs: {
        event: event,
        total: _vm.cell_events.length,
        index: eventIndex,
        cellData: _vm.cellData,
        overlaps: _vm.overlapValue
      },
      scopedSlots: _vm._u([_vm._l(_vm.$scopedSlots, function (_, slot) {
        return {
          key: slot,
          fn: function fn(scope) {
            return [_vm._t(slot, null, null, scope)];
          }
        };
      })], null, true)
    }) : _vm._e();
  }), 1) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-62bc7c47_0", {
    source: "li.kalendar-cell {\n  font-size: 13px;\n  position: relative;\n}\n.created-events {\n  height: 100%;\n}\nul.building-blocks li {\n  z-index: 0;\n  border-bottom: dotted 1px var(--odd-cell-border-color);\n}\nul.building-blocks li.first_of_appointment {\n  z-index: 1;\n  opacity: 1;\n}\nul.building-blocks li.is-an-hour {\n  border-bottom: solid 1px var(--table-cell-border-color);\n}\nul.building-blocks li.has-events {\n  z-index: unset;\n}\nul.building-blocks li.being-created {\n  z-index: 11;\n}\n\n/*# sourceMappingURL=kalendar-cell.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/paul.kerspe/PhpstormProjects/calendar-ext/src/lib-components/kalendar-cell.vue", "kalendar-cell.vue"],
      "names": [],
      "mappings": "AAgMA;EACA,eAAA;EACA,kBAAA;AC/LA;ADkMA;EAEA,YAAA;AChMA;ADoMA;EACA,UAAA;EACA,sDAAA;ACjMA;ADmMA;EACA,UAAA;EACA,UAAA;ACjMA;ADoMA;EACA,uDAAA;AClMA;ADqMA;EACA,cAAA;ACnMA;ADsMA;EACA,WAAA;ACpMA;;AAEA,4CAA4C",
      "file": "kalendar-cell.vue",
      "sourcesContent": ["<template>\n    <li\n            v-if=\"cellData.visible\"\n            @mouseover.self=\"mouseMove()\"\n            @mousedown.self=\"mouseDown()\"\n            @mouseup=\"mouseUp()\"\n            class=\"kalendar-cell\"\n            :class=\"{\n            selected: selected,\n            'is-an-hour': (index + 1) % (60 / 10) === 0,\n            'has-events': cell_events && cell_events.length > 0,\n            'being-created': !!being_created || hasPopups,\n        }\"\n            :style=\"\n            `\n      height: ${kalendar_options.cell_height}px;\n    `\n        \"\n    >\n        <KalendarEvent\n                :style=\"`z-index: 10`\"\n                v-if=\"cell_events && cell_events.length\"\n                v-for=\"(event, eventIndex) in cell_events\"\n                :event=\"event\"\n                :key=\"eventIndex\"\n                :total=\"cell_events.length\"\n                :index=\"eventIndex\"\n                :cellData=\"cellData\"\n                :overlaps=\"overlapValue\"\n        >\n            <!-- inherit slots to child component -->\n            <template v-for=\"(_, slot) of $scopedSlots\" v-slot:[slot]=\"scope\">\n                <slot :name=\"slot\" v-bind=\"scope\"/>\n            </template>\n        </KalendarEvent>\n    </li>\n</template>\n<script>\n    import {cloneObject, getLocaleTime} from './utils.js';\n    import KalendarEvent from './kalendar-event.vue';\n\n    export default {\n        props: [\n            'creator',\n            'index',\n            'cellData',\n            'constructedEvents',\n            'temporaryEvent',\n        ],\n        inject: ['kalendar_options'],\n        components: {\n            KalendarEvent\n        },\n        computed: {\n            cell_events() {\n                let all_events = [];\n                if (this.completed_events) {\n                    all_events = all_events.concat(this.completed_events);\n                }\n                if (this.being_created) {\n                    all_events = all_events.concat(this.being_created);\n                }\n                return all_events;\n            },\n            completed_events() {\n                return (\n                    this.constructedEvents &&\n                    this.constructedEvents.hasOwnProperty(this.cellData.value) &&\n                    this.constructedEvents[this.cellData.value]\n                );\n            },\n            being_created() {\n                return (\n                    this.temporaryEvent &&\n                    this.temporaryEvent.start.value === this.cellData.value &&\n                    this.temporaryEvent\n                );\n            },\n            overlappingEvents() {\n                if (!this.constructedEvents || this.cell_events.length < 1)\n                    return [];\n                return Object.values(this.constructedEvents)\n                    .flat()\n                    .filter(event => {\n                        let cellDate = new Date(this.cellData.value);\n                        let eventStarts = new Date(event.start.value);\n                        let eventEnds = new Date(event.end.value);\n                        return eventStarts < cellDate && eventEnds > cellDate;\n                    });\n            },\n            overlapValue() {\n                let length = this.overlappingEvents.length;\n                return length > 2 ? 2 : length;\n            },\n            selected() {\n                return this.cell_events && this.cell_events.length > 0;\n            },\n            hasPopups() {\n                return (\n                    this.selected &&\n                    !!this.cell_events.find(ev => ev.status === 'popup-initiated')\n                );\n            },\n        },\n        methods: {\n            mouseDown() {\n                // user mouse got depressed while outside kalendar-cells\n                // came back in and clicked while the creator was on\n                if (!!this.creator.creating) {\n                    this.mouseUp();\n                    return;\n                }\n                let {\n                    read_only,\n                    overlap,\n                    past_event_creation,\n                } = this.kalendar_options;\n                if (read_only) return;\n\n                // if past_event_creation is set to false, check if cell value is\n                // before current time\n                if (past_event_creation === false) {\n                    let now = getLocaleTime(new Date());\n                    if (new Date(now) > new Date(this.cellData.value)) {\n                        this.mouseUp();\n                        return;\n                    }\n                }\n\n                // if overlap is set to false, prevent selection on top of\n                // other events\n                if (!overlap && this.cell_events.length > 0) return;\n\n                // close any open popups in the whole kalendar instance\n                // before starting a new one\n                this.$kalendar.closePopups();\n\n                // create a payload consisting of\n                // starting, current, ending and originalStarting cell\n                // starting, current and ending are self explanatory\n                // but originalStarting cell is required\n                // to determine the direction of the scroll/drag\n                let payload = {\n                    creating: true,\n                    original_starting_cell: cloneObject(this.cellData),\n                    starting_cell: cloneObject(this.cellData),\n                    current_cell: cloneObject(this.cellData),\n                    ending_cell: cloneObject(this.cellData),\n                };\n                this.$emit('select', payload);\n            },\n            mouseMove() {\n                // same guards like in the mouseDown function\n                let {read_only, overlap} = this.kalendar_options;\n                if (read_only) return;\n                if (this.creator && !this.creator.creating) return;\n                let {\n                    starting_cell,\n                    original_starting_cell,\n                    creating,\n                } = this.creator;\n\n                // direction of scroll\n                let going_down =\n                    this.cellData.index >= starting_cell.index &&\n                    starting_cell.index === original_starting_cell.index;\n\n                if (creating) {\n                    let payload = {\n                        ...this.creator,\n                        current_cell: this.cellData,\n                        ending_cell: this.cellData,\n                        direction: going_down ? 'normal' : 'reverse',\n                    };\n                    this.$emit('select', payload);\n                }\n            },\n            mouseUp() {\n                if (this.kalendar_options.read_only) return;\n                if (this.creator.creating) {\n                    this.$emit('initiatePopup');\n                }\n            },\n            resetCreator() {\n                this.$emit('reset');\n            },\n        },\n    };\n</script>\n<style lang=\"scss\">\n    $creator-bg: #34aadc;\n    $creator-content: white;\n    li.kalendar-cell {\n        font-size: 13px;\n        position: relative;\n    }\n\n    .created-events {\n        //width: 100%;\n        height: 100%;\n    }\n\n    ul.building-blocks {\n        li {\n            z-index: 0;\n            border-bottom: dotted 1px var(--odd-cell-border-color);\n\n            &.first_of_appointment {\n                z-index: 1;\n                opacity: 1; //z-index:0;\n            }\n\n            &.is-an-hour {\n                border-bottom: solid 1px var(--table-cell-border-color);\n            }\n\n            &.has-events {\n                z-index: unset;\n            }\n\n            &.being-created {\n                z-index: 11;\n            }\n        }\n    }\n</style>\n", "li.kalendar-cell {\n  font-size: 13px;\n  position: relative;\n}\n\n.created-events {\n  height: 100%;\n}\n\nul.building-blocks li {\n  z-index: 0;\n  border-bottom: dotted 1px var(--odd-cell-border-color);\n}\nul.building-blocks li.first_of_appointment {\n  z-index: 1;\n  opacity: 1;\n}\nul.building-blocks li.is-an-hour {\n  border-bottom: solid 1px var(--table-cell-border-color);\n}\nul.building-blocks li.has-events {\n  z-index: unset;\n}\nul.building-blocks li.being-created {\n  z-index: 11;\n}\n\n/*# sourceMappingURL=kalendar-cell.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/__vue_normalize__({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, __vue_create_injector__, undefined, undefined);

export default __vue_component__$1;
