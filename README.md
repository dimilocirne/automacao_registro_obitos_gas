## Automação de Extração de Dados: Portal da Transparência (Registro Civil) 🚀

Este projeto automatiza a coleta de dados de óbitos diretamente da API do Portal da Transparência do Registro Civil para o Google Sheets, utilizando **Google Apps Script**.

### 📌 Objetivo
Eliminar o processo manual de consulta, filtragem e exportação de dados mensais por estado, permitindo que analistas foquem na interpretação dos dados e não na coleta exaustiva.

### 🛠️ Tecnologias Utilizadas
* **Google Apps Script**: Motor de execução da automação.
* **JavaScript (ES6+)**: Linguagem base do script.
* **API REST**: Integração com o endpoint do Registro Civil.
* **JSON**: Manipulação e tratamento dos dados recebidos.

### 🚀 Funcionalidades
- **Configuração Dinâmica**: O usuário define Ano, Mês e Estado em uma aba de "Config" e o script processa a lista automaticamente.
- **Tratamento de Datas**: Cálculo automático do primeiro e último dia de cada mês informado.
- **Eficiência Ética**: Implementação de `Utilities.sleep()` para respeitar os limites do servidor de origem (Rate Limiting).
- **Limpeza Automática**: Garante que a base de dados esteja sempre atualizada e sem duplicatas a cada execução.

### 📋 Como Utilizar

1. **Estrutura da Planilha**:
   - Crie uma aba chamada `Config` com as colunas: `Ano` (A), `Mês` (B) e `Estado` (C).
   - Crie uma aba chamada `Obitos` (onde os dados serão inseridos).
2. **Instalação**:
   - No Google Sheets, vá em `Extensões` > `Apps Script`.
   - Copie e cole o código contido em `codigo.gs` deste repositório.
3. **Execução**:
   - Salve o projeto e execute a função `importarVariosMeses`.
   - Conceda as permissões de acesso ao Google Sheets e ao serviço externo (UrlFetch).

### 📌 Diferencial Técnico: Engenharia Reversa
Diferente de um Web Scraping convencional (que lê o HTML da página), este projeto utiliza o consumo direto da API "invisível" do portal.

* Através da análise de tráfego de rede (Network Inspection), identifiquei o endpoint JSON utilizado pelo próprio site.

* Isso garante uma extração muito mais estável, rápida e leve, sem depender do layout visual do portal.


### ⚠️ Boas Práticas e Limites
- O script possui uma pausa de 1 segundo entre as requisições para evitar sobrecarga no servidor da API.
- Lembre-se que o Google Apps Script possui um limite de execução de 6 minutos por rodada para contas gratuitas.

---
Desenvolvido por Dimilo Cirne.
* https://www.linkedin.com/in/dimilo-cirne-data-analytics/ | https://github.com/dimilocirne
