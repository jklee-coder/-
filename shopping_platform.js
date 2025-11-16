/**
 * 在线购物平台 - JavaScript功能模块
 * 文件路径: e:\vscode\javascript\shopping_platform.js
 * 创建时间: 2025年
 */

// 购物平台主对象

const ShoppingPlatform = {
    // 配置信息
    config: {
        apiBaseUrl: '/api',
        localStorageKey: 'shopping_platform_data',
        defaultCurrency: '¥'
    },
    
    // 数据存储
    data: {
        products: [],
        cart: [],
        user: null,
        orders: []
    },
    
    // 初始化函数
    init: function() {
        console.log('在线购物平台初始化...');
        
        // 加载本地存储的数据
        this.loadFromLocalStorage();
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 初始化页面内容
        this.initializePage();
        
        // 模拟加载商品数据
        this.loadSampleProducts();
        
        console.log('购物平台初始化完成');
    },
    
    // 从本地存储加载数据
    loadFromLocalStorage: function() {
        try {
            const savedData = localStorage.getItem(this.config.localStorageKey);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.data.cart = parsedData.cart || [];
                this.data.user = parsedData.user || null;
                this.data.orders = parsedData.orders || [];
                console.log('本地存储数据加载成功');
            }
        } catch (error) {
            console.error('加载本地存储数据失败:', error);
        }
    },
    
    // 保存数据到本地存储
    saveToLocalStorage: function() {
        try {
            const dataToSave = {
                cart: this.data.cart,
                user: this.data.user,
                orders: this.data.orders
            };
            localStorage.setItem(this.config.localStorageKey, JSON.stringify(dataToSave));
        } catch (error) {
            console.error('保存数据到本地存储失败:', error);
        }
    },
    
    // 设置事件监听器
    setupEventListeners: function() {
        // 导航链接点击事件
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('href').replace('.html', '');
                this.navigateToPage(page);
            });
        });
        
        // 页面加载完成事件
        document.addEventListener('DOMContentLoaded', () => {
            this.onPageLoad();
        });
    },
    
    // 页面导航
    navigateToPage: function(page) {
        console.log(`导航到页面: ${page}`);
        
        // 根据页面类型加载不同内容
        switch(page) {
            case 'index':
                this.showHomePage();
                break;
            case 'products':
                this.showProductsPage();
                break;
            case 'cart':
                this.showCartPage();
                break;
            case 'orders':
                this.showOrdersPage();
                break;
            case 'login':
                this.showLoginPage();
                break;
            case 'admin':
                this.showAdminPage();
                break;
            default:
                this.showHomePage();
        }
    },
    
    // 页面加载完成后的处理
    onPageLoad: function() {
        // 获取当前页面路径
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        this.navigateToPage(currentPage);
    },
    
    // 初始化页面内容
    initializePage: function() {
        // 更新购物车数量显示
        this.updateCartCount();
        
        // 显示用户登录状态
        this.updateUserStatus();
    },
    
    // 更新购物车数量显示
    updateCartCount: function() {
        const cartCount = this.data.cart.reduce((total, item) => total + item.quantity, 0);
        let cartBadge = document.querySelector('.cart-badge');
        
        if (!cartBadge) {
            // 创建购物车徽章
            const cartLink = document.querySelector('a[href="cart.html"]');
            if (cartLink) {
                cartBadge = document.createElement('span');
                cartBadge.className = 'cart-badge';
                cartBadge.style.cssText = `
                    background: #e74c3c;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 12px;
                    margin-left: 5px;
                `;
                cartLink.appendChild(cartBadge);
            }
        }
        
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'inline-block' : 'none';
        }
    },
    
    // 更新用户状态显示
    updateUserStatus: function() {
        const loginLink = document.querySelector('a[href="login.html"]');
        if (loginLink) {
            if (this.data.user) {
                loginLink.innerHTML = `<i class="fas fa-user"></i> ${this.data.user.name}`;
            } else {
                loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> 登录/注册';
            }
        }
    },
    
    // 加载示例商品数据
    loadSampleProducts: function() {
        this.data.products = [
            {
                id: 1,
                name: 'iPhone 15 Pro',
                price: 8999,
                image_url: 'https://via.placeholder.com/300x200/3498db/ffffff?text=iPhone+15+Pro',
                category: '电子产品',
                description: '最新款iPhone，性能强劲',
                stock: 50
            },
            {
                id: 2,
                name: 'MacBook Air',
                price: 12999,
                image_url: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=MacBook+Air',
                category: '电子产品',
                description: '轻薄便携的笔记本电脑',
                stock: 30
            },
            {
                id: 3,
                name: 'AirPods Pro',
                price: 1999,
                image_url: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=AirPods+Pro',
                category: '电子产品',
                description: '无线降噪耳机',
                stock: 100
            },
            {
                id: 4,
                name: 'iPad Pro',
                price: 7999,
                image_url: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=iPad+Pro',
                category: '电子产品',
                description: '专业级平板电脑',
                stock: 25
            },
            {
                id: 5,
                name: 'Apple Watch',
                price: 2999,
                image_url: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Apple+Watch',
                category: '电子产品',
                description: '智能手表',
                stock: 80
            },
            {
                id: 6,
                name: 'HomePod mini',
                price: 749,
                image_url: 'https://via.placeholder.com/300x200/34495e/ffffff?text=HomePod+mini',
                category: '电子产品',
                description: '智能音箱',
                stock: 60
            }
        ];
        
        console.log('示例商品数据加载完成');
    },
    
    // 显示首页
    showHomePage: function() {
        const container = document.querySelector('.main-content .container');
        container.innerHTML = `
            <div class="welcome-section">
                <h1>欢迎来到在线购物平台</h1>
                <p>发现优质商品，享受便捷购物体验</p>
                
                <div class="stats-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                    <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #3498db; font-size: 2rem; margin: 0;">${this.data.products.length}</h3>
                        <p>在售商品</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #e74c3c; font-size: 2rem; margin: 0;">${this.data.cart.reduce((total, item) => total + item.quantity, 0)}</h3>
                        <p>购物车商品</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #2ecc71; font-size: 2rem; margin: 0;">${this.data.orders.length}</h3>
                        <p>历史订单</p>
                    </div>
                </div>
                
                <div class="featured-products">
                    <h2>热门商品</h2>
                    <div class="products-grid">
                        ${this.data.products.slice(0, 3).map(product => `
                            <div class="product-card">
                                <img src="${product.image_url}" alt="${product.name}" class="product-image">
                                <div class="product-info">
                                    <div class="product-name">${product.name}</div>
                                    <div class="product-price">${this.config.defaultCurrency}${product.price}</div>
                                    <button class="btn" onclick="ShoppingPlatform.addToCart(${product.id})">加入购物车</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="quick-actions" style="margin-top: 30px;">
                    <button class="btn" onclick="ShoppingPlatform.navigateToPage('products')" style="margin-right: 10px;">浏览所有商品</button>
                    <button class="btn" onclick="ShoppingPlatform.navigateToPage('cart')" style="background: #2ecc71;">查看购物车</button>
                </div>
            </div>
        `;
    },
    
    // 显示商品页面
    showProductsPage: function() {
        const container = document.querySelector('.main-content .container');
        container.innerHTML = `
            <div class="products-page">
                <h1>商品列表</h1>
                
                <div class="filters" style="margin: 20px 0;">
                    <input type="text" id="search-input" placeholder="搜索商品..." style="padding: 10px; width: 300px; border: 1px solid #ddd; border-radius: 5px;">
                    <button class="btn" onclick="ShoppingPlatform.searchProducts()" style="margin-left: 10px;">搜索</button>
                </div>
                
                <div class="products-grid">
                    ${this.data.products.map(product => `
                        <div class="product-card">
                            <img src="${product.image_url}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <div class="product-name">${product.name}</div>
                                <div class="product-description" style="color: #666; font-size: 0.9rem; margin: 5px 0;">${product.description}</div>
                                <div class="product-price">${this.config.defaultCurrency}${product.price}</div>
                                <div class="product-stock" style="color: ${product.stock > 10 ? '#2ecc71' : '#e74c3c'}; font-size: 0.8rem;">
                                    库存: ${product.stock}件
                                </div>
                                <button class="btn" onclick="ShoppingPlatform.addToCart(${product.id})" 
                                        ${product.stock === 0 ? 'disabled style="background: #95a5a6;"' : ''}>
                                    ${product.stock === 0 ? '缺货' : '加入购物车'}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    // 显示购物车页面
    showCartPage: function() {
        const container = document.querySelector('.main-content .container');
        const totalAmount = this.data.cart.reduce((total, item) => {
            const product = this.data.products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
        
        container.innerHTML = `
            <div class="cart-page">
                <h1>购物车</h1>
                
                ${this.data.cart.length === 0 ? `
                    <div style="text-align: center; padding: 50px;">
                        <h3>购物车为空</h3>
                        <p>快去添加一些商品吧！</p>
                        <button class="btn" onclick="ShoppingPlatform.navigateToPage('products')">去购物</button>
                    </div>
                ` : `
                    <div class="cart-items">
                        ${this.data.cart.map(item => {
                            const product = this.data.products.find(p => p.id === item.productId);
                            if (!product) return '';
                            
                            return `
                                <div class="cart-item" style="display: flex; align-items: center; padding: 15px; background: white; margin: 10px 0; border-radius: 8px; box-shadow: 0 1px 5px rgba(0,0,0,0.1);">
                                    <img src="${product.image_url}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
                                    <div style="flex: 1; margin-left: 15px;">
                                        <h4 style="margin: 0 0 5px 0;">${product.name}</h4>
                                        <p style="color: #666; margin: 0;">${this.config.defaultCurrency}${product.price}</p>
                                    </div>
                                    <div style="display: flex; align-items: center;">
                                        <button class="btn" onclick="ShoppingPlatform.updateCartQuantity(${product.id}, -1)" style="padding: 5px 10px;">-</button>
                                        <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                                        <button class="btn" onclick="ShoppingPlatform.updateCartQuantity(${product.id}, 1)" style="padding: 5px 10px;">+</button>
                                        <button class="btn btn-danger" onclick="ShoppingPlatform.removeFromCart(${product.id})" style="margin-left: 10px; padding: 5px 10px;">删除</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <div class="cart-summary" style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <h3>订单汇总</h3>
                        <p>商品数量: ${this.data.cart.reduce((total, item) => total + item.quantity, 0)}</p>
                        <p>总金额: <strong style="color: #e74c3c; font-size: 1.2rem;">${this.config.defaultCurrency}${totalAmount}</strong></p>
                        <button class="btn" onclick="ShoppingPlatform.checkout()" style="background: #2ecc71; padding: 10px 20px;">立即结算</button>
                    </div>
                `}
            </div>
        `;
    },
    
    // 添加到购物车
    addToCart: function(productId) {
        const product = this.data.products.find(p => p.id === productId);
        if (!product) {
            alert('商品不存在');
            return;
        }
        
        if (product.stock === 0) {
            alert('该商品已售完');
            return;
        }
        
        const existingItem = this.data.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                alert('库存不足');
                return;
            }
            existingItem.quantity += 1;
        } else {
            this.data.cart.push({
                productId: productId,
                quantity: 1
            });
        }
        
        this.saveToLocalStorage();
        this.updateCartCount();
        
        // 显示添加成功提示
        this.showMessage(`已添加 ${product.name} 到购物车`);
        
        console.log('添加到购物车:', product.name);
    },
    
    // 更新购物车商品数量
    updateCartQuantity: function(productId, change) {
        const item = this.data.cart.find(item => item.productId === productId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const product = this.data.products.find(p => p.id === productId);
        if (newQuantity > product.stock) {
            alert('库存不足');
            return;
        }
        
        item.quantity = newQuantity;
        this.saveToLocalStorage();
        this.showCartPage(); // 刷新购物车页面
    },
    
    // 从购物车移除商品
    removeFromCart: function(productId) {
        this.data.cart = this.data.cart.filter(item => item.productId !== productId);
        this.saveToLocalStorage();
        this.updateCartCount();
        this.showCartPage(); // 刷新购物车页面
    },
    
    // 结算
    checkout: function() {
        if (this.data.cart.length === 0) {
            alert('购物车为空');
            return;
        }
        
        // 创建订单
        const order = {
            id: Date.now(),
            items: [...this.data.cart],
            totalAmount: this.data.cart.reduce((total, item) => {
                const product = this.data.products.find(p => p.id === item.productId);
                return total + (product ? product.price * item.quantity : 0);
            }, 0),
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        this.data.orders.push(order);
        this.data.cart = [];
        
        this.saveToLocalStorage();
        this.updateCartCount();
        
        alert(`订单创建成功！订单号: ${order.id}\n总金额: ${this.config.defaultCurrency}${order.totalAmount}`);
        this.navigateToPage('orders');
    },
    
    // 显示订单页面
    showOrdersPage: function() {
        const container = document.querySelector('.main-content .container');
        
        container.innerHTML = `
            <div class="orders-page">
                <h1>我的订单</h1>
                
                ${this.data.orders.length === 0 ? `
                    <div style="text-align: center; padding: 50px;">
                        <h3>暂无订单</h3>
                        <p>快去购物吧！</p>
                        <button class="btn" onclick="ShoppingPlatform.navigateToPage('products')">去购物</button>
                    </div>
                ` : `
                    <div class="orders-list">
                        ${this.data.orders.map(order => `
                            <div class="order-card" style="background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                    <h3 style="margin: 0;">订单号: ${order.id}</h3>
                                    <span class="order-status" style="background: ${this.getStatusColor(order.status)}; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem;">
                                        ${this.getStatusText(order.status)}
                                    </span>
                                </div>
                                
                                <div class="order-items">
                                    ${order.items.map(item => {
                                        const product = this.data.products.find(p => p.id === item.productId);
                                        if (!product) return '';
                                        return `
                                            <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                                                <span>${product.name} x ${item.quantity}</span>
                                                <span>${this.config.defaultCurrency}${product.price * item.quantity}</span>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                                
                                <div style="border-top: 1px solid #eee; margin-top: 10px; padding-top: 10px; text-align: right;">
                                    <strong>总计: ${this.config.defaultCurrency}${order.totalAmount}</strong>
                                </div>
                                
                                <div style="color: #666; font-size: 0.8rem; margin-top: 10px;">
                                    下单时间: ${new Date(order.createdAt).toLocaleString()}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    },
    
    // 获取订单状态颜色
    getStatusColor: function(status) {
        const colors = {
            'pending': '#f39c12',
            'processing': '#3498db',
            'shipped': '#9b59b6',
            'delivered': '#2ecc71',
            'cancelled': '#e74c3c'
        };
        return colors[status] || '#95a5a6';
    },
    
    // 获取订单状态文本
    getStatusText: function(status) {
        const texts = {
            'pending': '待处理',
            'processing': '处理中',
            'shipped': '已发货',
            'delivered': '已送达',
            'cancelled': '已取消'
        };
        return texts[status] || '未知状态';
    },
    
    // 显示登录页面
    showLoginPage: function() {
        const container = document.querySelector('.main-content .container');
        
        container.innerHTML = `
            <div class="login-page">
                <div class="form-container">
                    <h2>用户登录</h2>
                    
                    ${this.data.user ? `
                        <div style="text-align: center; padding: 20px;">
                            <h3>欢迎回来, ${this.data.user.name}!</h3>
                            <p>邮箱: ${this.data.user.email}</p>
                            <button class="btn btn-danger" onclick="ShoppingPlatform.logout()">退出登录</button>
                        </div>
                    ` : `
                        <form id="login-form">
                            <div class="form-group">
                                <label for="email">邮箱:</label>
                                <input type="email" id="email" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="password">密码:</label>
                                <input type="password" id="password" class="form-control" required>
                            </div>
                            <button type="submit" class="btn" style="width: 100%;">登录</button>
                        </form>
                        
                        <div style="text-align: center; margin-top: 15px;">
                            <p>还没有账号？ <a href="#" onclick="ShoppingPlatform.showRegisterForm()">立即注册</a></p>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        // 设置登录表单提交事件
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }
    },
    
    // 用户登录
    login: function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // 简单的模拟登录（实际项目中应该调用后端API）
        if (email && password) {
            this.data.user = {
                id: 1,
                name: '测试用户',
                email: email
            };
            
            this.saveToLocalStorage();
            this.updateUserStatus();
            this.showLoginPage(); // 刷新页面
            
            this.showMessage('登录成功！');
        } else {
            alert('请输入邮箱和密码');
        }
    },
    
    // 用户退出登录
    logout: function() {
        this.data.user = null;
        this.saveToLocalStorage();
        this.updateUserStatus();
        this.showLoginPage(); // 刷新页面
        
        this.showMessage('已退出登录');
    },
    
    // 显示注册表单
    showRegisterForm: function() {
        const container = document.querySelector('.main-content .container');
        
        container.innerHTML = `
            <div class="register-page">
                <div class="form-container">
                    <h2>用户注册</h2>
                    <form id="register-form">
                        <div class="form-group">
                            <label for="reg-name">姓名:</label>
                            <input type="text" id="reg-name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-email">邮箱:</label>
                            <input type="email" id="reg-email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-password">密码:</label>
                            <input type="password" id="reg-password" class="form-control" required>
                        </div>
                        <button type="submit" class="btn" style="width: 100%;">注册</button>
                    </form>
                    
                    <div style="text-align: center; margin-top: 15px;">
                        <p>已有账号？ <a href="#" onclick="ShoppingPlatform.showLoginPage()">立即登录</a></p>
                    </div>
                </div>
            </div>
        `;
        
        // 设置注册表单提交事件
        const form = document.getElementById('register-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.register();
            });
        }
    },
    
    // 用户注册
    register: function() {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        
        if (name && email && password) {
            this.data.user = {
                id: Date.now(),
                name: name,
                email: email
            };
            
            this.saveToLocalStorage();
            this.updateUserStatus();
            this.showLoginPage(); // 刷新页面
            
            this.showMessage('注册成功！');
        } else {
            alert('请填写完整信息');
        }
    },
    
    // 显示管理后台页面
    showAdminPage: function() {
        const container = document.querySelector('.main-content .container');
        
        container.innerHTML = `
            <div class="admin-page">
                <h1>管理后台</h1>
                <p>平台统计数据</p>
                
                <div class="admin-stats" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
                    <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px;">
                        <h3>商品总数</h3>
                        <p style="font-size: 2rem; color: #3498db;">${this.data.products.length}</p>
                    </div>
                    <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px;">
                        <h3>订单总数</h3>
                        <p style="font-size: 2rem; color: #e74c3c;">${this.data.orders.length}</p>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button class="btn" onclick="ShoppingPlatform.exportData()">导出数据</button>
                    <button class="btn btn-danger" onclick="ShoppingPlatform.clearAllData()">清空所有数据</button>
                </div>
            </div>
        `;
    },
    
    // 导出数据
    exportData: function() {
        const data = {
            products: this.data.products,
            orders: this.data.orders,
            exportTime: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        // 创建下载链接
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `shopping_platform_data_${Date.now()}.json`;
        link.click();
        
        this.showMessage('数据导出成功');
    },
    
    // 清空所有数据
    clearAllData: function() {
        if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
            this.data.cart = [];
            this.data.orders = [];
            localStorage.removeItem(this.config.localStorageKey);
            
            this.updateCartCount();
            this.showAdminPage(); // 刷新页面
            
            this.showMessage('所有数据已清空');
        }
    },
    
    // 搜索商品
    searchProducts: function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredProducts = this.data.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        // 更新商品显示
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <img src="${product.image_url}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description" style="color: #666; font-size: 0.9rem; margin: 5px 0;">${product.description}</div>
                        <div class="product-price">${this.config.defaultCurrency}${product.price}</div>
                        <button class="btn" onclick="ShoppingPlatform.addToCart(${product.id})">加入购物车</button>
                    </div>
                </div>
            `).join('');
        }
    },
    
    // 显示消息提示
    showMessage: function(message) {
        // 创建消息提示元素
        let messageEl = document.getElementById('shopping-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'shopping-message';
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(messageEl);
        }
        
        messageEl.textContent = message;
        messageEl.style.display = 'block';
        
        // 3秒后自动隐藏
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
};

// 页面加载完成后初始化购物平台
document.addEventListener('DOMContentLoaded', function() {
    ShoppingPlatform.init();
});

// 全局暴露购物平台对象
window.ShoppingPlatform = ShoppingPlatform;