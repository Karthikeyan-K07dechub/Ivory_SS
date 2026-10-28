# Photography sources

Added 28 October 2026. All 22 photo slots in each language use 19 selected photos from Pexels, stored locally in `public/images/` as optimized WebP files. The same project covers appear on the homepage, project index, project detail pages and related-project cards on solution pages.

The exact source page, photographer, original Pexels ID, description and focal position for each file are recorded in [photo-catalog.json](photo-catalog.json). Source links and photographer credits are shown under captioned images. Cards and covers retain the localized “Illustrative photo” label even when their captions are hidden. Photos show design and technology references, not actual Ivory projects or staff.

License: [Pexels License](https://www.pexels.com/license/). The license permits free use and editing on websites, including commercial websites. Do not imply endorsement by depicted people or brands.

| Local file | Photographer | Source |
| --- | --- | --- |
| villa-living.webp | Yura Forrat | [Pexels 10161222](https://www.pexels.com/photo/modern-living-room-10161222/) |
| lounge.webp | Lydia Griva | [Pexels 35574733](https://www.pexels.com/photo/elegant-modern-living-room-with-natural-light-35574733/) |
| smart-access.webp | Joppe Beurskens | [Pexels 6689288](https://www.pexels.com/photo/woman-entering-a-house-6689288/) |
| villa-kitchen.webp | Lachlan Ross | [Pexels 6510429](https://www.pexels.com/photo/contemporary-house-interior-with-spacious-kitchen-and-dining-zone-6510429/) |
| bedroom-curtains.webp | Max Vakhtbovych | [Pexels 7533840](https://www.pexels.com/photo/an-interior-of-a-bedroom-7533840/) |
| villa-evening.webp | Ahmet ÇÖTÜR | [Pexels 24807125](https://www.pexels.com/photo/house-with-pool-at-night-24807125/) |
| equipment-rack.webp | Brett Sayles | [Pexels 5480781](https://www.pexels.com/photo/server-racks-on-data-center-5480781/) |
| apartment-living.webp | Max Vakhtbovych | [Pexels 7534563](https://www.pexels.com/photo/luxury-living-room-in-modern-apartment-7534563/) |
| panoramic-curtains.webp | Max Vakhtbovych | [Pexels 7061428](https://www.pexels.com/photo/spacious-living-room-with-curtains-on-panoramic-windows-7061428/) |
| sea-balcony.webp | Iulian Sandu | [Pexels 17590694](https://www.pexels.com/photo/balcony-overlooking-the-sea-17590694/) |
| apartment-bedroom.webp | Max Vakhtbovych | [Pexels 6315800](https://www.pexels.com/photo/modern-furniture-and-big-mirror-in-bedroom-6315800/) |
| apartment-kitchen.webp | Max Vakhtbovych | [Pexels 7587864](https://www.pexels.com/photo/view-of-a-modern-kitchen-interior-7587864/) |
| wifi-router.webp | Aditya Singh | [Pexels 4218546](https://www.pexels.com/photo/wifi-router-on-yellow-background-4218546/) |
| office-lobby.webp | Max Vakhtbovych | [Pexels 7046155](https://www.pexels.com/photo/modern-office-interior-with-furniture-and-lamps-against-windows-7046155/) |
| office-floor.webp | Eric WANG | [Pexels 28715052](https://www.pexels.com/photo/modern-open-space-office-with-large-windows-28715052/) |
| meeting-room.webp | Mikhail Nilov | [Pexels 8101928](https://www.pexels.com/photo/people-in-a-meeting-room-8101928/) |
| facility-monitor.webp | panumas nikhomkhai | [Pexels 17489155](https://www.pexels.com/photo/monitor-and-wires-behind-17489155/) |
| network-cabling.webp | Brett Sayles | [Pexels 2881229](https://www.pexels.com/photo/cables-connected-on-server-2881229/) |
| design-consultation.webp | RDNE Stock project | [Pexels 10375961](https://www.pexels.com/photo/people-brainstorming-in-office-10375961/) |

To restore the local assets, run `node scripts/download-photography.mjs` from the project root. This downloads only the reviewed photo IDs and skips existing files. Each photo is resized within 1800 × 1800 pixels, respecting its aspect ratio, and encoded as WebP at quality 82.

The homepage and contact page maps use the official [OpenStreetMap embed](https://wiki.openstreetmap.org/wiki/Export#Embeddable_HTML), with OpenStreetMap attribution supplied by the map itself. The map shows the Ras Al Khaimah area without an unverified exact office pin.

The villa hero, animated walkthrough rooms, system icons and planner diagrams are intentional interactive illustrations and remain intact.
