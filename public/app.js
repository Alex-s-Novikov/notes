

document.addEventListener('click', event => {

  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id


    Swal.fire({
      title: 'Точно удалить задачу запланированную на ' + id + '?',
      input: 'password',
      inputLabel: 'Введи пароль:',
      inputPlaceholder: '******',
      showCancelButton: true,
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отмена',
    }).then(result => {
      if (result.isConfirmed) {
        if (result.value == "kdw-2022") {
          remove(id).then(() => {
            event.target.closest('li').remove()
          })
        } else {
          Swal.fire({ icon: "error", title: "Ошибка в пароле" })
        }
      }
    });

  }//remove

  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const title = event.target.dataset.title

    Swal.fire({
      title: 'Редактирование',
      text: title,
      html: `<div style="text-align:left; width:100%">
        <div><div>ID:</div> <input type=text id="inp_id" value="`+ id + `" style="width:100%;"></div>
        <div><div>TITLE:</div> <input type=text id="inp_title" value="`+ title + `" style="width:100%;"></div>

        <div style="margin-top:24px;"><div>Пароль:</div> <input type=password id="inp_password" style="width:100%;"></div>
      </div>
      `,
      confirmButtonText: 'Сохранить',
      showCancelButton: true,
      cancelButtonText: 'Отмена',
      preConfirm: () => {
        const newId = Swal.getPopup().querySelector('#inp_id').value
        const newTitle = Swal.getPopup().querySelector('#inp_title').value
        const password = Swal.getPopup().querySelector('#inp_password').value
        return { newId, newTitle, password }
      }
    }).then(result => {
      if (result.isConfirmed) {
        if (result.value.password != "kdw-2022") {
          Swal.fire({ icon: "error", title: "Ошибка в пароле" })
          return;
        }
        update({ id, title: result.value.newTitle }).then(() => {
          event.target.closest('li').querySelector('span').innerText = result.value.newTitle;
        })
      }
    });

  }
})

async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNote)
  })
}

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}