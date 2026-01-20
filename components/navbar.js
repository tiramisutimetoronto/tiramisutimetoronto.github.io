class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .nav-link {
                    position: relative;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #d97706;
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                .mobile-menu {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out;
                }
                .mobile-menu.open {
                    max-height: 500px;
                }
            </style>
            <nav class="bg-amber-800 text-white shadow-lg">
                <div class="container mx-auto px-4 py-4">
                    <div class="flex justify-between items-center">
                        <a href="/" class="flex items-center space-x-2">
                            <i data-feather="coffee" class="text-amber-300"></i>
                            <span class="text-2xl font-bold tracking-tight">Tiramisu Time</span>
                        </a>
<!-- Desktop Navigation -->
                        <div class="hidden md:flex items-center space-x-8">
                            <a href="/" class="nav-link">Home</a>
                            <a href="#menu" class="nav-link">Menu</a>
                            <a href="#about" class="nav-link">About</a>
                            <a href="#contact" class="nav-link">Contact</a>
                            <button class="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full flex items-center">
                                <i data-feather="shopping-cart" class="mr-2"></i>
                                <span>Cart</span>
                            </button>
                        </div>
                        
                        <!-- Mobile menu button -->
                        <button class="md:hidden focus:outline-none" id="mobile-menu-button">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile Navigation -->
                    <div class="mobile-menu md:hidden" id="mobile-menu">
                        <div class="pt-4 pb-2 space-y-3">
                            <a href="/" class="block px-3 py-2 rounded hover:bg-amber-700">Home</a>
                            <a href="#menu" class="block px-3 py-2 rounded hover:bg-amber-700">Menu</a>
                            <a href="#about" class="block px-3 py-2 rounded hover:bg-amber-700">About</a>
                            <a href="#contact" class="block px-3 py-2 rounded hover:bg-amber-700">Contact</a>
                            <button class="w-full bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full flex items-center justify-center mt-2">
                                <i data-feather="shopping-cart" class="mr-2"></i>
                                <span>Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
        
        // Initialize feather icons in shadow DOM
        const featherScript = document.createElement('script');
        featherScript.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
        this.shadowRoot.appendChild(featherScript);
        
        featherScript.onload = () => {
            // Mobile menu toggle functionality
            const mobileMenuButton = this.shadowRoot.getElementById('mobile-menu-button');
            const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
            
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                const icon = mobileMenuButton.querySelector('i');
                if (mobileMenu.classList.contains('open')) {
                    icon.setAttribute('data-feather', 'x');
                } else {
                    icon.setAttribute('data-feather', 'menu');
                }
                feather.replace();
            });
            
            feather.replace();
        };
    }
}

customElements.define('custom-navbar', CustomNavbar);