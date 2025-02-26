Feature: Carrinho de Compras  

  Scenario: Adicionar um produto ao carrinho  
    Given que estou na página inicial do e-commerce  
    When adiciono um produto ao carrinho  
    Then o produto deve ser exibido no carrinho com a quantidade correta  

  Scenario: Remover um produto do carrinho  
    Given que tenho um produto no carrinho  
    When removo o produto  
    Then o carrinho deve ficar vazio  

  Scenario: Alterar a quantidade de um produto no carrinho  
    Given que tenho um produto no carrinho  
    When aumento a quantidade do produto para 3 unidades  
    Then o total do pedido deve ser atualizado corretamente  

  Scenario: Continuar comprando após adicionar produto ao carrinho  
    Given que estou adicionando um produto ao carrinho  
    When clico em "Continuar comprando"  
    Then devo permanecer na página de produtos sem ser redirecionado para o checkout  
