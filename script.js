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

function updateElement(element, data) {
  element.querySelector(".data-title").innerHTML = `<img class="img-title" src="${data.image}" alt="${data.title} Logo" style="width: 20px; margin-right: 5px;">${data.title}`;
  element.querySelector(".data-value").textContent = `${data.price.toFixed(2)} VES`;
  element.querySelector(".updated-date").textContent = data.last_update;
}

function updateVariationData(bcvPrice, monitorPrice) {
  const variation = ((monitorPrice / bcvPrice) - 1) * 100;
  const diferential = monitorPrice - bcvPrice;
  
  elements.dataVariation.textContent = `${variation.toFixed(2)}%`;
  elements.dataDiferential.textContent = `${diferential.toFixed(2)} VES`;
  elements.dataVariation.style.color = variation > 0 ? "green" : "red";
  
  console.log(`Variation: ${variation.toFixed(2)}%, Differential: ${diferential.toFixed(2)} VES`);
}

function fetchDollarData() {
  toggleDisplay(false, elements.table, elements.section);
  toggleDisplay(true, elements.spinner);

  console.log("Fetching data from API...");

  fetch("https://pydolarve.org/api/v1/dollar")
    .then(response => response.json())
    .then(data => {
      console.log("Raw API response:", data);

      if (!data.monitors || !data.monitors.bcv || !data.monitors.enparalelovzla) {
        throw new Error("Expected data structure not found in API response");
      }

      const bcv = data.monitors.bcv;
      const monitor = data.monitors.enparalelovzla;

      console.log("BCV data:", bcv);
      console.log("Monitor data:", monitor);

      updateElement(elements.dolarBCV, bcv);
      updateElement(elements.monitorDolarVzla, monitor);
      updateVariationData(bcv.price, monitor.price);

      toggleDisplay(false, elements.spinner);
      toggleDisplay(true, elements.table, elements.section);

      console.log("Data update completed successfully");
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      toggleDisplay(false, elements.spinner);
      alert("Hubo un error al obtener los datos. Por favor, intente nuevamente más tarde.");
    });
}

// Llamar a la función para obtener los datos
fetchDollarData();

// Actualizar los datos cada 5 minutos (300000 ms)
setInterval(fetchDollarData, 300000);