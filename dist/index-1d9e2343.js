import Vue from 'vue';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var creators_offset = new Date().getTimezoneOffset() / 60;

if (creators_offset * -1 >= 0) {
  creators_offset *= -1;
  creators_offset = "".concat((creators_offset + "").padStart(2, "0"), ":00");
  creators_offset = "+".concat(creators_offset);
} else {
  creators_offset = "".concat((creators_offset + "").padStart(2, "0"), ":00");
  creators_offset = "-".concat(creators_offset);
}

var getHourlessDate = function getHourlessDate(date_string) {
  var today = date_string ? new Date(date_string) : new Date();
  var year = today.getFullYear() + "",
      month = (today.getMonth() + 1 + "").padStart(2, "0"),
      day = (today.getDate() + "").padStart(2, "0");
  return "".concat(year, "-").concat(month, "-").concat(day, "T00:00:00.000Z");
};

var getDatelessHour = function getDatelessHour(date_string, military) {
  var time = addTimezoneInfo(date_string);
  if (military) return getLocaleTime(time).slice(11, 16);
  return formatAMPM(new Date(getLocaleTime(time)));
};

var getTime = function getTime(date) {
  var dateObj = new Date(date);
  var minutes = dateObj.getUTCHours().toString().padStart(2, "0");
  var seconds = dateObj.getUTCMinutes().toString().padStart(2, "0");
  return "".concat(minutes, ":").concat(seconds);
};

var addDays = function addDays(date, days) {
  var dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

var startOfWeek = function startOfWeek(date) {
  var d = new Date(date);
  var day = d.getDay(),
      diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

var endOfWeek = function endOfWeek(date) {
  var dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0);
  var toAdd = 6 - dateObj.getDay();
  return addDays(dateObj, toAdd);
};

var generateUUID = function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

var cloneObject = function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
};

var getLocaleTime = function getLocaleTime(dateString) {
  var _Date$toLocaleString$ = new Date(dateString).toLocaleString("en-GB").split(", "),
      _Date$toLocaleString$2 = _slicedToArray(_Date$toLocaleString$, 2),
      date = _Date$toLocaleString$2[0],
      hour = _Date$toLocaleString$2[1];

  date = date.split("/").reverse().join("-");
  return "".concat(date, "T").concat(hour, ".000Z");
};

var addTimezoneInfo = function addTimezoneInfo(ISOdate) {
  if (new Date(ISOdate).toISOString() !== ISOdate) return;
  return "".concat(ISOdate.slice(0, 19)).concat(creators_offset);
};

var isToday = function isToday(date) {
  if (!date) return;
  var today = getLocaleTime(new Date()).slice(0, 10);
  return date.slice(0, 10) === today;
};

var isBefore = function isBefore(date1, date2) {
  if (!date1 || !date2) return;
  return new Date(date1) < new Date(date2);
};

var isWeekend = function isWeekend(date) {
  if (!date) return;
  var day = new Date(date).getDay();
  return day === 6 || day === 0;
};

var formatAMPM = function formatAMPM(date) {
  var hours = date.getUTCHours();
  var result = "".concat(hours % 12 === 0 ? 12 : hours % 12, " ").concat(hours >= 12 ? "PM" : "AM");
  return result;
};

