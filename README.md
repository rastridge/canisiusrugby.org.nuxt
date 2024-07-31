# code - canisiusrugby.org.nuxt2

- Built using Nuxt @ v2.17.3

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

- Upload to site (dry run first)

```
rsync -av --dry-run --delete --exclude ".git" --exclude ".gitignore" --exclude ".nojekyll"  ~/code/canisiusrugby.org.nuxt2/canisiusrugby.org.nuxt2/dist/  rastridge@vps30249.dreamhostps.com:/home/rastridge/canisiusrugby.org/public/

```

- Inspect the site

```
ssh rastridge@vps30249.dreamhostps.com
cd canisiusrugby.org/public
```

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
