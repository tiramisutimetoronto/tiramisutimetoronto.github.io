document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    feather.replace();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Cart functionality
    const cartButtons = document.querySelectorAll('button:contains("Add to Cart")');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.closest('.p-6').querySelector('h3').textContent;
            const itemPrice = this.closest('.p-6').querySelector('span').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center';
            notification.innerHTML = `
                <i data-feather="check-circle" class="mr-2"></i>
                <span>Added ${itemName} (${itemPrice}) to cart</span>
            `;
            document.body.appendChild(notification);
            feather.replace();
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.add('opacity-0', 'transition', 'duration-500');
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        });
    });
    
    // Mobile menu toggle (handled in navbar component)
});