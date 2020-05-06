const drags = document.querySelectorAll('.drag')
const containers = document.querySelectorAll('.container')

drags.forEach(drag => {
    drag.addEventListener('dragstart', () => {
        drag.classList.add('draging')
    })

    drag.addEventListener('dragend', () => {
        drag.classList.remove('draging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterBlock = getDragAfterblock(container, e.clientY)
        //console.log(afterBlock)
        const drag = document.querySelector('.draging')
        if (afterBlock == null)
            container.appendChild(drag)
        else
            container.insertBefore(drag,afterBlock)
    })
})

function getDragAfterblock(container, y){
    const dragableBlocks = [...container.querySelectorAll('drag:not(.draging)')]
    return dragableBlocks.reduce((closest, child) => {
        //To move BLOCK BOX UP & DOWN WE USE RECT
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        //IF WE ARE UP THE BLOCK IT SHOWS NEGATIVE AND WHEN DOWN SHOWS POSITIVE
        //console.log(offset)
        if (offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}