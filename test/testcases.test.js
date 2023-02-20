import BasePage from "../pages/BasePage";
import {n,Expectedcount,des1,des2,des3,des4,des5,des6, linkedinClick,facebookurl,twitterurl,name, password, defaultTimeout,invalidname,invalidpassword,blankErrMsg,usernameerror,passworderror,xpathblankerror,invalidErrMsg} from "../lib/config";
import LoginPage from "../pages/LoginPage";
import HomePageFooter from "../pages/HomePageFooter";
import HomePageHeader from "../pages/HomePageHeader";

import HomePage from "../pages/HomePage";


// describe('Functional: Login test cases', () => {

// })

describe('Functional: test cases', () => {
    let loginpage
    let basepage
    let homepagefooter

  

    // let usernameerror="Epic sadface: Password is required"
    // let passworderror="Epic sadface: Username is required"
    // let xpathblankerror="h3[data-test='error']"
    // let invalidErrMsg="Epic sadface: Username and password do not match any user in this service"
   
    

  beforeAll(async () => {
        loginpage = new LoginPage()
        basepage=new BasePage()
        homepagefooter = new HomePageFooter()
     
    })

    test('Verify login Functionality with Blank Credentials', async () => {
        
       await loginpage.visit()
       await loginpage.login("","")
       const ErrMessage = await loginpage.ErrorMsg()
       console.log("Error message is : "+ErrMessage);
       expect(ErrMessage).toBe(blankErrMsg)
    }, defaultTimeout)

    test('Verify login Functionality with username & blank password', async () => {
        
        await loginpage.visit()
        await loginpage.login(name, "")
        // const ErrMsg = await page.$eval(xpathblankerror,el => el.textContent)
       // const ErrMsg = await basepage.getText(page,xpathblankerror)

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
        await loginpage.visit()
        await loginpage.login(name, password)
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

    // test('Verify navigated to facebook UI', async function(){
    //     await loginpage.visit()
    //     await loginpage.login(name, password)
    //     await homepagefooter.facebookClick()
    //     expect(facebookurl).toEqual('https://www.facebook.com/saucelabs')
        
    // }, defaultTimeout)

    // test('Verify navigated to facebook UI', async function(){
    //     await loginpage.visit()
    //     await loginpage.login(name, password)
    //     await homepagefooter.linkedinClick()
    //     expect(linkedinClick).toEqual('https://www.linkedin.com/company/sauce-labs/')
        
    // }, defaultTimeout)
   
})

/*-----------------------HomePage Header-----------------------------------------*/
describe('HomePage Header Testsuite', () => {
    
    let loginpage
    let basepage
    let homepageheader
    let homepage

    beforeAll(async () => {
        loginpage = new LoginPage()
        basepage = new BasePage()
        homepageheader = new HomePageHeader()
        homepage = new HomePage()
        console.log('beforeAll method executed')

    })

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
        await basepage.loadUrl(baseUrl)
        await page.waitForTimeout(2000)
        await loginpage.login(validLoginUsername, validLoginPassword)
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

    test('should have expected class names', async () => {
        await loginpage.visit()
        await loginpage.login(name, password)
        const expectedNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket', 'Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
        text= await homepage.expectedtnames()
    })

    test('Matching with names', async () => {
        const expectedNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket', 'Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
        await loginpage.visit()
        await loginpage.login(name, password)
        let actualNames= await homepage.expectedName()
        console.log(actualNames+" "+expectedNames);
        expect(actualNames).toEqual(expectedNames);
    })



    // test.only('should have expected class names', async () => {
    //     const expectedNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket', 'Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
    //     await loginpage.visit()
    //     await loginpage.login(name, password)
    //     const productName=".inventory_item_name"
    //     let actualNames= await basepage.matchElement(page,productName)
    //     console.log(actualNames+" "+expectedNames);
    //     expect(actualNames).toEqual(expectedNames);
    // })
    test('Match with the description', async () => {
        const expectedNames = [des1,des2,des3,des4,des5,des6];
        await loginpage.visit()
        await loginpage.login(name, password)
        let actualNames= await homepage.expectedDescription()
        console.log(actualNames+" "+expectedNames);
        expect(actualNames).toEqual(expectedNames);
    })

    test('button should be Clicked or not for single click', async() => {
        await loginpage.visit()
        await loginpage.login(name, password)
        await homepage.clickButton()
        let actualCount=await homepage.cartCount()
        expect(actualCount).toEqual(Expectedcount)
    },defaultTimeout)

    // test.only('button should be Clicked or not for multiple click', async() => {
    //     await loginpage.visit()
    //     await loginpage.login(name, password)
    //     for(let i=1;i<=n;i++){
    //         await homepage.clickButton()
    //     }
    //     await homepage.clickButton()
    //     let actualCount=await homepage.cartCount()
    //     expect(actualCount).toEqual(Expectedcount)
    // },defaultTimeout)
    test('filter otion selection', async() => {
        await loginpage.visit()
        await loginpage.login(name, password)
        Actaul=await homepage.priceFilter()

      
    },defaultTimeout)

    test.only('filter otion selection', async() => {
        await loginpage.visit()
        await loginpage.login(name, password)
       func();

      
    },defaultTimeout)


    //    let  sortedList= homepage.sortLowtohigh()
    //     let isSorted = true;
    //     for (let i = 0; i < sortedList.length - 1; i++) {
    //       if (sortedList[i] > sortedList[i + 1]) {
    //         isSorted = false;
    //         break;
    //       }
    //     }
      
        // if (isSorted) {
        //   console.log('The sorting is working fine.');
        // } else {
        //   console.log('The sorting is not working as expected.');
        // }
        // let actualCount=await homepage.cartCount()
        // expect(actualCount).toEqual(Expectedcount)
   


})
