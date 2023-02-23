import { baseUrl } from "../lib/config";
import BasePage from "../pages/BasePage"
let basepage=new BasePage()

const xpathUserName = '#user-name'
const xpathPassword = '#password'
const xpathLogin = '#login-button'
const xpathUsernamError= "//h3[normalize-space()='Epic sadface: Password is required']"
const xpathPasswordError="//h3[normalize-space()='Epic sadface: Username is required']"


const blankErrMsg="Epic sadface: Username is required"
const usernameerror="Epic sadface: Password is required"
const passworderror="Epic sadface: Username is required"
const xpathblankerror="h3[data-test='error']"

const selector="h3[data-test='error']"


//aaa

export default class LoginPage extends BasePage{
    async visit(){
        await page.goto(baseUrl, {"waitUntil": 'networkidle2'})
    }
    async login(username, password){
       // await page.goto(baseUrl, {"waitUntil": 'networkidle2'})
        await page.type(xpathUserName, username)
        await page.type(xpathPassword, password)
        await page.click(xpathLogin)
       // await page.waitForTimeout(5000)
    }

    async ErrorMsg(){
        let errortxt=await basepage.getText(page,selector)    
        console.log(errortxt);  
        return errortxt;
    }

}