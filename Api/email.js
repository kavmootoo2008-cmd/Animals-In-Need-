document.querySelectorAll("[data-email-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const status = form.querySelector(".form-status");
        const submitButton = form.querySelector('[type="submit"]');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = Object.fromEntries(new FormData(form).entries());

        // Tell the API which form was submitted
        formData.formType = form.dataset.emailForm;

        try {
            if (status) {
                status.textContent = "Sending...";
            }

            if (submitButton) {
                submitButton.disabled = true;
            }

            const response = await fetch("/api/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Email could not be sent.");
            }

            if (status) {
                status.textContent = result.message;
            }

            form.reset();

        } catch (error) {
            console.error("Email submission error:", error);

            if (status) {
                status.textContent = error.message ||
                    "Something went wrong. Please try again.";
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
});
