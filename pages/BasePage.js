export default class BasePage{

    async loadUrl (page, url) {
        await page.goto(url, {waitUntil: 'networkidleo'})
    }
     
    async click(page, selector){
        try {
                 await page.waitForSelector(selector)
                 await page.click(selector)
          } catch (error) {
             throw new Error(" Selector Not found :"+selector)             
          }
    }

    async matchElement(page, selector){
        try {
            await page.waitForSelector(selector)
            const actualNames = await page.evaluate(({selector}) => {      
            const elements = document.querySelectorAll(selector);
            return Array.from(elements).map(element => element.textContent);
            },{selector});
            return actualNames 
            
        } catch (error) {
            throw new Error(" Selector Not found :"+selector) 
        }

    }
    
    async type(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error(" Selector Not found :"+selector)      
        }
    }
    
    async selectorShouldExist(page,selector){
        try {
            await page.waitForSelector(selector)
        } catch (error) {
            throw new Error(" Selector Not found :"+selector)      
        }
    }

    async switchToTab() {
        const pageTarget = page.target(); //save this to know that this was the opener
        const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); //check that you opened this page, rather than just checking the url
        const newPage = await newTarget.page(); //get the page object
        //await newPage.bringToFront() //Note that, if running Puppeteer in headful mode, you will have to manually bring focus to the new tab, either by bringing it to the front
        await newPage.waitForSelector("body"); //wait for page to be loaded
        return newPage; //this is the id of new page object of window
    }

    async getText(page, selector) {      
        try {
            
          //  const [getElement] = await page.$x(selector);
          //  let text = await page.evaluate(el => el.textContent, getElement);
            const text = await page.$eval(selector,el => el.textContent)
            return text;
            
        } catch (error) {
            throw new Error(" Selector Not found :"+selector) 
        }      
    }
    
    // async getCount(page, selector){
    //     try {
    //         // const [getElement] = await page.$x(selector);
    //         // let text = await page.evaluate(el => el.textContent, getElement);
    //         // return text;

    //         const getcount = await page.$$(selector);
    //         let count = await page.evaluate(el => el.length, getcount);
    //         return count;

    //     } catch (error) {
    //         throw new Error("Selector get count function Not found",selector) 
    //     }
    // }

    async getCount(page,selector) {
        try {
            const getCount = await page.$$(selector);
            console.log(getCount)
           let count = await page.evaluate(el => el.length, getCount);
            return count;
        } catch (error) {
            throw new Error('Cannot get count of selector',selector)
        }
    }

    async selectorNotExist(page,selector){
        try {
            await page.waitForSelector(selector,{
                      hidden:true,
                      delay:3000
                  })
        } catch (error) {
            throw new Error(" Selector Not found :"+selector) 
        }
    }
            
    async pressKey(page,key){
        try {
            await page.keyboard.press(key)
        } catch (error) {
            throw new Error(" Key Doesn't exist :"+selector) 
        }
    }

    async waitForText(page, selector, text){
        try {
            await page.waitForFunction(
                (selector, text) => document.querySelector(selector).innerText.includes(text),{},selector,text
            )
        } catch (error) {
            throw new Error('Text ${text} not found for selector ${selector}')
        }
    }


}