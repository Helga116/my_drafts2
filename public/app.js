document.addEventListener('click', async event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        console.log('remove', `${id}`)
        await remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === "update") {
        const id = event.target.dataset.id
        const newName = prompt('Введите новое название')
        console.log('update', `${id}`, `${newName}`)

        await update(id, newName)
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function update(id, newName) {
    await fetch(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({title: `${newName}`}),
        headers: {'Content-type': 'application/json'}
    });
}