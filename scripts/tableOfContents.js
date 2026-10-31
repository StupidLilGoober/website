const toc_element = document.getElementById("table-of-contents")
const articles = document.querySelectorAll('article')

articles.forEach((article) => {
  const newLink = document.createElement("a")
  newLink.href = "#" + article.id
  newLink.innerHTML = article.title
  toc_element.append(newLink)
  toc_element.innerHTML += " "
})
