import { cancelTask } from "./cancelTask.js"

export function confirmDeletion(taskDeleted, showMessageOrNot) {
        
    if (showMessageOrNot) {
        Swal.fire({

        title: 'Tem Certeza?',
        icon: 'warning',
        text: 'Não poderá ser desfeito!',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: `Sim, não me avise de novo`,
        cancelButtonText: 'Cancelar'

        }).then((result) => {
            
            if (result.isConfirmed) {

                Swal.fire({
                    title:'Deletado!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1200
                    })
                cancelTask(taskDeleted)

            } else if (result.isDenied) {

                Swal.fire({
                    title:'Deletado!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1200
                })
                cancelTask(taskDeleted)
                
                showMessageOrNot = false
                localStorage.setItem("deleteWarning", JSON.stringify(showMessageOrNot))

            } 
        })
    }
}