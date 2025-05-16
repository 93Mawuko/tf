document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader-wrapper').classList.add('fade-out');
        setTimeout(function() {
            document.querySelector('.loader-wrapper').style.display = 'none';
        }, 500);
    }, 1000);

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Filter Products
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modal = document.querySelector('.quick-view-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('img').src;
            const productRating = productCard.querySelector('.rating-count').textContent;
            
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="modal-product">
                    <div class="modal-product-image">
                        <img src="${productImage}" alt="${productTitle}">
                    </div>
                    <div class="modal-product-info">
                        <h2>${productTitle}</h2>
                        <div class="modal-product-rating">
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="rating-count">${productRating}</span>
                        </div>
                        <div class="modal-product-price">
                            <span class="current-price">${productPrice}</span>
                        </div>
                        <p class="modal-product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        <div class="modal-product-actions">
                            <button class="btn btn-primary add-to-cart-btn">Ajouter au panier</button>
                            <button class="btn btn-outline">Ajouter à la liste</button>
                        </div>
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalOverlay.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Wishlist Button
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--danger-color)';
                showNotification('Produit ajouté à votre liste de souhaits');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });

    // Add to Cart Button
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check"></i> Ajouté';
            this.style.backgroundColor = 'var(--success-color)';
            showNotification('Produit ajouté au panier');
            
            setTimeout(() => {
                this.innerHTML = 'Ajouter au panier';
                this.style.backgroundColor = 'var(--primary-color)';
            }, 2000);
        });
    });

    // Notification Function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add animation classes on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .header-content, .filters');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('slide-up');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});