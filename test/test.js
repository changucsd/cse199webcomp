// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });


var webdriver = require('selenium-webdriver'),
    //{describe,it,after,before} = require('selenium-webdriver/testing');
    {describe,it,before,after} = require('mocha');
    By = webdriver.By,
    until = webdriver.until;
    var driver;

    describe('app senario',function(){
      beforeEach(function(){
        driver = new webdriver.Builder().forBrowser('chrome').build();
        driver.get('https://cse-199.firebaseapp.com');
      });

      afterEach(function(){
        driver.quit();
      });

      it('successful click',function(){
        var star = driver.findElement(By.css('.star'));
        star.click();
        driver.wait(until.elementLocated(By.css('.alert-success')),300).getText().then(function(txt){
          console.log("Alert success text is:" + txt);
        });
      });

    });
