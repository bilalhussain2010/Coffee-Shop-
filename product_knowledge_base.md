# Velvet & Bean — Product Knowledge Base (RAG Source of Truth)

SOURCE OF TRUTH: this file mirrors `src/config/menu.ts`, `src/config/brand.ts`,
`src/app/locations/page.tsx`, and `src/components/ItemModal.tsx`.
If a price here disagrees with the website, the website wins — re-sync this file.
Last synced: 2026-09-18.

CHUNKING RULE: split on `---` horizontal rules only. Every chunk below is written to be
self-contained — it repeats the product name, the brand name, and the full price so a
chunk retrieved in isolation still answers the question correctly. Do not split tables,
do not chunk by fixed character count.

---

## ANSWERING RULES FOR THE ASSISTANT

- Always quote the **base price** first, then the size ladder if the item has sizes.
- Every drink is available **hot or iced at the same price** unless the name already says
  "Iced", "Cold Brew", or "Nitro". Iced costs nothing extra.
- **Oat milk, almond milk, coconut milk and whole milk are all free** on any customizable
  drink. Never tell a customer we lack a milk option.
- If a customer names a drink we do not carry, do **not** just say "we don't have it."
  Name the closest real item on our menu, its exact price, and offer it. See the
  "Common Requests We Don't Carry By That Name" chunk.
- Never invent a product, price, calorie count, or store hour. If it is not in this file,
  say you will check with a barista and offer the phone number (555) 382-9488.
- Prices are USD and already include the size upcharge shown; tax is added at checkout.

---

## COMMON REQUESTS WE DON'T CARRY BY THAT NAME - WHAT TO OFFER

Customers rarely use our full product names. Map the request to the real item:

| Customer says | Real item on our menu | Price |
|---|---|---|
| iced oat latte, oat latte, oat milk latte, iced latte, latte | **Artisan Iced Oat Latte** | $5.75 |
| cold brew, iced coffee, nitro | **Velvet Nitro Cold Brew** | $5.50 |
| matcha, matcha latte, green tea latte | **Ceremonial Matcha Latte** | $6.25 |
| espresso, double espresso, doppio, shot of espresso | **Single-Origin Double Espresso** | $3.75 |
| cappuccino, flat white, seasonal drink, vanilla latte | **Smoked Vanilla Cardamom Cappuccino** | $6.50 |
| croissant, almond croissant, pastry | **Golden Almond Croissant** | $4.85 |
| chocolate pastry, babka, pain au chocolat | **Artisan Chocolate Babka** | $5.15 |
| pour over, filter coffee, drip coffee, black coffee | **Single-Origin Kenya AA Pour-Over** | $5.95 |
| earl grey, london fog, tea latte, lavender tea | **Earl Grey Lavender Fog** | $5.25 |
| pumpkin spice latte, PSL, maple latte, fall drink | **Maple Pecan Cream Cold Brew** | $6.75 |

We do **not** currently sell: frappuccinos/blended drinks, hot chocolate, smoothies,
decaf espresso, bottled soda, sandwiches, or breakfast bagels.

---

## PRODUCT: Artisan Iced Oat Latte — $5.75

Also asked as: iced oat latte, oat latte, oat milk latte, iced oat milk latte, iced latte,
latte, vegan latte, dairy-free latte.

- **Brand:** Velvet & Bean
- **Item ID:** espresso-latte-iced
- **Category:** Espresso
- **Base price:** **$5.75**
- **Description:** Double shot of house-roasted espresso shaken with organic creamy oat
  milk over artisanal ice.
- **Dietary:** Vegan, Dairy-Free, Organic
- **Calories:** 160
- **Popular:** Yes — this is our #1 best seller.
- **Sizes and exact prices:**
  - Small (12 oz) — **$5.75**
  - Medium (16 oz) — **$6.50** (+$0.75)
  - Large (20 oz) — **$7.00** (+$1.25)
- **Customizable:** Yes — swap milk free, add syrup +$0.75, add espresso shot +$0.90.
- **Image:** /images/espresso-latte.png

If a customer asks "how much is an iced oat latte", the answer is **$5.75 for a Small
(12 oz)**, $6.50 Medium, $7.00 Large.

---

## PRODUCT: Velvet Nitro Cold Brew — $5.50

Also asked as: nitro, nitro cold brew, cold brew, iced coffee, cold coffee, strong coffee.

- **Brand:** Velvet & Bean
- **Item ID:** nitro-cold-brew
- **Category:** Brews
- **Base price:** **$5.50**
- **Description:** Slow-steeped Ethiopian Yirgacheffe coffee infused with nitrogen for a
  silky, naturally sweet microfoam cascade.
