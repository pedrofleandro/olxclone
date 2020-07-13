import React from 'react';
import {BackgroundModal, ModalArea, BoxModal} from './styled';

const Modal = (props) => {

    const handleBackground = () => {
        props.setVisible(false);
    }

    return (      
        <>
            {props.visible &&
                <BoxModal>
                    <BackgroundModal >
                        <ModalArea>
                            <div onClick={handleBackground} className="exit">Sair</div>
                            {props.children}
                        </ModalArea>
                    </BackgroundModal>     
                </BoxModal>
            }
        </>
    )

}

export default Modal;