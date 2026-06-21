⚠️ DEPLOYMENT TOPOLOGY — THIS REPO DOES NOT OWN THE PUBLIC DOMAIN
This is the React app (cms-completenew). There are TWO separate Vercel projects for CMS.
The two projects
Repo / Vercel project
Serves
Content
cms-completenew (THIS REPO)
the React app (Vercel *.vercel.app, app subdomain)
Vite + React SPA, training engine, Supabase, VBT
cmstrength-marketing
www.cmstrength.fit + cmstrength.fit
Static .html marketing pages, blog, sitemap.xml, robots.txt

Rule that has burned multiple sessions
www.cmstrength.fit is NOT served by this repo. It's served by cmstrength-marketing.

So:

Do NOT fix sitemap.xml, robots.txt, or any SEO/marketing issue here. Those files live in the cmstrength-marketing repo (public/). Editing them here changes nothing on the live domain — verified: the app's public/sitemap.xml is never what Google reads.
Any public/sitemap.xml, public/robots.txt, or vercel.json static-route fix in THIS repo for the marketing domain is a dead end. The fix must go in cmstrength-marketing.
This repo's clean React-Router paths (/blog, /faq) are NOT the marketing URLs. The marketing site uses .html.
If you're here to fix the sitemap
Wrong repo. Go to cmstrength-marketing and read its DEPLOYMENT_TOPOLOGY.md.

Last verified: 2026-06-01

