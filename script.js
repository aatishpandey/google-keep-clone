
class App {
    constructor() {
        this.notes = [];
        this.title = '';
        this.text = '';
        this.id = '';

        this.form = document.querySelector(".form");
        this.formTitle = document.querySelector(".form-title");
        this.formText = document.querySelector(".form-text");
        this.formContainer = document.querySelector(".form-container");
        this.formButtonContainer = document.querySelector(".form-buttons-container");
        this.notesContainer = document.querySelector(".notes-container");
        this.closeBtn = document.querySelector("#close-btn");
        this.modalContainer = document.querySelector(".modal-container");
        this.modalTitle = document.querySelector(".modal-title")
        this.modalText = document.querySelector(".modal-text")
        this.modalCloseBtn = document.querySelector(".modal-close-btn");
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener("click", event => {
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
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

        this.modalCloseBtn.addEventListener("click", (event) => {
            this.closeModal();
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
    }

    displayNote() {
        this.notesContainer.innerHTML = this.notes.map(item => `
            <div class="note" data-id="${item.id}">
                <div class="note-title">${item.title}</div>
                <div class="note-text">${item.text}</div>
            </div>
        `).join('')
    }

    selectNote(event) {
        const selectedNote = event.target.closest(".note");
        if (!selectedNote) return;
        const [noteTitle, noteText] = selectedNote.children;
        this.title = noteTitle.innerText;
        this.text = noteText.innerText;
        this.id = selectedNote.dataset.id;
    }

    openModal(event) {
        if (event.target.closest(".note")) {
            this.modalContainer.classList.toggle("open-modal");
            this.modalTitle.value = this.title;
            this.modalText.value = this.text;
        }
    }

    closeModal(event) {
        this.editModal();
        this.modalContainer.classList.toggle("open-modal");
    }

    editModal() {
        const title = this.modalTitle.value;
        const text = this.modalText.value;

        this.notes = this.notes.map(note =>
            note.id === Number(this.id) ? { ...note, title, text } : note);

        this.displayNote();
    }

}

const app1 = new App();