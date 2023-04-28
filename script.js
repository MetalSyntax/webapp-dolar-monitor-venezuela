const dolarToday = document.getElementById("dolar-bcv");
const monitorDolarVzla = document.getElementById("monitor-dolar-vzla");

fetch("https://venecodollar.vercel.app/api/v1/dollar")
  .then(response => response.json())
  .then(data => {
    const entities = data.Data.entities;
    entities.forEach(entity => {
        const title = entity.info.title;
        const dollar = entity.info.dollar;
        const updatedDate = entity.info.updatedDate;
        const variation = (data.Data.entities[1].info.dollar/data.Data.entities[0].info.dollar-1)*100;
      
      if (title === "BCV (Oficial)") {
        dolarToday.querySelector(".data-title").textContent = title;
        dolarToday.querySelector(".data-value").textContent = `${dollar} VES`;
        dolarToday.querySelector(".updated-date").textContent = updatedDate;
      } else if (title === "@EnParaleloVzla3") {
        monitorDolarVzla.querySelector(".data-title").textContent = title;
        monitorDolarVzla.querySelector(".data-value").textContent = `${dollar} VES`;
        monitorDolarVzla.querySelector(".updated-date").textContent = updatedDate;
        monitorDolarVzla.querySelector(".data-variation").textContent = `${Number(variation.toFixed(2))}%`;
      }
    });
})
.catch(error => console.log(error))