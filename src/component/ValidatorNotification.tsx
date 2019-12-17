import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                        Currently we only support&nbsp;
                        <a
                            href="https://varnomen.hgvs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            HGVS
                        </a>
                        &nbsp;format.
                        <p>
                            For example:&nbsp;
                            <Link to={'/variant/7:g.140453136A>T'}>
                                7:g.140453136A>T
                            </Link>
                            &nbsp;(BRAF in V600E)
                        </p>
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
