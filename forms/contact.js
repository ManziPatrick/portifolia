document.getElementById('submitButton').addEventListener('click', submitForm);

function submitForm(e) {
  e.preventDefault();

  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  fetch('https://mybland-backend-c3uv.onrender.com/contact', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('contactForm').reset();
      document.getElementById('contactForm').classList.add('was-validated');
      document.querySelector('.sent-message').style.display = 'block';
      document.querySelector('.loading').style.display = 'none';
      document.querySelector('.error-message').style.display = 'none';
    } else {
      document.querySelector('.sent-message').style.display = 'none';
      document.querySelector('.loading').style.display = 'none';
      document.querySelector('.error-message').style.display = 'block';
    }
  })
  .catch(error => console.error('Error:', error))
}
