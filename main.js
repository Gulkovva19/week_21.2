let errors = [];

let checkValidity = (input) => {

    event.preventDefault();
    let validity = input.validity;

    if (validity.valueMissing) {
        errors.push('Поле ' + input.placeholder + ' не заполнено');
    }
    if (validity.rangeOverflow) {
        let max = input.getAttribute('max');
        errors.push(`Максимальное значение поля Number не может быть больше ${max}`);
    }
    if (validity.rangeUnderflow) {
        let min = input.getAttribute('min');
        errors.push(`Минимальное значение поля Number не может быть меньше ${min}`);
    }
}

let checkAll = () => {
    errors = [];
    let inputs = document.querySelectorAll("input");

    for (let input of inputs) {
        checkValidity(input);
    }
    console.log(errors);
    document.getElementById('errorMessage').innerHTML = errors.join('.<br>');

    let user = {
        name: document.getElementById("username").value,
        phone: document.getElementById("userphone").value,
        email: document.getElementById("usermail").value,
        number: document.getElementById("servicetype").value,
        comment: document.getElementById("comment").value
    }
    fetch("https://httpbin.org/post",
    {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type':'application/json;charset=utf-8'
        },
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
    })
    .catch(error => console.log(error));
}