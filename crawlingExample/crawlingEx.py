from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import datetime
from time import sleep

options = webdriver.ChromeOptions()
options.add_argument('headless')

# executable_path에는 chromedriver 실행 파일의 경로를 넣고, chrome_options에는 options 변수를 넣습니다.
driver = webdriver.Chrome(executable_path='C:/Users/q/madcamp_week4/front/madcampWeek4/crawlingExample/chromedriver.exe', options=options)

driver.implicitly_wait(3)
driver.get('https://htmlcolorcodes.com/color-picker/')
sleep(3)

myColor = driver.find_element_by_xpath('//*[@id="js-picker"]/div[3]/div[2]/input')
driver.implicitly_wait(3)
for i in range(6): myColor.send_keys(Keys.BACKSPACE);

driver.implicitly_wait(3)
myColor.send_keys("fdd4c3")
sleep(5)

driver.implicitly_wait(3)
blank = driver.find_element_by_xpath('//*[@id="picker"]')
driver.implicitly_wait(3)
blank.click()

driver.implicitly_wait(3)
color1 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[2]/div[2]/h4[1]')
color2 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[3]/div[2]/h4[1]')
color3 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[4]/div[2]/h4[1]')
color4 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[5]/div[2]/h4[1]')
color5 = driver.find_element_by_xpath('//*[@id="harmonies"]/div[6]/div[2]/h4[1]')

driver.implicitly_wait(3)

# print("color1 " + color1.text)
# print("color2 " + color2.text)
# print("color3 " + color3.text)
# print("color4 " + color4.text)
# print("color5 " + color5.text)