<template>
    <div class="kalendar-wrapper"
         :class="{'no-scroll': !scrollable,gstyle: kalendar_options.style === 'material_design','day-view': kalendar_options.view_type === 'day'}"
         @touchstart="scrollable = false"
         @touchend="scrollable = true"
    >
        <div class="week-navigator">
            <div class="nav-wrapper" v-if="kalendar_options.view_type === 'week'">
                <button class="week-navigator-button" @click="changeDay(-7)">
                    <svg style="transform: rotate(180deg)"
                         viewBox="0 0 24 24"
                         width="24"
                         height="24"
                         stroke="currentColor"
                         stroke-width="2"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="css-i6dzq1"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div>
                    <span>{{kalendar_options.formatWeekNavigator(current_day)}}</span>
                </div>
                <button class="week-navigator-button" @click="changeDay(7)">
                    <svg viewBox="0 0 24 24"
                         width="24"
                         height="24"
                         stroke="currentColor"
                         stroke-width="2"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="css-i6dzq1"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            <div class="nav-wrapper" v-if="kalendar_options.view_type === 'day'">
                <button class="week-navigator-button" @click="changeDay(-1)">
                    <svg style="transform: rotate(180deg)"
                         viewBox="0 0 24 24"
                         width="24"
                         height="24"
                         stroke="currentColor"
                         stroke-width="2"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="css-i6dzq1"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div>
                    <span>{{kalendar_options.formatDayNavigator(current_day)}}</span>
                </div>
                <button class="week-navigator-button" @click="changeDay(1)">
                    <svg viewBox="0 0 24 24"
                         width="24"
                         height="24"
                         stroke="currentColor"
                         stroke-width="2"
                         fill="none"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="css-i6dzq1"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>

        <kalendar-week-view :current_day="current_day">
            <!-- inherit slots to child component -->
            <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"/>
            </template>
        </kalendar-week-view>
    </div>
</template>
<script>
    import Vue from 'vue';

    import {
        addDays,
        getTime,
        endOfWeek,
        generateUUID,
        getDatelessHour,
        getHourlessDate,
        startOfWeek,
    } from './utils.js';

    export default {
        components: {
            KalendarWeekView: () => import('./kalendar-weekview.vue'),
        },
        props: {
            // this provided array will be kept in sync
            events: {
                required: true,
                type: Array,
                validator: function (val) {
                    return Array.isArray(val);
                },
            },

            // use this to enable/disable stuff which
            // are supported by Kalendar itself
            configuration: {
                type: Object,
                required: false,
                validator: function (val) {
                    return typeof val === 'object';
                },
            },
        },
        data() {
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
                    formatLeftHours: date => {
                        return getDatelessHour(
                            date,
                            this.configuration.military_time
                        );
                    },
                    formatDayTitle: date => {
                        let isoDate = new Date(date);
                        let dayName = isoDate.toUTCString().slice(0, 3);
                        let dayNumber = isoDate.getUTCDate();
                        return [dayName, dayNumber];
                    },
                    formatWeekNavigator: isoDate => {
                        let startDate = startOfWeek(isoDate);
                        let endDate = endOfWeek(isoDate);
                        let startString = startDate.toUTCString().slice(5, 11);
                        let endString = endDate.toUTCString().slice(5, 11);
                        return `${startString} - ${endString}`;
                    },
                    formatDayNavigator: isoDate => {
                        let day = new Date(isoDate);
                        return day.toUTCString().slice(5, 11);
                    },
                },
                kalendar_events: null,
                new_appointment: {},
                scrollable: true,
            };
        },
        watch: {
            events: function (events) {
                this.processEvents(events);
            },
        },
        computed: {
            kalendar_options() {
                let options = this.default_options;
                let provided_props = this.configuration;

                let conditions = {
                    scrollToNow: val => typeof val === 'boolean',
                    start_day: val => !isNaN(Date.parse(val)),
                    view_type: val => ['week', 'day'].includes(val),
                    cell_height: val => !isNaN(val),
                    style: val => ['material_design', 'flat_design'].includes(val),
                    military_time: val => typeof val === 'boolean',
                    read_only: val => typeof val === 'boolean',
                    day_starts_at: val =>
                        typeof val === 'number' && val >= 0 && val <= 24,
                    day_ends_at: val =>
                        typeof val === 'number' && val >= 0 && val <= 24,
                    hide_dates: val => Array.isArray(val),
                    hide_days: val =>
                        Array.isArray(val) && !val.find(n => typeof n !== 'number'),
                    overlap: val => typeof val === 'boolean',
                    past_event_creation: val => typeof val === 'boolean',
                };
                for (let key in provided_props) {
                    if (
                        conditions.hasOwnProperty(key) &&
                        conditions[key](provided_props[key])
                    ) {
                        options[key] = provided_props[key];
                    }
                }
                return options;
            },
        },
        created() {
            //create an event bus to communicate with all ancestor components
            window.calendarEventBus = new Vue();
            calendarEventBus.$on('closePopupsEvent', data => this.closePopups(data));
            calendarEventBus.$on('addAppointmentEvent', information => this.addAppointment(information));

            this.current_day = this.kalendar_options.start_day;
            this.processEvents(this.events);
            if (!this.$kalendar) {
                Vue.prototype.$kalendar = {};
            }

            this.$kalendar.getEvents = () => this.kalendar_events.slice(0);

            this.$kalendar.updateEvents = payload => {
                this.processEvents(payload);
                this.$emit(
                    'update:events',
                    payload.map(event => ({
                        from: event.from,
                        to: event.to,
                        data: event.data,
                        id: event.id,
                        calendarId: event.calendarId
                    }))
                );
            };
        },
        provide() {
            const provider = {};
            Object.defineProperty(provider, 'kalendar_options', {
                enumerable: true,
                get: () => this.kalendar_options,
            });
            Object.defineProperty(provider, 'kalendar_events', {
                enumerable: true,
                get: () => this.kalendar_events,
            });
            return provider;
        },
        methods: {
            processEvents: function(eventArray){
                let start = new Date().getTime();
                this.kalendar_events = eventArray.map(event => ({
                    ...event,
                    id: event.id || generateUUID(),
                    calendarId: event.calendarId || 'default'
                }));
            },
            getTime,
            changeDay(numDays) {
                this.current_day = addDays(this.current_day, numDays).toISOString();
                this.$nextTick(() => this.$kalendar.buildWeek());
            },
            addAppointment(popup_info) {
                let payload = {
                    data: popup_info.data,
                    from: popup_info.start_time,
                    to: popup_info.end_time,
                    id: generateUUID(),
                    calendarId: 'default'
                };

                this.$kalendar.addNewEvent(payload);
                this.$kalendar.closePopups();
            },
            closePopups() {
                this.$kalendar.closePopups();
            },
        },
    };
</script>
<style lang="scss" src="./main.scss"></style>
