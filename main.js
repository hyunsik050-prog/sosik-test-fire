// Clothing Recommendation Data
const clothesData = [
  {
    id: 1,
    name: "화이트 셔츠 & 슬랙스",
    tempRange: [15, 25],
    purposes: ["office", "date"],
    weather: ["sunny", "cloudy"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    desc: "깔끔하고 세련된 무드를 주는 화이트 셔츠 세트입니다."
  },
  {
    id: 2,
    name: "포근한 오버핏 니트",
    tempRange: [5, 15],
    purposes: ["casual", "date"],
    weather: ["sunny", "cloudy", "snowy"],
    imageUrl: "https://images.unsplash.com/photo-1576185055363-0d8193443a0d?q=80&w=800&auto=format&fit=crop",
    desc: "쌀쌀한 날씨에 제격인 포근한 니트 아이템입니다."
  },
  {
    id: 3,
    name: "플로럴 원피스",
    tempRange: [22, 35],
    purposes: ["date", "casual"],
    weather: ["sunny"],
    imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    desc: "화창한 날씨와 어울리는 화사한 원피스입니다."
  },
  {
    id: 4,
    name: "기능성 바람막이",
    tempRange: [10, 25],
    purposes: ["exercise", "casual"],
    weather: ["cloudy", "rainy"],
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    desc: "활동성을 높여주는 가벼운 바람막이 점퍼입니다."
  },
  {
    id: 5,
    name: "롱 울 코트",
    tempRange: [-10, 10],
    purposes: ["office", "date"],
    weather: ["sunny", "cloudy", "snowy"],
    imageUrl: "https://images.unsplash.com/photo-1539533397308-a6144c414a92?q=80&w=800&auto=format&fit=crop",
    desc: "추운 겨울에도 스타일을 유지해주는 울 코트입니다."
  },
  {
    id: 6,
    name: "린넨 셋업",
    tempRange: [25, 40],
    purposes: ["office", "casual"],
    weather: ["sunny"],
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    desc: "더운 여름 통기성이 좋은 시원한 린넨 소재입니다."
  },
  {
    id: 7,
    name: "트렌치 코트",
    tempRange: [12, 20],
    purposes: ["office", "date", "casual"],
    weather: ["cloudy", "rainy"],
    imageUrl: "https://images.unsplash.com/photo-1580733078004-d7b8c96c43e2?q=80&w=800&auto=format&fit=crop",
    desc: "가을 분위기를 물씬 풍기는 분위기 있는 트렌치 코트입니다."
  },
  {
    id: 8,
    name: "후드티 & 조거팬츠",
    tempRange: [10, 22],
    purposes: ["casual", "exercise"],
    weather: ["sunny", "cloudy", "rainy"],
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    desc: "편안한 활동을 위한 스트릿 무드의 세트입니다."
  },
  {
    id: 9,
    name: "레더 자켓 & 데님",
    tempRange: [10, 18],
    purposes: ["casual", "date"],
    weather: ["sunny", "cloudy"],
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    desc: "시크하고 멋스러운 분위기를 연출하는 레더 자켓 룩입니다."
  },
  {
    id: 10,
    name: "퍼 자켓 & 스커트",
    tempRange: [-5, 8],
    purposes: ["date", "office"],
    weather: ["sunny", "cloudy", "snowy"],
    imageUrl: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=800&auto=format&fit=crop",
    desc: "화려하고 따뜻한 퍼 자켓으로 포인트를 준 코디입니다."
  }
];

// State
let selectedWeather = "sunny";

// DOM Elements
const tempInput = document.getElementById("temp");
const purposeSelect = document.getElementById("purpose");
const weatherBtns = document.querySelectorAll(".weather-btn");
const recommendBtn = document.getElementById("recommend-btn");
const resultsContainer = document.getElementById("results");
const themeBtn = document.getElementById("theme-btn");

// Theme Toggle
themeBtn.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.body.removeAttribute("data-theme");
    themeBtn.textContent = "🌓";
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
  }
});

// Event Listeners
weatherBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    weatherBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedWeather = btn.dataset.weather;
  });
});

recommendBtn.addEventListener("click", () => {
  const temp = parseInt(tempInput.value);
  const purpose = purposeSelect.value;

  recommendClothes(temp, purpose, selectedWeather);
});

function recommendClothes(temp, purpose, weather) {
  // Filter logic
  const filtered = clothesData.filter(item => {
    const isTempMatch = temp >= item.tempRange[0] && temp <= item.tempRange[1];
    const isPurposeMatch = item.purposes.includes(purpose);
    const isWeatherMatch = item.weather.includes(weather);
    return isTempMatch && isPurposeMatch && isWeatherMatch;
  });

  // If no exact match, relax weather constraint
  let finalResults = filtered;
  if (finalResults.length === 0) {
    finalResults = clothesData.filter(item => {
        const isTempMatch = temp >= item.tempRange[0] && temp <= item.tempRange[1];
        const isPurposeMatch = item.purposes.includes(purpose);
        return isTempMatch && isPurposeMatch;
    });
  }

  displayResults(finalResults);
}

function displayResults(items) {
  resultsContainer.innerHTML = "";

  if (items.length === 0) {
    resultsContainer.innerHTML = '<div class="placeholder-text">조건에 맞는 옷을 찾지 못했어요. 조건을 조금 바꿔볼까요?</div>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "clothes-card";
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <div class="info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}
