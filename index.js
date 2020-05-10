const puppeteer = require('puppeteer');
const axios = require('axios');
async function robo (siteUrl){
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(siteUrl);
  const resultado = await page.evaluate(() =>{
    let elements = Array.from(document.querySelectorAll('.m7B03'))
    let links = elements.map(element => {
        return element.innerText
    })
    return {
      confirmadosBrasil: links[3],
      recuperadosBrasil: links[4],
      confirmadosMundo: links[6],
      recuperadosMundo: links[7] 
    }
  })
  const mensagem = ` Casos confirmados no Brasil: ${resultado.confirmadosBrasil},
  Pessoas que se recuperaram no território brasilero: ${resultado.recuperadosBrasil},
  Casos confirmados no mundo: ${resultado.confirmadosMundo},
  Pessoas que ja se recuperaram no mundo: ${resultado.recuperadosMundo}.

  Para informações detalhadas, acesse https://coronavirus.saude.gov.br/
  `
  const telegramApiToken = 'your telegram api token'
  const chatId ='your telegram chat id'
  const telegramUrl = `https://api.telegram.org/bot${telegramApiToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensagem)}`

 axios.post(telegramUrl)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

await browser.close();
}

const siteUrl = `https://www.google.com/search?q=covid-19&oq=covid-19&aqs=chrome.0.69i59l3j0l2j69i60j69i61j69i60.1966j0j4&sourceid=chrome&ie=UTF-8`;

robo(siteUrl)