- **Dietary:** Vegan, Gluten-Free, Dairy-Free, High-Caffeine
- **Calories:** 5
- **Popular:** Yes
- **Sizes and exact prices:**
  - Regular (16 oz) — **$5.50**
  - Large (24 oz) — **$6.50** (+$1.00)
- **Customizable:** Yes — add milk free, syrup +$0.75, espresso shot +$0.90.
- **Image:** /images/cold-brew.png

---

## PRODUCT: Ceremonial Matcha Latte — $6.25

Also asked as: matcha, matcha latte, iced matcha, green tea latte, uji matcha.

- **Brand:** Velvet & Bean
- **Item ID:** matcha-ceremonial-latte
- **Category:** Teas
- **Base price:** **$6.25**
- **Description:** First-harvest Uji ceremonial matcha whisked to order with warm oat milk
  and organic agave.
- **Dietary:** Vegan, Dairy-Free, Organic
- **Calories:** 140
- **Caffeine:** roughly 70 mg per serving, from the matcha.
- **Popular:** Yes
- **Sizes and exact prices:**
  - Small (12 oz) — **$6.25**
  - Medium (16 oz) — **$7.00** (+$0.75)
  - Large (20 oz) — **$7.50** (+$1.25)
- **Customizable:** Yes — swap milk free, syrup +$0.75, espresso shot +$0.90 (a "dirty matcha").
- **Image:** /images/matcha-tea.png

---

## PRODUCT: Single-Origin Double Espresso — $3.75

Also asked as: espresso, double espresso, doppio, two shots, shot of espresso,
straight espresso, cheapest coffee.

- **Brand:** Velvet & Bean
- **Item ID:** espresso-double-shot
- **Category:** Espresso
- **Base price:** **$3.75** — this is the least expensive drink on our menu.
- **Description:** Rich espresso shot extracted from washed Colombian beans featuring notes
  of dark cocoa and bright citrus zest.
- **Dietary:** Vegan, Gluten-Free, Dairy-Free, Nut-Free
- **Calories:** 5
- **Sugar:** no added sugar.
- **Sizes:** one standard serving only — no size options.
- **Customizable:** No — served as-is.
- **Image:** /images/hero-coffee.png

---

## PRODUCT: Single-Origin Kenya AA Pour-Over — $5.95

Also asked as: pour over, V60, filter coffee, drip coffee, black coffee, hand brew,
single origin coffee.

- **Brand:** Velvet & Bean
- **Item ID:** pour-over-kenya
- **Category:** Brews
- **Base price:** **$5.95**
- **Description:** V60 precision pour-over highlighting vibrant blackcurrant acidity,
  floral aroma, and a silky smooth body.
- **Dietary:** Vegan, Gluten-Free, Dairy-Free, Organic
- **Calories:** 2
- **Sugar:** no added sugar.
- **Sizes:** one standard serving only — no size options.
- **Customizable:** No — brewed to a fixed recipe to protect the cup profile.
- **Image:** /images/cold-brew.png

---

## PRODUCT: Earl Grey Lavender Fog — $5.25

Also asked as: earl grey, london fog, lavender latte, tea latte, hot tea, bergamot tea.

- **Brand:** Velvet & Bean
- **Item ID:** tea-earl-grey-lavender
- **Category:** Teas
- **Base price:** **$5.25**
- **Description:** Organic Earl Grey tea steeped with French lavender blossoms, topped with
  velvety steamed milk and vanilla.
- **Dietary:** Gluten-Free. **Not vegan as served** (steamed dairy milk) — ask for oat,
  almond or coconut milk at no extra charge to make it vegan.
- **Calories:** 120
- **Sizes:** one standard serving only — no size upcharges.
- **Customizable:** Yes — swap milk free, syrup +$0.75, espresso shot +$0.90.
- **Image:** /images/matcha-tea.png

---

## PRODUCT: Smoked Vanilla Cardamom Cappuccino (Seasonal) — $6.50

Also asked as: cappuccino, flat white, vanilla latte, seasonal drink, smoked vanilla,
cardamom coffee, special of the season.

- **Brand:** Velvet & Bean
- **Item ID:** seasonal-pumpkin-cinnamon
- **Category:** Seasonal
- **Base price:** **$6.50**
- **Description:** Espresso with house-made smoked bourbon vanilla bean syrup, micro-foamed
  milk, and freshly ground cardamom.
