// Sign-Up
document.getElementById('signupBtn').addEventListener('click', () => {
  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (username && password) {
    localStorage.setItem('translationUser', JSON.stringify({ username, password }));
    alert('Sign-up successful! Please log in.');
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  } else {
    alert('Please fill in all fields.');
  }
});

// Log-In
document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const savedUser = JSON.parse(localStorage.getItem('translationUser'));

  if (savedUser && username === savedUser.username && password === savedUser.password) {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'app.html';
  } else {
    alert('Invalid credentials');
  }
});

// Toggle Forms
document.getElementById('showLogin').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('showSignup').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
});

// Auto-redirect if logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
  window.location.href = 'app.html';
}
