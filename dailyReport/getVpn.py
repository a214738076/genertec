from bs4 import BeautifulSoup
from urllib.request import urlopen

#import requests
# url = "http://mrtg.genertec.com.cn/data2/"
# res = requests.get(url)
# res.encoding = res.apparent_encoding
# html = res.text
# print(html)
# print(res.encoding)
# print(res.apparent_encoding)

url = 'http://mrtg.genertec.com.cn/data2/'

def getAllUrl():
    allUrls = []
    html = urlopen(url)
    soup = BeautifulSoup(html.read(), 'html.parser', from_encoding='gb2312')

    for idx, t in enumerate(soup.find_all('a')):
        if idx > 18:
            break;
        allUrl = url + t.get('href')
        allUrls.append(allUrl)

    return allUrls

def getVpnDetail(url, index):
    index = int(index)
    ret = []
    html = urlopen(url)
    soup = BeautifulSoup(html.read(), 'html.parser', from_encoding='gb2312')

    title = soup.find('h1').get_text()           #机房
    updatetime = soup.find('strong').get_text()  #最后统计更新时间
    img = 'http://mrtg.genertec.com.cn/data2/' + soup.find('img').get('src')            #图片地址

    ret.append(index + 1)
    ret.append(title)
    ret.append(updatetime)
    ret.append(img)

    tables = soup.findAll('table')
    tab = tables[1]
    for tr in tab.findAll('tr'):
        for td in tr.findAll('td'):
            ret.append(td.getText().split(" ")[0])

    return ret

# a = getAllUrl()
# ret = getVpnDetail(a[0], 0)
# print(ret)


# for t in soup.find_all('a'):
#     print('t的值是:', t)
#     print('t的类型是:', type(t))
#     print('a标签中的href属性是：', t.get('href'))



# for idx, tr in enumerate(soup.find_all('tr')):
#     print(idx)
#     if idx > 9:
#         break
#     tds = tr.find_all('td')
#     print (tds)
