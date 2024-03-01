function attachBlurEventListener(targetElement) {
  targetElement.addEventListener('blur', function() {
    let inputValue = this.value;
    let cleanedInputValue = inputValue.replace(/\D/g, '');
    this.value = cleanedInputValue;
  });
}

function createValue() {
  const spanElement = document.getElementById('nm_razao_social');

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.placeholder = 'Value';

  spanElement.parentNode.insertBefore(inputElement, spanElement.nextSibling);
}

function waitForElementAndAttachEvent(frameName) {
  const interval = setInterval(() => {
    const frame = window.frames[frameName];
    const doc = frame.document || frame.contentDocument;
    const input = doc.querySelector('input[name="txt_cnpj_cpf_tom"]');
    if (input) {
      attachBlurEventListener(input);
      clearInterval(interval);
    }
  }, 500);
}

waitForElementAndAttachEvent('cpo');
