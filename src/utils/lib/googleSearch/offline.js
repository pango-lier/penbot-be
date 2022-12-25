'use strict';
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
let rawdata = fs.readFileSync('./config/browser.json');
let SettingBrowser = JSON.parse(rawdata);

let runsetting = fs.readFileSync('./config/run.json');
let SettingRun = JSON.parse(runsetting);
let RateRateUA = ''

class ErrorExp extends Error {
    constructor(message, code = 123213123) {
        this.errorCode = code;
        this.message = message;
        this.name = 'CUSTOM_ERROR_WITHOUT_EXIT'
    }
}

process.on('uncaughtException', function(e) {
    if (!e.errorCode) {
        process.exit(1);
    }
});
async function end(page, browser) {
    //await page.close()
    //await browser.close()
    throw new ErrorExp('NOT_FOUND');
 }
async function checkUA(page) {
    const dimensions = await page.evaluate(() => {
        return {
          width: document.documentElement.clientWidth,
        };
      });
      //console.log('Dimensions:', dimensions.width);
      if(dimensions.width < 500){
        RateRateUA = 'android'
        return RateRateUA
      }else{
        RateRateUA = 'win'
        return RateRateUA
      }

}

async function tab2_move(page, newPage, RateRateUA, Domains, browser) {
    await newPage.waitForTimeout({ waitUntil: 'networkidle0' });
    await newPage.waitForTimeout(1500)
    console.log('start tab2_move')
    const urls = await newPage.url();
    const Checkurl = urls.split('/')[2];
    const Checkurl2 = urls.split('.');
    let n = Checkurl2.length;
    const type = Checkurl2[n-1];
    console.table({
        Checkurl:Checkurl,
        Domains:Domains,
        type:type
    })
    if(type =='png'|type =='jpg' | type =='svg'){
        await newPage.close()
        throw {
            error: 'NOT_FOUND',
            message: 'Close link image',
            message_code: 1
        };
    }
    if(Checkurl != Domains){
        //console.log('erro')
        await newPage.close()
        throw {
            error: 'NOT_FOUND',
            message: 'Domain not active',
            message_code: 1
        };
    }
    let s = SettingRun.Ratescroll2;
    let numberscroll2 = Math.floor(Math.random() * s) + 1;
    let k = 0
    //console.log('Cuộn trang 2: ', numberscroll2 + 1, ' lần')
    while (numberscroll2 > k) {
        // console.log(k)
        await scrolldown2(newPage)
        k++
    }
    if(RateRateUA === 'android'){
        await newPage.mouse.move(200, 200);
        await newPage.mouse.move(30, 200);
    }else{
        await newPage.mouse.move(200, 200);
        await newPage.mouse.move(300, 30);
        await scrollup2(newPage)
        await newPage.mouse.down();
        await newPage.mouse.move(345, 100);
        await newPage.mouse.move(400, 300);
        await newPage.waitForTimeout(1000);
        await scrollup2(page)
        await newPage.mouse.move(100, 200);
        await newPage.mouse.move(355, 366);
        await newPage.mouse.up();
    }
    await scrolldown2(newPage)
    await newPage.waitForTimeout(1500);
    await scrollup2(newPage)
    await scrollup2(newPage)
    await scrollup2(newPage)
    await newPage.waitForTimeout(2000);
    if(RateRateUA === 'android'){
        await newPage.mouse.move(10, 120);
        await newPage.mouse.move(55, 166);
    }else{
        await newPage.mouse.move(10, 120);
        await newPage.mouse.move(55, 166);
        await newPage.mouse.move(RanX, RanY);
        await newPage.waitForTimeout(1000);
        await newPage.evaluate((RanX, RanY) => {
            window.scrollBy(RanX, RanY);
        });
        await newPage.waitForTimeout(1000);
    }
    await newPage.waitForTimeout(3000);
    await scrollup2(newPage)
    await scrolldown2(newPage)
}

