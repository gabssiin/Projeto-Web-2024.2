document.getElementById('whatsapp-link').addEventListener('click', function (event) {
    event.preventDefault();

    const phone = "5581986267563"; 
    const message = "Quero contar meu depoimento!";
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  
    window.open(whatsappUrl, '_blank');
});