- **Dietary:** Gluten-Free. **Not vegan as served** (dairy micro-foam) — swap to oat,
  almond or coconut milk free of charge.
- **Calories:** 180
- **Popular:** Yes
- **Sizes and exact prices:**
  - Small (12 oz) — **$6.50**
  - Medium (16 oz) — **$7.25** (+$0.75)
  - Large is not offered for this seasonal drink.
- **Customizable:** Yes — swap milk free, syrup +$0.75, espresso shot +$0.90.
- **Image:** /images/hero-coffee.png

---

## PRODUCT: Maple Pecan Cream Cold Brew (Seasonal) — $6.75

Also asked as: maple cold brew, pecan cold brew, sweet cold brew, fall drink,
pumpkin spice latte alternative, PSL, cold foam coffee.

- **Brand:** Velvet & Bean
- **Item ID:** seasonal-maple-pecan-cold-foam
- **Category:** Seasonal
- **Base price:** **$6.75** — the most expensive drink on our menu.
- **Description:** Our signature cold brew topped with aerated maple pecan sweet cold foam
  and toasted cinnamon crumble.
- **Dietary:** Gluten-Free. **Contains dairy and pecans** — not vegan, not nut-free.
- **Calories:** 210
- **Popular:** Yes
- **Sizes:** one standard serving only — no size options.
- **Customizable:** Yes — syrup +$0.75, espresso shot +$0.90.
- **Image:** /images/cold-brew.png

---

## PRODUCT: Golden Almond Croissant — $4.85

Also asked as: croissant, almond croissant, pastry, breakfast pastry, butter croissant.

- **Brand:** Velvet & Bean
- **Item ID:** almond-croissant
- **Category:** Pastries
- **Base price:** **$4.85**
- **Description:** Hand-laminated flaky butter croissant filled with rich almond frangipane
  and topped with toasted sliced almonds.
- **Dietary:** **Contains gluten, dairy (butter), eggs and almonds.** Not vegan,
  not gluten-free, not nut-free.
- **Calories:** 340
- **Popular:** Yes
- **Customizable:** No. Warmed on request at no charge.
- **Image:** /images/pastry-croissant.png

---

## PRODUCT: Artisan Chocolate Babka — $5.15

Also asked as: babka, chocolate babka, chocolate pastry, pain au chocolat, sweet bread.

- **Brand:** Velvet & Bean
- **Item ID:** pastry-pain-chocolat
- **Category:** Pastries
- **Base price:** **$5.15**
- **Description:** Twisted sweet brioche dough woven with rich Belgian dark chocolate
  ganache and orange zest glaze.
- **Dietary:** Nut-Free. **Contains gluten, dairy and eggs** — not vegan, not gluten-free.
- **Calories:** 390
- **Customizable:** No. Warmed on request at no charge.
- **Image:** /images/pastry-croissant.png

---

## SIZES, MILKS, SYRUPS AND EXTRAS — EXACT PRICING

Applies to any drink marked customizable.

**Size upcharges** (on drinks that offer sizes):
- Small (12 oz) — included in base price
- Medium (16 oz) — **+$0.75**
- Large (20 oz) — **+$1.25**
- Nitro Cold Brew uses its own ladder: Regular (16 oz) included, Large (24 oz) **+$1.00**

**Milk options — all FREE, no upcharge:** Oat Milk (our default), Almond Milk, Whole Milk,
Coconut Milk, or No Milk. Oat, almond and coconut are all plant-based and vegan.

**Artisanal syrups — +$0.75 each:** Smoked Vanilla, Salted Caramel, Cardamom Cinnamon.
"None" is the default and costs nothing.

**Extra espresso shot — +$0.90 per double shot.** Add as many as you like.

Example full price: a Large (20 oz) Artisan Iced Oat Latte with Salted Caramel syrup and
one extra shot = $5.75 + $1.25 + $0.75 + $0.90 = **$8.65** before tax.

---

## FULL MENU AT A GLANCE (10 items, price ascending)

| Item | Category | Base Price | Dietary |
|---|---|---|---|
| Single-Origin Double Espresso | Espresso | $3.75 | Vegan, GF, DF, Nut-Free |
| Golden Almond Croissant | Pastries | $4.85 | Contains gluten, dairy, nuts |
| Artisan Chocolate Babka | Pastries | $5.15 | Nut-Free; contains gluten, dairy |
| Earl Grey Lavender Fog | Teas | $5.25 | Gluten-Free |
| Velvet Nitro Cold Brew | Brews | $5.50 | Vegan, GF, DF, High-Caffeine |
| Artisan Iced Oat Latte | Espresso | $5.75 | Vegan, Dairy-Free, Organic |
| Single-Origin Kenya AA Pour-Over | Brews | $5.95 | Vegan, GF, DF, Organic |
| Ceremonial Matcha Latte | Teas | $6.25 | Vegan, Dairy-Free, Organic |
| Smoked Vanilla Cardamom Cappuccino | Seasonal | $6.50 | Gluten-Free |
| Maple Pecan Cream Cold Brew | Seasonal | $6.75 | Gluten-Free; contains dairy, pecans |

