import { TIMEZONES } from './data/timezones.js';
import { TimezoneCard } from './components/TimezoneCard.js';
import { SearchBox } from './components/SearchBox.js';
import { MeetingSlider } from './components/MeetingSlider.js';

const MAX_CARDS = 6;
const STORAGE_KEY = 'wtt-cities';
const THEME_KEY = 'wtt-theme';
const TICK_MS = 1000;

const DEFAULT_CITIES = ['Asia/Seoul', 'America/New_York', 'Europe/London']
  .map((tz) => TIMEZONES.find((t) => t.timezone === tz))
  .filter(Boolean);

class App {
  constructor() {
    this._cities = [];   // Array of cityData objects (same refs used as Map keys)
    this._cards = new Map(); // cityData -> TimezoneCard
    this._sliderDate = null; // null = live, Date = frozen to meeting time

    this._loadCities();
    this._initThemeToggle();
    this._initComponents();
    this._renderAllCards();
    this._startTicker();
  }

  // ── Persistence ──────────────────────────────────────

  _loadCities() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Re-link to canonical objects from TIMEZONES to keep references stable
        this._cities = parsed
          .map((saved) => TIMEZONES.find((t) => t.city === saved.city && t.timezone === saved.timezone))
          .filter(Boolean);
      }
    } catch {
      this._cities = [];
    }

    if (this._cities.length === 0) {
      this._cities = [...DEFAULT_CITIES];
    }
  }

  _saveCities() {
    const payload = this._cities.map(({ city, timezone }) => ({ city, timezone }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  // ── Theme ─────────────────────────────────────────────

  _initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const html = document.documentElement;

    const getSystemTheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = (theme) => {
      html.setAttribute('data-theme', theme);
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      localStorage.setItem(THEME_KEY, theme);
    };

    const stored = localStorage.getItem(THEME_KEY);
    applyTheme(stored || getSystemTheme());

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Respond to OS-level theme changes when no explicit choice is stored
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ── Component Init ────────────────────────────────────

  _initComponents() {
    this._searchBox = new SearchBox(
      document.getElementById('searchBox'),
      (city) => this.addCity(city),
      () => this._cities.length >= MAX_CARDS,
    );

    this._slider = new MeetingSlider(
      document.getElementById('meetingSlider'),
      (date) => {
        this._sliderDate = date;
        this._updateAllCards(date);
      },
      () => {
        this._sliderDate = null;
      },
    );
  }

  // ── Card Management ───────────────────────────────────

  _renderAllCards() {
    const grid = document.getElementById('cardsGrid');

    this._cards.forEach((card) => card.destroy());
    this._cards.clear();
    grid.innerHTML = '';

    if (this._cities.length === 0) {
      this._showEmptyState(grid);
    } else {
      this._cities.forEach((city, idx) => {
        const card = new TimezoneCard(city, (c) => this.removeCity(c));
        card.mount(grid);
        card.setReference(idx === 0);
        this._cards.set(city, card);
      });
    }

    this._syncSearch();
    this._syncSlider();
    this._syncInfeedAd();
    this._updateAllCards(this._sliderDate || new Date());
  }

  _showEmptyState(grid) {
    const div = document.createElement('div');
    div.className = 'empty-state';

    const title = document.createElement('p');
    title.className = 'empty-state-title';
    title.textContent = 'No cities added yet';

    const hint = document.createElement('p');
    hint.className = 'empty-state-hint';
    hint.textContent = 'Search for a city above to get started.';

    div.append(title, hint);
    grid.appendChild(div);
  }

  addCity(cityData) {
    if (this._cities.length >= MAX_CARDS) return;

    // Prevent exact duplicate (same city + timezone)
    if (this._cities.some((c) => c.city === cityData.city && c.timezone === cityData.timezone)) return;

    // Use canonical reference from TIMEZONES
    const canonical = TIMEZONES.find((t) => t.city === cityData.city && t.timezone === cityData.timezone) || cityData;
    this._cities.push(canonical);
    this._saveCities();
    this._renderAllCards();
  }

  removeCity(cityData) {
    const idx = this._cities.indexOf(cityData);
    if (idx === -1) return;

    this._cities.splice(idx, 1);
    this._saveCities();
    this._renderAllCards();
  }

  // ── Sync helpers ──────────────────────────────────────

  _syncSearch() {
    this._searchBox.setDisabled(this._cities.length >= MAX_CARDS);
  }

  _syncSlider() {
    if (this._cities.length > 0) {
      this._slider.setReference(this._cities[0]);
    } else {
      this._slider.hide();
    }
  }

  _syncInfeedAd() {
    const el = document.getElementById('infeedAd');
    if (el) el.hidden = this._cities.length < 3;
  }

  // ── Live Ticker ───────────────────────────────────────

  _startTicker() {
    setInterval(() => {
      if (!this._sliderDate && !this._slider.isDragging) {
        const now = new Date();
        this._updateAllCards(now);
        this._slider.syncToNow();
      }
    }, TICK_MS);
  }

  _updateAllCards(date) {
    this._cards.forEach((card) => card.update(date));
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
