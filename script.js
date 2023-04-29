const dolarToday = document.getElementById("dolar-bcv");
const monitorDolarVzla = document.getElementById("monitor-dolar-vzla");
const dataVariation = document.querySelector(".data-variation");
const dataDiferential = document.querySelector(".data-diferential");

fetch("https://venecodollar.vercel.app/api/v1/dollar")
  .then(response => response.json())
  .then(data => {
    const entities = data.Data.entities;
    entities.forEach(entity => {
        const title = entity.info.title;
        const dollar = entity.info.dollar;
        const updatedDate = entity.info.updatedDate;
        const variation = (data.Data.entities[1].info.dollar/data.Data.entities[0].info.dollar-1)*100;
        const diferential = data.Data.entities[1].info.dollar/data.Data.entities[0].info.dollar

      if (title === "BCV (Oficial)") {
        dolarToday.querySelector(".data-title").textContent = title;
        dolarToday.querySelector(".data-value").textContent = `${dollar} VES`;
        dolarToday.querySelector(".updated-date").textContent = updatedDate;
      } else if (title === "@EnParaleloVzla3") {
        monitorDolarVzla.querySelector(".data-title").textContent = title;
        monitorDolarVzla.querySelector(".data-value").textContent = `${dollar} VES`;
        monitorDolarVzla.querySelector(".updated-date").textContent = updatedDate;
      }

      dataVariation.textContent = `${Number(variation.toFixed(2))}%`;
      dataDiferential.textContent = Number(diferential.toFixed(2));

      if (variation > 0) {
        dataVariation.style.color = "green";
      } else {
        dataVariation.style.color = "red";
      }
    });
})
.catch(error => console.log(error))