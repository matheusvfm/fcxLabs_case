describe('Validações do Fluxo de Checkout - Advantage Online Shopping', () => {
  beforeEach(() => {
    cy.visit('https://www.advantageonlineshopping.com/#/');
  });

  // 🔹 1. Validação da Página Inicial
  describe('Página Inicial', () => {
    it('Deve exibir os elementos principais corretamente', () => {
      cy.get('#our_products').should('be.visible'); // Seção de produtos
      cy.get('#menuCart').should('be.visible'); // Ícone do carrinho
      cy.get('#menuUser').should('be.visible'); // Ícone de login
    });
  });

  // 🔹 2. Validação do Carrinho
  describe('Carrinho de Compras', () => {
    it('Deve estar vazio inicialmente', () => {
      cy.get('#menuCart').click(); // Acessa o carrinho
      cy.get('.cartSection').should('not.exist'); // Carrinho vazio
    });

    it('Deve adicionar um produto ao carrinho', () => {
      cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
      cy.get('.fixedBtn').click();
      cy.get('#menuCart').click(); // Acessa o carrinho
      cy.get('#shoppingCart').should('be.visible');
      cy.contains('.productName', 'HP PAVILION 15Z TOUCH LAPTOP').should('be.visible');
    });
  });

  // 🔹 3. Validação da Página de Checkout
  describe('Página de Checkout', () => {
    beforeEach(() => {
      cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
      cy.get('.fixedBtn').click();
      cy.get('#menuCart').click(); // Acessa o carrinho
      cy.get('[id="checkOutButton"]').click(); // Acessa o checkout
    });

    it('Deve exibir os elementos corretamente', () => {
      cy.get('article > h3').should('be.visible').and('contain', 'ORDER PAYMENT');
    });
  });

  // 🔹 4. Validação do Formulário de Registro de Usuário
  describe('Registrar usuario no Checkout', () => {
    beforeEach(() => {
      cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
      cy.get('.fixedBtn').click();
      cy.get('#menuCart').click();
      cy.get('[id="checkOutButton"]').click(); // Acessa o checkout
      cy.get('#registration_btn').click(); // Acessa a tela de registro de Usuário
    });

    // 4.1. Validar Existência de Campos
    it('Deve exibir corretamente os campos do formulário de registro', () => {
      cy.url().should('include', '/register');
      cy.get('input[name="usernameRegisterPage"]').should('be.visible');
      cy.get('input[name="emailRegisterPage"]').should('be.visible');
      cy.get('input[name="passwordRegisterPage"]').should('be.visible');
      cy.get('input[name="confirm_passwordRegisterPage"]').should('be.visible');
      cy.get('button#register_btn').should('be.visible');
    });
  
    // 4.2. Validar Preenchimento de Campos Obrigatórios
    it('Deve exibir erro ao tentar registrar sem preencher os campos obrigatórios', () => {
      cy.get('button#register_btn').should('be.disabled');
      cy.get('.invalid').should('exist'); // Verifica se os campos obrigatórios estão marcados como inválidos
    });
    
  
    // 4.3. Criar uma Nova Conta com Sucesso
    it('Deve permitir o registro com dados válidos', () => {
      const randomUser = `user${Date.now().toString().slice(-8)}`;
      const email = `test${Date.now()}@email.com`;
      const password = 'Test@1234';
  
      cy.get('input[name="usernameRegisterPage"]').type(randomUser);
      cy.get('input[name="emailRegisterPage"]').type(email);
      cy.get('input[name="passwordRegisterPage"]').type(password);
      cy.get('input[name="confirm_passwordRegisterPage"]').type(password,  { force: true });//Foi necessário o uso do 'force: true' para ser possível o cypress preencher o campo
      cy.get('input[name="first_nameRegisterPage"]').type('Test');
      cy.get('input[name="last_nameRegisterPage"]').type('User');
      cy.get('input[name="phone_numberRegisterPage"]').type('123456789');
      cy.get('select[name="countryListboxRegisterPage"]').select('Brazil');
      cy.get('input[name="cityRegisterPage"]').type('São Paulo');
      cy.get('input[name="addressRegisterPage"]').type('Rua Teste, 123');
      cy.get('input[name="state_/_province_/_regionRegisterPage"]').type('SP', { force: true });
      cy.get('input[name="postal_codeRegisterPage"]').type('01000-000');
      cy.get('input[name="i_agree"]').check(); // Aceita os termos
      cy.get('button#register_btn').click();
      cy.get('#menuUserLink').should('contain', randomUser); // Valida login automático após registro
    });
  
    // 4.4. Erro ao Registrar com Usuário Existente
    describe('Registro de Usuário - Teste de Usuário Existente', () => {
      const existingUser = `user${Date.now().toString().slice(-8)}`;
    
      describe('Tentativa de cadastro com usuário já existente', () => {
        beforeEach(() => {
          // Criar usuário antes de tentar registrá-lo novamente    
          cy.get('input[name="usernameRegisterPage"]').type(existingUser);
          cy.get('input[name="emailRegisterPage"]').type(`${existingUser}@teste.com`);
          cy.get('input[name="passwordRegisterPage"]').type('Senha123');
          cy.get('input[name="confirm_passwordRegisterPage"]').type('Senha123', { force: true });
          cy.get('input[name="i_agree"]').check(); // Aceita os termos
          cy.get('button#register_btn').click();

          cy.wait(3000); // Aguarde a finalização do cadastro
        });
    
        it('Deve exibir erro ao tentar registrar um usuário já existente', () => {
          cy.visit('https://www.advantageonlineshopping.com/#/register');
          cy.get('input[name="usernameRegisterPage"]').type(existingUser);
          cy.get('input[name="emailRegisterPage"]').type(`${existingUser}@teste.com`);
          cy.get('input[name="passwordRegisterPage"]').type('Senha123');
          cy.get('input[name="confirm_passwordRegisterPage"]').type('Senha123', { force: true });
          cy.get('input[name="i_agree"]').check(); // Aceita os termos
          cy.get('button#register_btn').click();
    
          cy.get('#registerPage label.invalid').should('be.visible').and('contain', 'User name already exists');
        });
      });
    });
  
    // 4.5. Erro ao Inserir Senhas Diferentes
    it('Deve exibir erro ao inserir senhas diferentes', () => {
      cy.get('input[name="passwordRegisterPage"]').type('Test@1234');
      cy.get('input[name="confirm_passwordRegisterPage"]').type('Different@123', { force: true });
      cy.get('input[name="emailRegisterPage"]').click();
      cy.get('#formCover > div:nth-child(1) > div:nth-child(3) > sec-view:nth-child(2) > div > label').should('be.visible').and('contain', 'Passwords do not match'); // Indica erro no campo de senha
    });
  });

  // 🔹 5. Validação do Formulário de Login
  describe('Login no Checkout', () => {

    beforeEach(() => {
      cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
      cy.wait(8000); // Carregamento dessa tela está devadgar
      cy.get('.fixedBtn').click();
      cy.get('#menuCart').click(); // Acessa o carrinho
      cy.get('[id="checkOutButton"]').click(); // Acessa o checkout
    });

    // 5.1. Validação de Campos do Login
    it('Deve exibir os campos do formulário de login', () => {
      cy.get('input[name="usernameInOrderPayment"]').should('be.visible');
      cy.get('input[name="passwordInOrderPayment"]').should('be.visible');
      cy.get('#sign_in_btn').should('be.visible');
    });

    // 5.2. Login com credenciais não existentes
    it('Deve exibir erro ao tentar login com credenciais inválidas', () => {
      cy.get('input[name="usernameInOrderPayment"]').type('usuario_falso');
      cy.get('input[name="passwordInOrderPayment"]').type('senha_errada');
      cy.get('#sign_in_btn').click();
      cy.get('.errorMessage').should('contain', 'Incorrect user name or password');
    });

    // 5.3. Login com sucesso
    describe('Deve logar o usuario com sucesso', () => {
      const loginUser = `user${Date.now().toString().slice(-8)}`;
      beforeEach(() => {
        // Criar usuário para logar
        cy.get('#registration_btn').click(); // Acessa a tela de registro de Usuário
        cy.get('input[name="usernameRegisterPage"]').type(loginUser);
        cy.get('input[name="emailRegisterPage"]').type(`${loginUser}@teste.com`);
        cy.get('input[name="passwordRegisterPage"]').type('Senha123');
        cy.get('input[name="confirm_passwordRegisterPage"]').type('Senha123', { force: true });
        cy.get('input[name="i_agree"]').check(); // Aceita os termos
        cy.get('button#register_btn').click();
        cy.wait(3000); // Aguarde a finalização do cadastro
        cy.get('#menuUserLink').click();
        cy.get('#loginMiniTitle > label:nth-child(3)').click();
      });
      it('Deve executar o login com sucesso e permanecer no checkout', () => {
        cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
        cy.wait(8000); // Carregamento dessa tela está devadgar
        cy.get('.fixedBtn').click();
        cy.get('#menuCart').click(); // Acessa o carrinho
        cy.get('[id="checkOutButton"]').click(); // Acessa o checkout
        cy.wait(3000); // Aguarde o carregamento da tela
        cy.get('input[name="usernameInOrderPayment"]').type(loginUser);
        cy.get('input[name="passwordInOrderPayment"]').type('Senha123');
        cy.get('#login_btn').click();
        cy.wait(5000); // Aguarde a finalização do login
        cy.get('#menuUserLink').should('contain', loginUser); // Valida login com sucesso
        cy.get('body > div.uiview.ng-scope > section > article > h3').should('contain', "ORDER PAYMENT"); //validar permanência no checkout
      });
    });
  });

  // 🔹 6. Validação do Pagamento
  describe.only('Pagamento no Checkout', () => {
    const paymentUser = `user${Date.now().toString().slice(-8)}`;

    beforeEach(() => {
      cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
      cy.wait(8000); // Carregamento dessa tela está devadgar
      cy.get('.fixedBtn').click();
      cy.get('#menuCart').click(); // Acessa o carrinho
      cy.get('[id="checkOutButton"]').click(); // Acessa o checkout
      cy.get('#registration_btn').click(); // Acessa a tela de registro de Usuário
      cy.get('input[name="usernameRegisterPage"]').type(paymentUser);
      cy.get('input[name="emailRegisterPage"]').type(`${paymentUser}@teste.com`);
      cy.get('input[name="passwordRegisterPage"]').type('Senha123');
      cy.get('input[name="confirm_passwordRegisterPage"]').type('Senha123', { force: true });
      cy.get('input[name="i_agree"]').check(); // Aceita os termos
      cy.get('button#register_btn').click();
      cy.wait(3000); // Aguarde a finalização do cadastro
      cy.get('#menuUserLink').click();
      cy.get('#loginMiniTitle > label:nth-child(3)').click();
      cy.get('[id="see_offer_btn"]', { timeout: 5000 }).click();
      cy.wait(8000); // Carregamento dessa tela está devadgar
      cy.get('.fixedBtn').click();
      cy.get('#menuCart').click(); // Acessa o carrinho
      cy.get('[id="checkOutButton"]').click(); // Acessa o checkout
      cy.wait(3000); // Aguarde o carregamento da tela
      cy.get('input[name="usernameInOrderPayment"]').type(paymentUser);
      cy.get('input[name="passwordInOrderPayment"]').type('Senha123');
      cy.get('#login_btn').click();
    });

    it('Deve exibir opções de pagamento', () => {
      cy.get('#next_btn').click();
      cy.get('#paymentMethod .paymentMethods img').eq(1).should('have.attr', 'src', 'css/images/Master_credit.png');
      cy.get('#paymentMethod .paymentMethods img').eq(1).should('have.attr', 'alt', 'Master credit');
      cy.get('#paymentMethod .paymentMethods img').eq(0).should('have.attr', 'src', 'css/images/SafePay.png');
      cy.get('#paymentMethod .paymentMethods img').eq(0).should('have.attr', 'alt', 'Safepay');
    });

    it('Deve finalizar o pagamento com sucesso usando o Safepay', () => {
      cy.get('#next_btn').click();
      cy.get('input[name="safepay_username"]').type("qatest");
      cy.get('input[name="safepay_password"]').type("Qa1234");
      cy.get('[id="pay_now_btn_SAFEPAY"]').click();
      cy.get('span.roboto-regular').should('exist');
      cy.get('span.roboto-regular').should('contain', 'Thank you for buying with Advantage');
    });

    it('Deve finalizar o pagamento com sucesso usando o Mastercard', () => {
      cy.get('#next_btn').click();
      cy.get('input[name="card_number"]').type("111122223333");
      cy.get('input[name="cvv_number"]').type("123");
      cy.get('input[name="mmListbox"]').type("11");
      cy.get('input[name="yyyyListbox"]').type("2040");
      cy.get('input[name="cardholder_name"]').type("Qa Testing");
      cy.get('[name="pay_now_btn_ManualPayment"]').click();
      cy.get('span.roboto-regular').should('exist');
      cy.get('span.roboto-regular').should('contain', 'Thank you for buying with Advantage');
    });

  // Validação do botão "Back to shipping details"
  it('Deve permitir voltar para detalhes de envio', () => {
    cy.get('#next_btn').click();
    cy.get('#backToShipping').should('be.visible').and('contain', 'Back to shipping details');
    cy.get('#backToShipping').click();
    cy.get('#userSection > div:nth-child(1) > div.blueLink > a').should('be.visible')
  });

    // Faltando validações, valor dos produtos comprado, "Save changes in profile for future use", dados gerais na tela de confirmação do pedido, compra com user que já possui cartão salvo na conta.

  });
});
