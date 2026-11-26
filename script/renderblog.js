async function renderBlog(blogname) {
  try {
    const blog = await fetch("blog/" + blogname + ".md")

    if (!blog.ok) {
      throw new Error(`HTTP error: ${blog.status}`)
    }

    const blog_text = await blog.text()

    const blog_html = marked.parse(blog_text)
    document.getElementById("content").innerHTML = blog_html
  } catch (error) {
    console.error("Failed to load blog:", error)
    document.getElementById("content").innerHTML = `
    <h1>Error</h1>
    <p>Failed to load blog:<br> ${error}</p>
    `
  }
}
