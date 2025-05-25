class EventBus {
    constructor() {
        this.events = {}
    }

    subscribe(eventName, action) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }

        this.events[eventName].push(action)

        return () => {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== action)
        }
    }

    publish(eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(action => action(data))
        }

        this.publishToMicrofrontends(eventName, data)
    }

    publishToMicrofrontends(eventName, data) {
        const iframes = document.querySelectorAll("iframe")

        iframes.forEach(iframe => {
            try {
                if(iframe.contentWindow && iframe.contentWindow.postMessage) {
                    iframe.contentWindow.postMessage({
                        type: "EVENT_BUS",
                        eventName,
                        data
                    }, "*")
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    init() {
        window.addEventListener("message", event => {
            if(event.data && event.data.type === "EVENT_BUS") {
                const {eventName, data} =  event.data;
                this.publish(eventName, data)
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.eventBus = new EventBus()
    window.eventBus.init()
})