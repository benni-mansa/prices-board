// Clean Price Board Application - Ready for New API
class PriceBoardApp {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.isLoading = false;
        this.currentError = null;
        
        // API Ninjas Commodity Price API configuration
        this.apiKey = 'Q7aGYLo2gB5jObblDv6gGg==p7XtXD8JyaJGwBrz';
        this.defaultCommodities = [
            // Agriculture (some may require premium access)
            'corn', 'wheat', 'soybean', 'soybean_meal', 'soybean_oil',
            'coffee', 'cocoa', 'cotton', 'sugar', 'orange_juice',
            // Energy & metals
            'gold', 'platinum', 'aluminum', 'copper', 'crude_oil', 'brent_crude_oil', 'natural_gas', 'gasoline_rbob', 'heating_oil',
            // Livestock & others
            'lean_hogs', 'feeder_cattle', 'live_cattle', 'oat', 'lumber', 'palladium', 'micro_gold'
        ];
        
        // Currency conversion rate (USD to GHS)
        this.usdToGhsRate = 15.5; // Approximate current rate
        
        this.init();
    }
    
    init() {
        this.bindElements();
        this.bindEvents();
        this.loadWatchlistFromStorage();
        this.loadData();
    }
    
    bindElements() {
        this.elements = {
            priceTableBody: document.getElementById('price-table-body'),
            cropFilter: document.getElementById('crop-filter'),
            regionFilter: document.getElementById('region-filter'),
            sortBy: document.getElementById('sort-by'),
            searchInput: document.getElementById('search-input'),
            loading: document.getElementById('loading'),
            error: document.getElementById('error'),
            noData: document.getElementById('no-data'),
            errorMessage: document.getElementById('error-message'),
            retryBtn: document.getElementById('retry-btn'),
            totalProducts: document.getElementById('total-products'),
            totalRegions: document.getElementById('total-regions'),
            lastUpdated: document.getElementById('last-updated'),
            dataSource: document.getElementById('data-source')
        };
    }
    
    bindEvents() {
        // Filter events
        this.elements.cropFilter.addEventListener('change', () => this.applyFilters());
        this.elements.regionFilter.addEventListener('change', () => this.applyFilters());
        this.elements.sortBy.addEventListener('change', () => this.applyFilters());
        
        // Search event with debouncing
        let searchTimeout;
        this.elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.applyFilters();
            }, 300);
        });
        
        // Retry button
        this.elements.retryBtn.addEventListener('click', () => this.loadData());
    }
    
    async loadData() {
        this.setLoading(true);
        this.hideError();
        
        try {
            await this.loadFromNewAPI();
            this.updateStats();
            this.populateFilters();
            this.applyFilters();
            
        } catch (error) {
            console.error('Error loading data:', error);
                    this.showError('Unable to load data. Please check your connection and try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    // Load data from API Ninjas Commodity Price API
    async loadFromNewAPI() {
        const commodityNames = this.defaultCommodities;
        const requests = commodityNames.map(name => this.fetchCommodityPrice(name));
        
        const results = await Promise.allSettled(requests);
        const items = results
            .filter(r => r.status === 'fulfilled' && r.value)
            .map(r => r.value);
        
        if (items.length === 0) {
            throw new Error('No commodity prices available from API.');
        }
        
        this.data = items.map(item => {
            const productName = this.toTitleCase(String(item.name || '').replace(/_/g, ' '));
            const exchange = item.exchange || 'Unknown Exchange';
            const updatedDate = item.updated ? new Date(item.updated * 1000) : new Date();
            const numericPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price);
            
            // Convert USD to GHS
            const priceInGhs = !isNaN(numericPrice) ? numericPrice * this.usdToGhsRate : 0;
            
            // Map exchange abbreviations to actual city locations
            const location = this.getExchangeLocation(exchange);
            
            return {
                productName: productName || 'Unknown Commodity',
                price: priceInGhs,
                currency: 'GHS',
                location: location,
                date: updatedDate.toISOString().split('T')[0],
                source: 'API Ninjas',
                usdPrice: numericPrice // Keep original USD price for reference
            };
        }).filter(row => row.productName !== 'Unknown Commodity' && row.price > 0);
    }
    
    async fetchCommodityPrice(name) {
        const url = `https://api.api-ninjas.com/v1/commodityprice?name=${encodeURIComponent(name)}`;
        try {
            const response = await fetch(url, {
                headers: {
                    'X-Api-Key': this.apiKey
                }
            });
            
            if (!response.ok) {
                // Skip commodities that are premium-only or invalid
                return null;
            }
            
            const data = await response.json();
            if (Array.isArray(data)) {
                return data[0] || null;
            }
            return data;
        } catch (e) {
            // Network error: skip this commodity
            return null;
        }
    }
    
    toTitleCase(text) {
        return String(text)
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase())
            .replace(/\s+Futures\b/g, '');
    }
    
    getExchangeLocation(exchange) {
        const exchangeLocations = {
            'CME': 'Chicago, Illinois',
            'COMEX': 'New York, New York',
            'NYMEX': 'New York, New York',
            'CBOT': 'Chicago, Illinois',
            'ICE': 'Atlanta, Georgia',
            'LME': 'London, England',
            'TOCOM': 'Tokyo, Japan',
            'SHFE': 'Shanghai, China',
            'DCE': 'Dalian, China',
            'ZCE': 'Zhengzhou, China'
        };
        
        return exchangeLocations[exchange] || exchange;
    }
    
    getCommodityCategory(commodityName) {
        const categories = {
            'Gold': 'Precious Metal',
            'Silver': 'Precious Metal',
            'Platinum': 'Precious Metal',
            'Palladium': 'Precious Metal',
            'Copper': 'Industrial Metal',
            'Aluminum': 'Industrial Metal',
            'Crude Oil': 'Energy',
            'Natural Gas': 'Energy',
            'Gasoline': 'Energy',
            'Heating Oil': 'Energy',
            'Corn': 'Agriculture',
            'Wheat': 'Agriculture',
            'Soybean': 'Agriculture',
            'Coffee': 'Agriculture',
            'Cocoa': 'Agriculture',
            'Cotton': 'Agriculture',
            'Sugar': 'Agriculture',
            'Orange Juice': 'Agriculture',
            'Live Cattle': 'Livestock',
            'Feeder Cattle': 'Livestock',
            'Lean Hogs': 'Livestock',
            'Class III Milk': 'Livestock'
        };
        
        return categories[commodityName] || 'Commodity';
    }
    
    getPriceChangeIndicator(item) {
        // Simple price change indicator based on trend
        const trend = this.calculateTrend(item, this.data.indexOf(item));
        const indicators = {
            'up': '<span class="price-up">↗ +2.5%</span>',
            'down': '<span class="price-down">↘ -1.8%</span>',
            'stable': '<span class="price-stable">→ 0.0%</span>'
        };
        return indicators[trend] || indicators['stable'];
    }
    
    getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffMins < 60) {
            return `${diffMins}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else {
            return `${diffDays}d ago`;
        }
    }
    
    showCommodityDetails(item) {
        const modal = this.createCommodityDetailsModal(item);
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        overlay.addEventListener('click', () => this.closeModal(modal));
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 10);
    }
    
    createCommodityDetailsModal(item) {
        const modal = document.createElement('div');
        modal.className = 'commodity-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-chart-line"></i> ${this.escapeHtml(item.productName)} Details</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Current Price (GHS):</label>
                            <span class="price-display">${this.formatPrice(item.price, item.currency)}</span>
                        </div>
                        <div class="detail-item">
                            <label>USD Price:</label>
                            <span>$${item.usdPrice?.toFixed(2) || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Exchange Location:</label>
                            <span><i class="fas fa-map-marker-alt"></i> ${this.escapeHtml(item.location)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Category:</label>
                            <span class="category-badge">${this.getCommodityCategory(item.productName)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Last Updated:</label>
                            <span>${this.formatDate(item.date)} (${this.getTimeAgo(item.date)})</span>
                        </div>
                        <div class="detail-item">
                            <label>Data Source:</label>
                            <span>${item.source}</span>
                        </div>
                    </div>
                    <div class="price-analysis">
                        <h4>Price Analysis</h4>
                        <div class="analysis-item">
                            <span class="trend-indicator">${this.renderTrend(this.calculateTrend(item, 0))}</span>
                            <span>Price trend analysis</span>
                        </div>
                        <div class="analysis-item">
                            <span class="currency-info">Exchange Rate: 1 USD = ${this.usdToGhsRate} GHS</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="this.addToWatchlist(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        <i class="fas fa-star"></i> Add to Watchlist
                    </button>
                    <button class="btn btn-secondary modal-close">Close</button>
                </div>
            </div>
        `;
        return modal;
    }
    
    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    addToWatchlist(item) {
        // Initialize watchlist if it doesn't exist
        if (!this.watchlist) {
            this.watchlist = [];
        }
        
        // Check if already in watchlist
        const existingIndex = this.watchlist.findIndex(w => w.productName === item.productName);
        
        if (existingIndex !== -1) {
            // Remove from watchlist
            this.watchlist.splice(existingIndex, 1);
            this.showNotification(`${item.productName} removed from watchlist`, 'info');
            this.updateWatchlistButton(item.productName, false);
        } else {
            // Add to watchlist
            this.watchlist.push({
                ...item,
                addedAt: new Date().toISOString()
            });
            this.showNotification(`${item.productName} added to watchlist!`, 'success');
            this.updateWatchlistButton(item.productName, true);
        }
        
        // Save to localStorage
        localStorage.setItem('commodityWatchlist', JSON.stringify(this.watchlist));
        
        // Update watchlist display if it exists
        this.updateWatchlistDisplay();
    }
    
    updateWatchlistButton(commodityName, isInWatchlist) {
        const buttons = document.querySelectorAll(`[data-commodity="${commodityName}"]`);
        buttons.forEach(btn => {
            if (btn.classList.contains('watchlist-btn')) {
                if (isInWatchlist) {
                    btn.classList.add('in-watchlist');
                    btn.innerHTML = '<i class="fas fa-star"></i>';
                    btn.title = 'Remove from Watchlist';
                } else {
                    btn.classList.remove('in-watchlist');
                    btn.innerHTML = '<i class="far fa-star"></i>';
                    btn.title = 'Add to Watchlist';
                }
            }
        });
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Insert after header
        const header = document.querySelector('header');
        header.parentNode.insertBefore(notification, header.nextSibling);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    updateWatchlistDisplay() {
        // TODO: Implement watchlist display panel
        console.log('Watchlist updated:', this.watchlist);
    }
    
    loadWatchlistFromStorage() {
        const saved = localStorage.getItem('commodityWatchlist');
        if (saved) {
            try {
                this.watchlist = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading watchlist:', e);
                this.watchlist = [];
            }
        } else {
            this.watchlist = [];
        }
    }
    
    populateFilters() {
        // Clear existing options
        this.elements.cropFilter.innerHTML = '<option value="">All Commodities</option>';
        this.elements.regionFilter.innerHTML = '<option value="">All Locations</option>';
        
        // Get unique values
        const productNames = [...new Set(this.data.map(item => item.productName))].sort();
        const regions = [...new Set(this.data.map(item => item.location))].sort();
        
        // Populate product filter
        productNames.forEach(productName => {
            const option = document.createElement('option');
            option.value = productName;
            option.textContent = productName;
            this.elements.cropFilter.appendChild(option);
        });
        
        // Populate region filter
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            this.elements.regionFilter.appendChild(option);
        });
    }
    
    applyFilters() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const selectedProduct = this.elements.cropFilter.value;
        const selectedRegion = this.elements.regionFilter.value;
        const sortBy = this.elements.sortBy.value;
        
        // Apply filters
        this.filteredData = this.data.filter(item => {
            const matchesSearch = !searchTerm || 
                item.productName.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm);
            
            const matchesProduct = !selectedProduct || item.productName === selectedProduct;
            const matchesRegion = !selectedRegion || item.location === selectedRegion;
            
            return matchesSearch && matchesProduct && matchesRegion;
        });
        
        // Apply sorting
        this.sortData(sortBy);
        
        // Render results
        this.renderTable();
        this.updateStats();
    }
    
    sortData(sortBy) {
        switch (sortBy) {
            case 'price-low':
                this.filteredData.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredData.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredData.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case 'date':
            default:
                this.filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }
    }
    
    renderTable() {
        this.elements.priceTableBody.innerHTML = '';
        
        if (this.filteredData.length === 0) {
            this.showNoData();
            return;
        }
        
        this.filteredData.forEach((item, index) => {
            const row = document.createElement('tr');
            
            // Calculate price trend (simple implementation)
            const trend = this.calculateTrend(item, index);
            
            row.innerHTML = `
                <td class="commodity-cell">
                    <div class="commodity-info">
                        <strong>${this.escapeHtml(item.productName)}</strong>
                        <small class="commodity-category">${this.getCommodityCategory(item.productName)}</small>
                    </div>
                </td>
                <td class="price-cell">
                    <div class="price-info">
                        <div class="primary-price">${this.formatPrice(item.price, item.currency)}</div>
                        <div class="secondary-price">($${item.usdPrice?.toFixed(2) || 'N/A'} USD)</div>
                        <div class="price-change">${this.getPriceChangeIndicator(item)}</div>
                    </div>
                </td>
                <td class="location-cell">
                    <div class="location-info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${this.escapeHtml(item.location)}</span>
                    </div>
                </td>
                <td class="date-cell">
                    <div class="date-info">
                        <div class="update-time">${this.formatDate(item.date)}</div>
                        <small class="time-ago">${this.getTimeAgo(item.date)}</small>
                    </div>
                </td>
                <td class="trend-cell">${this.renderTrend(trend)}</td>
                <td class="actions-cell">
                    <button class="btn btn-sm btn-info commodity-details-btn" data-commodity="${this.escapeHtml(item.productName)}" title="View Details">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary watchlist-btn" data-commodity="${this.escapeHtml(item.productName)}" title="Add to Watchlist">
                        <i class="fas fa-star"></i>
                    </button>
                </td>
            `;
            
            // Add event listeners to the action buttons
            const detailsBtn = row.querySelector('.commodity-details-btn');
            const watchlistBtn = row.querySelector('.watchlist-btn');
            
            detailsBtn.addEventListener('click', () => this.showCommodityDetails(item));
            watchlistBtn.addEventListener('click', () => this.addToWatchlist(item));
            
            // Update watchlist button state if commodity is already in watchlist
            if (this.watchlist && this.watchlist.find(w => w.productName === item.productName)) {
                this.updateWatchlistButton(item.productName, true);
            }
            
            this.elements.priceTableBody.appendChild(row);
        });
        
        this.hideNoData();
    }
    
    calculateTrend(item, index) {
        // Simple trend calculation - in a real app, you'd compare with historical data
        if (index === 0) return 'stable';
        
        const currentPrice = item.price;
        const previousPrice = this.filteredData[index - 1].price;
        
        if (currentPrice > previousPrice) return 'up';
        if (currentPrice < previousPrice) return 'down';
        return 'stable';
    }
    
    renderTrend(trend) {
        const icons = {
            up: '<i class="fas fa-arrow-up trend-up"></i>',
            down: '<i class="fas fa-arrow-down trend-down"></i>',
            stable: '<i class="fas fa-minus trend-stable"></i>'
        };
        
        return icons[trend] || icons.stable;
    }
    
    formatPrice(price, currency) {
        if (typeof price !== 'number' || isNaN(price)) {
            return 'N/A';
        }
        
        // Special formatting for local currency
        if (currency === 'GHS') {
            return `GH₵ ${price.toFixed(2)}`;
        }
        
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            minimumFractionDigits: 2
        }).format(price);
    }
    
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }
    
    updateStats() {
        const uniqueCommodities = new Set(this.filteredData.map(item => item.productName)).size;
        const uniqueLocations = new Set(this.filteredData.map(item => item.location)).size;
        const lastUpdated = this.data.length > 0 ? 
            new Date(Math.max(...this.data.map(item => new Date(item.date)))) : 
            new Date();
        
        this.elements.totalProducts.textContent = uniqueCommodities;
        this.elements.totalRegions.textContent = uniqueLocations;
        this.elements.lastUpdated.textContent = lastUpdated.toLocaleDateString();
        
        // Show data source
        if (this.data.length > 0) {
            const sources = [...new Set(this.data.map(item => item.source))];
            this.elements.dataSource.textContent = sources.join(', ');
        } else {
            this.elements.dataSource.textContent = '-';
        }
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        
        if (loading) {
            this.elements.loading.classList.remove('hidden');
            this.elements.priceTableBody.innerHTML = '';
        } else {
            this.elements.loading.classList.add('hidden');
        }
    }
    
    showError(message) {
        this.currentError = message;
        this.elements.errorMessage.textContent = message;
        this.elements.error.classList.remove('hidden');
        this.elements.priceTableBody.innerHTML = '';
    }
    
    hideError() {
        this.currentError = null;
        this.elements.error.classList.add('hidden');
    }
    
    showNoData() {
        this.elements.noData.classList.remove('hidden');
    }
    
    hideNoData() {
        this.elements.noData.classList.add('hidden');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PriceBoardApp();
});

// Add service worker for offline functionality (basic implementation)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}