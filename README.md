# code - buffalorugby.org.nuxt

> Converted BRC Site from PHP/JQ to JS/NUXT

## Build Setup

```bash
# install dependencies
$ npm install

# must use node v14
$ nvm use v14.19.3

# serve with hot reload at localhost:3000
$ npm run dev

# build for production

$ npm run generate
```

#

## API to support requests

- Dreamhost - api.canisiusrugby.org

```
https://panel.dreamhost.com/
```

Setup

DANGER - all images are stored in 'public' - DO NOT OVERWRITE

- Upload js server '~/Code/brc.org.nuxt3/nuxt3-brc-media-api' to dreamhost

```
rsync -av --delete --exclude "ecosystem.config.js" --exclude "app.js" --exclude "/public" --exclude "logs" --exclude "/node_modules" --exclude ".git" --exclude ".gitignore" ~/Code/canisiusrugby.org.nuxt2/canisiusrugby.org.api/ rastridge@buffalorugby.org:/home/rastridge/api.canisiusrugby.org/
```

- enable Proxy server on api.canisiusrugby.org

```
alias shell='ssh rastridge@vps30249.dreamhostps.com'
```

Maintain server with pm2

- Start server

```
pm2 ecosystem.config.js
```

- cronjob to restart servers using 'pm2 resurrect'
