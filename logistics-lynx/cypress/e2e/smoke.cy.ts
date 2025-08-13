describe('Unified Dashboard Smoke Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the dashboard to load
    cy.get('[data-testid="dashboard-loading"]', { timeout: 10000 }).should('not.exist');
  });

  it('loads the dashboard successfully', () => {
    // Check main dashboard elements
    cy.contains('Trans Bot AI').should('be.visible');
    cy.contains('Welcome back!').should('be.visible');
    
    // Check for KPI cards
    cy.get('[data-testid="kpi-card"]').should('have.length.at.least', 1);
    
    // Check for portal grid
    cy.get('[data-testid="portal-card"]').should('have.length.at.least', 1);
  });

  it('switches between user roles', () => {
    // Test role switching functionality
    const roles = ['super_admin', 'carrier_admin', 'driver', 'shipper_admin'];
    
    roles.forEach(role => {
      // Switch role (assuming there's a role selector)
      cy.get('[data-testid="role-selector"]').click();
      cy.get(`[data-testid="role-${role}"]`).click();
      
      // Verify role-specific content loads
      cy.contains(role.replace('_', ' ')).should('be.visible');
      
      // Check that KPIs update for the role
      cy.get('[data-testid="kpi-card"]').should('be.visible');
    });
  });

  it('opens portal cards and shows feedback', () => {
    // Click on the first portal card
    cy.get('[data-testid="portal-card"]').first().within(() => {
      cy.get('[data-testid="open-portal-btn"]').click();
    });
    
    // Verify navigation or modal opens
    cy.url().should('include', '/portals/');
    
    // Check for success feedback
    cy.get('[data-testid="toast-success"]').should('be.visible');
  });

  it('performs search functionality', () => {
    // Test search input
    cy.get('[data-testid="search-input"]').type('broker');
    
    // Verify search results
    cy.get('[data-testid="portal-card"]').should('contain.text', 'Broker');
    
    // Clear search
    cy.get('[data-testid="search-input"]').clear();
    
    // Verify all portals are shown again
    cy.get('[data-testid="portal-card"]').should('have.length.at.least', 5);
  });

  it('displays performance charts', () => {
    // Check performance chart section
    cy.contains('Performance Overview').should('be.visible');
    
    // Test time range filters
    cy.get('[data-testid="time-range-7d"]').click();
    cy.get('[data-testid="time-range-30d"]').click();
    cy.get('[data-testid="time-range-90d"]').click();
    
    // Verify chart renders
    cy.get('[data-testid="performance-chart"]').should('be.visible');
  });

  it('shows recent activity feed', () => {
    // Check activity section
    cy.contains('Recent Activity').should('be.visible');
    
    // Verify activity items load
    cy.get('[data-testid="activity-item"]').should('have.length.at.least', 1);
    
    // Test activity item interaction
    cy.get('[data-testid="activity-item"]').first().click();
    
    // Verify activity details modal/dialog
    cy.get('[data-testid="activity-details"]').should('be.visible');
  });

  it('displays system health status', () => {
    // Check system health section
    cy.contains('System Health').should('be.visible');
    
    // Verify health metrics
    cy.get('[data-testid="health-metric"]').should('have.length.at.least', 1);
    
    // Test health check button
    cy.get('[data-testid="run-health-check"]').click();
    
    // Verify health check feedback
    cy.get('[data-testid="toast-info"]').should('be.visible');
  });

  it('handles quick actions', () => {
    // Test quick action buttons
    cy.get('[data-testid="quick-action"]').first().click();
    
    // Verify action feedback
    cy.get('[data-testid="toast-success"]').should('be.visible');
  });

  it('responds to different screen sizes', () => {
    // Test mobile view
    cy.viewport('iphone-se');
    cy.get('[data-testid="dashboard-header"]').should('be.visible');
    
    // Test tablet view
    cy.viewport('ipad-2');
    cy.get('[data-testid="portal-grid"]').should('be.visible');
    
    // Test desktop view
    cy.viewport(1920, 1080);
    cy.get('[data-testid="dashboard-content"]').should('be.visible');
  });

  it('handles error states gracefully', () => {
    // Simulate network error (if possible)
    cy.intercept('GET', '**/api/**', { statusCode: 500 }).as('apiError');
    
    // Trigger an action that would cause an error
    cy.get('[data-testid="refresh-data"]').click();
    
    // Verify error handling
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="retry-button"]').should('be.visible');
  });

  it('maintains accessibility standards', () => {
    // Check for proper ARIA labels
    cy.get('[data-testid="search-input"]').should('have.attr', 'aria-label');
    
    // Test keyboard navigation
    cy.get('body').tab();
    cy.focused().should('exist');
    
    // Check for focus indicators
    cy.get('[data-testid="portal-card"]').first().focus();
    cy.focused().should('have.css', 'outline');
  });

  it('loads with acceptable performance', () => {
    // Measure page load time
    cy.window().then((win) => {
      const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
      expect(loadTime).to.be.lessThan(3000); // 3 seconds max
    });
    
    // Check for loading states
    cy.get('[data-testid="loading-skeleton"]').should('exist');
    cy.get('[data-testid="loading-skeleton"]', { timeout: 5000 }).should('not.exist');
  });
});
