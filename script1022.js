/*네비게이션 메뉴 눌렀을 때 이동하는 화면이 부드럽게 되는 거*/
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.navbar a[href^="#"]');

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

function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", setVh);
setVh();

document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.querySelector(".minimal-nav button");
  const indexSection = document.querySelector("#index");

  navButton.addEventListener("click", () => {
    // 부드러운 스크롤
    indexSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  // 현재 스크롤 위치에 따른 네비게이션 스타일 변경
  window.addEventListener("scroll", () => {
    const navIndicator = document.querySelector(".minimal-nav");
    const scrollPosition = window.scrollY;

    // 각 섹션의 위치 확인
    const aboutSection = document.querySelector("#about");
    const aboutTop = aboutSection.offsetTop;
    const indexTop = indexSection.offsetTop;

    // 스크롤 위치에 따라 클래스 추가/제거
    if (scrollPosition >= indexTop) {
      navIndicator.classList.add("in-index");
      navIndicator.classList.remove("in-about");
    } else if (scrollPosition >= aboutTop) {
      navIndicator.classList.add("in-about");
      navIndicator.classList.remove("in-index");
    } else {
      navIndicator.classList.remove("in-about", "in-index");
    }
  });
});

/*스킬 프로그레스 바*/

let hasAnimated = false; // 애니메이션 실행 여부를 추적

function startAnimation() {
  if (hasAnimated) return; // 이미 애니메이션이 실행됐다면 중복 실행 방지

  const container = document.querySelector(".skill-progress-container");
  container.classList.add("visible"); // 컨테이너를 보이게 함

  const bars = document.querySelectorAll(".skill-bar-fill");
  bars.forEach((bar, index) => {
    const level = bar.getAttribute("data-level");
    setTimeout(() => {
      bar.style.width = level + "%";
    }, index * 200);
  });

  hasAnimated = true; // 애니메이션 실행 완료 표시
}

// IntersectionObserver 설정
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        // 보이게 되고 아직 애니메이션이 실행되지 않았을 때만
        startAnimation();
      }
    });
  },
  {
    threshold: 0.3, // 30% 이상 보일 때 실행
  }
);

// DOM이 로드된 후 observer 시작
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".skill-progress-container");
  observer.observe(container);
});
