import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="bg-white border-t border-gray-200 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-1">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-black flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-lg">G</span>
                                </div>
                                <span className="text-xl font-bold text-black">GlowMart</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-x-2 text-gray-600 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>

                                    <span>123 Shop Street, October City, DC 12345</span>
                                </div>
                                <div className="flex items-center gap-x-2 text-gray-600 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>

                                    <span>(+20) 01093333333</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm gap-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>

                                    <span>support@glowmart.com</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-black font-bold text-sm mb-4">SHOP</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Electronics</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Fashion</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Home &amp; Garden</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Sports</a></li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/categories">Deals</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-black font-bold text-sm mb-4">CUSTOMER SERVICE</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/contact">Contact Us</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/help">Help Center</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/track-order">Track Your Order</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/returns">Returns &amp; Exchanges</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/size-guide">Size Guide</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-black font-bold text-sm mb-4">ABOUT</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/about">About glowmart</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/careers">Careers</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/press">Press</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/investor-relations">Investor Relations</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/sustainability">Sustainability</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-black font-bold text-sm mb-4">POLICIES</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/privacy-policy">Privacy Policy</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/terms-of-service">Terms of Service</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/cookie-policy">Cookie Policy</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/shipping-policy">Shipping Policy</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 text-sm hover:text-black transition-colors" href="/refund-policy">Refund Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
