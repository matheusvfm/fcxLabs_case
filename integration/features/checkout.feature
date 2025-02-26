Feature: Processo de Checkout  

  Scenario: Prosseguir para o checkout com produtos no carrinho  
    Given que tenho um ou mais produtos no carrinho  
    When clico no botão de "Checkout"  
    Then devo ser redirecionado para a página de finalização da compra  

  Scenario: Retornar para detalhes de envio  
    Given que estou na página de pagamento  
    When clico em "Back to shipping details"  
    Then devo ser redirecionado para a etapa anterior do checkout  

  Scenario: Exibir detalhes do pedido antes da finalização  
    Given que estou na página de confirmação do pedido  
    Then devo ver o resumo dos produtos, valores e informações de envio antes de concluir a compra  
