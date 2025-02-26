Feature: Gerenciamento de Perfil  

  Scenario: Atualizar dados do perfil  
    Given que estou logado e na página do meu perfil  
    When altero meu endereço e salvo as mudanças  
    Then o sistema deve exibir uma mensagem de sucesso  
    And minhas novas informações devem ser exibidas corretamente  

  Scenario: Alterar senha com sucesso  
    Given que estou na página de configurações do perfil  
    When altero minha senha para uma nova válida  
    Then devo conseguir fazer login com a nova senha  

  Scenario: Erro ao tentar alterar senha com senha atual incorreta  
    Given que estou na página de configurações do perfil  
    When insiro uma senha atual incorreta e tento alterá-la  
    Then o sistema deve exibir uma mensagem de erro informando que a senha está incorreta  
