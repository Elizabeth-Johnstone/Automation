import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('I can add a movie', async () => {
    let addInput = await (await driver).findElement(By.xpath('//form/input'))
    await addInput.sendKeys('The Cheetah Girls')
    
    let addButton = await (await driver).findElement(By.xpath('//form/button'))
    await addButton.click()

    await driver.sleep(2000)
})

test('I can delete a movie', async () => {
    let deleteInput = await (await driver).findElement(By.xpath('//form/input'))
    await deleteInput.sendKeys('Justin Bieber: Never Say Never\n')

    let deleteButton = await (await driver).findElement(By.xpath('//li/button'))
    await deleteButton.click()

    await driver.sleep(2000)
})

test('I can cross off a movie', async () => {
    let crossInput = await (await driver).findElement(By.xpath('//form/input'))
    await crossInput.sendKeys('Cruella\n')

    let crossButton = await (await driver).findElement(By.xpath('//li/span'))
    await crossButton.click()

    await driver.sleep(2000)
})

test('Cross off shows the correct text', async () => {
    let crossMovie = 'Cruella'

    let crossInput = await (await driver).findElement(By.xpath('//form/input'))
    await crossInput.sendKeys(`${crossMovie}\n`)

    let crossButton = await (await driver).findElement(By.xpath('//li/span'))
    await crossButton.click()

    let textReply = await (await driver).findElement(By.id('message')).getText()
    expect(textReply).toBe(`${crossMovie} watched!`)

    await driver.sleep(2000)
})

test('Delete shows the correct text', async () => {
    let deleteMovie = '101 Dalmatians'

    let deleteInputAgain = await (await driver).findElement(By.xpath('//form/input'))
    await deleteInputAgain.sendKeys(`${deleteMovie}\n`)

    let deleteButtonAgain = await (await driver).findElement(By.xpath('//li/button'))
    await deleteButtonAgain.click()

    let deleteReply = await (await driver).findElement(By.id('message')).getText()
    expect(deleteReply).toBe(`${deleteMovie} deleted!`)

    await driver.sleep(2000)

})