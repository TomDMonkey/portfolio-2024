document.addEventListener("DOMContentLoaded", function() {
    class StickyNavigation {
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 70;
            let self = this;
            $('.et-hero-tab').click(function (event) {
                self.onTabClick(event, $(this));
            });
            $(window).scroll(() => {
                this.onScroll();
            });
            $(window).resize(() => {
                this.onResize();
            });
        }

        onTabClick(event, element) {
            event.preventDefault();
            let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
            $('html, body').animate({ scrollTop: scrollTop }, 600);
        }

        onScroll() {
            this.checkTabContainerPosition();
            this.findCurrentTabSelector();
        }

        onResize() {
            if (this.currentId) {
                this.setSliderCss();
            }
        }

        checkTabContainerPosition() {
            let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
            if ($(window).scrollTop() > offset) {
                $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
            } else {
                $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
            }
        }

        findCurrentTabSelector() {
            let newCurrentId;
            let newCurrentTab;
            let self = this;
            $('.et-hero-tab').each(function () {
                let id = $(this).attr('href');
                let offsetTop = $(id).offset().top - self.tabContainerHeight;
                let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
                if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                    newCurrentId = id;
                    newCurrentTab = $(this);
                }
            });
            if (this.currentId !== newCurrentId || this.currentId === null) {
                this.currentId = newCurrentId;
                this.currentTab = newCurrentTab;
                this.setSliderCss();
            }
        }

        setSliderCss() {
            let width = 0;
            let left = 0;
            if (this.currentTab) {
                width = this.currentTab.css('width');
                left = this.currentTab.offset().left;
            }
            $('.et-hero-tab-slider').css('width', width);
            $('.et-hero-tab-slider').css('left', left);
        }
    }

    new StickyNavigation();
});


class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end } = this.queue[i];
        let char = this.queue[i].char; // Changed from destructuring
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      }
      this.frameRequest = requestAnimationFrame(this.update); // Added requestAnimationFrame
      this.frame++; // Increment frame counter
    }
  
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  // Example
  const phrases = [
    "J'ai 20 ans",
    "Et je suis étudiant ",
    "en formation d'ingénieur au CNAM.",
    "Voici mon portfolio.",
    "Bonne visite !",
  ];
  
  const el = document.querySelector(".text");
  const fx = new TextScramble(el);
  
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2000);
    });
    counter = (counter + 1) % phrases.length;
  };
  
  next();
  
  // Scroll
$(function () {
    $("a[href*=#]").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $($(this).attr("href")).offset().top },
        500,
        "linear"
      );
    });
  });
  


// Fonction pour animer le défilement du texte dans un textarea
function animateTextWhenVisible(textArea) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateText(textArea);
        observer.unobserve(textArea);
      }
    });
  });

  observer.observe(textArea);
}

// Fonction pour animer le défilement du texte dans un textarea
function animateText(textArea) {
  let text = textArea.value; // Récupère le texte contenu dans le textarea
  let to = text.length; // Définit la longueur totale du texte
  let from = 0; // Valeur de départ de l'animation

  animate({
      duration: 20000, // Durée totale de l'animation en millisecondes
      timing: bounce, // Fonction de timing pour contrôler la progression de l'animation
      draw: function (progress) {
          let result = to * progress + from; // Calcule la valeur actuelle du texte
          textArea.value = text.slice(0, Math.ceil(result)); // Met à jour le contenu du textarea
          textArea.scrollTop = textArea.scrollHeight; // Fait défiler le textarea vers le bas
      },
  });
}

// Fonction de timing personnalisée pour l'animation
function bounce(timeFraction) {
  for (let a = 0, b = 1; ; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
          return (
              -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) +
              Math.pow(b, 2)
          );
      }
  }
}

// Appelle la fonction animateTextWhenVisible lorsque la page est entièrement chargée
window.onload = function () {
  animateTextWhenVisible(document.getElementById("textExample2"));
};
