import { validLoginUsername, validLoginPassword, baseUrl, defaultTimeOut, invalidLoginUsername, filename } from "../lib/config";
import BasePage from "../pages/BasePage"; 

const footer = ".footer"
const facebook = ".social_facebook"
const twitter = ".social_twitter"
const linkedin = ".social_linkedin"
const footerMessage = ".footer_copy"

let basepage = new BasePage()

export default class HomePageFooter extends BasePage {

    async footerDisplayed() {
        await page.waitForSelector(footer)
    }

    async socialIconsDisplayed() {
        await page.waitForSelector(facebook)
        await page.waitForSelector(twitter)
        await page.waitForSelector(linkedin)
    }

    async footerMessageDisplayed() {
        await page.waitForSelector(footerMessage)
        const footerText= await basepage.getText(page, footerMessage)
        return footerText
    }

    async twitterClick() {
        await page.waitForSelector(twitter)
        await page.click(twitter)
        await page.waitForTimeout(3000)
        page = await basepage.switchToTab()
       // await page.waitForXPath("//span[normalize-space()='New to Twitter?']")
    }

    async tabswitch(){
        const pages = await browser.pages();
        const newPage = pages[2];
        await newPage.bringToFront();
        await page.waitForTimeout(5000)
        // await newPage.goto(baseUrl);
       
        
    }

    async facebookClick() {
        await page.waitForSelector(facebook)
        await page.click(facebook)
        await page.waitForTimeout(2000)
        page = await basepage.switchToTab()
        await page.waitForTimeout(2000)
    }

    async linkedinClick() {
        await page.waitForSelector(linkedin)
        await page.click(linkedin)
        await page.waitForTimeout(2000)
        page = await basepage.switchToTab()
    }

}

