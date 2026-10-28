# Placeholders to confirm before launch

Everything below is **invented sample content** so the design can be judged at full density.
On the site each item is wrapped in `<Placeholder>` (dotted underline, "To be confirmed" tooltip),
created in the content files with `tbc("…")`. Search `tbc(` in `/content/en.ts` and `/content/ar.ts`
to find them. When a value is confirmed, replace `tbc("value")` with the plain string `"value"`.

## Brand and company

| Item | Current placeholder | File / key |
| --- | --- | --- |
| Licensed company name | "Licensed company name still being confirmed" (footer) | `brand.nameNote` |
| Emergency support line | +971 56 692 2452 · 24/7 for care plan clients | `contact.emergency` |
| Service area | Ras Al Khaimah, Umm Al Quwain, Ajman, Sharjah | `contact.serviceArea` |
| Brands installed | LifeSmart, CORE, Larnitech — each shown as "pending confirmation" | `brands` |
| Company profile PDF | A sample overview is available to download; replace with the approved company profile when supplied | `public/documents/ivory-smart-home-sample-profile.pdf` |

## Projects (all three are samples)

| Project | Invented details | File / key |
| --- | --- | --- |
| Private villa, Al Hamra | Location, 5 bedrooms · 850 m², 6-month timeline, systems list, summary, challenge / solution / result, client quote and author | `projects[0]` |
| Apartment, Mina Al Arab | Location, 3 bedrooms · 210 m², 3-week timeline, systems, summary, story, quote | `projects[1]` |
| Office building, RAK | Location, 6 floors · 4,200 m², 9-month timeline, systems, summary, story, quote | `projects[2]` |

Each project has a cover and six gallery photos sourced from Pexels. These are labeled illustrative photography and do not document actual Ivory installations. See `IMAGE_SOURCES.md` for the source catalog.

## Care plans

| Item | Placeholder | File / key |
| --- | --- | --- |
| Essential | Apartments and smaller systems · AED 1,500 / year · next-day response · 3 features | `carePlans[0]` |
| Plus | Most villas · AED 3,500 / year · same-day response · 4 features | `carePlans[1]` |
| Premium | Large villas, palaces and buildings · on request · 4-hour emergency response, 24/7 · 4 features | `carePlans[2]` |
| Response-time promise | Same-day response for Plus and Premium clients in RAK | `carePage.promises[1]` |
| Warranty | Two years on workmanship, plus manufacturer warranty | `carePage.promises[2]` |

## Testimonials (all invented)

| Quote | Name | Place |
| --- | --- | --- |
| "They came before the plastering…" | Khalid A. | Villa owner, Al Hamra |
| "The curtains alone made the apartment cooler…" | Sara M. | Apartment owner, Mina Al Arab |
| "When something stops working, someone local picks up the phone…" | Rashid K. | Villa owner, Ras Al Khaimah |

## Not marked on the page, but still to confirm

- **Room times and lifestyle moments** in the walkthrough (6:30 AM, 1:00 PM, 7:00 PM, 10:30 PM, 11:15 PM, 11:45 PM) are narrative copy, not business facts.
- **Map coordinates** (`contact.geo`, used in JSON-LD) are approximate for Al Salam Street, Ras Al Khaimah. Confirm the exact pin.
- **Opening hours**: only "Open daily" is confirmed. Exact times are deliberately left out of the structured data (`lib/seo.ts`).
- **Domain**: `https://ivorysmarthome.com` is assumed from the email address. Set `NEXT_PUBLIC_SITE_URL` in Vercel if different.
- **Project photographs**: illustrative stock photos now fill every photo slot. Replace them with verified project photos when available; remove their `illustrative` flag and update the photo credits at that point.
- **Arabic long paragraphs**: shown in English with an "AR pending" marker. Search `arPending(` / `P(` in `/content/ar.ts`.
