# code - canisiusrugby.org.nuxt2

## Front end Build Setup

- install dependencies

```
npm install
```

- must use node v14

```
nvm use v14.19.3
```

- start with hot reload at localhost:3000

```
npm run dev
```

- build for production

```
npm run generate
```

## API to serve requests

- Dreamhost - api.canisiusrugby.org

```
https://panel.dreamhost.com/
```

# Setup

DANGER - all images are stored in '/home/rastridge/canisiusrugby.org/public' - DO NOT OVERWRITE

- Upload js server '~/Code/canisiusrugby.org.nuxt2/canisiusrugby.org.api' to dreamhost

```
rsync -av --delete --exclude ".git" --exclude ".DS_Store" --exclude ".eslintrc.js" --exclude ".editorconfig" --exclude "/node_modules" --exclude "/public" --exclude "/imgs" ~/Code/canisiusrugby.org.nuxt2/canisiusrugby.org.api/ rastridge@vps30249.dreamhostps.com:/home/rastridge/api.canisiusrugby.org/

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

# Supporting Services

A number of outside services are used to implement apps

## Sending Emails

ElasticEmail
setup and Usage

```
https://app.elasticemail.com/login
```

## Sending Text Messages

- Twilio - text messaging

```
https://www.twilio.com/login
```
