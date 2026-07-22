(function () {
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var root = document.documentElement;
    var current =
      root.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    var next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
})();
