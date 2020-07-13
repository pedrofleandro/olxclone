import styled from 'styled-components';

export const Item = styled.div`
a {
    display: block;
    border: 1px solid #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    transition: all ease .2s;

    &:hover {
        background-color: #eee;
        border: 1px solid #ccc;
    }

    .itemImage img {
        width: 100%;
        border-radius: 5px;
    }

    .itemName {
        font-wight: bold;
    }

    .editAd {
        display: flex;
        flex-direction: row-reverse;
    
        div {
            padding: 5px;
            background-color: #0089ff;
            color: #fff;
            font-size: 14px;
            margin-left: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            border-radius: 5px;

            &:hover {
                background-color: #006fce;
            }
        }
    }
}

`;