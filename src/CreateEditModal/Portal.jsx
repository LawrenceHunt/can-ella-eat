import {Component} from 'react'
import {createPortal}     from 'react-dom'


const getModalRoot = () => {
  let modalRoot = document.getElementById("modal-root")
  if (modalRoot) {
    return modalRoot
  } else {
    modalRoot = document.createElement('div')
    modalRoot.id = "modal-root"
    document.body.prepend(modalRoot)

    return modalRoot
  }
}

export default class Portal extends Component {
  constructor() {
    super()
    if (typeof document !== 'undefined') this.createElement()
  }

  // SSR in NextJS means sometimes this needs to be called in ComponentDidMount (server),
  // sometimes from the constructor (already in DOM).
  createElement() {
    this.el = document.createElement('div')
    this.el.className += 'modal'
    getModalRoot().appendChild(this.el)
  }

  componentDidMount() {
    if (!this.el) this.createElement()

    if (this.props.closeDelay && this.props.onClose) {
      this.timeout = setTimeout(
        () => this.props.onClose(),
        this.props.closeDelay
      )
    }
  }

  componentWillUnmount() {
    document
      .getElementById("modal-root")
      .removeChild(this.el)

    if (this.timeout) clearTimeout(this.timeout)
  }

  render() {
    if (!this.props.isOpen) return null
    const content = (this.props.children)
    return this.el
      ? createPortal(content, this.el)
      : null
  }
}
