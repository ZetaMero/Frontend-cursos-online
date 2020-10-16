import React from "react";
import { Modal } from "react-bootstrap";
import "./BasicModal.scss";
import avatar from "../../../assets/img/svg/avatar.svg";

export default function BasicModal(props) {
  const { show, setShow, children } = props;

  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img className="avatar" src={avatar} alt="avatar" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
