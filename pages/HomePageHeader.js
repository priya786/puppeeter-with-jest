import { validLoginUsername, validLoginPassword, baseUrl, defaultTimeOut, invalidLoginUsername } from "../lib/config";
import BasePage from "../pages/BasePage"; 

const menuIcon = ".bm-burger-button"
const header = ".primary_header"
const cart = ".shopping_cart_link"
const menuList = "a[class='bm-item menu-item']" //nav[@class='bm-item-list']" ////a[@class='bm-item menu-item']
const allItems = "a[id='inventory_sidebar_link']"
const about = "//a[@id='about_sidebar_link']"
const aboutSelector = "a[id='about_sidebar_link']"
const logout = "a[id='logout_sidebar_link']"
const resetAppState = "a[id='reset_sidebar_link']"
const crossIcon = "#react-burger-cross-btn"

let basepage = new BasePage()

export default class HomePageHeader extends BasePage {

    async headerDisplayed(){
        await page.waitForSelector(header)
        await page.waitForSelector(menuIcon)
        await page.waitForSelector(cart)
    }

    async menu() {
        await page.waitForSelector(menuIcon)
        await page.click(menuIcon)
        await page.waitForTimeout(3000)
        await page.waitForXPath(about)
        const menuName = await basepage.getText(about)
        return menuName
    }

    async crossIcon(){
        await page.waitForSelector(menuIcon)
        await page.click(menuIcon)
        await page.waitForTimeout(3000)
        await page.click(crossIcon)
        await page.waitForSelector(menuIcon)
    }

    async clickAbout() {
        await page.waitForSelector(menuIcon)
        await page.click(menuIcon)
        await page.waitForSelector(aboutSelector)
        await page.waitForTimeout(1000)
        await page.click(aboutSelector)
        console.log('Exiting about function')
    }

    async clickLogout() {
        await page.waitForSelector(menuIcon)
        await page.click(menuIcon)
        await page.waitForSelector(logout)
        await page.waitForTimeout(1000)
        await page.click(logout)
    }

    async links(){
        await page.waitForSelector(menuIcon)
        await page.click(menuIcon)
        await page.waitForTimeout(2000)
        await page.waitForSelector(menuList)
        const targetEls = await page.$$(menuList);
        for(let target of targetEls){
          const iHtml = await page.evaluate(el => el.textContent, target); 
          console.log(iHtml)
        }
        //   if (iHtml.replace(/[^0-9]/g, '') === '5') {
        //     await target.click();
        //     break;
        //   }
    }
}