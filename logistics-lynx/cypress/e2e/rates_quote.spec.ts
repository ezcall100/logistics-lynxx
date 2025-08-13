describe('Rates Portal - Quote Flow', () => {
  beforeEach(() => {
    // Login as a user with access to rates portal
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    
    // Select a role that has access to rates
    cy.get('[data-testid="role-selector"]').click();
    cy.get('[data-testid="role-shipper_admin"]').click();
    
    // Navigate to rates portal
    cy.visit('/rates');
  });

  it('should display rates portal and allow quote creation', () => {
    // Check that we're on the rates portal
    cy.url().should('include', '/rates');
    cy.get('h1').should('contain', 'Rates Portal');
    
    // Check for quote form elements
    cy.get('[data-testid="origin-city"]').should('be.visible');
    cy.get('[data-testid="origin-state"]').should('be.visible');
    cy.get('[data-testid="destination-city"]').should('be.visible');
    cy.get('[data-testid="destination-state"]').should('be.visible');
    cy.get('[data-testid="equipment-type"]').should('be.visible');
    cy.get('[data-testid="ship-date"]').should('be.visible');
  });

  it('should fill quote form and get rate', () => {
    // Fill out the quote form
    cy.get('[data-testid="origin-city"]').type('Chicago');
    cy.get('[data-testid="origin-state"]').select('IL');
    cy.get('[data-testid="destination-city"]').type('Los Angeles');
    cy.get('[data-testid="destination-state"]').select('CA');
    cy.get('[data-testid="equipment-type"]').select('Dry Van');
    cy.get('[data-testid="ship-date"]').type('2024-02-01');
    cy.get('[data-testid="weight"]').type('10000');
    
    // Submit the quote request
    cy.get('[data-testid="get-rate-button"]').click();
    
    // Wait for quote response
    cy.get('[data-testid="quote-loading"]').should('be.visible');
    cy.get('[data-testid="proposed-rate"]', { timeout: 10000 }).should('be.visible');
    
    // Verify quote details are displayed
    cy.get('[data-testid="proposed-rate"]').should('contain', '$');
    cy.get('[data-testid="confidence-score"]').should('be.visible');
    cy.get('[data-testid="estimated-days"]').should('be.visible');
  });

  it('should allow sending quote', () => {
    // First get a quote (reuse the form filling logic)
    cy.get('[data-testid="origin-city"]').type('Chicago');
    cy.get('[data-testid="origin-state"]').select('IL');
    cy.get('[data-testid="destination-city"]').type('Los Angeles');
    cy.get('[data-testid="destination-state"]').select('CA');
    cy.get('[data-testid="equipment-type"]').select('Dry Van');
    cy.get('[data-testid="ship-date"]').type('2024-02-01');
    cy.get('[data-testid="get-rate-button"]').click();
    
    // Wait for quote
    cy.get('[data-testid="proposed-rate"]', { timeout: 10000 }).should('be.visible');
    
    // Send the quote
    cy.get('[data-testid="send-quote-button"]').click();
    
    // Verify quote was sent
    cy.get('[data-testid="quote-status"]').should('contain', 'sent');
    cy.get('[data-testid="success-toast"]').should('be.visible');
  });

  it('should show quote history', () => {
    // Navigate to quote history
    cy.get('[data-testid="quote-history-tab"]').click();
    
    // Check that quote history is displayed
    cy.get('[data-testid="quote-history-list"]').should('be.visible');
    cy.get('[data-testid="quote-item"]').should('have.length.at.least', 1);
  });
});
