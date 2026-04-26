import { setItem, getItem } from './storage.js';

class CustomerFormHandler {
  constructor() {
    this.form = document.getElementById("guestForm");
    this.messageBox = document.getElementById("message");

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Real-time validation
    this.form.addEventListener("input", (e) => this.validateField(e));
  }

  validateField(e) {
    const value = e.target.value;

    if (e.target.id === "phone" && !/^\d{10}$/.test(value)) {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.remove("is-invalid");
    }
  }

  validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (data.name.length < 3) return "Name must be at least 3 characters";
    if (!/^\d{10}$/.test(data.phone)) return "Phone must be 10 digits";
    if (!emailRegex.test(data.email)) return "Invalid email";
    if (!data.address) return "Address required";
    if (!/^\d{12}$/.test(data.aadhar)) return "Aadhar must be 12 digits";

    const today = new Date().toISOString().split("T")[0];
    if (data.checkin < today || data.checkout < today)
      return "Dates must be future dates";

    if (!data.adults || data.adults <= 0)
      return "Invalid number of adults";

    if (!data.purpose) return "Purpose required";

    return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("SUBMIT CLICKED"); //
    const data = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      aadhar: document.getElementById("aadhar").value.trim(),
      checkin: document.getElementById("checkin").value,
      checkout: document.getElementById("checkout").value,
      adults: document.getElementById("adults").value,
      purpose: document.getElementById("purpose").value.trim(),
    };
  
    // const error = this.validateForm(data);
    // console.log("Validation result:", error);
    // if (error) {
    //   this.showMessage(error, "danger");
    //   return;
    // }
  
    this.saveToLocalStorage(data);
    console.log("Saving function called");
    this.clearForm();
    this.showMessage("Data saved successfully!", "success");
  }

  saveToLocalStorage(data) {
    const existing = getItem("guests");
    existing.push(data);
    setItem("guests", existing);
  }

  clearForm() {
    this.form.reset();
  }

  showMessage(msg, type) {
    this.messageBox.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
    setTimeout(() => (this.messageBox.innerHTML = ""), 3000);
  }
}

new CustomerFormHandler();