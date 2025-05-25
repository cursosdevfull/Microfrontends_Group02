document.addEventListener("DOMContentLoaded", () => {
    const mfeName = "mfe2"
    const messageList = document.querySelector(".message-list")
    const counterElement = document.getElementById("counter")
    let isDarkTheme = false
    let count = 0

    function addMessage(text, source) {
        const messageElement = document.createElement("div")
        messageElement.className = "message"
        messageElement.textContent = `[${source}]: ${text}`
        messageList.appendChild(messageElement)
    }

    function updateCounter() {
        counterElement.textContent = count
    }

    function toggleTheme() {
        isDarkTheme = !isDarkTheme
        const theme = isDarkTheme ? "dark" : "light"
        document.body.classList.toggle("dark-theme", isDarkTheme)

        window.eventBus.publish("THEME_CHANGE", { theme })

        addMessage(`Theme changed to ${theme}`, mfeName)
    }

    function broadcastCount() {
        window.eventBus.publish("COUNTER_UPDATE", { source: mfeName, count})
        addMessage(`Broadcasted count: ${count}`, mfeName)
    }

    function initUI() {
        document.getElementById("increment").addEventListener("click", () => {
            count++
            updateCounter()  
        })

        document.getElementById("decrement").addEventListener("click", () => {
            count--
            updateCounter()
        })

        document.getElementById("theme-toggle").addEventListener("click", toggleTheme)
        document.getElementById("broadcast").addEventListener("click", toggleTheme)
    }


    function initEventListener() {
        window.eventBus.subscribe("THEME_UPDATED", data => {
            isDarkTheme = data.theme === "dark"
            document.body.classList.toggle("dark-theme", isDarkTheme)
            addMessage(`Theme updated to ${data.theme}`, "container")
        })

        window.eventBus.subscribe("NEW_MESSAGE", data => {
            if (data.source !== mfeName) {
                addMessage(data.message, data.source)
            }
        })

        window.eventBus.subscribe("COUNTER_UPDATE", data => {
            if (data.source !== mfeName) {
                addMessage(`Receive count ${data.count} from ${data.source}`, mfeName)
            }
        })
    }

    function init() {
        updateCounter()
        initUI()
        initEventListener()

        window.eventBus.publish('MFE_LOADED', { name: mfeName });

        addMessage('MFE2 initialized and ready', mfeName);        
    }

    init()
})