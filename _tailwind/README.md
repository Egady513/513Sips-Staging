# _tailwind

Source for `css/tailwind.css`, the built Tailwind (v3.4.17) stylesheet used by the pages that have Tailwind utility classes (home, partners, blog index and blog posts). It replaces the old `cdn.tailwindcss.com` script.

Rebuild after you add or change Tailwind classes on those pages:

    npx tailwindcss@3.4.17 -c _tailwind/tailwind.config.js -i _tailwind/input.css -o css/tailwind.css --minify

Commit the rebuilt `css/tailwind.css`. There is no build step on deploy. This folder starts with an underscore, so GitHub Pages does not publish it.
