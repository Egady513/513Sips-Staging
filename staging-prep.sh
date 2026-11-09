#!/bin/sh
# staging-prep.sh: make a copy of production safe to serve as staging.
# Run it after every refresh from production, then commit the result.
# Safe to run twice: a second run changes nothing.
#
# 1. Removes CNAME (it must never reach staging: GitHub Pages would try to
#    claim www.513sips.com for the staging site).
# 2. Writes robots.txt (crawlers only read it at the host root, so this alone
#    does not protect a project page; the meta tag below does).
# 3. Adds <meta name="robots" content="noindex, nofollow"> as its own line
#    after the <head> line of every HTML page that does not already carry a
#    noindex robots tag. Line endings of each file are kept.
set -e
cd "$(dirname "$0")"

rm -f CNAME

cat > robots.txt <<'ROBOTS'
User-agent: *
Disallow: /

# Staging repository only. Production remains crawlable.
ROBOTS

added=0
for f in $(find . -name '*.html' -not -path './.git/*' -not -path './node_modules/*' | sort); do
  if grep -qiE 'name="robots"[[:space:]]+content="noindex' "$f"; then
    continue
  fi
  perl -0777 -i -pe '
    my $eol = ($_ =~ /\r\n/) ? "\r\n" : "\n";
    s/(<head\b[^>]*>[^\r\n]*\r?\n)/$1<meta name="robots" content="noindex, nofollow">$eol/i;
  ' "$f"
  grep -qiE 'name="robots"[[:space:]]+content="noindex' "$f" || { echo "FAILED to tag $f" >&2; exit 1; }
  added=$((added + 1))
done
echo "staging-prep: noindex tag added to $added page(s)"
