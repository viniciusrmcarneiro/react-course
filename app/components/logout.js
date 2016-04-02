import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default (props) => (
    <Modal
        bsSize="lg"
        backdrop={true}
        show={true}
        autoFocus={true}
        keyboard={true}
    >
        <Modal.Header>
            <Modal.Title>ATENÇÃO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Voocê tem certeza que deseja sair do sistema?
        </Modal.Body>
        <Modal.Footer>
            <Button bsStyle="default" onClick={() => props.authActions.logout()}>Sim</Button>
            <Button bsStyle="default" onClick={()=> props.routeActions.goBack()}>Não</Button>
        </Modal.Footer>
    </Modal>
);
