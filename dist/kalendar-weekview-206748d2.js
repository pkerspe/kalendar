import { i as isWeekend, a as isToday, g as getLocaleTime, b as _objectSpread2, c as cloneObject, d as __vue_normalize__, e as __vue_create_injector__, f as isBefore, h as getHourlessDate, j as addTimezoneInfo } from './index-78e89a8a.js';
import 'vue';

function PromiseWorker (worker) {
  var messageIds = 0;
  var callbacks = {};
  worker.addEventListener("message", function (e) {
    return onMessage(e);
  });

  var onMessage = function onMessage(e) {
    var message = e.data;

    if (!Array.isArray(message) || message.length < 2) {
      return;
    }

    var messageId = message[0];
    var error = message[1];
    var result = message[2];
    var callback = callbacks[messageId];
    if (!callback) return;
    delete callbacks[messageId];
    callback(error, result);
  };

  return {
    initiateWorker: function initiateWorker(_worker) {},
    postMessage: function postMessage(userMessage) {
      var messageId = messageIds++;
      var messageToSend = [messageId, userMessage];
      return new Promise(function (resolve, reject) {
        callbacks[messageId] = function (error, result) {
          if (error) return reject(new Error(error.message));
          resolve(result);
        };

        if (typeof worker.controller !== "undefined") {
          // service worker, use MessageChannels because e.source is broken in Chrome < 51:
          // https://bugs.chromium.org/p/chromium/issues/detail?id=543198
          var channel = new MessageChannel();

          channel.port1.onmessage = function (e) {
            onMessage(e);
          };

          worker.controller.postMessage(messageToSend, [channel.port2]);
        } else {
          // web worker
          worker.postMessage(messageToSend);
        }
      });
    }
  };
}

const kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
const kRequire = kIsNodeJS && typeof module.require === 'function' ? module.require : null; // eslint-disable-line

