describe('Testes de Integração - Cadastro de Usuário', () => {
  const baseUrlBackend = 'http://localhost:3001'; 

  // Gerar e-mail único para cada execução
  const emailUnico = `briena+${Date.now()}@teste.com`;

  it('1. Cadastro válido cria usuário e mostra confirmação', () => {
    cy.visit('/');

    cy.get('input[name="usuario_nome"]').type('Briena');
    cy.get('input[name="usuario_email"]').type(emailUnico);
    cy.get('input[name="usuario_dataNascimento"]').type('2002-11-01');
    cy.get('input[name="usuario_senha"]').type('senhaForte123');

    cy.get('form').submit();

    cy.contains('Cadastro realizado com sucesso').should('be.visible');

    // Verificar no backend que usuário foi criado
    cy.request('GET', `${baseUrlBackend}/usuarios/email/${emailUnico}`)
      .its('body')
      .should('have.property', 'usuario_email', emailUnico);
  });

  it('2. Cadastro com e-mail duplicado mostra erro no frontend e não cria novo', () => {
    // Criar usuário antes (via API)
    cy.request('POST', `${baseUrlBackend}/usuarios/cadastrar`, {
      usuario_nome: 'Briena',
      usuario_email: emailUnico,
      usuario_dataNascimento: '2002-11-01',
      usuario_senha: 'senhaForte123'
    });

    cy.visit('/');

    cy.get('input[name="usuario_nome"]').type('Briena Dup');
    cy.get('input[name="usuario_email"]').type(emailUnico);
    cy.get('input[name="usuario_dataNascimento"]').type('2002-11-01');
    cy.get('input[name="usuario_senha"]').type('senhaOutra123');

    cy.get('form').submit();

    cy.contains(/email já cadastrado/i).should('be.visible');

    // Verificar que não duplicou usuário no backend
    cy.request('GET', `${baseUrlBackend}/usuarios/email/${emailUnico}`)
      .its('body')
      .then(user => {
        expect(user.usuario_nome).to.equal('Briena');
      });
  });

  it('3. Cadastro com e-mail inválido bloqueia envio e mostra erro na interface', () => {
    cy.visit('/');

    cy.get('input[name="usuario_nome"]').type('Briena');
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
    cy.get('Login_dados_info__GN14w').type(emailUnico);
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
