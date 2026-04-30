import { formatTimezone } from '../utils/timezone.js';

export class TimezoneCard {
  constructor(cityData, onRemove) {
    this.cityData = cityData;
    this.onRemove = onRemove;
    this.element = this._build();
  }

  _build() {
    const article = document.createElement('article');
    article.className = 'timezone-card';
    article.setAttribute('role', 'listitem');

    const removeBtn = document.createElement('button');
    removeBtn.className = 'card-remove';
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', `Remove ${this.cityData.city}`);
    removeBtn.textContent = '×'; // ×
    removeBtn.addEventListener('click', () => this.onRemove(this.cityData));

    const regionEl = document.createElement('div');
    regionEl.className = 'card-region';
    regionEl.textContent = this.cityData.region;

    const cityEl = document.createElement('h2');
    cityEl.className = 'card-city';
    cityEl.textContent = this.cityData.city;

    const countryEl = document.createElement('div');
    countryEl.className = 'card-country';
    countryEl.textContent = this.cityData.country;

    this._timeEl = document.createElement('time');
    this._timeEl.className = 'card-time';

    this._dateEl = document.createElement('div');
    this._dateEl.className = 'card-date';

    this._weekdayEl = document.createElement('div');
    this._weekdayEl.className = 'card-weekday';

    const metaEl = document.createElement('div');
    metaEl.className = 'card-meta';

    this._offsetEl = document.createElement('span');
    this._offsetEl.className = 'card-offset';

    this._dstEl = document.createElement('span');
    this._dstEl.className = 'card-dst';
    this._dstEl.textContent = 'DST';
    this._dstEl.hidden = true;

    metaEl.append(this._offsetEl, this._dstEl);
    article.append(removeBtn, regionEl, cityEl, countryEl, this._timeEl, this._dateEl, this._weekdayEl, metaEl);

    return article;
  }

  update(date = new Date()) {
    try {
      const info = formatTimezone(this.cityData.timezone, date);
      this._timeEl.textContent = info.time;
      this._timeEl.setAttribute('datetime', date.toISOString());
      this._dateEl.textContent = info.date;
      this._weekdayEl.textContent = info.weekday;
      this._offsetEl.textContent = info.offset;
      this._dstEl.hidden = !info.isDST;
    } catch (err) {
      console.error('TimezoneCard.update failed:', err);
    }
  }

  setReference(isReference) {
    this.element.classList.toggle('timezone-card--reference', isReference);
  }

  mount(container) {
    container.appendChild(this.element);
    this.update();
  }

  destroy() {
    this.element.remove();
  }
}
