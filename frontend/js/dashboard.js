/* ─── Dashboard State ─── */
let detectFiles = [];
let quickFiles  = [];
let chatHistory = [];
let currentChatSessionId = null;

/* ─── Dashboard Init ─── */
window.addEventListener('load', () => {
  // Since main.js runs first and sets currentUser if logged in, we wait briefly
  setTimeout(() => {
    if (currentUser) {
      updateDashUser();
      setDashDate();
      loadWeatherWidget();
      loadScansHistory();
      loadChatSessions();
    }
  }, 100);
});

function updateDashUser() {
  if (!currentUser) return;
  const initials = getInitials(currentUser.name);
  const avatarEl = document.getElementById('dash-nav-avatar');
  if (avatarEl) avatarEl.textContent = initials;
  const nameEl = document.getElementById('dash-nav-name');
  if (nameEl) nameEl.textContent = currentUser.name.split(' ')[0];
  const welcomeEl = document.getElementById('dash-welcome-name');
  if (welcomeEl) welcomeEl.textContent = 'Welcome back, ' + currentUser.name.split(' ')[0];
  
  const pfAvatar = document.getElementById('profile-avatar-lg');
  if (pfAvatar) pfAvatar.textContent = initials;
  
  const pNameDisp = document.getElementById('profile-name-display');
  if (pNameDisp) pNameDisp.textContent = currentUser.name;
  
  const pEmailDisp = document.getElementById('profile-email-display');
  if (pEmailDisp) pEmailDisp.textContent = currentUser.email;
  
  const pfName = document.getElementById('pf-name');
  if (pfName) pfName.textContent = currentUser.name;
  
  const pfEmail = document.getElementById('pf-email');
  if (pfEmail) pfEmail.textContent = currentUser.email;
}

