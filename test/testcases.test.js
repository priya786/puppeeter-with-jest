import BasePage from "../pages/BasePage";
import {ExpectedButton,n,Expectedcount,des1,des2,des3,des4,des5,des6, linkedinClick,facebookurl,twitterurl,name, password, defaultTimeout,invalidname,invalidpassword,blankErrMsg,usernameerror,passworderror,xpathblankerror,invalidErrMsg} from "../lib/config";
import LoginPage from "../pages/LoginPage";
import HomePageFooter from "../pages/HomePageFooter";
import HomePageHeader from "../pages/HomePageHeader";
import registerAllureReporter from 'jest-puppeteer-allure/src/registerAllureReporter';
import HomePage from "../pages/HomePage";
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });



describe('Functional: test cases', () => {
    let loginpage
    let basepage
    let homepagefooter
    let homepageheader
    let homepage
 
  beforeAll(async () => {
        loginpage = new LoginPage()
        basepage=new BasePage()
        homepagefooter = new HomePageFooter()
        homepageheader = new HomePageHeader()
        homepage = new HomePage()     
        const testResults = expect.getState().testResults;
        const firstTestResult = testResults?.[0];
        // const status = firstTestResult?.status;

    })
    beforeEach(async () => {
        
        await reporter.startStep('Navigated to Login page or not');
        await reporter.epic('Component Tests.')
        await reporter.feature('Shopping Cart Feature.')
        await reporter.story('Cart Crud Story.')
    })

    afterEach(async () => {
        const testInfo = expect.getState().currentTestName;
        const screenshotPath = `screenshots/${testInfo}.png`;

        const testResults = expect.getState().testResults;
        if (testResults && testResults.length > 0 && testResults[testResults.length - 1].status === 'failed') {
        await page.screenshot({ path: screenshotPath });
    }
        await reporter.endStep();
    })

    test.only('Verify login Functionality with Blank Credentials', async () => {
        
       await loginpage.visit()
       await loginpage.login("","")
       const ErrMessage = await loginpage.ErrorMsg()
       console.log("Error message is : "+ErrMessage);
       expect(ErrMessage).toBe(blankErrMsg);
    }, defaultTimeout)

    test('Verify login Functionality with username & blank password', async () => {
        
        await loginpage.visit()
        await loginpage.login(name, "")
        const ErrMessage = await loginpage.ErrorMsg()
        console.log("Error message is : "+ErrMessage);
        expect(ErrMessage).toBe(usernameerror)
    }, defaultTimeout)

    test('Verify login Functionality with blank username & valid password', async () => {
        
        await loginpage.visit()
        await loginpage.login("", password)
        const ErrMessage = await loginpage.ErrorMsg()
        console.log("Error message is : "+ErrMessage);
        expect(ErrMessage).toBe(blankErrMsg)
    }, defaultTimeout)

    test('Verify login Functionality with invalid username & invalid password', async () => {
        
        await loginpage.visit()
        await loginpage.login(invalidname, invalidpassword)
        const ErrMsg = await page.$eval(xpathblankerror,el => el.textContent)
        console.log("Error message is : "+ErrMsg);
        expect(ErrMsg).toBe(invalidErrMsg)
    }, defaultTimeout)
   
  
    test('Verify login Functionality with username & password', async () => {
   
        await loginpage.visit()
        await loginpage.login(name, password)
        const URL= await page.url()
        expect(URL).toEqual('https://www.saucedemo.com/inventory.html')
       
    }, defaultTimeout)


 

    /*-----------------------HomePage Footer-----------------------------------------*/


    test('Verify footer section is displayed', async function(){
      
        await homepagefooter.footerDisplayed()
    }, defaultTimeout)

    test('Verify social icons displayed', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepagefooter.socialIconsDisplayed()
    }, defaultTimeout)

    test('Verify is footer message displayed', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        const message = await homepagefooter.footerMessageDisplayed()
        console.log(message)
        expect(message).toMatch(new RegExp('Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy'))
    }, defaultTimeout)

    test('Verify navigated to twitter URL', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepagefooter.twitterClick()
        const twitter= await page.url()
        expect(twitter).toEqual(twitterurl)   

        
    }, defaultTimeout)

    test('Verify navigated to facebook UI', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepagefooter.facebookClick()
        const facebookurl= await page.url()
        expect(facebookurl).toEqual('https://www.facebook.com/saucelabs')
        
    }, defaultTimeout)

    test('Verify navigated to linkedIn UI', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepagefooter.linkedinClick()
        const linkedinClick= await page.url()
        // expect(linkedinClick).toBe.include('https://www.linkedin.com/')
        // //toEqual('https://www.linkedin.com/company/sauce-labs/')
        expect(page.title()).resolves.toMatch('LinkedIn');
    }, defaultTimeout)
   


