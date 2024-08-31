const elements = {
  dolarBCV: document.getElementById("dolar-bcv"),
  monitorDolarVzla: document.getElementById("monitor-dolar-vzla"),
  dataVariation: document.querySelector(".data-variation"),
  dataDiferential: document.querySelector(".data-diferential"),
  spinner: document.getElementById("spinner"),
  table: document.querySelector("table"),
  section: document.querySelector("section")
};

function toggleDisplay(show, ...elements) {
  elements.forEach(el => el.style.display = show ? (el.tagName === 'TABLE' ? 'table' : 'block') : 'none');
}

function updateElement(element, title, dollar, updatedDate, imageSrc) {
  element.querySelector(".data-title").innerHTML = `<img class="img-title" src="${imageSrc}" alt="${title} Logo" style="width: 20px; margin-right: 5px;">${title}`;
  element.querySelector(".data-value").textContent = `${Number(dollar.toFixed(2))} VES`;
  element.querySelector(".updated-date").textContent = updatedDate;
}

function updateVariationData(variation, diferential) {
  elements.dataVariation.textContent = `${Number(variation.toFixed(2))}%`;
  elements.dataDiferential.textContent = `${Number(diferential.toFixed(2))} VES`;
  elements.dataVariation.style.color = variation > 0 ? "green" : "red";
}

toggleDisplay(false, elements.table, elements.section);
toggleDisplay(true, elements.spinner);

fetch("https://venecodollar.vercel.app/api/v2/dollar")
  .then(response => response.json())
  .then(data => {
    const entities = data.Data.entities;
    const [bcv, _, monitor] = entities;
    
    const variation = (bcv.info.dollar / monitor.info.dollar - 1) * 100;
    const diferential = bcv.info.dollar - monitor.info.dollar;

    updateElement(elements.dolarBCV, "Dólar BCV", bcv.info.dollar, bcv.info.updatedDate, "images/dolar-bcv.png");
    updateElement(elements.monitorDolarVzla, "Dólar Monitor", monitor.info.dollar, monitor.info.updatedDate, "images/dolar-monitor.jpeg");
    updateVariationData(variation, diferential);

    toggleDisplay(false, elements.spinner);
    toggleDisplay(true, elements.table, elements.section);
  })
  .catch(error => console.error("Error fetching data:", error));