Cheapest item: Single-Origin Double Espresso, $3.75.
Most expensive item: Maple Pecan Cream Cold Brew, $6.75.
Drink price range: $3.75 – $6.75 before size and add-ons.

---

## DIETARY GUIDE

**Vegan as served (no swap needed):** Artisan Iced Oat Latte ($5.75), Velvet Nitro Cold
Brew ($5.50), Ceremonial Matcha Latte ($6.25), Single-Origin Double Espresso ($3.75),
Single-Origin Kenya AA Pour-Over ($5.95).

**Vegan on request (swap to oat/almond/coconut milk, free):** Earl Grey Lavender Fog
($5.25), Smoked Vanilla Cardamom Cappuccino ($6.50).

**Not vegan:** Maple Pecan Cream Cold Brew (dairy cold foam), Golden Almond Croissant,
Artisan Chocolate Babka.

**Gluten-free:** every drink on the menu is gluten-free. Neither pastry is gluten-free —
the Financial District Express Bar carries a separate gluten-free bakery selection.

**Nut-free:** Single-Origin Double Espresso and Artisan Chocolate Babka are nut-free.
The Golden Almond Croissant and Maple Pecan Cream Cold Brew contain nuts. Almond milk is
available in the store, so we cannot guarantee a zero-cross-contact environment.

**Dairy-free:** Artisan Iced Oat Latte, Velvet Nitro Cold Brew, Ceremonial Matcha Latte,
Single-Origin Double Espresso, Single-Origin Kenya AA Pour-Over.

**No added sugar:** Single-Origin Double Espresso, Single-Origin Kenya AA Pour-Over,
Velvet Nitro Cold Brew (order without syrup).

**Highest caffeine:** Velvet Nitro Cold Brew. **Lowest calorie:** Kenya AA Pour-Over (2 cal).

---

## LOCATION: San Francisco Flagship & Roastery

- **Address:** 742 Evergreen Terrace, Suite 100, San Francisco, CA 94107
- **Phone:** (555) 382-9488
- **Hours:** Mon–Fri **6:30 AM – 7:00 PM**; Sat–Sun **7:00 AM – 8:00 PM**
- **Amenities:** Free High-Speed WiFi, Outdoor Patio Seating, Direct Trade Roastery,
  EV Charging Stations
- This is our main store and the one to name when a customer just asks "where are you?"

---

## LOCATION: Financial District Express Bar

- **Address:** 100 Montgomery St, Lobby 12, San Francisco, CA 94104
- **Phone:** (555) 492-1102
- **Hours:** Mon–Fri **6:00 AM – 5:00 PM**; **closed Saturday and Sunday**
- **Amenities:** Mobile Order Pickup Bay, Nitro Taps, Gluten-Free Bakery
- Opens earliest of our three stores (6:00 AM) — the right answer for "who opens first?"
- The only location with a gluten-free bakery case.

---

## LOCATION: Sunset District Coffee Lounge

- **Address:** 1840 Judah Street, San Francisco, CA 94122
- **Phone:** (555) 831-7729
- **Hours:** Mon–Fri **7:00 AM – 6:00 PM**; Sat–Sun **7:00 AM – 7:00 PM**
- **Amenities:** Co-Working Space, Dog Friendly Patio, Matcha Tasting Bar
- The dog-friendly location, and the one open latest on weekends after the flagship.

---

## COMPANY & CONTACT

- **Brand name:** Velvet & Bean
- **Tagline:** Artisanal Specialty Coffee & Fresh Pastries
- **About:** Crafting small-batch direct-trade roasts, organic botanical teas, and handmade
  daily pastries with love for our community.
- **Main phone:** (555) 382-9488
- **Email:** hello@velvetandbean.com
- **Instagram:** instagram.com/velvetandbean · **Facebook:** facebook.com/velvetandbean
- **Ordering:** order online from the website menu and pick up in under 10 minutes.
  Customize size, milk, syrup and extra shots in the item window before adding to cart.

---

