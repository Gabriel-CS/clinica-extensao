document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um ouvinte de eventos que será executado quando o DOM estiver completamente carregado

  flatpickr('#datepicker', {
    // Inicializa o flatpickr no campo de entrada com id 'datepicker'
    dateFormat: "Y-m-d", // Define o formato da data
    inline: true, // Exibe o calendário inline (não como um popup)
    disableMobile: true, // Desativa a versão móvel do seletor de datas
    clickOpens: false, // Desativa a abertura automática do calendário ao clicar no campo de entrada
    locale: 'pt' // Define a localidade para português
  });

  document.getElementById('attendance').addEventListener('input', function () {
    // Adiciona um ouvinte de eventos que será executado sempre que o valor do campo de entrada mudar
    const attendance = this.value; // Obtém o valor atual do campo de entrada
    const preview = calculatePreview(attendance); // Calcula a previsão com base no valor inserido
    document.getElementById('previewValue').textContent = preview; // Atualiza o conteúdo do elemento com id 'previewValue' com o valor da previsão
  });

  document.getElementById('confirmButton').addEventListener('click', function () {
    // Adiciona um ouvinte de eventos que será executado quando o botão for clicado
    const attendance = document.getElementById('attendance').value; // Obtém o valor atual do campo de entrada
    console.log('Número de comparecimento:', attendance); // Exibe o valor no console
  });

  function calculatePreview(attendance) {
    // Função que calcula a previsão baseada no valor de comparecimento
    return attendance ? Math.min(100, Math.max(0, parseInt(attendance, 10))) : 0;
    // Retorna o valor ajustado entre 0 e 100, ou 0 se o valor estiver vazio
  }
});
