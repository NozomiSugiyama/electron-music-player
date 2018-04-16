export default (component) =>
    new Promise(resolve => component.forceUpdate(resolve))
