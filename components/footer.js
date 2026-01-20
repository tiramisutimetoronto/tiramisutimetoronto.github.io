class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .social-icon {
                    transition: transform 0.3s ease, color 0.3s ease;
                }
                .social-icon:hover {
                    transform: translateY(-3px);
                    color: #d97706;
                }
            </style>
            <footer class="bg-amber-900 text-amber-100 py-12">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 class="text-xl font-bold mb-4 text-amber-300">Tiramisu Time Toronto</h3>
                            <p class="mb-4">Sweet dreams in layers since 2015.</p>
                            <div class="flex space-x-4">
                                <a href="#" class="social-icon">
                                    <i data-feather="facebook"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i data-feather="instagram"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i data-feather="twitter"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-4 text-amber-300">Quick Links</h3>
                            <ul class="space-y-2">
                                <li><a href="/" class="hover:text-amber-300 transition duration-300">Home</a></li>
                                <li><a href="#menu" class="hover:text-amber-300 transition duration-300">Menu</a></li>
                                <li><a href="#about" class="hover:text-amber-300 transition duration-300">About Us</a></li>
                                <li><a href="#contact" class="hover:text-amber-300 transition duration-300">Contact</a></li>
                                <li><a href="#" class="hover:text-amber-300 transition duration-300">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-4 text-amber-300">Contact Us</h3>
                            <address class="not-italic">
                                <p class="mb-2">85 Queens Wharf Rd</p>
                                <p class="mb-2">Toronto, ON M5V 0J9</p>
<p class="mb-2">(647) 338-0264</p>
                                <p class="mb-4">tiramisutimetoronto@gmail.com</p>
                            </address>
                            <button
  type="button"
  onclick="window.location.href='mailto:tiramisutimetoronto@gmail.com'"
  class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full flex items-center">
    <i data-feather="mail" class="mr-2"></i>
    <span>Email Us</span>
</button>
                        </div>
                    </div>
                    <div class="border-t border-amber-800 mt-8 pt-8 text-center">
                        <p>&copy; ${new Date().getFullYear()} Tiramisu Time Toronto. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        
        // Initialize feather icons in shadow DOM
        const featherScript = document.createElement('script');
        featherScript.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
        this.shadowRoot.appendChild(featherScript);
        featherScript.onload = () => feather.replace();
    }
}

customElements.define('custom-footer', CustomFooter);