function browserDecodeBase64(base64, enableUnicode) {
    const binaryString = atob(base64);
    if (enableUnicode) {
        const binaryView = new Uint8Array(binaryString.length);
        Array.prototype.forEach.call(binaryView, (el, idx, arr) => {
            arr[idx] = binaryString.charCodeAt(idx);
        });
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function nodeDecodeBase64(base64, enableUnicode) {
    return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory(base64, sourcemap = null, enableUnicode = false) {
    const source = kIsNodeJS ? nodeDecodeBase64(base64, enableUnicode) : browserDecodeBase64(base64, enableUnicode);
    const start = source.indexOf('\n', 10) + 1;
    const body = source.substring(start) + (sourcemap ? `\/\/# sourceMappingURL=${sourcemap}` : '');

    if (kRequire) {
        /* node.js */
        const Worker = kRequire('worker_threads').Worker; // eslint-disable-line
        return function WorkerFactory(options) {
            return new Worker(body, Object.assign({}, options, { eval: true }));
        };
    }

    /* browser */
    const blob = new Blob([body], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    return function WorkerFactory(options) {
        return new Worker(url, options);
    };
}

/* eslint-disable */
var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwpmdW5jdGlvbiBfdHlwZW9mKG9iaikgewogICJAYmFiZWwvaGVscGVycyAtIHR5cGVvZiI7CgogIGlmICh0eXBlb2YgU3ltYm9sID09PSAiZnVuY3Rpb24iICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICJzeW1ib2wiKSB7CiAgICBfdHlwZW9mID0gZnVuY3Rpb24gKG9iaikgewogICAgICByZXR1cm4gdHlwZW9mIG9iajsKICAgIH07CiAgfSBlbHNlIHsKICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7CiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gImZ1bmN0aW9uIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyAic3ltYm9sIiA6IHR5cGVvZiBvYmo7CiAgICB9OwogIH0KCiAgcmV0dXJuIF90eXBlb2Yob2JqKTsKfQoKZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgewogIGlmIChrZXkgaW4gb2JqKSB7CiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsKICAgICAgdmFsdWU6IHZhbHVlLAogICAgICBlbnVtZXJhYmxlOiB0cnVlLAogICAgICBjb25maWd1cmFibGU6IHRydWUsCiAgICAgIHdyaXRhYmxlOiB0cnVlCiAgICB9KTsKICB9IGVsc2UgewogICAgb2JqW2tleV0gPSB2YWx1ZTsKICB9CgogIHJldHVybiBvYmo7Cn0KCmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkgewogIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsKCiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsKICAgIHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpOwogICAgaWYgKGVudW1lcmFibGVPbmx5KSBzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgewogICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsKICAgIH0pOwogICAga2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpOwogIH0KCiAgcmV0dXJuIGtleXM7Cn0KCmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkgewogIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7CiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsKCiAgICBpZiAoaSAlIDIpIHsKICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7CiAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7CiAgICAgIH0pOwogICAgfSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycykgewogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpOwogICAgfSBlbHNlIHsKICAgICAgb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7CiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7CiAgICAgIH0pOwogICAgfQogIH0KCiAgcmV0dXJuIHRhcmdldDsKfQoKLy90b2RvOiByZW1vdmUgdGhpcyBhbmQgZm9yayBwcm9taXNlLXdvcmtlciB0byBwcm92aWRlIEVTTQoKZnVuY3Rpb24gaXNQcm9taXNlKG9iaikgewogIC8vIHZpYSBodHRwczovL3VucGtnLmNvbS9pcy1wcm9taXNlQDIuMS4wL2luZGV4LmpzCiAgcmV0dXJuICEhb2JqICYmIChfdHlwZW9mKG9iaikgPT09ICJvYmplY3QiIHx8IHR5cGVvZiBvYmogPT09ICJmdW5jdGlvbiIpICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gImZ1bmN0aW9uIjsKfQoKZnVuY3Rpb24gcmVnaXN0ZXJQcm9taXNlV29ya2VyIChjYWxsYmFjaykgewogIGZ1bmN0aW9uIHBvc3RPdXRnb2luZ01lc3NhZ2UoZSwgbWVzc2FnZUlkLCBlcnJvciwgcmVzdWx0KSB7CiAgICBmdW5jdGlvbiBwb3N0TWVzc2FnZShtc2cpIHsKICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovCiAgICAgIGlmICh0eXBlb2Ygc2VsZi5wb3N0TWVzc2FnZSAhPT0gImZ1bmN0aW9uIikgewogICAgICAgIC8vIHNlcnZpY2Ugd29ya2VyCiAgICAgICAgZS5wb3J0c1swXS5wb3N0TWVzc2FnZShtc2cpOwogICAgICB9IGVsc2UgewogICAgICAgIC8vIHdlYiB3b3JrZXIKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKG1zZyk7CiAgICAgIH0KICAgIH0KCiAgICBpZiAoZXJyb3IpIHsKICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi8KICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAidW5kZWZpbmVkIiAmJiAiZXJyb3IiIGluIGNvbnNvbGUpIHsKICAgICAgICAvLyBUaGlzIGlzIHRvIG1ha2UgZXJyb3JzIGVhc2llciB0byBkZWJ1Zy4gSSB0aGluayBpdCdzIGltcG9ydGFudAogICAgICAgIC8vIGVub3VnaCB0byBqdXN0IGxlYXZlIGhlcmUgd2l0aG91dCBnaXZpbmcgdGhlIHVzZXIgYW4gb3B0aW9uCiAgICAgICAgLy8gdG8gc2lsZW5jZSBpdC4KICAgICAgICBjb25zb2xlLmVycm9yKCJXb3JrZXIgY2F1Z2h0IGFuIGVycm9yOiIsIGVycm9yKTsKICAgICAgfQoKICAgICAgcG9zdE1lc3NhZ2UoW21lc3NhZ2VJZCwgewogICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UKICAgICAgfV0pOwogICAgfSBlbHNlIHsKICAgICAgcG9zdE1lc3NhZ2UoW21lc3NhZ2VJZCwgbnVsbCwgcmVzdWx0XSk7CiAgICB9CiAgfQoKICBmdW5jdGlvbiB0cnlDYXRjaEZ1bmMoY2FsbGJhY2ssIG1lc3NhZ2UpIHsKICAgIHRyeSB7CiAgICAgIHJldHVybiB7CiAgICAgICAgcmVzOiBjYWxsYmFjayhtZXNzYWdlKQogICAgICB9OwogICAgfSBjYXRjaCAoZSkgewogICAgICByZXR1cm4gewogICAgICAgIGVycjogZQogICAgICB9OwogICAgfQogIH0KCiAgZnVuY3Rpb24gaGFuZGxlSW5jb21pbmdNZXNzYWdlKGUsIGNhbGxiYWNrLCBtZXNzYWdlSWQsIG1lc3NhZ2UpIHsKICAgIHZhciByZXN1bHQgPSB0cnlDYXRjaEZ1bmMoY2FsbGJhY2ssIG1lc3NhZ2UpOwoKICAgIGlmIChyZXN1bHQuZXJyKSB7CiAgICAgIHBvc3RPdXRnb2luZ01lc3NhZ2UoZSwgbWVzc2FnZUlkLCByZXN1bHQuZXJyKTsKICAgIH0gZWxzZSBpZiAoIWlzUHJvbWlzZShyZXN1bHQucmVzKSkgewogICAgICBwb3N0T3V0Z29pbmdNZXNzYWdlKGUsIG1lc3NhZ2VJZCwgbnVsbCwgcmVzdWx0LnJlcyk7CiAgICB9IGVsc2UgewogICAgICByZXN1bHQucmVzLnRoZW4oZnVuY3Rpb24gKGZpbmFsUmVzdWx0KSB7CiAgICAgICAgcG9zdE91dGdvaW5nTWVzc2FnZShlLCBtZXNzYWdlSWQsIG51bGwsIGZpbmFsUmVzdWx0KTsKICAgICAgfSwgZnVuY3Rpb24gKGZpbmFsRXJyb3IpIHsKICAgICAgICBwb3N0T3V0Z29pbmdNZXNzYWdlKGUsIG1lc3NhZ2VJZCwgZmluYWxFcnJvcik7CiAgICAgIH0pOwogICAgfQogIH0KCiAgZnVuY3Rpb24gb25JbmNvbWluZ01lc3NhZ2UoZSkgewogICAgdmFyIHBheWxvYWQgPSBlLmRhdGE7CgogICAgaWYgKCFBcnJheS5pc0FycmF5KHBheWxvYWQpIHx8IHBheWxvYWQubGVuZ3RoICE9PSAyKSB7CiAgICAgIC8vIG1lc3NhZ2UgZG9lbnMndCBtYXRjaCBjb21tdW5pY2F0aW9uIGZvcm1hdDsgaWdub3JlCiAgICAgIHJldHVybjsKICAgIH0KCiAgICB2YXIgbWVzc2FnZUlkID0gcGF5bG9hZFswXTsKICAgIHZhciBtZXNzYWdlID0gcGF5bG9hZFsxXTsKCiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAiZnVuY3Rpb24iKSB7CiAgICAgIHBvc3RPdXRnb2luZ01lc3NhZ2UoZSwgbWVzc2FnZUlkLCBuZXcgRXJyb3IoIlBsZWFzZSBwYXNzIGEgZnVuY3Rpb24gaW50byByZWdpc3RlcigpLiIpKTsKICAgIH0gZWxzZSB7CiAgICAgIGhhbmRsZUluY29taW5nTWVzc2FnZShlLCBjYWxsYmFjaywgbWVzc2FnZUlkLCBtZXNzYWdlKTsKICAgIH0KICB9CgogIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIG9uSW5jb21pbmdNZXNzYWdlKTsKfQoKdmFyIGNyZWF0b3JzX29mZnNldCA9IG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDYwOwoKaWYgKGNyZWF0b3JzX29mZnNldCAqIC0xID49IDApIHsKICBjcmVhdG9yc19vZmZzZXQgKj0gLTE7CiAgY3JlYXRvcnNfb2Zmc2V0ID0gIiIuY29uY2F0KChjcmVhdG9yc19vZmZzZXQgKyAiIikucGFkU3RhcnQoMiwgIjAiKSwgIjowMCIpOwogIGNyZWF0b3JzX29mZnNldCA9ICIrIi5jb25jYXQoY3JlYXRvcnNfb2Zmc2V0KTsKfSBlbHNlIHsKICBjcmVhdG9yc19vZmZzZXQgPSAiIi5jb25jYXQoKGNyZWF0b3JzX29mZnNldCArICIiKS5wYWRTdGFydCgyLCAiMCIpLCAiOjAwIik7CiAgY3JlYXRvcnNfb2Zmc2V0ID0gIi0iLmNvbmNhdChjcmVhdG9yc19vZmZzZXQpOwp9Cgp2YXIgZ2V0SG91cmxlc3NEYXRlID0gZnVuY3Rpb24gZ2V0SG91cmxlc3NEYXRlKGRhdGVfc3RyaW5nKSB7CiAgdmFyIHRvZGF5ID0gZGF0ZV9zdHJpbmcgPyBuZXcgRGF0ZShkYXRlX3N0cmluZykgOiBuZXcgRGF0ZSgpOwogIHZhciB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKSArICIiLAogICAgICBtb250aCA9ICh0b2RheS5nZXRNb250aCgpICsgMSArICIiKS5wYWRTdGFydCgyLCAiMCIpLAogICAgICBkYXkgPSAodG9kYXkuZ2V0RGF0ZSgpICsgIiIpLnBhZFN0YXJ0KDIsICIwIik7CiAgcmV0dXJuICIiLmNvbmNhdCh5ZWFyLCAiLSIpLmNvbmNhdChtb250aCwgIi0iKS5jb25jYXQoZGF5LCAiVDAwOjAwOjAwLjAwMFoiKTsKfTsKCnZhciBnZXRZZWFyTW9udGhEYXkgPSBmdW5jdGlvbiBnZXRZZWFyTW9udGhEYXkoZGF0ZV9zdHJpbmcpIHsKICByZXR1cm4gZ2V0SG91cmxlc3NEYXRlKGRhdGVfc3RyaW5nKS5zbGljZSgwLCAxMCk7Cn07Cgp2YXIgYWRkRGF5cyA9IGZ1bmN0aW9uIGFkZERheXMoZGF0ZSwgZGF5cykgewogIHZhciBkYXRlT2JqID0gbmV3IERhdGUoZGF0ZSk7CiAgZGF0ZU9iai5zZXRVVENIb3VycygwLCAwLCAwLCAwKTsKICBkYXRlT2JqLnNldERhdGUoZGF0ZU9iai5nZXREYXRlKCkgKyBkYXlzKTsKICByZXR1cm4gZGF0ZU9iajsKfTsKCnZhciBnZW5lcmF0ZVVVSUQgPSBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7CiAgcmV0dXJuIChbMWU3XSArIC0xZTMgKyAtNGUzICsgLThlMyArIC0xZTExKS5yZXBsYWNlKC9bMDE4XS9nLCBmdW5jdGlvbiAoYykgewogICAgcmV0dXJuIChjIF4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAxNSA+PiBjIC8gNCkudG9TdHJpbmcoMTYpOwogIH0pOwp9OwovKioKICogcmV0dXJuIGEgZm9ybWF0dGVkIGRhdGUgc3RyaW5nIHdpdGggdGltZXpvbmUgY29tcGVuc2F0aW9uCiAqIEBwYXJhbSBkYXRlU3RyaW5nCiAqIEByZXR1cm5zIHtzdHJpbmd9CiAqLwoKCnZhciBnZXRMb2NhbGVUaW1lID0gZnVuY3Rpb24gZ2V0TG9jYWxlVGltZShkYXRlU3RyaW5nKSB7CiAgdmFyIGNsZWFuZWREYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7CiAgY2xlYW5lZERhdGUuc2V0SG91cnMoY2xlYW5lZERhdGUuZ2V0SG91cnMoKSAtIGNsZWFuZWREYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MCk7CiAgY2xlYW5lZERhdGUuc2V0TWlsbGlzZWNvbmRzKDApOwogIGNsZWFuZWREYXRlLnNldFNlY29uZHMoMCk7CiAgcmV0dXJuIGNsZWFuZWREYXRlLnRvSVNPU3RyaW5nKCk7CiAgLyoKICBsZXQgW2RhdGUsIGhvdXJdID0gbmV3IERhdGUoZGF0ZVN0cmluZykudG9Mb2NhbGVTdHJpbmcoImVuLUdCIikuc3BsaXQoIiwgIik7CiAgZGF0ZSA9IGRhdGUKICAgIC5zcGxpdCgiLyIpCiAgICAucmV2ZXJzZSgpCiAgICAuam9pbigiLSIpOwogIGxldCByZXNwb25zZSA9IGAke2RhdGV9VCR7aG91cn0uMDAwWmA7CiAgcmV0dXJuIHJlc3BvbnNlOwogICovCn07Cgp2YXIgaG91clV0aWxzID0gewogIGdldEFsbEhvdXJzOiBmdW5jdGlvbiBnZXRBbGxIb3VycygpIHsKICAgIHJldHVybiBbIjAwOjAwOjAwIiwgIjAwOjEwOjAwIiwgIjAwOjIwOjAwIiwgIjAwOjMwOjAwIiwgIjAwOjQwOjAwIiwgIjAwOjUwOjAwIiwgIjAxOjAwOjAwIiwgIjAxOjEwOjAwIiwgIjAxOjIwOjAwIiwgIjAxOjMwOjAwIiwgIjAxOjQwOjAwIiwgIjAxOjUwOjAwIiwgIjAyOjAwOjAwIiwgIjAyOjEwOjAwIiwgIjAyOjIwOjAwIiwgIjAyOjMwOjAwIiwgIjAyOjQwOjAwIiwgIjAyOjUwOjAwIiwgIjAzOjAwOjAwIiwgIjAzOjEwOjAwIiwgIjAzOjIwOjAwIiwgIjAzOjMwOjAwIiwgIjAzOjQwOjAwIiwgIjAzOjUwOjAwIiwgIjA0OjAwOjAwIiwgIjA0OjEwOjAwIiwgIjA0OjIwOjAwIiwgIjA0OjMwOjAwIiwgIjA0OjQwOjAwIiwgIjA0OjUwOjAwIiwgIjA1OjAwOjAwIiwgIjA1OjEwOjAwIiwgIjA1OjIwOjAwIiwgIjA1OjMwOjAwIiwgIjA1OjQwOjAwIiwgIjA1OjUwOjAwIiwgIjA2OjAwOjAwIiwgIjA2OjEwOjAwIiwgIjA2OjIwOjAwIiwgIjA2OjMwOjAwIiwgIjA2OjQwOjAwIiwgIjA2OjUwOjAwIiwgIjA3OjAwOjAwIiwgIjA3OjEwOjAwIiwgIjA3OjIwOjAwIiwgIjA3OjMwOjAwIiwgIjA3OjQwOjAwIiwgIjA3OjUwOjAwIiwgIjA4OjAwOjAwIiwgIjA4OjEwOjAwIiwgIjA4OjIwOjAwIiwgIjA4OjMwOjAwIiwgIjA4OjQwOjAwIiwgIjA4OjUwOjAwIiwgIjA5OjAwOjAwIiwgIjA5OjEwOjAwIiwgIjA5OjIwOjAwIiwgIjA5OjMwOjAwIiwgIjA5OjQwOjAwIiwgIjA5OjUwOjAwIiwgIjEwOjAwOjAwIiwgIjEwOjEwOjAwIiwgIjEwOjIwOjAwIiwgIjEwOjMwOjAwIiwgIjEwOjQwOjAwIiwgIjEwOjUwOjAwIiwgIjExOjAwOjAwIiwgIjExOjEwOjAwIiwgIjExOjIwOjAwIiwgIjExOjMwOjAwIiwgIjExOjQwOjAwIiwgIjExOjUwOjAwIiwgIjEyOjAwOjAwIiwgIjEyOjEwOjAwIiwgIjEyOjIwOjAwIiwgIjEyOjMwOjAwIiwgIjEyOjQwOjAwIiwgIjEyOjUwOjAwIiwgIjEzOjAwOjAwIiwgIjEzOjEwOjAwIiwgIjEzOjIwOjAwIiwgIjEzOjMwOjAwIiwgIjEzOjQwOjAwIiwgIjEzOjUwOjAwIiwgIjE0OjAwOjAwIiwgIjE0OjEwOjAwIiwgIjE0OjIwOjAwIiwgIjE0OjMwOjAwIiwgIjE0OjQwOjAwIiwgIjE0OjUwOjAwIiwgIjE1OjAwOjAwIiwgIjE1OjEwOjAwIiwgIjE1OjIwOjAwIiwgIjE1OjMwOjAwIiwgIjE1OjQwOjAwIiwgIjE1OjUwOjAwIiwgIjE2OjAwOjAwIiwgIjE2OjEwOjAwIiwgIjE2OjIwOjAwIiwgIjE2OjMwOjAwIiwgIjE2OjQwOjAwIiwgIjE2OjUwOjAwIiwgIjE3OjAwOjAwIiwgIjE3OjEwOjAwIiwgIjE3OjIwOjAwIiwgIjE3OjMwOjAwIiwgIjE3OjQwOjAwIiwgIjE3OjUwOjAwIiwgIjE4OjAwOjAwIiwgIjE4OjEwOjAwIiwgIjE4OjIwOjAwIiwgIjE4OjMwOjAwIiwgIjE4OjQwOjAwIiwgIjE4OjUwOjAwIiwgIjE5OjAwOjAwIiwgIjE5OjEwOjAwIiwgIjE5OjIwOjAwIiwgIjE5OjMwOjAwIiwgIjE5OjQwOjAwIiwgIjE5OjUwOjAwIiwgIjIwOjAwOjAwIiwgIjIwOjEwOjAwIiwgIjIwOjIwOjAwIiwgIjIwOjMwOjAwIiwgIjIwOjQwOjAwIiwgIjIwOjUwOjAwIiwgIjIxOjAwOjAwIiwgIjIxOjEwOjAwIiwgIjIxOjIwOjAwIiwgIjIxOjMwOjAwIiwgIjIxOjQwOjAwIiwgIjIxOjUwOjAwIiwgIjIyOjAwOjAwIiwgIjIyOjEwOjAwIiwgIjIyOjIwOjAwIiwgIjIyOjMwOjAwIiwgIjIyOjQwOjAwIiwgIjIyOjUwOjAwIiwgIjIzOjAwOjAwIiwgIjIzOjEwOjAwIiwgIjIzOjIwOjAwIiwgIjIzOjMwOjAwIiwgIjIzOjQwOjAwIiwgIjIzOjUwOjAwIiwgIjI0OjAwOjAwIl07CiAgfSwKICBnZXRGdWxsSG91cnM6IGZ1bmN0aW9uIGdldEZ1bGxIb3VycygpIHsKICAgIHJldHVybiBbIjAwOjAwOjAwIiwgIjAxOjAwOjAwIiwgIjAyOjAwOjAwIiwgIjAzOjAwOjAwIiwgIjA0OjAwOjAwIiwgIjA1OjAwOjAwIiwgIjA2OjAwOjAwIiwgIjA3OjAwOjAwIiwgIjA4OjAwOjAwIiwgIjA5OjAwOjAwIiwgIjEwOjAwOjAwIiwgIjExOjAwOjAwIiwgIjEyOjAwOjAwIiwgIjEzOjAwOjAwIiwgIjE0OjAwOjAwIiwgIjE1OjAwOjAwIiwgIjE2OjAwOjAwIiwgIjE3OjAwOjAwIiwgIjE4OjAwOjAwIiwgIjE5OjAwOjAwIiwgIjIwOjAwOjAwIiwgIjIxOjAwOjAwIiwgIjIyOjAwOjAwIiwgIjIzOjAwOjAwIl07CiAgfQp9OwoKcmVnaXN0ZXJQcm9taXNlV29ya2VyKGZ1bmN0aW9uIChtZXNzYWdlKSB7CiAgdmFyIHR5cGUgPSBtZXNzYWdlLnR5cGUsCiAgICAgIGRhdGEgPSBtZXNzYWdlLmRhdGE7CgogIGlmICh0eXBlID09PSAibWVzc2FnZSIpIHsKICAgIHJldHVybiAiV29ya2VyIHJlcGxpZXM6ICIuY29uY2F0KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7CiAgfQoKICBzd2l0Y2ggKHR5cGUpIHsKICAgIGNhc2UgImdldERheXMiOgogICAgICByZXR1cm4gZ2V0RGF5cyhkYXRhLmRheSwgZGF0YS5vcHRpb25zKTsKCiAgICBjYXNlICJnZXRIb3VycyI6CiAgICAgIHJldHVybiBnZXRIb3VycyhkYXRhLmhvdXJPcHRpb25zKTsKCiAgICBjYXNlICJnZXREYXlDZWxscyI6CiAgICAgIHJldHVybiBnZXREYXlDZWxscyhkYXRhLmRheSwgZGF0YS5ob3VyT3B0aW9ucyk7CgogICAgY2FzZSAiY29uc3RydWN0RGF5RXZlbnRzIjoKICAgICAgcmV0dXJuIGNvbnN0cnVjdERheUV2ZW50cyhkYXRhLmRheSwgZGF0YS5ldmVudHMsIGRhdGEuaG91ck9wdGlvbnMpOwoKICAgIGNhc2UgImNvbnN0cnVjdE5ld0V2ZW50IjoKICAgICAgcmV0dXJuIGNvbnN0cnVjdE5ld0V2ZW50KGRhdGEuZXZlbnQsIGRhdGEuZGF5LCBkYXRhLmhvdXJPcHRpb25zKTsKICB9Cn0pOwoKZnVuY3Rpb24gZ2V0RGF5cyhkYXlTdHJpbmcsIF9yZWYpIHsKICB2YXIgaGlkZV9kYXRlcyA9IF9yZWYuaGlkZV9kYXRlcywKICAgICAgaGlkZV9kYXlzID0gX3JlZi5oaWRlX2RheXMsCiAgICAgIHZpZXdfdHlwZSA9IF9yZWYudmlld190eXBlOwogIHZhciBkYXRlID0gbmV3IERhdGUoIiIuY29uY2F0KGRheVN0cmluZywgIlQwMDowMDowMC4wMDBaIikpOwogIHZhciBkYXlfb2Zfd2VlayA9IGRhdGUuZ2V0VVRDRGF5KCkgLSAxOwogIHZhciBkYXlzID0gW107CgogIGlmICh2aWV3X3R5cGUgPT09ICJkYXkiKSB7CiAgICBkYXlzID0gW3sKICAgICAgdmFsdWU6IGRhdGUudG9JU09TdHJpbmcoKSwKICAgICAgaW5kZXg6IDAKICAgIH1dOwogIH0gZWxzZSB7CiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCA3OyBpZHgrKykgewogICAgICBkYXlzLnB1c2goewogICAgICAgIHZhbHVlOiBhZGREYXlzKGRhdGUsIGlkeCAtIGRheV9vZl93ZWVrKS50b0lTT1N0cmluZygpLAogICAgICAgIGluZGV4OiBpZHgKICAgICAgfSk7CiAgICB9CiAgfQoKICBpZiAoaGlkZV9kYXRlcyAmJiBoaWRlX2RhdGVzLmxlbmd0aCA+IDApIHsKICAgIGRheXMgPSBkYXlzLmZpbHRlcihmdW5jdGlvbiAoX3JlZjIpIHsKICAgICAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7CiAgICAgIHJldHVybiBoaWRlX2RhdGVzLmluZGV4T2YodmFsdWUuc2xpY2UoMCwgMTApKSA8IDA7CiAgICB9KTsKICB9CgogIGlmIChoaWRlX2RheXMgJiYgaGlkZV9kYXlzLmxlbmd0aCA+IDApIHsKICAgIGRheXMgPSBkYXlzLmZpbHRlcihmdW5jdGlvbiAoX3JlZjMpIHsKICAgICAgdmFyIGluZGV4ID0gX3JlZjMuaW5kZXg7CiAgICAgIHJldHVybiBoaWRlX2RheXMuaW5kZXhPZihpbmRleCkgPCAwOwogICAgfSk7CiAgfQoKICByZXR1cm4gZGF5czsKfQoKZnVuY3Rpb24gZ2V0SG91cnMoaG91cl9vcHRpb25zKSB7CiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpOwogIGRhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7CiAgdmFyIGlzb19kYXRlID0gZ2V0WWVhck1vbnRoRGF5KGRhdGUpOwogIHZhciBkYXlfaG91cnMgPSBob3VyVXRpbHMuZ2V0RnVsbEhvdXJzKCk7CgogIGlmIChob3VyX29wdGlvbnMpIHsKICAgIHZhciBzdGFydF9ob3VyID0gaG91cl9vcHRpb25zLnN0YXJ0X2hvdXIsCiAgICAgICAgZW5kX2hvdXIgPSBob3VyX29wdGlvbnMuZW5kX2hvdXI7CiAgICBkYXlfaG91cnMgPSBkYXlfaG91cnMuc2xpY2Uoc3RhcnRfaG91ciwgZW5kX2hvdXIpOwogIH0KCiAgdmFyIGhvdXJzID0gW107CgogIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGRheV9ob3Vycy5sZW5ndGg7IGlkeCsrKSB7CiAgICB2YXIgdmFsdWUgPSAiIi5jb25jYXQoaXNvX2RhdGUsICJUIikuY29uY2F0KGRheV9ob3Vyc1tpZHhdLCAiLjAwMFoiKTsKICAgIGhvdXJzLnB1c2goewogICAgICB2YWx1ZTogdmFsdWUsCiAgICAgIGluZGV4OiBpZHgsCiAgICAgIHZpc2libGU6IHRydWUKICAgIH0pOwogIH0KCiAgcmV0dXJuIGhvdXJzOwp9Cgp2YXIgZ2V0RGF5Q2VsbHMgPSBmdW5jdGlvbiBnZXREYXlDZWxscyhkYXlTdHJpbmcsIGRheV9vcHRpb25zKSB7CiAgaWYgKG5ldyBEYXRlKGRheVN0cmluZykudG9JU09TdHJpbmcoKSAhPT0gZGF5U3RyaW5nKSB7CiAgICB0aHJvdyBuZXcgRXJyb3IoIlVuc3VwcG9ydGVkIGRheVN0cmluZyBwYXJhbWV0ZXIgcHJvdmlkZWQiKTsKICB9CgogIHZhciBjZWxscyA9IFtdOwogIHZhciBkYXRlX3BhcnQgPSBkYXlTdHJpbmcuc2xpY2UoMCwgMTApOwogIHZhciBhbGxfaG91cnMgPSBob3VyVXRpbHMuZ2V0QWxsSG91cnMoKTsKCiAgaWYgKGRheV9vcHRpb25zKSB7CiAgICB2YXIgc3RhcnRfaG91ciA9IGRheV9vcHRpb25zLnN0YXJ0X2hvdXIsCiAgICAgICAgZW5kX2hvdXIgPSBkYXlfb3B0aW9ucy5lbmRfaG91cjsKICAgIHZhciBzdGFydF9pbmRleCA9IHN0YXJ0X2hvdXIgKiA2OwogICAgdmFyIGVuZF9pbmRleCA9IGVuZF9ob3VyICogNiArIDE7CiAgICBhbGxfaG91cnMgPSBhbGxfaG91cnMuc2xpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCk7CiAgfQoKICBmb3IgKHZhciBob3VySWR4ID0gMDsgaG91cklkeCA8IGFsbF9ob3Vycy5sZW5ndGg7IGhvdXJJZHgrKykgewogICAgdmFyIGhvdXIgPSBhbGxfaG91cnNbaG91cklkeF07CiAgICB2YXIgdmFsdWUgPSAiIi5jb25jYXQoZGF0ZV9wYXJ0LCAiVCIpLmNvbmNhdChob3VyLCAiLjAwMFoiKTsKICAgIGNlbGxzLnB1c2goewogICAgICB2YWx1ZTogdmFsdWUsCiAgICAgIGluZGV4OiBob3VySWR4LAogICAgICB2aXNpYmxlOiB0cnVlCiAgICB9KTsKICB9CgogIHJldHVybiBjZWxsczsKfTsKLyoqCiAqIGdldCBhbGwgZXZlbnRzIGZvciB0aGUgZ2l2ZW4gZGF5LgogKiBUaGlzIGluY2x1ZGVzIGV2ZW50cyB0aGF0IHN0YXJ0IG9yIGVuZCBvbiB0aGUgZ2l2ZW4gZGF5IG9yIHNwYW4gdGhlIHdob2xlIGRheSAobXVsdGktZGF5IGV2ZW50cykKICogQHBhcmFtIGRheQogKiBAcGFyYW0gZXhpc3RpbmdfZXZlbnRzCiAqIEByZXR1cm5zIHt7fX0KICovCgoKdmFyIGNvbnN0cnVjdERheUV2ZW50cyA9IGZ1bmN0aW9uIGNvbnN0cnVjdERheUV2ZW50cyhkYXksIGV4aXN0aW5nX2V2ZW50cywgZGF5X29wdGlvbnMpIHsKICAvL2RheSBpcyBkYXRlIHRvIGRpc3BsYXkgZXZlbnRzIGF0IDAwOjAwCiAgdmFyIGRheVN0YXJ0ID0gbmV3IERhdGUoZGF5KTsKICB2YXIgZGF5RW5kID0gbmV3IERhdGUoZGF5KTsKICBkYXlFbmQuc2V0SG91cnMoMjMsIDIzLCA1OSk7CiAgdmFyIGV2ZW50c19mb3JfdGhpc19kYXkgPSBleGlzdGluZ19ldmVudHMubWFwKGZ1bmN0aW9uIChldmVudCkgewogICAgdmFyIGZyb20gPSBldmVudC5mcm9tLAogICAgICAgIHRvID0gZXZlbnQudG87CiAgICBmcm9tID0gZ2V0TG9jYWxlVGltZShmcm9tKTsKICAgIHRvID0gZ2V0TG9jYWxlVGltZSh0byk7CiAgICByZXR1cm4gX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIGV2ZW50KSwge30sIHsKICAgICAgZnJvbTogZnJvbSwKICAgICAgdG86IHRvCiAgICB9KTsKICB9KS5maWx0ZXIoZnVuY3Rpb24gKGV2ZW50RW50cnkpIHsKICAgIC8vZ2V0IGFsbCBldmVudHMgdGhhdCBzdGFydCBvbiB0aGUgY3VycmVudCBkYXkKICAgIGlmIChldmVudEVudHJ5LmZyb20uc2xpY2UoMCwgMTApID09PSBkYXkuc2xpY2UoMCwgMTApKSB7CiAgICAgIHJldHVybiB0cnVlOwogICAgfSBlbHNlIGlmIChldmVudEVudHJ5LnRvLnNsaWNlKDAsIDEwKSA9PSBkYXkuc2xpY2UoMCwgMTApKSB7CiAgICAgIC8vb3IgZXZlbnRzIHRoYXQgZW5kIG9uIHRoZSBjdXJyZW50IGRheQogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0gZWxzZSBpZiAobmV3IERhdGUoZXZlbnRFbnRyeS5mcm9tKS5nZXRUaW1lKCkgPCBkYXlTdGFydC5nZXRUaW1lKCkgJiYgbmV3IERhdGUoZXZlbnRFbnRyeS50bykuZ2V0VGltZSgpID4gZGF5RW5kLmdldFRpbWUoKSkgewogICAgICAvL29yIHRoYXQgc3RhcnRlZCBiZWZvcmUgdGhlIGN1cnJlbnQgZGF5IGFuZCBlbmQgYWZ0ZXIgdGhlIGN1cnJlbnQgZGF5CiAgICAgIHJldHVybiB0cnVlOwogICAgfQoKICAgIHJldHVybiBmYWxzZTsKICB9KTsKICBpZiAoZXZlbnRzX2Zvcl90aGlzX2RheS5sZW5ndGggPT09IDApIHJldHVybiB7fTsKICB2YXIgZmlsdGVyZWRfZXZlbnRzID0ge307CiAgZXZlbnRzX2Zvcl90aGlzX2RheS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkgewogICAgdmFyIGNvbnN0cnVjdGVkRXZlbnQgPSBjb25zdHJ1Y3ROZXdFdmVudChldmVudCwgZGF5LCBkYXlfb3B0aW9ucyk7IC8vVVBEQVRFIFRJTUVTIEZPUiBNVUxUSURBWSBFVkVOVFMKCiAgICB2YXIga2V5ID0gY29uc3RydWN0ZWRFdmVudC5rZXk7CgogICAgaWYgKGZpbHRlcmVkX2V2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7CiAgICAgIGZpbHRlcmVkX2V2ZW50c1trZXldLnB1c2goY29uc3RydWN0ZWRFdmVudCk7CiAgICB9IGVsc2UgewogICAgICBmaWx0ZXJlZF9ldmVudHNba2V5XSA9IFtjb25zdHJ1Y3RlZEV2ZW50XTsKICAgIH0KICB9KTsKICByZXR1cm4gZmlsdGVyZWRfZXZlbnRzOwp9OwoKdmFyIGNvbnN0cnVjdE5ld0V2ZW50ID0gZnVuY3Rpb24gY29uc3RydWN0TmV3RXZlbnQoZXZlbnQsIGRheSwgZGF5X29wdGlvbnMpIHsKICB2YXIgZnJvbSA9IGV2ZW50LmZyb20sCiAgICAgIHRvID0gZXZlbnQudG87CiAgZnJvbSA9IG5ldyBEYXRlKGZyb20pOwogIHRvID0gbmV3IERhdGUodG8pOwogIGZyb20uc2V0VVRDU2Vjb25kcygwLCAwKTsKICB0by5zZXRVVENTZWNvbmRzKDAsIDApOwogIHZhciBmcm9tX3ZhbHVlID0gZnJvbS50b0lTT1N0cmluZygpOwogIHZhciBtYXNrZWRfZnJvbSA9IG5ldyBEYXRlKGZyb20uZ2V0VGltZSgpKTsKICB2YXIgbWFza2VkX3RvID0gbmV3IERhdGUodG8uZ2V0VGltZSgpKTsKICB2YXIgZnJvbURhdGEgPSB7CiAgICB2YWx1ZTogZnJvbV92YWx1ZSwKICAgIG1hc2tlZF92YWx1ZTogbWFza2VkX2Zyb20udG9JU09TdHJpbmcoKSwKICAgIHJvdW5kZWQ6IGZhbHNlLAogICAgcm91bmRfb2Zmc2V0OiBudWxsCiAgfTsKICB2YXIgdG9fdmFsdWUgPSB0by50b0lTT1N0cmluZygpOwogIHZhciB0b0RhdGEgPSB7CiAgICB2YWx1ZTogdG9fdmFsdWUsCiAgICBtYXNrZWRfdmFsdWU6IG1hc2tlZF90by50b0lTT1N0cmluZygpLAogICAgcm91bmRlZDogZmFsc2UsCiAgICByb3VuZF9vZmZzZXQ6IG51bGwKICB9OwogIHZhciBtdWx0aXBsZU9mMTAgPSBuZXcgRGF0ZShmcm9tRGF0YS52YWx1ZSkuZ2V0TWludXRlcygpICUgMTA7CgogIGlmIChtdWx0aXBsZU9mMTAgIT09IDApIHsKICAgIGZyb21EYXRhLnJvdW5kZWQgPSB0cnVlOwogICAgZnJvbURhdGEucm91bmRfb2Zmc2V0ID0gbXVsdGlwbGVPZjEwOwogICAgdmFyIG1pbnV0ZXMgPSBuZXcgRGF0ZShmcm9tRGF0YS52YWx1ZSkuZ2V0TWludXRlcygpOwogICAgdmFyIG1hc2tlZE1pbnV0ZXMgPSBNYXRoLmZsb29yKG1pbnV0ZXMgLyAxMCkgKiAxMDsKICAgIG1hc2tlZF9mcm9tLnNldE1pbnV0ZXMobWFza2VkTWludXRlcyk7CiAgICBmcm9tRGF0YS5tYXNrZWRfdmFsdWUgPSBtYXNrZWRfZnJvbS50b0lTT1N0cmluZygpOwogIH0KCiAgdmFyIGV2ZW50S2V5ID0gbWFza2VkX2Zyb20udG9JU09TdHJpbmcoKTsKICB2YXIgZGF5QmVnaW4gPSBuZXcgRGF0ZShkYXkpOwogIHZhciBkYXlFbmQgPSBuZXcgRGF0ZShkYXkpOwogIGRheUVuZC5zZXRIb3VycygyMywgNTksIDU5KTsKCiAgaWYgKGZyb20uZ2V0VGltZSgpIDwgZGF5QmVnaW4uZ2V0VGltZSgpKSB7CiAgICBkYXlCZWdpbi5zZXRIb3VycyhkYXlfb3B0aW9ucy5zdGFydF9ob3VyIC0gZGF5QmVnaW4uZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDYwKTsKICAgIGZyb20gPSBuZXcgRGF0ZShkYXlCZWdpbik7CiAgICBldmVudEtleSA9IGRheUJlZ2luLnRvSVNPU3RyaW5nKCk7CiAgfSAvLyB3ZSBuZWVkIHRvIGZpbmQgdGhlIGxlbmd0aCAoaGVpZ2h0KQogIC8vIG9mIHRoZSBldmVudCBieSBmaW5kaW5nIG91dCB0aGUgZGlmZmVyZW5jZSBpbiBtaW51dGVzCgoKICB2YXIgZGlmZkluTWludXRlcyA9IE1hdGguY2VpbCgodG8gLSBmcm9tKSAvIDYwMDAwKTsKICB2YXIgY29uc3RydWN0ZWRFdmVudCA9IHsKICAgIHN0YXJ0OiBmcm9tRGF0YSwKICAgIGVuZDogdG9EYXRhLAogICAgZGF0YTogZXZlbnQuZGF0YSwKICAgIGlkOiBldmVudC5pZCB8fCBnZW5lcmF0ZVVVSUQoKSwKICAgIGRpc3RhbmNlOiBkaWZmSW5NaW51dGVzLAogICAgc3RhdHVzOiAiY29tcGxldGVkIiwKICAgIGtleTogZXZlbnRLZXkKICB9OwogIHJldHVybiBjb25zdHJ1Y3RlZEV2ZW50Owp9OwoK', null, false);
/* eslint-enable */

var worker = new WorkerFactory();
var promiseWorker = PromiseWorker(worker);

var send = function send() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "message";
  var data = arguments.length > 1 ? arguments[1] : undefined;
  return promiseWorker.postMessage({
    type: type,
    data: data
  });
};

var myWorker = {
  send: send
};

var script = {
  props: ["day", "passedTime"],
  created: function created() {
    // get and render day cells
    // and then render any event
    // on top of them
    this.renderDay();
  },
  components: {
    kalendarCell: function kalendarCell() {
      return import('./kalendar-cell-5208b28a.js');
    }
  },
  provide: function provide() {
    // provide these methods to children components
    // for easier access
    return {
      kalendarAddEvent: this.addEvent,
      kalendarClearPopups: this.clearCreatingLeftovers
    };
  },
  // inject kalendar options from parent component
  inject: ["kalendar_options"],
  mounted: function mounted() {
    if (this.kalendar_options.scrollToNow && this.isToday) this.scrollView();
  },
  computed: {
    isWeekend: function isWeekend$1() {
      return isWeekend(this.day.value);
    },
    isToday: function isToday$1() {
      return isToday(this.day.value);
    }
  },
  data: function data() {
    return {
      // this is the main object
      // we use to make selections
      // and control their flows
      creator: {
        creating: false,
        starting_cell: null,
        original_starting_cell: null,
        current_cell: null,
        ending_cell: null,
        status: null
      },
      // temporary event is an object
      // that holds values of creator
      // when the popup is initiated
      temporary_event: null,
      // day cells and events are used for rendering purposes
      day_cells: [],
      day_events: null
    };
  },
  methods: {
    renderDay: function renderDay() {
      var _this = this;

      myWorker.send("getDayCells", {
        day: this.day.value,
        hourOptions: {
          start_hour: this.kalendar_options.day_starts_at,
          end_hour: this.kalendar_options.day_ends_at
        }
      }).then(function (reply) {
        _this.day_cells = reply;

        _this.getDayEvents(_this.$kalendar.getEvents());
      });
    },
    addEvent: function addEvent(payload) {
      var _this2 = this;

      // validation
      var validation_message = this.checkEventValidity(payload);

      if (validation_message !== null) {
        return Promise.reject(validation_message);
      } // use web worker to generate event
      // and then render it in the day_events objects


      var from = payload.from,
          to = payload.to;
      from = getLocaleTime(from);
      to = getLocaleTime(to);
      return myWorker.send("constructNewEvent", {
        event: _objectSpread2(_objectSpread2({}, payload), {}, {
          from: from,
          to: to
        }),
        day: from,
        hourOptions: {
          start_hour: this.kalendar_options.day_starts_at,
          end_hour: this.kalendar_options.day_ends_at
        }
      }).then(function (constructed_event) {
        var key = constructed_event.key;

        if (_this2.day_events.hasOwnProperty(key)) {
          _this2.day_events[key].push(constructed_event);
        } else {
          // must use $set since key wasnt present in the object
          // vue will fail to render it
          _this2.$set(_this2.day_events, key, [constructed_event]);
        }

        var events = _this2.$kalendar.getEvents();
        events.push(_objectSpread2(_objectSpread2({}, payload), {}, {
          id: constructed_event.id
        }));

        _this2.$kalendar.updateEvents(events);
      });
    },
    // this is not called inside this component
    // but rather from the kalendar-weekview component
    // which targets it using $refs object.
    removeEvent: function removeEvent(payload) {
      var events = this.$kalendar.getEvents();
      var eventIndex = events.findIndex(function (event) {
        return event.id === payload.id;
      });
      if (eventIndex < 0) return;
      events.splice(eventIndex, 1);
      var index = this.day_events[payload.key].findIndex(function (event) {
        return event.id === payload.id;
      });
      this.day_events[payload.key].splice(index, 1);
      this.$kalendar.updateEvents(events);
      return Promise.resolve();
    },
    checkEventValidity: function checkEventValidity(payload) {
      var from = payload.from,
          to = payload.to;
      if (!from || !to) return "No dates were provided in the payload";
      /*if (isoFrom !== from) {
        return 'From date is not ISO format';
      }
      if (isoTo !== to) {
        return 'To date is not ISO format';
      }*/

      return null;
    },
    getDayEvents: function getDayEvents(events) {
      var _this3 = this;

      var clonedEvents = events.map(function (event) {
        return cloneObject(event);
      });
      return myWorker.send("constructDayEvents", {
        events: clonedEvents,
        day: this.day.value,
        hourOptions: {
          start_hour: this.kalendar_options.day_starts_at,
          end_hour: this.kalendar_options.day_ends_at
        }
      }).then(function (constructed_events) {
        if (Object.keys(constructed_events).length > 0) {
          console.debug("Events for current day " + _this3.day.value, constructed_events);
        }

        _this3.day_events = constructed_events;
      });
    },
    clearCreatingLeftovers: function clearCreatingLeftovers() {
      for (var key in this.day_events) {
        var hasPending = this.day_events[key].some(function (event) {
          return event.status === "popup-initiated" || event.status === "creating";
        });

        if (hasPending) {
          var completed = this.day_events[key].filter(function (event) {
            return event.status === "completed";
          });
          this.$set(this.day_events, key, completed);

          if (completed.length === 0) {
            delete this.day_events[key];
          }
        }
      }

      this.resetEvents();
    },
    resetEvents: function resetEvents() {
      if (!this.creator.creating && this.creator.status === null) return;
      this.creator = {
        creating: false,
        starting_cell: null,
        original_starting_cell: null,
        current_cell: null,
        ending_cell: null,
        status: null,
        temporary_id: null
      };
      this.temporary_event = null;
    },
    // this method is what we use
    // to start the flow of selecting a new cell
    // while the creator is enabled
    updateCreator: function updateCreator(payload) {
      this.creator = _objectSpread2(_objectSpread2({}, this.validateSelection(payload)), {}, {
        status: "creating"
      });

      if (this.kalendar_options.overlap === false && Object.keys(this.day_events).length > 0) {
        var fixedOverlap = this.overlapPolice(payload);

        if (fixedOverlap) {
          this.creator = this.validateSelection(fixedOverlap);
          this.selectCell();
          this.initiatePopup();
          return;
        }
      }

      this.selectCell();
    },
    // when the direction is reversed,
    // the ending cell is actually the originally selected cell
    validateSelection: function validateSelection(event) {
      var original_starting_cell = event.original_starting_cell,
          starting_cell = event.starting_cell,
          current_cell = event.current_cell;

      if (event.direction === "reverse" && original_starting_cell.index > current_cell.index) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          starting_cell: current_cell,
          ending_cell: original_starting_cell
        });
      }

      return event;
    },
    selectCell: function selectCell() {
      if (!this.creator.creating) return;
      var _this$creator = this.creator,
          creating = _this$creator.creating,
          ending_cell = _this$creator.ending_cell,
          current_cell = _this$creator.current_cell,
          starting_cell = _this$creator.starting_cell,
          original_starting_cell = _this$creator.original_starting_cell;
      var real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];
      var diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      var diffInHrs = Math.floor(diffInMs % 86400000 / 3600000);
      var diffMins = Math.round(diffInMs % 86400000 % 3600000 / 60000);
      var startDate = new Date(starting_cell.value);
      var endDate = new Date(ending_cell.value);
      var distance = diffMins + diffInHrs * 60;
      this.temporary_event = {
        start: {
          masked_value: startDate.toISOString(),
          value: startDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        end: {
          masked_value: endDate.toISOString(),
          value: endDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        distance: distance,
        status: "creating"
      };
    },
    initiatePopup: function initiatePopup() {
      if (this.creating && this.creator.status !== "creating") return;
      this.creator = _objectSpread2(_objectSpread2({}, this.creator), {}, {
        status: "popup-initiated",
        creating: false
      });
      var _this$creator2 = this.creator,
          ending_cell = _this$creator2.ending_cell,
          current_cell = _this$creator2.current_cell,
          starting_cell = _this$creator2.starting_cell,
          original_starting_cell = _this$creator2.original_starting_cell;
      var real_ending_cell_index = ending_cell.index + 1;
      ending_cell = this.day_cells[real_ending_cell_index];
      var diffInMs = new Date(ending_cell.value) - new Date(starting_cell.value);
      var diffInHrs = Math.floor(diffInMs % 86400000 / 3600000);
      var diffMins = Math.round(diffInMs % 86400000 % 3600000 / 60000);
      var startDate = new Date(starting_cell.value);
      var endDate = new Date(ending_cell.value);
      var finalEvent = {
        start: {
          masked_value: startDate.toISOString(),
          value: startDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        end: {
          masked_value: endDate.toISOString(),
          value: endDate.toISOString(),
          rounded: false,
          round_offset: null
        },
        distance: diffMins + diffInHrs * 60,
        status: "popup-initiated"
      };
      var updated_events = this.day_events[starting_cell.value];
      if (!updated_events) updated_events = [];
      updated_events.push(finalEvent);
      this.$set(this.day_events, starting_cell.value, updated_events);
      this.temporary_event = null;
    },
    overlapPolice: function overlapPolice(payload) {
      var _this4 = this;

      if (!payload.current_cell) return;
      var overlapped = Object.keys(this.day_events).map(function (evKey) {
        return _this4.day_events[evKey];
      }).flat().filter(function (event) {
        var cellStart = new Date(payload.starting_cell.value);
        var cellEnd = new Date(payload.ending_cell.value);
        var eventStarts = new Date(event.start.value);
        var eventEnds = new Date(event.end.value);
        return cellEnd > eventStarts && cellEnd < eventEnds || cellStart < eventStarts && cellEnd > eventStarts;
      });

      if (!overlapped || overlapped.length === 0) {
        return;
      }

      var newPayload = payload;

      if (payload.direction === "reverse") {
        var needed_cell = overlapped[0].end;
        var event_cell = this.day_cells.find(function (c) {
          return c.value === needed_cell.masked_value;
        });
        var cell = this.day_cells[event_cell.index];
        newPayload.starting_cell = {
          value: cell.value,
          index: cell.index
        };
        newPayload.current_cell = {
          value: cell.value,
          index: cell.index
        };
      } else {
        var _needed_cell = overlapped[0].start;

        var _event_cell = this.day_cells.find(function (c) {
          return c.value === _needed_cell.masked_value;
        });

        var _cell = this.day_cells[_event_cell.index - 1];
        newPayload.ending_cell = {
          value: _cell.value,
          index: _cell.index
        };
      }

      return newPayload;
    },
    scrollView: function scrollView() {
      if (this.passedTime) {
        var topoffset = this.$refs.nowIndicator.offsetTop;
        setTimeout(function () {
          window.scroll({
            top: topoffset,
            left: 0,
            behavior: "smooth"
          });
        }, 500);
      }
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

  return _c("ul", {
    ref: _vm.day.value + "-reference",
    staticClass: "kalendar-day",
    class: {
      "is-weekend": _vm.isWeekend,
      "is-today": _vm.isToday,
      creating: _vm.creator.creating || _vm.creator.status === "popup-initiated"
    },
    staticStyle: {
      position: "relative"
    }
  }, [_vm.isToday && _vm.passedTime ? _c("div", {
    ref: "nowIndicator",
    class: _vm.kalendar_options.style === "material_design" ? "hour-indicator-line" : "hour-indicator-tooltip",
    style: "top:" + _vm.passedTime + "px"
  }, [_c("span", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.kalendar_options.style === "material_design",
      expression: "kalendar_options.style === 'material_design'"
    }],
    staticClass: "line"
  })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.day_cells, function (cell, index) {
    return _c("kalendar-cell", {
      key: "cell-" + index,
      attrs: {
        "constructed-events": _vm.day_events,
        creator: _vm.creator,
        "cell-data": cell,
        index: index,
        "temporary-event": _vm.temporary_event
      },
      on: {
        select: _vm.updateCreator,
        reset: function reset($event) {
          return _vm.resetEvents();
        },
        initiatePopup: function initiatePopup($event) {
          return _vm.initiatePopup();
        }
      },
      scopedSlots: _vm._u([_vm._l(_vm.$scopedSlots, function (_, slot) {
        return {
          key: slot,
          fn: function fn(scope) {
            return [_vm._t(slot, null, null, scope)];
          }
        };
      })], null, true)
    });
  })], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-d4156766_0", {
    source: "ul.kalendar-day {\n  position: relative;\n  background-color: white;\n}\nul.kalendar-day.is-weekend {\n  background-color: var(--weekend-color);\n}\nul.kalendar-day.is-today {\n  background-color: var(--current-day-color);\n}\nul.kalendar-day .clear {\n  position: absolute;\n  z-index: 1;\n  top: -20px;\n  right: 0;\n  font-size: 10px;\n}\nul.kalendar-day.creating {\n  z-index: 11;\n}\nul.kalendar-day.creating .created-event {\n  pointer-events: none;\n}\n\n/*# sourceMappingURL=kalendar-day.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/paul.kerspe/PhpstormProjects/calendar-ext/src/lib-components/kalendar-day.vue", "kalendar-day.vue"],
      "names": [],
      "mappings": "AA4ZA;EACA,kBAAA;EACA,uBAAA;AC3ZA;AD6ZA;EACA,sCAAA;AC3ZA;AD8ZA;EACA,0CAAA;AC5ZA;AD+ZA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;EACA,QAAA;EACA,eAAA;AC7ZA;ADgaA;EACA,WAAA;AC9ZA;ADgaA;EACA,oBAAA;AC9ZA;;AAEA,2CAA2C",
      "file": "kalendar-day.vue",
      "sourcesContent": ["<template>\n    <ul style=\"position: relative;\"\n        :class=\"{'is-weekend': isWeekend,'is-today': isToday,creating: creator.creating || creator.status === 'popup-initiated'}\"\n        class=\"kalendar-day\"\n        :ref=\"day.value + '-reference'\"\n    >\n        <div ref=\"nowIndicator\"\n             :class=\"kalendar_options.style === 'material_design' ? 'hour-indicator-line' : 'hour-indicator-tooltip' \"\n             v-if=\"isToday && passedTime\"\n             :style=\"`top:${passedTime}px`\"\n        >\n            <span class=\"line\" v-show=\"kalendar_options.style === 'material_design'\"></span>\n        </div>\n        <kalendar-cell\n                v-for=\"(cell, index) in day_cells\"\n                :constructed-events=\"day_events\"\n                :key=\"`cell-${index}`\"\n                :creator=\"creator\"\n                :cell-data=\"cell\"\n                :index=\"index\"\n                @select=\"updateCreator\"\n                @reset=\"resetEvents()\"\n                @initiatePopup=\"initiatePopup()\"\n                :temporary-event=\"temporary_event\"\n        >\n            <!-- inherit slots to child component -->\n            <template v-for=\"(_, slot) of $scopedSlots\" v-slot:[slot]=\"scope\">\n                <slot :name=\"slot\" v-bind=\"scope\"/>\n            </template>\n        </kalendar-cell>\n    </ul>\n</template>\n<script>\n    import {isToday, isWeekend, cloneObject, getLocaleTime} from \"./utils\";\n    import myWorker from \"@/lib-components/workers\";\n\n    export default {\n        props: [\"day\", \"passedTime\"],\n        created() {\n            // get and render day cells\n            // and then render any event\n            // on top of them\n            this.renderDay();\n        },\n        components: {\n            kalendarCell: () => import(\"./kalendar-cell.vue\")\n        },\n        provide() {\n            // provide these methods to children components\n            // for easier access\n            return {\n                kalendarAddEvent: this.addEvent,\n                kalendarClearPopups: this.clearCreatingLeftovers\n            };\n        },\n        // inject kalendar options from parent component\n        inject: [\"kalendar_options\"],\n        mounted() {\n            if (this.kalendar_options.scrollToNow && this.isToday) this.scrollView();\n        },\n        computed: {\n            isWeekend() {\n                return isWeekend(this.day.value);\n            },\n            isToday() {\n                return isToday(this.day.value);\n            }\n        },\n        data: () => ({\n            // this is the main object\n            // we use to make selections\n            // and control their flows\n            creator: {\n                creating: false,\n                starting_cell: null,\n                original_starting_cell: null,\n                current_cell: null,\n                ending_cell: null,\n                status: null\n            },\n            // temporary event is an object\n            // that holds values of creator\n            // when the popup is initiated\n            temporary_event: null,\n\n            // day cells and events are used for rendering purposes\n            day_cells: [],\n            day_events: null\n        }),\n        methods: {\n            renderDay() {\n                myWorker\n                    .send(\"getDayCells\", {\n                        day: this.day.value,\n                        hourOptions: {\n                            start_hour: this.kalendar_options.day_starts_at,\n                            end_hour: this.kalendar_options.day_ends_at\n                        }\n                    })\n                    .then(reply => {\n                        this.day_cells = reply;\n                        this.getDayEvents(this.$kalendar.getEvents());\n                    });\n            },\n\n            addEvent(payload) {\n                // validation\n                let validation_message = this.checkEventValidity(payload);\n                if (validation_message !== null) {\n                    return Promise.reject(validation_message);\n                }\n\n                // use web worker to generate event\n                // and then render it in the day_events objects\n                let {from, to} = payload;\n                from = getLocaleTime(from);\n                to = getLocaleTime(to);\n                return myWorker\n                    .send(\"constructNewEvent\", {\n                        event: {\n                            ...payload,\n                            from,\n                            to\n                        },\n                        day: from,\n                        hourOptions: {\n                            start_hour: this.kalendar_options.day_starts_at,\n                            end_hour: this.kalendar_options.day_ends_at\n                        }\n                    })\n                    .then(constructed_event => {\n                        let {key} = constructed_event;\n                        if (this.day_events.hasOwnProperty(key)) {\n                            this.day_events[key].push(constructed_event);\n                        } else {\n                            // must use $set since key wasnt present in the object\n                            // vue will fail to render it\n                            this.$set(this.day_events, key, [constructed_event]);\n                        }\n                        let events = this.$kalendar.getEvents();\n                        console.log(\"Adding event to kalendar\", payload);\n                        events.push({\n                            ...payload,\n                            id: constructed_event.id\n                        });\n                        this.$kalendar.updateEvents(events);\n                    });\n            },\n\n            // this is not called inside this component\n            // but rather from the kalendar-weekview component\n            // which targets it using $refs object.\n            removeEvent(payload) {\n                let events = this.$kalendar.getEvents();\n                let eventIndex = events.findIndex(event => event.id === payload.id);\n                if (eventIndex < 0) return;\n                events.splice(eventIndex, 1);\n                let index = this.day_events[payload.key].findIndex(\n                    event => event.id === payload.id\n                );\n                this.day_events[payload.key].splice(index, 1);\n                this.$kalendar.updateEvents(events);\n                return Promise.resolve();\n            },\n            checkEventValidity(payload) {\n                let {from, to} = payload;\n                if (!from || !to) return \"No dates were provided in the payload\";\n                /*if (isoFrom !== from) {\n                  return 'From date is not ISO format';\n                }\n                if (isoTo !== to) {\n                  return 'To date is not ISO format';\n                }*/\n                return null;\n            },\n            getDayEvents(events) {\n                let clonedEvents = events.map(event => cloneObject(event));\n                return myWorker\n                    .send(\"constructDayEvents\", {\n                        events: clonedEvents,\n                        day: this.day.value,\n                        hourOptions: {\n                            start_hour: this.kalendar_options.day_starts_at,\n                            end_hour: this.kalendar_options.day_ends_at\n                        }\n                    })\n                    .then(constructed_events => {\n                        if(Object.keys(constructed_events).length > 0) {\n                            console.debug(\"Events for current day \" + this.day.value, constructed_events);\n                        }\n                        this.day_events = constructed_events;\n                    });\n            },\n            clearCreatingLeftovers() {\n                for (let key in this.day_events) {\n                    let hasPending = this.day_events[key].some(event => {\n                        return (\n                            event.status === \"popup-initiated\" || event.status === \"creating\"\n                        );\n                    });\n                    if (hasPending) {\n                        let completed = this.day_events[key].filter(\n                            event => event.status === \"completed\"\n                        );\n                        this.$set(this.day_events, key, completed);\n                        if (completed.length === 0) {\n                            delete this.day_events[key];\n                        }\n                    }\n                }\n                this.resetEvents();\n            },\n            resetEvents() {\n                if (!this.creator.creating && this.creator.status === null) return;\n                this.creator = {\n                    creating: false,\n                    starting_cell: null,\n                    original_starting_cell: null,\n                    current_cell: null,\n                    ending_cell: null,\n                    status: null,\n                    temporary_id: null\n                };\n                this.temporary_event = null;\n            },\n\n            // this method is what we use\n            // to start the flow of selecting a new cell\n            // while the creator is enabled\n            updateCreator(payload) {\n                this.creator = {\n                    ...this.validateSelection(payload),\n                    status: \"creating\"\n                };\n                if (\n                    this.kalendar_options.overlap === false &&\n                    Object.keys(this.day_events).length > 0\n                ) {\n                    let fixedOverlap = this.overlapPolice(payload);\n                    if (fixedOverlap) {\n                        this.creator = this.validateSelection(fixedOverlap);\n                        this.selectCell();\n                        this.initiatePopup();\n                        return;\n                    }\n                }\n                this.selectCell();\n            },\n\n            // when the direction is reversed,\n            // the ending cell is actually the originally selected cell\n            validateSelection(event) {\n                let {original_starting_cell, starting_cell, current_cell} = event;\n                if (\n                    event.direction === \"reverse\" &&\n                    original_starting_cell.index > current_cell.index\n                ) {\n                    return {\n                        ...event,\n                        starting_cell: current_cell,\n                        ending_cell: original_starting_cell\n                    };\n                }\n                return event;\n            },\n            selectCell() {\n                if (!this.creator.creating) return;\n                let {\n                    creating,\n                    ending_cell,\n                    current_cell,\n                    starting_cell,\n                    original_starting_cell\n                } = this.creator;\n\n                let real_ending_cell_index = ending_cell.index + 1;\n                ending_cell = this.day_cells[real_ending_cell_index];\n\n                const diffInMs =\n                    new Date(ending_cell.value) - new Date(starting_cell.value);\n                const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);\n                const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);\n                let startDate = new Date(starting_cell.value);\n                let endDate = new Date(ending_cell.value);\n\n                let distance = diffMins + diffInHrs * 60;\n\n                this.temporary_event = {\n                    start: {\n                        masked_value: startDate.toISOString(),\n                        value: startDate.toISOString(),\n                        rounded: false,\n                        round_offset: null\n                    },\n                    end: {\n                        masked_value: endDate.toISOString(),\n                        value: endDate.toISOString(),\n                        rounded: false,\n                        round_offset: null\n                    },\n                    distance: distance,\n                    status: \"creating\"\n                };\n            },\n            initiatePopup() {\n                if (this.creating && this.creator.status !== \"creating\") return;\n                this.creator = {\n                    ...this.creator,\n                    status: \"popup-initiated\",\n                    creating: false\n                };\n                let {\n                    ending_cell,\n                    current_cell,\n                    starting_cell,\n                    original_starting_cell\n                } = this.creator;\n                let real_ending_cell_index = ending_cell.index + 1;\n                ending_cell = this.day_cells[real_ending_cell_index];\n\n                const diffInMs =\n                    new Date(ending_cell.value) - new Date(starting_cell.value);\n                const diffInHrs = Math.floor((diffInMs % 86400000) / 3600000);\n                const diffMins = Math.round(((diffInMs % 86400000) % 3600000) / 60000);\n                let startDate = new Date(starting_cell.value);\n                let endDate = new Date(ending_cell.value);\n\n                let finalEvent = {\n                    start: {\n                        masked_value: startDate.toISOString(),\n                        value: startDate.toISOString(),\n                        rounded: false,\n                        round_offset: null\n                    },\n                    end: {\n                        masked_value: endDate.toISOString(),\n                        value: endDate.toISOString(),\n                        rounded: false,\n                        round_offset: null\n                    },\n                    distance: diffMins + diffInHrs * 60,\n                    status: \"popup-initiated\"\n                };\n\n                let updated_events = this.day_events[starting_cell.value];\n                if (!updated_events) updated_events = [];\n                updated_events.push(finalEvent);\n\n                this.$set(this.day_events, starting_cell.value, updated_events);\n                this.temporary_event = null;\n            },\n            overlapPolice(payload) {\n                if (!payload.current_cell) return;\n                let overlapped = Object.keys(this.day_events)\n                    .map(evKey => {\n                        return this.day_events[evKey];\n                    })\n                    .flat()\n                    .filter(event => {\n                        let cellStart = new Date(payload.starting_cell.value);\n                        let cellEnd = new Date(payload.ending_cell.value);\n                        let eventStarts = new Date(event.start.value);\n                        let eventEnds = new Date(event.end.value);\n                        return (\n                            (cellEnd > eventStarts && cellEnd < eventEnds) ||\n                            (cellStart < eventStarts && cellEnd > eventStarts)\n                        );\n                    });\n                if (!overlapped || overlapped.length === 0) {\n                    return;\n                }\n                let newPayload = payload;\n                if (payload.direction === \"reverse\") {\n                    let needed_cell = overlapped[0].end;\n                    let event_cell = this.day_cells.find(\n                        c => c.value === needed_cell.masked_value\n                    );\n                    let cell = this.day_cells[event_cell.index];\n                    newPayload.starting_cell = {\n                        value: cell.value,\n                        index: cell.index\n                    };\n                    newPayload.current_cell = {\n                        value: cell.value,\n                        index: cell.index\n                    };\n                } else {\n                    let needed_cell = overlapped[0].start;\n                    let event_cell = this.day_cells.find(\n                        c => c.value === needed_cell.masked_value\n                    );\n                    let cell = this.day_cells[event_cell.index - 1];\n                    newPayload.ending_cell = {\n                        value: cell.value,\n                        index: cell.index\n                    };\n                }\n                return newPayload;\n            },\n            scrollView() {\n                if (this.passedTime) {\n                    let topoffset = this.$refs.nowIndicator.offsetTop;\n                    console.log(\"Scrolling to :\", topoffset);\n                    setTimeout(() => {\n                        window.scroll({top: topoffset, left: 0, behavior: \"smooth\"});\n                    }, 500);\n                }\n            }\n        }\n    };\n</script>\n<style lang=\"scss\">\n    ul.kalendar-day {\n        position: relative;\n        background-color: white;\n\n        &.is-weekend {\n            background-color: var(--weekend-color);\n        }\n\n        &.is-today {\n            background-color: var(--current-day-color);\n        }\n\n        .clear {\n            position: absolute;\n            z-index: 1;\n            top: -20px;\n            right: 0;\n            font-size: 10px;\n        }\n\n        &.creating {\n            z-index: 11;\n\n            .created-event {\n                pointer-events: none;\n            }\n        }\n    }\n</style>\n", "ul.kalendar-day {\n  position: relative;\n  background-color: white;\n}\nul.kalendar-day.is-weekend {\n  background-color: var(--weekend-color);\n}\nul.kalendar-day.is-today {\n  background-color: var(--current-day-color);\n}\nul.kalendar-day .clear {\n  position: absolute;\n  z-index: 1;\n  top: -20px;\n  right: 0;\n  font-size: 10px;\n}\nul.kalendar-day.creating {\n  z-index: 11;\n}\nul.kalendar-day.creating .created-event {\n  pointer-events: none;\n}\n\n/*# sourceMappingURL=kalendar-day.vue.map */"]
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

//
var script$1 = {
  props: {
    current_day: {
      required: true,
      type: String,
      validator: function validator(d) {
        return !isNaN(Date.parse(d));
      }
    }
  },
  components: {
    KalendarDays: __vue_component__
  },
  created: function created() {
    var _this = this;

    this.addHelperMethods();
    setInterval(function () {
      return _this.kalendar_options.now = new Date();
    }, 1000 * 60);
    this.constructWeek();
  },
  inject: ["kalendar_options", "kalendar_events"],
  data: function data() {
    return {
      hours: null,
      days: []
    };
  },
  computed: {
    hoursVisible: function hoursVisible() {
      if (!this.hours) return [];
      return this.hours.filter(function (x) {
        return !!x.visible;
      });
    },
    colsSpace: function colsSpace() {
      return this.kalendar_options.style === "flat_design" ? "5px" : "0px";
    },
    hourHeight: function hourHeight() {
      return 6 * this.kalendar_options.cell_height; //this.kalendar_options.cell_height * (60 / this.kalendar_options.split_value);
      // * this.kalendar_options.hour_parts;
    },
    passedTime: function passedTime() {
      var _this$kalendar_option = this.kalendar_options,
          day_starts_at = _this$kalendar_option.day_starts_at,
          day_ends_at = _this$kalendar_option.day_ends_at,
          now = _this$kalendar_option.now;
      var time = getLocaleTime(now);
      var day_starts = "".concat(time.split("T")[0], "T").concat((day_starts_at + "").padStart(2, '0'), ":00:00.000Z");
      var day_ends = "".concat(time.split("T")[0], "T").concat((day_ends_at + "").padStart(2, '0'), ":00:00.000Z");
      var time_obj = new Date(time);
      if (new Date(day_ends) < time_obj || time_obj < new Date(day_starts)) return null;
      var distance = (time_obj - new Date(day_starts)) / 1000 / 60;
      return {
        distance: distance,
        time: time
      };
    }
  },
  methods: {
    _isToday: function _isToday(day) {
      return isToday(day);
    },
    updateAppointments: function updateAppointments(_ref) {
      var id = _ref.id,
          data = _ref.data;
      this.$emit("update", {
        id: id,
        data: data
      });
    },
    deleteAppointment: function deleteAppointment(id) {
      this.$emit("delete", {
        id: id
      });
    },
    clearAppointments: function clearAppointments() {
      this.$emit("clear");
    },
    isDayBefore: function isDayBefore(day) {
      var now = new Date(this.kalendar_options.now);
      var formattedNow = getLocaleTime(now.toISOString());
      return isBefore(day, getHourlessDate(formattedNow));
    },
    constructWeek: function constructWeek() {
      var _this2 = this;

      var date = this.current_day.slice(0, 10);
      var _this$kalendar_option2 = this.kalendar_options,
          hide_dates = _this$kalendar_option2.hide_dates,
          hide_days = _this$kalendar_option2.hide_days,
          view_type = _this$kalendar_option2.view_type;
      return Promise.all([myWorker.send("getDays", {
        day: date,
        options: {
          hide_dates: hide_dates,
          hide_days: hide_days,
          view_type: view_type
        }
      }).then(function (reply) {
        _this2.days = reply; //.slice(0,1);
      }), myWorker.send("getHours", {
        hourOptions: {
          start_hour: this.kalendar_options.day_starts_at,
          end_hour: this.kalendar_options.day_ends_at
        }
      }).then(function (reply) {
        // Handle the reply
        _this2.hours = reply;
      })]);
    },
    addHelperMethods: function addHelperMethods() {
      var _this3 = this;

      this.$kalendar.buildWeek = function () {
        _this3.constructWeek();
      };

      this.$kalendar.addNewEvent = function (payload) {
        if (!payload) return Promise.reject("No payload");
        var from = payload.from,
            to = payload.to;
        if (from.slice(-4) === "000Z") payload.from = addTimezoneInfo(from);
        if (to.slice(-4) === "000Z") payload.to = addTimezoneInfo(to);
        var targetRef = payload.from.slice(0, 10);
        var refObject = _this3.$refs[targetRef];

        if (refObject && refObject[0]) {
          refObject[0].addEvent(payload);
        } else {
          // appointment is not in this view
          var events = _this3.$kalendar.getEvents();

          events.push(payload);

          _this3.$kalendar.updateEvents(events);
        }
      };

      this.$kalendar.removeEvent = function (options) {
        var day = options.day,
            key = options.key,
            id = options.id;

        if (day.length > 10) {
          day = day.slice(0, 10);
        }
        if (!day) return Promise.reject("Day wasn't provided");
        if (!id) return Promise.reject("No ID was provided");
        if (!key) return Promise.reject("No key was provided in the object");
        var targetRef = day;

        _this3.$refs[targetRef][0].removeEvent({
          id: id,
          key: key
        });
      };

      this.$kalendar.closePopups = function () {
        var refs = _this3.days.map(function (day) {
          return day.value.slice(0, 10);
        });

        refs.forEach(function (ref) {
          _this3.$refs[ref][0].clearCreatingLeftovers();
        });
      };
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

  return _c("div", {
    staticClass: "calendar-wrap",
    style: "--space-between-cols: " + _vm.colsSpace
  }, [_c("div", {
    staticClass: "stickyCalendarHead"
  }, [_c("ul", {
    staticClass: "days"
  }, _vm._l(_vm.days || [], function (ref, index) {
    var value = ref.value;
    return _c("li", {
      key: index,
      staticClass: "day-indicator",
      class: {
        today: _vm._isToday(value),
        "is-before": _vm.isDayBefore(value)
      }
    }, [_c("div", [_c("span", {
      staticClass: "letters-date"
    }, [_vm._v(_vm._s(_vm.kalendar_options.formatDayTitle(value)[0]))]), _vm._v(" "), _c("span", {
      staticClass: "number-date"
    }, [_vm._v(_vm._s(_vm.kalendar_options.formatDayTitle(value)[1]))])])]);
  }), 0), _vm._v(" "), _c("ul", {
    staticClass: "all-day"
  }, [_c("span", [_vm._v("All Day")]), _vm._v(" "), _vm._l(_vm.days || [], function (date, index) {
    return _c("li", {
      key: index,
      class: {
        "all-today": _vm._isToday(date.value),
        "is-all-day": false
      },
      style: "height:" + (_vm.kalendar_options.cell_height + 5) + "px"
    });
  })], 2)]), _vm._v(" "), _vm.hours ? _c("div", {
    staticClass: "blocks"
  }, [_c("div", {
    staticClass: "calendar-blocks"
  }, [_c("ul", {
    staticClass: "hours"
  }, _vm._l(_vm.hoursVisible, function (hour, index) {
    return _c("li", {
      key: index,
      staticClass: "hour-row-identifier",
      style: "height:" + _vm.hourHeight + "px"
    }, [_c("span", [_vm._v(_vm._s(_vm.kalendar_options.formatLeftHours(hour.value)))])]);
  }), 0), _vm._v(" "), this.passedTime ? _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.kalendar_options.style !== "material_design",
      expression: "kalendar_options.style !== 'material_design'"
    }],
    staticClass: "hour-indicator-line",
    style: "top:" + _vm.passedTime.distance + "px"
  }, [_c("span", {
    staticClass: "time-value"
  }, [_vm._v(_vm._s(_vm.passedTime.value))]), _vm._v(" "), _c("span", {
    staticClass: "line"
  })]) : _vm._e(), _vm._v(" "), _vm._l(_vm.days, function (day, index) {
    return _c("kalendar-days", {
      key: day.value.slice(0, 10),
      ref: day.value.slice(0, 10),
      refInFor: true,
      staticClass: "building-blocks",
      class: "day-" + (index + 1),
      attrs: {
        day: day,
        "passed-time": _vm.passedTime ? _vm.passedTime.distance : null
      },
      scopedSlots: _vm._u([_vm._l(_vm.$scopedSlots, function (_, slot) {
        return {
          key: slot,
          fn: function fn(scope) {
            return [_vm._t(slot, null, null, scope)];
          }
        };
      })], null, true)
    });
  })], 2)]) : _vm._e()]);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-5f8e1482_0", {
    source: ".calendar-wrap[data-v-5f8e1482] {\n  display: flex;\n  flex-direction: column;\n}\n.calendar-wrap ul[data-v-5f8e1482] {\n  list-style: none;\n  padding: 0px;\n}\n.calendar-wrap ul > li[data-v-5f8e1482] {\n  display: flex;\n}\n.calendar-wrap .stickyCalendarHead[data-v-5f8e1482] {\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  background-color: white;\n}\n.calendar-wrap .stickyCalendarHead .days[data-v-5f8e1482] {\n  margin: 0px;\n  display: flex;\n  margin-left: 55px;\n}\n.calendar-wrap .stickyCalendarHead .days li[data-v-5f8e1482] {\n  display: inline-flex;\n  align-items: flex-end;\n  padding-top: 10px;\n  flex: 1;\n  font-size: 1.1rem;\n  color: #666;\n  font-weight: 300;\n  margin-right: var(--space-between-cols);\n  border-bottom: solid 1px #e5e5e5;\n  padding-bottom: 5px;\n  position: relative;\n  font-size: 18px;\n}\n.calendar-wrap .stickyCalendarHead .days li span[data-v-5f8e1482] {\n  margin-right: 3px;\n}\n.calendar-wrap .stickyCalendarHead .days li span[data-v-5f8e1482]:first-child {\n  font-size: 20px;\n  font-weight: 500;\n}\n.calendar-wrap .stickyCalendarHead .days .today[data-v-5f8e1482] {\n  border-bottom-color: var(--main-color);\n  color: var(--main-color) !important;\n}\n.calendar-wrap .stickyCalendarHead .days .today[data-v-5f8e1482]::after {\n  content: \"\";\n  position: absolute;\n  height: 2px;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background-color: var(--main-color);\n}\n.calendar-wrap .stickyCalendarHead .all-day[data-v-5f8e1482] {\n  display: flex;\n  margin-bottom: 0px;\n  margin-top: 0px;\n  border-bottom: solid 2px #e5e5e5;\n}\n.calendar-wrap .stickyCalendarHead .all-day span[data-v-5f8e1482] {\n  display: flex;\n  align-items: center;\n  padding: 0px 5px;\n  width: 55px;\n  font-weight: 500;\n  font-size: 0.8rem;\n  color: #b8bbca;\n  text-transform: lowercase;\n}\n.calendar-wrap .stickyCalendarHead .all-day li[data-v-5f8e1482] {\n  flex: 1;\n  margin-right: var(--space-between-cols);\n}\n.calendar-wrap .stickyCalendarHead .all-day li.all-today[data-v-5f8e1482] {\n  background-color: #fef4f4;\n}\n.dummy-row[data-v-5f8e1482] {\n  display: flex;\n  padding-left: 55px;\n}\n.dummy-row ul[data-v-5f8e1482] {\n  display: flex;\n  flex: 1;\n  margin: 0px;\n}\n.dummy-row li[data-v-5f8e1482] {\n  flex: 1;\n  height: 15px;\n  margin-right: var(--space-between-cols);\n  border-bottom: solid 1px #e5e5e5;\n}\n.blocks[data-v-5f8e1482] {\n  display: flex;\n  position: relative;\n  height: 100%;\n}\n.blocks ul[data-v-5f8e1482] {\n  margin-top: 0px;\n}\n.blocks .building-blocks[data-v-5f8e1482] {\n  flex: 1;\n  margin-right: var(--space-between-cols);\n  margin-bottom: 0px;\n  display: flex;\n  flex-direction: column;\n}\n.blocks .calendar-blocks[data-v-5f8e1482] {\n  width: 100%;\n  display: flex;\n  position: relative;\n}\n.hours[data-v-5f8e1482] {\n  display: flex;\n  flex-direction: column;\n  color: #b8bbca;\n  font-weight: 500;\n  font-size: 0.85rem;\n  width: 55px;\n  height: 100%;\n  margin-bottom: 0px;\n}\n.hours li[data-v-5f8e1482] {\n  color: var(--hour-row-color);\n  border-bottom: solid 1px transparent;\n  padding-left: 8px;\n}\n.hours li span[data-v-5f8e1482] {\n  margin-top: -8px;\n}\n.hours li:first-child span[data-v-5f8e1482] {\n  visibility: hidden;\n}\n\n/*# sourceMappingURL=kalendar-weekview.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/paul.kerspe/PhpstormProjects/calendar-ext/src/lib-components/kalendar-weekview.vue", "kalendar-weekview.vue"],
      "names": [],
      "mappings": "AAqOA;EACA,aAAA;EACA,sBAAA;ACpOA;ADsOA;EACA,gBAAA;EACA,YAAA;ACpOA;ADsOA;EACA,aAAA;ACpOA;ADyOA;EACA,gBAAA;EACA,MAAA;EACA,WAAA;EACA,uBAAA;ACvOA;ADyOA;EACA,WAAA;EACA,aAAA;EACA,iBAAA;ACvOA;ADyOA;EACA,oBAAA;EACA,qBAAA;EACA,iBAAA;EACA,OAAA;EACA,iBAAA;EACA,WAnCA;EAoCA,gBAAA;EACA,uCAAA;EACA,gCAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;ACvOA;ADyOA;EACA,iBAAA;ACvOA;AD0OA;EACA,eAAA;EACA,gBAAA;ACxOA;AD4OA;EACA,sCAAA;EACA,mCAAA;AC1OA;AD6OA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,OAAA;EACA,WAAA;EACA,mCAAA;AC3OA;AD+OA;EACA,aAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;AC7OA;AD+OA;EACA,aAAA;EACA,mBAAA;EACA,gBAAA;EACA,WAAA;EACA,gBAAA;EACA,iBAAA;EACA,cAAA;EACA,yBAAA;AC7OA;ADgPA;EACA,OAAA;EACA,uCAAA;AC9OA;ADgPA;EACA,yBAAA;AC9OA;ADqPA;EACA,aAAA;EACA,kBAAA;AClPA;ADoPA;EACA,aAAA;EACA,OAAA;EACA,WAAA;AClPA;ADqPA;EACA,OAAA;EACA,YAAA;EACA,uCAAA;EACA,gCAAA;ACnPA;ADuPA;EACA,aAAA;EACA,kBAAA;EACA,YAAA;ACpPA;ADsPA;EACA,eAAA;ACpPA;ADuPA;EACA,OAAA;EACA,uCAAA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;ACrPA;ADwPA;EACA,WAAA;EACA,aAAA;EACA,kBAAA;ACtPA;AD0PA;EACA,aAAA;EACA,sBAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;ACvPA;ADyPA;EACA,4BAAA;EACA,oCAAA;EACA,iBAAA;ACvPA;ADyPA;EACA,gBAAA;ACvPA;AD0PA;EACA,kBAAA;ACxPA;;AAEA,gDAAgD",
      "file": "kalendar-weekview.vue",
      "sourcesContent": ["<template>\n  <div class=\"calendar-wrap\" :style=\"`--space-between-cols: ${colsSpace}`\">\n    <div class=\"stickyCalendarHead\">\n      <ul class=\"days\">\n        <li\n          class=\"day-indicator\"\n          :key=\"index\"\n          v-for=\"({ value }, index) in days || []\"\n          :class=\"{ today: _isToday(value), 'is-before': isDayBefore(value) }\"\n        >\n          <div>\n            <span class=\"letters-date\">{{\n              kalendar_options.formatDayTitle(value)[0]\n            }}</span>\n            <span class=\"number-date\">{{\n              kalendar_options.formatDayTitle(value)[1]\n            }}</span>\n          </div>\n        </li>\n      </ul>\n      <ul class=\"all-day\">\n        <span>All Day</span>\n        <li\n          :key=\"index\"\n          v-for=\"(date, index) in days || []\"\n          :class=\"{ 'all-today': _isToday(date.value), 'is-all-day': false }\"\n          :style=\"`height:${kalendar_options.cell_height + 5}px`\"\n        ></li>\n      </ul>\n    </div>\n    <div class=\"blocks\" v-if=\"hours\">\n      <div class=\"calendar-blocks\">\n        <ul class=\"hours\">\n          <li\n            class=\"hour-row-identifier\"\n            :key=\"index\"\n            v-for=\"(hour, index) in hoursVisible\"\n            :style=\"`height:${hourHeight}px`\"\n          >\n            <span>{{ kalendar_options.formatLeftHours(hour.value) }}</span>\n          </li>\n        </ul>\n        <div\n          v-if=\"this.passedTime\"\n          v-show=\"kalendar_options.style !== 'material_design'\"\n          class=\"hour-indicator-line\"\n          :style=\"`top:${passedTime.distance}px`\"\n        >\n          <span class=\"time-value\">{{ passedTime.value }}</span>\n          <span class=\"line\"></span>\n        </div>\n        <kalendar-days\n          :day=\"day\"\n          class=\"building-blocks\"\n          :class=\"`day-${index + 1}`\"\n          :key=\"day.value.slice(0, 10)\"\n          v-for=\"(day, index) in days\"\n          :passed-time=\"(passedTime) ? passedTime.distance : null\"\n          :ref=\"day.value.slice(0, 10)\"\n        >\n          <!-- inherit slots to child component -->\n          <template v-for=\"(_, slot) of $scopedSlots\" v-slot:[slot]=\"scope\">\n            <slot :name=\"slot\" v-bind=\"scope\"/>\n          </template>\n        </kalendar-days>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\nimport KalendarDays from \"./kalendar-day.vue\";\nimport myWorker from \"@/lib-components/workers\";\nimport {\n  isBefore,\n  isToday,\n  getHourlessDate,\n  addTimezoneInfo,\n  getLocaleTime,\n} from \"./utils\";\n\nexport default {\n  props: {\n    current_day: {\n      required: true,\n      type: String,\n      validator: d => !isNaN(Date.parse(d)),\n    }\n  },\n  components: {\n    KalendarDays\n  },\n  created() {\n    this.addHelperMethods();\n    setInterval(() => (this.kalendar_options.now = new Date()), 1000 * 60);\n    this.constructWeek();\n  },\n  inject: [\"kalendar_options\", \"kalendar_events\"],\n  data: () => ({\n    hours: null,\n    days: []\n  }),\n  computed: {\n    hoursVisible() {\n      if (!this.hours) return [];\n      return this.hours.filter(x => !!x.visible);\n    },\n    colsSpace() {\n      return this.kalendar_options.style === \"flat_design\" ? \"5px\" : \"0px\";\n    },\n    hourHeight() {\n      return 6 * this.kalendar_options.cell_height;\n      //this.kalendar_options.cell_height * (60 / this.kalendar_options.split_value);\n      // * this.kalendar_options.hour_parts;\n    },\n    passedTime() {\n      let { day_starts_at, day_ends_at, now } = this.kalendar_options;\n      let time = getLocaleTime(now);\n      let day_starts = `${time.split(\"T\")[0]}T${(day_starts_at + \"\").padStart(2, '0')}:00:00.000Z`;\n      let day_ends = `${time.split(\"T\")[0]}T${(day_ends_at + \"\").padStart(2, '0')}:00:00.000Z`;\n      let time_obj = new Date(time);\n\n      if(new Date(day_ends) < time_obj || time_obj < new Date(day_starts)) return null;\n\n      let distance = (time_obj - new Date(day_starts)) / 1000 / 60;\n      return {distance, time};\n    }\n  },\n  methods: {\n    _isToday(day) {\n      return isToday(day);\n    },\n    updateAppointments({ id, data }) {\n      this.$emit(\"update\", { id, data });\n    },\n    deleteAppointment(id) {\n      this.$emit(\"delete\", { id });\n    },\n    clearAppointments() {\n      this.$emit(\"clear\");\n    },\n    isDayBefore(day) {\n      let now = new Date(this.kalendar_options.now);\n      let formattedNow = getLocaleTime(now.toISOString());\n      return isBefore(day, getHourlessDate(formattedNow));\n    },\n    constructWeek() {\n      const date = this.current_day.slice(0, 10);\n      const { hide_dates, hide_days, view_type } = this.kalendar_options;\n      return Promise.all([\n        myWorker\n          .send(\"getDays\", {\n            day: date,\n            options: {\n              hide_dates,\n              hide_days,\n              view_type\n            }\n          })\n          .then(reply => {\n            this.days = reply; //.slice(0,1);\n          }),\n        myWorker\n          .send(\"getHours\", {\n            hourOptions: {\n              start_hour: this.kalendar_options.day_starts_at,\n              end_hour: this.kalendar_options.day_ends_at\n            }\n          })\n          .then(reply => {\n            // Handle the reply\n            this.hours = reply;\n          })\n      ]);\n    },\n    addHelperMethods() {\n      this.$kalendar.buildWeek = () => {\n        this.constructWeek();\n      };\n      this.$kalendar.addNewEvent = payload => {\n        if (!payload) return Promise.reject(\"No payload\");\n\n        let { from, to } = payload;\n        if (from.slice(-4) === \"000Z\") payload.from = addTimezoneInfo(from);\n        if (to.slice(-4) === \"000Z\") payload.to = addTimezoneInfo(to);\n        let targetRef = payload.from.slice(0, 10);\n        const refObject = this.$refs[targetRef];\n        if (refObject && refObject[0]) {\n          refObject[0].addEvent(payload);\n        } else {\n          // appointment is not in this view\n          let events = this.$kalendar.getEvents();\n          events.push(payload);\n          this.$kalendar.updateEvents(events);\n        }\n      };\n\n      this.$kalendar.removeEvent = options => {\n        let { day, key, id } = options;\n        if (day.length > 10) {\n          day = day.slice(0, 10);\n        }\n        console.log(\"Options:\", options);\n        if (!day) return Promise.reject(\"Day wasn't provided\");\n        if (!id) return Promise.reject(\"No ID was provided\");\n        if (!key) return Promise.reject(\"No key was provided in the object\");\n        let targetRef = day;\n        this.$refs[targetRef][0].removeEvent({ id, key });\n      };\n\n      this.$kalendar.closePopups = () => {\n        let refs = this.days.map(day => day.value.slice(0, 10));\n        refs.forEach(ref => {\n          this.$refs[ref][0].clearCreatingLeftovers();\n        });\n      };\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n$blue: #5fb3f2;\n$lblue: #d6eefc;\n$dblue: #3d79b4;\n$lightgrey: #c7c9d5; //$lightgrey: #F5F4F5;\n$grey: #c7c9d5; //#C1C4C8;\n$a-grey: #666;\n$border-color: transparent;\n$theme-color: #e5e5e5;\n\n.calendar-wrap {\n  display: flex;\n  flex-direction: column;\n\n  ul {\n    list-style: none;\n    padding: 0px;\n\n    > li {\n      display: flex;\n    }\n  }\n\n\n  .stickyCalendarHead {\n    position: sticky;\n    top: 0;\n    z-index: 20;\n    background-color: white;\n\n    .days {\n      margin: 0px;\n      display: flex;\n      margin-left: 55px;\n\n      li {\n        display: inline-flex;\n        align-items: flex-end;\n        padding-top: 10px;\n        flex: 1;\n        font-size: 1.1rem;\n        color: $a-grey;\n        font-weight: 300;\n        margin-right: var(--space-between-cols);\n        border-bottom: solid 1px #e5e5e5;\n        padding-bottom: 5px;\n        position: relative;\n        font-size: 18px;\n\n        span {\n          margin-right: 3px;\n        }\n\n        span:first-child {\n          font-size: 20px;\n          font-weight: 500;\n        }\n      }\n\n      .today {\n        border-bottom-color: var(--main-color);\n        color: var(--main-color) !important;\n      }\n\n      .today::after {\n        content: \"\";\n        position: absolute;\n        height: 2px;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        background-color: var(--main-color);\n      }\n    }\n\n    .all-day {\n      display: flex;\n      margin-bottom: 0px; //border-top: solid 1px #e5e5e5;\n      margin-top: 0px;\n      border-bottom: solid 2px #e5e5e5;\n\n      span {\n        display: flex;\n        align-items: center;\n        padding: 0px 5px;\n        width: 55px;\n        font-weight: 500;\n        font-size: 0.8rem;\n        color: darken($grey, 5);\n        text-transform: lowercase;\n      }\n\n      li {\n        flex: 1; //border-right: solid 5px $border-color;\n        margin-right: var(--space-between-cols);\n\n        &.all-today {\n          background-color: #fef4f4;\n        }\n      }\n    }\n  }\n}\n\n.dummy-row {\n  display: flex;\n  padding-left: 55px;\n\n  ul {\n    display: flex;\n    flex: 1;\n    margin: 0px;\n  }\n\n  li {\n    flex: 1;\n    height: 15px; //border-right: solid 5px $border-color;\n    margin-right: var(--space-between-cols);\n    border-bottom: solid 1px #e5e5e5;\n  }\n}\n\n.blocks {\n  display: flex;\n  position: relative;\n  height: 100%;\n\n  ul {\n    margin-top: 0px;\n  }\n\n  .building-blocks {\n    flex: 1;\n    margin-right: var(--space-between-cols);\n    margin-bottom: 0px;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .calendar-blocks {\n    width: 100%;\n    display: flex;\n    position: relative;\n  }\n}\n\n.hours {\n  display: flex;\n  flex-direction: column;\n  color: darken($grey, 5);\n  font-weight: 500;\n  font-size: 0.85rem;\n  width: 55px;\n  height: 100%;\n  margin-bottom: 0px;\n\n  li {\n    color: var(--hour-row-color);\n    border-bottom: solid 1px $border-color;\n    padding-left: 8px;\n\n    span {\n      margin-top: -8px;\n    }\n\n    &:first-child span {\n      visibility: hidden;\n    }\n  }\n}\n</style>\n", ".calendar-wrap {\n  display: flex;\n  flex-direction: column;\n}\n.calendar-wrap ul {\n  list-style: none;\n  padding: 0px;\n}\n.calendar-wrap ul > li {\n  display: flex;\n}\n.calendar-wrap .stickyCalendarHead {\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  background-color: white;\n}\n.calendar-wrap .stickyCalendarHead .days {\n  margin: 0px;\n  display: flex;\n  margin-left: 55px;\n}\n.calendar-wrap .stickyCalendarHead .days li {\n  display: inline-flex;\n  align-items: flex-end;\n  padding-top: 10px;\n  flex: 1;\n  font-size: 1.1rem;\n  color: #666;\n  font-weight: 300;\n  margin-right: var(--space-between-cols);\n  border-bottom: solid 1px #e5e5e5;\n  padding-bottom: 5px;\n  position: relative;\n  font-size: 18px;\n}\n.calendar-wrap .stickyCalendarHead .days li span {\n  margin-right: 3px;\n}\n.calendar-wrap .stickyCalendarHead .days li span:first-child {\n  font-size: 20px;\n  font-weight: 500;\n}\n.calendar-wrap .stickyCalendarHead .days .today {\n  border-bottom-color: var(--main-color);\n  color: var(--main-color) !important;\n}\n.calendar-wrap .stickyCalendarHead .days .today::after {\n  content: \"\";\n  position: absolute;\n  height: 2px;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background-color: var(--main-color);\n}\n.calendar-wrap .stickyCalendarHead .all-day {\n  display: flex;\n  margin-bottom: 0px;\n  margin-top: 0px;\n  border-bottom: solid 2px #e5e5e5;\n}\n.calendar-wrap .stickyCalendarHead .all-day span {\n  display: flex;\n  align-items: center;\n  padding: 0px 5px;\n  width: 55px;\n  font-weight: 500;\n  font-size: 0.8rem;\n  color: #b8bbca;\n  text-transform: lowercase;\n}\n.calendar-wrap .stickyCalendarHead .all-day li {\n  flex: 1;\n  margin-right: var(--space-between-cols);\n}\n.calendar-wrap .stickyCalendarHead .all-day li.all-today {\n  background-color: #fef4f4;\n}\n\n.dummy-row {\n  display: flex;\n  padding-left: 55px;\n}\n.dummy-row ul {\n  display: flex;\n  flex: 1;\n  margin: 0px;\n}\n.dummy-row li {\n  flex: 1;\n  height: 15px;\n  margin-right: var(--space-between-cols);\n  border-bottom: solid 1px #e5e5e5;\n}\n\n.blocks {\n  display: flex;\n  position: relative;\n  height: 100%;\n}\n.blocks ul {\n  margin-top: 0px;\n}\n.blocks .building-blocks {\n  flex: 1;\n  margin-right: var(--space-between-cols);\n  margin-bottom: 0px;\n  display: flex;\n  flex-direction: column;\n}\n.blocks .calendar-blocks {\n  width: 100%;\n  display: flex;\n  position: relative;\n}\n\n.hours {\n  display: flex;\n  flex-direction: column;\n  color: #b8bbca;\n  font-weight: 500;\n  font-size: 0.85rem;\n  width: 55px;\n  height: 100%;\n  margin-bottom: 0px;\n}\n.hours li {\n  color: var(--hour-row-color);\n  border-bottom: solid 1px transparent;\n  padding-left: 8px;\n}\n.hours li span {\n  margin-top: -8px;\n}\n.hours li:first-child span {\n  visibility: hidden;\n}\n\n/*# sourceMappingURL=kalendar-weekview.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-5f8e1482";
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
