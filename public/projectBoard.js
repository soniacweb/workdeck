const draggables = document.querySelectorAll('.card');
const containers = document.querySelectorAll('.sub-container');


// iterating through each draggable and adding dragstart/dragend eventlistener
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend', (e) => {
        draggable.classList.remove('dragging');
        // console.log(e.target.parentElement);
        updateColumns(e.target.parentElement, draggable)
    })
})

//appending draggable to container
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable);
        }
        else {
            container.insertBefore(draggable, afterElement);
        }
       
        
    })
})
// function that handles where elements are dropped 
function getDragAfterElement(container, y) {
   const draggableElements= [...container.querySelectorAll('.draggable:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
       const box = child.getBoundingClientRect();
       const offset = y - box.top - box.height/2;
       if (offset < 0 && offset > closest.offset) {
           return {offset: offset, element: child}
       }
           else {
               return closest;
           }
   }, {offset: Number.NEGATIVE_INFINITY}).element;
}
 
// update the database with the column numbers
async function updateColumns(column, draggable) {
    //patch request using ajax to update the server
    await fetch(`/${draggable.id}/updatecolumn`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
    column: column.id,   
    taskId: draggable.id 
    })  
  })
}  

