Feature: Login de Usuário  

  Scenario: Login com credenciais corretas  
    Given que estou na página de login  
    When insiro um nome de usuário e senha válidos  
    And clico no botão de login  
    Then devo ser autenticado com sucesso  

  Scenario: Erro ao tentar login com credenciais inválidas  
    Given que estou na página de login  
    When insiro um nome de usuário ou senha inválidos  
    And clico no botão de login  
    Then o sistema deve exibir uma mensagem de erro informando "Usuário ou senha inválidos"  

  Scenario: Manter usuário logado  
    Given que estou logado no sistema  
    When fecho e reabro o navegador  
    Then minha sessão ainda deve estar ativa  

  Scenario: Logout do usuário  
    Given que estou logado no sistema  
    When clico no botão de logout  
    Then devo ser redirecionado para a página inicial  
    And meu login não deve mais estar ativo  
