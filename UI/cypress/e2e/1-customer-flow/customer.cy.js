/// <reference types="cypress" />

describe('customers flow test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('displays two customers', () => {
    cy.get('.customer-details-card').should('have.length', 2)
    cy.get('.customer-details-card').first().should('have.text', 'Name: John Smith')
  })

  it('can click on customer and go back to home page', () => {

    cy.get('.customer-details-card').first().click()
    cy.location('pathname').should('eq', '/customer/kim61wsq5x7i15ldgp9m522p6tec60')
    cy.get('[data-testid=balance-customer]').should('have.text', 'Balance: $20')
    cy.get('.logo').click()
    cy.location('pathname').should('eq', '/')
    
  })
  
  it('bank balances to be same on navbar and homepage body', () => {
    cy.get('[data-testid=total-balance]').should('have.text', '$32.01')
    cy.get('[data-testid=navbar-balance]').should('have.text', '$32.01')
    
  })
})
