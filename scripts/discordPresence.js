const USER_ID = "1246426621641101363"

const lanyard_socket = new WebSocket("wss://api.lanyard.rest/socket")
const presence_element = document.getElementById("discord-presence")

let heartbeatinterval

function update_presence(data) {
  if (!data) return

  const custom_status = data.activities.find(
    activity => activity.type === 4
  )

  if (data.listening_to_spotify) {
    const spotify = data.spotify

    presence_element.innerHTML = `
      <section>
        <h2>Currently Listening To:</h2>
        <div id="spotify">
          <img src="${spotify.album_art_url}" width="125"> <br>
          <h3>${spotify.song}</h3>
          <p><em>${spotify.artist}</em></p>
        </div>
      </section>
    `
  } else if (data.activities?.length > 0) {
    const activity = data.activities[0]

    presence_element.innerHTML = `
      <section>
        <h2>Currently Playing:</h2>
        <div id="game">
          <img src="https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png">
          <h3>${activity.name}</h3>
          <p><em>${activity.state}</em></p>
        </div>
      </section>
    `
  }
}

lanyard_socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data)

  console.log("Received:", message)

  if (message.op === 1) {
    heartbeatinterval = setInterval(() => {
      lanyard_socket.send(JSON.stringify({
        op: 3
      }))
    }, message.d.heartbeat_interval)

    lanyard_socket.send(JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: USER_ID
      }
    }))
  }

  if (message.op === 0) {
    if (message.t === "INIT_STATE" ||
        message.t === "PRESENCE_UPDATE") {
      update_presence(message.d)
    }
  }
})

lanyard_socket.addEventListener("close", () => {
  console.log("Disconnected from WebSocket server.")
  clearInterval(heartbeatinterval)
})

lanyard_socket.addEventListener("error", (error) => {
  console.error("WebSocket error:", error)
})
