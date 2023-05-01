const dolarToday = document.getElementById("dolar-bcv");
const monitorDolarVzla = document.getElementById("monitor-dolar-vzla");
const dataVariation = document.querySelector(".data-variation");
const dataDiferential = document.querySelector(".data-diferential");
const spinner = document.getElementById("spinner");
const table = document.querySelector("table")
const section = document.querySelector("section")

table.style.display = "none";
section.style.display = "none";
spinner.style.display = "block";


fetch("https://venecodollar.vercel.app/api/v1/dollar")
  .then(response => response.json())
  .then(data => {
    const entities = data.Data.entities;
    entities.forEach(entity => {
      const title = entity.info.title;
      const dollar = entity.info.dollar;
      const updatedDate = entity.info.updatedDate;
      const variation = (data.Data.entities[1].info.dollar/data.Data.entities[0].info.dollar-1)*100;
      const diferential = data.Data.entities[1].info.dollar-data.Data.entities[0].info.dollar;
      spinner.style.display = "none";
      table.style.display = "table"
      section.style.display = "block"
      let imageSrc = "";
      if (title === "BCV (Oficial)") {
        imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Banco_Central_de_Venezuela_logo.svg/100px-Banco_Central_de_Venezuela_logo.svg.png";
        dolarToday.querySelector(".data-title").innerHTML = `<img class="img-title" src="${imageSrc}" alt="Banco Central de Venezuela Logo" style="width: 20px; margin-right: 5px;">${title}`;
        dolarToday.querySelector(".data-value").textContent = `${dollar} VES`;
        dolarToday.querySelector(".updated-date").textContent = updatedDate;
      } else if (title === "@EnParaleloVzla3") {
        imageSrc = "https://yt3.googleusercontent.com/ytc/AGIKgqOHiHh4H8qdoJ0BHiGJqmF6dJ4Eye5m5FNXIl5GYQ=s900-c-k-c0x00ffffff-no-rj";
        monitorDolarVzla.querySelector(".data-title").innerHTML = `<img class="img-title" src="${imageSrc}" alt="Monitor Dolar Vzla Logo" style="width: 20px; margin-right: 5px;">${title}`;
        monitorDolarVzla.querySelector(".data-value").textContent = `${dollar} VES`;
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