async function scrolldown2(newPage) {
    const randtime = Math.floor(Math.random() * 3000) + 1000;
    const randtime2 = Math.floor(Math.random() * 4000) + 2000;

    await newPage.waitForTimeout(randtime);
    await newPage.evaluate(() => {
        window.scrollBy(0, 200);
    });
    await newPage.waitForTimeout(randtime2);
    await newPage.evaluate(() => {
        window.scrollBy(0, 300);
    });
}

async function scrollup2(newPage) {
    const randtime = Math.floor(Math.random() * 3000) + 1000;
    const randtime2 = Math.floor(Math.random() * 4000) + 2000;

    await newPage.waitForTimeout(randtime);
    await newPage.evaluate(() => {
        window.scrollBy(0, -300);
    });
    await newPage.waitForTimeout(randtime2);
    await newPage.evaluate(() => {
        window.scrollBy(0, -380);
    });
}

async function tab1_move(page, RateRateUA, Domains) {
    try {
        await page.waitForTimeout({ waitUntil: 'networkidle0' });
        await page.waitForTimeout(2500)
        const urls = await page.url();
        const Checkurl = urls.split('/')[2];
        const Checkurl2 = urls.split('.');
        let n = Checkurl2.length
        const type = Checkurl2[n-1]
        // console.table({
        //     Checkurl:Checkurl,
        //     Domains:Domains,
        //     type:type
        // })
        if(type =='png' | type =='jpg' | type =='svg'){
            // throw new ErrorExp('Close link image');
            throw {
                error: 'NOT_FOUND',
                message: 'Close link image',
                message_code: 2
            };
        }
        if(Checkurl != Domains && SettingRun.Click_url === false){
            //console.log('erro')
            // throw new ErrorExp('Domain not active');
            throw {
                error: 'NOT_FOUND',
                message: 'Domain not active',
                message_code: 2
            };
        }
        //console.log('start tab1_move')
        let s = SettingRun.Ratescroll2
        let numberscroll2 = Math.floor(Math.random() * s) + 1;
        let k = 0
        //console.log('Cuộn trang 2: ', numberscroll2 + 1, ' lần')
        while (numberscroll2 > k) {
            //console.log(k)
            await scrolldown(page)
            k++
        }
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('a[target="_blank"]'))
            .forEach(link => link.removeAttribute('target'))
        })
        if(RateRateUA === 'android'){
            await page.mouse.move(200, 200);
            await page.mouse.move(30, 200);
        }else{
            await page.mouse.move(200, 200);
            await page.mouse.move(300, 30);
            await scrollup(page)
            await page.mouse.down();
            await page.mouse.move(345, 100);
            await page.mouse.move(400, 300);
            await page.waitForTimeout(1000);
            await scrollup(page)
            await page.mouse.move(100, 200);
            await page.mouse.move(355, 366);
            await page.mouse.up();
        }
        await page.waitForTimeout(1500);
        await scrollup(page)
        const RanX = Math.floor(Math.random() * 100) + 300;
        const RanY = Math.floor(Math.random() * 100) + 400;
        if(RateRateUA === 'android'){
            await page.mouse.move(40, 120);
            await page.mouse.move(55, 166);
        }else{
            await page.mouse.move(40, 120);
            await page.mouse.move(55, 166);
            await page.mouse.move(RanX, RanY);
            await page.waitForTimeout(1000);
            await page.evaluate((RanX, RanY) => {
                window.scrollBy(RanX, RanY);
            });
            await page.waitForTimeout(1000);
        }
        await scrollup(page)
        await scrollup(page)
        await page.waitForTimeout(2000);
        await MoveClick(page, RateRateUA)
        await page.waitForTimeout(3000);
        await scrollup(page)
        await scrolldown(page)
    } catch (error) {
        return Promise.reject('NOT_FOUND');
    }
}

