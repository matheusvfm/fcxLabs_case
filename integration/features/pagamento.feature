Feature: Pagamento  

  Scenario: Selecionar método de pagamento SafePay  
    Given que estou na etapa de pagamento do checkout  
    When escolho a opção "SafePay"  
    And insiro usuário e senha corretos  
    And confirmo o pagamento  
    Then a compra deve ser finalizada com sucesso  

  Scenario: Selecionar pagamento com cartão de crédito  
    Given que estou na etapa de pagamento do checkout  
    When escolho a opção "Cartão de Crédito"  
    And preencho os dados do cartão corretamente  
    And confirmo o pagamento  
    Then a compra deve ser finalizada com sucesso  

  Scenario: Salvar informações de pagamento para uso futuro  
    Given que estou na etapa de pagamento do checkout  
    When preencho os dados do cartão de crédito  
    And marco a opção "Save changes in profile for future use"  
    And finalizo a compra  
    Then minhas informações devem ser salvas para compras futuras  
