const puppeteer = require('puppeteer')
const moment = require('moment')
const faker = require('faker')

const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

const fetchCookie = async function(storeNumber = '55141-0', date, time) {
  const dateFormatted = moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY').toString()

  try {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 20
    })
    const page = await browser.newPage()

    await page.goto('https://www.parleznousdesubway.fr')

    const navigationPromise = page.waitForNavigation({
      waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
    })

    const email = faker.internet.email()
    await page.type('#spl_q_subway_customer_email_txt', email)
    await page.type('#spl_q_subway_confirm_email_address_txt', email)

    await page.type('#spl_q_subway_customer_first_name_txt', faker.name.firstName())
    await page.type('#spl_q_subway_customer_last_name_txt', faker.name.lastName())

    await page.click('#buttonBegin')

    await navigationPromise

    const storeNumberPart1 = storeNumber.split('-')[0]
    const storeNumberPart2 = storeNumber.split('-')[1]

    await page.evaluate(function () {
      document.querySelector('input#storeNumberPart1').value = ''
    })
    await page.type('input#storeNumberPart1', storeNumberPart1)

    await page.evaluate(function () {
      document.querySelector('input#storeNumberPart2').value = ''
    })
    await page.type('input#storeNumberPart2', storeNumberPart2)

    await page.type('#cal_q_subway_receipt_transaction_date_date_', dateFormatted)

    await page.evaluate(time => {
      const hours = time.split(':')[0]
      const minutes = time.split(':')[1]
      document.querySelector('#dd_q_subway_receipt_hour_of_day_enum').value = hours
      document.querySelector('#dd_q_subway_receipt_transaction_minute_enum').value = minutes
    }, time)

    await page.waitForSelector('#buttonNext')
    await page.click('#buttonNext')

    await navigationPromise


    await page.waitForSelector('.table_table > .row_row > .cell_cell > .cellOption_cellOptionContainer > #onf_q_subway_ltr_likely_scale_11_5')

    await page.evaluate(() => {
      document.querySelector('#onf_q_subway_ltr_likely_scale_11_5').click()
      document.querySelector('input#onf_q_subway_meal_satisfaction_enum_2').click()
      document.querySelector('input#onf_q_subway_service_speed_enum_2').click()
      document.querySelector('input#onf_q_subway_staff_experiece_enum_2').click()
      document.querySelector('input#onf_q_subway_restaurant_cleanliness_enum_2').click()
    })

    await page.waitForSelector('#buttonFinish')
    await page.click('#buttonFinish')

    await navigationPromise

    await page.waitForSelector('.incentiveCode')
    const x = await page.evaluate(() => document.querySelector('.incentiveCode').innerText)

    await browser.close()

    return x
  } catch (err) {
    console.log(err)
  }
}

module.exports = fetchCookie;