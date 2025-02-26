Feature: Histórico de Pedidos  

  Scenario: Visualizar histórico de compras  
    Given que estou logado no sistema  
    When acesso a página de "Meus pedidos"  
    Then devo ver uma lista dos pedidos realizados anteriormente  

  Scenario: Visualizar detalhes de um pedido específico  
    Given que estou na página de "Meus pedidos"  
    When clico em um pedido específico  
    Then devo ver os detalhes completos da compra, incluindo produtos, valor total e método de pagamento  
