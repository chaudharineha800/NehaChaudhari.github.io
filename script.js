AOS.init({
    duration: 1000,
    once: true
  });
  
  // Typing effect
  const texts = [
    "Data Analyst",
    "Data Science Enthusiast",
    "Power BI & Python Specialist",
    "Turning Data into Insights"
  ];
  
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";
  
  (function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
  
    document.getElementById("typing").textContent = letter;
  
    if (letter.length === currentText.length) {
      count++;
      index = 0;
      setTimeout(type, 2000);
    } else {
      setTimeout(type, 100);
    }
  })();
  
  // Scroll progress
  window.addEventListener("scroll", () => {
    const scroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById("progress").style.width = `${(scroll / height) * 100}%`;
  });
  

var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault(); // Stop the page from redirecting
  var status = document.getElementById("form-status");
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // Polishing the message
      status.innerHTML = `
        <div class="alert alert-success border-0 shadow-sm d-flex align-items-center" role="alert">
          <i class="fas fa-check-circle me-2"></i>
          <div>
            <strong>Success!</strong> Your message has been sent. I'll get back to you soon!
          </div>
        </div>`;
      form.reset(); // Clear the form
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem connecting to the server.";
  });
}

form.addEventListener("submit", handleSubmit);