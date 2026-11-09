# 513Sips-Staging
stage environment before pushing to production for 513Sips tools


## Keeping staging level with production

Staging is a copy of `Egady513/513sips-tools` `main`, not a fork. Crawlers only read `robots.txt` at the host root, and this site is a project page, so `robots.txt` here does not block anything. The real block is a `<meta name="robots" content="noindex, nofollow">` tag on every HTML page.

`staging-prep.sh` makes a production copy safe for staging. It removes `CNAME`, writes `robots.txt` and adds the noindex tag to every HTML page that lacks one. It is safe to run twice.

- **Run it after every refresh from production**, then commit the result.
- **To stage a production PR:** copy that PR branch's files into this repo, run `./staging-prep.sh`, commit, and open a staging PR that names the source SHA.
- **Check:** with production added as remote `prod`, this prints nothing:
  `git diff --stat -I 'name="robots" content="noindex' <production-sha> HEAD -- . ':!CNAME' ':!robots.txt' ':!README.md' ':!staging-prep.sh'`
