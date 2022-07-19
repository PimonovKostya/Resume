const btnOrder = document.querySelectorAll('#btn-create')
const buttons = document.querySelectorAll('.btn-name');
const formData = new FormData();


buttons.forEach(button => button.addEventListener('click', async () =>{
    let data = {
        btn: button.innerHTML
    }
    let response = fetch('/click', {
        method: 'POST',
        headers:{
            'Content-Type':  'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    let result = await response.json();
    alert(result.message);
}))

btnOrder.forEach(btn => btn.addEventListener('click', async () => {
    var box = btn.parentElement.parentElement;
    var price = btn.parentElement;
    let order = {
        name: box.children[1].innerHTML,
        discription: box.children[2].innerHTML,
        price: price.children[0].innerHTML.match('^\[0-9]+')[0],
        img: box.children[0].currentSrc
    } 
    let response = await fetch('/create', {
        method: 'POST',
        headers:{
            'Content-Type':  'application/json;charset=utf-8'
        },
        body: JSON.stringify(order)});
    let result = await response.json();
    alert(result.message);
}));