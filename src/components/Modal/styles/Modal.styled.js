import styled from "styled-components";




export const StyledModal = styled.div`
position: fixed;
background-color: #fff;
display: flex;
align-items: center;
justify-content: center;
height: 10vh;
width: 400px;
border: 1px solid #ddd;
top: 30%;
bottom: 0;
right: 0;
left: 50%;
z-index: 1000;
border-radius: 4px;
box-shadow: 1px 1px 4px #cbcbcb;
text-align: center;
& p {
    color: ${props => props.color === "error" ? "red" : "green" };
}
`;