function setDashDate() {
  const d = new Date();
  const dateEl = document.getElementById('dash-date');
  if (dateEl) dateEl.textContent = d.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

function dashTab(tab) {
  const tabs = ['overview','detect','weather','history','chatbot','alerts','profile'];
  tabs.forEach(t => {
    const el = document.getElementById('dtab-' + t);
    if (el) el.style.display = t === tab ? 'block' : 'none';
    const sb = document.getElementById('sb-' + t);
    if (sb) sb.classList.toggle('active', t === tab);
  });
}

/* ─── Quick Upload (Overview) ─── */
function handleQuickUpload(e) {
  quickFiles = Array.from(e.target.files).slice(0, 5);
  const prevRow = document.getElementById('quick-previews');
  if (!prevRow) return;
  prevRow.innerHTML = '';
  quickFiles.forEach((f, i) => {
    const url = URL.createObjectURL(f);
    const d = document.createElement('div'); d.className = 'preview-thumb';
    d.innerHTML = `<img src="${url}" /><button class="preview-remove" onclick="removeQuickImg(${i})">✕</button>`;
    prevRow.appendChild(d);
  });
  const btn = document.getElementById('quick-analyze-btn');
  if (btn) btn.disabled = quickFiles.length === 0;
}

function removeQuickImg(i) {
  quickFiles.splice(i, 1);
  const thumbs = document.getElementById('quick-previews')?.querySelectorAll('.preview-thumb');
  if (thumbs && thumbs[i]) thumbs[i].remove();
  const btn = document.getElementById('quick-analyze-btn');
  if (btn) btn.disabled = quickFiles.length === 0;
}

async function runQuickAnalysis() {
  if (!quickFiles.length) return;
  const resultEl = document.getElementById('quick-result');
  if (!resultEl) return;
  resultEl.innerHTML = `<div class="analyzing-spinner"><div class="spinner-leaf">🌿</div><div>AI is analyzing your crop...</div></div>`;
  const res = await callCropAI(quickFiles, 'English');
  if (res.error) { resultEl.innerHTML = `<div style="color:var(--danger);padding:12px;">${res.error}</div>`; return; }
  resultEl.innerHTML = renderResultHTML(res);
}

/* ─── Full Detect Upload ─── */
function handleDetectUpload(e) {
  detectFiles = Array.from(e.target.files).slice(0, 5);
  const prevRow = document.getElementById('det-previews');
  if (!prevRow) return;
  prevRow.innerHTML = '';
  detectFiles.forEach((f, i) => {
    const url = URL.createObjectURL(f);
    const d = document.createElement('div'); d.className = 'preview-thumb';
    d.innerHTML = `<img src="${url}" /><button class="preview-remove" onclick="removeDetectImg(${i})">✕</button>`;
    prevRow.appendChild(d);
  });
  checkDetectEnable();
}

function removeDetectImg(i) {
  detectFiles.splice(i, 1);
  const thumbs = document.getElementById('det-previews')?.querySelectorAll('.preview-thumb');
  if (thumbs && thumbs[i]) thumbs[i].remove();
  checkDetectEnable();
}

function checkDetectEnable() {
  const descEl = document.getElementById('det-desc');
  const desc = descEl ? descEl.value.trim() : '';
  const btn = document.getElementById('det-analyze-btn');
  if (btn) btn.disabled = (detectFiles.length === 0 && desc === '');
}

async function runDetectAnalysis() {
  const descEl = document.getElementById('det-desc');
  const desc = descEl ? descEl.value.trim() : '';
  if (!detectFiles.length && !desc) return;
  
  const langEl = document.getElementById('det-lang');
  const lang = langEl ? langEl.value : 'English';
  
  const resultEl = document.getElementById('det-result');
  if (!resultEl) return;
  
  resultEl.innerHTML = `<div class="analyzing-spinner"><div class="spinner-leaf">🌿</div><div>AI is analyzing your input...<br><small style="font-size:.75rem;margin-top:6px;display:block;color:var(--muted);">This may take a few seconds</small></div></div>`;
  
  const res = await callCropAI(detectFiles, lang, desc);
  if (res.error) { resultEl.innerHTML = `<div style="color:var(--danger);padding:12px;">${res.error}</div>`; return; }
  
  resultEl.innerHTML = renderResultHTML(res);
  loadScansHistory();
}

/* ─── AI API Call → Backend ─── */
async function callCropAI(files, language, description = '') {
  try {
    const fd = new FormData();
    files.forEach(f => fd.append('images', f));
    fd.append('language', language);
    if (description) fd.append('description', description);

    const res = await fetch(`${API}/analyze`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() },
      body: fd,
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Analysis failed.' };
    return data;
  } catch (err) {
    return { error: '⚠️ Network error. Make sure the backend is running at localhost:3001. ' + err.message };
  }
}

/* ─── Render Result HTML ─── */
function renderResultHTML(r) {
  const sev = { Early: 'badge-green', Moderate: 'badge-amber', Severe: 'badge-danger', None: 'badge-green' };
  const spread = { Low: 'badge-green', Moderate: 'badge-amber', High: 'badge-danger' };
  const isHealthy = r.diseaseDetected === 'Healthy';
  return `
  <div class="result-box" style="margin-top:12px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
      <div>
        <div style="font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px;">Crop Identified</div>
        <div style="font-size:1.1rem;font-weight:800;">${r.cropType || 'Unknown'}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:.75rem;color:var(--muted);">Confidence</div>
        <div style="font-size:1.5rem;font-weight:900;color:var(--green-base);">${r.confidenceScore || 0}%</div>
      </div>
    </div>
    <div class="${isHealthy ? 'result-disease result-healthy' : 'result-disease'}">${isHealthy ? '✅' : '⚠️'} ${r.diseaseDetected}</div>
    <div class="result-badges">
      <span class="badge ${sev[r.severityLevel] || 'badge-amber'}">🎯 ${r.severityLevel}</span>
      <span class="badge ${spread[r.spreadRisk] || 'badge-amber'}">📡 Spread: ${r.spreadRisk}</span>
      <span class="badge badge-sky">💪 Recovery: ${r.recoveryChance}%</span>
    </div>
    ${r.severityPercent > 0 ? `
    <div style="margin-bottom:12px;">
      <div style="font-size:.78rem;color:var(--muted);margin-bottom:4px;">Affected Area: ${r.severityPercent}%</div>
      <div style="background:#e0e0e0;border-radius:10px;height:7px;overflow:hidden;">
        <div style="height:100%;width:${r.severityPercent}%;background:${r.severityLevel==='Severe'?'#c0392b':r.severityLevel==='Moderate'?'#e9a319':'#40916c'};border-radius:10px;"></div>
      </div>
    </div>` : ''}
    <div class="result-summary">${r.summary}</div>
    ${r.immediateAction ? `<div style="font-weight:800;color:var(--danger);font-size:.85rem;margin-bottom:12px;padding:8px 12px;background:var(--danger-light);border-radius:8px;">🚨 Now: ${r.immediateAction}</div>` : ''}
    ${r.treatmentPlan?.length ? `
    <div style="font-weight:700;font-size:.9rem;margin-bottom:8px;">🗓️ Treatment Plan</div>
    ${r.treatmentPlan.map(s => `<div class="treatment-step"><span class="step-day-badge">${s.day}</span><span class="step-action">${s.action}</span></div>`).join('')}
    ` : ''}
    ${r.organicTreatments?.length ? `<div style="margin-top:12px;padding:10px;background:var(--green-pale);border-radius:8px;"><div style="font-weight:700;font-size:.82rem;color:var(--green-dark);margin-bottom:5px;">🌿 Organic</div>${r.organicTreatments.map(t=>`<div style="font-size:.82rem;">• ${t}</div>`).join('')}</div>` : ''}
    ${r.chemicalTreatments?.length ? `<div style="margin-top:8px;padding:10px;background:var(--sky-light);border-radius:8px;"><div style="font-weight:700;font-size:.82rem;color:var(--sky);margin-bottom:5px;">🧪 Chemical</div>${r.chemicalTreatments.map(t=>`<div style="font-size:.82rem;">• ${t}</div>`).join('')}</div>` : ''}
    ${r.availablePesticides?.length ? `<div style="margin-top:8px;"><div style="font-weight:700;font-size:.82rem;margin-bottom:5px;">🏪 Available in India</div><div style="display:flex;flex-wrap:wrap;gap:5px;">${r.availablePesticides.map(p=>`<span style="background:var(--sky);color:#fff;border-radius:20px;padding:2px 9px;font-size:.75rem;">${p}</span>`).join('')}</div></div>` : ''}
    ${r.prevention?.length ? `<div style="margin-top:8px;padding:10px;background:var(--cream);border-radius:8px;border:1px solid var(--border);"><div style="font-weight:700;font-size:.82rem;margin-bottom:5px;">🛡️ Prevention</div>${r.prevention.map(p=>`<div style="font-size:.82rem;">✓ ${p}</div>`).join('')}</div>` : ''}
    <button class="pdf-btn" onclick="downloadPDFReport()" style="margin-top:20px;width:100%;padding:12px;background:var(--green-mid);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">📄 Download PDF Report</button>
  </div>`;
}

function downloadPDFReport() {
  if (typeof html2pdf === 'undefined') {
    showToast('❌ PDF library is loading, try again in a moment.');
    return;
  }
  const element = document.querySelector('.result-box');
  if (!element) return;
  const clone = element.cloneNode(true);
  const btn = clone.querySelector('.pdf-btn');
  if (btn) btn.remove();
  
  clone.style.padding = '30px';
  clone.style.background = '#fff';
  clone.style.color = '#000';
  
  const opt = {
    margin:       10,
    filename:     'CropDr_AI_Diagnostic_Report.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(clone).save();
}

/* ─── Chatbot ─── */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function startNewChat() {
  currentChatSessionId = generateUUID();
  chatHistory = [];
  const container = document.getElementById('chat-messages');
  if (container) {
    container.innerHTML = `
      <div class="chat-msg ai">🌱 Namaste! I'm your CropDr. AI assistant. Ask me anything about crop diseases, treatments, fertilizers, or weather effects. I can respond in Hindi too!</div>
      <div class="chat-msg ai">💡 <strong>Try asking:</strong> "Why is my wheat turning yellow?" or "What should I spray for fungal infection?"</div>
    `;
  }
}

async function loadChatSessions() {
  try {
    const res = await fetch(`${API}/chat/sessions`, { headers: authHeaders() });
    const data = await res.json();
    const listEl = document.getElementById('chat-sessions-list');
    if (!listEl) return;
    
    if (!data.sessions || data.sessions.length === 0) {
      listEl.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:.9rem;">No conversations yet.</div>';
      return;
    }
    
    listEl.innerHTML = data.sessions.map(s => {
      const msgText = s.first_message.length > 40 ? s.first_message.substring(0, 40) + '...' : s.first_message;
      const date = new Date(s.started_at).toLocaleDateString('en-IN', { month:'short', day:'numeric' });
      return `
        <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid var(--border);border-radius:8px;background:#fff;transition:all 0.2s;">
          <div onclick="loadChatSession('${s.session_id}')" style="flex:1;cursor:pointer;">
            <div style="font-size:.75rem;color:var(--muted);margin-bottom:4px;">${date}</div>
            <div style="font-size:.85rem;font-weight:600;color:var(--text);">${msgText}</div>
          </div>
          <button onclick="deleteChatSession('${s.session_id}')" style="background:none;border:none;cursor:pointer;opacity:0.5;padding:4px;font-size:1.1rem;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5" title="Delete Chat">🗑️</button>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to load sessions', err);
  }
}

async function deleteChatSession(sessionId) {
  if (!confirm('Are you sure you want to delete this chat conversation?')) return;
  
  try {
    const res = await fetch(`${API}/chat/history/${sessionId}`, {
      method: 'DELETE',
      headers: authHeaders()
    });
    if (res.ok) {
      if (currentChatSessionId === sessionId) {
        startNewChat();
      }
      loadChatSessions();
    } else {
      console.error('Failed to delete chat.');
    }
  } catch (err) {
    console.error('Failed to delete session', err);
  }
}

async function loadChatSession(sessionId) {
  currentChatSessionId = sessionId;
  try {
    const res = await fetch(`${API}/chat/history/${sessionId}`, { headers: authHeaders() });
    const data = await res.json();
    
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    chatHistory = data.messages || [];
    container.innerHTML = chatHistory.map(msg => `
      <div class="chat-msg ${msg.role === 'user' ? 'user' : 'ai'}">${msg.content}</div>
    `).join('');
    
    const endEl = document.getElementById('chat-end');
    if (endEl) endEl.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    console.error('Failed to load session history', err);
  }
}

async function sendChatMsg() {
  const input = document.getElementById('chat-input-field');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendChatMsg('user', msg);
  chatHistory.push({ role: 'user', content: msg });

  if (!currentChatSessionId) currentChatSessionId = generateUUID();
  const isNewSession = chatHistory.length === 1;

  const langEl = document.querySelector('.lang-switch');
  const language = langEl ? langEl.options[langEl.selectedIndex].text : 'English';

  const typingEl = appendChatMsg('ai', '🌱 Thinking...');
  try {
    const res  = await fetch(`${API}/chat`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ message: msg, history: chatHistory.slice(-10), language: language, sessionId: currentChatSessionId }),
    });
    const data = await res.json();
    const reply = data.reply || '⚠️ Could not get a response.';
    
    if (data.sessionId) currentChatSessionId = data.sessionId;
    
    typingEl.textContent = reply;
    chatHistory.push({ role: 'assistant', content: reply });
    
    if (isNewSession) loadChatSessions();
  } catch {
    typingEl.textContent = '⚠️ Connection error. Is the backend running?';
  }
  const endEl = document.getElementById('chat-end');
  if (endEl) endEl.scrollIntoView({ behavior: 'smooth' });
}

function quickChat(msg) {
  const input = document.getElementById('chat-input-field');
  if (input) {
    input.value = msg;
    sendChatMsg();
  }
}

function appendChatMsg(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return null;
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.textContent = text;
  container.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth' });
  return div;
}

/* ─── Weather Widget (live from backend) ─── */
async function loadWeatherWidget() {
  try {
    const location = currentUser?.location || 'Maharashtra';
    const res  = await fetch(`${API}/weather?location=${encodeURIComponent(location)}`);
    const w    = await res.json();
    if (!res.ok) return;

    // Overview widget
    const ovEl = document.querySelector('#dtab-overview .weather-widget');
    if (ovEl) {
      ovEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div class="weather-temp">${w.temp}°C</div>
            <div class="weather-condition">${w.conditionEmoji} ${w.condition} · ${w.location}</div>
          </div>
          <div style="text-align:right;font-size:.82rem;opacity:.8;">Humidity: ${w.humidity}%<br>Rainfall: ${w.rainfall}mm</div>
        </div>
        <div class="weather-risk">
          <div class="weather-risk-title">🦠 Disease Risk: <span style="color:${w.diseaseRiskColor};">${w.diseaseRisk.toUpperCase()}</span></div>
          <div class="weather-risk-desc">${w.riskReason}</div>
        </div>`;
    }

    // Full weather tab
    const tempEl = document.querySelector('#dtab-weather .weather-temp');
    if (tempEl) {
      tempEl.textContent = `${w.temp}°C`;
      const condEl = document.querySelector('#dtab-weather .weather-condition');
      if (condEl) condEl.textContent = `${w.condition} · Humidity ${w.humidity}% · Rainfall ${w.rainfall}mm`;
      
      const forecastContainer = document.getElementById('weather-tab-forecast');
      if (forecastContainer && w.forecast) {
        forecastContainer.innerHTML = w.forecast.map(f => `
          <div style="flex:1;min-width:70px;text-align:center;background:var(--gray-50);padding:12px;border-radius:8px;border:1px solid var(--border);">
            <div style="font-weight:700;font-size:.85rem;margin-bottom:6px;">${f.label}</div>
            <div style="font-size:1.8rem;margin-bottom:4px;">${f.emoji}</div>
            <div style="font-weight:800;color:var(--text);">${f.temp}°C</div>
            <div style="font-size:.7rem;color:var(--muted);margin-top:4px;">Rain: ${f.rainfall}mm</div>
          </div>
        `).join('');
      }
    }

    // Process dynamic AI alerts
    if (w.alerts && w.alerts.length > 0) {
      // 1. Overview Banner
      const ovAlertsContainer = document.getElementById('overview-alerts-container');
      if (ovAlertsContainer) {
        const topAlert = w.alerts[0];
        const isHigh = topAlert.severity === 'High' || topAlert.severity === 'Severe';
        const bg = isHigh ? 'linear-gradient(135deg,#c0392b,#e74c3c)' : 'linear-gradient(135deg,#d35400,#e67e22)';
        ovAlertsContainer.innerHTML = `
          <div style="background:${bg};border-radius:var(--radius-lg);padding:18px 22px;color:#fff;display:flex;gap:16px;align-items:center;margin-bottom:24px;">
            <span style="font-size:2rem;">${isHigh ? '🚨' : '⚠️'}</span>
            <div style="flex:1;"><div style="font-weight:700;font-size:1rem;">Active Alert: ${topAlert.title}</div><div style="font-size:.85rem;opacity:.85;margin-top:2px;">${topAlert.message}</div></div>
            <button style="background:rgba(255,255,255,.2);color:#fff;padding:8px 16px;border-radius:8px;font-weight:700;font-size:.85rem;border:none;cursor:pointer;" onclick="dashTab('chatbot'); quickChat('What should I do about the ${topAlert.title}?')">Ask AI</button>
          </div>
        `;
      }

      // 2. Alerts Tab
      const alertsTabContainer = document.getElementById('alerts-tab-container');
      if (alertsTabContainer) {
        alertsTabContainer.innerHTML = w.alerts.map(a => `
          <div class="alert-item">
            <div class="alert-dot" style="background:${a.severity === 'High' ? 'var(--danger)' : 'var(--amber)'};"></div>
            <span class="alert-icon">${a.severity === 'High' ? '🚨' : '⚠️'}</span>
            <div><div class="alert-title">${a.title}</div><div style="font-size:.84rem;color:var(--text);margin:3px 0 4px;">${a.message}</div><div class="alert-time">${a.timeAgo || 'Just now'} · ${w.location}</div></div>
          </div>
        `).join('');
      }
    } else {
      const ovAlertsContainer = document.getElementById('overview-alerts-container');
      if (ovAlertsContainer) ovAlertsContainer.innerHTML = '';

      const alertsTabContainer = document.getElementById('alerts-tab-container');
      if (alertsTabContainer) alertsTabContainer.innerHTML = '<div style="text-align:center;color:var(--muted);padding:20px;font-size:.9rem;">No active alerts. Weather conditions are favorable!</div>';
    }
  } catch (err) { console.error('Failed to load weather widget', err); }
}

/* ─── Scan History (from DB) ─── */
async function loadScansHistory() {
  try {
    const res  = await fetch(`${API}/scans`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) return;

    const { scans, stats } = data;

    // Update stats cards
    const statEls = document.querySelectorAll('.stat-value');
    if (statEls[1]) statEls[1].textContent = stats.totalScans;

    // Build history table rows
    const tbody = document.querySelector('#dtab-history .history-table tbody') ||
                  document.querySelector('#dtab-history .history-table');
    if (!tbody || !scans.length) return;

    const rows = scans.map(s => {
      const date = new Date(s.createdAt).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' });
      const sevClass = { Early:'badge-green', Moderate:'badge-amber', Severe:'badge-danger', None:'badge-green' }[s.severityLevel] || 'badge-amber';
      const status = s.diseaseDetected === 'Healthy' ? '<span class="status-pill status-resolved">Healthy</span>' : '<span class="status-pill status-recovering">Logged</span>';
      return `<tr>
        <td>${date}</td>
        <td>${s.cropType}</td>
        <td>${s.diseaseDetected}</td>
        <td>${s.confidenceScore}%</td>
        <td><span class="badge ${sevClass}">${s.severityLevel}</span></td>
        <td>${s.result?.chemicalTreatments?.[0] || '—'}</td>
        <td>${status}</td>
      </tr>`;
    }).join('');

    // Replace existing hardcoded rows
    const headerRow = '<tr><th>Date</th><th>Crop</th><th>Disease</th><th>Confidence</th><th>Severity</th><th>Treatment</th><th>Status</th></tr>';
    tbody.innerHTML = headerRow + rows;

    // Also update the overview recent scans
    const overviewTable = document.querySelector('#dtab-overview .history-table');
    if (overviewTable) {
      const recentRows = scans.slice(0,3).map(s => {
        const date = new Date(s.createdAt).toLocaleDateString('en-IN', { month:'short', day:'numeric' });
        const sevClass = { Early:'badge-green', Moderate:'badge-amber', Severe:'badge-danger', None:'badge-green' }[s.severityLevel] || 'badge-amber';
        return `<tr><td>${date}</td><td>${s.cropType}</td><td>${s.diseaseDetected}</td><td><span class="badge ${sevClass}">${s.severityLevel}</span></td><td><span class="status-pill status-recovering">Logged</span></td></tr>`;
      }).join('');
      overviewTable.innerHTML = '<tr><th>Date</th><th>Crop</th><th>Disease</th><th>Severity</th><th>Status</th></tr>' + recentRows;
    }
  } catch { /* silently fail */ }
}
