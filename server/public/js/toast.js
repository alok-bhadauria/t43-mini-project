window.showToast = (msg,type="success")=>{
  const toast=document.getElementById("toast")
  toast.className=`toast toast-${type}`
  toast.innerHTML=`<span class="toast-message">${msg}</span>`
  setTimeout(()=>toast.classList.add("hidden"),2200)
}
