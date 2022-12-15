/**
 * for window render
 * **/
let msgShow = document.getElementById("msg_show");
window.electronAPI.updateWindow((_event, value) => {
    msgShow.innerHTML = msgShow.value + value;
})

//


let conBtn = document.getElementById("con_btn");
let serverAddressInput = document.getElementById("server_address");

serverAddressInput.onkeydown = (e) => {
    if (e.keyCode === 13) {
        conBtn.click();
        return false;
    }
}

conBtn.addEventListener('click', async () => {
        let url = serverAddressInput.value;
        return await window.electronAPI.connect(url)
    }
)


/**
 * Forbidden refresh
 * **/
window.onkeydown = (e) => {
    let ev = window.event || e;
    let code = ev.keyCode || ev.which;
    if (code === 82 && (ev.metaKey || ev.ctrlKey)) {
        return false
    }
}
