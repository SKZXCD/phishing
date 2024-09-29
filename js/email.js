  const emailInput = document.getElementById('email');
  const emailPlaceholder = document.getElementById('email-placeholder');

  // Cacher le placeholder quand l'utilisateur tape dans le champ
  emailInput.addEventListener('input', function() {
    if (emailInput.value !== '') {
      emailPlaceholder.style.display = 'none';
    } else {
      emailPlaceholder.style.display = 'block';
    }
  });