async function ClickHref(page, countClickHref, Domains, RateRateUA, browser) {
    
    try {
        await page.waitForTimeout(1500)
        if (countClickHref > 3) {
            //await ClickHrefTab2(page, Domains, browser)
            throw new ErrorExp('NOT_FOUND');
            // console.log('countClickHref 3')
            // await end(page, browser)
        }
        countClickHref = countClickHref + 1;
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('a[target="_blank"]'))
            .forEach(link => link.removeAttribute('target'))
        })
        const Pas = await page.$x(`//p/a`, { visible: true });
        const Ps = await page.$x(`//p//a`, { visible: true });
        const RanPas = Pas[Math.floor(Math.random() * Pas.length)];
        const RanPs = Ps[Math.floor(Math.random() * Ps.length)];
        await page.waitForTimeout(2500)
        let resultClick = '';
        if(RanPas){
            if(RateRateUA === 'android'){
                resultClick = await RanPas.tap({ delay: 1000 }).catch(() => 'CANT_CLICK')
            } else {
                resultClick = await RanPas.click({ delay: 1000 }).catch(() => 'CANT_CLICK')
            }
        }else if (RanPs) {
            if(RateRateUA === 'android'){
                resultClick = await RanPs.tap({ delay: 1000 }).catch(() => 'CANT_CLICK')
            } else {
                resultClick = await RanPs.click({ delay: 1000 }).catch(() => 'CANT_CLICK')
            }
        } else {
            throw new ErrorExp('NOT_FOUND LINK');
            // throw {
            //     error: 'NOT_FOUND',
            //     message: 'RanPas Link not click',
            //     message_code: 1
            // };
            // console.log('RanPas Link not click')
            // await end(page, browser)
        }

        if (resultClick == 'CANT_CLICK') {
            return page.waitForTimeout(2500).then(function() { ClickHref(page, countClickHref, Domains, RateRateUA, browser) });
        }
        // const [data, error] = await tab1_move(page, RateRateUA, Domains).then((data) => [data]).catch(() => [null, true]);
        // if (error) {
        //     // throw new ErrorExp('NOT_FOUND');
        //     throw {
        //         error: 'NOT_FOUND',
        //         message: 'tab1_move data not FOUND',
        //         message_code: 1
        //     };
        // }
        await tab1_move(page, RateRateUA, Domains)
        // return data;

    } catch (error) {
        console.log(error)
        // throw new ErrorExp('NOT_FOUND AHREF');
        // console.log(`Không thể click ${countClickHref}, Đang thử lại ...`)
        // return await ClickHref(page, countClickHref, Domains, RateRateUA, browser)
        // throw {
        //     error: 'NOT_FOUND',
        //     message: 'Click Error',
        //     message_code: 1
        // };
        // console.log('RanPas Link not click')
        // await end(page, browser)
    }
}


