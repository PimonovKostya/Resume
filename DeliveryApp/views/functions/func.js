const btnOrder = document.querySelectorAll('#btn-create')
const buttons = document.querySelectorAll('.btn-name');
const formData = new FormData();


buttons.forEach(button => button.addEventListener('click', async ()=>{
    let response = fetch('/' + button.innerHTML);
    if(response.ok){
        let json = (await response).json();
    }else{
        alert('HTTP Error:' + (await response).status)
    }
}));

btnOrder.forEach(btn => btn.addEventListener('click', async () => {
    var box = btn.parentElement;
    var childNodes = {};
    for(var i = 0; i < 3; i ++){
        childNodes[i] = box.children[i];
    }
    let order = {
        name: childNodes[0].innerHTML,
        discription: childNodes[1].innerHTML,
        price: childNodes[2].innerHTML
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