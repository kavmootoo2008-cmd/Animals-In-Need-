function validateForm(formData)
{
    var errorCount = 0;

    var name = formData.name.value;
    var email = formData.email.value;
    var phone = formData.phone.value;
    var subject = formData.subject.value;
    var message = formData.message.value;


    // Full Name validation
    if (name == "")
    {
        document.getElementById("nameError").innerHTML = "Please enter your name";
        errorCount++;
    }
    else
    {
        document.getElementById("nameError").innerHTML = "";
    }


    // Email validation
    if (email == "")
    {
        document.getElementById("emailError").innerHTML = "Please enter your email address";
        errorCount++;
    }
    else if (!testEmailAddress(email))
    {
        document.getElementById("emailError").innerHTML = "Please enter a valid email address";
        errorCount++;
    }
    else
    {
        document.getElementById("emailError").innerHTML = "";
    }


    // Phone Number validation
    if (phone == "")
    {
        document.getElementById("phoneError").innerHTML = "Please enter your phone number";
        errorCount++;
    }
    else
    {
        document.getElementById("phoneError").innerHTML = "";
    }


    // Subject validation
    if (subject == "")
    {
        document.getElementById("subjectError").innerHTML = "Please select a subject";
        errorCount++;
    }
    else
    {
        document.getElementById("subjectError").innerHTML = "";
    }


    // Message validation
    if (message == "")
    {
        document.getElementById("messageError").innerHTML = "Please enter a message";
        errorCount++;
    }
    else
    {
        document.getElementById("messageError").innerHTML = "";
    }


    // Check for errors
    if (errorCount > 0)
    {
        return false;
    }

    return true;
}


function testEmailAddress(email)
{
    if (email == "")
    {
        return false;
    }

    var atPos = email.indexOf("@", 1);

    // Make sure the email contains an @ symbol
    if (atPos == -1)
    {
        return false;
    }

    // Make sure there is only one @ symbol
    if (email.indexOf("@", atPos + 1) != -1)
    {
        return false;
    }

    // Make sure there is text after the @ symbol
    if (atPos == email.length - 1)
    {
        return false;
    }

    // Make sure there is a dot after the @ symbol
    var dotPos = email.indexOf(".", atPos);

    if (dotPos == -1)
    {
        return false;
    }

    // Make sure there is text after the dot
    if (dotPos == email.length - 1)
    {
        return false;
    }

    return true;
}