async function Click_url(page, countClickHref, Domains, RateRateUA, browser) {
    //console.log('Click_url')
    try {
        await page.waitForTimeout(1500)
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('a[target="_blank"]'))
            .forEach(link => link.removeAttribute('target'))
        })
        let resultClicks = '';
        const xpath_url = SettingRun.Link_url_click
        await page.waitForTimeout(2500)
        const clicks_url = await page.$(`a[href*="${xpath_url}"]`, { visible: true });
        if(clicks_url && RateRateUA === 'android'){
            resultClicks = await page.tap(`a[href*="${xpath_url}"]`, { visible: true },{ delay: 1000 }).catch(() => 'CANT_CLICK')
        }
        else if(clicks_url){
            //console.log('CLICK')
            resultClicks = await page.click(`a[href*="${xpath_url}"]`, { visible: true },{ delay: 1000 }).catch(() => 'CANT_CLICK')
        } else {
            return page.waitForTimeout(2500).then(function() { ClickHref(page, countClickHref, Domains, RateRateUA, browser) });
        }

        if (resultClicks == 'CANT_CLICK') {
            //console.log('CANT_CLICK')
            //return page.waitForTimeout(2500).then(function() { ClickHref(page, countClickHref, Domains, RateRateUA, browser) });
            await page.$$eval(`a[href="${urls}"]`, elements => elements[1].click());
            //await page.$eval(`a[href="${xpath_url}"]`, element => element.click());
            //await page.evaluate(link => document.querySelector(link).click(),xpath_url);
        }

        // const [data, error] = await tab1_move(page, RateRateUA, Domains).then((data) => [data]).catch(() => [null, true]);
        // if (error) {
        //     // throw new ErrorExp('NOT_FOUND');
        //     throw {
        //         error: 'NOT_FOUND',
        //         message: 'Data Erro tab1_move',
        //         message_code: 1
        //     };
        // }

        // return data;
        await tab1_move(page, RateRateUA, Domains)
    } catch (error) {
    //    throw new ErrorExp('ERRO CLICK URL');
        console.log(error)
    }

   
}
async function MoveClick(page, RateRateUA) {
    //console.log('start MoveClick')
    const RanX = Math.floor(Math.random() * 100) + 300;
    const RanY = Math.floor(Math.random() * 100) + 400;
    const RanXz = Math.floor(Math.random() * 70) + 50;
    const RanYz = Math.floor(Math.random() * 50) + 100;
    await page.evaluate(() => {
        Array.from(document.querySelectorAll('a[target="_blank"]'))
        .forEach(link => link.removeAttribute('target'))
    })
    if(RateRateUA === 'android'){
        await page.mouse.move(RanXz, RanYz);
        await page.waitForTimeout(2000);
        await page.mouse.move(RanYz, RanXz);
    }else{
        await page.mouse.move(RanX, RanY);
        await page.waitForTimeout(1000);
        await page.evaluate((RanX, RanY) => {
            window.scrollBy(RanX, RanY);
        });
        await page.waitForTimeout(1000);
        await page.mouse.click(RanX, RanY);
        await page.waitForTimeout(1000);
        await page.mouse.click(25, 25);
    }

    await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);
    //console.log('end MoveClick')
}

async function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function checkPortAvailable(port) {
    try {
        const { stdout, stderr } = await exec(`lsof -i:${port}`);
        if (stdout && stdout.match(/LISTEN/gmi)) {
            debug(`PORT ${port} IS BUSY`)
            return false;
        }
    } catch (e) {}

    return true;
}

async function getRandomPort() {
    let port = getRandomInt(20000, 40000);
    let port_available = checkPortAvailable(port);
    while (!port_available) {
        port = getRandomInt(20000, 40000);
        port_available = await checkPortAvailable(port);
    }
    return port;
}

async function scrolldown(page) {
    const randtime = Math.floor(Math.random() * 3000) + 1000;
    const randtime2 = Math.floor(Math.random() * 4000) + 2000;

    await page.waitForTimeout(randtime);
    await page.evaluate(() => {
        window.scrollBy(0, 200);
    });
    await page.waitForTimeout(randtime2);
    await page.evaluate(() => {
        window.scrollBy(0, 300);
    });
}

async function scrollup(page) {
    const randtime = Math.floor(Math.random() * 3000) + 1000;
    const randtime2 = Math.floor(Math.random() * 4000) + 2000;

    await page.waitForTimeout(randtime);
    await page.evaluate(() => {
        window.scrollBy(0, -300);
    });
    await page.waitForTimeout(randtime2);
    await page.evaluate(() => {
        window.scrollBy(0, -380);
    });
}


