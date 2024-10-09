document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o flatpickr no elemento de data
  flatpickr('#datepicker', {
      dateFormat: "Y-m-d",
      inline: true,
      disableMobile: true,
      clickOpens: false,
      locale: "pt",
      minDate: "today",
      onChange: async function (selectedDates) {
          const date = selectedDates[0];
          if (date) {
              const diaAtual = (date.getDay() + 6) % 7; // Ajusta o dia para que segunda-feira = 0
              await getDataFromAPI(diaAtual); // Chama a função para buscar a previsão
          }
      }
  });

  const attendanceInput = document.getElementById('attendance');
  const confirmButton = document.getElementById('confirmButton');
  const previewValue = document.getElementById('previewValue');

  // Verifica se o elemento 'attendance' existe antes de adicionar o listener
  if (attendanceInput) {
      attendanceInput.addEventListener('input', async function () {
          const preview = await getDataFromAPI(); // Aguarda a resposta da API
          previewValue.textContent = preview; // Atualiza o valor no elemento
      });
  }

  // Verifica se o elemento 'confirmButton' existe antes de adicionar o listener
  if (confirmButton) {
      confirmButton.addEventListener('click', function () {
          const attendance = attendanceInput ? attendanceInput.value : '';
          console.log('Número de comparecimento:', attendance);
      });
  };

  async function getDataFromAPI(diaAtual) {
      try {
          const response = await fetch(`http://localhost:5000/${diaAtual}`);
          if (!response.ok) {
              throw new Error('Erro na requisição: ' + response.status);
          }
          const data = await response.json(); // Converte a resposta para JSON
          console.log('Dados da API:', data);

          // Manipula a resposta da API
          if (data.status === "success") {
              // Atualiza os elementos com os dados da API
              previewValue.textContent = `${data.day}, Previsão: ${data.prediction}`;
          } else {
              previewValue.textContent = `${data.message}`;
          }
      } catch (error) {
          console.error('Erro ao fazer a requisição:', error);
          previewValue.textContent = "Erro ao obter dados"; // Exibe mensagem de erro
      }
  }
});
