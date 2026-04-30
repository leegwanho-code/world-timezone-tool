import { searchTimezones } from '../data/timezones.js';

export class SearchBox {
  constructor(container, onSelect, isDisabled) {
    this.container = container;
    this.onSelect = onSelect;
    this.isDisabled = isDisabled; // () => boolean
    this._results = [];
    this._activeIndex = -1;
    this._build();
  }

  _build() {
    const wrapper = document.createElement('div');
    wrapper.className = 'search-box';

    const label = document.createElement('label');
    label.className = 'search-label';
    label.htmlFor = 'citySearch';
    label.textContent = 'Add a city (up to 6)';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'search-input-wrapper';

    this._input = document.createElement('input');
    this._input.type = 'search';
    this._input.id = 'citySearch';
    this._input.className = 'search-input';
    this._input.placeholder = 'Search city or country…';
    this._input.setAttribute('autocomplete', 'off');
    this._input.setAttribute('spellcheck', 'false');
    this._input.setAttribute('role', 'combobox');
    this._input.setAttribute('aria-autocomplete', 'list');
    this._input.setAttribute('aria-controls', 'searchResults');
    this._input.setAttribute('aria-expanded', 'false');
    this._input.setAttribute('aria-haspopup', 'listbox');

    this._dropdown = document.createElement('ul');
    this._dropdown.id = 'searchResults';
    this._dropdown.className = 'search-results';
    this._dropdown.setAttribute('role', 'listbox');
    this._dropdown.setAttribute('aria-label', 'City suggestions');
    this._dropdown.hidden = true;

    this._input.addEventListener('input', () => this._handleInput());
    this._input.addEventListener('keydown', (e) => this._handleKeydown(e));
    this._input.addEventListener('blur', () => setTimeout(() => this._close(), 150));

    inputWrapper.append(this._input, this._dropdown);
    wrapper.append(label, inputWrapper);
    this.container.appendChild(wrapper);
  }

  _handleInput() {
    if (this.isDisabled()) {
      this._input.value = '';
      return;
    }

    const query = this._input.value.trim();
    if (!query) { this._close(); return; }

    this._results = searchTimezones(query);
    this._activeIndex = -1;
    this._renderDropdown();
  }

  _renderDropdown() {
    this._dropdown.innerHTML = '';

    if (this._results.length === 0) {
      this._dropdown.hidden = true;
      this._input.setAttribute('aria-expanded', 'false');
      return;
    }

    this._results.forEach((tz, i) => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      li.id = `result-${i}`;

      const citySpan = document.createElement('span');
      citySpan.className = 'result-city';
      citySpan.textContent = tz.city;

      const countrySpan = document.createElement('span');
      countrySpan.className = 'result-country';
      countrySpan.textContent = tz.country;

      li.append(citySpan, countrySpan);

      // mousedown prevents blur before the click registers
      li.addEventListener('mousedown', (e) => { e.preventDefault(); this._select(tz); });
      // touchend for mobile
      li.addEventListener('touchend', (e) => { e.preventDefault(); this._select(tz); });

      this._dropdown.appendChild(li);
    });

    this._dropdown.hidden = false;
    this._input.setAttribute('aria-expanded', 'true');
  }

  _handleKeydown(e) {
    if (this._dropdown.hidden) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._setActive(Math.min(this._activeIndex + 1, this._results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._setActive(Math.max(this._activeIndex - 1, -1));
        break;
      case 'Enter':
        if (this._activeIndex >= 0) {
          e.preventDefault();
          this._select(this._results[this._activeIndex]);
        }
        break;
      case 'Escape':
        this._close();
        this._input.blur();
        break;
    }
  }

  _setActive(index) {
    this._activeIndex = index;
    const items = this._dropdown.querySelectorAll('.search-result-item');
    items.forEach((item, i) => {
      const active = i === index;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (index >= 0) {
      this._input.setAttribute('aria-activedescendant', `result-${index}`);
      // Scroll into view
      const activeItem = items[index];
      if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
    } else {
      this._input.removeAttribute('aria-activedescendant');
    }
  }

  _select(tz) {
    this._input.value = '';
    this._close();
    this.onSelect(tz);
  }

  _close() {
    this._dropdown.hidden = true;
    this._input.setAttribute('aria-expanded', 'false');
    this._activeIndex = -1;
    this._results = [];
  }

  setDisabled(disabled) {
    this._input.disabled = disabled;
    if (disabled) {
      this._input.placeholder = 'Maximum 6 cities reached';
      this._close();
    } else {
      this._input.placeholder = 'Search city or country…';
    }
  }

  focus() {
    this._input.focus();
  }
}