async function foundOtherPage(page, Domains, RateClick, countPageNotFound, RateRateUA) {
    const SearchNext = 'a[id="pnnext"]';
    const SearchMore = 'a.T7sFge.VknLRd.CqmPRe';

    const randtime = Math.floor(Math.random() * 3000) + 1000;
    const randtime2 = Math.floor(Math.random() * 4000) + 2000;

    try {
        if (countPageNotFound > SettingRun.NumbPage | RateClick === 'false') {
            throw {
                error: 'NOT_FOUND',
                message: 'Qua gioi han google pagination ' + countPageNotFound,
                message_code: 1
            }
        }
        countPageNotFound = countPageNotFound + 1;
        await page.waitForTimeout(randtime);
        await page.evaluate(() => {
            window.scrollBy(0, 200);
        });
        const Checknext = await page.$(SearchNext);
        const Checkmore = await page.$(SearchMore);//a.T7sFge.VknLRd.CqmPRe
        if(Checknext){
            const e = await page.click(SearchNext, { waitUntil: 'networkidle0', timeout: 5000 }).catch((res) => 0);
            if (e == 0) {
                throw {
                    error: 'NOT_FOUND',
                    message: 'Khong tim thay google pagination PC',
                    message_code: 2
                };
            }
        }
        if(Checkmore){
            const e = await page.tap(SearchMore, { waitUntil: 'networkidle0', timeout: 5000 }).catch((res) => 0);
            if (e == 0) {
                throw {
                    error: 'NOT_FOUND',
                    message: 'Khong tim thay google pagination Mobile',
                    message_code: 2
                };
            }
        }
        await page.waitForTimeout(1000);
        await page.waitForTimeout(randtime2);
        await page.evaluate(() => {
            window.scrollBy(0, 100);
        });
        await page.waitForTimeout(randtime2);
        await page.evaluate(() => {
            window.scrollBy(0, 400);
        });
        const CheckDomain = await page.$(`a[href*="${Domains}"]`, { visible: true });
        await page.waitForTimeout(1000);
        await page.waitForTimeout(randtime2);
        await page.evaluate(() => {
            window.scrollBy(0, -100);
        });
        await page.waitForTimeout(randtime2);
        await page.evaluate(() => {
            window.scrollBy(0, -100);
        });
        if (CheckDomain && RateClick == 'true') {
           if(RateRateUA != 'android'){
                await page.click(`a[href*="${Domains}"]`, { waitUntil: 'networkidle0', delay: 1000 })
            } else {
                await page.tap(`a[href*="${Domains}"]`, { waitUntil: 'networkidle0', delay: 1000 })
            }
           
        } else {
            return await foundOtherPage(page, Domains, RateClick, countPageNotFound, RateRateUA)
        }

    } catch (e) {
        throw e;
    }


}
// let indextraffic = 0
// let indexProfiles = 0

let Results = 'false'

