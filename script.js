/**
 * =====================================================================
 * Cx Store - Script de Interatividade Premium
 * =====================================================================
 * 
 * Funcionalidades:
 * - Contador de carrinho com animações
 * - Botão de voltar ao topo
 * - Animações de entrada dos elementos
 * - Feedback visual ao adicionar produtos
 * - Menu mobile responsivo
 * - Newsletter
 */

// ======================= INICIALIZAÇÃO =======================
document.addEventListener("DOMContentLoaded", function () {
  initCart();
  initBackToTop();
  initScrollAnimations();
  initNewsletter();
  initMobileMenu();
});

// ======================= CARRINHO DE COMPRAS =======================
function initCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartCountElement = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-icon");
  let cartCount = 0;

  /**
   * Atualiza o contador do carrinho com animação
   */
  function updateCartCount() {
    cartCountElement.textContent = cartCount;
    
    if (cartCount > 0) {
      cartCountElement.classList.add('active');
      // Animação de pulse no ícone do carrinho
      cartIcon.style.animation = 'none';
      setTimeout(() => {
        cartIcon.style.animation = 'bounceIn 0.5s';
      }, 10);
    } else {
      cartCountElement.classList.remove('active');
    }
  }

  /**
   * Anima o botão e fornece feedback visual
   * @param {HTMLElement} button - Botão clicado
   */
  function animateButton(button) {
    const originalHTML = button.innerHTML;
    const productCard = button.closest('.product-card');
    
    // Altera o botão para o estado "adicionado"
    button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
    button.classList.add('added');
    button.disabled = true;

    // Adiciona animação ao card do produto
    productCard.style.animation = 'bounceIn 0.6s';

    // Restaura o estado original após 2 segundos
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('added');
      button.disabled = false;
      productCard.style.animation = '';
    }, 2000);
  }

  /**
   * Mostra notificação de produto adicionado
   */
  function showNotification() {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Produto adicionado ao carrinho!</span>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #51cf66;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-weight: 600;
      animation: slideInRight 0.5s;
    `;

    document.body.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // Adiciona event listener a cada botão
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      
      // Incrementa o contador
      cartCount++;
      
      // Atualiza a interface
      updateCartCount();
      animateButton(this);
      showNotification();
    });
  });
}

// ======================= BOTÃO VOLTAR AO TOPO =======================
function initBackToTop() {
  const backToTopButton = document.querySelector(".back-to-top");
  
  /**
   * Mostra/esconde o botão baseado na posição do scroll
   */
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }

  // Event listener para scroll
  window.addEventListener('scroll', toggleBackToTop);

  // Event listener para clique no botão
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ======================= ANIMAÇÕES DE SCROLL =======================
function initScrollAnimations() {
  /**
   * Observer para animar elementos quando entram no viewport
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observa todos os cards de produto
  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observa seções
  document.querySelectorAll('.section-title').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });
}

// ======================= NEWSLETTER =======================
function initNewsletter() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Feedback visual
      submitButton.textContent = 'Inscrevendo...';
      submitButton.disabled = true;
      
      // Simula envio (aqui você conectaria com seu backend)
      setTimeout(() => {
        submitButton.textContent = '✓ Inscrito!';
        submitButton.style.background = '#51cf66';
        emailInput.value = '';
        
        // Restaura o estado original
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          submitButton.style.background = '';
          submitButton.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
}

// ======================= MENU MOBILE =======================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      
      // Altera o ícone
      const icon = menuToggle.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
}

// ======================= ANIMAÇÕES CSS ADICIONAIS =======================
// Adiciona estilos de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .main-nav.active {
    display: block !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 1rem;
  }

  .main-nav.active ul {
    flex-direction: column;
    gap: 1rem;
  }
`;
document.head.appendChild(style);
