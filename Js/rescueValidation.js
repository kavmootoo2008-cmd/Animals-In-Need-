function validateRescueForm(formData)
{
    var errorCount = 0;

    var name = formData.name.value;
    var email = formData.email.value;
    var phone = formData.phone.value;
    var location = formData.location.value;
    var animal = formData.animal.value;
    var gender = formData.gender.value;
    var condition = formData.condition.value;


    // Full Name validation
    if (name == "")
    {
        document.getElementById("rescueNameError").innerHTML = "Please enter your name";
        errorCount++;
    }
    else
    {
        document.getElementById("rescueNameError").innerHTML = "";
    }


    // Email validation
    if (email == "")
    {
        document.getElementById("rescueEmailError").innerHTML = "Please enter your email address";
        errorCount++;
    }
    else if (!testEmailAddress(email))
    {
        document.getElementById("rescueEmailError").innerHTML = "Please enter a valid email address";
        errorCount++;
    }
    else
    {
        document.getElementById("rescueEmailError").innerHTML = "";
    }


    // Phone Number validation
    if (phone == "")
    {
        document.getElementById("rescuePhoneError").innerHTML = "Please enter your phone number";
        errorCount++;
    }
    else
    {
        document.getElementById("rescuePhoneError").innerHTML = "";
    }


    // Animal Location validation
    if (location == "")
    {
        document.getElementById("locationError").innerHTML = "Please enter the animal's location";
        errorCount++;
    }
    else
    {
        document.getElementById("locationError").innerHTML = "";
    }


    // Animal Type validation
    if (animal == "")
    {
        document.getElementById("animalError").innerHTML = "Please select an animal type";
        errorCount++;
    }
    else
    {
        document.getElementById("animalError").innerHTML = "";
    }

    // Animal Gender validation
    if (gender == "")
    {
        document.getElementById("genderError").innerHTML = "Please select the animal's gender";
        errorCount++;
    }
    else
    {
        document.getElementById("genderError").innerHTML = "";
    }

    // Animal Condition validation
    if (condition == "")
    {
        document.getElementById("conditionError").innerHTML = "Please describe the animal's condition";
        errorCount++;
    }
    else
    {
        document.getElementById("conditionError").innerHTML = "";
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