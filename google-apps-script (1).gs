/**
 * DM Cred — recebe os dados do formulário da landing page
 * e grava uma linha nova na planilha de leads.
 *
 * COMO INSTALAR:
 * 1. Crie uma planilha nova no Google Sheets (pode chamar de "Leads DM Cred").
 * 2. Menu Extensões > Apps Script.
 * 3. Apague o conteúdo padrão e cole este arquivo inteiro.
 * 4. Clique em "Implantar" > "Nova implantação".
 * 5. Tipo: "App da Web".
 *    - Executar como: "Eu (seu e-mail)"
 *    - Quem pode acessar: "Qualquer pessoa"
 * 6. Clique em Implantar, autorize as permissões pedidas.
 * 7. Copie a URL que o Google gerar (termina em /exec).
 * 8. Cole essa URL no lugar de COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT
 *    dentro do arquivo index.html.
 *
 * Cada envio do formulário vira uma linha na aba "Leads".
 */

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads");

  if (!sheet) {
    sheet = ss.insertSheet("Leads");
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Data/Hora",
      "Nome",
      "WhatsApp",
      "Situação",
      "CPF",
      "Valor desejado",
      "Consentimento LGPD"
    ]);
  }

  sheet.appendRow([
    new Date(),
    e.parameter.nome || "",
    e.parameter.whatsapp || "",
    e.parameter.situacao || "",
    e.parameter.cpf || "",
    e.parameter.valor || "",
    e.parameter.consentimento ? "Sim" : "Não"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
