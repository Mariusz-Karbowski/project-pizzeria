class BaseWidget{
  constructor(wrapperElement, initialValue){
    const thisWidget = this;
    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrapperElement;
    thisWidget.correctValue = initialValue;
  }
  get value(){
    const thisWidget =this;
    return thisWidget.correctValue;
  }
  set value(value){
    const thisWidget = this;    
    const newValue = thisWidget.parseValue(value);    
    if(thisWidget.correctValue !== newValue && thisWidget.isValid(newValue)){
      thisWidget.correctValue = newValue;    
      thisWidget.renderValue();
    } else {
      thisWidget.renderValue();
    }
    thisWidget.announce();
  }
  setValue(value){
    const thisWidget = this;
    thisWidget.value = value;
  }
  parseValue(value){
    return parseInt(value);
  }
  isValid(value){
    return !isNaN(value); 
  }
  renderValue(){
    const thisWidget = this;
    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
    thisWidget.dom.select.widgets.datePicker.wrapper.innerHTML = thisWidget.value;
    thisWidget.dom.select.widgets.hourPicker.wrapper.innerHTML = thisWidget.value;
  }
  announce(){
    const thisWidget = this;
    const event = new Event('updated',{
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}
export default BaseWidget;