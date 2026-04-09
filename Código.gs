function importarVariosMeses() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetConfig = ss.getSheetByName("Config");
  var sheetDados = ss.getSheetByName("Obitos");

  // Lê intervalo de meses da aba Config
  // Exemplo: na coluna A = Ano, coluna B = Mês (vários meses listados)
  var range = sheetConfig.getRange("A2:C" + sheetConfig.getLastRow()).getValues();

  // Limpa a aba antes de atualizar
  sheetDados.clear();

  // Cabeçalho
  sheetDados.appendRow(["Cidade", "Total", "Ano", "Mês", "Estado"]);

  // Percorre cada linha da aba Config
  range.forEach(function(row) {
    var ano = row[0];
    var mes = row[1];
    var estado = row[2];

    if (!ano || !mes || !estado) return; // pula linhas vazias

    // 📅 Calcula primeiro e último dia do mês
    var primeiroDia = new Date(ano, mes - 1, 1);
    var ultimoDia = new Date(ano, mes, 0);

    // Converte para formato YYYY-MM-DD
    var start_date = Utilities.formatDate(primeiroDia, "GMT-3", "yyyy-MM-dd");
    var end_date = Utilities.formatDate(ultimoDia, "GMT-3", "yyyy-MM-dd");

    // 🔗 URL da API
    var url = "https://transparencia.registrocivil.org.br/api/record/death?start_date=" 
              + start_date + "&end_date=" + end_date + "&state=" + estado;

    try {
      // 📥 Chama a API
      var response = UrlFetchApp.fetch(url);
      var json = JSON.parse(response.getContentText());

      // Extrai os dados
      var dados = json.data.map(function(item) {
        return [item.name, item.total, ano, mes, estado];  // Cidade | Total | Ano | Mês | Estado
      });

      // Insere os dados abaixo
      if (dados.length > 0) {
        var lastRow = sheetDados.getLastRow();
        sheetDados.getRange(lastRow + 1, 1, dados.length, 5).setValues(dados);
      }

    } catch (e) {
      Logger.log("Erro ao buscar dados de " + mes + "/" + ano + " - " + estado + ": " + e);
    }
  
  // ⏳ PAUSA DE 1 SEGUNDO ANTES DA PRÓXIMA REQUISIÇÃO
    Utilities.sleep(1000);
  
  });

  Logger.log("Importação concluída para todos os meses listados/estados lisstados.");
}

