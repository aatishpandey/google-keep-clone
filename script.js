
class App {
    constructor() {
        this.notes = [];
        this.form = document.querySelector(".form");
        this.formTitle = document.querySelector(".form-title");
        this.formText = document.querySelector(".form-text");
        this.formContainer = document.querySelector(".form-container");
        this.formButtonContainer = document.querySelector(".form-buttons-container");
        this.notesContainer = document.querySelector(".notes-container");
        this.closeBtn = document.querySelector("#close-btn");
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener("click", event => {
            this.handleFormClick(event);
        })

        this.form.addEventListener("submit", event => {
            event.preventDefault();
            const title = this.formTitle.value;
            const text = this.formText.value;
            const hasNote = title || text;
            if (hasNote) {
                this.addNote({ title, text });
            }

        })

        this.closeBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            this.closeForm();
        })
    }

    handleFormClick(event) {
        const formClicked = this.formContainer.contains(event.target);
        const title = this.formTitle.value;
        const text = this.formText.value;
        const hasNote = title || text;
        if (formClicked) {
            this.openForm();
        } else if (hasNote) {
            this.addNote({ title, text });
        } else {
            this.closeForm();
        }
    }

    openForm() {
        this.formTitle.style.display = "block";
        this.formButtonContainer.style.display = "flex"
    }

    closeForm() {
        this.formTitle.style.display = "none";
        this.formButtonContainer.style.display = "none"
        this.formTitle.value = '';
        this.formText.value = '';
    }

    addNote(note) {
        const newNote = {
            title: note.title,
            text: note.text,
            color: "white",
            id: this.notes.length > 0 ? this.notes[(this.notes.length - 1)].id + 1 : 1
        };
        this.notes = [...this.notes, newNote];
        this.displayNote();
        this.closeForm();
        // console.log(this.notes)
    }

    displayNote() {
        this.notesContainer.innerHTML = this.notes.map(item => `
            <div class="note">
                <div class="note-title">${item.title}</div>
                <div class="note-text">${item.text}</div>
            </div>
        `).join('')
    }

}

const app1 = new App();