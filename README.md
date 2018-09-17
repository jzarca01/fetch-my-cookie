# Fetch My Cookie

Did you know right now Subway is offering a FREE Cookie!? Yum! They’re so tasty!

To get your free Subway cookie:

Go to the link on your Subway receipt
Fill out the short survey about your visit
Write the claim code on your receipt, and redeem for a free cookie!

## Or just use this app

```javascript
node index.js
```

Send a POST request to *http://localhost:4000/cookie*
```json
{
    "storeNumber": "12345-0" (you'll find the real infos or your receipt)
    "date": "12/09/2018" (DD/MM/YYYY)
    "time": "12:03"
}
```

And you'll get the result :
```
Code promotionnel : 5-12345-0-0912-1203
Date d'expiration : 9/22/2018
```

## Enjoy !