/* ─── Auth Logic ─── */
function switchAuthTab(tab) {
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  document.getElementById('form-login').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('form-signup').style.display = tab === 'signup' ? 'block' : 'none';
  clearErrors();
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));
}

async function emailLogin() {
  clearErrors();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  let valid = true;
  if (!email || !email.includes('@')) { document.getElementById('login-email-err').classList.add('show'); valid = false; }
  if (pass.length < 6) { document.getElementById('login-pass-err').classList.add('show'); valid = false; }
  if (!valid) return;

  const btn = document.querySelector('#form-login .btn-primary');
  btn.textContent = 'Signing in…'; btn.disabled = true;
  try {
    const res  = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password: pass }) });
    const data = await res.json();
    if (!res.ok) { showToast('❌ ' + data.error); return; }
    setToken(data.token);
    // Since currentUser is in main.js, it's global
    currentUser = data.user;
    showToast(`✅ Welcome, ${data.user.name.split(' ')[0]}!`);
    setTimeout(() => goDashboard(), 800);
  } catch { showToast('❌ Network error. Is the backend running?'); }
  finally { btn.textContent = 'Sign In to Dashboard →'; btn.disabled = false; }
}

async function emailSignup() {
  clearErrors();
  const name  = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass  = document.getElementById('signup-password').value;
  let valid = true;
  if (!name)  { document.getElementById('signup-name-err').classList.add('show');  valid = false; }
  if (!email || !email.includes('@')) { document.getElementById('signup-email-err').classList.add('show'); valid = false; }
  if (pass.length < 6) { document.getElementById('signup-pass-err').classList.add('show'); valid = false; }
  if (!valid) return;

  const btn = document.querySelector('#form-signup .btn-primary');
  btn.textContent = 'Creating account…'; btn.disabled = true;
  try {
    const res  = await fetch(`${API}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password: pass }) });
    const data = await res.json();
    if (!res.ok) { showToast('❌ ' + data.error); return; }
    setToken(data.token);
    currentUser = data.user;
    showToast(`✅ Welcome, ${data.user.name.split(' ')[0]}!`);
    setTimeout(() => goDashboard(), 800);
  } catch { showToast('❌ Network error. Is the backend running?'); }
  finally { btn.textContent = 'Create Account & Start →'; btn.disabled = false; }
}

function googleLogin() {
  showToast('ℹ️ Google login not configured. Please use email/password.');
}
