export default function (el,binding) {
  if(binding.value) {
    el.style.display = 'none'
    document.querySelector('.spinnerLoading').style.display = ''
  } else {
    el.style.display = ''
    document.querySelector('.spinnerLoading').style.display = 'none'
  }
}
