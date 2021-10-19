describe("Pipefy QA Interview Form", () => {
  it("Fill out the Pipefy QA Interview Form", () => {
    const fixtureFile = "cypress-logo.png";

    cy.visit(Cypress.config().baseUrl);

    cy.get('input[name="customFields.your_name"]').type(
      "Cezar Henrique Monteiro Nóbrega Vaz"
    );

    cy.get(
      'textarea[name="customFields.why_do_you_want_to_work_at_pipefy"]'
    ).type(
      "Because I am sure that Pipefy is an excellent company to work for and I can contribute to its qualitative growth."
    );

    cy.get('label[for="publicForm_customFields.check_b_option_B"]').click();

    cy.get('a[name="customFields.select_any_user"]').click();
    cy.get('a[title="felipe fantoni"]').click();

    cy.get('select[name="customFields.select_option_b"]').select("B", {
      force: true,
    });

    cy.get(
      'input[id="fake-pipe-field-publicForm-customFields_select_today_s_date-input"]'
    ).click();

    cy.get('input[id="date-time-select-time"]')
      .invoke("prop", "value")
      .as("hour");

    cy.get('[title="Save"]').click();

    cy.get('select[name="customFields.select_option_b"]').select("B");

    cy.get("@hour").then((hour) => {
      cy.get('input[name="customFields.what_time_is_it_now"]').type(hour);
    });

    cy.get('div[name="customFields.attach_a_png_img_to_the_form"]').attachFile(
      fixtureFile,
      { subjectType: "drag-n-drop" }
    );
    cy.get('[data-dz-name="true"]').should("be.visible");
    cy.get('[title="cypress-logo.png"]').should("be.visible");

    cy.get(".selected-flag").click();
    cy.get(".country-list").each((list) => {
      cy.wrap(list)
        .find('[data-dial-code="34"]')
        .scrollIntoView()
        .click({ force: true });
    });
    cy.get(
      'input[name="customFields.place_a_phone_number_from_spain_country"]'
    ).type("917004650");

    cy.get('[data-pp-button="submit-fields"]').click();
    cy.get('[data-pp-input="creator-email-field"]').type("cezarvaz@gmail.com");
    cy.get('[type="submit"]').click();

    cy.get("[data-testid=default-success-footer]").should("be.visible");
  });
});
