import { simulateGPTResponse } from './simulateGPT.js';

document.addEventListener("DOMContentLoaded", function() {
  // Section Navigation
  const sections = {
    chat: document.getElementById('section-chat'),
    calendar: document.getElementById('section-calendar'),
    dashboard: document.getElementById('section-dashboard'),
    finance: document.getElementById('section-finance'),
    consistency: document.getElementById('section-consistency'),
    hashtags: document.getElementById('section-hashtags')
  };

  document.getElementById('nav-chat').addEventListener('click', () => showSection('chat'));
  document.getElementById('nav-calendar').addEventListener('click', () => showSection('calendar'));
  document.getElementById('nav-dashboard').addEventListener('click', () => showSection('dashboard'));
  document.getElementById('nav-finance').addEventListener('click', () => showSection('finance'));
  document.getElementById('nav-consistency').addEventListener('click', () => showSection('consistency'));

  function showSection(sectionKey) {
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[sectionKey].classList.remove('hidden');
  }

  // Chat Module
  const chatContainer = document.getElementById('chat-container');
  const nicheInput = document.getElementById('niche-input');
  const hashtagInput = document.getElementById('hashtag-input');
  const nicheSubmit = document.getElementById('niche-submit');
  const hashtagSubmit = document.getElementById('hashtag-submit');

  // Load saved hashtags from localStorage
  let savedHashtags = localStorage.getItem('savedHashtags') || '';

  hashtagSubmit.addEventListener('click', () => {
    savedHashtags = hashtagInput.value.trim();
    localStorage.setItem('savedHashtags', savedHashtags);
    alert('Hashtags saved!');
  });

  function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ' + sender;
    messageDiv.textContent = message;
    // Append timestamp
    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = " " + new Date().toLocaleTimeString();
    messageDiv.appendChild(timestampSpan);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Simulate typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message meco typing';
    typingDiv.textContent = "meco is typing...";
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingDiv;
  }

  nicheSubmit.addEventListener('click', () => {
    const userInput = nicheInput.value.trim();
    if (!userInput) return;
    appendMessage("You: " + userInput, "user");
    nicheInput.value = '';

    // Show typing indicator and simulate delay before responding
    const typingIndicator = showTypingIndicator();
    setTimeout(() => {
      typingIndicator.remove();
      let mecoResponse = simulateGPTResponse(userInput);
      if (savedHashtags) {
        mecoResponse += " " + savedHashtags.split(',').map(tag => `#${tag.trim()}`).join(' ');
      }
      appendMessage("meco: " + mecoResponse, "meco");
    }, 1500); // 1.5-second delay
  });

  // Calendar Module
  let calendarEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
  const calendarForm = document.getElementById('calendar-form');
  const calendarEventsList = document.getElementById('calendar-events');

  calendarForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('event-date').value;
    const title = document.getElementById('event-title').value;
    if (date && title) {
      calendarEvents.push({ date, title });
      localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
      renderCalendarEvents();
      calendarForm.reset();
    }
  });

  function renderCalendarEvents() {
    calendarEventsList.innerHTML = '';
    calendarEvents.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.date}: ${event.title}`;
      calendarEventsList.appendChild(li);
    });
  }
  renderCalendarEvents();

  // Analytics Module
  let analyticsDataPoints = JSON.parse(localStorage.getItem('analyticsDataPoints')) || [];
  const analyticsForm = document.getElementById('analytics-form');
  const analyticsCtx = document.getElementById('analyticsChart').getContext('2d');

  analyticsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('analytics-date').value;
    const likes = parseInt(document.getElementById('likes').value);
    const views = parseInt(document.getElementById('views').value);
    const engagements = parseInt(document.getElementById('engagements').value);
    if (date && !isNaN(likes) && !isNaN(views) && !isNaN(engagements)) {
      analyticsDataPoints.push({ date, likes, views, engagements });
      localStorage.setItem('analyticsDataPoints', JSON.stringify(analyticsDataPoints));
      updateAnalyticsChart();
      analyticsForm.reset();
    }
  });

  let analyticsChart = new Chart(analyticsCtx, {
    type: 'line',
    data: {
      labels: analyticsDataPoints.map(dp => dp.date),
      datasets: [{
        label: 'Likes',
        data: analyticsDataPoints.map(dp => dp.likes),
        borderWidth: 2,
        fill: false,
        borderColor: 'blue'
      }, {
        label: 'Views',
        data: analyticsDataPoints.map(dp => dp.views),
        borderWidth: 2,
        fill: false,
        borderColor: 'green'
      }, {
        label: 'Engagements',
        data: analyticsDataPoints.map(dp => dp.engagements),
        borderWidth: 2,
        fill: false,
        borderColor: 'red'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  function updateAnalyticsChart() {
    analyticsChart.data.labels = analyticsDataPoints.map(dp => dp.date);
    analyticsChart.data.datasets[0].data = analyticsDataPoints.map(dp => dp.likes);
    analyticsChart.data.datasets[1].data = analyticsDataPoints.map(dp => dp.views);
    analyticsChart.data.datasets[2].data = analyticsDataPoints.map(dp => dp.engagements);
    analyticsChart.update();
  }

  // Finance Module
  let financeEntries = JSON.parse(localStorage.getItem('financeEntries')) || [];
  const financeForm = document.getElementById('finance-form');
  const financeEntriesList = document.getElementById('finance-entries');
  const financeCtx = document.getElementById('financeChart').getContext('2d');
  const financeAdvice = document.getElementById('finance-advice');

  financeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('finance-date').value;
    const cost = parseFloat(document.getElementById('cost').value);
    const revenue = parseFloat(document.getElementById('revenue').value);
    if (date && !isNaN(cost) && !isNaN(revenue)) {
      financeEntries.push({ date, cost, revenue });
      localStorage.setItem('financeEntries', JSON.stringify(financeEntries));
      renderFinanceEntries();
      updateFinanceChart();
      updateFinanceAdvice();
      financeForm.reset();
    }
  });

  function renderFinanceEntries() {
    financeEntriesList.innerHTML = '';
    financeEntries.forEach(entry => {
      const profit = entry.revenue - entry.cost;
      const li = document.createElement('li');
      li.textContent = `${entry.date} - Cost: $${entry.cost.toFixed(2)}, Revenue: $${entry.revenue.toFixed(2)}, Profit: $${profit.toFixed(2)}`;
      financeEntriesList.appendChild(li);
    });
  }
  renderFinanceEntries();

  let financeChart = new Chart(financeCtx, {
    type: 'line',
    data: {
      labels: financeEntries.map(entry => entry.date),
      datasets: [{
        label: 'Cost',
        data: financeEntries.map(entry => entry.cost),
        borderWidth: 2,
        fill: false,
        borderColor: 'orange'
      }, {
        label: 'Revenue',
        data: financeEntries.map(entry => entry.revenue),
        borderWidth: 2,
        fill: false,
        borderColor: 'purple'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  function updateFinanceChart() {
    financeChart.data.labels = financeEntries.map(entry => entry.date);
    financeChart.data.datasets[0].data = financeEntries.map(entry => entry.cost);
    financeChart.data.datasets[1].data = financeEntries.map(entry => entry.revenue);
    financeChart.update();
  }

  function updateFinanceAdvice() {
    const totalCost = financeEntries.reduce((sum, entry) => sum + entry.cost, 0);
    const totalRevenue = financeEntries.reduce((sum, entry) => sum + entry.revenue, 0);
    const overallProfit = totalRevenue - totalCost;
    let advice = `Total Profit: $${overallProfit.toFixed(2)}. `;
    advice += overallProfit < 0
      ? "You're incurring losses. Consider reducing costs or boosting revenue."
      : "Great job! You're in profit. Consider reinvesting to grow further.";
    financeAdvice.textContent = advice;
  }
  updateFinanceAdvice();

  // Consistency Module
  let publishedPosts = JSON.parse(localStorage.getItem('publishedPosts')) || [];
  const postForm = document.getElementById('post-form');
  const consistencyData = document.getElementById('consistency-data');
  const consistencyCtx = document.getElementById('consistencyChart').getContext('2d');

  postForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('post-date').value;
    if (date) {
      publishedPosts.push(date);
      localStorage.setItem('publishedPosts', JSON.stringify(publishedPosts));
      updateConsistencyData();
      postForm.reset();
    }
  });

  // Initialize consistencyChart
  window.consistencyChart = new Chart(consistencyCtx, {
    type: 'bar',
    data: {
      labels: ['This Week', 'Last Week', '2 Weeks Ago', '3 Weeks Ago'],
      datasets: [{
        label: 'Posts Published',
        data: [0, 0, 0, 0],
        borderWidth: 2,
        backgroundColor: 'rgba(63,81,181,0.5)',
        borderColor: 'rgba(63,81,181,1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  function updateConsistencyData() {
    const now = new Date();
    let weeklyCounts = [0, 0, 0, 0]; // [This Week, Last Week, 2 Weeks Ago, 3 Weeks Ago]
    publishedPosts.forEach(dateStr => {
      const postDate = new Date(dateStr);
      const diffDays = (now - postDate) / (1000 * 60 * 60 * 24);
      const weekIndex = Math.floor(diffDays / 7);
      if (weekIndex < 4) {
        weeklyCounts[weekIndex]++;
      }
    });
    consistencyData.innerHTML = `
      <p>This Week: ${weeklyCounts[0]} posts</p>
      <p>Last Week: ${weeklyCounts[1]} posts</p>
      <p>2 Weeks Ago: ${weeklyCounts[2]} posts</p>
      <p>3 Weeks Ago: ${weeklyCounts[3]} posts</p>
    `;
    updateConsistencyChart(weeklyCounts);
  }

  function updateConsistencyChart(weeklyCounts) {

    if (window.consistencyChart && window.consistencyChart.data.datasets) {
      window.consistencyChart.data.datasets[0].data = weeklyCounts; 
      window.consistencyChart.update();
    } else {
      window.consistencyChart = new Chart(consistencyCtx, {
        type: 'bar',
        data: {
          labels: ['This Week', 'Last Week', '2 Weeks Ago', '3 Weeks Ago'],
          datasets: [{
            label: 'Posts Published',
            data: weeklyCounts,
            borderWidth: 2,
            backgroundColor: 'rgba(63,81,181,0.5)',
            borderColor: 'rgba(63,81,181,1)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }
  updateConsistencyData();
});