/*-----------------------HomePage Header-----------------------------------------*/


    test('Verify header section is displayed', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepageheader.headerDisplayed()
    }, defaultTimeout)

    test('Verify is menu items displayed', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        const menuName = await homepageheader.menu()
        expect(menuName).toBe('About')
        
    }, defaultTimeout)

    test('Verify cross icon is closed', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepageheader.crossIcon()
    }, defaultTimeout)

    test('Verify navigate to About page', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepageheader.clickAbout() 
        console.log('about link clicked')
        const aboutUrl = await page.url() 
        console.log(aboutUrl)
        expect(aboutUrl).toEqual('https://saucelabs.com/')
    }, defaultTimeout)

    test('Verify navigate to Login page', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepageheader.clickLogout() 
        expect (await page.url()).toBe('https://www.saucedemo.com/')
    }, defaultTimeout)

    test('Verify menu items name', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepageheader.links()
    }, defaultTimeout)

    test('Verify the item count', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
       let text=await homepage.numberOfProduct()
       console.log(text);
       expect(text).toEqual(6)
    }, defaultTimeout)

    test('Verify all the name of products', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepage.nameOfProduct()
    }, defaultTimeout)
   
    test('Verify all the describtion of products', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepage.productDesciption()
    }, defaultTimeout)
  
    test('Verify all the price of products', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
       let text=await homepage.productPrice()
    }, defaultTimeout)

    test('Verify all the button of products', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepage.productbutton()
    }, defaultTimeout)

    test('Verify menu items name', async function(){
        await loginpage.visit()
        await loginpage.login(name, password)
       let text=await homepage.productPrice()
    }, defaultTimeout)

    test('Verify all the names are coming correctly or not', async () => {
        await loginpage.visit()
        await loginpage.login(name, password)
        const expectedNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket', 'Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
       let actualNames= await homepage.expectedName()
       console.log(actualNames+" "+expectedNames);
       expect(actualNames).toEqual(expectedNames);

    })

    
    test('Verify that description content is matched or not', async () => {
        const expectedNames = [des1,des2,des3,des4,des5,des6];
        await loginpage.visit()
        await loginpage.login(name, password)
        let actualNames= await homepage.expectedDescription()
        console.log(actualNames+" "+expectedNames);
        expect(actualNames).toEqual(expectedNames);
    })
    test('Verify that after click on cart "Add to cart" button changed to "Remove"', async() => {
        await loginpage.visit()
        await loginpage.login(name, password)
        let actualButton= await homepage.clickButton()

        expect(actualCount).toEqual(ExpectedButton)
    },defaultTimeout)

    test('Verify that after click on cart count is increased or not', async() => {
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepage.clickButton()
        let actualCount=await homepage.cartCount()
        expect(actualCount).toEqual(Expectedcount)
    },defaultTimeout)

    test('filter otion selection', async() => {
        await reporter.startStep('Navigated to Login page or not');
        await reporter.epic('Component Tests.')
        await reporter.feature('Shopping Cart Feature.')
        await reporter.story('Cart Crud Story.')
        await loginpage.visit()
        await loginpage.login(name, password)
        let Actual=await homepage.priceFilter()
        let expected = await homepage.getSortedArrayOfPrices()
        expect(Actual).toEqual(expect.arrayContaining(expected));
   
      
    },defaultTimeout)

    // it.only('should match a screenshot', async () => {
    //     await page.goto('https://www.example.com');
    //     const screenshot = await page.screenshot();
    //     expect(screenshot).toMatchImageSnapshot();
    //   }, 30000);
  
})



      
    



