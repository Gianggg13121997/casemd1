let myStore = new Store("cửa hàng thú cưng ");
let p1 = new Product(1, "Chó", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRifBpkpn2Q8D_4rGRaVuuV4jXnS9kskPX7-w&s");
let p2 = new Product(2, "Mèo", 2000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSta0YcY1-Q6aJwvV8xE1rmfYygqbWGLGLWEA&s");
let p3 = new Product(3, "Lợn", 1000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGHuJb1v2SkYV4uEihJXk25MQpz2Hmc4bTpw&s")
myStore.addProduct(p1);
myStore.addProduct(p2);
myStore.addProduct(p3)


loadData()
showAll()

function searchProduct(){
    let keyword = document.getElementById("searchInput").value.trim();
    let searchResult = myStore.searchProduct(keyword);
    let str = ` <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Img</th>
            <th colspan="2">Actions</th>
        </tr>
        `;
        for (let i = 0; i < searchResult.length; i++) {
            str += `<tr>
                <td>${searchResult[i].id}</td>
                <td>${searchResult[i].name}</td>
                <td>${searchResult[i].price}</td>
                <td><img src="${searchResult[i].img}" alt=""></td>
                <td><button onclick="remove(${i})">Xóa</button></td>
                <td><button onclick="getOneProduct(${i})">Sửa</button></td>
            </tr>`;
        }
        document.getElementById("table").innerHTML = str;
}

function saveData() {
    let listProductJS = JSON.stringify(myStore.listProduct)
    localStorage.setItem("listProduct", listProductJS);

}


function loadData() {
    let listProductJS = localStorage.getItem("listProduct");
    if (listProductJS) {
        myStore.listProduct = JSON.parse(listProductJS)
    }
}

function getOneProduct(index) {
    let oldProduct = myStore.getOneProduct(index)
    document.getElementById("id").value = oldProduct.id;
    document.getElementById("name").value = oldProduct.name;
    document.getElementById("price").value = oldProduct.price;
    document.getElementById("img").value = oldProduct.img;
    document.getElementById("edit-img").src = oldProduct.img;
    document.getElementById("btn-save").innerHTML = `<button onclick="edit(${index})">SAVE</button>`
}

function edit(index) {
    let idInput = document.getElementById("id").value;
    let nameInput = document.getElementById("name").value;
    let priceInput = document.getElementById("price").value;
    let imgInput = document.getElementById("img").value;
    let newProduct = new Product(idInput, nameInput, priceInput, imgInput);
    myStore.update(index, newProduct);
    showAll()
    saveData()
    document.getElementById("id").value = ""
    document.getElementById("name").value = ""
    document.getElementById("price").value = ""
    document.getElementById("img").value = ""
    document.getElementById("edit-img").style.display = "none"
    document.getElementById("btn-save").innerHTML = `<button onclick="add()">ADD</button>`
}

function add() {
    let idInput = document.getElementById("id").value;
    let nameInput = document.getElementById("name").value;
    let priceInput = document.getElementById("price").value;
    let imgInput = document.getElementById("img").value;
    let newProduct = new Product(idInput, nameInput, priceInput, imgInput)
    if (idInput === "" || nameInput === "" || priceInput === "" || imgInput === "") {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
        return;
    }
    myStore.addProduct(newProduct)
    showAll()
    saveData()

}



function remove(index) {
    isConfirm = confirm("bạn chắc chứ ?")
    if (isConfirm) {
        myStore.remove(index);
        alert("Thành công !")
        showAll()
        saveData()
    } else {
        alert("Đã hủy !")
    }
}
function showAll() {
    let list = myStore.listProduct;
    let str = ` <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Img</th>
            <th colspan="2">Actions</th>
        </tr>
        `
    for (i = 0; i < list.length; i++) {
        str = str + `<tr>
            <td>${list[i].id}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td><img src="${list[i].img}" alt=""></td>
            <td><button onclick="remove(${i})">Xóa</button></td>
            <td><button onclick="getOneProduct(${i})">Sửa</button></td>
        </tr>
        `
    } document.getElementById("table").innerHTML = str;

}
