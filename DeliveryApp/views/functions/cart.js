const deleteBtn = document.querySelectorAll('#btn-delete');
const totalPrice = document.querySelector('#totalprice');
const sum = document.querySelectorAll('#price');
const submitBtn = document.querySelector('#submit-btn');

if(deleteBtn){
    deleteBtn.forEach(button => button.addEventListener('click', async () => {
        var box = button.parentElement;
        var childNodes = {};
        for(var i = 0; i < 3; i ++){
            childNodes[i] = box.children[i];
        }
        let order = {
            name: childNodes[0].innerHTML
        }
        let response = await fetch('/cart/delete', {
            method: 'POST',
            headers:{
                'Content-Type':  'application/json;charset=utf-8'
            },
            body: JSON.stringify(order)});
        let result = await response.json();
        alert(result.message);
    }))
}

totalPrice.innerHTML = getTotal();

function getTotal(){
    var res = 0;
    sum.forEach(price => res += new Number(price.innerHTML.match('^\[0-9]+')[0]));
    return res + '$';
}

submitBtn.addEventListener('click', async () => { 
    let order;
    console.log()
    try{
        order = {
            name: document.querySelector('#firstname').value,
            mail: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value,
            address: document.querySelector('#address').value,
            price: totalPrice.innerHTML
        }
    }catch(e){
        alert('Please insert your data in fields');
    }
    

    let response = await fetch('/cart/save', {
        method: 'POST',
        headers:{
            'Content-Type':  'application/json;charset=utf-8'
        },
        body: JSON.stringify(order)});
    let result = await response.json();
    alert(result.message);
})