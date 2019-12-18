import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { EXAMPLES } from './SearchBox';

interface IValidatorNotificationProps {
    showAlert: boolean;
    type: ErrorType;
    onClose: () => void;
}

export enum ErrorType {
    INVALID = 'invalid format',
    NO_RESULT = 'no result',
}

class ValidatorNotification extends React.Component<
    IValidatorNotificationProps
> {
    public render() {
        if (this.props.type === ErrorType.INVALID) {
            return (
                <Modal
                    show={this.props.showAlert}
                    onHide={this.props.onClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>This variant is invalid</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{EXAMPLES}</p>
                        <p>Other formats will be supported soon.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.props.onClose}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (
                <Modal
                    show={this.props.showAlert}
                    onHide={this.props.onClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>No result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please try another variant.</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.props.onClose}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}

export default ValidatorNotification;
