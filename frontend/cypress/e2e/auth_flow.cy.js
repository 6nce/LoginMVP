/// <reference types="cypress" />

describe("Alkira MFA Authentication Flow", () => {
    const baseUrl = "http://localhost:5173";

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it("should display the login page and toggle to signup", () => {
        cy.contains("Login").should("exist");
        cy.contains("Sign Up").click();
        cy.contains("Please fill out the form below").should("exist");
    });

    it("should create a new account and return to login state", () => {
        cy.contains("Sign Up").click();
        cy.get('input[type="email"]').type("user2@test.com");
        cy.get('input[type="password"]').type("password3");
        cy.get("button[type='submit']").click();
        cy.on("window:alert", (text) => {
            expect(text).to.contains("Account Created! Please log in.");
        });
    });

    it("should log in and show MFA verification page", () => {
        cy.get('input[type="email"]').type("admin@test.com");
        cy.get('input[type="password"]').type("password1");
        cy.get("button[type='submit']").click();

        cy.url().should("include", "/mfa");
        cy.contains("Enter MFA Code").should("exist");
    });

    it("should not display admin control panel for regular users", () => {
        cy.visit(`${baseUrl}/dashboard`);
        cy.contains("Admin Control Panel").should("not.exist");
    });


});