## B2B / WHITE-LABEL OFFER

- **Agency:** CafeFlow AI Solutions
- **Offer:** Complete AI Chatbot & High-Converting Web Template for Local Cafes
- **Price:** **$499 / month** or **$2,499 one-time**
- Includes the 24/7 AI ordering assistant, the full website, and loyalty tracking,
  fully white-labeled for the buyer's own cafe brand.
- Route serious B2B enquiries to the /b2b page or hello@velvetandbean.com.

---

## FAQ — PHRASED THE WAY CUSTOMERS ACTUALLY ASK

**Q: How much is an iced oat latte?**
A: Our Artisan Iced Oat Latte is **$5.75** for a Small (12 oz), $6.50 Medium (16 oz),
$7.00 Large (20 oz). It's a double shot of house-roasted espresso shaken with organic oat
milk over ice — vegan and dairy-free.

**Q: What's the price of a latte?**
A: The latte on our menu is the Artisan Iced Oat Latte at **$5.75**. Want it hot? We make
it hot at the same price.

**Q: Do you have oat milk?**
A: Yes — oat milk is our default, and it's free. So are almond, coconut and whole milk.

**Q: What's your cheapest drink?**
A: The Single-Origin Double Espresso at **$3.75**.

**Q: Do you have vegan options?**
A: Yes — the Artisan Iced Oat Latte ($5.75), Velvet Nitro Cold Brew ($5.50), Ceremonial
Matcha Latte ($6.25), Double Espresso ($3.75) and Kenya AA Pour-Over ($5.95) are all vegan
as served. Our Earl Grey Lavender Fog and Smoked Vanilla Cardamom Cappuccino become vegan
with a free plant-milk swap.

**Q: Which drinks are gluten-free?**
A: All ten drinks are gluten-free. Our two pastries are not — but the Financial District
Express Bar has a dedicated gluten-free bakery case.

**Q: What are your seasonal drinks right now?**
A: The Smoked Vanilla Cardamom Cappuccino ($6.50) and the Maple Pecan Cream Cold Brew
($6.75).

**Q: How much does a large cost?**
A: Large (20 oz) adds $1.25 to the base price — so a Large Iced Oat Latte is $7.00 and a
Large Matcha Latte is $7.50. Nitro Cold Brew's Large (24 oz) adds $1.00, making it $6.50.

**Q: Can I add an extra shot?**
A: Yes — **+$0.90** per double shot on any customizable drink.

**Q: How much are syrups?**
A: **+$0.75** each: Smoked Vanilla, Salted Caramel, or Cardamom Cinnamon.

**Q: What time do you open?**
A: The SF Flagship opens 6:30 AM weekdays and 7:00 AM weekends. The Financial District
Express Bar opens earliest at 6:00 AM on weekdays but is closed on weekends. The Sunset
District Lounge opens at 7:00 AM every day.

**Q: Are you open on Sunday?**
A: The Flagship (7:00 AM – 8:00 PM) and Sunset District (7:00 AM – 7:00 PM) are open
Sundays. The Financial District Express Bar is closed on weekends.

**Q: Do you have decaf / hot chocolate / a frappuccino / smoothies / sandwiches?**
A: Not right now. If you want something low-caffeine, the Earl Grey Lavender Fog ($5.25) is
the gentlest thing on our menu. Call (555) 382-9488 and a barista can talk options.

**Q: Is the matcha caffeinated?**
A: Yes — about 70 mg per serving from the ceremonial matcha.

**Q: What's your most popular drink?**
A: The Artisan Iced Oat Latte ($5.75). Also top sellers: Velvet Nitro Cold Brew ($5.50),
Ceremonial Matcha Latte ($6.25), Golden Almond Croissant ($4.85), the Smoked Vanilla
Cardamom Cappuccino ($6.50) and the Maple Pecan Cream Cold Brew ($6.75).

**Q: Do you have nut allergies covered?**
A: The Double Espresso and the Chocolate Babka are nut-free. The Almond Croissant and the
Maple Pecan Cream Cold Brew contain nuts, and we pour almond milk in-store, so we can't
promise a nut-free environment. Please tell the barista about a serious allergy.

**Q: Can I buy this website / chatbot for my own cafe?**
A: Yes — CafeFlow AI Solutions white-labels the whole package: **$499/month or $2,499
one-time**. See the B2B page or email hello@velvetandbean.com.

---

**End of Knowledge Base** — ingestion instructions live in `KB_INGESTION.md`, kept out of
this file on purpose so they are never embedded and retrieved as an answer.
