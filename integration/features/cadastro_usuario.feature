Feature: Cadastro de Usuário  

  Scenario: Usuário se cadastra com sucesso  
    Given que estou na página de registro  
    When preencho todos os campos obrigatórios corretamente  
    And aceito os termos de uso  
    And clico no botão de cadastro  
    Then o sistema deve criar a conta e realizar o login automaticamente  

  Scenario: Erro ao cadastrar usuário já existente  
    Given que já existe um usuário cadastrado com o nome "teste123"  
    When tento me registrar com o mesmo nome de usuário  
    Then o sistema deve exibir uma mensagem de erro informando que o usuário já existe  

  Scenario: Erro ao deixar campos obrigatórios em branco  
    Given que estou na página de registro  
    When tento criar uma conta sem preencher os campos obrigatórios  
    Then o sistema deve exibir mensagens de erro indicando os campos que precisam ser preenchidos  

  Scenario: Erro ao inserir senhas diferentes  
    Given que estou na página de registro  
    When preencho os campos de senha e confirmação com valores diferentes  
    Then o sistema deve exibir uma mensagem de erro informando que as senhas não coincidem  
