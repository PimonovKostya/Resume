const deleteBtn = document.querySelectorAll('#btn-delete');
const totalPrice = document.querySelector('#totalprice');
const sum = document.querySelectorAll('#price');
const count = document.querySelectorAll('#count');
const submitBtn = document.querySelector('#submit-btn');

totalPrice.innerHTML = getTotal();

if(deleteBtn){
    deleteBtn.forEach(button => button.addEventListener('click', async () => {
        var box = button.parentElement.parentElement;
        let order = {
            name: box.children[1].innerHTML
        }
        console.log(box.children[1].innerHTML)
        try{
            fetch('/cart/delete', {
                method: 'POST',
                headers:{
                    'Content-Type':  'application/json;charset=utf-8'
                },
                body: JSON.stringify(order)
            });
            window.location.reload();
        }catch(e){
            console.log(e);
        }
    }))
}
window.addEventListener('input', () => {
    totalPrice.innerHTML = getTotal();
})

function getTotal(){
    var res = 0;
    for(var i = 0; i < sum.length; i++){
        if(count[i].value == '' || !count[i].value){
            continue;
        }else{
            res += Number(sum[i].innerHTML.match('^\[0-9]+')[0]) * Number(count[i].value);
        }
    }
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
    try{
        await fetch('/cart/save', {
            method: 'POST',
            headers:{
                'Content-Type':  'application/json;charset=utf-8'
            },
            body: JSON.stringify(order)
        });
        window.location.reload();
    }catch(e){
        console.log(e);
    }
})