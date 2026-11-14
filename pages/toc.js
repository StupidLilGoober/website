const toc_element = document.getElementById("toc")
const articles = document.querySelectorAll('article')

articles.forEach((article) => {
  toc_element.innerHTML += " | "
  const newLink = document.createElement("a")
  newLink.href = "#" + article.id
  newLink.innerHTML = article.title
  toc_element.append(newLink)
})

toc_element.innerHTML += " | "
