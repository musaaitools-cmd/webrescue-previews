# WebRescue concept previews

Static concept websites made by WebRescue for local businesses, hosted on GitHub Pages.
Every page is `noindex,nofollow` and `robots.txt` disallows all crawling. Each preview carries a
"Concept by WebRescue" banner and states it is not an official website.

```
index.html               landing page (not a directory listing)
demo-roofing-fake/       demo preview (made-up business)
demo-plumbing-fake/      demo preview (made-up business)
demo-hvac-fake/          demo preview (made-up business)
_index/                  thumbnails + font for the landing page
.nojekyll                serve files as-is (no Jekyll build)
robots.txt               Disallow: /
```

## Adding a real preview
Generate it from the template kit (outside this repo), then copy the folder in:
```
python3 ../templates/fill.py lead.json --out .     # creates ./<lead-id>/
```
Use non-guessable lead ids for real previews. Never commit lead lists, CSV/JSON/DB files or contact
emails: `.gitignore` blocks the common ones, but check `git status` before each commit.

## Publish (when ready)
```
gh auth login                     # once
gh repo create <name> --public --source . --push
# then Settings > Pages > Deploy from branch: main / (root)
```

Credits: photos from Unsplash (Unsplash License), font Plus Jakarta Sans (OFL), motion by GSAP
(GreenSock standard no-charge license). See `*/assets/CREDITS.md`.
