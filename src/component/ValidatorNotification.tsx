import * as React from 'react';
import {
    Modal, Button
} from "react-bootstrap";

interface IValidatorNotificationProps
{
    showAlert: boolean
    type: ErrorType
    onClose: () => void
}

export enum ErrorType {
    INVALID = "invalid format",
    NO_RESULT = "no result",
}

class ValidatorNotification extends React.Component<IValidatorNotificationProps>
{
    public render()
    {
        if(this.props.type === ErrorType.INVALID) {
            return (
                <Modal show={this.props.showAlert} onHide={this.props.onClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>This variant is invalid</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Currently we only support
                        <a href="https://varnomen.hgvs.org/" target="_blank" rel="noopener noreferrer"> HGVS</a> format.
                        <p>For example: 17:g.41242962_41242963insGA</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
        else {
            return (
                <Modal show={this.props.showAlert} onHide={this.props.onClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>No result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please try another variant.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}

export default ValidatorNotification;