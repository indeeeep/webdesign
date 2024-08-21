/*네비게이션 메뉴 눌렀을 때 이동하는 화면이 부드럽게 되는 거*/
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.bd-navigation a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