async function run(txt, proxyInfo, called, proxyInfos) {
    let r = (SettingRun.RateClick / 100)
    const RateClick = Math.random() > r ? 'false' : 'true';
    let q = (SettingRun.RanClick / 100)
    const ranClick = Math.random() > q ? 'false' : 'true';

    const remote_debugging_port = await getRandomPort();
    const d = new Date();
    const IpProxy = proxyInfo.split(':')[0];
    const ports = proxyInfo.split(':')[1];

    const textTraficSearh = fs.readdirSync('./keywork')
    let TraficSearh = textTraficSearh[Math.floor(Math.random() * textTraficSearh.length)]
    const DataSearh = fs.readFileSync('./keywork/' + TraficSearh, { encoding: 'utf-8' });
    const Domains = DataSearh.split('|')[0];
    const Keywors = DataSearh.split('|')[1];
    const countclick = DataSearh.split('|')[2];
    // console.log(textTraficSearh, TraficSearh)
    console.table({
        Domains: Domains,
        Keywors: Keywors,
        Click: RateClick,
        Xproxy: proxyInfos.ip,
        proxy: IpProxy,
        countclick: countclick
    })
    try {
        const Profiles = fs.readdirSync(SettingRun.ProfileDir)
        let profile = Profiles[Math.floor(Math.random() * Profiles.length)]
        const p = [-6, -4, -2, 0, 2, 4, 6, 8]
        let poision = p[Math.floor(Math.random() * p.length)] * 100;
        const ps = [0, 1, 2, 3, 4, 5, 6]
        let poision2 = ps[Math.floor(Math.random() * ps.length)] * 100;
    
        const activeextension1 = require('path').join(__dirname, '..', 'gologin/extensions/chrome-extensions/aapbdbdomjkkjkaonfhkkikfgjllcleb')
        const activeextension2 = require('path').join(__dirname, '..', 'gologin/extensions/chrome-extensions/cfohepagpmnodfdmjliccbbigdkfcgia')
        const activeextension3 = require('path').join(__dirname, '..', 'gologin/extensions/chrome-extensions/nddmmcpmdbkooddfjcohmlcfclhllgeh')
        const hr_rules = `"MAP * 0.0.0.0 , EXCLUDE ${IpProxy}:${ports}"`;
        const extension = `${SettingRun.ProfileDir}/${profile}/extensions/gologin`
        const browser = await puppeteer.launch({
            ...SettingBrowser,
            args: [
                ...SettingBrowser.args,
                `--disable-extensions-except=${activeextension1},${activeextension2},${activeextension3}`,
                `--load-extension=${activeextension1},${activeextension2},${activeextension3}`,
                `--proxy-server=${IpProxy}:${ports}`,
                `--remote-debugging-port=${remote_debugging_port}`,
                `--user-data-dir=${SettingRun.ProfileDir}/${profile}`,
                `--window-position=${poision},${poision2}`,
                `--host-resolver-rules=${hr_rules}`
            ],
    
        });
        const CooKies = fs.readdirSync(SettingRun.Cookiefilepath)
        let CooKi = CooKies[Math.floor(Math.random() * CooKies.length)]
            // Bắt đầu chạy
        const currPath = `${SettingRun.ProfileDir}\\${profile}\\Default\\Cache\\Cache_Data`
        const currPath2 = `${SettingRun.ProfileDir}\\${profile}\\GrShaderCache`
        const currPath3 = `${SettingRun.ProfileDir}\\${profile}\\WidevineCdm`
        const currPath4 = `${SettingRun.ProfileDir}\\${profile}\\OnDeviceHeadSuggestModel`

        try {
            await fs.rmSync(CachePath0, { recursive: true });
            await fs.rmSync(CachePath, { recursive: true });
            await fs.rmSync(CachePath2, { recursive: true });
            await fs.rmSync(CachePath3, { recursive: true });
            console.log(`Cache is deleted!`);
        } catch (err) {
            console.error(`Error deleting Cache.`);
        }
        try {
            const randtime = Math.floor(Math.random() * 3000) + 1000;
            const randtime2 = Math.floor(Math.random() * 4000) + 2000;
            const Search = 'input[name="q"]';
            const page = await browser.newPage();
            await page.waitForTimeout(5000);
            await page.goto('https://www.google.com.vn', { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(60000);
            await checkUA(page)
            await page.waitForSelector(Search);
            await page.focus(Search,{delay:400});
            await page.keyboard.type(Keywors, {delay:300});
            await page.waitForTimeout(700);
            await page.keyboard.press('Enter');
            await page.waitForTimeout({ waitUntil: 'networkidle0' });
            await page.waitForTimeout(1000);
            await scrolldown(page)
            await scrolldown(page)
            await scrolldown(page)
            await scrollup(page)
            let countPageNotFound = 1
            const CheckDomain = await page.$(`a[href*="${Domains}"]`, { visible: true });
            if (CheckDomain && RateClick === 'true') {
                if(RateRateUA === 'android'){
                    await page.tap(`a[href*="${Domains}"]`, { delay: 500 })
                }else{
                    await page.click(`a[href*="${Domains}"]`, { delay: 500 })
                }
            } else {
                await foundOtherPage(page, Domains, RateClick, countPageNotFound, RateRateUA)
            }
            const Results = "true"
            let b = DataSearh.split('|')[2];
            let filekey = './keywork/' + TraficSearh;
            if (Results === 'true') {
                fs.writeFile(filekey, `${Domains}|${Keywors}|${b - 1}`, function(err) {
                    if (err) throw err;
                });
            }
            if (b < 0) {
                let filekeys = require('path').join(__dirname, '..', filekey);
                fs.unlink(filekeys, (err => {
                    if (err) console.log(err);
                    else {
                        console.log(process.env.NODE_ENV,': Hoàn thành từ khóa số lượt chạy từ khóa: ', Keywors);
                    }
                }));
            }
            await page.waitForTimeout(randtime);
            await page.evaluate(() => {
                Array.from(document.querySelectorAll('a[target="_blank"]'))
                .forEach(link => link.removeAttribute('target'))
            })
            await page.waitForTimeout(999);
            let ss = SettingRun.Ratescroll
            if (ss < 1) {
                if (SettingRun.SaveCookie === true) {
                    const scookies = await page.cookies()
                    const scookieJson = JSON.stringify(scookies)
                    fs.writeFileSync(`${SettingRun.SaveCookieDir}/` + Domains + '_' + d.getDate() + d.getHours() + d.getMinutes() + '.json', scookieJson)
                    await page.waitForTimeout(1000);
                    console.log(process.env.NODE_ENV,': Lưu cookie Thành Công !!', 'Thời gian:', d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
                }
                throw {
                    error: 'NOT_FOUND',
                    message: 'Không thể thực hiện hành động Lăn chuột',
                    message_code: 2
                };
            }
            let numberscroll = Math.floor(Math.random() * ss) + 3;
            let i = 0
            //console.log('Cuộn trang: ', numberscroll + 1, ' lần')
            while (numberscroll > i) {
                await scrolldown(page)
                i++
            }
           
            await scrollup(page)
            
            const tapX = 125
            const tapY = 175
            await page.mouse.move(tapX, tapY);
            await page.mouse.move(tapY, tapX);
            if(RateRateUA === 'android'){
                await page.waitForTimeout(randtime);
                //console.log('nes')
                await page.mouse.move(tapY, tapX);
                await page.mouse.move(tapX, tapY);
            }else{
                //console.log('nesss')
                await page.mouse.down();
                await page.mouse.move(345, 300);
                await page.mouse.move(400, 300);
                await page.waitForTimeout(randtime);
                await page.mouse.move(300, 200);
                await page.mouse.move(355, 366);
                await page.mouse.up();
            }
    
            await page.waitForTimeout(randtime);
            if (SettingRun.Ratescroll > 0) {
                await scrollup(page)
                await MoveClick(page, RateRateUA)
                await scrollup(page)
                await scrolldown(page)
            }
            await page.evaluate(() => {
                Array.from(document.querySelectorAll('a[target="_blank"]'))
                .forEach(link => link.removeAttribute('target'))
            })
            await page.waitForTimeout(randtime2);
            if (ranClick === 'true' && SettingRun.Click_url === false) {
                //console.log('newww ClickHref')
                let countClickHref = 1
                const [resultClick, errorresultClick] = await ClickHref(page, countClickHref, Domains, RateRateUA, browser).then((data) => ([data])).catch(() => [null, true]);
                if (errorresultClick) {
                    // throw new ErrorExp('NOT_FOUND');
                    throw {
                        error: 'NOT_FOUND',
                        message: 'errorresultClick ClickHref',
                        message_code: 2
                    };
                }
    
            }
            if (ranClick === 'true' && SettingRun.Click_url === true) {
                //console.log('newww ClickHref')
                let countClickHref = 1
                const [resultClick, errorresultClick] =  await Click_url(page, countClickHref, Domains, RateRateUA, browser).then((data) => ([data])).catch(() => [null, true]);
                if (errorresultClick) {
                    // throw new ErrorExp('NOT_FOUND');
                    throw {
                        error: 'NOT_FOUND',
                        message: 'errorresultClick Click_url',
                        message_code: 2
                    };
                }
            }
    
            await delay(1000)
            await page.waitForTimeout(randtime);
            await MoveClick(page, RateRateUA)
            await scrollup(page)
            await scrollup(page)
            await scrollup(page)
            await scrolldown(page)
            await page.evaluate(() => {
                Array.from(document.querySelectorAll('a[target="_blank"]'))
                .forEach(link => link.removeAttribute('target'))
            })
    
            if(RateRateUA === 'android'){
                await page.mouse.move(124, 52);
                
                await scrolldown(page)
                await page.mouse.move(45, 152);
            }else{
                await page.mouse.down();
                await page.mouse.move(145, 300);
                await page.mouse.move(100, 300);
                await page.waitForTimeout(randtime);
                await page.mouse.move(300, 62);
                await page.mouse.move(155, 366);
                await page.mouse.up();
            }
    
            await page.waitForTimeout(randtime);
            await page.evaluate(() => {
                Array.from(document.querySelectorAll('a[target="_blank"]'))
                .forEach(link => link.removeAttribute('target'))
            })
            await MoveClick(page, RateRateUA)
            if (SettingRun.Ratescroll > 0) {
                await scrollup(page)
                await page.waitForTimeout(randtime);
                await scrolldown(page)
                await scrolldown(page)
                await scrollup(page)
            }
    
            await delay(1000)
            if (SettingRun.SaveCookie === true) {
                const scookies = await page.cookies()
                const scookieJson = JSON.stringify(scookies)
                fs.writeFileSync(`${SettingRun.SaveCookieDir}/` + Domains + '_' + d.getDate() + d.getHours() + d.getMinutes() + '.json', scookieJson)
                await page.waitForTimeout(1000);
                console.log(process.env.NODE_ENV,': Lưu cookie Thành Công !!', 'Thời gian:', d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
            }
    
            await page.close();
            await browser.close();
            console.log(process.env.NODE_ENV,': Quá trình tăng traffic Thành Công !!!', 'Thời gian:', d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
            const log = {
                serverName: process.env.NODE_ENV,
                date: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes(),
                Domains: Domains,
                RateUA: "null",
                Keywors: Keywors,
                RateClick: RateClick,
                Result: Results,
                Addcookies: CooKi,
                SaveCookie: SettingRun.SaveCookieDir + '/' + Domains + '_' + d.getDate() + d.getHours() + d.getMinutes() + '.json',
            }
            await delay(1000)
            try {
                await fs.rmSync(currPath, { recursive: true });
                await fs.rmSync(currPath2, { recursive: true });
                await fs.rmSync(currPath3, { recursive: true });
                await fs.rmSync(currPath4, { recursive: true });
                console.log(process.env.NODE_ENV,` Cache is deleted!`);
            } catch (err) {
                console.error(process.env.NODE_ENV,` Error deleting Cache.`);
            }
            return { log };
        } catch (error) {
            console.log(process.env.NODE_ENV,' Lỗi:',error,' Tắt trình duyệt !!!', 'Thời gian:', d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())
            await browser.close();
            await delay(200)
                //false
            const log = {
                serverName: process.env.NODE_ENV,
                date: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes(),
                Domains: Domains,
                RateUA: "null",
                Keywors: Keywors,
                RateClick: RateClick,
                Result: Results,
                Addcookies: CooKi,
                SaveCookie: "null"
            }
            try {
                await fs.rmSync(currPath, { recursive: true });
                await fs.rmSync(currPath2, { recursive: true });
                await fs.rmSync(currPath3, { recursive: true });
                await fs.rmSync(currPath4, { recursive: true });
                console.log(process.env.NODE_ENV, ` Cache is deleted!`);
            } catch (err) {
                console.error(process.env.NODE_ENV, ` Error deleting Cache.`);
            }
            return { log };
        }
    } catch (error) {
        console.log(error);
        return run()
    }
   

};

module.exports = run;