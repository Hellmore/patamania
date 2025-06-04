describe('Testes de Integração - Cadastro de Usuário', () => {
  //arrange
  const baseUrlBackend = 'http://localhost:3001'; 

  const emailUnico = `briena+${Date.now()}@teste.com`;

  it.only('TC13 - cadastro válido cria usuário e mostra confirmação', () => {
    //act
    cy.visit('/');
    cy.get('.Navbar_profile__T6ZEC').click();
    cy.url().should('include', '/login');
    cy.get('a[data-discover="true"] > button').click();
    cy.get('input#formCadastroNome').type('NomeTeste');
    cy.get('input#formCadastroEmail').type(emailUnico);
    cy.get('input#birth').type('2002-11-01');
    cy.get('input#formCadastroSenha').type('senhaForte123');
    cy.get('input#formCadastrarConfirmSenha').type('senhaForte123');

    cy.get('form').submit();
    //assert 
    cy.url().should('include', '');

    // Verifica o back, se o user foi criado
    cy.request('GET', `${baseUrlBackend}/usuarios/email/${emailUnico}`)
      .its('body')
      .should('have.property', 'usuario_email', emailUnico);
  });

  it('Cadastro com e-mail duplicado mostra erro no frontend e não cria novo', () => {
    cy.request('POST', `${baseUrlBackend}/usuarios/cadastrar`, {
      usuario_nome: 'Briena',
      usuario_email: emailUnico,
      usuario_dataNascimento: '2002-11-01',
      usuario_senha: 'senhaForte123'
    });

    cy.visit('/');

    cy.get('.Navbar_profile__T6ZEC').type('Briena');
    cy.get('input[name="usuario_email"]').type(emailUnico);
    cy.get('input[name="usuario_dataNascimento"]').type('2002-11-01');
    cy.get('input[name="usuario_senha"]').type('senhaOutra123');

    cy.get('form').submit();

    cy.contains(/email já cadastrado/i).should('be.visible');

    cy.request('GET', `${baseUrlBackend}/usuarios/email/${emailUnico}`)
      .its('body')
      .then(user => {
        expect(user.usuario_nome).to.equal('Briena');
      });
  });

  it('3. Cadastro com e-mail inválido bloqueia envio e mostra erro na interface', () => {
    cy.visit('/');

    cy.get('.Navbar_profile__T6ZEC').type('Briena');
    cy.get('input[name="usuario_email"]').type('email-invalido');
    cy.get('input[name="usuario_dataNascimento"]').type('2002-11-01');
    cy.get('input[name="usuario_senha"]').type('senhaForte123');

    cy.get('form').submit();

    cy.contains(/e-mail inválido/i).should('be.visible');
  });

  it('4. Campos obrigatórios faltando impedem cadastro', () => {
    cy.visit('/');

    cy.get('input[name="usuario_email"]').type(emailUnico);
    cy.get('input[name="usuario_dataNascimento"]').type('2002-11-01');
    cy.get('input[name="usuario_senha"]').type('senhaForte123');

    cy.get('form').submit();

    cy.contains(/nome.*obrigatório/i).should('be.visible');
  });

  it('5. Senha não aparece na resposta da API nem na UI', () => {
    cy.visit('/');

    cy.get('.Navbar_profile__T6ZEC').type('Briena');
    cy.get('.Login_dados_info__GN14w').type(emailUnico); // Corrigido seletor com ponto
    cy.get('input[name="usuario_dataNascimento"]').type('2002-11-01');
    cy.get('input[name="usuario_senha"]').type('senhaForte123');

    cy.get('form').submit();

    cy.contains('Cadastro realizado com sucesso').should('be.visible');

    cy.request('GET', `${baseUrlBackend}/usuarios/email/${emailUnico}`)
      .its('body')
      .then(user => {
        expect(user).not.to.have.property('usuario_senha');
      });
  });
});