var script = {
  components: {
    KalendarWeekView: function KalendarWeekView() {
      return import('./kalendar-weekview-84fb29ed.js');
    }
  },
  props: {
    // this provided array will be kept in sync
    events: {
      required: true,
      type: Array,
      validator: function validator(val) {
        return Array.isArray(val);
      }
    },
    // use this to enable/disable stuff which
    // are supported by Kalendar itself
    configuration: {
      type: Object,
      required: false,
      validator: function validator(val) {
        return _typeof(val) === 'object';
      }
    }
  },
  data: function data() {
    var _this = this;

    return {
      current_day: getHourlessDate(),
      default_options: {
        cell_height: 10,
        scrollToNow: false,
        start_day: getHourlessDate(),
        view_type: 'week',
        style: 'material_design',
        now: new Date(),
        military_time: true,
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        time_mode: 'relative',
        overlap: true,
        past_event_creation: true,
        formatLeftHours: function formatLeftHours(date) {
          return getDatelessHour(date, _this.configuration.military_time);
        },
        formatDayTitle: function formatDayTitle(date) {
          var isoDate = new Date(date);
          var dayName = isoDate.toUTCString().slice(0, 3);
          var dayNumber = isoDate.getUTCDate();
          return [dayName, dayNumber];
        },
        formatWeekNavigator: function formatWeekNavigator(isoDate) {
          var startDate = startOfWeek(isoDate);
          var endDate = endOfWeek(isoDate);
          var startString = startDate.toUTCString().slice(5, 11);
          var endString = endDate.toUTCString().slice(5, 11);
          return "".concat(startString, " - ").concat(endString);
        },
        formatDayNavigator: function formatDayNavigator(isoDate) {
          var day = new Date(isoDate);
          return day.toUTCString().slice(5, 11);
        }
      },
      kalendar_events: null,
      new_appointment: {},
      scrollable: true
    };
  },
  computed: {
    kalendar_options: function kalendar_options() {
      var options = this.default_options;
      var provided_props = this.configuration;
      var conditions = {
        scrollToNow: function scrollToNow(val) {
          return typeof val === 'boolean';
        },
        start_day: function start_day(val) {
          return !isNaN(Date.parse(val));
        },
        view_type: function view_type(val) {
          return ['week', 'day'].includes(val);
        },
        cell_height: function cell_height(val) {
          return !isNaN(val);
        },
        style: function style(val) {
          return ['material_design', 'flat_design'].includes(val);
        },
        military_time: function military_time(val) {
          return typeof val === 'boolean';
        },
        read_only: function read_only(val) {
          return typeof val === 'boolean';
        },
        day_starts_at: function day_starts_at(val) {
          return typeof val === 'number' && val >= 0 && val <= 24;
        },
        day_ends_at: function day_ends_at(val) {
          return typeof val === 'number' && val >= 0 && val <= 24;
        },
        hide_dates: function hide_dates(val) {
          return Array.isArray(val);
        },
        hide_days: function hide_days(val) {
          return Array.isArray(val) && !val.find(function (n) {
            return typeof n !== 'number';
          });
        },
        overlap: function overlap(val) {
          return typeof val === 'boolean';
        },
        past_event_creation: function past_event_creation(val) {
          return typeof val === 'boolean';
        }
      };

      for (var key in provided_props) {
        if (conditions.hasOwnProperty(key) && conditions[key](provided_props[key])) {
          options[key] = provided_props[key];
        }
      }

      return options;
    }
  },
  created: function created() {
    var _this2 = this;

    this.current_day = this.kalendar_options.start_day;
    this.kalendar_events = this.events.map(function (event) {
      return _objectSpread2(_objectSpread2({}, event), {}, {
        id: event.id || generateUUID()
      });
    });

    if (!this.$kalendar) {
      Vue.prototype.$kalendar = {};
    }

    this.$kalendar.getEvents = function () {
      return _this2.kalendar_events.slice(0);
    };

    this.$kalendar.updateEvents = function (payload) {
      _this2.kalendar_events = payload.map(function (event) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          id: event.id || generateUUID()
        });
      });

      _this2.$emit('update:events', payload.map(function (event) {
        return {
          from: event.from,
          to: event.to,
          data: event.data
        };
      }));
    };
  },
  provide: function provide() {
    var _this3 = this;

    var provider = {};
    Object.defineProperty(provider, 'kalendar_options', {
      enumerable: true,
      get: function get() {
        return _this3.kalendar_options;
      }
    });
    Object.defineProperty(provider, 'kalendar_events', {
      enumerable: true,
      get: function get() {
        return _this3.kalendar_events;
      }
    });
    return provider;
  },
  methods: {
    getTime: getTime,
    changeDay: function changeDay(numDays) {
      var _this4 = this;

      this.current_day = addDays(this.current_day, numDays).toISOString();
      setTimeout(function () {
        return _this4.$kalendar.buildWeek();
      });
    },
    addAppointment: function addAppointment(popup_info) {
      var payload = {
        data: {
          title: this.new_appointment.title,
          description: this.new_appointment.description
        },
        from: popup_info.start_time,
        to: popup_info.end_time
      };
      this.$kalendar.addNewEvent(payload);
      this.$kalendar.closePopups();
      this.clearFormData();
    },
    clearFormData: function clearFormData() {
      this.new_appointment = {
        description: null,
        title: null
      };
    },
    closePopups: function closePopups() {
      this.$kalendar.closePopups();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "kalendar-wrapper",
    class: {
      'no-scroll': !_vm.scrollable,
      gstyle: _vm.kalendar_options.style === 'material_design',
      'day-view': _vm.kalendar_options.view_type === 'day'
    },
    on: {
      "touchstart": function touchstart($event) {
        _vm.scrollable = false;
      },
      "touchend": function touchend($event) {
        _vm.scrollable = true;
      }
    }
  }, [_c('div', {
    staticClass: "week-navigator"
  }, [_vm.kalendar_options.view_type === 'week' ? _c('div', {
    staticClass: "nav-wrapper"
  }, [_c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(-7);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    staticStyle: {
      "transform": "rotate(180deg)"
    },
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])]), _vm._v(" "), _c('div', [_c('span', [_vm._v(_vm._s(_vm.kalendar_options.formatWeekNavigator(_vm.current_day)))])]), _vm._v(" "), _c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(7);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm.kalendar_options.view_type === 'day' ? _c('div', {
    staticClass: "nav-wrapper"
  }, [_c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(-1);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    staticStyle: {
      "transform": "rotate(180deg)"
    },
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])]), _vm._v(" "), _c('div', [_c('span', [_vm._v(_vm._s(_vm.kalendar_options.formatDayNavigator(_vm.current_day)))])]), _vm._v(" "), _c('button', {
    staticClass: "week-navigator-button",
    on: {
      "click": function click($event) {
        return _vm.changeDay(1);
      }
    }
  }, [_c('svg', {
    staticClass: "css-i6dzq1",
    attrs: {
      "viewBox": "0 0 24 24",
      "width": "24",
      "height": "24",
      "stroke": "currentColor",
      "stroke-width": "2",
      "fill": "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c('polyline', {
    attrs: {
      "points": "9 18 15 12 9 6"
    }
  })])])]) : _vm._e()]), _vm._v(" "), _c('kalendar-week-view', {
    attrs: {
      "current_day": _vm.current_day
    }
  }), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-creation"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "creating-event"
        }, [_vm._t("creating-card", [_c('h4', {
          staticClass: "appointment-title",
          staticStyle: {
            "text-align": "left"
          }
        }, [_vm._v("New Appointment")]), _vm._v(" "), _c('span', {
          staticClass: "time"
        }, [_vm._v(_vm._s(_vm.getTime(information.start_time)) + " - " + _vm._s(_vm.getTime(information.end_time)))])], {
          "event_information": information
        })], 2);
      }
    }], null, true)
  }), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-popup-form"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "popup-event"
        }, [_vm._t("popup-form", [_c('h4', {
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
              return _vm.addAppointment(information);
            }
          }
        }, [_vm._v("Save")])])], {
          "popup_information": information
        })], 2);
      }
    }], null, true)
  }), _vm._v(" "), _c('portal', {
    staticClass: "slotable",
    attrs: {
      "to": "event-details"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(information) {
        return _c('div', {
          staticClass: "created-event"
        }, [_vm._t("created-card", [_c('h4', {
          staticStyle: {
            "margin-bottom": "5px"
          }
        }, [_vm._v(_vm._s(information.data))]), _vm._v(" "), _c('p', [_vm._v("\n                    " + _vm._s(information.start_time.substr(11, 5)) + " -\n                    " + _vm._s(information.end_time.substr(11, 5)) + "\n                ")])], {
          "event_information": information
        })], 2);
      }
    }], null, true)
  })], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Kalendar: __vue_component__
});

var install = function installKalendarVue(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
  Vue.prototype.$kalendar = {};
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

var GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Default export is library as a whole, registered via Vue.use()

export { __vue_component__ as _, isToday as a, _objectSpread2 as b, cloneObject as c, normalizeComponent as d, isBefore as e, getHourlessDate as f, getLocaleTime as g, addTimezoneInfo as h, isWeekend as i, plugin as p };
