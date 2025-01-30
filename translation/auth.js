// Sign-Up
document.getElementById('signupBtn').addEventListener('click', () => {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  if (username && password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Sign-up successful! Please log in.');
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  } else {
    alert('Please fill in all fields.');
  }
});

// Log-In
document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');

  if (username === savedUsername && password === savedPassword) {
    alert('Log-in successful! Redirecting...');
    window.location.href = 'app.html'; // Redirect to the translation assistant page
  } else {
    alert('Invalid username or password.');
  }
});

// Toggle between Sign-Up and Log-In forms
document.getElementById('showLogin').addEventListener('click', () => {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('showSignup').addEventListener('click', () => {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
});
