import React, {Component} from 'react'
import Portal             from './Portal'
import styled, {css}      from 'styled-components'
import './CreateEditModal.css'

const fadeIn = css`
  from {opacity: 0.01;}
  to   {opacity: 1;}
`

const ModalBG = styled.div`
  animation: ${fadeIn} 0.2s linear;
  background      : rgba(0, 0, 0, 0.3);
  position        : fixed;
  top             : 0;
  z-index         : 100000;
  margin          : auto;
  width           : 100%;
  height          : 100%;
  display         : flex;
  align-items     : flex-start;
  padding-top     : 10%;
  justify-content : center;
  overflow-y      : scroll;
`

const Modal = styled.div`
  border-radius   : 5px;
  background      : white;
  display         : flex;
  align-items     : center;
  justify-content : center;
  padding         : 2rem;
  overflow        : hidden;
  transform       : translate3d(0,0,0);
`

export default class CreateEditModal extends Component {

  render() {

    if (!this.props.creating) return null

    return (
      <div>
        <Portal
          isOpen={true}
        >
          <ModalBG>
            <Modal>
              <div>
                New food:

                <select
                  options={['hello', 'option']}
                  value="hello"
                  onChange={option => this.props.selectCategory(option)}
                />

                <div className="">
                  <button
                    onClick = {() => this.props.cancel()}
                  >
                    Cancel
                  </button>

                  <button
                    onClick = {() => this.props.confirm()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Modal>
          </ModalBG>
        </Portal>
      </div>
    )
  }



}
