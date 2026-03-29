const clothesData = [
  { id: 1, name: "화이트 셔츠", tempRange: [15, 25], purposes: ["office"], weather: ["sunny"], imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35", desc: "깔끔한 셔츠" }
];
const initTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") { document.body.setAttribute("data-theme", "dark"); document.getElementById("theme-btn").textContent = "☀️"; }
};
document.getElementById("theme-btn").addEventListener("click", () => {
  const isDark = document.body.hasAttribute("data-theme");
  if (isDark) { document.body.removeAttribute("data-theme"); document.getElementById("theme-btn").textContent = "🌙"; localStorage.setItem("theme", "light"); }
  else { document.body.setAttribute("data-theme", "dark"); document.getElementById("theme-btn").textContent = "☀️"; localStorage.setItem("theme", "dark"); }
});
document.getElementById("recommend-btn").addEventListener("click", () => {
  const results = document.getElementById("results");
  results.innerHTML = "<h3>추천 결과가 생성되었습니다!</h3>";
});
initTheme();
