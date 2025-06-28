/**
 * scripts/fetchBestSellers.mjs
 * Récupère les best-sellers « Disques durs » via l’API Amazon PA-API (wrapper amazon-paapi v1.0.7)
 * et alimente SQLite (disks.db).
 */

import 'dotenv/config';
import paapi from 'amazon-paapi';
import Database from 'better-sqlite3';

// --- 1. Config Amazon PA-API ---------------------------------------------
const credentials = {
  AccessKey: process.env.AWS_PAAPI_KEY,
  SecretKey: process.env.AWS_PAAPI_SECRET,
  PartnerTag: process.env.AWS_PAAPI_TAG,      // ex : addfr-21
  PartnerType: 'Associates',
  Marketplace: 'www.amazon.fr'
};

// --- 2. Config base SQLite ------------------------------------------------
const db = new Database('disks.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    asin TEXT PRIMARY KEY,
    title TEXT,
    brand TEXT,
    capacity_gb INTEGER,
    interface TEXT,
    price_cents INTEGER,
    rating REAL,
    reviews INTEGER,
    url_affiliate TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS price_history (
    asin TEXT,
    price_cents INTEGER,
    captured_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertProduct = db.prepare(`
  INSERT OR REPLACE INTO products
    (asin, title, brand, capacity_gb, interface, price_cents, rating, reviews, url_affiliate, updated_at)
    VALUES (@asin, @title, @brand, @capacity_gb, @interface, @price_cents, @rating, @reviews, @url_affiliate, CURRENT_TIMESTAMP)
`);
const insertHistory = db.prepare(`INSERT INTO price_history (asin, price_cents) VALUES (?, ?)`);

// --- 3. Fonction de récupération -----------------------------------------
async function refresh() {
  const params = {
    ItemIds: ['301062'],       // BrowseNode « Disques durs externes »
    ItemIdType: 'BrowseNode',
    Condition: 'New',
    Resources: [
      'BrowseNodes.BrowseNodeInfo',
      'ItemInfo.Title',
      'ItemInfo.ByLineInfo',
      'ItemInfo.Features',
      'Offers.Listings.Price',
      'CustomerReviews.Count',
      'CustomerReviews.StarRating'
    ]
  };

  const { data } = await paapi.getItems(credentials, params);

  for (const item of data.ItemsResult.Items) {
    const price    = item.Offers?.Listings?.[0]?.Price?.Amount ?? 0;
    const capacity = (item.ItemInfo.Features?.DisplayValues ?? [])
      .join(' ')
      .match(/(\\d+(?:,\\d+)?)\\s?(TB|To|GB|Go)/i);
    const capacityGB = capacity
      ? parseFloat(capacity[1].replace(',', '.')) * (/TB|To/i.test(capacity[2]) ? 1024 : 1)
      : null;

    insertProduct.run({
      asin: item.ASIN,
      title: item.ItemInfo.Title?.DisplayValue ?? '',
      brand: item.ItemInfo.ByLineInfo?.Brand?.DisplayValue ?? '',
      capacity_gb: capacityGB,
      interface: (item.ItemInfo.Features?.DisplayValues ?? []).find(f => /USB|SATA|Thunderbolt/i.test(f)) ?? '',
      price_cents: Math.round(price * 100),
      rating: item.CustomerReviews?.StarRating ?? null,
      reviews: item.CustomerReviews?.Count ?? 0,
      url_affiliate: `https://www.amazon.fr/dp/${item.ASIN}/?tag=${process.env.AWS_PAAPI_TAG}`
    });

    insertHistory.run(item.ASIN, Math.round(price * 100));
  }

  console.log(`[${new Date().toISOString()}] refresh OK – ${data.ItemsResult.Items.length} items`);
}

// --- 4. Lancer si appelé en CLI ------------------------------------------
if (import.meta.url === 'file://' + process.argv[1]) {
  refresh().catch(err => { console.error(err); process.exit(1); });
}

export { refresh };
