const container = document.getElementById("tilt")

const width = window.innerWidth
const height = window.innerHeight

let mouseX
let mouseY

let isTicking = false

function updateTilt() {
  const x = (mouseX / width) - 0.5
  const y = (mouseY / height) - 0.5

  const rotateX = y * 20
  const rotateY = x * 20

  container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  isTicking = false
}

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  if (!isTicking) {
    requestAnimationFrame(updateTilt);
    isTicking = true
  }
})

document.addEventListener('mouseleave', (e) => {
  requestAnimationFrame(() => {
    container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
  })
})
