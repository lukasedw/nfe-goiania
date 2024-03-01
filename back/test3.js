function selectOptionByVisibleText(target, optionText) {
  const selectElement = typeof target === 'string' ? document.querySelector(target) : target;

  if (!selectElement || selectElement.tagName !== 'SELECT') {
    console.error('Select element not found or invalid target');
    return;
  }

  let found = false;
  for (const option of selectElement.options) {
    console.log("uepa", option.text)
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

  // Dispatch a change event to mimic a user action
  selectElement.dispatchEvent(new Event('change', { bubbles: true }));
}

selectOptionByVisibleText("body > form > table > tbody > tr:nth-child(24) > td:nth-child(3) > select", "Suporte tecnico, manutencao e outros servicos em tecnologia da informacao")