const dolarToday = document.getElementById("dolar-today");
const monitorDolarVzla = document.getElementById("monitor-dolar-vzla");

fetch("https://venecodollar.vercel.app/api/v1/dollar")
  .then(response => response.json())
  .then(data => {
    const entities = data.Data.entities;
    entities.forEach(entity => {
        const title = entity.info.title;
        const dollar = entity.info.dollar.toFixed(2);
        const updatedDate = entity.info.updatedDate;
      
      if (title === "BCV (Oficial)") {
        dolarToday.querySelector(".data-title").textContent = title;
        dolarToday.querySelector(".data-value").textContent = `${dollar} BsF`;
        dolarToday.querySelector(".updated-date").textContent = updatedDate;
      } else if (title === "@EnParaleloVzla3") {
        monitorDolarVzla.querySelector(".data-title").textContent = title;
        monitorDolarVzla.querySelector(".data-value").textContent = `${dollar} BsF`;
        monitorDolarVzla.querySelector(".updated-date").textContent = updatedDate;
      }
    });
})
.catch(error => console.log(error))