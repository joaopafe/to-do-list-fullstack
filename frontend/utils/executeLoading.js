async function executeLoading() {
  document.getElementById("loading-icon").style.display = "block";

  setTimeout(function () {
    document.getElementById("loading-icon").style.display = "none";
  }, 2_000);
}
