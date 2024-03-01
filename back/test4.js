class InitializeAutofill {
  constructor(frame, doc) {
    this.frame = frame;
    this.doc = document;
    let [invoiceValue, fillButton] = this.createValue()
    this.invoiceValue = invoiceValue
    this.fillButton = fillButton
  }

  createValue() {
    const spanElement = this.doc.getElementById('nm_razao_social');
    let self = this

    const fillButton = this.doc.createElement('button');
    fillButton.type = 'button';
    fillButton.innerText = 'Preencher';

    spanElement.parentNode.insertBefore(fillButton, spanElement.nextSibling);

    const invoiceValue = this.doc.createElement('input');
    invoiceValue.type = 'text';
    invoiceValue.placeholder = 'Valor';

    spanElement.parentNode.insertBefore(invoiceValue, spanElement.nextSibling);

    invoiceValue.addEventListener('keydown', function(event) {
      // Check if the key pressed was 'Enter'
      if (event.key === 'Enter') {
        // Prevent the default action to avoid submitting a form if the input is inside one
        event.preventDefault();
        self.startTyping()
      }
    });

    fillButton.addEventListener('click', function () {
      if(invoiceValue.value === ''){
        alert("Insira o valor da nota")
      }else{
        self.startTyping()
      }
    });

    return [invoiceValue, fillButton]
  }

  async startTyping() {
    let self = this

    const fields = [
      {
        label: 'valor do servico',
        value: this.invoiceValue.value,
        attributeValue: 'txt_valr_servicos_not',
        element: 'input',
        attribute: 'name',
        function: 'type'
      }
    ]

    for (const item of fields) {
      let element = self.constructSelector(item)
      const speed = self.getRandomNumberBetween(20, 50);
      console.log(speed);
      switch (item.function) {
        case 'type':
          await this.simulateTyping(element, item.value, speed);
          break;
        default:
          throw new Error('Invalid case');
      }


    }
  }

  constructSelector(item){
    return this.doc.querySelector(`${item.element}[${item.attribute}="${item.attributeValue}"]`)
  }

  async simulateTyping(target, text, typingSpeed) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element || !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      console.error('Target element is not valid or not found.');
      return;
    }

    const triggerKeyboardEvent = (type, char) => {
      const event = new KeyboardEvent(type, {
        key: char,
        code: `Key${char.toUpperCase()}`,
        keyCode: char.charCodeAt(0),
        charCode: char.charCodeAt(0),
        which: char.charCodeAt(0),
        bubbles: true,
      });
      element.dispatchEvent(event);
    };

    for (let char of text) {
      triggerKeyboardEvent('keydown', char);
      triggerKeyboardEvent('keypress', char);

      // Mimic the delay of human typing
      await new Promise(resolve => {
        const delay = typingSpeed + Math.random() * 100; // Adjust delay as needed
        setTimeout(() => {
          element.value += char; // Directly modify the element's value
          triggerKeyboardEvent('keyup', char);
          element.dispatchEvent(new Event('input', { bubbles: true })); // Trigger the input event
          resolve();
        }, delay);
      });
    }
  }


  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}