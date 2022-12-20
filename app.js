const axios = require('axios');

// Bir dakikadaki istek sayısını ve bir çağrının yapılacağı URL'i alan rate limiter fonksiyonu
function rateLimiter(requestLimit, url) {
  // Bir dakika süresince yapılan istekleri sayısını tutacak olan sayaç değişkeni
  let requestsCounter = 0;

  // Bir dakika süresince yapılacak istekleri sınırlamak için setInterval ile bir dakika aralıklarla çağrı yapılacak
  setInterval(() => {
    requestsCounter = 0;
  }, 60000);

  return function(config) {
    // Eğer istek sayısı limitini aşıyorsa, bir dakika bekleme süresi uygulanacak
    if (requestsCounter >= requestLimit) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 60000);
      });
    }

    // Eğer istek URL'si verilen URL ile eşleşiyorsa, sayaç değişkenini arttır ve isteği yap
    if (config.url === url) {
      requestsCounter++;
      return axios(config);
    }

    // Diğer durumlarda, normal şekilde isteği yap
    return axios(config);
  };
}

// axios örneği oluşturulur ve rateLimiter fonksiyonu transformRequest içine eklenir
const axiosInstance = axios.create({
  // ... diğer konfigürasyon seçenekleri ...
  transformRequest: [
    // ... diğer transform fonksiyonları ...
    rateLimiter(5, 'http://api.example.com') // Bir dakikada 5 istek yapılabilecek URL
  ]
});

// axiosInstance ile istek yapılır
axiosInstance.get('http://api.example.com/items')
  .then((response) => {
    // İstek başarılı olduğunda yapılacak işlemler
  })
  .catch((error) => {
    // İstek başarısız olduğunda yapılacak işlemler
  });
