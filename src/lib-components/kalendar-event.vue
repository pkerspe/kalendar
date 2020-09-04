<template>
    <div
            class="event-card"
            :ref="`kalendarEventRef-${event.id}`"
            :style="
            `
      height: ${distance};
      width: calc(${width_value});
      left: calc(${left_offset});
      top: ${top_offset};
    `
        "
            @click="inspecting = true"
            @mouseleave="inspecting = false"
            :class="eventCardClasses"
    >
        <template v-if="status === 'creating' || status === 'popup-initiated'">
            <div class="creating-event">
                <slot name="creating-card" v-bind:event_information="information">
                    <h4 class="appointment-title" style="text-align: left;">New Appointment</h4>
                    <span class="time">{{ information.start_time | formatTime }} - {{ information.end_time | formatTime }}</span>
                </slot>
            </div>
        </template>

        <template v-else>
            <div class="created-event">
                <slot name="created-card" v-bind:event_information="information">
                    <h4 style="margin-bottom: 5px">{{ information.data }} XY</h4>
                    <p>
                        {{ information.start_time | formatTime }} -
                        {{ information.end_time | formatTime }}
                    </p>
                </slot>
            </div>
        </template>

        <div v-if="status === 'popup-initiated'" class="popup-wrapper">
            <div class="popup-event">
                <slot name="event-popup-form" :popup_information="information">
                    <h4 style="margin-bottom: 10px">New Appointment</h4>
                    <input
                            v-model="new_appointment['title']"
                            type="text"
                            name="title"
                            placeholder="Title"
                            style="width: 100%;"
                    />
                    <textarea v-model="new_appointment['description']"
                              type="text"
                              name="description"
                              placeholder="Description"
                              rows="2"
                    ></textarea>
                    <div class="buttons">
                        <button class="cancel" @click="closePopups()">Cancel</button>
                        <button @click="addAppointment(information)">Save</button>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import {isBefore, getLocaleTime, addTimezoneInfo, getTime} from './utils.js';

    export default {
        props: ['event', 'total', 'index', 'overlaps'],
        created() {
        },
        inject: ['kalendar_options'],
        data: () => ({
            inspecting: false,
            editing: false,
            new_appointment: {},
        }),
        filters: {
            formatTime: function(date){
                return getTime(date);
            }
        },
        methods: {
            addAppointment: function(information){
                window.calendarEventBus.$emit('addAppointmentEvent', information);
            },
            closePopups: function(){
                window.calendarEventBus.$emit('closePopupsEvent');
            }
        },
        computed: {
            eventCardClasses() {
                let props = {
                    'is-past': this.isPast,
                    overlaps: this.overlaps > 0,
                    'two-in-one': this.total > 1,
                    inspecting: !!this.inspecting,
                    'event-card__mini': this.event.distance <= 10,
                    'event-card__small': (this.event.distance > 10 && this.event.distance < 40) || this.overlaps > 1
                };
                if (this.customCalendarEventClass != "") {
                    props[this.customCalendarEventClass] = true;
                }
                console.log(props);
                return props;
            },
            customCalendarEventClass() {
                console.log(this.event);
                if (!this.event || !this.event.data || !this.event.data.customEventCardClass) return '';
                return this.event.data.customEventCardClass + '';
            },
            isPast() {
                let now = getLocaleTime(new Date().toISOString());
                return isBefore(this.event.start.value, now);
            },
            width_value() {
                return `${100 / this.total}% - ${(this.overlaps * 50) /
                this.total}px`;
            },
            left_offset() {
                return `(${this.index} * (${this.width_value})) + ${this.overlaps *
                50}px`;
            },
            top_offset() {
                return this.event.start.round_offset
                    ? `${this.event.start.round_offset}px`
                    : `0px`;
            },
            distance() {
                if (!this.event) return;
                let multiplier = this.kalendar_options.cell_height / 10;
                // 0.5 * multiplier for an offset so next cell is easily selected
                return `${this.event.distance * multiplier - 0.2 * multiplier}px`;
            },
            status() {
                return (this.event && this.event.status) || this.editing;
            },
            information() {
                let {start, end, data, id, key} = this.event;
                let payload = {
                    start_time: addTimezoneInfo(start.value),
                    end_time: addTimezoneInfo(end.value),
                    kalendar_id: id,
                    key,
                    data,
                };
                return payload;
            },
            editEvent() {
                this.$kalendar.closePopups();
                this.editing = true;
            },
            closeEventPopup() {
                this.editing = false;
            },
        },
    };
</script>
<style lang="scss">
    $creator-bg: #34aadc;
    $creator-content: white;

    .event-card {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;

        h4,
        p,
        span {
            margin: 0px;
        }

        > * {
            flex: 1;
            position: relative;
        }

        &.creating {
            z-index: -1;
        }

        &.overlaps > * {
            border: solid 1px white !important;
        }

        &.inspecting {
            z-index: 11 !important;

            .created-event {
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                0 1px 18px 0 rgba(0, 0, 0, 0.12),
                0 3px 5px -1px rgba(0, 0, 0, 0.2);
                transition: opacity 100ms linear;
            }
        }

        &__mini {
            .created-event > .details-card > * {
                display: none;
            }

            .appointment-title,
            .time {
                display: block !important;
                position: absolute;
                top: 0;
                font-size: 9px;
                z-index: 1;
                overflow: visible;
                height: 100%;
            }
        }

        &__small {
            .appointment-title {
                font-size: 80%;
            }

            .time {
                font-size: 70%;
            }
        }

        &.two-in-one .details-card > * {
            font-size: 60%;
        }

        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; //z-index: 20!important;
        //background-color: rgba($creator-bg, .85);
        color: $creator-content;
        user-select: none;
        will-change: height; //padding: 4px 6px;

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            margin: 0px;
        }
    }

    .time {
        position: absolute;
        bottom: 0px;
        right: 0px;
        font-size: 11px;
    }

    .popup-wrapper {
        text-shadow: none;
        color: black;
        z-index: 10;
        position: absolute;
        top: 0;
        left: calc(100% + 5px);
        display: flex;
        flex-direction: column;
        pointer-events: all;
        user-select: none;
        background-color: white;
        border: solid 1px rgba(black, 0.08);
        border-radius: 4px;
        box-shadow: 0px 2px 12px -3px rgba(black, 0.3);
        padding: 10px;

        h4 {
            color: black;
            font-weight: 400;
        }

        input,
        textarea {
            border: none;
            background-color: darken(white, 8);
            color: lighten(black, 1);
            border-radius: 4px;
            padding: 5px 8px;
            margin-bottom: 5px;
        }
    }

    .created-event {
        pointer-events: all;
        position: relative;

        > .details-card {
            max-width: 100%;
            width: 100%;
            overflow: hidden;
            position: relative;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;

            > h1,
            h2,
            h3,
            h4,
            p,
            small,
            strong,
            span {
                text-overflow: ellipsis;
                overflow: hidden;
                display: block;
            }
        }
    }

    ul:last-child .popup-wrapper {
        left: auto;
        right: 100%;
        margin-right: 10px;
    }

    .day-view ul .popup-wrapper {
        left: auto;
        right: auto;
        width: calc(100% - 10px);
        top: 10px;
    }
</style>
