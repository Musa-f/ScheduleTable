class ScheduleTable {
    
    constructor(days, startHour, endHour) {
        this.container = document.getElementById("schedule-container");
        this.days = days;
        this.startHour = startHour;
        this.endHour = endHour;
        this.selectedSlots = new Set();
        this.createTable();
    }

    createElement(tag, { text = "", dataset = {}, classes = [] } = {}) {
        const element = document.createElement(tag);
        if (text) element.innerHTML = text;
        Object.entries(dataset).forEach(([key, value]) => element.dataset[key] = value);
        classes.forEach(cls => element.classList.add(cls));
        return element;
    }

    createTable() {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const headerRow = document.createElement("tr");

        headerRow.appendChild(this.createElement("th"));
        this.days.forEach(day => headerRow.appendChild(this.createElement("th", { text: day })));
        thead.appendChild(headerRow);

        for (let hour = this.startHour; hour <= this.endHour; hour++) {
            const row = document.createElement("tr");
            row.appendChild(this.createElement("td", { text: `${hour}:00<br>${hour + 1}:00` }));
            
            this.days.forEach((_, dayIndex) => {
                const cell = this.createElement("td", { dataset: { day: dayIndex, hour } });
                cell.addEventListener("click", () => this.toggleSlot(cell, dayIndex, hour));
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        this.container.appendChild(table);
    }

    toggleSlot(cell, day, hour) {
        const slotKey = `${day}-${hour}`;
        if (this.selectedSlots.has(slotKey)) {
            this.selectedSlots.delete(slotKey);
            cell.classList.remove("taken");
        } else {
            this.selectedSlots.add(slotKey);
            cell.classList.add("taken");
        }
    }

    getSelectedSlots() {
        return Array.from(this.selectedSlots).map(slot => {
            const [day, hour] = slot.split("-").map(Number);
            return { day: this.days[day], hour };
        });
    }
}