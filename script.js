let clients = JSON.parse(localStorage.getItem('clients')) || [
  { name: "أحمد حيمد", phone: "777111222" },
  { name: "علي ناصر", phone: "777333444" }
];
let products = JSON.parse(localStorage.getItem('products')) || [];

function saveClients(){ localStorage.setItem('clients', JSON.stringify(clients)); }
function saveProducts(){ localStorage.setItem('products', JSON.stringify(products)); }

function hideAll(){
  document.getElementById('addClientForm').classList.add('hidden');
  document.getElementById('clientList').classList.add('hidden');
  document.getElementById('addProductForm').classList.add('hidden');
  document.getElementById('productList').classList.add('hidden');
}
function showAddClientForm(){ hideAll(); document.getElementById('addClientForm').classList.remove('hidden'); }
function showClientList(){ hideAll(); document.getElementById('clientList').classList.remove('hidden'); renderClientTable(); }
function showAddProductForm(){ hideAll(); document.getElementById('addProductForm').classList.remove('hidden'); }
function showProductList(){ hideAll(); document.getElementById('productList').classList.remove('hidden'); renderProductTable(); }

function toggleSize(){
  let type = document.getElementById('productType').value;
  document.getElementById('sizeDiv').style.display = (type === "غذائية") ? "block" : "none";
}

// العملاء
document.getElementById('clientForm').addEventListener('submit',function(e){
  e.preventDefault();
  clients.push({ name: document.getElementById('clientName').value, phone: document.getElementById('clientPhone').value });
  saveClients(); this.reset(); showClientList();
});
function renderClientTable(){
  let table = document.getElementById('clientTable'); table.innerHTML = "";
  clients.forEach((c,i)=>{
    table.innerHTML += `<tr><td>${c.name}</td><td>${c.phone}</td>
      <td class="actions">
        <button onclick="editClient(${i})"><i class="fa-solid fa-pen"></i> تعديل</button>
        <button class="delete" onclick="deleteClient(${i})"><i class="fa-solid fa-trash"></i> حذف</button>
      </td></tr>`;
  });
}
function deleteClient(i){ clients.splice(i,1); saveClients(); renderClientTable(); }
function editClient(i){
  let c = clients[i]; document.getElementById('clientName').value = c.name;
  document.getElementById('clientPhone').value = c.phone; clients.splice(i,1); saveClients(); showAddClientForm();
}

// المواد
document.getElementById('productForm').addEventListener('submit',function(e){
  e.preventDefault();
  let p = {
    name: document.getElementById('productName').value,
    type: document.getElementById('productType').value,
    size: document.getElementById('productSize').value || "-",
    quantity: document.getElementById('productQuantity').value,
    date: document.getElementById('productDate').value
  };
  products.push(p); saveProducts(); this.reset(); document.getElementById('sizeDiv').style.display="none"; showProductList();
});
function renderProductTable(){
  let table=document.getElementById('productTable'); table.innerHTML="";
  products.forEach((p,i)=>{
    let icon = (p.type==="غذائية")?"<i class='fa-solid fa-bowl-food'></i>":"<i class='fa-solid fa-cubes-stacked'></i>";
    table.innerHTML += `<tr><td>${icon} ${p.name}</td><td>${p.type}</td><td>${p.size || "-"}</td><td>${p.quantity}</td><td>${p.date}</td>
      <td class="actions">
        <button onclick="editProduct(${i})"><i class="fa-solid fa-pen"></i> تعديل</button>
        <button class="delete" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i> حذف</button>
      </td></tr>`;
  });
}
function deleteProduct(i){ products.splice(i,1); saveProducts(); renderProductTable(); }
function editProduct(i){
  let p=products[i]; document.getElementById('productName').value=p.name;
  document.getElementById('productType').value=p.type; toggleSize();
  document.getElementById('productSize').value=p.size||"كبير";
  document.getElementById('productQuantity').value=p.quantity;
  document.getElementById('productDate').value=p.date;
  products.splice(i,1); saveProducts(); showAddProductForm();
}