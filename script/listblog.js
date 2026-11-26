async function loadRSS(feedURL) {
  try {
    const response = await fetch(feedURL)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml")

    const parseError = xmlDoc.querySelector("parsererror")
    if (parseError) {
      throw new Error("Failed to parse RSSS document")
    }

    const items = xmlDoc.querySelectorAll("item")
    const feedEntries = Array.from(items).map(item => ({
      title: item.querySelector("title")?.textContent ?? "No title",
      link: item.querySelector("link")?.textContent ?? "",
      pubDate: item.querySelector("pubDate")?.textContent ?? "No date",
      description: item.querySelector("description")?.textContent ?? "No description"
    }))

    return feedEntries;
  } catch(error) {
    console.error("Error loading RSS feed: ", error)
    return []
  }
}

async function buildList() {
  list = await loadRSS("data/blog.rss")
  list.forEach((item) => {
    const element = `
    <div class="bloglisting">
      <h2>${item.title}</h2>
      <a href="${item.link.replace("https://domkolp.com/", "")}"><em>Read this blog</em></a>
      <p><em>${item.pubDate}</em></p>
      <p>${item.description}</p>
    </div>
    `
    const content = document.getElementById("content")
    content.insertAdjacentHTML("beforeend", element)
  })
}
