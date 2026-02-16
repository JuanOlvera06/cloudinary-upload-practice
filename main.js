const cloudname="dstrcicli"
const preset="preset_5C"

const inputf=document.getElementById("fileinput")
const imagen=document.getElementById("imagen")
const btn =document.getElementById("subir")

const subirimg=()=>{
//desabilitar boton

    const foto=inputf.files[0]
    if (!foto) return alert("Selecciona una imagen"); //validar que haya imagen

    if (!foto.type.startsWith("image/")) {
    alert("Solo se permiten imágenes");
    return;
}


    btn.disabled=true;
btn.classList.add("opacity-50", "cursor-not-allowed")


    const loader = document.getElementById("loading-status");//indicador del reusltado
    loader.classList.remove("hidden"); //Tailwind usa la clase hidden para aplicar un display: none
// cuando la quito aparece depsues de preisonar el boton

    const formdata= new FormData()
    formdata.append('file',foto)
    formdata.append('upload_preset', preset)

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,{
        method:'POST',
        body:formdata
    })
    .then(response=>{
        if(!response.ok) 
            throw new Error("Falla al subir la imagen")
        return response.json()
    })
    .then(data=>{
        alert("Imagen subida con exito")
        imagen.src=data.secure_url
    })
    .catch(error => {
        // Capturar errores de red o de proceso
        console.error("Error detectado:", error);
        alert("Ocurrió un error al subir la imagen")
    })
    .finally(() => {
        loader.classList.add("hidden")
        btn.disabled=false;
        btn.classList.remove("opacity-50", "cursor-not-allowed")
    });
    
}


//const cloudname="dstrcicli"
//const preset = "preset_5C"


