import { baseUrl } from "../lib/config";
import BasePage from "../pages/BasePage"
let basepage=new BasePage()
import {option}from "../lib/config";
const inventoryItem='.inventory_item'
const productName=".inventory_item_name"
const productDescription='.inventory_item_desc'
const productprice='.inventory_item_price'
const button='.btn_inventory'
//const productDescriptioon='.inventory_item_desc'

const buttonFirst="#add-to-cart-sauce-labs-bolt-t-shirt"
const cartcount=".shopping_cart_badge"

const priceFiltericon='.product_sort_container'


export default class HomePage extends BasePage{

    async numberOfProduct(){
    await page.waitForSelector(inventoryItem)
    let countOfproduct = await basepage.getCount(page,inventoryItem)
    return countOfproduct
    }

    async nameOfProduct(){
        await page.waitForSelector(productName)
        const targetEls = await page.$$(productName);
            for(let target of targetEls){
              const nameOfProducts = await page.evaluate(el => el.textContent, target); 
              console.log(nameOfProducts)
            }
        }

        async productDesciption(){
            await page.waitForSelector(productDescription)
            const targetEls = await page.$$(productDescription);
                for(let target of targetEls){
                  const nameOfProducts = await page.evaluate(el => el.textContent, target); 
                  console.log(nameOfProducts)
                }
            }

            async productPrice(){
                await page.waitForSelector(productprice)
                const targetEls = await page.$$(productprice);
                    for(let target of targetEls){
                      const nameOfProducts = await page.evaluate(el => el.textContent, target); 
                      console.log(nameOfProducts)
                    }
                }

                async productbutton(){
                    await page.waitForSelector(button)
                    const targetEls = await page.$$(button);
                        for(let target of targetEls){
                          const nameOfProducts = await page.evaluate(el => el.textContent, target); 
                          console.log(nameOfProducts)
                        }
                    }


                    async expectedName(){
                            actualNames=await matchElement(page,productName)
                            return actualNames   
                         }
                    async expectedDescription(){
                        actualDes=await matchElement(page,productDescription)
                        return actualDes   
                    }

                    async clickButton(){
                        await page.waitForSelector(buttonFirst)
                        await page.click(buttonFirst)
                    }

                    async cartCount(){
                        await page.waitForSelector(cartcount)
                       let text =await basepage.getCount(cartcount)
                       return text
                    }

                    async priceFilter(){
                        await page.waitForSelector(priceFiltericon)
                        await page.click(priceFiltericon)
                        await page.select(priceFiltericon,option)
                        await page.waitForTimeout(5000)
                      sortedPrices =  await basepage.matchElement(page, productprice)
                      return sortedPrices
                    }

                    // async sortLowtohigh(){
                    //     const sortedList = await page.evaluate(() => {
                    //         const itemList = document.querySelectorAll('.inventory_item_price');
                    //         const sortedItems = Array.from(itemList).map((item) => item.textContent);
                    //         return sortedItems;
                    // }

                    // async sortArrayLowToHigh(){
                    //     var arr=[], brr=[]
                    //     const element=await page.$$('.inventory_item_name')
                    //     const n=await page.evaluate('.inventory_item_name', element => {element.length});
                    //     for(let i=0; i<n; i++){
                    //    if(arr[i]>arr[i+1]){
                    //     b[i]=
                    //    } 
                    //     }
                    // }

                    async func() {
     
                        // Original string
                        var arr = ["Geeks", "for", "Geeks"]
                     
                        console.log(arr);
                        // Sorting the array
                        console.log(arr.sort());
                    }

}