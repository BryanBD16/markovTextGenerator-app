// AJoute le header centralisé
document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.getElementById("header");

  // 1. Charger le contenu du header
  const resp = await fetch("header.html");
  headerContainer.innerHTML = await resp.text();

  // 2. Mettre la classe active sur le lien qui correspond à la page
  const currentPage = window.location.pathname.split("/").pop(); // ex: "about.html"
  headerContainer.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href").endsWith(currentPage)) {
    link.classList.add("active");
  }
  });
});