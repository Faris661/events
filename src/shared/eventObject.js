export default class EventObject {
  
    constructor(config) {
        this.title = config.title;
        this.description = config.description; 
        this.category_id = config.category_id;
        this.paid_event = config.paid_event;
        this.event_fee = config.event_fee;
        this.reward = config.reward;
        this.date = config.date;
        this.duration = config.duration;
        this.coordinator = {
            id: config.coordinator.id,
            email: config.coordinator.email,
        }
    }
}