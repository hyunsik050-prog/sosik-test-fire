// Data
const clothesData = [
  { id: 1, name: "화이트 셔츠 & 슬랙스", tempRange: [15, 25], purposes: ["office", "date"], weather: ["sunny", "cloudy"], imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", desc: "깔끔하고 세련된 무드를 주는 화이트 셔츠 세트입니다." },
  { id: 2, name: "포근한 오버핏 니트", tempRange: [5, 15], purposes: ["casual", "date"], weather: ["sunny", "cloudy", "snowy"], imageUrl: "https://images.unsplash.com/photo-1576185055363-0d8193443a0d?q=80&w=800&auto=format&fit=crop", desc: "쌀쌀한 날씨에 제격인 포근한 니트 아이템입니다." },
  { id: 3, name: "플로럴 원피스", tempRange: [22, 35], purposes: ["date", "casual"], weather: ["sunny"], imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop", desc: "화창한 날씨와 어울리는 화사한 원피스입니다." },
  { id: 4, name: "기능성 바람막이", tempRange: [10, 25], purposes: ["exercise", "casual"], weather: ["cloudy", "rainy"], imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", desc: "활동성을 높여주는 가벼운 바람막이 점퍼입니다." },
  { id: 5, name: "롱 울 코트", tempRange: [-10, 10], purposes: ["office", "date"], weather: ["sunny", "cloudy", "snowy"], imageUrl: "https://images.unsplash.com/photo-1539533397308-a6144c414a92?q=80&w=800&auto=format&fit=crop", desc: "추운 겨울에도 스타일을 유지해주는 울 코트입니다." }
];

// Elements
const themeBtn = document.getElementById('theme-btn');
const weatherBtns = document.querySelectorAll('.weather-btn');
const recommendBtn = document.getElementById('recommend-btn');
const resultsContainer = document.getElementById('results');

let selectedWeather = 'sunny';

// Theme Toggle logic
const setTheme = (isDark) => {
  if (isDark) {
    document.body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
};

// Init Theme
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme === 'dark' || (!savedTheme && systemDark));

themeBtn.addEventListener('click', () => {
  const isDark = document.body.hasAttribute('data-theme');
  setTheme(!isDark);
});

// Weather selection
weatherBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    weatherBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedWeather = btn.dataset.weather;
  });
});

// Recommendation logic
recommendBtn.addEventListener('click', () => {
  const temp = parseInt(document.getElementById('temp').value);
  const purpose = document.getElementById('purpose').value;

  const filtered = clothesData.filter(item => {
    return temp >= item.tempRange[0] && 
           temp <= item.tempRange[1] && 
           item.purposes.includes(purpose) &&
           item.weather.includes(selectedWeather);
  });

  resultsContainer.innerHTML = '';
  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<div class="placeholder-text">딱 맞는 옷이 없어요! 조건을 조금 바꿔볼까요?</div>';
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'clothes-card';
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <div class="info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
});
