
document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll("[data-email-form]");

    forms.forEach(function (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            const formType = form.dataset.emailForm;

            // Run your existing validation
            let isValid = false;

            if (formType === "contact") {
                isValid = validateForm(form);
            }

            else if (formType === "donation") {
                isValid = validateDonationForm(form);
            }

            else if (formType === "rescue") {
                isValid = validateRescueForm(form);
            }

            // Stop if validation fails
            if (!isValid) {
                return;
            }

            const submitButton = form.querySelector(
                'input[type="submit"], button[type="submit"]'
            );

            const status = form.querySelector(".form-status");

            if (submitButton) {
                submitButton.disabled = true;
            }

            if (status) {
                status.textContent = "Sending your submission...";
            }

            try {

                const formData = Object.fromEntries(
                    new FormData(form).entries()
                );

                const response = await fetch("/api/send-email", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        formType: formType,
                        ...formData
                    })

                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message);
                }

                if (status) {
                    status.textContent = result.message;
                }

                form.reset();

            }

            catch (error) {

                if (status) {
                    status.textContent =
                        error.message ||
                        "Unable to send your submission. Please try again.";
                }

            }

            finally {

                if (submitButton) {
                    submitButton.disabled = false;
                }

            }

        });

    });

});
