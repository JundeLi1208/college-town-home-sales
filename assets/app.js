'use strict';
const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0
});
const count = new Intl.NumberFormat('en-US');

async function loadSales() {
  const status = document.querySelector('#status');
  try {
    const response = await fetch('data/city_sales_summary.json');
    if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
    const data = await response.json();
    const cities = [...data.cities].sort((a, b) => b.median_price - a.median_price || a.city.localeCompare(b.city) || a.state.localeCompare(b.state));
    if (!cities.length) throw new Error('No city summaries found');
    const stats = document.querySelector('#stats');
    for (const [value, label] of [[data.included_rows, 'qualifying sales'], [cities.length, 'cities & towns'], [data.state_count, 'states']]) {
      const item = document.createElement('div');
      const number = document.createElement('strong');
      number.textContent = count.format(value);
      const caption = document.createElement('span');
      caption.textContent = label;
      item.append(number, caption);
      stats.append(item);
    }
    stats.hidden = false;
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.className = 'sr-only';
    caption.textContent = 'Cities ranked by median sale price, highest to lowest. Bars start at zero.';
    const head = document.createElement('thead');
    head.innerHTML = '<tr><th scope="col">City, state</th><th scope="col">Median sale price <span class="axis-note">· bars start at $0</span></th><th scope="col">Sales</th></tr>';
    const body = document.createElement('tbody');
    const max = cities[0].median_price;
    for (const city of cities) {
      const row = document.createElement('tr');
      const label = document.createElement('th');
      label.scope = 'row';
      label.textContent = `${city.city}, ${city.state}`;
      const price = document.createElement('td');
      const track = document.createElement('span');
      track.className = 'bar-track';
      track.setAttribute('aria-hidden', 'true');
      const bar = document.createElement('span');
      bar.className = 'bar';
      bar.style.width = `${city.median_price / max * 100}%`;
      track.append(bar);
      const value = document.createElement('span');
      value.className = 'price';
      value.textContent = dollars.format(city.median_price);
      price.append(track, value);
      const sales = document.createElement('td');
      sales.className = 'sales';
      sales.textContent = count.format(city.sales);
      row.append(label, price, sales);
      body.append(row);
    }
    table.append(caption, head, body);
    document.querySelector('#chart').replaceChildren(table);
    document.querySelector('#filter-note').append(` This excludes ${count.format(data.excluded_rows)} of ${count.format(data.source_rows)} source sales, leaving ${count.format(data.included_rows)} qualifying sales.`);
    status.hidden = true;
  } catch (error) {
    status.textContent = 'The chart could not be loaded. Please reload the page or use the original CSV linked below.';
    console.error(error);
  }
}
loadSales();
