"""Regenerate the committed website summary using only Python's standard library."""
import csv
import json
from collections import defaultdict
from pathlib import Path
from statistics import median

ROOT = Path(__file__).resolve().parents[1]
groups = defaultdict(list)
source_rows = excluded_rows = 0
with (ROOT / 'data/college_town_home_sales.csv').open(newline='', encoding='utf-8-sig') as source:
    for row in csv.DictReader(source):
        # DictReader preserves ZIP, county FIPS and parcel numbers as text.
        source_rows += 1
        price = int(row['sale_price'])
        if price < 10_000:
            excluded_rows += 1
            continue
        groups[(row['city'], row['state'])].append(price)

cities = sorted(
    [dict(city=city, state=state, sales=len(prices), median_price=median(prices))
     for (city, state), prices in groups.items()],
    key=lambda item: (-item['median_price'], item['city'], item['state']),
)
summary = dict(minimum_price=10_000, source_rows=source_rows,
               excluded_rows=excluded_rows, included_rows=source_rows-excluded_rows,
               state_count=len({state for _, state in groups}), cities=cities)
(ROOT / 'data/city_sales_summary.json').write_text(
    json.dumps(summary, indent=2) + '\n', encoding='utf-8')
print(json.dumps(summary, indent=2))
