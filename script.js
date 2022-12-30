
class App {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.title = '';
        this.text = '';
        this.id = '';
        this.color='';

        this.form = document.querySelector(".form");
        this.formTitle = document.querySelector(".form-title");
        this.formText = document.querySelector(".form-text");
        this.formContainer = document.querySelector(".form-container");
        this.formButtonContainer = document.querySelector(".form-buttons-container");
        this.notesContainer = document.querySelector(".notes-container");
        this.closeBtn = document.querySelector("#close-btn");
        this.modalContainer = document.querySelector(".modal-container");
        this.modal = document.querySelector(".modal");
        this.modalTitle = document.querySelector(".modal-title")
        this.modalText = document.querySelector(".modal-text")
        this.modalCloseBtn = document.querySelector(".modal-close-btn");
        this.colorBtn = document.querySelector(".color-btn");
        this.ColorPallate = document.querySelector(".color-pallate");
        this.colorOption = document.querySelector(".color-option");
        this.deleteBtn = document.querySelector(".delete-btn");
        this.addEventListeners();
        this.render();
    }

    addEventListeners() {
        document.addEventListener("click", event => {
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
            this.closeColorPallete(event);
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

        this.colorBtn.addEventListener("click", (event) => {
            this.openColorPalatte(event);
        })

        this.ColorPallate.addEventListener("click", (event) => {
            const color = event.target.dataset.color;
            if (color) {
                this.editNoteColor(color);
            }
        })

        this.deleteBtn.addEventListener("click", (event) => {
            this.deleteNote(event);
        })
    }FormColorPallate

    render(){
        this.saveNotes();
        this.displayNote();
    }

    saveNotes(){
        localStorage.setItem('notes',JSON.stringify(this.notes));
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
        this.render();
        this.closeForm();
    }

    displayNote() {
        this.notesContainer.innerHTML = this.notes.map(item => `
            <div style="background:${item.color};" class="note" data-id="${item.id}">
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

        this.render();
    }

    editNoteColor(color) {
        this.modal.style.backgroundColor = color;
        this.notes = this.notes.map(note =>
            note.id === Number(this.id) ? { ...note, color} : note);

        this.render();
    }

    openColorPalatte(event) {
        if (!event.target.classList.contains('color-btn')) return;
        const noteCoords = event.target.getBoundingClientRect();
        const horizontal = noteCoords.left + window.scrollX;
        const vertical = noteCoords.top + window.scrollY + 20;
        this.ColorPallate.style.transform = `translate(${horizontal}px,${vertical}px)`;
        this.ColorPallate.style.display = "flex";
    }

    closeColorPallete(event) {
        if (!event.target.classList.contains('color-btn') && !event.target.classList.contains('color-option')) {
            this.ColorPallate.style.display = "none";
        }
    }

    deleteNote(event){
        this.notes = this.notes.filter(note => Number(this.id) !== note.id);
        this.render();
        this.closeModal();
    }

}

const app1 = new App();