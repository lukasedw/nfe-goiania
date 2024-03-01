class InitializeAutofill {
  constructor(doc, frame) {
    this.doc = doc;
    this.frame = frame;
    let [invoiceValue, fillButton] = this.createValue()
    this.invoiceValue = invoiceValue
    this.fillButton = fillButton
    this.isExecuting = false
    console.log("Começou!")
  }

  createValue() {
    const spanElement = this.doc.getElementById('nm_razao_social');

    const fillButton = this.doc.createElement('button');
    fillButton.type = 'button';
    fillButton.innerText = 'Preencher';

    spanElement.parentNode.insertBefore(fillButton, spanElement.nextSibling);

    const invoiceValue = this.doc.createElement('input');
    invoiceValue.type = 'text';
    invoiceValue.placeholder = 'Valor';

    spanElement.parentNode.insertBefore(invoiceValue, spanElement.nextSibling);

    invoiceValue.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.executePromisses()
      }
    });

    fillButton.addEventListener('click', () => {
      this.executePromisses()
    });

    return [invoiceValue, fillButton]
  }

  executePromisses() {
    if (this.isExecuting) {
      alert("Espere o processo acabar!");
      return;
    }

    if (this.invoiceValue.value === '') {
      alert("Insira o valor da nota");
      return;
    }

    this.isExecuting = true;
    this.startTyping().then(() => {
      this.isExecuting = false;
    }).catch(error => {
      console.error("An error occurred:", error);
      this.isExecuting = false;
    });
  }

  async startTyping() {
    this.isExecuting = true

    this.frame.limpar()

    const fields = [
      {
        label: 'CNPJ',
        value: '15660185000138',
        attributeValue: 'txt_cnpj_cpf_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'consulta cnpj',
        function: 'function',
        functionName: "consultar_tomador_cnpjcpf",
        check: {
          frame: 'mnu',
          querySelector: '#msg_n',
          message: 'INFORME OS DADOS DO TOMADOR'
        }
      },
      {
        label: 'Razão social',
        value: 'Morpheus Software LTDA',
        attributeValue: 'txt_razao_nome_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'endereço',
        value: 'Av. Champagnat',
        attributeValue: 'txt_endereco_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'número',
        value: '583',
        attributeValue: 'txt_numero_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'complemento',
        value: 'Sala 201',
        attributeValue: 'txt_complemento_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'bairro',
        value: 'Praia da Costa',
        attributeValue: 'txt_bairro_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'CEP',
        value: '29100010',
        attributeValue: 'txt_cep_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'cod municipio',
        value: '586200',
        attributeValue: 'txt_codg_municipio_tom',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'clicar cod municipio',
        function: 'function',
        functionName: "consultar_codg_municipio1"
      },
      {
        label: 'atividade economica',
        value: 'Suporte tecnico, manutencao e outros servicos em tecnologia da informacao',
        attributeValue: 'sel_codg_atividade_not',
        element: 'select',
        attribute: 'name',
        function: 'select'
      },
      {
        label: 'descricao',
        value: 'SUPORTE TECNICO, MANUTENCAO E OUTROS SERVICOS EM TECNOLOGIA DA INFORMACAO',
        attributeValue: 'txt_discriminacao_not',
        element: 'textarea',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'valor do servico',
        value: this.invoiceValue.value,
        attributeValue: 'txt_valr_servicos_not',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      {
        label: 'aliquita',
        value: '201',
        attributeValue: 'sel_info_aliquota_not',
        element: 'input',
        attribute: 'name',
        function: 'type'
      },
      // {
      //   label: 'example',
      //   value: 'valueexample',
      //   attributeValue: 'valueattribute',
      //   element: 'input',
      //   attribute: 'name',
      //   function: 'type'
      // }
    ]

    for (const item of fields) {
      let element = this.constructSelector(item)
      const speed = this.getRandomNumberBetween(20, 50);
      console.log(speed);
      switch (item.function) {
        case 'type':
          await this.simulateTyping(element, item.value, speed);
          break;
        case 'select':
          this.selectOption(element, item.value);
          break;
        case 'function':
          await this.evalFunction(item)
          // this.frame[item.functionName]()
          // window[item.functionName]();
          // eval(item.functionName + '()');
          break;
        default:
          throw new Error('Invalid case');
      }
    }
  }
  
  async evalFunction(item){
    await new Promise(resolve => {
      this.frame[item.functionName]()

      if(item.check !== undefined){
        let interval = setInterval(() => {
          let message = window.frames[item.check.frame].document.querySelector(item.check.querySelector).innerText
          if(item.check.message === message){
            clearInterval(interval)
            resolve();
          }else{
            console.log('waiting')
          }
        }, 500);
      }else{
        resolve();
      }
    });
  }

  constructSelector(item){
    return `${item.element}[${item.attribute}="${item.attributeValue}"]`
  }

  async simulateTyping(target, text, typingSpeed) {
    const element = typeof target === 'string' ? this.doc.querySelector(target) : target;

    // if (!element || !(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
    if (!element) {
      console.error('Target element is not valid or not found.');
      throw new Error('Invalid case');
    }

    element.focus();

    element.value = '';

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

      await new Promise(resolve => {
        const delay = typingSpeed + Math.random() * 100;
        setTimeout(() => {
          element.value += char;
          triggerKeyboardEvent('keyup', char);
          element.dispatchEvent(new Event('input', { bubbles: true }));
          resolve();
        }, delay);
      });
    }

    element.blur();
  }

  selectOption(target, optionText) {
    const selectElement = typeof target === 'string' ? this.doc.querySelector(target) : target;

    if (!selectElement || selectElement.tagName !== 'SELECT') {
      console.error('Select element not found or invalid target');
      return;
    }

    let found = false;
    for (const option of selectElement.options) {
      console.debug("Option: ", option.text)
      if (option.text === optionText) {
        option.selected = true;
        found = true;
        break;
      }
    }

    if (!found) {
      console.warn(`Option with text "${optionText}" not found.`);
      return;
    }

    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

function waitForElementAndAttachEvent(frameName) {
  const interval = setInterval(() => {
    const frame = window.frames[frameName];
    const doc = frame.document || frame.contentDocument;
    const input = doc.querySelector('input[name="txt_cnpj_cpf_tom"]');
    if (input) {
      const autofillInstance = new InitializeAutofill(doc, frame);
      clearInterval(interval);
    }
  }, 500);
}

waitForElementAndAttachEvent('cpo');


