const form = document.getElementById('subscriptionForm');
const formTitle = document.getElementById('form-title');

function validateForm() {
    let isValid = true;
    document.querySelectorAll('input').forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    return isValid;
}

function validateField(event) {
    const input = event.target;
    const id = input.id;
    const value = input.value.trim();
    let errorMessage = '';

    switch (id) {
        case 'fullName':
            if (value.length <= 6 || !value.includes(' ')) {
                errorMessage = 'Debe tener más de 6 letras y al menos un espacio entre medio.';
            }
            break;
        case 'email':
            if (!/\S+@\S+\.\S+/.test(value)) {
                errorMessage = 'Debe tener un formato de email válido.';
            }
            break;
        case 'password':
            if (value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
                errorMessage = 'Debe tener al menos 8 caracteres, formados por letras y números.';
            }
            break;
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (value !== password) {
                errorMessage = 'Las contraseñas no coinciden.';
            }
            break;
        case 'age':
            if (!Number.isInteger(Number(value)) || Number(value) < 18) {
                errorMessage = 'Debe ser mayor o tener 18 años.';
            }
            break;
        case 'phone':
            if (!/^\d{7,}$/.test(value)) {
                errorMessage = 'Número de al menos 7 dígitos, sin espacios, guiones ni paréntesis.';
            }
            break;
        case 'address':
            if (value.length < 5 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
                errorMessage = 'Debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.';
            }
            break;
        case 'city':
            if (value.length < 3 || !/^[a-zA-Z]{3,}$/.test(value)) {
                errorMessage = 'Debe tener al menos 3 caracteres.';
            }
            break;
        case 'postalCode':
            if (!/^\d{3,}$/.test(value)) {
                errorMessage = 'Debe tener al menos 3 caracteres.';
            }
            break;
        case 'dni':
            if (!/^\d{7,8}$/.test(value)) {
                errorMessage = 'Número de 7 u 8 dígitos.';
            }
            break;
        default:
            break;
    }

    const errorElement = document.getElementById(`${id}Error`);
    if (errorMessage) {
        errorElement.textContent = errorMessage;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function clearError(event) {
    const input = event.target;
    const errorElement = document.getElementById(`${input.id}Error`);
    errorElement.textContent = '';
}

document.getElementById('fullName').addEventListener('input', function() {
    formTitle.textContent = `HOLA ${this.value}`;
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('focus', clearError);
});

const modal = document.getElementById('myModal');
const modalContent = document.getElementById('modalContent');
const closeModalButton = document.getElementById('closeModal');

function showModal(formData) {
    modalContent.innerHTML = '';

    let modalHTML = '<h2>Información del Formulario</h2>';
    modalHTML += '<ul>';
    Object.keys(formData).forEach(key => {
        modalHTML += `<li><strong>${key}:</strong> ${formData[key]}</li>`;
    });
    modalHTML += '</ul>';

    modalContent.innerHTML = modalHTML;
    modal.showModal();
}

closeModalButton.addEventListener('click', () => {
    modal.close();
});

function getFormData() {
    const formData = {};
    document.querySelectorAll('input').forEach(input => {
        formData[input.name] = input.value.trim();
    });
    return formData;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateForm()) {
        const formData = getFormData();
        showModal(formData);
        form.reset();
    }
});
