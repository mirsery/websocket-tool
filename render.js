/**
 * for window render
 * **/
let msgShow = document.getElementById("msg_show");
window.electronAPI.updateWindow((_event, value) => {
    msgShow.innerHTML = msgShow.value + value;
})

document.getElementById("con_btn")
    .addEventListener('click', () => {
            let url = document.getElementById("server_address").value;
            console.log(url)
            const result = window.electronAPI.connect(url)
        }
    )
