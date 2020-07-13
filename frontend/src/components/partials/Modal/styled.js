import styled from 'styled-components';

export const BoxModal = styled.div`

`;

export const BackgroundModal = styled.div`
& {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    rigth: 0;
    bottom: 0;
    z-index: 90;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}
`; 

export const ModalArea = styled.div`
& {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;

    .exit {
        width: 40px;
        padding: 5px;
        color: #fff;
        background-color: #DB3A29;
        cursor: pointer;
        margin-left: 88%;
        //margin-bottom: 5px;

        &:hover {
            background-color: #DB5141;
        }
    }
}
`;