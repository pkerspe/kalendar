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
/**
 * return a formatted date string with timezone compensation
 * @param dateString
 * @returns {string}
 */


var getLocaleTime = function getLocaleTime(dateString) {
  var cleanedDate = new Date(dateString);
  cleanedDate.setHours(cleanedDate.getHours() - cleanedDate.getTimezoneOffset() / 60);
  cleanedDate.setMilliseconds(0);
  cleanedDate.setSeconds(0);
  return cleanedDate.toISOString();
  /*
  let [date, hour] = new Date(dateString).toLocaleString("en-GB").split(", ");
  date = date
    .split("/")
    .reverse()
    .join("-");
  let response = `${date}T${hour}.000Z`;
  return response;
  */
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
      return import('./kalendar-weekview-206748d2.js');
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
  watch: {
    events: function events(_events) {
      this.processEvents(_events);
    }
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

    //create an event bus to communicate with all ancestor components
    window.calendarEventBus = new Vue();
    calendarEventBus.$on('closePopupsEvent', function (data) {
      return _this2.closePopups(data);
    });
    calendarEventBus.$on('addAppointmentEvent', function (information) {
      return _this2.addAppointment(information);
    });
    this.current_day = this.kalendar_options.start_day;
    this.processEvents(this.events);

    if (!this.$kalendar) {
      Vue.prototype.$kalendar = {};
    }

    this.$kalendar.getEvents = function () {
      return _this2.kalendar_events.slice(0);
    };

    this.$kalendar.updateEvents = function (payload) {
      _this2.processEvents(payload);

      _this2.$emit('update:events', payload.map(function (event) {
        return {
          from: event.from,
          to: event.to,
          data: event.data,
          id: event.id,
          calendarId: event.calendarId
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
    processEvents: function processEvents(eventArray) {
      var start = new Date().getTime();
      this.kalendar_events = eventArray.map(function (event) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          id: event.id || generateUUID(),
          calendarId: event.calendarId || 'default'
        });
      });
    },
    getTime: getTime,
    changeDay: function changeDay(numDays) {
      var _this4 = this;

      this.current_day = addDays(this.current_day, numDays).toISOString();
      this.$nextTick(function () {
        return _this4.$kalendar.buildWeek();
      });
    },
    addAppointment: function addAppointment(popup_info) {
      var payload = {
        data: popup_info.data,
        from: popup_info.start_time,
        to: popup_info.end_time,
        id: generateUUID(),
        calendarId: 'default'
      };
      this.$kalendar.addNewEvent(payload);
      this.$kalendar.closePopups();
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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "kalendar-wrapper",
    class: {
      "no-scroll": !_vm.scrollable,
      gstyle: _vm.kalendar_options.style === "material_design",
      "day-view": _vm.kalendar_options.view_type === "day"
    },
    on: {
      touchstart: function touchstart($event) {
        _vm.scrollable = false;
      },
      touchend: function touchend($event) {
        _vm.scrollable = true;
      }
    }
  }, [_c("div", {
    staticClass: "week-navigator"
  }, [_vm.kalendar_options.view_type === "week" ? _c("div", {
    staticClass: "nav-wrapper"
  }, [_c("button", {
    staticClass: "week-navigator-button",
    on: {
      click: function click($event) {
        return _vm.changeDay(-7);
      }
    }
  }, [_c("svg", {
    staticClass: "css-i6dzq1",
    staticStyle: {
      transform: "rotate(180deg)"
    },
    attrs: {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      stroke: "currentColor",
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c("polyline", {
    attrs: {
      points: "9 18 15 12 9 6"
    }
  })])]), _vm._v(" "), _c("div", [_c("span", [_vm._v(_vm._s(_vm.kalendar_options.formatWeekNavigator(_vm.current_day)))])]), _vm._v(" "), _c("button", {
    staticClass: "week-navigator-button",
    on: {
      click: function click($event) {
        return _vm.changeDay(7);
      }
    }
  }, [_c("svg", {
    staticClass: "css-i6dzq1",
    attrs: {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      stroke: "currentColor",
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c("polyline", {
    attrs: {
      points: "9 18 15 12 9 6"
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm.kalendar_options.view_type === "day" ? _c("div", {
    staticClass: "nav-wrapper"
  }, [_c("button", {
    staticClass: "week-navigator-button",
    on: {
      click: function click($event) {
        return _vm.changeDay(-1);
      }
    }
  }, [_c("svg", {
    staticClass: "css-i6dzq1",
    staticStyle: {
      transform: "rotate(180deg)"
    },
    attrs: {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      stroke: "currentColor",
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c("polyline", {
    attrs: {
      points: "9 18 15 12 9 6"
    }
  })])]), _vm._v(" "), _c("div", [_c("span", [_vm._v(_vm._s(_vm.kalendar_options.formatDayNavigator(_vm.current_day)))])]), _vm._v(" "), _c("button", {
    staticClass: "week-navigator-button",
    on: {
      click: function click($event) {
        return _vm.changeDay(1);
      }
    }
  }, [_c("svg", {
    staticClass: "css-i6dzq1",
    attrs: {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      stroke: "currentColor",
      "stroke-width": "2",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }
  }, [_c("polyline", {
    attrs: {
      points: "9 18 15 12 9 6"
    }
  })])])]) : _vm._e()]), _vm._v(" "), _c("kalendar-week-view", {
    attrs: {
      current_day: _vm.current_day
    },
    scopedSlots: _vm._u([_vm._l(_vm.$scopedSlots, function (_, slot) {
      return {
        key: slot,
        fn: function fn(scope) {
          return [_vm._t(slot, null, null, scope)];
        }
      };
    })], null, true)
  })], 1);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-dfda88c0_0", {
    source: "* {\n  box-sizing: border-box;\n}\n.kalendar-wrapper {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  --main-color: #ec4d3d;\n  --weekend-color: #f7f7f7;\n  --current-day-color: #fef4f4;\n  --table-cell-border-color: #e5e5e5;\n  --odd-cell-border-color: #e5e5e5;\n  --hour-row-color: inherit;\n  --dark: #212121;\n  --lightg: #9e9e9e;\n  --card-bgcolor: #4285f4;\n  --card-color: white;\n  --max-hours: 10;\n  --previous-events: #c6dafc;\n  --previous-text-color: #727d8f;\n}\n.kalendar-wrapper.gstyle {\n  --hour-row-color: #212121;\n  --main-color: #4285f4;\n  --weekend-color: transparent;\n  --current-day-color: transparent;\n  --table-cell-border-color: #e0e0e0;\n  --odd-cell-border-color: transparent;\n  font-family: \"Google Sans\", Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif;\n}\n.kalendar-wrapper.gstyle .week-navigator {\n  background: white;\n  border-bottom: none;\n  padding: 20px;\n  color: rgba(0, 0, 0, 0.54);\n}\n.kalendar-wrapper.gstyle .week-navigator button {\n  color: rgba(0, 0, 0, 0.54);\n}\n.kalendar-wrapper.gstyle .creating-event,\n.kalendar-wrapper.gstyle .created-event {\n  background-color: var(--card-bgcolor);\n  color: var(--card-color);\n  text-shadow: none;\n  border-left: none;\n  border-radius: 2px;\n  opacity: 1;\n  border-bottom: solid 1px rgba(0, 0, 0, 0.03);\n}\n.kalendar-wrapper.gstyle .creating-event > *,\n.kalendar-wrapper.gstyle .created-event > * {\n  text-shadow: none;\n}\n.kalendar-wrapper.gstyle .is-past .creating-event,\n.kalendar-wrapper.gstyle .is-past .created-event {\n  background-color: var(--previous-events);\n  color: var(--previous-text-color);\n}\n.kalendar-wrapper.gstyle .created-event {\n  width: 96%;\n}\n.kalendar-wrapper.gstyle .created-event .time {\n  right: 2px;\n}\n.kalendar-wrapper.gstyle .sticky-top .days {\n  margin-left: 0;\n  padding-left: 55px;\n}\n.kalendar-wrapper.gstyle .all-day {\n  display: none;\n}\n.kalendar-wrapper.gstyle ul.building-blocks.day-1 li.is-an-hour::before {\n  content: \"\";\n  position: absolute;\n  bottom: -1px;\n  left: -10px;\n  width: 10px;\n  height: 1px;\n  background-color: var(--table-cell-border-color);\n}\n.kalendar-wrapper.gstyle ul.building-blocks li,\n.kalendar-wrapper.gstyle .hours {\n  border-right: solid 1px var(--table-cell-border-color);\n}\n.kalendar-wrapper.gstyle .hours li {\n  font-size: 80%;\n}\n.kalendar-wrapper.gstyle .hour-indicator-line > span.line {\n  height: 2px;\n  background-color: #db4437;\n}\n.kalendar-wrapper.gstyle .hour-indicator-line > span.line:before {\n  content: \"\";\n  width: 12px;\n  height: 12px;\n  display: block;\n  background-color: #db4437;\n  position: absolute;\n  top: -1px;\n  left: 0;\n  border-radius: 100%;\n}\n.kalendar-wrapper.gstyle .days {\n  border-top: solid 1px var(--table-cell-border-color);\n  position: relative;\n}\n.kalendar-wrapper.gstyle .days:before {\n  content: \"\";\n  position: absolute;\n  height: 1px;\n  width: 55px;\n  left: 0;\n  bottom: 0;\n  background-color: var(--table-cell-border-color);\n}\n.kalendar-wrapper.gstyle .day-indicator {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: var(--dark);\n  font-size: 13px;\n  padding-left: 0px;\n  border-right: solid 1px var(--table-cell-border-color);\n}\n.kalendar-wrapper.gstyle .day-indicator > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.kalendar-wrapper.gstyle .day-indicator.is-before {\n  color: #757575;\n}\n.kalendar-wrapper.gstyle .day-indicator .number-date {\n  margin-left: 0px;\n  margin-right: 0px;\n  order: 2;\n  font-size: 25px;\n  font-weight: 500;\n  width: 46px;\n  height: 46px;\n  border-radius: 100%;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  margin-top: 4px;\n}\n.kalendar-wrapper.gstyle .day-indicator.today {\n  border-bottom-color: var(--table-cell-border-color);\n}\n.kalendar-wrapper.gstyle .day-indicator.today:after {\n  display: none;\n}\n.kalendar-wrapper.gstyle .day-indicator.today .number-date {\n  background-color: var(--main-color);\n  color: white;\n}\n.kalendar-wrapper.gstyle .day-indicator .letters-date {\n  margin-left: 0px;\n  margin-right: 0px;\n  font-weight: 500;\n  text-transform: uppercase;\n  font-size: 11px;\n}\n.kalendar-wrapper.gstyle .day-indicator:first-child {\n  position: relative;\n}\n.kalendar-wrapper.gstyle .day-indicator:first-child::before {\n  content: \"\";\n  position: absolute;\n  left: -1px;\n  top: 0;\n  width: 1px;\n  height: 100%;\n  background-color: var(--table-cell-border-color);\n}\n.kalendar-wrapper.gstyle .creating-event,\n.kalendar-wrapper.gstyle .popup-wrapper {\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);\n  transition: opacity 100ms linear;\n}\n.kalendar-wrapper.non-desktop .building-blocks {\n  pointer-events: none;\n}\n.kalendar-wrapper.day-view .day-indicator {\n  align-items: flex-start;\n  text-align: center;\n  padding-left: 10px;\n}\n.creating-event,\n.created-event {\n  padding: 4px 6px;\n  cursor: default;\n  word-break: break-word;\n  height: 100%;\n  width: 100%;\n  font-size: 14px;\n}\n.creating-event h4,\n.created-event h4 {\n  font-weight: 400;\n}\n.creating-event {\n  background-color: #34aadc;\n  opacity: 0.9;\n}\n.creating-event > * {\n  text-shadow: 0 0 7px rgba(0, 0, 0, 0.25);\n}\n.created-event {\n  background-color: #bfecff;\n  opacity: 0.74;\n  border-left: solid 3px #34aadc;\n  color: #1f6570;\n}\n.week-navigator {\n  display: flex;\n  align-items: center;\n  background: linear-gradient(#fdfdfd, #f9f9f9);\n  border-bottom: solid 1px #ec4d3d;\n  padding: 10px 20px;\n}\n.week-navigator .nav-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 22px;\n  width: 25ch;\n  max-width: 30ch;\n  margin: 0 auto;\n}\n.week-navigator .nav-wrapper span {\n  white-space: nowrap;\n}\n.week-navigator button {\n  background: transparent;\n  border: none;\n  padding: 0px;\n  display: inline-flex;\n  margin: 0px 10px;\n  color: #ec4d3d;\n  align-items: center;\n  font-size: 14px;\n  padding-bottom: 5px;\n}\n.kalendar-wrapper {\n  background-color: white;\n  min-width: 300px;\n}\n.no-scroll {\n  overflow-y: hidden;\n  max-height: 100%;\n}\n.hour-indicator-line {\n  position: absolute;\n  z-index: 2;\n  width: 100%;\n  height: 10px;\n  display: flex;\n  align-items: center;\n  pointer-events: none;\n  user-select: none;\n}\n.hour-indicator-line > span.line {\n  background-color: var(--main-color);\n  height: 1px;\n  display: block;\n  flex: 1;\n}\n.hour-indicator-line > span.time-value {\n  font-size: 14px;\n  width: 48px;\n  color: var(--main-color);\n  font-weight: 600;\n  background-color: white;\n}\n.hour-indicator-tooltip {\n  position: absolute;\n  z-index: 0;\n  background-color: var(--main-color);\n  width: 10px;\n  height: 10px;\n  display: block;\n  border-radius: 100%;\n  pointer-events: none;\n  user-select: none;\n}\nul.kalendar-day li.kalendar-cell:last-child {\n  display: none;\n}\n.week-navigator-button {\n  outline: 0;\n}\n.week-navigator-button:hover svg, .week-navigator-button:active svg {\n  stroke: var(--main-color);\n}",
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

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

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

export { __vue_component__ as _, isToday as a, _objectSpread2 as b, cloneObject as c, normalizeComponent as d, createInjector as e, isBefore as f, getLocaleTime as g, getHourlessDate as h, isWeekend as i, addTimezoneInfo as j, getTime as k, plugin as p };
