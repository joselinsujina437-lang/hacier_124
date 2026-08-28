/* =====================================================
   HAICER WEBSITE JAVASCRIPT
===================================================== */

/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", function () {

    mainNav.classList.toggle("active");
    const icon = menuButton.querySelector("i");

    if (mainNav.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

document.querySelectorAll("#mainNav a").forEach(function (link) {

    link.addEventListener("click", function () {

        mainNav.classList.remove("active");
        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   SELECT DEPARTMENT
===================================================== */

function selectDepartment(departmentName) {

    const department = document.getElementById("department");
    department.value = departmentName;

    document.getElementById("appointment").scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   SET MINIMUM DATE
===================================================== */

const dateInput = document.getElementById("appointmentDate");
const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* =====================================================
   PHONE VALIDATION
===================================================== */

const phoneInput = document.getElementById("patientPhone");

phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
});


/* =====================================================
   APPOINTMENT FORM
===================================================== */

const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    /* GET FORM VALUES */

    const name = document.getElementById("patientName").value.trim();
    const phone = document.getElementById("patientPhone").value.trim();
    const department = document.getElementById("department").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const message = document.getElementById("patientMessage").value.trim();

    /* VALIDATION */

    if (name.length < 2) {
        alert("Please enter the patient's name.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10 digit phone number.");
        return;
    }

    if (!department) {
        alert("Please select a department.");
        return;
    }

    if (!appointmentDate) {
        alert("Please select your preferred date.");
        return;
    }

    /* =================================================
       IMPORTANT
       REPLACE THIS NUMBER WITH THE REAL HAICER WHATSAPP NUMBER.
       Example: const clinicWhatsApp = "919876543210";
       Country code: India = 91
       Do NOT use: +91, spaces, brackets
    ================================================= */

    const clinicWhatsApp = "919999999999";

    /* FORMAT DATE */

    const selectedDate = new Date(appointmentDate + "T00:00:00");

    const formattedDate = selectedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    /* AUTOMATIC WHATSAPP MESSAGE */

    const whatsappMessage =
`Hello Haicer Multi Speciality Clinic,

I would like to request an appointment.

Patient Name:
${name}

Phone Number:
${phone}

Department / Service:
${department}

Preferred Date:
${formattedDate}

Message:
${message || "I would like to consult the clinic."}

Please confirm the appointment availability.

Thank you.`;

    /* CREATE WHATSAPP URL */

    const whatsappURL =
        "https://wa.me/" +
        clinicWhatsApp +
        "?text=" +
        encodeURIComponent(whatsappMessage);

    /* OPEN WHATSAPP */

    window.open(whatsappURL, "_blank");

});


/* =====================================================
   SCROLL ANIMATION
===================================================== */

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.12
});

document.querySelectorAll(
    ".department-card, .service-card, .why-card, .review-card"
).forEach(function (element) {
    observer.observe(element);
});
