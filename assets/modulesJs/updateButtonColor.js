import{formAddphotos} from "../script.js";
export const updateButtonColor = () =>{
    const button = document.getElementById("submitPhotoBtn");
    if(formAddphotos.checkValidity() ){
        button.style.backgroundColor = "#1d6154";
    }
    else{
        button.style.backgroundColor = "#D3D3D3"
    }
}

