# How to Ingest `product_knowledge_base.md`

Kept separate from the knowledge base on purpose: these instructions must **never** be
embedded into the vector store. In the old version they were, so a customer question could
retrieve "Chunk the content – Split the markdown into logical sections…" as an answer.

## 1. Chunking

Split on `---` horizontal rules **only**. Do not use a fixed character-count splitter and
do not split tables — a markdown table row without its header row is meaningless to an
embedding model (`| **T001** | Matcha Latte | 4.00 |` retrieves nothing useful).

Every chunk in the KB is written to stand alone: it repeats the product name, the brand
name, and the full price, so a chunk retrieved in isolation still answers correctly.

n8n Default Data Loader → Text Splitter: use **Character Text Splitter** with separator
`\n---\n`, chunk size 2000, overlap 0. Or pre-split and push one document per chunk.

## 2. Embedding and retrieval settings

- Embeddings: `text-embedding-3-small` (or your provider's equivalent).
- Retrieval: **top-k = 5**, not 3. Price questions often need the product chunk *and* the
  "Sizes, Milks, Syrups and Extras" chunk.
- Re-run ingestion after any edit to the KB. Delete the old vectors first — a stale vector
  store is what caused the wrong-price bug.

## 3. System prompt for the n8n AI Agent node

Paste this into the agent's system message. It is what stops the bot from answering
"we don't have that" when the customer used a nickname:

```
You are the Barista AI for Velvet & Bean, a specialty coffee shop in San Francisco.

Answer ONLY from the retrieved knowledge base context. Never invent a product, price,
calorie count, or store hour.

Customers use nicknames, not our full product names. Before saying we do not have
something, check whether the request maps to a real item — "iced oat latte" is our
Artisan Iced Oat Latte, "cold brew" is our Velvet Nitro Cold Brew, "matcha" is our
Ceremonial Matcha Latte. Answer with that item's real price.

If the item genuinely is not on our menu, say so in one short sentence, then immediately
name the closest thing we do make and its exact price.

For any price question: give the base price first, then the size options if they exist.
Keep answers to 2-3 sentences. End by offering to add the drink to the cart.

If the knowledge base does not cover the question, say you will check with a barista and
give the phone number (555) 382-9488. Do not guess.
```

## 4. Keeping the KB in sync with the site

The KB mirrors these files. If any of them change, update the KB and re-ingest:

| Source file | What it feeds |
|---|---|
| `src/config/menu.ts` | every product chunk — names, prices, sizes, dietary, calories |
| `src/components/ItemModal.tsx` | milk list, syrup prices (+$0.75), extra shot (+$0.90) |
| `src/app/locations/page.tsx` | the three LOCATION chunks |
| `src/config/brand.ts` | contact details, B2B pricing |

## 5. Test queries before going live

Each of these must return the exact price shown:

| Query | Expected |
|---|---|
| "tell me price of iced oat latte" | $5.75 (Small), $6.50 M, $7.00 L |
| "how much is a large matcha" | $7.50 |
| "cheapest coffee?" | Double Espresso $3.75 |
| "do you have oat milk" | Yes, free |
| "price of cold brew" | Nitro Cold Brew $5.50 |
| "do you sell hot chocolate" | No, plus a real alternative |
| "are you open sunday" | Flagship + Sunset yes, FiDi closed |
| "vegan options" | the five vegan-as-served drinks with prices |
