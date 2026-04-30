import { getOffsetMinutes } from '../utils/timezone.js';

export class MeetingSlider {
  constructor(container, onTimeChange, onBackToLive) {
    this.container = container;
    this.onTimeChange = onTimeChange; // (date) => void — called while dragging
    this.onBackToLive = onBackToLive; // () => void — called on reset

    this._refTimezone = null;
    this._refCity = '';
    this._isDragging = false;

    this._build();
  }

  _build() {
    this._root = document.createElement('div');
    this._root.className = 'meeting-slider';
    this._root.hidden = true;

    // Header
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.textContent = 'Meeting Planner';

    this._subtitle = document.createElement('p');
    this._subtitle.className = 'slider-subtitle';

    header.append(title, this._subtitle);

    // Slider wrapper
    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'slider-wrapper';

    const label = document.createElement('label');
    label.className = 'visually-hidden';
    label.htmlFor = 'meetingTime';
    label.textContent = 'Select meeting time (15-minute intervals)';

    this._slider = document.createElement('input');
    this._slider.type = 'range';
    this._slider.id = 'meetingTime';
    this._slider.className = 'slider-input';
    this._slider.min = '0';
    this._slider.max = '1439';
    this._slider.step = '15';

    this._timeDisplay = document.createElement('div');
    this._timeDisplay.className = 'slider-time-display';
    this._timeDisplay.setAttribute('aria-live', 'polite');
    this._timeDisplay.setAttribute('aria-atomic', 'true');

    sliderWrapper.append(label, this._slider, this._timeDisplay);

    // Hour markers
    const markers = document.createElement('div');
    markers.className = 'slider-markers';
    markers.setAttribute('aria-hidden', 'true');
    [0, 6, 12, 18, 24].forEach((h) => {
      const span = document.createElement('span');
      span.className = 'slider-marker';
      span.textContent = `${h}h`;
      markers.appendChild(span);
    });

    // Footer: live indicator + back-to-live button
    const footer = document.createElement('div');
    footer.className = 'slider-footer';

    this._liveIndicator = document.createElement('span');
    this._liveIndicator.className = 'live-indicator';

    const dot = document.createElement('span');
    dot.className = 'live-dot';
    dot.setAttribute('aria-hidden', 'true');

    const liveText = document.createElement('span');
    liveText.textContent = 'Live';

    this._liveIndicator.append(dot, liveText);

    this._backBtn = document.createElement('button');
    this._backBtn.className = 'btn-live';
    this._backBtn.type = 'button';
    this._backBtn.textContent = 'Back to Live';
    this._backBtn.hidden = true;
    this._backBtn.addEventListener('click', () => this._handleBackToLive());

    footer.append(this._liveIndicator, this._backBtn);

    this._root.append(header, sliderWrapper, markers, footer);
    this.container.appendChild(this._root);

    // 'input' fires after value changes (keyboard + mouse), so one listener is enough
    this._slider.addEventListener('input', () => this._handleInput());
  }

  _handleInput() {
    this._isDragging = true;
    this._liveIndicator.hidden = true;
    this._backBtn.hidden = false;

    const date = this._sliderValueToDate();
    this._updateTimeDisplay(date);
    this.onTimeChange(date);
  }

  _handleBackToLive() {
    this._isDragging = false;
    this._liveIndicator.hidden = false;
    this._backBtn.hidden = true;
    this.syncToNow();
    this.onBackToLive();
  }

  _sliderValueToDate() {
    const sliderMinutes = parseInt(this._slider.value, 10);
    return sliderMinutesToDate(sliderMinutes, this._refTimezone);
  }

  _updateTimeDisplay(date) {
    const min = parseInt(this._slider.value, 10);
    const h = String(Math.floor(min / 60)).padStart(2, '0');
    const m = String(min % 60).padStart(2, '0');
    const timeStr = `${h}:${m}`;

    const weekdayFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: this._refTimezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    this._timeDisplay.textContent = `${timeStr} in ${this._refCity} (${weekdayFmt.format(date)})`;
    this._slider.setAttribute('aria-valuetext', `${timeStr} in ${this._refCity}`);
  }

  setReference(cityData) {
    this._refTimezone = cityData.timezone;
    this._refCity = cityData.city;
    this._subtitle.textContent = `Drag to set time in ${cityData.city} — all clocks update automatically`;
    this._root.hidden = false;

    if (!this._isDragging) {
      this.syncToNow();
    }
  }

  syncToNow() {
    if (!this._refTimezone) return;
    const now = new Date();
    const offsetMin = getOffsetMinutes(this._refTimezone, now);
    const totalMin = Math.floor(now.getTime() / 60000) + offsetMin;
    const minuteOfDay = ((totalMin % 1440) + 1440) % 1440;
    const rounded = Math.min(Math.round(minuteOfDay / 15) * 15, 1439);
    this._slider.value = rounded;
    this._updateTimeDisplay(now);
  }

  get isDragging() {
    return this._isDragging;
  }

  hide() {
    this._root.hidden = true;
  }
}

function sliderMinutesToDate(sliderMinutes, refTimezone) {
  const now = new Date();
  const refOffset = getOffsetMinutes(refTimezone, now);
  const nowTotalMin = Math.floor(now.getTime() / 60000);
  const nowMinuteOfDay = ((nowTotalMin + refOffset) % 1440 + 1440) % 1440;
  const deltaMinutes = sliderMinutes - nowMinuteOfDay;
  return new Date(now.getTime() + deltaMinutes * 60000);
}
