const dolarBCV = document.getElementById("dolar-bcv");
const monitorDolarVzla = document.getElementById("monitor-dolar-vzla");
const dataVariation = document.querySelector(".data-variation");
const dataDiferential = document.querySelector(".data-diferential");
const spinner = document.getElementById("spinner");
const table = document.querySelector("table")
const section = document.querySelector("section")

table.style.display = "none";
section.style.display = "none";
spinner.style.display = "block";

fetch("https://venecodollar.vercel.app/api/v2/dollar")
  .then(response => response.json())
  .then(data => {
    const entities = data.Data.entities;
    entities.forEach(entity => {
      console.log(entity)
      const title = entity.info.title;
      const dollar = entity.info.dollar;
      const updatedDate = entity.info.updatedDate;
      const variation = (data.Data.entities[1].info.dollar/data.Data.entities[0].info.dollar-1)*100;
      const diferential = data.Data.entities[1].info.dollar-data.Data.entities[0].info.dollar;
      spinner.style.display = "none";
      table.style.display = "table"
      section.style.display = "block"
      let imageSrc = "";
      if (title === "Dólar BCV") {
        imageSrc = "images/dolar-bcv.png";
        dolarBCV.querySelector(".data-title").innerHTML = `<img class="img-title" src="${imageSrc}" alt="Banco Central de Venezuela Logo" style="width: 20px; margin-right: 5px;">${title}`;
        dolarBCV.querySelector(".data-value").textContent = `${dollar} VES`;
        dolarBCV.querySelector(".updated-date").textContent = updatedDate;
      } else if (title === "Dólar Monitor") {
        imageSrc = "images/dolar-monitor.jpeg";
        monitorDolarVzla.querySelector(".data-title").innerHTML = `<img class="img-title" src="${imageSrc}" alt="Monitor Dolar Vzla Logo" style="width: 20px; margin-right: 5px;">${title}`;
        monitorDolarVzla.querySelector(".data-value").textContent = `${Number(dollar.toFixed(2))} VES`;
        monitorDolarVzla.querySelector(".updated-date").textContent = updatedDate;
      }

      dataVariation.textContent = `${Number(variation.toFixed(2))}%`;
      dataDiferential.textContent = `${Number(diferential.toFixed(2))} VES`;

      if (variation > 0) {
        dataVariation.style.color = "green";
      } else {
        dataVariation.style.color = "red";
      }

      spinner.style.display = "none";
    });
})
.catch(error => console.log(error));