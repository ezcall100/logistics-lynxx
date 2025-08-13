describe('Directory Portal - Search Flow', () => {
  beforeEach(() => {
    // Login as a user with access to directory portal
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    
    // Select a role that has access to directory
    cy.get('[data-testid="role-selector"]').click();
    cy.get('[data-testid="role-shipper_admin"]').click();
    
    // Navigate to directory portal
    cy.visit('/directory');
  });

  it('should display directory portal and search interface', () => {
    // Check that we're on the directory portal
    cy.url().should('include', '/directory');
    cy.get('h1').should('contain', 'Directory Portal');
    
    // Check for search elements
    cy.get('[data-testid="search-input"]').should('be.visible');
    cy.get('[data-testid="company-type-filter"]').should('be.visible');
    cy.get('[data-testid="location-filter"]').should('be.visible');
    cy.get('[data-testid="search-button"]').should('be.visible');
  });

  it('should search for companies and display results', () => {
    // Search for "Acme"
    cy.get('[data-testid="search-input"]').type('Acme');
    cy.get('[data-testid="search-button"]').click();
    
    // Wait for search results
    cy.get('[data-testid="search-results"]', { timeout: 10000 }).should('be.visible');
    
    // Check that results contain the search term
    cy.get('[data-testid="company-card"]').should('have.length.at.least', 1);
    cy.get('[data-testid="company-name"]').first().should('contain', 'Acme');
  });

  it('should filter companies by type', () => {
    // Filter by carrier type
    cy.get('[data-testid="company-type-filter"]').select('carrier');
    cy.get('[data-testid="search-button"]').click();
    
    // Wait for filtered results
    cy.get('[data-testid="search-results"]', { timeout: 10000 }).should('be.visible');
    
    // Check that all results are carriers
    cy.get('[data-testid="company-type"]').each(($el) => {
      cy.wrap($el).should('contain', 'Carrier');
    });
  });

  it('should open company profile and show details', () => {
    // Search for a company first
    cy.get('[data-testid="search-input"]').type('Acme');
    cy.get('[data-testid="search-button"]').click();
    
    // Wait for results and click on first company
    cy.get('[data-testid="company-card"]', { timeout: 10000 }).first().click();
    
    // Check that company profile is displayed
    cy.get('[data-testid="company-profile"]').should('be.visible');
    cy.get('[data-testid="company-name"]').should('contain', 'Acme');
    cy.get('[data-testid="company-description"]').should('be.visible');
    cy.get('[data-testid="company-contact"]').should('be.visible');
  });

  it('should show compliance badges and ratings', () => {
    // Search and open a company profile
    cy.get('[data-testid="search-input"]').type('Acme');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="company-card"]', { timeout: 10000 }).first().click();
    
    // Check for compliance information
    cy.get('[data-testid="compliance-badges"]').should('be.visible');
    cy.get('[data-testid="company-rating"]').should('be.visible');
    cy.get('[data-testid="compliance-score"]').should('be.visible');
  });

  it('should add company to preferred list', () => {
    // Search and open a company profile
    cy.get('[data-testid="search-input"]').type('Acme');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="company-card"]', { timeout: 10000 }).first().click();
    
    // Add to preferred list
    cy.get('[data-testid="add-to-preferred"]').click();
    
    // Verify success message
    cy.get('[data-testid="success-toast"]').should('be.visible');
    cy.get('[data-testid="success-toast"]').should('contain', 'Added to preferred');
  });

  it('should show company services and capabilities', () => {
    // Search and open a company profile
    cy.get('[data-testid="search-input"]').type('Acme');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="company-card"]', { timeout: 10000 }).first().click();
    
    // Check for services section
    cy.get('[data-testid="company-services"]').should('be.visible');
    cy.get('[data-testid="service-item"]').should('have.length.at.least', 1);
    
    // Check for capabilities/tags
    cy.get('[data-testid="company-tags"]').should('be.visible');
    cy.get('[data-testid="tag-item"]').should('have.length.at.least', 1);
  });
});
