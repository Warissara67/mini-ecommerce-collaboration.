document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');    
    let allProducts = [];


    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const formattedPrice = Number(product.price).toLocaleString('th-TH'); 
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            
            <p>ราคา: ${product.price.toLocaleString()} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();//เพิ่ม trim() เพื่อลมช่องว่าง//
        if (searchTerm === '') {
            displayProducts(allProducts);
            return;
        }
        const filteredProducts = allProducts.filter(product => {
            // Simple search, not very efficient
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
});
