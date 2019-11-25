import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';

class ModalCustom extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.props.open}
                    onClose={(e) => this.props.onClose(e)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.props.open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">{this.props.title}</h2>
                            <p id="transition-modal-description">
                                {
                                    this.props.plot
                                        ? this.props.plot
                                        : "Buscando..."
                                }
                            </p>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '600px',
        height: '400px'
    },
});

export default withStyles(styles)(ModalCustom);